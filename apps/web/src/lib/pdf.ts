import fontkit from '@pdf-lib/fontkit'
import { PDFDocument, rgb, type PDFFont, type PDFPage } from 'pdf-lib'

/**
 * Ukázkové PDF dokumentu úřední desky. Písmo Noto Sans (OFL) je ve dvou podmnožinách
 * (latinka a rozšířená latinka), proto se pro každý znak vybere ta, která ho obsahuje.
 */
export interface PismaPdf {
  latin: Uint8Array
  ext: Uint8Array
}

export interface ObsahPdf {
  obec: string
  nazev: string
  cisloJednaci: string
  puvodce: string
  vyveseno: string
  odstavce: string[]
}

const A4: [number, number] = [595.28, 841.89]
const OKRAJ = 56
const PEVNE_DATUM = new Date('2026-11-01T00:00:00.000Z')

interface Sada {
  fonty: PDFFont[]
  znaky: Set<number>[]
}

function useky(text: string, sada: Sada): { font: PDFFont; text: string }[] {
  const out: { font: PDFFont; text: string }[] = []
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 32
    const i = Math.max(0, sada.znaky.findIndex((z) => z.has(cp)))
    const font = sada.fonty[i] ?? sada.fonty[0]!
    const posledni = out[out.length - 1]
    if (posledni && posledni.font === font) posledni.text += ch
    else out.push({ font, text: sada.znaky[i]?.has(cp) ? ch : '?' })
  }
  return out
}

function sirka(text: string, size: number, sada: Sada): number {
  return useky(text, sada).reduce((s, u) => s + u.font.widthOfTextAtSize(u.text, size), 0)
}

function zalom(text: string, size: number, max: number, sada: Sada): string[] {
  const slova = text.split(/\s+/)
  const radky: string[] = []
  let radek = ''
  for (const slovo of slova) {
    const zkus = radek ? `${radek} ${slovo}` : slovo
    if (radek && sirka(zkus, size, sada) > max) {
      radky.push(radek)
      radek = slovo
    } else radek = zkus
  }
  if (radek) radky.push(radek)
  return radky
}

export async function vytvorPdf(obsah: ObsahPdf, pisma: PismaPdf): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const latin = await doc.embedFont(pisma.latin, { subset: true })
  const ext = await doc.embedFont(pisma.ext, { subset: true })
  const sada: Sada = { fonty: [latin, ext], znaky: [new Set(latin.getCharacterSet()), new Set(ext.getCharacterSet())] }

  doc.setTitle(obsah.nazev)
  doc.setAuthor(obsah.obec)
  doc.setLanguage('cs-CZ')
  doc.setProducer('CodeKom, ukázka')
  doc.setCreator('CodeKom')
  doc.setCreationDate(PEVNE_DATUM)
  doc.setModificationDate(PEVNE_DATUM)

  let page: PDFPage = doc.addPage(A4)
  let y = A4[1] - OKRAJ
  const max = A4[0] - 2 * OKRAJ

  const pis = (text: string, size: number, mezera: number, barva = rgb(0.1, 0.1, 0.1)) => {
    for (const radek of zalom(text, size, max, sada)) {
      if (y < OKRAJ + size) {
        page = doc.addPage(A4)
        y = A4[1] - OKRAJ
      }
      let x = OKRAJ
      for (const u of useky(radek, sada)) {
        page.drawText(u.text, { x, y: y - size, size, font: u.font, color: barva })
        x += u.font.widthOfTextAtSize(u.text, size)
      }
      y -= size * 1.45
    }
    y -= mezera
  }

  pis(`Obec ${obsah.obec}`, 11, 2, rgb(0.3, 0.3, 0.3))
  pis(`Číslo jednací: ${obsah.cisloJednaci}`, 11, 2, rgb(0.3, 0.3, 0.3))
  pis(`Původce: ${obsah.puvodce}`, 11, 2, rgb(0.3, 0.3, 0.3))
  pis(`Vyvěšeno: ${obsah.vyveseno}`, 11, 16, rgb(0.3, 0.3, 0.3))
  pis(obsah.nazev, 17, 12)
  for (const o of obsah.odstavce) pis(o, 12, 8)
  pis('Ukázkový dokument smyšlené obce pro prototyp CodeKom.', 10, 0, rgb(0.35, 0.35, 0.35))

  return doc.save({ useObjectStreams: false })
}

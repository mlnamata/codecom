import { NovaZavadaVstup, StavZavadyOdpoved, ZavadaOdpoved } from '@codekom/typy'
import { chyba, json, options, teloJson } from '@/lib/api'
import { ChybaPravidla, pridejZavadu } from '@/lib/data/zapis'
import { zdroj } from '@/lib/data/zdroj'
import { obnovVerejneStranky } from '@/lib/obnovit'
import { ipKlienta, zkontrolujLimit } from '@/lib/omezeni'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

const MAX_TELO = 20 * 1024

/** Nové hlášení závady. Kontakt se nikdy nevrací. 5 hlášení za minutu na IP. */
export async function POST(request: Request) {
  const limit = zkontrolujLimit(`api-zavady:${ipKlienta(request.headers)}`)
  if (!limit.povoleno) return chyba(request, 429, 'Příliš mnoho hlášení. Zkuste to za chvíli.', undefined, { 'Retry-After': String(limit.zaSekund) })
  const telo = await teloJson(request, MAX_TELO)
  if (!telo.ok) return chyba(request, telo.status, telo.zprava)
  const r = NovaZavadaVstup.safeParse(telo.data)
  if (!r.success) {
    const pole: Record<string, string[]> = {}
    for (const i of r.error.issues) (pole[i.path.join('.') || 'telo'] ??= []).push(i.message)
    return chyba(request, 400, 'Hlášení obsahuje chyby.', pole)
  }
  const z = await zdroj()
  if (!(await z.obec(r.data.obec))) return chyba(request, 404, 'Obec neexistuje.')
  try {
    const h = pridejZavadu(r.data)
    obnovVerejneStranky()
    return json(request, ZavadaOdpoved, { id: h.id, cislo: h.cislo, sledovaciKod: h.sledovaciKod, stav: h.stav }, { status: 201 })
  } catch (e) {
    if (e instanceof ChybaPravidla) return chyba(request, 400, 'Hlášení obsahuje chyby.', { kategorie: [e.message] })
    throw e
  }
}

/** Stav hlášení podle sledovacího kódu: stav a veřejná odpověď, bez kontaktu. */
export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams
  const obec = sp.get('obec')?.trim()
  const kod = sp.get('kod')?.trim()
  if (!obec || !kod) return chyba(request, 400, 'Chybí parametr obec nebo kod.')
  const z = await zdroj()
  if (!(await z.obec(obec))) return chyba(request, 404, 'Obec neexistuje.')
  const h = await z.hlaseniZavad(obec, kod)
  if (!h) return chyba(request, 404, 'Hlášení s tímto kódem neexistuje.')
  const stavy = await z.stavyZavad(obec)
  return json(request, StavZavadyOdpoved, {
    cislo: h.cislo,
    stav: h.stav,
    stavNazev: stavy.find((s) => s.id === h.stav)?.nazev ?? h.stav,
    verejnaOdpoved: h.verejnaOdpoved,
    kategorie: h.kategorie,
    misto: h.misto,
    vytvoreno: h.vytvoreno,
    zmeneno: h.zmeneno,
  })
}

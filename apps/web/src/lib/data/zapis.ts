import { randomInt } from 'node:crypto'
import { demoTed } from '@codekom/demo-data'
import type { HlaseniZavad, NovaKrizeVstup, NovaZavadaVstup, Rezervace, StavZavady } from '@codekom/typy'
import { bezpecnyOdkaz, pragueDayKey, TZ } from '@codekom/typy/pravidla'
import { slugify } from '../slug'
import { obnovUloziste, uloziste, type DokumentVUlozisti, type KrizeVUlozisti } from './demo-pamet'

/** Porušení pravidla domény (například smazání dokumentu, který už visel). */
export class ChybaPravidla extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ChybaPravidla'
  }
}

/** Abeceda sledovacích kódů bez zaměnitelných znaků 0, O, 1, I, L. */
export const ABECEDA_KODU = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'

export function novyKod(delka = 8): string {
  let k = ''
  for (let i = 0; i < delka; i++) k += ABECEDA_KODU[randomInt(ABECEDA_KODU.length)]
  return k
}

function unikatni(zaklad: string, existuje: (s: string) => boolean): string {
  const z = zaklad || 'polozka'
  if (!existuje(z)) return z
  for (let i = 2; ; i++) if (!existuje(`${z}-${i}`)) return `${z}-${i}`
}

const tedIso = (): string => demoTed().toISOString()
const dnes = (): string => pragueDayKey(demoTed())

/* ------------------------------------------------------------ aktuality */

export function pridejAktualitu(v: { titulek: string; perex: string; obsah: string[]; rubrika?: 'zpravy' | 'oznameni' | 'kultura' }) {
  const u = uloziste()
  const slug = unikatni(slugify(v.titulek), (s) => u.aktuality.some((a) => a.slug === s))
  const a = {
    id: slug,
    slug,
    titulek: v.titulek,
    perex: v.perex,
    obsah: v.obsah,
    rubrika: v.rubrika ?? 'zpravy',
    autor: 'Obecní úřad',
    publikovano: tedIso(),
    obrazek: null,
    dokumentyDesky: [],
  }
  u.aktuality.unshift(a)
  return a
}

/* ------------------------------------------------------------ úřední deska */

export interface NovyDokument {
  nazev: string
  kategorie: string
  cisloJednaci: string
  puvodce: string
  vyvesenoOd: string
  vyvesenoDo: string | null
  text: string[]
  skrytPoSejmuti: boolean
}

export function vyvesDokument(v: NovyDokument): DokumentVUlozisti {
  const u = uloziste()
  if (!u.kategorie.some((k) => k.slug === v.kategorie)) throw new ChybaPravidla('Neznámá kategorie úřední desky.')
  if (v.vyvesenoDo && v.vyvesenoDo < v.vyvesenoOd) throw new ChybaPravidla('Den sejmutí musí být stejný nebo pozdější než den vyvěšení.')
  const id = unikatni(slugify(v.nazev), (s) => u.dokumenty.some((d) => d.id === s))
  const d: DokumentVUlozisti = {
    id,
    nazev: v.nazev,
    kategorie: v.kategorie,
    cisloJednaci: v.cisloJednaci,
    puvodce: v.puvodce,
    vyvesenoOd: v.vyvesenoOd,
    vyvesenoDo: v.vyvesenoDo,
    skrytPoSejmuti: v.skrytPoSejmuti,
    anotace: v.text[0] ?? v.nazev,
    text: v.text.length ? v.text : [v.nazev],
    soubor: { nazev: `${id}.pdf`, url: `/uredni-deska/${id}/soubor`, typ: 'application/pdf', velikost: null },
    verze: [{ cislo: 1, cas: tedIso(), zmena: 'vyveseno', popis: 'Dokument vyvěšen na úřední desku' }],
    pridany: true,
  }
  u.dokumenty.unshift(d)
  return d
}

/** Úprava nikdy nepřepisuje historii: vznikne nová verze se záznamem. */
export function upravDokument(id: string, zmeny: Partial<Pick<NovyDokument, 'nazev' | 'vyvesenoDo' | 'text'>>, popis: string) {
  const d = uloziste().dokumenty.find((x) => x.id === id)
  if (!d) throw new ChybaPravidla('Dokument neexistuje.')
  if (zmeny.nazev) d.nazev = zmeny.nazev
  if (zmeny.vyvesenoDo !== undefined) d.vyvesenoDo = zmeny.vyvesenoDo
  if (zmeny.text) d.text = zmeny.text
  d.verze.push({ cislo: d.verze.length + 1, cas: tedIso(), zmena: 'zmeneno', popis })
  return d
}

/** Dokument, který už visel, nejde smazat (pravidlo 1). Smazat jde jen připravený. */
export function smazDokument(id: string): void {
  const u = uloziste()
  const d = u.dokumenty.find((x) => x.id === id)
  if (!d) throw new ChybaPravidla('Dokument neexistuje.')
  if (d.vyvesenoOd <= dnes()) throw new ChybaPravidla('Dokument, který už visel na úřední desce, nejde smazat.')
  u.dokumenty = u.dokumenty.filter((x) => x.id !== id)
}

/* ------------------------------------------------------------ krizová hlášení */

export type RoleUkazky = 'spravce' | 'redaktor'

/** Správce vydá hlášení, redaktor uloží jen koncept. */
export function vydejKrizi(v: NovaKrizeVstup, role: RoleUkazky): KrizeVUlozisti {
  const u = uloziste()
  const odkaz = bezpecnyOdkaz(v.odkazUrl)
  if (v.odkazUrl && !odkaz) throw new ChybaPravidla('Odkaz musí začínat https:// nebo být cestou na webu obce.')
  const platneCasti = new Set(u.obec.castiObce.map((c) => c.slug))
  const id = unikatni(slugify(`${v.uroven}-${v.titulek}`), (s) => u.krize.some((h) => h.id === s))
  const h: KrizeVUlozisti = {
    id,
    uroven: v.uroven,
    titulek: v.titulek,
    text: v.text,
    odkazText: odkaz ? (v.odkazText ?? 'Více informací') : null,
    odkazUrl: odkaz,
    casti: (v.casti ?? []).filter((c) => platneCasti.has(c)),
    platiOd: v.platiOd ?? tedIso(),
    platiDo: v.platiDo ?? null,
    updatedAt: tedIso(),
    stav: role === 'spravce' ? 'vydano' : 'koncept',
  }
  u.krize.unshift(h)
  return h
}

/** Hlášení se ukončí, nikdy nemaže. */
export function ukonciKrizi(id: string): KrizeVUlozisti {
  const h = uloziste().krize.find((x) => x.id === id)
  if (!h) throw new ChybaPravidla('Hlášení neexistuje.')
  h.platiDo = tedIso()
  h.updatedAt = tedIso()
  h.stav = 'ukonceno'
  return h
}

export function publikujKoncept(id: string): KrizeVUlozisti {
  const h = uloziste().krize.find((x) => x.id === id)
  if (!h || h.stav !== 'koncept') throw new ChybaPravidla('Koncept neexistuje.')
  h.stav = 'vydano'
  h.platiOd = tedIso()
  h.updatedAt = tedIso()
  return h
}

/* ------------------------------------------------------------ hlášení závad */

export function pridejZavadu(v: NovaZavadaVstup): HlaseniZavad {
  const u = uloziste()
  if (!u.kategorieZavad.some((k) => k.id === v.kategorie)) throw new ChybaPravidla('Neznámá kategorie závady.')
  const rok = dnes().slice(0, 4)
  let kod = novyKod()
  while (u.zavady.some((z) => z.sledovaciKod === kod)) kod = novyKod()
  const cislo = `HZ-${rok}-${String(u.dalsiZavada).padStart(4, '0')}`
  u.dalsiZavada++
  const k = v.kontakt
  const kontakt = k && (k.jmeno || k.email || k.telefon) ? { jmeno: k.jmeno || null, email: k.email || null, telefon: k.telefon || null } : null
  const z: HlaseniZavad = {
    id: cislo.toLowerCase(),
    cislo,
    sledovaciKod: kod,
    stav: 'nove',
    verejnaOdpoved: null,
    kategorie: v.kategorie,
    popis: v.popis,
    misto: v.misto,
    poloha: v.poloha ?? null,
    kontakt,
    pocetFotek: v.pocetFotek ?? 0,
    vytvoreno: tedIso(),
    zmeneno: tedIso(),
  }
  u.zavady.unshift(z)
  return z
}

export function vyridZavadu(id: string, stav: StavZavady, verejnaOdpoved: string | null | undefined): HlaseniZavad {
  const z = uloziste().zavady.find((x) => x.id === id)
  if (!z) throw new ChybaPravidla('Hlášení neexistuje.')
  z.stav = stav
  if (verejnaOdpoved !== undefined) z.verejnaOdpoved = verejnaOdpoved?.trim() || null
  z.zmeneno = tedIso()
  return z
}

/* ------------------------------------------------------------ rezervace */

const minuty = (cas: string): number => {
  const [h, m] = cas.split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

const casPraha = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

export function jeVMinulosti(den: string, od: string): boolean {
  const d = dnes()
  if (den < d) return true
  if (den > d) return false
  return minuty(od) <= minuty(casPraha.format(demoTed()))
}

export function koliduje(prostor: string, den: string, od: string, doKdy: string): boolean {
  return uloziste().rezervace.some(
    (r) =>
      r.prostor === prostor &&
      r.den === den &&
      (r.stav === 'ceka' || r.stav === 'schvaleno') &&
      minuty(od) < minuty(r.do) &&
      minuty(r.od) < minuty(doKdy),
  )
}

export function pridejRezervaci(v: Omit<Rezervace, 'id' | 'stav' | 'vytvoreno'>): Rezervace {
  const u = uloziste()
  if (!u.prostory.some((p) => p.id === v.prostor)) throw new ChybaPravidla('Neznámý prostor.')
  if (minuty(v.do) <= minuty(v.od)) throw new ChybaPravidla('Konec musí být později než začátek.')
  if (jeVMinulosti(v.den, v.od)) throw new ChybaPravidla('Termín je v minulosti.')
  if (koliduje(v.prostor, v.den, v.od, v.do)) throw new ChybaPravidla('V tomto čase je prostor už rezervovaný.')
  const r: Rezervace = { ...v, id: `rez-${v.den}-${novyKod(6).toLowerCase()}`, stav: 'ceka', vytvoreno: tedIso() }
  u.rezervace.push(r)
  return r
}

/* ------------------------------------------------------------ ukázka */

export function obnovUkazku(): void {
  obnovUloziste()
}

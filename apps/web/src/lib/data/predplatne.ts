/**
 * Předplatné obcí a faktury CodeKom. Ukázkové úložiště v paměti procesu, stejně jako
 * demo-pamet.ts. Kromě Javoří Lhoty jsou obce smyšlené a slouží jen k ukázce interní
 * správy. Ceny jsou orientační „od“ z docs/navrh-platformy/04-admin-editor.md (4. 11. 2026).
 */
import type { Uroven } from '@/ukazka/uroven'

export type Velikost = 0 | 1 | 2
export type Platba = 'rocni' | 'mesicni'
export type StavPredplatneho = 'zkusebni' | 'aktivni' | 'jen-cteni' | 'vypovezeno'
export type StavFaktury = 'neuhrazena' | 'zaplacena' | 'po-splatnosti' | 'upominka'

export interface Predplatne {
  slug: string
  obec: string
  obyvatel: number
  uroven: Uroven
  urad: boolean
  budovy: number
  platba: Platba
  stav: StavPredplatneho
  od: string
  kontakt: string
  poznamka?: string
  smyslena: boolean
}

export interface PolozkaFaktury {
  popis: string
  kcBezDph: number
}

export interface Faktura {
  cislo: string
  slug: string
  obdobi: string
  vystaveno: string
  splatnost: string
  polozky: PolozkaFaktury[]
  stav: StavFaktury
  zaplaceno?: string
  zpusob: 'faktura' | 'karta'
}

export const VELIKOSTI = ['do 500 obyvatel', '500–2 000 obyvatel', '2 000–10 000 obyvatel'] as const
export const CENY_WEBU: Record<Uroven, [number, number, number]> = {
  zaklad: [590, 990, 1690],
  pokrocily: [890, 1490, 2490],
  advance: [1490, 2290, 3790],
}
export const CENA_URADU: [number, number, number] = [600, 1000, 2000]
export const CENA_BUDOVY = 390

export const NAZVY_STAVU: Record<StavPredplatneho, string> = {
  zkusebni: 'Zkušební doba',
  aktivni: 'Aktivní',
  'jen-cteni': 'Jen pro čtení',
  vypovezeno: 'Vypovězeno',
}
export const NAZVY_STAVU_FAKTURY: Record<StavFaktury, string> = {
  neuhrazena: 'Čeká na platbu',
  zaplacena: 'Zaplacena',
  'po-splatnosti': 'Po splatnosti',
  upominka: 'Odeslána upomínka',
}

export const velikost = (obyvatel: number): Velikost => (obyvatel <= 500 ? 0 : obyvatel <= 2000 ? 1 : 2)

export function polozky(p: Predplatne): PolozkaFaktury[] {
  const v = velikost(p.obyvatel)
  const NAZVY: Record<Uroven, string> = { zaklad: 'Základ', pokrocily: 'Pokročilý', advance: 'Advance' }
  const r: PolozkaFaktury[] = [{ popis: `Web obce, úroveň ${NAZVY[p.uroven]}`, kcBezDph: CENY_WEBU[p.uroven][v] }]
  if (p.urad) r.push({ popis: 'Modul Digitální úřad', kcBezDph: CENA_URADU[v] })
  if (p.budovy > 0) r.push({ popis: `Modul Chytré budovy, ${p.budovy} × ${CENA_BUDOVY} Kč`, kcBezDph: p.budovy * CENA_BUDOVY })
  return r
}

export const mesicne = (p: Predplatne): number => polozky(p).reduce((s, x) => s + x.kcBezDph, 0)
export const soucet = (f: Faktura): number => f.polozky.reduce((s, x) => s + x.kcBezDph, 0)

const SEMENO: Predplatne[] = [
  { slug: 'javori-lhota', obec: 'Javoří Lhota', obyvatel: 684, uroven: 'zaklad', urad: true, budovy: 2, platba: 'rocni', stav: 'aktivni', od: '2026-01-01', kontakt: 'Marie Šťastná, starostka', smyslena: true },
  { slug: 'horni-ukazkov', obec: 'Horní Ukázkov', obyvatel: 312, uroven: 'zaklad', urad: false, budovy: 0, platba: 'mesicni', stav: 'aktivni', od: '2026-05-01', kontakt: 'starosta', smyslena: true },
  { slug: 'dolni-ukazkov', obec: 'Dolní Ukázkov', obyvatel: 1480, uroven: 'pokrocily', urad: true, budovy: 3, platba: 'mesicni', stav: 'aktivni', od: '2026-04-01', kontakt: 'účetní obce', smyslena: true },
  { slug: 'vzorova-ves', obec: 'Vzorová Ves', obyvatel: 4100, uroven: 'advance', urad: true, budovy: 6, platba: 'rocni', stav: 'aktivni', od: '2026-03-01', kontakt: 'tisková mluvčí', smyslena: true },
  { slug: 'zkusebna', obec: 'Zkušebná', obyvatel: 220, uroven: 'zaklad', urad: false, budovy: 1, platba: 'mesicni', stav: 'zkusebni', od: '2026-10-20', kontakt: 'místostarosta', smyslena: true },
  { slug: 'modelice', obec: 'Modelice', obyvatel: 860, uroven: 'pokrocily', urad: false, budovy: 0, platba: 'mesicni', stav: 'jen-cteni', od: '2026-06-01', kontakt: 'starostka', poznamka: 'Prodlení přes 30 dní po upomínce, služba omezena na čtení. Úřední deska a krizová hlášení běží.', smyslena: true },
]

const MESICE = ['2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11']

function plusDny(den: string, dny: number): string {
  const d = new Date(`${den}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + dny)
  return d.toISOString().slice(0, 10)
}

function semenoFaktur(obce: Predplatne[]): Faktura[] {
  const f: Faktura[] = []
  let n = 1
  const nova = (p: Predplatne, obdobi: string, vystaveno: string, stav: StavFaktury, zaplaceno?: string, nasobek = 1) => {
    const pol = polozky(p).map((x) => ({ popis: nasobek > 1 ? `${x.popis}, ${nasobek} měsíců` : x.popis, kcBezDph: x.kcBezDph * nasobek }))
    f.push({ cislo: `2026${String(n++).padStart(4, '0')}`, slug: p.slug, obdobi, vystaveno, splatnost: plusDny(vystaveno, p.platba === 'rocni' ? 30 : 0), polozky: pol, stav, zaplaceno, zpusob: p.platba === 'rocni' ? 'faktura' : 'karta' })
  }
  for (const p of obce) {
    if (p.stav === 'zkusebni') continue
    if (p.platba === 'rocni') {
      const rok = p.od.slice(0, 4)
      nova(p, `${p.od.slice(0, 7)} až ${rok}-12`, p.od, 'zaplacena', plusDny(p.od, 12), 13 - Number(p.od.slice(5, 7)))
      continue
    }
    for (const m of MESICE) {
      if (m < p.od.slice(0, 7)) continue
      const den = `${m}-01`
      if (p.slug === 'modelice' && m >= '2026-09') nova(p, m, den, m === '2026-09' ? 'upominka' : 'po-splatnosti')
      else if (m === '2026-11') nova(p, m, den, 'neuhrazena')
      else nova(p, m, den, 'zaplacena', den)
    }
  }
  return f
}

interface UlozistePredplatneho {
  predplatne: Predplatne[]
  faktury: Faktura[]
  zaznam: { kdy: string; co: string }[]
}

const g = globalThis as unknown as { __codekomPredplatne?: UlozistePredplatneho }

function novy(): UlozistePredplatneho {
  const predplatne = structuredClone(SEMENO)
  return { predplatne, faktury: semenoFaktur(predplatne), zaznam: [] }
}

export function ulozistePredplatneho(): UlozistePredplatneho {
  g.__codekomPredplatne ??= novy()
  return g.__codekomPredplatne
}

export function obnovPredplatne(): void {
  g.__codekomPredplatne = novy()
}

export const predplatneObce = (slug: string) => ulozistePredplatneho().predplatne.find((p) => p.slug === slug)
export const fakturyObce = (slug: string) => ulozistePredplatneho().faktury.filter((f) => f.slug === slug)

function zapis(co: string): void {
  ulozistePredplatneho().zaznam.unshift({ kdy: new Date().toISOString(), co })
}

export function zmenPredplatne(slug: string, zmena: Partial<Pick<Predplatne, 'uroven' | 'urad' | 'budovy' | 'platba' | 'stav'>>): Predplatne {
  const p = predplatneObce(slug)
  if (!p) throw new Error('Obec nenalezena')
  Object.assign(p, zmena)
  zapis(`${p.obec}: změna předplatného (${Object.keys(zmena).join(', ')})`)
  return p
}

export function zmenStavFaktury(cislo: string, stav: StavFaktury, dnes: string): Faktura {
  const f = ulozistePredplatneho().faktury.find((x) => x.cislo === cislo)
  if (!f) throw new Error('Faktura nenalezena')
  f.stav = stav
  f.zaplaceno = stav === 'zaplacena' ? dnes : undefined
  zapis(`Faktura ${cislo}: ${NAZVY_STAVU_FAKTURY[stav]}`)
  return f
}

/** Vystaví měsíční faktury obcím s měsíčním předplatným, které za daný měsíc ještě fakturu nemají. */
export function vystavMesicniFaktury(mesic: string): number {
  const u = ulozistePredplatneho()
  let n = u.faktury.length + 1
  let vystaveno = 0
  for (const p of u.predplatne) {
    if (p.platba !== 'mesicni' || p.stav === 'vypovezeno' || p.stav === 'zkusebni') continue
    if (u.faktury.some((f) => f.slug === p.slug && f.obdobi === mesic)) continue
    const den = `${mesic}-01`
    u.faktury.push({ cislo: `2026${String(n++).padStart(4, '0')}`, slug: p.slug, obdobi: mesic, vystaveno: den, splatnost: den, polozky: polozky(p), stav: 'neuhrazena', zpusob: 'karta' })
    vystaveno++
  }
  if (vystaveno) zapis(`Vystaveno ${vystaveno} faktur za ${mesic}`)
  return vystaveno
}

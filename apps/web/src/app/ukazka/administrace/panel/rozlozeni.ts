/**
 * Rozložení plochy řídicího panelu: které widgety jsou na ploše, v jakém pořadí a jak široké.
 * Čisté funkce bez Reactu, aby šly otestovat (tests/jednotky/rozlozeni-panelu.test.ts).
 * V ukázce se rozložení ukládá do localStorage prohlížeče, v ostrém provozu patří k účtu uživatele.
 */

export type Velikost = 'uzky' | 'siroky' | 'cely'

export const ID_WIDGETU = ['souhrn', 'mapa', 'kamera', 'energie', 'parkovani', 'teploty', 'cidla', 'zamky', 'odjezdy', 'zavady'] as const
export type IdWidgetu = (typeof ID_WIDGETU)[number]

export interface PolozkaPlochy {
  id: IdWidgetu
  velikost: Velikost
}

export const VELIKOSTI: Record<Velikost, string> = { uzky: 'Úzký', siroky: 'Široký', cely: 'Celá šířka' }

export const WIDGETY: Record<IdWidgetu, { nazev: string; popis: string; vychoziVelikost: Velikost }> = {
  souhrn: { nazev: 'Stav obce', popis: 'Počasí, ovzduší, potok, budovy, zámky a závady v jednom řádku', vychoziVelikost: 'cely' },
  mapa: { nazev: 'Mapa obce', popis: 'Kamery, čidla, zámky a zastávky na mapě s vrstvami', vychoziVelikost: 'siroky' },
  kamera: { nazev: 'Kamera', popis: 'Snímek z kamery, natočení a přiblížení', vychoziVelikost: 'uzky' },
  energie: { nazev: 'Spotřeba energie', popis: 'Spotřeba obecních budov za posledních 7 dní v grafu', vychoziVelikost: 'siroky' },
  teploty: { nazev: 'Teploty v budovách', popis: 'Teplota v místnostech obecních budov a upozornění', vychoziVelikost: 'uzky' },
  cidla: { nazev: 'Čidla', popis: 'Meteostanice, vodočet, vozovka a půda', vychoziVelikost: 'uzky' },
  zamky: { nazev: 'Zámky', popis: 'Odemčení dveří na 5 minut s povinným důvodem', vychoziVelikost: 'uzky' },
  odjezdy: { nazev: 'Nejbližší odjezdy', popis: 'Autobusy a vlaky ze zastávek v obci', vychoziVelikost: 'siroky' },
  parkovani: { nazev: 'Parkování', popis: 'Volná místa na parkovištích', vychoziVelikost: 'uzky' },
  zavady: { nazev: 'Otevřená hlášení závad', popis: 'Závady od občanů, které čekají na vyřízení', vychoziVelikost: 'uzky' },
}

export const VYCHOZI_ROZLOZENI: readonly PolozkaPlochy[] = ID_WIDGETU.map((id) => ({ id, velikost: WIDGETY[id].vychoziVelikost }))

const jeId = (x: unknown): x is IdWidgetu => typeof x === 'string' && (ID_WIDGETU as readonly string[]).includes(x)
const jeVelikost = (x: unknown): x is Velikost => x === 'uzky' || x === 'siroky' || x === 'cely'

/** Posune widget o jedno místo dopředu (-1) nebo dozadu (1). Na kraji plochy nic nemění. */
export function posun(plocha: readonly PolozkaPlochy[], id: IdWidgetu, smer: -1 | 1): PolozkaPlochy[] {
  const i = plocha.findIndex((p) => p.id === id)
  const j = i + smer
  if (i < 0 || j < 0 || j >= plocha.length) return [...plocha]
  const n = [...plocha]
  const a = n[i]
  const b = n[j]
  if (!a || !b) return n
  n[i] = b
  n[j] = a
  return n
}

/** Přesune widget před jiný widget (za = false) nebo za něj (za = true). Pro přetažení myší. */
export function presunK(plocha: readonly PolozkaPlochy[], id: IdWidgetu, cil: IdWidgetu, za: boolean): PolozkaPlochy[] {
  const presouvany = plocha.find((p) => p.id === id)
  if (!presouvany || id === cil || !plocha.some((p) => p.id === cil)) return [...plocha]
  const bez = plocha.filter((p) => p.id !== id)
  const k = bez.findIndex((p) => p.id === cil) + (za ? 1 : 0)
  return [...bez.slice(0, k), presouvany, ...bez.slice(k)]
}

export function odeber(plocha: readonly PolozkaPlochy[], id: IdWidgetu): PolozkaPlochy[] {
  return plocha.filter((p) => p.id !== id)
}

/** Přidá widget na konec plochy ve výchozí velikosti. Widget, který už na ploše je, se nezdvojí. */
export function pridej(plocha: readonly PolozkaPlochy[], id: IdWidgetu): PolozkaPlochy[] {
  if (plocha.some((p) => p.id === id)) return [...plocha]
  return [...plocha, { id, velikost: WIDGETY[id].vychoziVelikost }]
}

export function zmenVelikost(plocha: readonly PolozkaPlochy[], id: IdWidgetu, velikost: Velikost): PolozkaPlochy[] {
  return plocha.map((p) => (p.id === id ? { ...p, velikost } : p))
}

/** Widgety, které na ploše nejsou, v pořadí katalogu. */
export function mimoPlochu(plocha: readonly PolozkaPlochy[]): IdWidgetu[] {
  return ID_WIDGETU.filter((id) => !plocha.some((p) => p.id === id))
}

const VERZE = 1

export function zapisRozlozeni(plocha: readonly PolozkaPlochy[]): string {
  return JSON.stringify({ verze: VERZE, widgety: plocha })
}

/**
 * Přečte uložené rozložení. Neznámé widgety a velikosti zahodí, duplicity vynechá.
 * Když nic uložené není nebo je to nečitelné, vrátí výchozí rozložení.
 */
export function prectiRozlozeni(text: string | null): PolozkaPlochy[] {
  if (!text) return [...VYCHOZI_ROZLOZENI]
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return [...VYCHOZI_ROZLOZENI]
  }
  if (typeof data !== 'object' || data === null || !('verze' in data) || data.verze !== VERZE || !('widgety' in data) || !Array.isArray(data.widgety)) {
    return [...VYCHOZI_ROZLOZENI]
  }
  const vysledek: PolozkaPlochy[] = []
  for (const p of data.widgety as unknown[]) {
    if (typeof p !== 'object' || p === null) continue
    const id = 'id' in p ? p.id : undefined
    const velikost = 'velikost' in p ? p.velikost : undefined
    if (!jeId(id) || vysledek.some((x) => x.id === id)) continue
    vysledek.push({ id, velikost: jeVelikost(velikost) ? velikost : WIDGETY[id].vychoziVelikost })
  }
  return vysledek
}

export const jeVychozi = (plocha: readonly PolozkaPlochy[]) => zapisRozlozeni(plocha) === zapisRozlozeni(VYCHOZI_ROZLOZENI)

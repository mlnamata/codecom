/**
 * Úrovně editoru (docs/navrh-platformy/04-admin-editor.md). Úroveň se překládá na seznam
 * schopností. V ukázce se volí parametrem `?uroven=` a drží v nezbytné cookie, v produkci
 * ji určuje předplatné obce a kontroluje se na serveru.
 */
export const UROVNE = ['zaklad', 'pokrocily', 'advance'] as const
export type Uroven = (typeof UROVNE)[number]

export const NAZEV_UROVNE: Record<Uroven, string> = { zaklad: 'Základ', pokrocily: 'Pokročilý', advance: 'Advance' }
export const PRINCIP_UROVNE: Record<Uroven, string> = { zaklad: 'Píšu obsah', pokrocily: 'Skládám stránky', advance: 'Upravuji skoro vše' }

export const COOKIE_UROVNE = 'ukazka-uroven'

export const jeUroven = (v: unknown): v is Uroven => typeof v === 'string' && (UROVNE as readonly string[]).includes(v)

export const poradi = (u: Uroven): number => UROVNE.indexOf(u)
export const staci = (mam: Uroven, potrebuji: Uroven): boolean => poradi(mam) >= poradi(potrebuji)

export interface Schopnosti {
  uzivatele: number
  podstranky: number
  urovniMenu: number
  pridatDoMenu: boolean
  skladatel: boolean
  sloupce: boolean
  schvalovani: boolean
  podweby: number
  vlastniBarva: boolean
  vsechnyTokeny: boolean
  vlastniKod: boolean
  ai: boolean
  historieDni: number | null
  role: string[]
}

export function schopnosti(u: Uroven): Schopnosti {
  const z = poradi(u)
  return {
    uzivatele: [3, 10, Number.POSITIVE_INFINITY][z]!,
    podstranky: [30, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY][z]!,
    urovniMenu: [1, 2, 3][z]!,
    pridatDoMenu: z >= 1,
    skladatel: z >= 1,
    sloupce: z >= 2,
    schvalovani: z >= 1,
    podweby: [0, 3, Number.POSITIVE_INFINITY][z]!,
    vlastniBarva: z >= 1,
    vsechnyTokeny: z >= 2,
    vlastniKod: z >= 2,
    ai: z >= 2,
    historieDni: [30, 365, null][z]!,
    role: [
      ['Správce obce', 'Redaktor'],
      ['Správce obce', 'Redaktor', 'Schvalovatel', 'Úřední deska', 'Redaktor organizace'],
      ['Správce obce', 'Redaktor', 'Schvalovatel', 'Úřední deska', 'Redaktor organizace', 'Vlastní role'],
    ][z]!,
  }
}

export const pocet = (n: number): string => (Number.isFinite(n) ? String(n) : 'neomezeně')

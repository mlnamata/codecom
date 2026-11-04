/** Orientační ceny „od“ podle docs/navrh-platformy/04-admin-editor.md, platí ke 4. 11. 2026. */
export const STITEK_CENY = 'Orientační cena, přesnou pošleme v nabídce. Platí ke 4. 11. 2026.'

export const VELIKOSTI = [
  { klic: 'do500', nazev: 'do 500 obyvatel' },
  { klic: '500-2000', nazev: '500–2 000 obyvatel' },
  { klic: '2000-10000', nazev: '2 000–10 000 obyvatel' },
] as const

export type KlicUrovne = 'zaklad' | 'pokrocily' | 'advance'

export const CENY_WEBU: Record<KlicUrovne, [number, number, number]> = {
  zaklad: [590, 990, 1690],
  pokrocily: [890, 1490, 2490],
  advance: [1490, 2290, 3790],
}

export const CENA_URADU: [number, number, number] = [600, 1000, 2000]
export const CENA_BUDOVY = 390

const NBSP = String.fromCharCode(160)
export const kc = (n: number) => `${n.toLocaleString('cs-CZ').replace(/\s/g, NBSP)}${NBSP}Kč`

export function spocitej(velikost: number, uroven: KlicUrovne, urad: boolean, budovy: number): number {
  const v = Math.min(2, Math.max(0, velikost))
  return CENY_WEBU[uroven][v]! + (urad ? CENA_URADU[v]! : 0) + Math.max(0, Math.floor(budovy)) * CENA_BUDOVY
}

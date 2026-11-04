import type { StavFaktury, StavPredplatneho } from './data/predplatne'

const NBSP = String.fromCharCode(160)

export const kc = (n: number): string => `${n.toLocaleString('cs-CZ').replace(/\s/g, NBSP)}${NBSP}Kč`

/** ISO den (2026-11-04) jako 4. 11. 2026. */
export function datum(den: string): string {
  const [r, m, d] = den.split('-')
  return `${Number(d)}. ${Number(m)}. ${r}`
}

export const tridaFaktury = (s: StavFaktury): string => ({ zaplacena: 'dobre', neuhrazena: 'neutralni', 'po-splatnosti': 'spatne', upominka: 'pozor' })[s]

export const tridaPredplatneho = (s: StavPredplatneho): string => ({ aktivni: 'dobre', zkusebni: 'neutralni', 'jen-cteni': 'spatne', vypovezeno: 'pozor' })[s]

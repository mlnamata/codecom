import { kontrast, type Paleta } from '@codekom/tokeny'
import type { StavUkazky } from './stav'

const BILA = '#ffffff'
const CERNA = '#111111'

/** Barva textu na ploše: bílá, nebo černá, podle toho, co má vyšší kontrast. */
export const textNa = (pozadi: string): string => (kontrast(pozadi, BILA) >= kontrast(pozadi, CERNA) ? BILA : CERNA)

/**
 * CSS proměnné, které přepíšou barvy šablony vlastní volbou obce. Text na barevných plochách
 * se dopočítá tak, aby měl co nejvyšší kontrast. Odkazy dostanou vlastní barvu jen tehdy,
 * když má na pozadí webu kontrast aspoň 4,5 : 1, jinak zůstane barva šablony.
 */
export function vlastniBarvy(paleta: Paleta, stav: StavUkazky): Record<string, string> {
  const out: Record<string, string> = {}
  if (stav.barva) {
    out['--primary'] = stav.barva
    out['--on-primary'] = textNa(stav.barva)
    if (kontrast(stav.barva, paleta.bg) >= 4.5) out['--link'] = stav.barva
  }
  if (stav.akcent) {
    out['--accent'] = stav.akcent
    out['--on-accent'] = textNa(stav.akcent)
  }
  return out
}

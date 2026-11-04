// Logika šablony Hranice: zobrazení česky, německy nebo obojí (podle tpls.py). Obsah je česky,
// německé jsou jen popisky rozhraní z návrhu.
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

type Jazyk = 'cs' | 'both' | 'de'
export const POCATECNI_STAV: { lang: Jazyk } = { lang: 'both' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const VOLBY: [Jazyk, string][] = [
  ['cs', 'Česky'],
  ['both', 'Obojí'],
  ['de', 'Deutsch'],
]

export function hodnoty(self: Self, _c: C, _data: DataUvodu) {
  const L = self.state.lang
  return {
    langs: VOLBY.map(([k, label]) => ({
      label,
      lang: k === 'de' ? 'de' : 'cs',
      pressed: L === k,
      bg: L === k ? 'var(--primary)' : 'transparent',
      ink: L === k ? 'var(--on-primary)' : 'var(--ink)',
      pick: () => self.setState({ lang: k }),
    })),
    showCs: L !== 'de',
    showDe: L !== 'cs',
    showBoth: L === 'both',
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

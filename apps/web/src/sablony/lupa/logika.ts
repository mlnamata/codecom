// Logika šablony Lupa: velikost písma 20, 24 nebo 28 px (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV: { size: 20 | 24 | 28 } = { size: 20 }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const VELIKOSTI: [20 | 24 | 28, string, string][] = [
  [20, 'A', 'Běžné písmo'],
  [24, 'A+', 'Větší písmo'],
  [28, 'A++', 'Největší písmo'],
]

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const cur = self.state.size
  return {
    fs: `${cur}px`,
    sizes: VELIKOSTI.map(([size, label, name]) => ({
      label,
      name,
      pressed: cur === size,
      bg: cur === size ? c.primary : c.bg,
      ink: cur === size ? c.onPrimary : c.ink,
      pick: () => self.setState({ size }),
    })),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

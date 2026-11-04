// Logika šablony Mikroregion: výběr části obce, u každé části ilustrační fotografie (podle tpls.py).
// Kreslenou mapu částí nahradily fotografie (rozhodnutí zakladatele ze 4. 11. 2026: jen fotky).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'

export const POCATECNI_STAV = { sel: 'jl' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const casti = [
    { id: 'jl', name: 'Javoří Lhota', facts: '412 obyvatel, náves s lípou a kostelem sv. Václava', now: 'Lampionový průvod v sobotu 7. listopadu od hasičárny ke kapli sv. Anny.', foto: 'sablona-01-naves.webp', alt: POPISY_FOTEK.naves ?? '' },
    { id: 'pj', name: 'Podjavoří', facts: '138 obyvatel, pod Javorníkem, vleky a rozhledna', now: 'Kanalizace: obec podala žádost o dotaci, rozhodnutí přijde v prosinci.', foto: 'sablona-09-hreben.webp', alt: POPISY_FOTEK.hreben ?? '' },
    { id: 'hj', name: 'Hájek', facts: '86 obyvatel, objížďka při uzavírce mostu', now: 'Od 2. listopadu tudy vede objížďka a staví tu autobus 431.', foto: 'sablona-03-studanka.webp', alt: POPISY_FOTEK.studanka ?? '' },
    { id: 'nr', name: 'Na Rovném', facts: '48 obyvatel, Mlýnský rybník a pila', now: 'Výlov Mlýnského rybníka v sobotu 14. listopadu od 9 hodin.', foto: 'sablona-13-mlyn.webp', alt: POPISY_FOTEK.mlyn ?? '' },
  ]
  const s = self.state.sel
  const cur = casti.find((x) => x.id === s) ?? casti[0]!
  return {
    cur,
    parts: casti.map((x) => ({
      name: x.name,
      pressed: x.id === s,
      bg: x.id === s ? c.primary : c.surface,
      ink: x.id === s ? c.onPrimary : c.ink,
      pick: () => self.setState({ sel: x.id }),
    })),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

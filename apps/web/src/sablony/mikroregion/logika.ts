// Logika šablony Mikroregion: výběr části obce na mapě (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV = { sel: 'jl' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const casti = [
    { id: 'jl', name: 'Javoří Lhota', facts: '412 obyvatel, náves s lípou a kostelem sv. Václava', now: 'Lampionový průvod v sobotu 7. listopadu od hasičárny ke kapli sv. Anny.', d: 'M150 120 L300 96 L330 210 L240 270 L130 236z', lx: 230, ly: 182, base: c.x.m1 ?? c.surface },
    { id: 'pj', name: 'Podjavoří', facts: '138 obyvatel, pod Javorníkem, vleky a rozhledna', now: 'Kanalizace: obec podala žádost o dotaci, rozhodnutí přijde v prosinci.', d: 'M300 96 L480 60 L500 190 L330 210z', lx: 400, ly: 140, base: c.x.m2 ?? c.surface },
    { id: 'hj', name: 'Hájek', facts: '86 obyvatel, objížďka při uzavírce mostu', now: 'Od 2. listopadu tudy vede objížďka a staví tu autobus 431.', d: 'M130 236 L240 270 L260 400 L90 410 L60 300z', lx: 165, ly: 330, base: c.x.m3 ?? c.surface },
    { id: 'nr', name: 'Na Rovném', facts: '48 obyvatel, Mlýnský rybník a pila', now: 'Výlov Mlýnského rybníka v sobotu 14. listopadu od 9 hodin.', d: 'M240 270 L330 210 L500 190 L490 390 L260 400z', lx: 380, ly: 300, base: c.x.m4 ?? c.surface },
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
    shapes: casti.map((x) => ({
      name: x.name,
      d: x.d,
      lx: x.lx,
      ly: x.ly,
      fill: x.id === s ? c.primary : x.base,
      ink: x.id === s ? c.onPrimary : c.ink,
      pick: () => self.setState({ sel: x.id }),
    })),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

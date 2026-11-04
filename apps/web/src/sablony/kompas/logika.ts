// Logika šablony Kompas: vrstvy mapy služeb a výběr místa (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

type Vrstva = 'kont' | 'hriste' | 'aed' | 'park' | 'zavady'
export const POCATECNI_STAV: { on: Record<Vrstva, boolean>; sel: string } = {
  on: { kont: true, hriste: true, aed: true, park: false, zavady: true },
  sel: 'z1',
}
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const VRSTVY: Vrstva[] = ['kont', 'hriste', 'aed', 'park', 'zavady']

const MISTA: { id: string; l: Vrstva; x: string; y: string; title: string; info: string }[] = [
  { id: 'k1', l: 'kont', x: '44%', y: '40%', title: 'Kontejnery na návsi', info: 'Papír, plast, sklo a kovy. Plasty se vyvážejí každou středu, při svátku o den později.' },
  { id: 'k2', l: 'kont', x: '78%', y: '26%', title: 'Kontejnery v Podjavoří', info: 'Papír, plast a bioodpad. Bioodpad naposledy 20. listopadu.' },
  { id: 'h1', l: 'hriste', x: '30%', y: '64%', title: 'Hřiště za školou', info: 'Nové hřiště pro děti 3 až 12 let, otevřeno denně 8 až 20 hodin.' },
  { id: 'a1', l: 'aed', x: '50%', y: '48%', title: 'Defibrilátor na obecním úřadu', info: 'Ve vstupní hale, venkovní dveře jsou odemčené nonstop.' },
  { id: 'a2', l: 'aed', x: '62%', y: '34%', title: 'Defibrilátor v hasičárně', info: 'Na zdi u vrat, skříňka se otevře bez klíče.' },
  { id: 'p1', l: 'park', x: '20%', y: '30%', title: 'Parkoviště pod Javorníkem', info: '40 míst, zdarma. V zimě se platí 50 Kč za den.' },
  { id: 'z1', l: 'zavady', x: '58%', y: '74%', title: 'Uzavírka mostu přes Javornický potok', info: 'Od 2. listopadu do 30. listopadu. Objížďka vede přes Hájek, autobus 431 staví u hájovny.' },
  { id: 'z2', l: 'zavady', x: '36%', y: '22%', title: 'Nesvítí lampa v ulici K Javorníku', info: 'Nahlášeno 29. října. Oprava je objednaná na středu 4. listopadu.' },
]

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const s = self.state
  const dark = c.bg === '#12181C'
  const L: Record<Vrstva, [string, string]> = {
    kont: ['Kontejnery', dark ? '#5CC8D8' : '#0E5A6B'],
    hriste: ['Hřiště', dark ? '#8CD47E' : '#3F7A12'],
    aed: ['Defibrilátory', dark ? '#FF7A7A' : '#B42318'],
    park: ['Parkování', dark ? '#A9B6FF' : '#3949AB'],
    zavady: ['Závady a uzavírky', dark ? '#FFB067' : '#B54708'],
  }
  const layers = VRSTVY.map((k) => ({
    label: L[k][0],
    color: L[k][1],
    pressed: s.on[k],
    bg: s.on[k] ? L[k][1] : c.bg,
    ink: s.on[k] ? (dark ? '#0B1114' : '#FFFFFF') : c.ink,
    dot: s.on[k] ? (dark ? '#0B1114' : '#FFFFFF') : L[k][1],
    toggle: () => self.setState({ on: { ...s.on, [k]: !s.on[k] } }),
  }))
  const pins = MISTA.filter((p) => s.on[p.l]).map((p) => ({
    title: p.title,
    x: p.x,
    y: p.y,
    color: L[p.l][1],
    size: p.id === s.sel ? '36px' : '28px',
    off: p.id === s.sel ? '-18px' : '-14px',
    ring: p.id === s.sel ? c.ink : 'transparent',
    pressed: p.id === s.sel,
    pick: () => self.setState({ sel: p.id }),
  }))
  const cur = MISTA.find((p) => p.id === s.sel) ?? MISTA[0]!
  return { layers, pins, sel: { title: cur.title, info: cur.info, layerLabel: L[cur.l][0], color: L[cur.l][1] } }
}

export type Hodnoty = ReturnType<typeof hodnoty>

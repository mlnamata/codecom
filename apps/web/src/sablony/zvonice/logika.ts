// Logika šablony Zvonice: filtr úřední desky podle kategorie a přepínač starších dokumentů.
// Vychází z tpls.py; data jsou z úřední desky obce (stejné filtrujDesku jako stránka desky).
import type { Paleta } from '@codekom/tokeny'
import { denCely } from '../sdilene/format'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV: { cat: string | null; old: boolean } = { cat: null, old: false }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const tvar = (n: number): string => (n === 1 ? 'dokument' : n >= 2 && n <= 4 ? 'dokumenty' : 'dokumentů')

export function hodnoty(self: Self, c: C, data: DataUvodu) {
  const s = self.state
  const nazvy = new Map(data.kategorieDesky.map((k) => [k.slug, k.nazev]))
  const vse = [
    ...data.deska.map((d) => ({ d, sejmuto: false })),
    ...data.deskaArchiv.map((d) => ({ d, sejmuto: true })),
  ]
  const shown = vse.filter((x) => (s.cat === null || x.d.kategorie === s.cat) && (s.old || !x.sejmuto))
  const kategorie: { label: string; slug: string | null }[] = [
    { label: 'Vše', slug: null },
    ...data.kategorieDesky.map((k) => ({ label: k.nazev, slug: k.slug })),
  ]
  return {
    cats: kategorie.map((k) => ({
      label: k.label,
      pressed: s.cat === k.slug,
      bg: s.cat === k.slug ? c.ink : c.bg,
      ink: s.cat === k.slug ? c.bg : c.ink,
      edge: s.cat === k.slug ? c.ink : c.line,
      pick: () => self.setState({ cat: k.slug }),
    })),
    docs: shown.map(({ d, sejmuto }) => ({
      title: d.nazev,
      cat: nazvy.get(d.kategorie) ?? d.kategorie,
      state: sejmuto ? ', sejmuto' : '',
      from: denCely(d.vyvesenoOd),
      to: denCely(d.vyvesenoDo),
      href: d.href,
    })),
    rowCount: shown.length + 1,
    countText: `Zobrazeno ${shown.length} z ${vse.length} ${tvar(vse.length)}`,
    empty: shown.length === 0,
    oldPressed: s.old,
    oldMark: s.old ? c.ink : 'transparent',
    toggleOld: () => self.setState({ old: !s.old }),
    reset: () => self.setState({ cat: null, old: false }),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

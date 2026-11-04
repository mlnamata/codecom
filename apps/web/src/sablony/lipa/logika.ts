// Logika šablony Lípa: hledání úkolů bez ohledu na diakritiku a rychlé volby slovesem (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { ChangeEvent } from 'react'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV = { q: '' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const VSE = [
  { title: 'Zaplatit poplatek za odpad', how: 'online kartou, 900 Kč na osobu', k: 'zaplatit odpad poplatek popelnice platba', href: '/sluzby/platby' },
  { title: 'Zaplatit poplatek ze psů', how: 'online kartou, 200 Kč na rok', k: 'zaplatit pes psa poplatek', href: '/sluzby/platby' },
  { title: 'Přihlásit nebo odhlásit psa', how: 'online s Identitou občana', k: 'prihlasit odhlasit pes psa', href: '/sluzby#prihlasit-psa' },
  { title: 'Přihlásit se k trvalému pobytu', how: 'na úřadě, poplatek 50 Kč', k: 'prihlasit pobyt adresa stehovani', href: '/zivotni-situace/stehuji-se-do-obce' },
  { title: 'Pronajmout sál nebo sokolovnu', how: 'rezervace s platbou', k: 'pronajmout sal sokolovna rezervace oslava', href: '/sluzby/rezervace' },
  { title: 'Svoz bioodpadu a plastů', how: 'kalendář podle adresy', k: 'najit odpad svoz bio plast popelnice', href: '/sluzby#svoz-odpadu' },
  { title: 'Povolení ke kácení stromu', how: 'formulář s mapou', k: 'podat zadost kaceni strom drevina', href: '/sluzby#kaceni-stromu' },
  { title: 'Objednat se na úřad', how: 'Czech POINT, ověření podpisu', k: 'objednat overeni podpis czech point vypis', href: '/sluzby#objednat-se-na-urad' },
  { title: 'Nahlásit závadu', how: 'fotka a místo na mapě', k: 'nahlasit zavada rozbite lampa vymol most', href: '/sluzby/nahlasit-zavadu' },
]

const SLOVESA: [string, string][] = [
  ['Zaplatit', 'zaplatit'],
  ['Nahlásit', 'nahlasit'],
  ['Přihlásit', 'prihlasit'],
  ['Objednat se', 'objednat'],
  ['Pronajmout', 'pronajmout'],
]

const norm = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const q = norm(self.state.q).trim()
  const hits = q ? VSE.filter((x) => norm(`${x.title} ${x.k}`).includes(q)).slice(0, 5) : VSE.slice(0, 4)
  return {
    q: self.state.q,
    setQ: (e: ChangeEvent<HTMLInputElement>) => self.setState({ q: e.target.value }),
    hits,
    verbs: SLOVESA.map(([label, klic]) => ({
      label,
      pressed: q === klic,
      bg: q === klic ? c.ink : c.bg,
      ink: q === klic ? c.bg : c.ink,
      pick: () => self.setState({ q: q === klic ? '' : klic }),
    })),
    empty: q.length > 0 && hits.length === 0,
    clear: () => self.setState({ q: '' }),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

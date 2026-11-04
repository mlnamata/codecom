// Logika šablony Magistrát: ukázka AI asistenta. Odpovědi jsou předpřipravené
// v obsah/javori-lhota/asistent-ukazka.json, model se nevolá a dotazy se neukládají.
// Každá odpověď začíná větou, že odpovídá umělá inteligence, a cituje dokumenty desky.
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV = { i: 0 }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

export function hodnoty(self: Self, c: C, data: DataUvodu) {
  const qa = data.asistent
  const cur = qa[self.state.i] ?? qa[0]
  return {
    q: cur?.otazka ?? '',
    answer: cur?.odpoved ?? '',
    sources: cur?.zdroje.map((z) => z.nazev) ?? [],
    sourcesOdkazy: cur?.zdroje.map((z) => z.href) ?? [],
    suggest: qa.map((x, i) => ({
      q: x.otazka,
      pressed: i === self.state.i,
      bg: i === self.state.i ? c.onDeep : 'transparent',
      ink: i === self.state.i ? c.deep : c.onDeep,
      pick: () => self.setState({ i }),
    })),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

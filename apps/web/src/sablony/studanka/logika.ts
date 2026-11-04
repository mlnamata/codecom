// Logika šablony Studánka: přepínač léto a zima (podle tpls.py).
// Poplatek za rekreační objekt je podle dat obce 900 Kč (návrh uváděl 600 Kč, viz obsah/javori-lhota/README.md).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

export const POCATECNI_STAV: { season: 'leto' | 'zima' } = { season: 'leto' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const LETO = [
  { title: 'Svoz odpadu i v sobotu', text: 'Od května do září vyvážíme popelnice také v sobotu ráno, aby nezůstávaly plné přes týden.' },
  { title: 'Koupání v Mlýnském rybníce', text: 'Teplotu a čistotu vody měříme každý den. Výsledek visí u hráze a tady na webu.' },
  { title: 'Studánka u kaple sv. Anny', text: 'Voda je pitná, poslední rozbor 22. října. Prosíme, nemyjte u studánky nádobí.' },
  { title: 'Poplatek za rekreační objekt', text: '900 Kč na rok, splatný do 31. května. Zaplatíte kartou online nebo převodem.' },
]
const ZIMA = [
  { title: 'Svoz jen v úterý', text: 'Od října do dubna jezdí popeláři jednou týdně. Nádobu připravte do 6 hodin ráno.' },
  { title: 'Co se prohrnuje', text: 'Obec prohrnuje silnici na náves, k autobusu a na Javorník. Cesta k Hájku se v zimě neudržuje.' },
  { title: 'Zazimování chalupy', text: 'Před odjezdem vypusťte vodu a pošlete nám odečet vodoměru. Ušetříte si cestu na úřad.' },
  { title: 'Lyžování na Javorníku', text: 'Dva vleky jezdí od 19. prosince, pokud napadne sníh. Parkoviště je u hospody U Lípy.' },
]

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const leto = self.state.season === 'leto'
  const pick = (on: boolean) => ({ bg: on ? c.onDeep : 'transparent', ink: on ? c.deep : c.onDeep })
  return {
    items: leto ? LETO : ZIMA,
    seasonTitle: leto ? 'Co teď v létě platí' : 'Co teď v zimě platí',
    seasonLead: leto ? 'Platí od května do září.' : 'Platí od října do dubna.',
    letoOn: leto,
    zimaOn: !leto,
    letoBg: pick(leto).bg,
    letoInk: pick(leto).ink,
    zimaBg: pick(!leto).bg,
    zimaInk: pick(!leto).ink,
    sky: leto ? (c.x.sky ?? '#DCEFEA') : '#E8EEF2',
    ground: leto ? (c.x.meadow ?? '#A8B97A') : '#FFFFFF',
    snowOn: leto ? '0' : '1',
    toLeto: () => self.setState({ season: 'leto' }),
    toZima: () => self.setState({ season: 'zima' }),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

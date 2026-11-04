// Logika šablony Radnice: služby podle toho, pro koho jsou (podle tpls.py).
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'

type Publikum = 'obcan' | 'firma' | 'host'
export const POCATECNI_STAV: { aud: Publikum } = { aud: 'obcan' }
export type Stav = typeof POCATECNI_STAV

export interface Self {
  state: Stav
  setState: (z: Partial<Stav>) => void
}

export type C = Paleta & { x: Record<string, string> }

const SLUZBY: Record<Publikum, [string, string, string][]> = {
  obcan: [
    ['Občanský průkaz a pas', 'vyřizuje [ORP], objednáme vás', '/sluzby#objednat-se-na-urad'],
    ['Poplatek za odpad', '900 Kč, zaplatíte online', '/sluzby/platby'],
    ['Svoz odpadu', 'kalendář podle adresy', '/sluzby#svoz-odpadu'],
    ['Přihlášení k pobytu', 'na úřadě, 50 Kč', '/zivotni-situace/stehuji-se-do-obce'],
    ['Hrobové místo', 'smlouva na úřadě', '/zivotni-situace/zemrel-nam-blizky-clovek'],
    ['Nahlásit závadu', 'fotka a místo na mapě', '/sluzby/nahlasit-zavadu'],
  ],
  firma: [
    ['Zábor veřejného prostranství', 'lešení, kontejner, stánek', '/sluzby#ohlasit-zabor'],
    ['Volné parcely Za pilou', '3 parcely, 4,6 ha', '/obecni-urad'],
    ['Odpad z provozovny', 'smlouva s obcí', '/obecni-urad'],
    ['Pronájem sálu', 'firemní akce do 120 lidí', '/sluzby/rezervace'],
    ['Veřejné zakázky', 'profil zadavatele', '/povinne-informace'],
    ['Dotace pro podnikatele', 'program obnovy venkova', '/obecni-urad'],
  ],
  host: [
    ['Kde zaparkovat', 'u hospody U Lípy a pod Javorníkem', '/obecni-urad'],
    ['Javorník a rozhledna', 'pěšky 50 minut z návsi', '/obecni-urad'],
    ['Mlýnský rybník', 'koupání od června', '/obecni-urad'],
    ['Kde se najíst', 'hospoda, pekárna, farma', '/obecni-urad'],
    ['Ubytování', '6 penzionů a chalup', '/obecni-urad'],
    ['Autobus do Klatov', 'linka 431 z návsi', '/obecni-urad'],
  ],
}

const ZALOZKY: [Publikum, string][] = [
  ['obcan', 'Jsem občan'],
  ['firma', 'Podnikám'],
  ['host', 'Jsem tu na návštěvě'],
]

export function hodnoty(self: Self, c: C, _data: DataUvodu) {
  const a = self.state.aud
  return {
    tabs: ZALOZKY.map(([k, label]) => ({
      label,
      sel: a === k,
      bg: a === k ? c.bg : 'transparent',
      ink: a === k ? c.ink : c.onDeep,
      pick: () => self.setState({ aud: k }),
    })),
    services: SLUZBY[a].map(([t, d, href]) => ({ t, d, href })),
  }
}

export type Hodnoty = ReturnType<typeof hodnoty>

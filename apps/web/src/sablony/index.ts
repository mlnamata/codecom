// Vygenerováno skriptem design/generator/do-tsx.py. Každá šablona se načítá zvlášť,
// aby se do stránky dostala jen písma a styly aktivní šablony.
import type { ModulSablony } from './sdilene/typy'

export const NACITANI: Record<string, () => Promise<{ default: ModulSablony }>> = {
  naves: () => import('./naves'),
  zvonice: () => import('./zvonice'),
  studanka: () => import('./studanka'),
  lipa: () => import('./lipa'),
  majka: () => import('./majka'),
  hnizdo: () => import('./hnizdo'),
  hranice: () => import('./hranice'),
  vinice: () => import('./vinice'),
  hreben: () => import('./hreben'),
  rynek: () => import('./rynek'),
  radnice: () => import('./radnice'),
  kolonada: () => import('./kolonada'),
  mlyn: () => import('./mlyn'),
  hraz: () => import('./hraz'),
  lupa: () => import('./lupa'),
  kompas: () => import('./kompas'),
  magistrat: () => import('./magistrat'),
  zpravodaj: () => import('./zpravodaj'),
  mikroregion: () => import('./mikroregion'),
  urad: () => import('./urad'),
  // Skleněné šablony, psané ručně (generátor je zatím nezná).
  sklo: () => import('./sklo'),
  noc: () => import('./noc'),
  aurora: () => import('./aurora'),
}

export async function nactiSablonu(klic: string): Promise<ModulSablony> {
  const nacti = NACITANI[klic] ?? NACITANI.naves
  if (!nacti) throw new Error('Chybí šablona naves')
  return (await nacti()).default
}

import { SABLONY } from '@codekom/tokeny'
import { nactiStranku } from './obsah'

export interface PaletaGalerie {
  index: number
  nazev: string
  barvy: { nazev: string; hodnota: string }[]
  snimek: string
}

export interface SablonaGalerie {
  klic: string
  cislo: string
  nazev: string
  proKoho: string
  cimSeLisi: string
  palety: PaletaGalerie[]
  snimekMobil: string
  foto: string
}

const BARVY: [string, string][] = [
  ['bg', 'Pozadí'],
  ['surface', 'Plocha'],
  ['ink', 'Text'],
  ['primary', 'Hlavní barva'],
  ['accent', 'Doplňková'],
  ['deep', 'Tmavá plocha'],
]

/** Popisy šablon jsou v obsah/prezentace/ukazky.md, barvy palet v @codekom/tokeny. */
export function sablonyGalerie(): SablonaGalerie[] {
  const md = nactiStranku('ukazky').telo
  const popisy = new Map<string, { proKoho: string; cimSeLisi: string }>()
  for (const blok of md.split(/^### /m).slice(1)) {
    const klic = /- Klíč: `(\w+)`/.exec(blok)?.[1]
    if (!klic) continue
    popisy.set(klic, {
      proKoho: /- Pro koho: (.+)/.exec(blok)?.[1]?.trim() ?? '',
      cimSeLisi: /- Čím se liší: (.+)/.exec(blok)?.[1]?.trim() ?? '',
    })
  }
  return SABLONY.map((s) => ({
    klic: s.klic,
    cislo: s.cislo,
    nazev: s.nazev,
    proKoho: popisy.get(s.klic)?.proKoho ?? s.podtitul,
    cimSeLisi: popisy.get(s.klic)?.cimSeLisi ?? '',
    palety: s.palety.map((p, index) => ({
      index,
      nazev: p.nazev,
      barvy: BARVY.map(([k, nazev]) => ({ nazev, hodnota: p[k as 'bg'] })),
      snimek: `/sablony/${s.klic}-${index}-1280.webp`,
    })),
    snimekMobil: `/sablony/${s.klic}-0-375.webp`,
    foto: `/foto/sablona-${s.cislo}-${s.klic}.webp`,
  }))
}

export const najdiSablonu = (klic: string) => sablonyGalerie().find((s) => s.klic === klic)

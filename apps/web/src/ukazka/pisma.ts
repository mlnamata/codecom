import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import '@fontsource-variable/source-serif-4/wght.css'
import '@fontsource-variable/lora/wght.css'
import type { KlicPisma } from './stav'

/**
 * Písma, která si obec může v ukázce zvolit místo písma šablony. Jsou v balíčcích @fontsource
 * a servírují se z webu (žádné volání Googlu). Prohlížeč stáhne jen písmo, které je opravdu použité.
 */
export const PISMA: Record<KlicPisma, { nazev: string; trida: string; rodina: string }> = {
  inter: { nazev: 'Inter (bezpatkové)', trida: '', rodina: '"Inter Variable", system-ui, sans-serif' },
  dmsans: { nazev: 'DM Sans (bezpatkové, oblé)', trida: '', rodina: '"DM Sans Variable", system-ui, sans-serif' },
  atkinson: { nazev: 'Atkinson Hyperlegible (nejčitelnější)', trida: '', rodina: '"Atkinson Hyperlegible", system-ui, sans-serif' },
  sourceserif: { nazev: 'Source Serif (patkové)', trida: '', rodina: '"Source Serif 4 Variable", Georgia, serif' },
  lora: { nazev: 'Lora (patkové, měkké)', trida: '', rodina: '"Lora Variable", Georgia, serif' },
}

export const ZVETSENI = { bezna: 1, vetsi: 1.12, nejvetsi: 1.25 } as const

// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Figtree, Fraunces } from 'next/font/google'

const fFraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-fraunces', display: 'swap', axes: ['opsz'] })
const fFigtree = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-figtree', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fFraunces.variable, fFigtree.variable].join(' ')

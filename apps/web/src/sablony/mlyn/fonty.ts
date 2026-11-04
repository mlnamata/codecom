// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Barlow, Barlow_Condensed } from 'next/font/google'

const fBarlowCondensed = Barlow_Condensed({ subsets: ['latin', 'latin-ext'], variable: '--font-barlow-condensed', display: 'swap', weight: ['500', '600'] })
const fBarlow = Barlow({ subsets: ['latin', 'latin-ext'], variable: '--font-barlow', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fBarlowCondensed.variable, fBarlow.variable].join(' ')

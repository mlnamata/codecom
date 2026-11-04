// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Onest } from 'next/font/google'

const fOnest = Onest({ subsets: ['latin', 'latin-ext'], variable: '--font-onest', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fOnest.variable].join(' ')

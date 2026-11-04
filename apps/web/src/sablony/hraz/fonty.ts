// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Commissioner } from 'next/font/google'

const fCommissioner = Commissioner({ subsets: ['latin', 'latin-ext'], variable: '--font-commissioner', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fCommissioner.variable].join(' ')

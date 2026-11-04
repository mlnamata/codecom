// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Big_Shoulders, Karla } from 'next/font/google'

const fBigShoulders = Big_Shoulders({ subsets: ['latin', 'latin-ext'], variable: '--font-big-shoulders', display: 'swap', weight: ['500', '600'] })
const fKarla = Karla({ subsets: ['latin', 'latin-ext'], variable: '--font-karla', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fBigShoulders.variable, fKarla.variable].join(' ')

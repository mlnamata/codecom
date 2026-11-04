// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Albert_Sans, Cormorant_Garamond } from 'next/font/google'

const fCormorantGaramond = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], variable: '--font-cormorant-garamond', display: 'swap', weight: ['500', '600'] })
const fAlbertSans = Albert_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-albert-sans', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fCormorantGaramond.variable, fAlbertSans.variable].join(' ')

// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Alegreya, Alegreya_Sans } from 'next/font/google'

const fAlegreya = Alegreya({ subsets: ['latin', 'latin-ext'], variable: '--font-alegreya', display: 'swap', weight: ['500', '600'] })
const fAlegreyaSans = Alegreya_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-alegreya-sans', display: 'swap', weight: ['400', '500'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fAlegreya.variable, fAlegreyaSans.variable].join(' ')

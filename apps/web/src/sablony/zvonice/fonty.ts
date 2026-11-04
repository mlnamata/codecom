// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Hanken_Grotesk, Newsreader } from 'next/font/google'

const fHankenGrotesk = Hanken_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-hanken-grotesk', display: 'swap', weight: ['400', '500', '600'] })
const fNewsreader = Newsreader({ subsets: ['latin', 'latin-ext'], variable: '--font-newsreader', display: 'swap', axes: ['opsz'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fHankenGrotesk.variable, fNewsreader.variable].join(' ')

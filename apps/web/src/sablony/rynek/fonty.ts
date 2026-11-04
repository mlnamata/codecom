// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Hanken_Grotesk, Vollkorn } from 'next/font/google'

const fVollkorn = Vollkorn({ subsets: ['latin', 'latin-ext'], variable: '--font-vollkorn', display: 'swap', weight: ['500', '600'] })
const fHankenGrotesk = Hanken_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-hanken-grotesk', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fVollkorn.variable, fHankenGrotesk.variable].join(' ')

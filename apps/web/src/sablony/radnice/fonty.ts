// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Schibsted_Grotesk } from 'next/font/google'

const fSchibstedGrotesk = Schibsted_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-schibsted-grotesk', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fSchibstedGrotesk.variable].join(' ')

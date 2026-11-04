// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Familjen_Grotesk } from 'next/font/google'

const fFamiljenGrotesk = Familjen_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-familjen-grotesk', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fFamiljenGrotesk.variable].join(' ')

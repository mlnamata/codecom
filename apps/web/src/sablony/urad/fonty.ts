// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Roboto } from 'next/font/google'

const fRoboto = Roboto({ subsets: ['latin', 'latin-ext'], variable: '--font-roboto', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fRoboto.variable].join(' ')

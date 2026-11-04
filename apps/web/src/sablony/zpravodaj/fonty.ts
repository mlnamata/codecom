// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Libre_Franklin, Newsreader } from 'next/font/google'

const fNewsreader = Newsreader({ subsets: ['latin', 'latin-ext'], variable: '--font-newsreader', display: 'swap', axes: ['opsz'] })
const fLibreFranklin = Libre_Franklin({ subsets: ['latin', 'latin-ext'], variable: '--font-libre-franklin', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fNewsreader.variable, fLibreFranklin.variable].join(' ')

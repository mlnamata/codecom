// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Archivo } from 'next/font/google'

const fArchivo = Archivo({ subsets: ['latin', 'latin-ext'], variable: '--font-archivo', display: 'swap', axes: ['wdth'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fArchivo.variable].join(' ')

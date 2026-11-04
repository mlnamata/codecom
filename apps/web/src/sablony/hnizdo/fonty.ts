// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Gabarito } from 'next/font/google'

const fGabarito = Gabarito({ subsets: ['latin', 'latin-ext'], variable: '--font-gabarito', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fGabarito.variable].join(' ')

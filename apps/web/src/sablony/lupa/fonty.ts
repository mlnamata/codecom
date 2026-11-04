// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Atkinson_Hyperlegible_Next } from 'next/font/google'

const fAtkinsonHyperlegibleNext = Atkinson_Hyperlegible_Next({ subsets: ['latin', 'latin-ext'], variable: '--font-atkinson-hyperlegible-next', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fAtkinsonHyperlegibleNext.variable].join(' ')

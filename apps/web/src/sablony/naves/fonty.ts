// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Bricolage_Grotesque } from 'next/font/google'

const fBricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin', 'latin-ext'], variable: '--font-bricolage-grotesque', display: 'swap', axes: ['opsz'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fBricolageGrotesque.variable].join(' ')

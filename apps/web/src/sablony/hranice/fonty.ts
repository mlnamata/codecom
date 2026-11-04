// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'

const fIBMPlexSans = IBM_Plex_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-ibm-plex-sans', display: 'swap', weight: ['400', '500', '600'] })
const fIBMPlexSerif = IBM_Plex_Serif({ subsets: ['latin', 'latin-ext'], variable: '--font-ibm-plex-serif', display: 'swap', weight: ['500'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fIBMPlexSans.variable, fIBMPlexSerif.variable].join(' ')

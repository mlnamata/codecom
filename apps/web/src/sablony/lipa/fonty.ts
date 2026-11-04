// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'

const fInstrumentSans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-instrument-sans', display: 'swap', weight: ['400', '500', '600'] })
const fInstrumentSerif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], variable: '--font-instrument-serif', display: 'swap', weight: '400' })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fInstrumentSans.variable, fInstrumentSerif.variable].join(' ')

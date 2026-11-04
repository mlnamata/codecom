// Písma šablony 23 Bellatrix (výjimka z unslop: řezy až 700).
import { Manrope, Outfit } from 'next/font/google'

const fOutfit = Outfit({ subsets: ['latin', 'latin-ext'], variable: '--font-outfit', display: 'swap', weight: ['500', '600', '700'] })
const fManrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-manrope', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fOutfit.variable, fManrope.variable].join(' ')

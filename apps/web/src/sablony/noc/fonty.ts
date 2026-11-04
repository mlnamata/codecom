// Písma šablony 22 Achernar (výjimka z unslop: řezy až 700).
import { Inter, Space_Grotesk } from 'next/font/google'

const fSpace = Space_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--font-space-grotesk', display: 'swap', weight: ['500', '600', '700'] })
const fInter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fSpace.variable, fInter.variable].join(' ')

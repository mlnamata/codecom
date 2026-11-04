// Písmo šablony 21 Canopus (výjimka z unslop: řezy až 800).
import { Plus_Jakarta_Sans } from 'next/font/google'

const fJakarta = Plus_Jakarta_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-plus-jakarta-sans', display: 'swap', weight: ['400', '500', '600', '700', '800'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = fJakarta.variable

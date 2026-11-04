// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google'

const fRedHatDisplay = Red_Hat_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-red-hat-display', display: 'swap', weight: ['500', '600'] })
const fRedHatText = Red_Hat_Text({ subsets: ['latin', 'latin-ext'], variable: '--font-red-hat-text', display: 'swap', weight: ['400', '500', '600'] })

/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */
export const tridyPisem = [fRedHatDisplay.variable, fRedHatText.variable].join(' ')

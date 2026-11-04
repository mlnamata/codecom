import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const FONTY = resolve(process.cwd(), 'node_modules', '@fontsource', 'montserrat', 'files')

/** Montserrat 500 a 600 (latinka a rozšířená latinka kvůli diakritice) pro obrázky OpenGraph. */
export function fontyOg() {
  const f = (rez: 500 | 600, sada: 'latin' | 'latin-ext') => readFileSync(join(FONTY, `montserrat-${sada}-${rez}-normal.woff`))
  return [
    { name: 'Montserrat', data: f(600, 'latin'), weight: 600 as const, style: 'normal' as const },
    { name: 'Montserrat', data: f(600, 'latin-ext'), weight: 600 as const, style: 'normal' as const },
    { name: 'Montserrat', data: f(500, 'latin'), weight: 500 as const, style: 'normal' as const },
    { name: 'Montserrat', data: f(500, 'latin-ext'), weight: 500 as const, style: 'normal' as const },
  ]
}

export const logoBileDataUrl = (): string =>
  `data:image/svg+xml;base64,${readFileSync(resolve(process.cwd(), 'public', 'brand-svg', 'logo-bile.svg')).toString('base64')}`

export const VELIKOST_OG = { width: 1200, height: 630 }

#!/usr/bin/env node
/** Kontrola textů webu: obsah/prezentace/*.md a texty v src/. Při nálezu končí chybou. */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chybyRegistru, radkyRegistru, zkontrolujText } from './kontroly.mjs'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const registr = readFileSync(join(ROOT, 'docs', 'tvrzeni-prezentace.md'), 'utf8')

const soubory = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? soubory(join(d, f)) : [join(d, f)]))
const cile = [
  ...soubory(join(ROOT, 'obsah', 'prezentace')).filter((f) => f.endsWith('.md') && !f.endsWith('tvrzeni.md')),
  ...soubory(join(APP, 'src')).filter((f) => ['.ts', '.tsx'].includes(extname(f))),
]

let pocet = 0
for (const f of cile) {
  let text = readFileSync(f, 'utf8')
  // V kódu kontrolujeme jen texty: řetězce a text mezi značkami JSX.
  if (!f.endsWith('.md')) text = [...text.matchAll(/'([^'\n]{3,})'|`([^`\n]{3,})`|>([^<>{}\n]{3,})</g)].map((m) => m[1] ?? m[2] ?? m[3] ?? '')
      .filter((t) => /\p{L}+ \p{L}+/u.test(t))
      .join('\n')
  for (const n of zkontrolujText(text, registr)) {
    console.log(`${relative(ROOT, f)}: ${n.pravidlo}: ${n.ukazka}`)
    pocet++
  }
}
const chyby = chybyRegistru(radkyRegistru(registr))
for (const c of chyby) console.log(`docs/tvrzeni-prezentace.md: ${c}`)
pocet += chyby.length
console.log(pocet ? `kontrola-obsahu: ${pocet} nálezů` : `kontrola-obsahu: bez nálezů (${cile.length} souborů)`)
process.exit(pocet ? 1 : 0)

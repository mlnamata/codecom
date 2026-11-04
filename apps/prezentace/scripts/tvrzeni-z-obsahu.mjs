#!/usr/bin/env node
/**
 * Registr tvrzení docs/tvrzeni-prezentace.md z obsah/prezentace/tvrzeni.md a z tvrzení,
 * která přibyla v kódu webu (stránky úrovní). Končí chybou, když řádek nemá zdroj nebo datum.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chybyRegistru, radkyRegistru } from './kontroly.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const zdroj = readFileSync(join(ROOT, 'obsah', 'prezentace', 'tvrzeni.md'), 'utf8')
  .replace(/^---[\s\S]*?---\s*/, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}\s*/g, '')

const NAVRH = 'docs/navrh-platformy/04-admin-editor.md'
const DOPLNENE = [
  ['Matice funkcí tří úrovní (historie verzí 30 dní / 1 rok / neomezeně, podstránky do 30, menu 1 až 3 úrovně, podweby 3 / neomezeně, SMS, jazykové verze, API)', 'urovne', NAVRH, '2026-11-04', 'hypoteza'],
  ['Podpora: e-mail do 2 pracovních dnů, telefon do 1 dne, vlastní kontakt do 4 hodin', 'urovne', NAVRH, '2026-11-04', 'hypoteza'],
  ['Školení: video kurz, 1 hodina online, 2 hodiny na místě', 'urovne', NAVRH, '2026-11-04', 'hypoteza'],
  ['Role správce, redaktor, schvalovatel, úřední deska, redaktor organizace, vlastní role', 'urovne', NAVRH, '2026-11-04', 'hypoteza'],
  ['15 bloků do stránek a úroveň, od které jsou', 'urovne', NAVRH, '2026-11-04', 'hypoteza'],
  ['Kontrast barev 4,5 : 1 hlídá editor před zveřejněním', 'urovne', 'CLAUDE.md, apps/web/src/app/ukazka/administrace/Obrazovky.tsx', '2026-11-04', 'overeno'],
  ['Ceny úrovní podle velikosti obce na stránkách úrovní a v kalkulačce', 'urovne, cenik', NAVRH, '2026-11-04', 'orientacni'],
]

const vystup = `# Registr tvrzení prezentačního webu

Vygenerováno skriptem \`apps/prezentace/scripts/tvrzeni-z-obsahu.mjs\` z \`obsah/prezentace/tvrzeni.md\`. Ručně needitujte, upravte zdroj a spusťte skript znovu.

${zdroj.replace(/^# Registr tvrzení\s*/m, '').trim()}

## Doplněno v kódu webu

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
${DOPLNENE.map((r) => `| ${r.join(' | ')} |`).join('\n')}
`
const chyby = chybyRegistru(radkyRegistru(vystup))
if (chyby.length) {
  console.error(chyby.join('\n'))
  process.exit(1)
}
writeFileSync(join(ROOT, 'docs', 'tvrzeni-prezentace.md'), vystup)
console.log(`tvrzeni-z-obsahu: ${radkyRegistru(vystup).length} řádků v docs/tvrzeni-prezentace.md`)

#!/usr/bin/env node
/** Vypíše zbylá [DOPLNIT] a [OVĚŘIT] (soubor, řádek). Varování; s --prisne končí chybou. */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mistaDoplnit } from './kontroly.mjs'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const prisne = process.argv.includes('--prisne')
const soubory = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? soubory(join(d, f)) : [join(d, f)]))
const cile = [...soubory(join(ROOT, 'obsah', 'prezentace')), ...soubory(join(APP, 'src'))].filter((f) => ['.md', '.ts', '.tsx'].includes(extname(f)))

let doplnit = 0
let overit = 0
for (const f of cile) {
  for (const m of mistaDoplnit(readFileSync(f, 'utf8'))) {
    console.log(`${relative(ROOT, f)}:${m.radek} ${m.text}`)
    if (m.text.startsWith('[DOPLNIT')) doplnit++
    else overit++
  }
}
console.log(`kontrola-doplnit: [DOPLNIT] ${doplnit}, [OVĚŘIT] ${overit}`)
if (prisne && doplnit + overit > 0) {
  console.error('Před nasazením musí být všechna místa doplněná.')
  process.exit(1)
}

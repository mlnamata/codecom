#!/usr/bin/env node
/** Zkopíruje snímky šablon, fotky a logo do public/. Zdrojem pravdy zůstávají design/ a brand/. */
import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const ZDROJE = [
  [join(ROOT, 'design', 'snimky'), join(APP, 'public', 'sablony'), '.webp'],
  [join(ROOT, 'design', 'obrazky', 'foto'), join(APP, 'public', 'foto'), '.webp'],
  [join(ROOT, 'brand'), join(APP, 'public', 'brand'), '.png'],
]
for (const [z, c, pripona] of ZDROJE) {
  mkdirSync(c, { recursive: true })
  const soubory = readdirSync(z).filter((f) => f.endsWith(pripona))
  for (const f of soubory) cpSync(join(z, f), join(c, f))
  console.log(`[kopiruj-obrazky] ${soubory.length} souborů do ${c}`)
}

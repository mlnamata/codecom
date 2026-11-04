#!/usr/bin/env node
/**
 * Minimální kontrola pravidel unslop (Damir Sokolovsky, CC BY 4.0) v kódu webu:
 * řezy písma nad 600, přechody, verzálky přes text-transform, vykřičníky v textech,
 * emoji a šipka „→“. Prompt 01 kontrolu rozšíří.
 *
 * Spuštění: node scripts/unslop.mjs [složka ...]  (výchozí apps/web/src a obsah/javori-lhota)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CILE = process.argv.slice(2).length ? process.argv.slice(2) : ['apps/web/src', 'obsah/javori-lhota']
const PRIPONY = new Set(['.ts', '.tsx', '.css', '.json'])
const VYNECHAT = [/payload-types\.ts$/, /migrations[\\/]/, /generovano[\\/]/, /[\\/]sablony\.ts$/]

export const PRAVIDLA = [
  { nazev: 'řez písma nad 600', re: /font-?weight\s*:\s*["']?(700|800|900|bold|bolder)\b/gi },
  { nazev: 'řez písma nad 600', re: /fontWeight:\s*["']?(700|800|900|bold)\b/g },
  { nazev: 'přechod (gradient)', re: /gradient\(/gi },
  { nazev: 'verzálky přes text-transform', re: /text-?transform\s*:\s*["']?uppercase/gi },
  { nazev: 'šipka →', re: /→/g },
  { nazev: 'emoji', re: /\p{Extended_Pictographic}/gu },
]

/** Vykřičník v textu pro lidi: v řetězcích JSON obsahu a v textu mezi JSX značkami. */
const VYKRICNIK_JSON = /"[^"\n]*[\p{L}\s]![^"\n=]*"/gu
const VYKRICNIK_JSX = />[^<>{}\n]*\p{L}![^<>{}\n]*</gu

export function zkontrolujText(text, pripona) {
  const nalezy = []
  for (const p of PRAVIDLA) {
    for (const m of text.matchAll(p.re)) nalezy.push({ pravidlo: p.nazev, index: m.index ?? 0 })
  }
  if (pripona === '.json') for (const m of text.matchAll(VYKRICNIK_JSON)) nalezy.push({ pravidlo: 'vykřičník v textu', index: m.index ?? 0 })
  if (pripona === '.tsx') for (const m of text.matchAll(VYKRICNIK_JSX)) nalezy.push({ pravidlo: 'vykřičník v textu', index: m.index ?? 0 })
  return nalezy
}

function* soubory(cesta) {
  const s = statSync(cesta)
  if (s.isDirectory()) {
    for (const f of readdirSync(cesta)) yield* soubory(join(cesta, f))
  } else if (PRIPONY.has(extname(cesta)) && !VYNECHAT.some((r) => r.test(cesta))) {
    yield cesta
  }
}

function hlavni() {
  let pocet = 0
  for (const cil of CILE) {
    for (const f of soubory(resolve(ROOT, cil))) {
      const text = readFileSync(f, 'utf8')
      for (const n of zkontrolujText(text, extname(f))) {
        const radek = text.slice(0, n.index).split('\n').length
        console.error(`${relative(ROOT, f)}:${radek}  ${n.pravidlo}`)
        pocet++
      }
    }
  }
  if (pocet) {
    console.error(`unslop: ${pocet} nálezů`)
    process.exit(1)
  }
  console.log('unslop: bez nálezů')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) hlavni()

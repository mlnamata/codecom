#!/usr/bin/env node
/**
 * PDF ke stažení: vzorová nabídka, smlouva A, smlouva B, vzor usnesení a kontrolní seznam přechodu.
 * Zdroje: obsah/prezentace (ceník, ke stažení, přechod) a docs/pravni-dokumenty.md (A, B).
 * Chromium z Playwrightu tiskne označené PDF (tagged) s jazykem cs, názvem dokumentu a osnovou.
 *
 * Spuštění: node scripts/pdf.mjs   Výstup: public/ke-stazeni/*.pdf a src/data/ke-stazeni.json
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'
import { marked } from 'marked'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const VYSTUP = join(APP, 'public', 'ke-stazeni')
mkdirSync(VYSTUP, { recursive: true })
mkdirSync(join(APP, 'src', 'data'), { recursive: true })

const cti = (p) => readFileSync(join(ROOT, p), 'utf8').replace(/^---[\s\S]*?---\s*/, '').replace(/\{\/\*[\s\S]*?\*\/\}\s*/g, '')

/** Text od nadpisu `nadpis` (včetně) po další nadpis stejné nebo vyšší úrovně. */
function cast(md, nadpis) {
  const radky = md.split('\n')
  const i = radky.findIndex((r) => r.trim() === nadpis)
  if (i < 0) throw new Error(`Chybí oddíl ${nadpis}`)
  const uroven = /^#+/.exec(nadpis)[0].length
  let j = i + 1
  while (j < radky.length && !(new RegExp(`^#{1,${uroven}} `).test(radky[j]))) j++
  return radky.slice(i, j).join('\n')
}

const povys = (md, o) => md.replace(/^(#+) /gm, (_, h) => `${'#'.repeat(Math.max(1, h.length - o))} `)

const cenik = cti('obsah/prezentace/cenik.md')
const stazeni = cti('obsah/prezentace/ke-stazeni.md')
const prechod = cti('obsah/prezentace/prechod.md')
const pravo = readFileSync(join(ROOT, 'docs', 'pravni-dokumenty.md'), 'utf8')

const DOKUMENTY = [
  {
    soubor: 'vzorova-nabidka.pdf',
    nazev: 'Vzorová cenová nabídka',
    md: [
      '# Vzorová cenová nabídka',
      'Pro obec [DOPLNIT: název obce], [DOPLNIT: počet obyvatel] obyvatel. Nabídku připravila CodeKom s.r.o., IČO [DOPLNIT: IČO], dne [DOPLNIT: datum].',
      'Všechny ceny jsou orientační ceny „od“, měsíčně bez DPH. Orientační cena, přesnou pošleme v nabídce. Platí ke 4. 11. 2026.',
      povys(cast(cenik, '## Web obce podle úrovně editoru'), 0),
      povys(cast(cenik, '## Moduly navíc'), 0),
      povys(cast(cenik, '## Jak se platí'), 0),
      povys(cast(cenik, '## Podmínky ze smlouvy'), 0).replace('Celou smlouvu najdete na stránce [Ke stažení](/ke-stazeni).', 'Celá smlouva je přiložená.'),
      povys(cast(cenik, '## Co v ceně není'), 0),
    ].join('\n\n'),
  },
  { soubor: 'smlouva-o-poskytovani-sluzby.pdf', nazev: 'Smlouva o poskytování služby CodeKom', md: povys(cast(pravo, '## A) Smlouva o poskytování služby CodeKom'), 1) },
  { soubor: 'smlouva-o-zpracovani-osobnich-udaju.pdf', nazev: 'Smlouva o zpracování osobních údajů', md: povys(cast(pravo, '## B) Smlouva o zpracování osobních údajů'), 1) },
  { soubor: 'vzor-usneseni.pdf', nazev: 'Vzor usnesení rady obce', md: povys(cast(stazeni, '## Vzor usnesení'), 1) },
  { soubor: 'kontrolni-seznam-prechodu.pdf', nazev: 'Kontrolní seznam přechodu na CodeKom', md: [povys(cast(prechod, '## Kontrolní seznam přechodu'), 1), povys(cast(prechod, '## Co obec dodá'), 0)].join('\n\n') },
]

const fonty = join(APP, 'node_modules', '@fontsource')
const font = (rodina, rez, sada) => `data:font/woff2;base64,${readFileSync(join(fonty, rodina, 'files', `${rodina}-${sada}-${rez}-normal.woff2`)).toString('base64')}`
const ff = (rodina, nazev, rez) =>
  ['latin', 'latin-ext'].map((s) => `@font-face{font-family:'${nazev}';font-weight:${rez};src:url('${font(rodina, rez, s)}') format('woff2')}`).join('')

const CSS = `${ff('inter', 'Inter', 400)}${ff('inter', 'Inter', 500)}${ff('montserrat', 'Montserrat', 600)}
@page{size:A4;margin:22mm 20mm}
body{font-family:Inter,sans-serif;font-size:11pt;line-height:1.5;color:#1a1a1a}
h1,h2,h3{font-family:Montserrat,sans-serif;font-weight:600;line-height:1.2;color:#000}
h1{font-size:20pt;margin:0 0 12pt}h2{font-size:14pt;margin:18pt 0 6pt}h3{font-size:12pt;margin:12pt 0 4pt}
table{border-collapse:collapse;width:100%;margin:8pt 0}th,td{border-bottom:0.5pt solid #999;padding:4pt 6pt 4pt 0;text-align:left;vertical-align:top}th{font-weight:500}
.vzor{border:1pt solid #000;padding:6pt 8pt;margin:0 0 14pt;font-weight:500}
a{color:#000}`

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const prohlizec = await chromium.launch()
const seznam = []
try {
  const stranka = await prohlizec.newPage()
  for (const d of DOKUMENTY) {
    const telo = marked.parse(d.md.replace(/\]\(\/([^)]*)\)/g, '](https://[DOPLNIT: adresa webu]/$1)'))
    await stranka.setContent(
      `<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>${esc(d.nazev)}</title><style>${CSS}</style></head><body><p class="vzor">Vzor, před podpisem ke kontrole. CodeKom s.r.o.</p>${telo}</body></html>`,
      { waitUntil: 'load' },
    )
    await stranka.evaluate(() => document.fonts.ready)
    const cil = join(VYSTUP, d.soubor)
    await stranka.pdf({ path: cil, format: 'A4', tagged: true, outline: true, printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: `<div style="font-size:8pt;width:100%;text-align:center;font-family:sans-serif">${esc(d.nazev)}, strana <span class="pageNumber"></span> z <span class="totalPages"></span></div>`, margin: { top: '22mm', bottom: '22mm', left: '20mm', right: '20mm' } })
    seznam.push({ soubor: d.soubor, nazev: d.nazev, velikostKb: Math.max(1, Math.round(statSync(cil).size / 1024)) })
  }
} finally {
  await prohlizec.close()
}
writeFileSync(join(APP, 'src', 'data', 'ke-stazeni.json'), `${JSON.stringify(seznam, null, 2)}\n`)
console.log(seznam.map((s) => `${s.soubor} ${s.velikostKb} kB`).join('\n'))

#!/usr/bin/env node
/**
 * Vektorizace loga z PNG v brand/ (potrace) a ověření návratem do rastru.
 * Výstup: brand/svg/{znak,nazev,logo}-{cerne,bile}.svg a kopie do public/brand-svg/.
 * Podíl odlišných pixelů se počítá na oříznuté ploše loga při velikosti originálu.
 *
 * Spuštění: node scripts/logo-svg.mjs
 */
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import potrace from 'potrace'
import sharp from 'sharp'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const BRAND = join(ROOT, 'brand')
const VYSTUP = join(BRAND, 'svg')
const VEREJNE = join(APP, 'public', 'brand-svg')
mkdirSync(VYSTUP, { recursive: true })
mkdirSync(VEREJNE, { recursive: true })

/** Zdroj: PNG a zda je kresba světlá na tmavém (pak se před vektorizací převrátí). */
const LOGA = [
  { nazev: 'znak', soubor: 'codekom-znacka-cerna-pruhledna.png', svetle: false, limit: 0.01 },
  { nazev: 'nazev', soubor: 'codekom-nazev-cerny-pruhledny.png', svetle: false, limit: 0.02 },
  { nazev: 'logo', soubor: 'codekom-logo-cerne-pozadi.png', svetle: true, limit: 0.02 },
]

/** Černá kresba na bílém pozadí, oříznutá na obsah, jako PNG buffer. */
async function predloha(soubor, svetle) {
  let obr = sharp(join(BRAND, soubor)).flatten({ background: svetle ? '#000000' : '#ffffff' }).grayscale()
  if (svetle) obr = obr.negate()
  const png = await obr.png().toBuffer()
  // ořez na kresbu s okrajem 4 px
  const { info } = await sharp(png).trim({ background: '#ffffff', threshold: 40 }).toBuffer({ resolveWithObject: true })
  const sirka = info.width + 8
  const vyska = info.height + 8
  const orez = await sharp(png)
    .extract({ left: Math.max(0, -info.trimOffsetLeft - 4), top: Math.max(0, -info.trimOffsetTop - 4), width: sirka, height: vyska })
    .png()
    .toBuffer()
  return { png: orez, sirka, vyska }
}

const trace = (buf) =>
  new Promise((ok, chyba) =>
    potrace.trace(buf, { threshold: 128, turdSize: 4, optTolerance: 0.2, color: '#000000', background: 'transparent' }, (e, svg) => (e ? chyba(e) : ok(svg))),
  )

/** Jedna cesta, viewBox, bez rozměrů v px a bez rastrových vložek. */
function vycisti(svg, sirka, vyska, barva, titulek) {
  const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sirka} ${vyska}" role="img" aria-label="${titulek}"><path fill="${barva}" fill-rule="evenodd" d="${d}"/></svg>\n`
}

async function binarni(buf, sirka, vyska) {
  const { data } = await sharp(buf).resize(sirka, vyska, { fit: 'fill' }).flatten({ background: '#ffffff' }).grayscale().raw().toBuffer({ resolveWithObject: true })
  return data.map((v) => (v < 128 ? 1 : 0))
}

const vysledky = []
for (const l of LOGA) {
  const { png, sirka, vyska } = await predloha(l.soubor, l.svetle)
  const surove = await trace(png)
  const titulek = l.nazev === 'znak' ? 'CodeKom' : l.nazev === 'nazev' ? 'CodeKom' : 'CodeKom, Tvoříme kódy pro lidi.'
  const cerne = vycisti(surove, sirka, vyska, '#000000', titulek)
  const bile = vycisti(surove, sirka, vyska, '#ffffff', titulek)
  for (const [barva, obsah] of [
    ['cerne', cerne],
    ['bile', bile],
  ]) {
    const cil = join(VYSTUP, `${l.nazev}-${barva}.svg`)
    writeFileSync(cil, obsah)
    copyFileSync(cil, join(VEREJNE, `${l.nazev}-${barva}.svg`))
  }
  const a = await binarni(png, sirka, vyska)
  const b = await binarni(Buffer.from(cerne), sirka, vyska)
  let jine = 0
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) jine++
  const podil = jine / a.length
  vysledky.push({ logo: l.nazev, sirka, vyska, podil, limit: l.limit, ok: podil < l.limit })
}

const zaznam = vysledky.map((v) => `${v.logo}: ${v.sirka} × ${v.vyska} px, odlišných pixelů ${(v.podil * 100).toFixed(2)} % (limit ${v.limit * 100} %) ${v.ok ? 'OK' : 'NAD LIMITEM'}`)
writeFileSync(join(VYSTUP, 'porovnani.txt'), `Porovnání SVG s PNG (scripts/logo-svg.mjs)\n${zaznam.join('\n')}\n`)
console.log(zaznam.join('\n'))
if (vysledky.some((v) => !v.ok)) process.exit(1)

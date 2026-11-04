#!/usr/bin/env node
/**
 * Favicon sada z vektorového znaku (brand/svg/znak-bile.svg): bílý monogram na černém čtverci.
 * Pod 24 px (favicon 16 px) jen písmena CK bez rámečku, podle brand/README.md.
 * Výstup: src/app/icon.svg, src/app/favicon.ico (16, 32, 48), src/app/apple-icon.png (180),
 * public/icon-192.png a public/icon-512.png.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(APP, '..', '..')
const znak = readFileSync(join(ROOT, 'brand', 'svg', 'znak-bile.svg'), 'utf8')
const [, w, h] = /viewBox="0 0 (\d+) (\d+)"/.exec(znak) ?? []
const d = /<path [^>]*d="([^"]+)"/.exec(znak)?.[1]
if (!w || !h || !d) throw new Error('Chybí znak-bile.svg, spusťte scripts/logo-svg.mjs')
const W = Number(w)
const H = Number(h)

/** Čtverec s monogramem; okraj je podíl strany. Výřez `vyrez` zvětší jen vnitřek (písmena). */
function ikona(okraj, vyrez = null) {
  const vb = vyrez ?? [0, 0, W, H]
  const strana = Math.max(vb[2], vb[3]) / (1 - 2 * okraj)
  const x = vb[0] - (strana - vb[2]) / 2
  const y = vb[1] - (strana - vb[3]) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x.toFixed(1)} ${y.toFixed(1)} ${strana.toFixed(1)} ${strana.toFixed(1)}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${strana.toFixed(1)}" height="${strana.toFixed(1)}" fill="#000"/><path fill="#fff" fill-rule="evenodd" d="${d}"/></svg>\n`
}

const plna = ikona(0.14)
// Písmena CK leží uvnitř rámečku: vnitřních zhruba 58 % šířky a 54 % výšky znaku.
const pismena = ikona(0.08, [W * 0.21, H * 0.23, W * 0.58, H * 0.54])

writeFileSync(join(APP, 'src', 'app', 'icon.svg'), plna)
rmSync(join(APP, 'src', 'app', 'icon.png'), { force: true })
const png = (svg, n) => sharp(Buffer.from(svg), { density: 384 }).resize(n, n).png().toBuffer()
await sharp(await png(plna, 180)).toFile(join(APP, 'src', 'app', 'apple-icon.png'))
await sharp(await png(plna, 192)).toFile(join(APP, 'public', 'icon-192.png'))
await sharp(await png(plna, 512)).toFile(join(APP, 'public', 'icon-512.png'))

// ICO s PNG položkami 16 (jen písmena), 32 a 48.
const polozky = [
  [16, await png(pismena, 16)],
  [32, await png(plna, 32)],
  [48, await png(plna, 48)],
]
const hlavicka = Buffer.alloc(6 + 16 * polozky.length)
hlavicka.writeUInt16LE(0, 0)
hlavicka.writeUInt16LE(1, 2)
hlavicka.writeUInt16LE(polozky.length, 4)
let posun = hlavicka.length
polozky.forEach(([n, data], i) => {
  const o = 6 + 16 * i
  hlavicka.writeUInt8(n, o)
  hlavicka.writeUInt8(n, o + 1)
  hlavicka.writeUInt16LE(1, o + 4)
  hlavicka.writeUInt16LE(32, o + 6)
  hlavicka.writeUInt32LE(data.length, o + 8)
  hlavicka.writeUInt32LE(posun, o + 12)
  posun += data.length
})
writeFileSync(join(APP, 'src', 'app', 'favicon.ico'), Buffer.concat([hlavicka, ...polozky.map(([, data]) => data)]))
console.log('[favicon] icon.svg, favicon.ico, apple-icon.png, icon-192.png, icon-512.png')

/**
 * Snímky úvodů šablon pro galerii prezentačního webu (stav krize=off, foto=0).
 * 60 × 1280 × 900 a 20 × 375 × 800 (paleta 0), WebP do design/snimky.
 * Potřebuje běžící sestavený web: SNIMKY_URL (výchozí http://localhost:3000).
 */
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { SABLONY } from '@codekom/tokeny'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const VYSTUP = join(ROOT, 'design', 'snimky')
const URL_WEBU = process.env.SNIMKY_URL ?? 'http://localhost:3000'

mkdirSync(VYSTUP, { recursive: true })
const prohlizec = await chromium.launch()
let pocet = 0
try {
  for (const [sirka, vyska, palety] of [
    [1280, 900, [0, 1, 2]],
    [375, 800, [0]],
  ] as const) {
    const stranka = await prohlizec.newPage({ viewport: { width: sirka, height: vyska } })
    for (const s of SABLONY) {
      for (const p of palety) {
        await stranka.goto(`${URL_WEBU}/?sablona=${s.klic}&paleta=${p}&krize=off&foto=0`, { waitUntil: 'networkidle' })
        // pruh ukázky do snímku nepatří
        await stranka.addStyleTag({ content: '.pruh-ukazky{display:none!important}' })
        const png = await stranka.screenshot({ clip: { x: 0, y: 0, width: sirka, height: vyska } })
        await sharp(png).webp({ quality: 80 }).toFile(join(VYSTUP, `${s.klic}-${p}-${sirka}.webp`))
        pocet++
      }
    }
    await stranka.close()
  }
} finally {
  await prohlizec.close()
}
console.log(`[snimky] ${pocet} souborů v ${VYSTUP}`)

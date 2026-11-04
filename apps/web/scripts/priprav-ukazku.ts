/**
 * Připraví soubory ukázky (spouští se před `dev` a `build`):
 * - fotky šablon z design/obrazky/foto do public/demo/foto,
 * - znak obce do public/demo/znak.svg,
 * - písmo pro PDF do public/demo/pismo,
 * - PDF dokumentů úřední desky do public/demo/deska a jejich velikosti do src/lib/data/generovano/velikosti.json.
 * Generované soubory v public/demo jsou v .gitignore. Velikosti jsou deterministické a jsou v gitu,
 * aby typecheck a testy nepotřebovaly tento krok.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { obec, uredniDeska } from '@codekom/demo-data'
import { formatDay } from '@codekom/typy/pravidla'
import { vytvorPdf } from '../src/lib/pdf'
import { ZNAK_SVG } from '../src/sablony/sdilene/ZnakObce'

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(WEB, '..', '..')
const PUBLIC = join(WEB, 'public', 'demo')

for (const d of ['foto', 'deska', 'pismo']) mkdirSync(join(PUBLIC, d), { recursive: true })

const foto = join(ROOT, 'design', 'obrazky', 'foto')
let fotek = 0
if (existsSync(foto)) {
  for (const f of readdirSync(foto).filter((x) => x.startsWith('sablona-') && x.endsWith('.webp'))) {
    copyFileSync(join(foto, f), join(PUBLIC, 'foto', f))
    fotek++
  }
}
if (fotek < 20) console.warn(`[priprav-ukazku] varování: fotek šablon je ${fotek} z 20, chybějící zůstanou jako ilustrace`)

writeFileSync(join(PUBLIC, 'znak.svg'), ZNAK_SVG)

const pisma = join(WEB, 'node_modules', '@fontsource', 'noto-sans', 'files')
const latin = readFileSync(join(pisma, 'noto-sans-latin-400-normal.woff'))
const ext = readFileSync(join(pisma, 'noto-sans-latin-ext-400-normal.woff'))
writeFileSync(join(PUBLIC, 'pismo', 'noto-sans-latin-400.woff'), latin)
writeFileSync(join(PUBLIC, 'pismo', 'noto-sans-latin-ext-400.woff'), ext)

const velikosti: Record<string, number> = {}
for (const d of uredniDeska.dokumenty) {
  const pdf = await vytvorPdf(
    {
      obec: obec.nazev,
      nazev: d.nazev,
      cisloJednaci: d.cisloJednaci,
      puvodce: d.puvodce,
      vyveseno: `${formatDay(d.vyvesenoOd)} až ${d.vyvesenoDo ? formatDay(d.vyvesenoDo) : 'do odvolání'}`,
      odstavce: d.text,
    },
    { latin, ext },
  )
  writeFileSync(join(PUBLIC, 'deska', `${d.id}.pdf`), pdf)
  velikosti[d.id] = pdf.byteLength
}
const vystup = join(WEB, 'src', 'lib', 'data', 'generovano')
mkdirSync(vystup, { recursive: true })
writeFileSync(join(vystup, 'velikosti.json'), `${JSON.stringify(velikosti, null, 2)}\n`)
console.log(`[priprav-ukazku] fotek ${fotek}, PDF ${Object.keys(velikosti).length}`)

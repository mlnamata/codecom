import { execFileSync, spawnSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { zkontrolujText } from '../../../../scripts/unslop.mjs'

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const ROOT = path.resolve(WEB, '..', '..')
const PYTHON = process.env.PYTHON ?? 'python'

describe('unslop', () => {
  it('najde řez 700, přechod, verzálky, šipku a vykřičník', () => {
    const typy = (t: string, p: string) => zkontrolujText(t, p).map((n) => n.pravidlo)
    expect(typy('a{font-weight:700}', '.css')).toContain('řez písma nad 600')
    expect(typy('a{background:linear-gradient(red,blue)}', '.css')).toContain('přechod (gradient)')
    expect(typy('a{text-transform:uppercase}', '.css')).toContain('verzálky přes text-transform')
    expect(typy('<a>Dál →</a>', '.tsx')).toContain('šipka →')
    expect(typy('<p>Přijďte!</p>', '.tsx')).toContain('vykřičník v textu')
    expect(typy('{ "titulek": "Přijďte!" }', '.json')).toContain('vykřičník v textu')
    expect(typy('a{font-weight:600}', '.css')).toEqual([])
    expect(typy('if (!a) return', '.tsx')).toEqual([])
  })
})

describe('převod šablon do-tsx.py', () => {
  const skript = path.join(ROOT, 'design', 'generator', 'do-tsx.py')

  it('je idempotentní a výstup šablony naves odpovídá snímku', () => {
    const soubory = ['Hlavicka.tsx', 'Uvod.tsx', 'Paticka.tsx', 'styly.css', 'fonty.ts', 'index.ts'].map((f) => path.join(WEB, 'src', 'sablony', 'naves', f))
    const pred = soubory.map((f) => readFileSync(f, 'utf8'))
    execFileSync(PYTHON, [skript, 'naves'], { cwd: ROOT })
    const po = soubory.map((f) => readFileSync(f, 'utf8'))
    expect(po).toEqual(pred)
    expect(po[1]).toMatchSnapshot()
  })

  it('neznámý text odkazu převod zastaví', () => {
    const odkazy = path.join(WEB, 'src', 'sablony', 'sdilene', 'odkazy.ts')
    const zaloha = path.join(mkdtempSync(path.join(tmpdir(), 'odkazy-')), 'odkazy.ts')
    copyFileSync(odkazy, zaloha)
    try {
      const text = readFileSync(odkazy, 'utf8').replace('"Kontakty": "/obecni-urad",', '')
      writeFileSync(odkazy, text)
      const r = spawnSync(PYTHON, [skript, 'naves'], { cwd: ROOT, encoding: 'utf8' })
      expect(r.status).toBe(1)
      expect(r.stderr).toContain('Kontakty')
    } finally {
      copyFileSync(zaloha, odkazy)
      rmSync(path.dirname(zaloha), { recursive: true, force: true })
      execFileSync(PYTHON, [skript, 'naves'], { cwd: ROOT })
    }
  })
})

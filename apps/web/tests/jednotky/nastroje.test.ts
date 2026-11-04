import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { zkontrolujText } from '../../../../scripts/unslop.mjs'

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const ROOT = path.resolve(WEB, '..', '..')
const PYTHON = process.env.PYTHON ?? (spawnSync('python3', ['--version']).status === 0 ? 'python3' : 'python')

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

  /** Spustí generátor pro naves do dočasné složky, ručně dotažené šablony v apps/web nepřepíše. */
  function generuj(): { status: number | null; stderr: string; soubory: string[] } {
    const vystup = mkdtempSync(path.join(tmpdir(), 'sablony-'))
    try {
      const r = spawnSync(PYTHON, [skript, 'naves'], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, CODEKOM_SABLONY_VYSTUP: vystup } })
      const soubory = r.status === 0 ? SOUBORY.map((f) => readFileSync(path.join(vystup, 'naves', f), 'utf8')) : []
      return { status: r.status, stderr: r.stderr, soubory }
    } finally {
      rmSync(vystup, { recursive: true, force: true })
    }
  }
  const SOUBORY = ['Hlavicka.tsx', 'Uvod.tsx', 'Paticka.tsx', 'styly.css', 'fonty.ts', 'index.ts']

  it('je idempotentní a výstup šablony naves odpovídá snímku', () => {
    const prvni = generuj()
    const druhy = generuj()
    expect(prvni.status, prvni.stderr).toBe(0)
    expect(druhy.soubory).toEqual(prvni.soubory)
    expect(prvni.soubory[1]).toMatchSnapshot()
  })

  it('neznámý text odkazu převod zastaví', () => {
    const odkazy = path.join(WEB, 'src', 'sablony', 'sdilene', 'odkazy.ts')
    const zaloha = path.join(mkdtempSync(path.join(tmpdir(), 'odkazy-')), 'odkazy.ts')
    copyFileSync(odkazy, zaloha)
    try {
      const text = readFileSync(odkazy, 'utf8').replace('"Kontakty": "/obecni-urad",', '')
      writeFileSync(odkazy, text)
      const r = generuj()
      expect(r.status).toBe(1)
      expect(r.stderr).toContain('Kontakty')
    } finally {
      copyFileSync(zaloha, odkazy)
      rmSync(path.dirname(zaloha), { recursive: true, force: true })
    }
  })
})

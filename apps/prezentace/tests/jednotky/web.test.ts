import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'
import soubory from '@/data/ke-stazeni.json'
import { STITEK_CENY, spocitej } from '@/lib/cenik'
import { otazky } from '@/lib/seo'

const APP = join(__dirname, '..', '..')
const ROOT = join(APP, '..', '..')

describe('kalkulačka', () => {
  it('sečte web, úřad a budovy', () => {
    expect(spocitej(0, 'zaklad', false, 0)).toBe(590)
    expect(spocitej(1, 'advance', true, 0)).toBe(3290)
    expect(spocitej(2, 'pokrocily', true, 3)).toBe(2490 + 2000 + 3 * 390)
  })
  it('štítek ceny má datum', () => {
    expect(STITEK_CENY).toMatch(/orientační cena, přesnou pošleme v nabídce/i)
    expect(STITEK_CENY).toContain('4. 11. 2026')
  })
})

describe('značka', () => {
  it('SVG odpovídá PNG pod limity', () => {
    const text = readFileSync(join(ROOT, 'brand', 'svg', 'porovnani.txt'), 'utf8')
    expect(text).not.toContain('NAD LIMITEM')
    for (const n of ['znak', 'nazev', 'logo']) for (const b of ['cerne', 'bile']) expect(existsSync(join(ROOT, 'brand', 'svg', `${n}-${b}.svg`))).toBe(true)
  })
  it('SVG nemají rastrové vložky', () => {
    for (const f of readdirSync(join(ROOT, 'brand', 'svg')).filter((x) => x.endsWith('.svg'))) {
      const svg = readFileSync(join(ROOT, 'brand', 'svg', f), 'utf8')
      expect(svg).toContain('viewBox')
      expect(svg).not.toContain('<image')
    }
  })
  it('favicony mají správné rozměry', async () => {
    for (const [f, n] of [
      ['src/app/apple-icon.png', 180],
      ['public/icon-192.png', 192],
      ['public/icon-512.png', 512],
    ] as const) {
      const m = await sharp(join(APP, f)).metadata()
      expect([m.width, m.height]).toEqual([n, n])
    }
    const ico = readFileSync(join(APP, 'src', 'app', 'favicon.ico'))
    expect(ico.readUInt16LE(4)).toBe(3)
    expect([ico[6], ico[22], ico[38]]).toEqual([16, 32, 48])
  })
})

describe('PDF ke stažení', () => {
  it('je jich 5, jsou označené a v češtině', () => {
    expect(soubory).toHaveLength(5)
    for (const s of soubory) {
      const cesta = join(APP, 'public', 'ke-stazeni', s.soubor)
      const pdf = readFileSync(cesta).toString('latin1')
      expect(pdf).toContain('/StructTreeRoot')
      expect(pdf).toMatch(/\/Lang\s*\(cs\)/)
      expect(Math.max(1, Math.round(statSync(cesta).size / 1024))).toBe(s.velikostKb)
    }
  })
})

describe('FAQ', () => {
  it('vytáhne otázky a odpovědi', () => {
    expect(otazky('### Kdo rozhoduje?\nRada [obce](/x).\n### Poznámka\ntext')).toEqual([{ otazka: 'Kdo rozhoduje?', odpoved: 'Rada obce.' }])
  })
})

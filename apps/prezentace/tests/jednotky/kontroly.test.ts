import { describe, expect, it } from 'vitest'
import { HESLO, chybyRegistru, mistaDoplnit, radkyRegistru, zkontrolujText } from '../../scripts/kontroly.mjs'

type Nalez = { pravidlo: string }
const pravidla = (t: string, registr = ''): string[] => (zkontrolujText(t, registr) as Nalez[]).map((n) => n.pravidlo)

describe('kontrola obsahu', () => {
  it('čistý text projde', () => {
    expect(pravidla(`# Ceník\n\nWeb pro obec stojí od 590 Kč. ${HESLO}`)).toEqual([])
  })
  it('najde vykřičník, emoji, šipku a tečku mezi slovy', () => {
    expect(pravidla('Napište nám!')).toContain('vykřičník')
    expect(pravidla('Hotovo \u{1F389}')).toContain('emoji')
    expect(pravidla('Ceník → nabídka')).toContain('šipka →')
    expect(pravidla('Web · Aplikace')).toContain('řetězec A · B')
  })
  it('vykřičník v kódu a u obrázku nevadí', () => {
    expect(pravidla('Text `a !== b` a ![obrázek](x.png)')).toEqual([])
  })
  it('najde nadpis velkými písmeny, ale ne zkratky', () => {
    expect(pravidla('## CENÍK SLUŽEB')).toContain('nadpis velkými písmeny')
    expect(pravidla('## Data v EU a AI v ČR')).toEqual([])
  })
  it('najde zakázaná slova a jména konkurence', () => {
    expect(pravidla('Nejlepší web pro obce')).toContain('zakázané slovo „nejlepší“')
    expect(pravidla('Hrozí pokuta')).toContain('zakázané slovo „pokuta“')
    expect(pravidla('Lepší než Vismo')).toContain('jméno konkurence Vismo')
  })
  it('hlídá přesné heslo', () => {
    expect(pravidla('Tvoříme kód pro lidi.')).toContain('heslo upravené')
    expect(pravidla('Tvoříme kódy pro lidi')).toContain('heslo upravené')
    expect(pravidla(HESLO)).toEqual([])
  })
  it('procento musí být v registru', () => {
    expect(pravidla('Ušetříte 30 % energie')).toContain('procento bez záznamu v registru')
    expect(pravidla('Ušetříte 30 % energie', '| úspora 30 % | x | y | 2026-11-04 | overeno |')).toEqual([])
  })
  it('hlídá proměnnou CENIK_ZVEREJNIT', () => {
    expect(pravidla('if (CENIK_ZVEREJNIT) skryj')).toContain('proměnná CENIK_ZVEREJNIT')
  })
})

describe('registr tvrzení', () => {
  const tabulka = (stav: string, zdroj: string, datum: string) =>
    `| Tvrzení | Stránka | Zdroj | Datum | Stav |\n|---|---|---|---|---|\n| Cena od 590 Kč | cenik | ${zdroj} | ${datum} | ${stav} |`
  it('ověřený řádek se zdrojem a datem projde', () => {
    expect(chybyRegistru(radkyRegistru(tabulka('overeno', 'zákon', '2026-11-04')))).toEqual([])
  })
  it('ověřený a orientační řádek bez zdroje nebo data neprojde', () => {
    expect(chybyRegistru(radkyRegistru(tabulka('overeno', 'zákon', '')))).toHaveLength(1)
    expect(chybyRegistru(radkyRegistru(tabulka('orientacni', '', '2026-11-04')))).toHaveLength(1)
  })
  it('neznámý stav neprojde', () => {
    expect(chybyRegistru(radkyRegistru(tabulka('jiste', 'x', '2026-11-04')))).toHaveLength(1)
  })
})

describe('kontrola doplnit', () => {
  it('najde DOPLNIT a OVĚŘIT s číslem řádku', () => {
    expect(mistaDoplnit('a\nIČO [DOPLNIT: IČO]\nlimit [OVĚŘIT]')).toEqual([
      { radek: 2, text: '[DOPLNIT: IČO]' },
      { radek: 3, text: '[OVĚŘIT]' },
    ])
  })
})

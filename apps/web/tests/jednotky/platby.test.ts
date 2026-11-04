import { describe, expect, it } from 'vitest'
import { ibanZCislaUctu, NEPLATNY_IBAN, spd, variabilniSymbol } from '@/lib/platby'

describe('platby', () => {
  it('převede číslo účtu na IBAN (vzor 19-2000145399/0800)', () => {
    // [OVĚŘIT zdrojem ČBA] vzor z kalkulaček IBAN České bankovní asociace
    expect(ibanZCislaUctu('19-2000145399/0800')).toBe('CZ6508000000192000145399')
    expect(ibanZCislaUctu(' 19-2000145399 / 0800 ')).toBe('CZ6508000000192000145399')
  })

  it('neplatné číslo účtu vrátí null', () => {
    expect(ibanZCislaUctu('[ČÍSLO ÚČTU]')).toBeNull()
    expect(ibanZCislaUctu('19-2000145398/0800')).toBeNull()
    expect(ibanZCislaUctu('124/0800')).toBeNull() // 1·4 + 2·2 + 4·1 = 12, není dělitelné 11
    expect(NEPLATNY_IBAN).toMatch(/^CZ0{22}$/)
  })

  it('variabilní symbol: rok, číslo popisné na 4 místa, pořadí na 2 místa', () => {
    expect(variabilniSymbol(2026, 12, 1)).toBe('2026001201')
    expect(variabilniSymbol(2026, 1234, 3)).toBe('2026123403')
  })

  it('sestaví řetězec SPD', () => {
    expect(spd({ iban: 'CZ6508000000192000145399', castka: 900, vs: '2026001201', zprava: 'Poplatek * za odpad' })).toBe(
      'SPD*1.0*ACC:CZ6508000000192000145399*AM:900.00*CC:CZK*X-VS:2026001201*MSG:Poplatek za odpad',
    )
    expect(spd({ iban: NEPLATNY_IBAN, castka: 1, vs: '1', zprava: 'x'.repeat(80) }).endsWith(`MSG:${'x'.repeat(60)}`)).toBe(true)
  })
})

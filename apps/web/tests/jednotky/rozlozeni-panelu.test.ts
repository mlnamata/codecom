import { describe, expect, it } from 'vitest'
import {
  ID_WIDGETU,
  VYCHOZI_ROZLOZENI,
  jeVychozi,
  mimoPlochu,
  odeber,
  posun,
  presunK,
  prectiRozlozeni,
  pridej,
  zapisRozlozeni,
  zmenVelikost,
} from '@/app/ukazka/administrace/panel/rozlozeni'

const poradi = (p: { id: string }[]) => p.map((x) => x.id)

describe('rozložení řídicího panelu', () => {
  it('výchozí rozložení obsahuje každý widget právě jednou', () => {
    expect(poradi([...VYCHOZI_ROZLOZENI])).toEqual([...ID_WIDGETU])
    expect(mimoPlochu(VYCHOZI_ROZLOZENI)).toEqual([])
    expect(jeVychozi(VYCHOZI_ROZLOZENI)).toBe(true)
  })

  it('posune widget o jedno místo a na kraji nic nezmění', () => {
    const p = posun(VYCHOZI_ROZLOZENI, 'kamera', -1)
    expect(poradi(p).slice(0, 3)).toEqual(['souhrn', 'kamera', 'mapa'])
    expect(posun(VYCHOZI_ROZLOZENI, 'souhrn', -1)).toEqual([...VYCHOZI_ROZLOZENI])
    expect(posun(VYCHOZI_ROZLOZENI, 'zavady', 1)).toEqual([...VYCHOZI_ROZLOZENI])
    expect(jeVychozi(p)).toBe(false)
  })

  it('přesune widget tažením před i za cíl', () => {
    expect(poradi(presunK(VYCHOZI_ROZLOZENI, 'zavady', 'souhrn', false))[0]).toBe('zavady')
    const za = poradi(presunK(VYCHOZI_ROZLOZENI, 'souhrn', 'mapa', true))
    expect(za.slice(0, 2)).toEqual(['mapa', 'souhrn'])
    expect(presunK(VYCHOZI_ROZLOZENI, 'mapa', 'mapa', true)).toEqual([...VYCHOZI_ROZLOZENI])
  })

  it('odebere a znovu přidá widget na konec bez zdvojení', () => {
    const bez = odeber(VYCHOZI_ROZLOZENI, 'mapa')
    expect(mimoPlochu(bez)).toEqual(['mapa'])
    const s = pridej(bez, 'mapa')
    expect(poradi(s).at(-1)).toBe('mapa')
    expect(pridej(s, 'mapa')).toHaveLength(ID_WIDGETU.length)
  })

  it('změní velikost jen vybranému widgetu', () => {
    const p = zmenVelikost(VYCHOZI_ROZLOZENI, 'kamera', 'cely')
    expect(p.find((x) => x.id === 'kamera')?.velikost).toBe('cely')
    expect(p.find((x) => x.id === 'mapa')?.velikost).toBe('siroky')
  })

  it('uložené rozložení přečte zpět a nečitelné nahradí výchozím', () => {
    const p = zmenVelikost(odeber(VYCHOZI_ROZLOZENI, 'zamky'), 'mapa', 'cely')
    expect(prectiRozlozeni(zapisRozlozeni(p))).toEqual(p)
    expect(prectiRozlozeni(zapisRozlozeni([]))).toEqual([])
    expect(prectiRozlozeni(null)).toEqual([...VYCHOZI_ROZLOZENI])
    expect(prectiRozlozeni('{nejde')).toEqual([...VYCHOZI_ROZLOZENI])
    expect(prectiRozlozeni('{"verze":99,"widgety":[]}')).toEqual([...VYCHOZI_ROZLOZENI])
  })

  it('neznámé widgety a duplicity zahodí, neplatnou velikost nahradí výchozí', () => {
    const text = JSON.stringify({ verze: 1, widgety: [{ id: 'mapa', velikost: 'obri' }, { id: 'neznamy', velikost: 'uzky' }, { id: 'mapa', velikost: 'uzky' }, 7] })
    expect(prectiRozlozeni(text)).toEqual([{ id: 'mapa', velikost: 'siroky' }])
  })
})

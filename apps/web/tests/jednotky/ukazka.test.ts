import { describe, expect, it } from 'vitest'
import { adresaStavu, ocisti, sloucit } from '@/ukazka/stav'
import { najdiOsobniUdaje, nahradKontaktemUradu } from '@/app/ukazka/administrace/osobni-udaje'

describe('stav ukázky', () => {
  it('zahodí neplatné hodnoty', () => {
    expect(ocisti({ sablona: 'lipa', paleta: '1', krize: 'warning', foto: '1' })).toEqual({ sablona: 'lipa', paleta: 1, krize: 'warning', foto: true })
    expect(ocisti({ sablona: 'neexistuje', paleta: '7', krize: 'poplach', foto: 'ano' })).toEqual({})
  })

  it('URL má přednost před cookie, krize=auto zruší vynucený banner', () => {
    const cookie = JSON.stringify({ sablona: 'urad', paleta: 2, krize: 'info' })
    expect(sloucit(new URLSearchParams('sablona=lipa'), cookie)).toEqual({ sablona: 'lipa', paleta: 2, krize: 'info' })
    expect(sloucit(new URLSearchParams('krize=auto'), cookie)).toEqual({ sablona: 'urad', paleta: 2 })
    expect(sloucit(new URLSearchParams(''), 'nejson')).toEqual({})
  })

  it('adresa stavu pro prezentační web', () => {
    expect(adresaStavu('/', { sablona: 'lipa', paleta: 1, krize: 'warning', foto: true })).toBe('/?sablona=lipa&paleta=1&krize=warning&foto=1')
  })
})

describe('kontrola osobních údajů', () => {
  it('najde telefon, e-mail a rodné číslo', () => {
    expect(najdiOsobniUdaje('Volejte 777 123 456')).toContain('telefon')
    expect(najdiOsobniUdaje('Pište na jan@example.cz')).toContain('e-mail')
    expect(najdiOsobniUdaje('RČ 850615/1234')).toContain('rodné číslo')
    expect(najdiOsobniUdaje('Volejte na úřad: [TELEFON]')).toEqual([])
  })

  it('nahradí kontakty kontaktem úřadu', () => {
    expect(nahradKontaktemUradu('Volejte 777 123 456 nebo jan@example.cz', '[TELEFON]', '[E-MAIL]')).toBe('Volejte [TELEFON] nebo [E-MAIL]')
  })
})

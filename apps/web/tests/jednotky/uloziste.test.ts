import { beforeEach, describe, expect, it } from 'vitest'
import { demoTed } from '@codekom/demo-data'
import { demoZdroj } from '@/lib/data/demo'
import { uloziste } from '@/lib/data/demo-pamet'
import {
  ABECEDA_KODU,
  ChybaPravidla,
  koliduje,
  novyKod,
  obnovUkazku,
  pridejAktualitu,
  pridejRezervaci,
  pridejZavadu,
  smazDokument,
  ukonciKrizi,
  upravDokument,
  vydejKrizi,
  vyvesDokument,
} from '@/lib/data/zapis'

const OBEC = 'javori-lhota'

beforeEach(() => {
  obnovUkazku()
})

describe('demo zdroj', () => {
  it('úřední deska: 13 visí, archiv bez skrytých po sejmutí', async () => {
    const visi = await demoZdroj.deska(OBEC, { kategorie: null, stav: 'visi', q: '', strana: 1 })
    expect(visi.celkem).toBe(13)
    const archiv = await demoZdroj.deska(OBEC, { kategorie: null, stav: 'sejmuto', q: '', strana: 1 })
    expect(archiv.celkem).toBe(4)
    expect(archiv.polozky.every((d) => !d.skrytPoSejmuti)).toBe(true)
  })

  it('skrytý sejmutý dokument není veřejný ani přes detail', async () => {
    expect(await demoZdroj.dokument(OBEC, 'ulozeni-pisemnosti')).toBeNull()
    expect(await demoZdroj.dokument(OBEC, 'uzavirka-mostu')).not.toBeNull()
  })

  it('banner k demoTed: krize a další dvě hlášení', async () => {
    const k = await demoZdroj.krize(OBEC, demoTed())
    expect(k.hlavni?.uroven).toBe('emergency')
    expect(k.dalsich).toBe(2)
  })

  it('jiná obec nevidí data', async () => {
    expect(await demoZdroj.obec('jina-obec')).toBeNull()
    expect(await demoZdroj.aktuality('jina-obec')).toEqual([])
  })
})

describe('zápisy a pravidla domény', () => {
  it('dokument, který už visel, nejde smazat', () => {
    expect(() => smazDokument('uzavirka-mostu')).toThrow(ChybaPravidla)
    expect(uloziste().dokumenty.some((d) => d.id === 'uzavirka-mostu')).toBe(true)
  })

  it('připravený dokument smazat jde', () => {
    const d = vyvesDokument({
      nazev: 'Zítřejší oznámení',
      kategorie: 'oznameni',
      cisloJednaci: 'OU/1/2026',
      puvodce: 'Obecní úřad',
      vyvesenoOd: '2026-11-10',
      vyvesenoDo: null,
      text: ['Text.'],
      skrytPoSejmuti: true,
    })
    smazDokument(d.id)
    expect(uloziste().dokumenty.some((x) => x.id === d.id)).toBe(false)
  })

  it('úprava vytvoří novou verzi', () => {
    const d = upravDokument('uzavirka-mostu', { vyvesenoDo: '2026-12-15' }, 'Prodloužení uzavírky')
    expect(d.verze).toHaveLength(2)
    expect(d.verze[1]).toMatchObject({ cislo: 2, zmena: 'zmeneno' })
  })

  it('vyvěšení dokumentu zapíše záznam o vyvěšení a výchozí „Po sejmutí nezveřejňovat“ respektuje', async () => {
    const d = vyvesDokument({
      nazev: 'Oznámení o svozu',
      kategorie: 'oznameni',
      cisloJednaci: 'OU/2/2026',
      puvodce: 'Obecní úřad',
      vyvesenoOd: '2026-11-04',
      vyvesenoDo: '2026-11-20',
      text: ['Svoz bude v sobotu.'],
      skrytPoSejmuti: true,
    })
    expect(d.verze[0]).toMatchObject({ cislo: 1, zmena: 'vyveseno' })
    expect(await demoZdroj.dokument(OBEC, d.id)).not.toBeNull()
  })

  it('obnovení vrátí semínko', () => {
    pridejAktualitu({ titulek: 'Zkušební zpráva', perex: 'Perex zprávy.', obsah: ['Text.'] })
    expect(uloziste().aktuality).toHaveLength(13)
    obnovUkazku()
    expect(uloziste().aktuality).toHaveLength(12)
  })

  it('správce vydá krizi, redaktor jen koncept, ukončení ji přesune do archivu', async () => {
    const koncept = vydejKrizi({ obec: OBEC, uroven: 'emergency', titulek: 'koncept', text: 'Text konceptu hlášení.' }, 'redaktor')
    expect(koncept.stav).toBe('koncept')
    expect((await demoZdroj.krize(OBEC, demoTed())).hlavni?.id).toBe('nepijte-vodu')
    ukonciKrizi('nepijte-vodu')
    const po = await demoZdroj.krize(OBEC, demoTed())
    expect(po.hlavni?.uroven).toBe('warning')
    const { archiv } = await demoZdroj.vsechnaKrize(OBEC, demoTed())
    expect(archiv.some((h) => h.id === 'nepijte-vodu')).toBe(true)
  })

  it('odkaz krize jen https nebo cesta webu', () => {
    expect(() => vydejKrizi({ obec: OBEC, uroven: 'info', titulek: 'odkaz', text: 'Text hlášení s odkazem.', odkazUrl: 'javascript:alert(1)' }, 'spravce')).toThrow(
      ChybaPravidla,
    )
  })
})

describe('hlášení závad', () => {
  it('kód má 8 znaků bez zaměnitelných znaků a je unikátní', () => {
    const kody = new Set(Array.from({ length: 500 }, () => novyKod()))
    expect(kody.size).toBe(500)
    for (const k of kody) {
      expect(k).toMatch(/^[2-9A-HJKMNP-Z]{8}$/)
      expect(k).not.toMatch(/[01OIL]/)
    }
    expect(ABECEDA_KODU).not.toMatch(/[01OIL]/)
  })

  it('nové hlášení dostane číslo a kód, kontakt se ukládá jen když je', () => {
    const z = pridejZavadu({ obec: OBEC, kategorie: 'vymol', popis: 'Díra v silnici před školou.', misto: 'Lipová 3' })
    expect(z.cislo).toBe('HZ-2026-0048')
    expect(z.kontakt).toBeNull()
    expect(() => pridejZavadu({ obec: OBEC, kategorie: 'neexistuje', popis: 'Díra v silnici.', misto: 'Lipová' })).toThrow(ChybaPravidla)
  })
})

describe('rezervace', () => {
  it('kolize se schválenou rezervací a čas v minulosti', () => {
    expect(koliduje('sal-uradu', '2026-11-04', '19:00', '21:00')).toBe(true)
    expect(koliduje('sal-uradu', '2026-11-04', '14:00', '18:00')).toBe(false)
    expect(() =>
      pridejRezervaci({ prostor: 'sal-uradu', den: '2026-11-04', od: '19:00', do: '21:00', ucel: 'Oslava', zadatel: { jmeno: 'Jan', kontakt: '[E-MAIL]' } }),
    ).toThrow(/rezervovaný/)
    expect(() =>
      pridejRezervaci({ prostor: 'sal-uradu', den: '2026-11-03', od: '14:00', do: '18:00', ucel: 'Oslava', zadatel: { jmeno: 'Jan', kontakt: '[E-MAIL]' } }),
    ).toThrow(/minulosti/)
  })

  it('nová žádost čeká na schválení a blokuje termín', () => {
    const r = pridejRezervaci({ prostor: 'sal-uradu', den: '2026-11-20', od: '14:00', do: '18:00', ucel: 'Oslava', zadatel: { jmeno: 'Jan', kontakt: '[E-MAIL]' } })
    expect(r.stav).toBe('ceka')
    expect(koliduje('sal-uradu', '2026-11-20', '15:00', '16:00')).toBe(true)
  })
})

import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { SABLONY } from '@codekom/tokeny'

const TAGY = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

async function zkontroluj(page: Page, popis: string) {
  const r = await new AxeBuilder({ page }).withTags(TAGY).analyze()
  const nalezy = r.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length}x) ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`)
  expect(nalezy, `${popis}\n${nalezy.join('\n')}`).toEqual([])
}

/** 60 úvodů ve stavu Vypnuto. */
for (const s of SABLONY) {
  test(`axe: úvod ${s.cislo} ${s.nazev}, 3 palety`, async ({ page }) => {
    for (const p of [0, 1, 2]) {
      await page.goto(`/?sablona=${s.klic}&paleta=${p}&krize=off`)
      await zkontroluj(page, `${s.klic} paleta ${p}`)
    }
  })
}

/** 3 šablony × 3 palety × 4 stavy banneru. */
for (const klic of ['naves', 'lupa', 'urad']) {
  test(`axe: banner v šabloně ${klic}`, async ({ page }) => {
    for (const p of [0, 1, 2]) {
      for (const k of ['off', 'info', 'warning', 'emergency']) {
        await page.goto(`/?sablona=${klic}&paleta=${p}&krize=${k}`)
        await zkontroluj(page, `${klic} paleta ${p} krize ${k}`)
      }
    }
  })
}

const VNITRNI = [
  '/uredni-deska',
  '/uredni-deska/uzavirka-mostu',
  '/aktuality/pitna-voda-cisterny',
  '/akce',
  '/obecni-urad',
  '/sluzby/platby?poplatek=odpad-osoba&cp=12',
  '/sluzby/nahlasit-zavadu',
  '/sluzby/rezervace',
  '/krizova-hlaseni',
  '/hledat?q=odpad',
  '/povinne-informace',
  '/prohlaseni-o-pristupnosti',
]

for (const klic of ['naves', 'lupa', 'urad']) {
  test(`axe: vnitřní stránky v šabloně ${klic}`, async ({ page }) => {
    await page.goto(`/?sablona=${klic}&paleta=0&krize=off`)
    for (const cesta of VNITRNI) {
      await page.goto(cesta)
      await zkontroluj(page, `${klic} ${cesta}`)
    }
  })
}

test('axe: ukázka administrace', async ({ page }) => {
  for (const cesta of ['/ukazka/administrace', '/ukazka/administrace/aktuality', '/ukazka/administrace/deska', '/ukazka/administrace/krize', '/ukazka/administrace/zavady']) {
    await page.goto(cesta)
    await zkontroluj(page, cesta)
  }
})

/** Všechny obrazovky administrace obce v tmavém (výchozí) i světlém vzhledu (volba uložená přepínačem). */
const OBRAZOVKY_ADMINISTRACE = ['', 'panel', 'posta', 'rozhlas', 'aktuality', 'deska', 'krize', 'zavady', 'schvalovani', 'poplatky', 'smlouvy', 'prepazka', 'stranky', 'skladatel', 'vzhled', 'podweby', 'asistent', 'chytra-obec', 'komunita', 'majetek', 'extranet', 'uzivatele', 'predplatne']

for (const rezim of ['tmavy', 'svetly'] as const) {
  test(`axe: administrace ve vzhledu ${rezim}`, async ({ page }) => {
    test.setTimeout(180_000)
    // Stejný klíč jako ukládá přepínač vzhledu v administrace/Ram.tsx.
    await page.addInitScript((v) => window.localStorage.setItem('codekom-admin-vzhled', v), rezim)
    for (const o of OBRAZOVKY_ADMINISTRACE) {
      await page.goto(`/ukazka/administrace/${o}?uroven=advance`)
      await expect(page.locator('.admin-obec')).toHaveAttribute('data-vzhled', rezim)
      await zkontroluj(page, `${rezim} ${o || 'přehled'}`)
    }
  })
}

const OBRAZOVKY_UROVNI = ['stranky', 'skladatel', 'schvalovani', 'vzhled', 'podweby', 'asistent', 'uzivatele', 'predplatne']

for (const uroven of ['zaklad', 'pokrocily', 'advance']) {
  test(`axe: administrace úrovně ${uroven}`, async ({ page }) => {
    for (const o of OBRAZOVKY_UROVNI) {
      await page.goto(`/ukazka/administrace/${o}?uroven=${uroven}`)
      await zkontroluj(page, `${uroven} ${o}`)
    }
  })
}

test('axe: správa CodeKom', async ({ page }) => {
  for (const cesta of ['/ukazka/codekom', '/ukazka/codekom/obce', '/ukazka/codekom/obce/javori-lhota', '/ukazka/codekom/faktury']) {
    await page.goto(cesta)
    await zkontroluj(page, cesta)
  }
})

test('axe: řídicí panel v administraci, i v režimu úprav', async ({ page }) => {
  await page.goto('/ukazka/administrace/panel')
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
  await zkontroluj(page, 'řídicí panel')
  await page.getByRole('button', { name: 'Zobrazit jako seznam' }).click()
  await zkontroluj(page, 'řídicí panel, mapa jako seznam')
  await page.getByRole('button', { name: 'Upravit plochu' }).click()
  await page.getByRole('button', { name: 'Odebrat widget Kamera' }).click()
  await zkontroluj(page, 'řídicí panel v režimu úprav')
})

test('axe: řídicí panel v tmavém vzhledu administrace, i v režimu úprav', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/ukazka/administrace/panel')
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
  await expect(page.locator('.admin-obec')).toHaveAttribute('data-vzhled', 'tmavy')
  await zkontroluj(page, 'řídicí panel tmavý')
  await page.getByRole('button', { name: 'Zobrazit jako seznam' }).click()
  await zkontroluj(page, 'řídicí panel tmavý, mapa jako seznam')
  await page.getByRole('button', { name: 'Upravit plochu' }).click()
  await page.getByRole('button', { name: 'Odebrat widget Kamera' }).click()
  await zkontroluj(page, 'řídicí panel tmavý v režimu úprav')
})

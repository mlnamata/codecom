import { expect, test } from '@playwright/test'
import { SABLONY } from '@codekom/tokeny'
import { bezVodorovnehoPosunu, sleduj } from './pomocne'

/** Úvod všech 20 šablon × 3 palet: bez vodorovného posunu a bez chyb v konzoli. */
for (const s of SABLONY) {
  test(`šablona ${s.cislo} ${s.nazev} ve 3 paletách`, async ({ page }) => {
    const { chyby, google } = await sleduj(page)
    for (const p of [0, 1, 2]) {
      await page.goto(`/?sablona=${s.klic}&paleta=${p}&krize=off&foto=0`)
      await expect(page.locator(`[data-sablona="${s.klic}"][data-paleta="${p}"]`)).toBeVisible()
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('main#obsah')).toHaveCount(1)
      await bezVodorovnehoPosunu(page)
    }
    expect(chyby, chyby.join('\n')).toEqual([])
    expect(google).toEqual([])
  })
}

test('varianta Fotografie má popisek a alt', async ({ page }) => {
  await page.goto('/?sablona=naves&paleta=0&krize=off&foto=1')
  const foto = page.locator('figure img').first()
  await expect(foto).toHaveAttribute('alt', /Náves vesnice/)
  await expect(page.locator('figure figcaption img[alt="AI"]')).toBeVisible()
})

test('stav ukázky v URL a v cookie', async ({ page, context }) => {
  await page.goto('/?sablona=lipa&paleta=1&krize=warning&foto=1')
  await expect(page.locator('[data-sablona="lipa"][data-paleta="1"]')).toBeVisible()
  await expect(page.locator('section.alert h2')).toHaveText(/^Výstraha:/)
  const cookie = (await context.cookies()).find((c) => c.name === 'ukazka')
  expect(cookie?.httpOnly).toBe(true)
  await page.goto('/uredni-deska')
  await expect(page.locator('[data-sablona="lipa"][data-paleta="1"]')).toBeVisible()
  expect((await context.cookies()).map((c) => c.name)).toEqual(['ukazka'])
})

test.describe('interaktivní šablony', () => {
  test('Zvonice filtruje desku podle kategorie', async ({ page }) => {
    await page.goto('/?sablona=zvonice&krize=off')
    await page.getByRole('button', { name: 'Doprava', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Doprava', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByText(/^Zobrazeno \d+ z/)).toBeVisible()
  })

  test('Studánka přepíná léto a zimu', async ({ page }) => {
    await page.goto('/?sablona=studanka&krize=off')
    await page.getByRole('button', { name: /Zima/ }).click()
    await expect(page.getByText('Co teď v zimě platí')).toBeVisible()
  })

  test('Lípa hledá bez diakritiky', async ({ page }) => {
    await page.goto('/?sablona=lipa&krize=off')
    await page.getByLabel('Napište, co hledáte').fill('kaceni')
    await expect(page.getByRole('link', { name: /kácení stromu/ })).toBeVisible()
  })

  test('Hranice přepíná jazyk', async ({ page }) => {
    await page.goto('/?sablona=hranice&krize=off')
    await page.getByRole('button', { name: 'Česky' }).click()
    await expect(page.getByRole('button', { name: 'Česky' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('Radnice přepíná publikum', async ({ page }) => {
    await page.goto('/?sablona=radnice&krize=off')
    await page.getByRole('button', { name: 'Podnikám' }).click()
    await expect(page.getByText('Zábor veřejného prostranství')).toBeVisible()
  })

  test('Lupa zvětší písmo', async ({ page }) => {
    await page.goto('/?sablona=lupa&krize=off')
    await page.getByRole('button', { name: /Největší písmo|A\+\+/ }).first().click()
    await expect(page.getByRole('button', { name: /Největší písmo|A\+\+/ }).first()).toHaveAttribute('aria-pressed', 'true')
  })

  test('Kompas zapíná vrstvy mapy', async ({ page }) => {
    await page.goto('/?sablona=kompas&krize=off')
    const park = page.getByRole('button', { name: /Parkování/ }).first()
    await park.click()
    await expect(park).toHaveAttribute('aria-pressed', 'true')
  })

  test('Magistrát ukáže odpověď AI se zdroji', async ({ page }) => {
    await page.goto('/?sablona=magistrat&krize=off')
    await page.getByRole('button', { name: /trvalému pobytu|zavřený most|Hájku|odpad/ }).first().click()
    await expect(page.getByText(/Odpovídá umělá inteligence/)).toBeVisible()
  })

  test('Mikroregion vybere část obce', async ({ page }) => {
    await page.goto('/?sablona=mikroregion&krize=off')
    await page.getByRole('button', { name: 'Hájek' }).first().click()
    await expect(page.getByText(/86 obyvatel/)).toBeVisible()
  })

  test('Úřad ukáže kroky životní situace', async ({ page }) => {
    await page.goto('/?sablona=urad&krize=off')
    await page.getByRole('button', { name: /Narodilo se nám dítě/ }).click()
    await expect(page.getByText(/Porodnice ohlásí narození/)).toBeVisible()
  })
})

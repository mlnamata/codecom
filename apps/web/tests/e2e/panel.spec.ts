import { expect, test, type Page } from '@playwright/test'
import { bezVodorovnehoPosunu, sleduj } from './pomocne'

const ADRESA = '/ukazka/administrace/panel'

/** Nadpisy widgetů v pořadí na ploše. */
const poradi = (page: Page) => page.locator('[data-widget] h2').allTextContents()

test.beforeEach(async ({ page }) => {
  await page.goto(ADRESA)
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
})

test('řídicí panel je v administraci s jejím menu a stará adresa přesměruje', async ({ page }) => {
  const { chyby } = await sleduj(page)
  await page.goto('/ukazka/panel')
  await expect(page).toHaveURL(new RegExp(`${ADRESA}$`))
  await expect(page.getByRole('heading', { level: 1, name: 'Řídicí panel' })).toBeVisible()
  const menu = page.getByRole('navigation', { name: 'Administrace' })
  await expect(menu).toBeAttached()
  await expect(menu.getByRole('link', { name: 'Řídicí panel', includeHidden: true })).toHaveAttribute('aria-current', 'page')
  await expect(menu.getByRole('link', { name: 'Přehled', includeHidden: true })).toBeAttached()
  await expect(page.getByRole('heading', { level: 2, name: 'Mapa obce' })).toBeVisible()
  await expect(page.getByText(/Když něco nefunguje, volejte obecní úřad/)).toBeVisible()
  await bezVodorovnehoPosunu(page)
  expect(chyby).toEqual([])
})

test('odemčení zámku chce důvod a zámek jde znovu zamknout', async ({ page }) => {
  const zamky = page.locator('[data-widget="zamky"]')
  const prvni = zamky.locator('.rp-zamky > li').first()
  const odemknout = prvni.getByRole('button', { name: 'Odemknout na 5 minut' })
  await expect(odemknout).toBeDisabled()
  await prvni.getByLabel('Důvod odemčení').selectOption('Servis nebo oprava')
  await odemknout.click()
  await expect(prvni.getByText('Odemčeno', { exact: true })).toBeVisible()
  await expect(zamky.getByText(/Odemčeno: .*\(Servis nebo oprava\)/)).toBeVisible()
  await prvni.getByRole('button', { name: 'Zamknout' }).click()
  await expect(prvni.getByText('Zamčeno', { exact: true })).toBeVisible()
})

test('widget jde odebrat, přidat, posunout a rozložení přežije obnovení stránky', async ({ page }) => {
  const vychozi = await poradi(page)
  expect(vychozi.slice(0, 3)).toEqual(['Stav obce', 'Mapa obce', 'Kamera'])

  await page.getByRole('button', { name: 'Upravit plochu' }).click()
  const zive = page.getByRole('status')

  // Odebrat
  await page.getByRole('button', { name: 'Odebrat widget Kamera' }).click()
  await expect(zive).toContainText('Widget Kamera je odebraný')
  expect(await poradi(page)).not.toContain('Kamera')

  // Posunout tlačítkem: Mapa obce před Stav obce, fokus zůstane na ovládání
  await page.getByRole('button', { name: 'Posunout výš, Mapa obce' }).click()
  await expect(zive).toContainText('Widget Mapa obce je na pozici 1')
  expect((await poradi(page)).slice(0, 2)).toEqual(['Mapa obce', 'Stav obce'])
  await expect(page.getByRole('button', { name: 'Posunout níž, Mapa obce' })).toBeFocused()

  // Změnit velikost
  const mapa = page.locator('[data-widget="mapa"]')
  await mapa.getByLabel('Velikost').selectOption('cely')
  await expect(mapa).toHaveClass(/rp-widget--cely/)

  // Přidat zpět z nabídky, přidá se na konec
  await page.getByRole('button', { name: 'Přidat widget Kamera' }).click()
  await expect(zive).toContainText('Widget Kamera je přidaný')
  expect((await poradi(page)).at(-1)).toBe('Kamera')

  await page.getByRole('button', { name: 'Hotovo' }).click()
  const upravene = await poradi(page)

  await page.reload()
  expect(await poradi(page)).toEqual(upravene)
  await expect(page.locator('[data-widget="mapa"]')).toHaveClass(/rp-widget--cely/)
  await bezVodorovnehoPosunu(page)

  // Obnovit výchozí
  await page.getByRole('button', { name: 'Upravit plochu' }).click()
  await page.getByRole('button', { name: 'Obnovit výchozí rozložení' }).click()
  await expect(zive).toContainText('výchozí rozložení')
  expect(await poradi(page)).toEqual(vychozi)
  await expect(page.getByRole('button', { name: 'Obnovit výchozí rozložení' })).toBeDisabled()
  await page.reload()
  expect(await poradi(page)).toEqual(vychozi)
})

test('bez localStorage stránka funguje s výchozím rozložením', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Úložiště je zakázané')
      },
    })
  })
  const { chyby } = await sleduj(page)
  await page.goto(ADRESA)
  expect((await poradi(page)).slice(0, 2)).toEqual(['Stav obce', 'Mapa obce'])
  await page.getByRole('button', { name: 'Upravit plochu' }).click()
  await page.getByRole('button', { name: 'Odebrat widget Parkování' }).click()
  expect(await poradi(page)).not.toContain('Parkování')
  expect(chyby).toEqual([])
})

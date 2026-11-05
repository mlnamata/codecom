import { expect, test } from '@playwright/test'

test('administrace má výchozí tmavý vzhled i při světlém systému a přepínač si volbu pamatuje', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/ukazka/administrace')
  const ram = page.locator('.admin-obec')
  await expect(ram).toHaveAttribute('data-vzhled', 'tmavy')
  const prepinac = page.getByRole('button', { name: 'Tmavý vzhled' })
  await expect(prepinac).toHaveAttribute('aria-pressed', 'true')
  await prepinac.click()
  await expect(ram).toHaveAttribute('data-vzhled', 'svetly')
  await expect(prepinac).toHaveAttribute('aria-pressed', 'false')
  await page.reload()
  await expect(ram).toHaveAttribute('data-vzhled', 'svetly')
  await page.getByRole('button', { name: 'Tmavý vzhled' }).click()
  await expect(ram).toHaveAttribute('data-vzhled', 'tmavy')
})

test('přehled administrace ukazuje čísla, grafy a poslední aktivitu', async ({ page }) => {
  await page.goto('/ukazka/administrace')
  await expect(page.getByRole('heading', { name: 'Přehled', level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Visí na úřední desce' })).toBeVisible()
  await expect(page.getByRole('img', { name: /Počet dokumentů visících na úřední desce/ })).toBeVisible()
  await expect(page.getByRole('img', { name: /Hlášení závad celkem/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Poslední aktivita' })).toBeVisible()
})

test('hledání v liště filtruje menu a Enter otevře první položku', async ({ page }) => {
  await page.goto('/ukazka/administrace')
  const hledani = page.getByRole('searchbox', { name: 'Hledat v administraci' })
  await hledani.fill('krizova')
  const menu = page.getByRole('navigation', { name: 'Administrace' })
  const menuTlacitko = menu.getByRole('button', { name: /Menu/ })
  const telefon = await menuTlacitko.isVisible()
  if (telefon) await menuTlacitko.click()
  await expect(menu.getByRole('link', { name: 'Krizová hlášení' })).toBeVisible()
  await expect(menu.getByRole('link', { name: 'Úřední deska' })).toHaveCount(0)
  if (telefon) {
    await page.keyboard.press('Escape')
    await expect(menuTlacitko).toHaveAttribute('aria-expanded', 'false')
  }
  await hledani.press('Enter')
  await expect(page).toHaveURL(/\/ukazka\/administrace\/krize$/)
})

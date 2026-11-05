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

test('přehled administrace ukazuje, co čeká na vyřízení, čísla, graf a poslední aktivitu', async ({ page }) => {
  await page.goto('/ukazka/administrace?uroven=advance')
  await expect(page.getByRole('heading', { name: 'Přehled', level: 1 })).toBeVisible()

  // K vyřízení: počty z dat ukázky a odkazy na obrazovky, kde se věc vyřídí
  const vyrizeni = page.getByRole('region', { name: 'K vyřízení' })
  await expect(vyrizeni.locator('strong', { hasText: /závad k převzetí/ })).toBeVisible()
  await expect(vyrizeni.locator('strong', { hasText: /ke schválení$/ })).toBeVisible()
  await expect(vyrizeni.locator('strong', { hasText: /končí vyvěšení/ })).toBeVisible()
  await vyrizeni.getByRole('link', { name: /^Ke schválení/ }).click()
  await expect(page).toHaveURL(/\/ukazka\/administrace\/schvalovani$/)
  await page.goBack()

  // Čísla bez procent, změna absolutně slovy
  const cisla = page.locator('.souhrn')
  await expect(cisla.getByText('Visí na úřední desce')).toBeVisible()
  await expect(cisla).not.toContainText('%')
  await expect(cisla.getByText(/(víc|méně) než před týdnem|stejně jako před týdnem/)).toBeVisible()

  // Jeden čárový graf s textovou alternativou a rozdělení závad jako pruh s tabulkou, ne prstenec
  await expect(page.getByRole('img', { name: /Čárový graf: počet dokumentů visících na úřední desce/ })).toBeVisible()
  await expect(page.getByRole('img', { name: /Hlášení závad celkem/ })).toBeVisible()
  await expect(page.getByRole('table', { name: 'Hlášení závad podle stavu' })).toBeVisible()
  await expect(page.locator('linearGradient')).toHaveCount(0)

  await expect(page.getByRole('heading', { name: 'Poslední aktivita' })).toBeVisible()
})

test('příspěvky ke schválení jsou v bloku K vyřízení až od úrovně Pokročilý', async ({ page }) => {
  await page.goto('/ukazka/administrace?uroven=zaklad')
  const vyrizeni = page.getByRole('region', { name: 'K vyřízení' })
  await expect(vyrizeni.locator('strong', { hasText: /závad k převzetí/ })).toBeVisible()
  await expect(vyrizeni.locator('strong', { hasText: /ke schválení$/ })).toHaveCount(0)
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

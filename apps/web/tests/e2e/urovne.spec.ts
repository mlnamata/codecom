import { expect, test } from '@playwright/test'

test('úroveň Základ zamkne skladatele, Pokročilý ho odemkne', async ({ page }) => {
  await page.goto('/ukazka/administrace/skladatel?uroven=zaklad')
  await expect(page.getByText('Skladatel úvodní stránky je od úrovně Pokročilý')).toBeVisible()
  await page.goto('/ukazka/administrace/skladatel?uroven=pokrocily')
  await expect(page.getByRole('heading', { name: 'Bloky úvodní stránky' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Zamčeno' }).first()).toBeDisabled()
})

test('Základ má limit 3 uživatelů', async ({ page }) => {
  await page.goto('/ukazka/administrace/uzivatele?uroven=zaklad')
  await page.getByLabel('E-mail').fill('redaktor@obec.example')
  await page.getByRole('button', { name: 'Pozvat' }).click()
  await expect(page.getByRole('button', { name: /Limit 3 uživatelů/ })).toBeDisabled()
})

test('správa CodeKom změní úroveň obce a obec to vidí v předplatném', async ({ page }) => {
  await page.goto('/ukazka/codekom/obce/javori-lhota')
  await page.getByLabel('Úroveň editoru').selectOption('advance')
  await page.getByRole('button', { name: 'Uložit předplatné' }).click()
  await expect(page.getByText('Předplatné je uložené')).toBeVisible()
  await page.goto('/ukazka/administrace/predplatne')
  await expect(page.locator('.cisla').getByText('Advance')).toBeVisible()
  await page.goto('/ukazka/codekom')
  await page.getByRole('button', { name: 'Obnovit data ukázky' }).click()
})

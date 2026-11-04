import { expect, type Page } from '@playwright/test'

/** Nastaví stav ukázky přes URL a vrátí chyby z konzole a požadavky na Google Fonts. */
export async function sleduj(page: Page) {
  const chyby: string[] = []
  const google: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error') chyby.push(m.text())
  })
  page.on('pageerror', (e) => chyby.push(e.message))
  page.on('request', (r) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) google.push(r.url())
  })
  return { chyby, google }
}

/** Obsah se vejde do šířky okna bez vodorovného posunu. */
export async function bezVodorovnehoPosunu(page: Page) {
  const presah = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(presah, 'stránka má vodorovný posun').toBeLessThanOrEqual(1)
}

/** Vrátí ukázku do výchozího stavu přes administraci (data v paměti serveru). */
export async function obnovUkazku(page: Page) {
  await page.goto('/ukazka/administrace')
  await page.getByRole('button', { name: 'Obnovit ukázku' }).click()
  await page.getByRole('button', { name: 'Ano, obnovit' }).click()
  await expect(page.getByText('Ukázka je obnovená do výchozího stavu.')).toBeVisible()
}

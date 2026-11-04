import { expect, test } from '@playwright/test'

test('úvod vede na šablony a úrovně', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('img[alt^="Úvodní stránka šablony"]')).toHaveCount(4)
  await page.getByRole('link', { name: 'Prohlédnout 20 šablon' }).click()
  await expect(page).toHaveURL(/\/ukazky$/)
  await expect(page.locator('main li a[href^="/ukazky/"]')).toHaveCount(20)
})

test('karusel šablon se posouvá tlačítky', async ({ page }) => {
  await page.goto('/ukazky')
  const karusel = page.getByRole('region', { name: 'Karusel šablon' })
  const predchozi = karusel.getByRole('button', { name: 'Předchozí' })
  const dalsi = karusel.getByRole('button', { name: 'Další' })
  const pas = karusel.getByRole('list', { name: 'Seznam 20 šablon' })
  await expect(predchozi).toBeDisabled()
  await dalsi.click()
  await expect.poll(() => pas.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
  await expect(predchozi).toBeEnabled()
  await predchozi.click()
  await expect.poll(() => pas.evaluate((el) => el.scrollLeft)).toBe(0)
})

test('hlavička na telefonu ukáže jen logo a menu', async ({ page }) => {
  await page.goto('/')
  const napiste = page.locator('header').getByRole('link', { name: 'Napište nám' })
  if ((page.viewportSize()?.width ?? 0) < 1024) await expect(napiste).toBeHidden()
  else await expect(napiste).toBeVisible()
})

test('přepínač palet změní snímek a odkaz do ukázky', async ({ page }) => {
  await page.goto('/ukazky/lipa')
  await page.getByRole('button', { name: 'Obloha' }).click()
  await expect(page.getByRole('button', { name: 'Obloha' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByAltText('Úvodní stránka šablony Lípa pro obec Javoří Lhota, paleta Obloha.')).toBeVisible()
  const demo = page.getByRole('link', { name: 'Prohlédnout živou ukázku' })
  if (await demo.count()) await expect(demo).toHaveAttribute('href', /\?sablona=lipa&paleta=1$/)
})

test('kalkulačka přepočítá cenu se štítkem', async ({ page }) => {
  await page.goto('/cenik')
  const vysledek = page.locator('[aria-live="polite"]').filter({ hasText: 'Orientačně od' })
  await expect(vysledek).toContainText('590')
  await page.getByLabel('Velikost obce').selectOption({ index: 1 })
  await page.getByLabel('Úroveň webu').selectOption('advance')
  await page.getByLabel('Ano').check()
  await expect(vysledek).toContainText('3 290')
  await expect(page.getByText('Orientační cena, přesnou pošleme v nabídce').first()).toBeVisible()
})

test('fotky mají poznámku o umělé inteligenci', async ({ page }) => {
  for (const cesta of ['/', '/ukazky/naves', '/co-umime']) {
    await page.goto(cesta)
    const fotky = page.locator('figure:has(img[src*="foto"])')
    const n = await fotky.count()
    for (let i = 0; i < n; i++) await expect(fotky.nth(i)).toContainText('Ilustrační fotografie vytvořená umělou inteligencí')
  }
})

test('kontakt nemá formulář', async ({ page }) => {
  await page.goto('/kontakt')
  await expect(page.locator('form')).toHaveCount(0)
})

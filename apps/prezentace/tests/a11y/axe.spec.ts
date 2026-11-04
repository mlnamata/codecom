import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const STRANKY = ['/', '/ukazky', '/ukazky/lipa', '/urovne', '/urovne/zaklad', '/urovne/pokrocily', '/urovne/advance', '/cenik', '/co-umime', '/pro-koho', '/prechod', '/bezpecnost-a-pravo', '/dotace', '/o-nas', '/kontakt', '/ke-stazeni', '/pristupnost', '/zasady-osobnich-udaju', '/cookies']

for (const cesta of STRANKY) {
  test(`axe ${cesta}`, async ({ page }) => {
    await page.goto(cesta)
    const v = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze()
    expect(v.violations.map((x) => `${x.id}: ${x.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`)).toEqual([])
  })
}

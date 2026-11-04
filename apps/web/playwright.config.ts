import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.PORT_E2E ?? 3200)

/**
 * E2E a přístupnost nad sestaveným webem (`next build` a `next start`) s pevným dneškem ukázky.
 * NEXT_PUBLIC_UKAZKA=1 je v .env.production, vkompiluje se při buildu.
 */
export default defineConfig({
  testDir: 'tests',
  testMatch: ['e2e/**/*.spec.ts', 'a11y/**/*.spec.ts'],
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'cs-CZ',
    timezoneId: 'Europe/Prague',
  },
  webServer: {
    command: `pnpm exec next start --port ${PORT}`,
    url: `http://localhost:${PORT}/api/obce`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { CODEKOM_DEMO_DNES: '2026-11-04T11:00:00.000Z', CODEKOM_ZDROJ: 'demo' },
  },
  projects: [
    { name: 'e2e-375', testMatch: 'e2e/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 800 } } },
    { name: 'e2e-1280', testMatch: 'e2e/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'a11y', testMatch: 'a11y/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
})

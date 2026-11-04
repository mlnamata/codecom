import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.PORT_E2E ?? 3300)
const URL = process.env.E2E_URL ?? `http://localhost:${PORT}`

/** E2E a přístupnost nad sestaveným webem (`next build`, `next start`). E2E_URL dovolí běžící server. */
export default defineConfig({
  testDir: 'tests',
  timeout: 60_000,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: URL, locale: 'cs-CZ' },
  webServer: process.env.E2E_URL ? undefined : { command: `pnpm exec next start --port ${PORT}`, url: URL, reuseExistingServer: true, timeout: 120_000 },
  projects: [
    { name: 'e2e-375', testMatch: 'e2e/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 800 } } },
    { name: 'e2e-1280', testMatch: 'e2e/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'a11y', testMatch: 'a11y/**/*.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
  ],
})

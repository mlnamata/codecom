import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      'server-only': path.resolve(dirname, 'tests/prazdny-modul.ts'),
    },
  },
  test: {
    include: ['tests/jednotky/**/*.test.ts'],
    environment: 'node',
    env: { NEXT_PUBLIC_UKAZKA: '1', CODEKOM_ZDROJ: 'demo', CODEKOM_APP_ORIGIN: 'http://localhost:8081' },
    testTimeout: 30_000,
  },
})

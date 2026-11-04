import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const koren = path.resolve(dirname, '..', '..')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Sdílené balíčky jsou TypeScript ze zdrojů, ukázkový obsah leží v obsah/ v kořeni monorepa.
  transpilePackages: ['@codekom/tokeny', '@codekom/typy', '@codekom/demo-data'],
  turbopack: { root: koren },
  outputFileTracingRoot: koren,
  // Písmo pro PDF úřední desky čte handler souboru ze svého adresáře.
  outputFileTracingIncludes: { '/uredni-deska/[id]/soubor': ['./public/demo/pismo/**'] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
        ],
      },
    ]
  },
}

/**
 * Payload (administrace a databáze) se zapíná jen se zdrojem dat `payload` (prompt 01).
 * Bez databáze build ani dev nečtou DATABASE_URI a veřejné stránky Payload neimportují.
 */
async function konfigurace(): Promise<NextConfig> {
  if (process.env.CODEKOM_ZDROJ === 'payload') {
    const { withPayload } = await import('@payloadcms/next/withPayload')
    return withPayload(nextConfig)
  }
  return nextConfig
}

export default konfigurace

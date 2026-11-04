import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const koren = path.resolve(dirname, '..', '..')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['@codekom/tokeny'],
  turbopack: { root: koren },
  outputFileTracingRoot: koren,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'" },
        ],
      },
    ]
  },
}

export default nextConfig

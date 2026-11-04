import type { MetadataRoute } from 'next'
import { vsechnyStranky } from '@/lib/obsah'
import { sablonyGalerie } from '@/lib/sablony'
import { UROVNE } from '@/lib/urovne'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const adresy = [
    ...vsechnyStranky().map((s) => s.adresa).filter((a) => !a.includes('#') && !a.startsWith('/interni')),
    '/urovne',
    ...UROVNE.map((u) => `/urovne/${u.klic}`),
    ...sablonyGalerie().map((s) => `/ukazky/${s.klic}`),
  ]
  return adresy.map((a) => ({ url: `${SITE}${a === '/' ? '' : a}` }))
}

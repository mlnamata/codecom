import type { Metadata, Viewport } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './globals.css'
import { Hlavicka } from '@/komponenty/Hlavicka'
import { Paticka } from '@/komponenty/Paticka'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'CodeKom: web, úřední deska a aplikace pro obce', template: '%s' },
  description: 'Web obce s elektronickou úřední deskou, aplikace pro občany a digitální úřad pro obce do 2 000 obyvatel.',
  openGraph: { locale: 'cs_CZ', type: 'website', siteName: 'CodeKom' },
}

export const viewport: Viewport = { themeColor: '#07080c' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <Hlavicka />
        <main id="obsah" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Paticka />
      </body>
    </html>
  )
}

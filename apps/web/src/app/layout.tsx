import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Javoří Lhota', template: '%s | Javoří Lhota' },
  description: 'Ukázkový web obce Javoří Lhota na platformě CodeKom.',
  robots: process.env.NEXT_PUBLIC_UKAZKA === '1' ? { index: false, follow: false } : undefined,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import './panel.css'

export const metadata: Metadata = { title: 'Řídicí panel obce | Ukázka CodeKom' }

/** Řídicí panel obce: mapa s kamerami, čidly a zámky, doprava a stav budov. Jen v ukázce. */
export default function PanelLayout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  return children
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { FormObnovit } from './Formulare'
import { Navigace } from './Navigace'

export const metadata: Metadata = { title: { default: 'Ukázka administrace', template: '%s | Ukázka administrace' } }

/**
 * Ukázka redakčního rozhraní podle Editor-Zaklad.dc.html. Bez přihlášení, jen s
 * NEXT_PUBLIC_UKAZKA=1. Není to produkční zabezpečení, skutečná administrace je Payload.
 */
export default function AdministraceLayout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  return (
    <div className="admin">
      <a className="preskocit" href="#obsah">
        Přeskočit na obsah
      </a>
      <header className="admin__hlavicka">
        <p className="admin__nazev">
          <a href="/ukazka/administrace">Administrace obce Javoří Lhota</a>
        </p>
        <p className="admin__stitek">Ukázka, data se po restartu vrátí</p>
        <FormObnovit />
        <a href="/">Zobrazit web</a>
      </header>
      <div className="admin__telo">
        <Navigace />
        <main id="obsah" tabIndex={-1} className="stranka admin__obsah">
          {children}
        </main>
      </div>
    </div>
  )
}

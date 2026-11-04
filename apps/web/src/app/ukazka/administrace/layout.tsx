import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { ZnakObce } from '@/sablony/sdilene/ZnakObce'
import { NAZEV_UROVNE, PRINCIP_UROVNE, UROVNE } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { FormObnovit } from './Formulare'
import { Navigace } from './Navigace'
import '../admin.css'

export const metadata: Metadata = { title: { default: 'Ukázka administrace', template: '%s | Ukázka administrace' } }

/**
 * Ukázka redakčního rozhraní tří úrovní editoru. Bez přihlášení, jen s NEXT_PUBLIC_UKAZKA=1.
 * Není to produkční zabezpečení, skutečná administrace je Payload (prompt 01).
 */
export default async function AdministraceLayout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  const uroven = await urovenAdministrace()
  return (
    <div className="admin">
      <a className="preskocit" href="#obsah">
        Přeskočit na obsah
      </a>
      <header className="admin__hlavicka">
        <p className="admin__nazev">
          <a href="/ukazka/administrace">
            <ZnakObce velikost={28} />
            <span>
              <strong>Administrace</strong> <span className="admin__obec">obce Javoří Lhota</span>
            </span>
          </a>
        </p>
        <nav aria-label="Úroveň editoru v ukázce" className="admin__urovne">
          {UROVNE.map((u) => (
            <a key={u} href={`?uroven=${u}`} aria-current={u === uroven ? 'true' : undefined} title={PRINCIP_UROVNE[u]}>
              {NAZEV_UROVNE[u]}
            </a>
          ))}
        </nav>
        <div className="admin__akce">
          <p className="admin__stitek">Ukázka, data se po restartu vrátí</p>
          <FormObnovit />
          <a href="/" className="admin__web">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Zobrazit web</span>
          </a>
        </div>
      </header>
      <div className="admin__telo">
        <Navigace uroven={uroven} />
        <main id="obsah" tabIndex={-1} className="stranka admin__obsah">
          {children}
        </main>
      </div>
    </div>
  )
}

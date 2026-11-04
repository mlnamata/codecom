import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { obnovSpravu } from './akce'
import { NavigaceSpravy } from './NavigaceSpravy'
import '../admin.css'

export const metadata: Metadata = { title: { default: 'Správa CodeKom', template: '%s | Správa CodeKom' }, robots: { index: false } }

/**
 * Interní správa CodeKom: předplatné obcí a faktury. Jen ukázka bez přihlášení
 * (NEXT_PUBLIC_UKAZKA=1). V ostrém provozu za přihlášením rolí CodeKom s 2FA.
 */
export default function SpravaLayout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  return (
    <div className="admin">
      <a className="preskocit" href="#obsah">
        Přeskočit na obsah
      </a>
      <header className="admin__hlavicka codekom-hlavicka">
        <p className="admin__nazev">
          <a href="/ukazka/codekom">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: '0 0 auto' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>
              <strong>Správa</strong> <span className="admin__obec">CodeKom</span>
            </span>
          </a>
        </p>
        <div className="admin__akce">
          <p className="admin__stitek">Ukázka, smyšlené obce a data</p>
          <form action={obnovSpravu}>
            <button type="submit">Obnovit data ukázky</button>
          </form>
          <a href="/ukazka/administrace" className="admin__web">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span>Administrace obce</span>
          </a>
        </div>
      </header>
      <div className="admin__telo">
        <NavigaceSpravy />
        <main id="obsah" tabIndex={-1} className="stranka admin__obsah">
          {children}
        </main>
      </div>
    </div>
  )
}

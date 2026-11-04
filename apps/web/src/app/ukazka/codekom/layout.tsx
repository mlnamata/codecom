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
          <a href="/ukazka/codekom">Správa CodeKom</a>
        </p>
        <p className="admin__stitek">Ukázka, smyšlené obce a data</p>
        <form action={obnovSpravu}>
          <button type="submit">Obnovit data ukázky</button>
        </form>
        <a href="/ukazka/administrace">Administrace obce</a>
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

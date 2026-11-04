import type { ReactNode } from 'react'
import { vzhled } from '@/lib/web'
import { KrizovyBanner } from '@/sablony/sdilene/KrizovyBanner'

/** Vnitřní stránky: hlavička a patička zvolené šablony, sdílené tělo mezi nimi. */
export default async function StrankyLayout({ children }: { children: ReactNode }) {
  const { modul } = await vzhled()
  const { Hlavicka, Paticka } = modul
  return (
    <>
      <KrizovyBanner />
      <div className="pas-hlavicky" data-tema={modul.temaHlavicky}>
        <Hlavicka />
      </div>
      <main id="obsah" tabIndex={-1} className="stranka">
        {children}
      </main>
      <Paticka />
    </>
  )
}

import { obec } from '@codekom/demo-data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { predplatneObce } from '@/lib/data/predplatne'
import { uloziste } from '@/lib/data/demo-pamet'
import { ZnakObce } from '@/sablony/sdilene/ZnakObce'
import { NAZEV_UROVNE, PRINCIP_UROVNE, UROVNE } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { FormObnovit } from './Formulare'
import { HledaniAdministrace, Navigace } from './Navigace'
import { PrepinacVzhledu, RamAdministrace, SKRIPT_VZHLEDU } from './Ram'
import '../admin.css'
import '../admin-obec.css'

export const metadata: Metadata = { title: { default: 'Ukázka administrace', template: '%s | Ukázka administrace' } }

const STAV_PREDPLATNEHO: Record<string, string> = { zkusebni: 'zkušební', aktivni: 'aktivní', 'jen-cteni': 'jen pro čtení', vypovezeno: 'vypovězené' }

/** Přihlášená osoba v ukázce: starostka ze souboru obce (obsah/javori-lhota/obec.json). */
function prihlaseny() {
  const k = obec.kontakty.find((o) => o.id === 'starostka')
  const jmeno = k?.jmeno ?? '[DOPLNIT]'
  const inicialy = jmeno
    .split(' ')
    .map((c) => c[0] ?? '')
    .join('')
    .slice(0, 2)
  return { jmeno, funkce: k?.funkce ?? '[DOPLNIT]', inicialy }
}

/**
 * Ukázka redakčního rozhraní tří úrovní editoru. Bez přihlášení, jen s NEXT_PUBLIC_UKAZKA=1.
 * Není to produkční zabezpečení, skutečná administrace je Payload (prompt 01).
 * Vzhled SaaS dashboardu s tmavým a světlým režimem (výjimka z unslop ze 5. 11. 2026, viz CLAUDE.md).
 */
export default async function AdministraceLayout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  const uroven = await urovenAdministrace()
  const p = predplatneObce('javori-lhota')
  const karta = { urovenPredplatneho: p?.uroven ?? null, stavPredplatneho: p ? (STAV_PREDPLATNEHO[p.stav] ?? null) : null }
  const noveZavady = uloziste().zavady.filter((z) => z.stav === 'nove').length
  const osoba = prihlaseny()
  return (
    <div className="admin admin-obec" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: SKRIPT_VZHLEDU }} />
      <a className="preskocit" href="#obsah">
        Přeskočit na obsah
      </a>
      <RamAdministrace>
        <div className="admin__telo">
          <Navigace uroven={uroven} karta={karta} />
          <div className="admin__sloupec">
            <header className="admin__hlavicka">
              <p className="admin__nazev">
                <a href="/ukazka/administrace">
                  <ZnakObce velikost={28} />
                  <span>
                    <strong>Javoří Lhota</strong> <span className="admin__obec">administrace</span>
                  </span>
                </a>
              </p>
              <HledaniAdministrace />
              <nav aria-label="Úroveň editoru v ukázce" className="admin__urovne">
                {UROVNE.map((u) => (
                  <a key={u} href={`?uroven=${u}`} aria-current={u === uroven ? 'true' : undefined} title={PRINCIP_UROVNE[u]}>
                    {NAZEV_UROVNE[u]}
                  </a>
                ))}
              </nav>
              <div className="admin__akce">
                <FormObnovit />
                <a href="/" className="admin__web">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Zobrazit web</span>
                </a>
              </div>
              <div className="admin__ikony">
                <PrepinacVzhledu />
                <a href="/ukazka/administrace/zavady" className="admin__ikona-tlacitko admin__upozorneni">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="sr-only">Nová hlášení závad: {noveZavady}</span>
                  {noveZavady > 0 ? (
                    <span className="admin__odznak" aria-hidden="true">
                      {noveZavady}
                    </span>
                  ) : null}
                </a>
                <p className="admin__osoba">
                  <span className="admin__avatar" aria-hidden="true">
                    {osoba.inicialy}
                  </span>
                  <span className="admin__osoba-text">
                    <strong>{osoba.jmeno}</strong>
                    <span>{osoba.funkce}</span>
                  </span>
                </p>
              </div>
            </header>
            <main id="obsah" tabIndex={-1} className="stranka admin__obsah">
              {children}
            </main>
          </div>
        </div>
      </RamAdministrace>
    </div>
  )
}

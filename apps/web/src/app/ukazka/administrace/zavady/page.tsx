import type { Metadata } from 'next'
import { formatDateTime } from '@codekom/typy/pravidla'
import { uloziste } from '@/lib/data/demo-pamet'
import { FormZavada } from '../Formulare'

export const metadata: Metadata = { title: 'Hlášení závad' }
export const dynamic = 'force-dynamic'

export default function AdministraceZavad() {
  const u = uloziste()
  const kategorie = new Map(u.kategorieZavad.map((k) => [k.id, k.nazev]))
  return (
    <>
      <h1>Hlášení závad</h1>
      {u.stavyZavad.map((s) => {
        const hlaseni = u.zavady.filter((z) => z.stav === s.id)
        return (
          <section key={s.id} aria-labelledby={`stav-${s.id}`}>
            <h2 id={`stav-${s.id}`}>
              {s.nazev} ({hlaseni.length})
            </h2>
            <ul className="seznam">
              {hlaseni.map((z) => (
                <li key={z.id}>
                  <h3 style={{ marginTop: 0 }}>
                    {z.cislo}: {kategorie.get(z.kategorie) ?? z.kategorie}, {z.misto}
                  </h3>
                  <p style={{ margin: '0 0 4px' }}>{z.popis}</p>
                  <p className="vedlejsi" style={{ margin: '0 0 8px' }}>
                    Nahlášeno {formatDateTime(z.vytvoreno)}, fotek {z.pocetFotek}
                    {z.kontakt ? `, kontakt: ${[z.kontakt.jmeno, z.kontakt.email, z.kontakt.telefon].filter(Boolean).join(', ')}` : ', bez kontaktu'}
                  </p>
                  <FormZavada id={z.id} cislo={z.cislo} stav={z.stav} odpoved={z.verejnaOdpoved} stavy={u.stavyZavad} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </>
  )
}

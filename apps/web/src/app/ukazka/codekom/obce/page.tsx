import type { Metadata } from 'next'
import { NAZVY_STAVU, mesicne, ulozistePredplatneho } from '@/lib/data/predplatne'
import { kc, tridaPredplatneho } from '@/lib/format-predplatne'
import { NAZEV_UROVNE } from '@/ukazka/uroven'

export const metadata: Metadata = { title: 'Obce a předplatné' }
export const dynamic = 'force-dynamic'

export default function Obce() {
  const { predplatne } = ulozistePredplatneho()
  return (
    <>
      <h1>Obce a předplatné</h1>
      <p>Kdo má jakou úroveň a moduly. Úroveň, moduly a stav změníte v detailu obce.</p>
      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Obce s předplatným</caption>
          <thead>
            <tr>
              <th scope="col">Obec</th>
              <th scope="col" className="cislo">
                Obyvatel
              </th>
              <th scope="col">Úroveň</th>
              <th scope="col">Moduly</th>
              <th scope="col">Platba</th>
              <th scope="col" className="cislo">
                Měsíčně bez DPH
              </th>
              <th scope="col">Stav</th>
            </tr>
          </thead>
          <tbody>
            {predplatne.map((p) => (
              <tr key={p.slug}>
                <td>
                  <a href={`/ukazka/codekom/obce/${p.slug}`}>{p.obec}</a>
                </td>
                <td className="cislo">{p.obyvatel.toLocaleString('cs-CZ')}</td>
                <td>{NAZEV_UROVNE[p.uroven]}</td>
                <td>{[p.urad ? 'Digitální úřad' : null, p.budovy ? `Budovy ${p.budovy}` : null].filter(Boolean).join(', ') || 'žádné'}</td>
                <td>{p.platba === 'rocni' ? 'roční' : 'měsíční'}</td>
                <td className="cislo">{kc(mesicne(p))}</td>
                <td>
                  <span className={`stav ${tridaPredplatneho(p.stav)}`}>{NAZVY_STAVU[p.stav]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>Kromě Javoří Lhoty jsou obce smyšlené, jen pro ukázku správy.</p>
    </>
  )
}

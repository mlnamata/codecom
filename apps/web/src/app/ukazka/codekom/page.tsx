import type { Metadata } from 'next'
import { NAZVY_STAVU_FAKTURY, mesicne, soucet, ulozistePredplatneho } from '@/lib/data/predplatne'
import { datum, kc, tridaFaktury } from '@/lib/format-predplatne'
import { NAZEV_UROVNE, UROVNE } from '@/ukazka/uroven'

export const metadata: Metadata = { title: 'Přehled' }
export const dynamic = 'force-dynamic'

export default function PrehledSpravy() {
  const { predplatne, faktury, zaznam } = ulozistePredplatneho()
  const platici = predplatne.filter((p) => p.stav === 'aktivni' || p.stav === 'jen-cteni')
  const mrr = platici.reduce((s, p) => s + mesicne(p), 0)
  const dluzne = faktury.filter((f) => f.stav === 'po-splatnosti' || f.stav === 'upominka')
  const ceka = faktury.filter((f) => f.stav === 'neuhrazena')
  const obec = (slug: string) => predplatne.find((p) => p.slug === slug)?.obec ?? slug
  return (
    <>
      <h1>Přehled</h1>
      <ul className="cisla">
        <li>
          Obce s předplatným
          <strong>{predplatne.length}</strong>
        </li>
        <li>
          Měsíční příjem bez DPH
          <strong>{kc(mrr)}</strong>
        </li>
        <li>
          Čeká na platbu
          <strong>{kc(ceka.reduce((s, f) => s + soucet(f), 0))}</strong>
        </li>
        <li>
          Po splatnosti
          <strong>{kc(dluzne.reduce((s, f) => s + soucet(f), 0))}</strong>
        </li>
      </ul>

      <h2>Obce podle úrovně</h2>
      <ul className="cisla">
        {UROVNE.map((u) => (
          <li key={u}>
            {NAZEV_UROVNE[u]}
            <strong>{predplatne.filter((p) => p.uroven === u).length}</strong>
          </li>
        ))}
      </ul>

      <h2>Faktury po splatnosti</h2>
      {dluzne.length ? (
        <div className="posuvnik">
          <table className="tabulka-admin">
            <caption className="sr-only">Faktury po splatnosti</caption>
            <thead>
              <tr>
                <th scope="col">Číslo</th>
                <th scope="col">Obec</th>
                <th scope="col">Splatnost</th>
                <th scope="col" className="cislo">
                  Bez DPH
                </th>
                <th scope="col">Stav</th>
              </tr>
            </thead>
            <tbody>
              {dluzne.map((f) => (
                <tr key={f.cislo}>
                  <td>{f.cislo}</td>
                  <td>
                    <a href={`/ukazka/codekom/obce/${f.slug}`}>{obec(f.slug)}</a>
                  </td>
                  <td>{datum(f.splatnost)}</td>
                  <td className="cislo">{kc(soucet(f))}</td>
                  <td>
                    <span className={`stav ${tridaFaktury(f.stav)}`}>{NAZVY_STAVU_FAKTURY[f.stav]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Žádná faktura není po splatnosti.</p>
      )}
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>Při prodlení delším než 30 dní po upomínce jde službu omezit na režim jen pro čtení. Úřední deska, krizová hlášení a export dat zůstávají vždy funkční.</p>

      <h2>Poslední změny</h2>
      {zaznam.length ? (
        <ul>
          {zaznam.slice(0, 10).map((z, i) => (
            <li key={i}>{z.co}</li>
          ))}
        </ul>
      ) : (
        <p>Zatím žádné změny.</p>
      )}
    </>
  )
}

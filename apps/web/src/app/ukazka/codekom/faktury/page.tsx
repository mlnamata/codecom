import type { Metadata } from 'next'
import { NAZVY_STAVU_FAKTURY, soucet, ulozistePredplatneho, type StavFaktury } from '@/lib/data/predplatne'
import { datum, kc, tridaFaktury } from '@/lib/format-predplatne'
import { vystavFaktury } from '../akce'
import { FormStavu } from '../FormStavu'

export const metadata: Metadata = { title: 'Faktury' }
export const dynamic = 'force-dynamic'

const FILTRY: { klic: StavFaktury | 'vse'; nazev: string }[] = [
  { klic: 'vse', nazev: 'Všechny' },
  { klic: 'neuhrazena', nazev: 'Čeká na platbu' },
  { klic: 'po-splatnosti', nazev: 'Po splatnosti' },
  { klic: 'upominka', nazev: 'Upomínka' },
  { klic: 'zaplacena', nazev: 'Zaplacené' },
]

export default async function Faktury({ searchParams }: { searchParams: Promise<{ stav?: string; vystaveno?: string }> }) {
  const q = await searchParams
  const { faktury, predplatne } = ulozistePredplatneho()
  const filtr = FILTRY.find((f) => f.klic === q.stav)?.klic ?? 'vse'
  const vybrane = [...faktury.filter((f) => filtr === 'vse' || f.stav === filtr)].sort((a, b) => b.vystaveno.localeCompare(a.vystaveno) || b.cislo.localeCompare(a.cislo))
  const obec = (slug: string) => predplatne.find((p) => p.slug === slug)?.obec ?? slug
  const zpet = `/ukazka/codekom/faktury${filtr === 'vse' ? '' : `?stav=${filtr}`}`
  return (
    <>
      <h1>Faktury</h1>
      <p>Roční licence se fakturuje předem se splatností 30 dní, měsíční předplatné se strhává kartou. Ceny jsou bez DPH.</p>
      {q.vystaveno !== undefined ? (
        <p className="uspech" role="status">
          Vystaveno faktur: {q.vystaveno}. Obce, které fakturu za měsíc už mají, se přeskočily.
        </p>
      ) : null}

      <form action={vystavFaktury} className="panel-bily radek-akci">
        <label htmlFor="mesic" style={{ margin: 0 }}>
          Vystavit měsíční faktury za
        </label>
        <input id="mesic" name="mesic" type="month" defaultValue="2026-12" style={{ maxWidth: 200, margin: 0 }} />
        <button type="submit" className="mala hlavni">
          Vystavit
        </button>
      </form>

      <nav aria-label="Filtr faktur" className="radek-akci" style={{ margin: '16px 0' }}>
        {FILTRY.map((f) => (
          <a key={f.klic} href={f.klic === 'vse' ? '/ukazka/codekom/faktury' : `?stav=${f.klic}`} aria-current={f.klic === filtr ? 'page' : undefined} className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', ...(f.klic === filtr ? { background: 'var(--ink)', color: 'var(--bg)' } : {}) }}>
            {f.nazev} ({f.klic === 'vse' ? faktury.length : faktury.filter((x) => x.stav === f.klic).length})
          </a>
        ))}
      </nav>

      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Faktury, filtr {FILTRY.find((f) => f.klic === filtr)?.nazev}</caption>
          <thead>
            <tr>
              <th scope="col">Číslo</th>
              <th scope="col">Obec</th>
              <th scope="col">Období</th>
              <th scope="col">Způsob</th>
              <th scope="col">Splatnost</th>
              <th scope="col" className="cislo">
                Bez DPH
              </th>
              <th scope="col">Stav</th>
              <th scope="col">Změnit stav</th>
            </tr>
          </thead>
          <tbody>
            {vybrane.map((f) => (
              <tr key={f.cislo}>
                <td>{f.cislo}</td>
                <td>
                  <a href={`/ukazka/codekom/obce/${f.slug}`}>{obec(f.slug)}</a>
                </td>
                <td>{f.obdobi}</td>
                <td>{f.zpusob === 'faktura' ? 'faktura' : 'karta'}</td>
                <td>{datum(f.splatnost)}</td>
                <td className="cislo">{kc(soucet(f))}</td>
                <td>
                  <span className={`stav ${tridaFaktury(f.stav)}`}>{NAZVY_STAVU_FAKTURY[f.stav]}</span>
                </td>
                <td>
                  <FormStavu cislo={f.cislo} stav={f.stav} zpet={zpet} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>Odeslání faktur do datové schránky a e-mailem a napojení na účetnictví přibude v ostrém provozu: [DOPLNIT: fakturační systém].</p>
    </>
  )
}

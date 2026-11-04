import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NAZVY_STAVU, NAZVY_STAVU_FAKTURY, VELIKOSTI, fakturyObce, mesicne, polozky, predplatneObce, soucet, velikost } from '@/lib/data/predplatne'
import { datum, kc, tridaFaktury } from '@/lib/format-predplatne'
import { NAZEV_UROVNE, UROVNE } from '@/ukazka/uroven'
import { ulozPredplatne } from '../../akce'
import { FormStavu } from '../../FormStavu'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return { title: predplatneObce((await params).slug)?.obec ?? 'Obec' }
}

export default async function DetailObce({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ ulozeno?: string; chyba?: string }> }) {
  const { slug } = await params
  const q = await searchParams
  const p = predplatneObce(slug)
  if (!p) notFound()
  const faktury = [...fakturyObce(slug)].sort((a, b) => b.vystaveno.localeCompare(a.vystaveno))
  return (
    <>
      <p>
        <a href="/ukazka/codekom/obce">Obce a předplatné</a>
      </p>
      <h1>{p.obec}</h1>
      <p>
        {p.obyvatel.toLocaleString('cs-CZ')} obyvatel, cenová skupina {VELIKOSTI[velikost(p.obyvatel)]}. Kontakt: {p.kontakt}. Předplatné od {datum(p.od)}.
      </p>
      {p.poznamka ? <p className="panel-bily">{p.poznamka}</p> : null}
      {q.ulozeno ? (
        <p className="uspech" role="status">
          Předplatné je uložené. Nová cena platí od další faktury.
        </p>
      ) : null}
      {q.chyba ? (
        <p className="souhrn-chyb" role="alert">
          Předplatné se neuložilo, zkontrolujte hodnoty.
        </p>
      ) : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        <form action={ulozPredplatne} className="panel-bily" style={{ flex: '1 1 320px', minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>Předplatné</h2>
          <input type="hidden" name="slug" value={p.slug} />
          <label htmlFor="uroven">Úroveň editoru</label>
          <select id="uroven" name="uroven" defaultValue={p.uroven}>
            {UROVNE.map((u) => (
              <option key={u} value={u}>
                {NAZEV_UROVNE[u]}
              </option>
            ))}
          </select>
          <fieldset>
            <legend>Digitální úřad</legend>
            <label className="zaskrtavatko" style={{ display: 'flex', gap: 12, alignItems: 'center', fontWeight: 400 }}>
              <input type="checkbox" name="urad" value="ano" defaultChecked={p.urad} style={{ width: 24, height: 24 }} />
              Zapnutý modul Digitální úřad
            </label>
          </fieldset>
          <label htmlFor="budovy">Počet budov s modulem Chytré budovy</label>
          <input id="budovy" name="budovy" type="number" min={0} max={50} defaultValue={p.budovy} inputMode="numeric" />
          <label htmlFor="platba">Způsob platby</label>
          <select id="platba" name="platba" defaultValue={p.platba}>
            <option value="rocni">Roční licence, faktura</option>
            <option value="mesicni">Měsíčně kartou</option>
          </select>
          <label htmlFor="stav">Stav</label>
          <select id="stav" name="stav" defaultValue={p.stav}>
            {Object.entries(NAZVY_STAVU).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <p style={{ fontSize: 15, color: 'var(--muted)' }}>Jen pro čtení nikdy nevypíná úřední desku, krizová hlášení ani export dat.</p>
          <button type="submit">Uložit předplatné</button>
        </form>

        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>Cena</h2>
          <div className="posuvnik">
            <table className="tabulka-admin">
              <caption className="sr-only">Položky předplatného</caption>
              <thead>
                <tr>
                  <th scope="col">Položka</th>
                  <th scope="col" className="cislo">
                    Měsíčně
                  </th>
                </tr>
              </thead>
              <tbody>
                {polozky(p).map((x) => (
                  <tr key={x.popis}>
                    <td data-popisek="Položka">{x.popis}</td>
                    <td data-popisek="Měsíčně" className="cislo">{kc(x.kcBezDph)}</td>
                  </tr>
                ))}
                <tr>
                  <th data-popisek="Položka" scope="row">Celkem bez DPH</th>
                  <td data-popisek="Měsíčně" className="cislo">
                    <strong>{kc(mesicne(p))}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <a href="/ukazka/administrace/predplatne">Jak to vidí obec</a>
          </p>
        </div>
      </div>

      <h2>Faktury</h2>
      {faktury.length ? (
        <div className="posuvnik">
          <table className="tabulka-admin">
            <caption className="sr-only">Faktury obce {p.obec}</caption>
            <thead>
              <tr>
                <th scope="col">Číslo</th>
                <th scope="col">Období</th>
                <th scope="col">Splatnost</th>
                <th scope="col" className="cislo">
                  Bez DPH
                </th>
                <th scope="col">Stav</th>
                <th scope="col">Změnit stav</th>
              </tr>
            </thead>
            <tbody>
              {faktury.map((f) => (
                <tr key={f.cislo}>
                  <td data-popisek="Číslo">{f.cislo}</td>
                  <td data-popisek="Období">{f.obdobi}</td>
                  <td data-popisek="Splatnost">{datum(f.splatnost)}</td>
                  <td data-popisek="Bez DPH" className="cislo">{kc(soucet(f))}</td>
                  <td data-popisek="Stav">
                    <span className={`stav ${tridaFaktury(f.stav)}`}>{NAZVY_STAVU_FAKTURY[f.stav]}</span>
                    {f.zaplaceno ? <span style={{ display: 'block', fontSize: 14 }}>{datum(f.zaplaceno)}</span> : null}
                  </td>
                  <td data-popisek="Změnit stav">
                    <FormStavu cislo={f.cislo} stav={f.stav} zpet={`/ukazka/codekom/obce/${p.slug}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Obec zatím nemá žádnou fakturu, je ve zkušební době.</p>
      )}
    </>
  )
}

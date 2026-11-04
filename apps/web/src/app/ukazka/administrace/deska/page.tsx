import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { formatDay, pragueDayKey, stavDokumentu } from '@codekom/typy/pravidla'
import { uloziste } from '@/lib/data/demo-pamet'
import { FormDeska, FormSejmuti, FormSmazat } from '../Formulare'

export const metadata: Metadata = { title: 'Úřední deska' }
export const dynamic = 'force-dynamic'

export default function AdministraceDesky() {
  const u = uloziste()
  const dnes = pragueDayKey(demoTed())
  const visi = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'visi')
  const pripravene = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'pripraveno')
  return (
    <>
      <h1>Vyvěsit na úřední desku</h1>
      <FormDeska kategorie={u.kategorie.map((k) => ({ slug: k.slug, nazev: k.nazev }))} dnes={dnes} />

      {pripravene.length > 0 ? (
        <>
          <h2>Připravené k vyvěšení</h2>
          <ul className="seznam">
            {pripravene.map((d) => (
              <li key={d.id}>
                <p style={{ margin: 0 }}>
                  {d.nazev}, vyvěsí se {formatDay(d.vyvesenoOd)}
                </p>
                <FormSmazat id={d.id} nazev={d.nazev} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2>Na desce právě visí</h2>
      <p>Dokument, který už visel, nejde smazat. Úprava vytvoří novou verzi.</p>
      <ul className="seznam">
        {visi.map((d) => (
          <li key={d.id}>
            <p style={{ margin: '0 0 4px' }}>
              <a href={`/uredni-deska/${d.id}`}>{d.nazev}</a>
            </p>
            <p className="vedlejsi" style={{ margin: '0 0 8px' }}>
              Vyvěšeno {formatDay(d.vyvesenoOd)}, sejmutí {d.vyvesenoDo ? formatDay(d.vyvesenoDo) : 'do odvolání'}, verzí {d.verze.length}
            </p>
            <FormSejmuti id={d.id} nazev={d.nazev} vyvesenoDo={d.vyvesenoDo} />
          </li>
        ))}
      </ul>
    </>
  )
}

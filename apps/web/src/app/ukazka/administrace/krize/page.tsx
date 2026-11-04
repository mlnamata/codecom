import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { UROVNE } from '@codekom/tokeny'
import { aktivniHlaseni, formatDateTime } from '@codekom/typy/pravidla'
import { uloziste } from '@/lib/data/demo-pamet'
import { FormKoncept, FormKrize, FormUkoncit } from '../Formulare'

export const metadata: Metadata = { title: 'Krizová hlášení' }
export const dynamic = 'force-dynamic'

export default function AdministraceKrize() {
  const u = uloziste()
  const aktivni = aktivniHlaseni(
    u.krize.filter((h) => h.stav === 'vydano'),
    demoTed(),
  )
  const koncepty = u.krize.filter((h) => h.stav === 'koncept')
  return (
    <>
      <h1>Krizová hlášení</h1>
      <p>Na webu je vidět vždy jen jedno hlášení, to nejzávažnější. Hlášení nenahrazuje varovný systém IZS.</p>
      <FormKrize casti={u.obec.castiObce.map((c) => ({ slug: c.slug, nazev: c.nazev }))} />

      <h2>Platí teď</h2>
      {aktivni.length === 0 ? <p>Žádné hlášení neplatí.</p> : null}
      <ul className="seznam">
        {aktivni.map((h) => (
          <li key={h.id}>
            <p style={{ margin: '0 0 4px', fontWeight: 600 }}>
              {UROVNE[h.uroven].nazev}: {h.titulek}
            </p>
            <p className="vedlejsi" style={{ margin: '0 0 8px' }}>
              Od {formatDateTime(h.platiOd)}
              {h.platiDo ? ` do ${formatDateTime(h.platiDo)}` : ' do odvolání'}
            </p>
            <FormUkoncit id={h.id} titulek={h.titulek} />
          </li>
        ))}
      </ul>

      {koncepty.length > 0 ? (
        <>
          <h2>Koncepty od redaktorů</h2>
          <ul className="seznam">
            {koncepty.map((h) => (
              <li key={h.id}>
                <p style={{ margin: '0 0 8px', fontWeight: 600 }}>
                  {UROVNE[h.uroven].nazev}: {h.titulek}
                </p>
                <FormKoncept id={h.id} titulek={h.titulek} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  )
}

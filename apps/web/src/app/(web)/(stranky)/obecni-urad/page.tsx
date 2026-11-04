import type { Metadata } from 'next'
import { Drobecky, UredniHodiny } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'

export const metadata: Metadata = { title: 'Obecní úřad' }

export default async function ObecniUrad() {
  const obec = await nactiObec()
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Obecní úřad' }]} />
      <h1>Obecní úřad</h1>
      <p>
        {obec.adresa.ulice}, {obec.adresa.psc} {obec.adresa.obec}. Telefon {obec.telefon}, e-mail {obec.email}.
      </p>

      <h2>Úřední hodiny</h2>
      <UredniHodiny obec={obec} />

      <h2>Kontakty</h2>
      <ul className="seznam">
        {obec.kontakty.map((k) => (
          <li key={k.id}>
            <h3 style={{ marginTop: 0 }}>{k.jmeno ? `${k.jmeno}, ${k.funkce.toLowerCase()}` : k.funkce}</h3>
            <p style={{ margin: 0 }}>
              {k.agenda}
              <br />
              {k.kancelar ? `${k.kancelar}, ` : ''}
              {k.kdy}
              <br />
              Telefon {k.telefon}, e-mail {k.email}
            </p>
          </li>
        ))}
      </ul>

      <h2>Úřední údaje</h2>
      <p className="vedlejsi">Údaje ukázkové obce jsou zástupné texty v hranatých závorkách.</p>
      <dl className="udaje">
        <dt>Název</dt>
        <dd>Obec {obec.nazev}</dd>
        <dt>Okres a kraj</dt>
        <dd>
          {obec.okres}, {obec.kraj}
        </dd>
        <dt>IČO</dt>
        <dd>{obec.ico}</dd>
        <dt>DIČ</dt>
        <dd>{obec.dic}</dd>
        <dt>Datová schránka</dt>
        <dd>{obec.datovaSchranka}</dd>
        <dt>Bankovní účet</dt>
        <dd>{obec.cisloUctu}</dd>
      </dl>

      <h2>Pověřenec pro ochranu osobních údajů</h2>
      <p>
        {obec.poverenec.jmeno}, e-mail {obec.poverenec.email}, telefon {obec.poverenec.telefon}
      </p>
    </>
  )
}

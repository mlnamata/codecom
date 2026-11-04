import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CENY_WEBU, NAZVY_STAVU, NAZVY_STAVU_FAKTURY, VELIKOSTI, fakturyObce, mesicne, polozky, predplatneObce, soucet, velikost } from '@/lib/data/predplatne'
import { kc, datum, tridaFaktury } from '@/lib/format-predplatne'
import { NAZEV_UROVNE, PRINCIP_UROVNE, UROVNE } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'

export const metadata: Metadata = { title: 'Předplatné a faktury' }
export const dynamic = 'force-dynamic'

export default async function Predplatne() {
  const p = predplatneObce('javori-lhota')
  if (!p) notFound()
  const zkousite = await urovenAdministrace()
  const v = velikost(p.obyvatel)
  const faktury = [...fakturyObce(p.slug)].sort((a, b) => b.vystaveno.localeCompare(a.vystaveno))
  return (
    <>
      <h1>Předplatné a faktury</h1>
      <p>Co má obec Javoří Lhota předplacené, kolik to stojí a jaké faktury jsme vystavili. Platby jdou na účet CodeKom, platby občanů za poplatky jdou vždy přímo na účet obce.</p>

      <ul className="cisla">
        <li>
          Úroveň editoru
          <strong>{NAZEV_UROVNE[p.uroven]}</strong>
        </li>
        <li>
          Měsíčně bez DPH
          <strong>{kc(mesicne(p))}</strong>
        </li>
        <li>
          Platba
          <strong>{p.platba === 'rocni' ? 'Roční licence' : 'Měsíčně kartou'}</strong>
        </li>
        <li>
          Stav
          <strong>{NAZVY_STAVU[p.stav]}</strong>
        </li>
      </ul>

      {zkousite !== p.uroven ? (
        <p className="panel-bily">
          V ukázce si právě zkoušíte úroveň {NAZEV_UROVNE[zkousite]}. Obec má předplacenou úroveň {NAZEV_UROVNE[p.uroven]}. Na vyšší úroveň přejde kdykoli a obsah se zachová.
        </p>
      ) : null}

      <h2>Co je v předplatném</h2>
      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Položky předplatného</caption>
          <thead>
            <tr>
              <th scope="col">Položka</th>
              <th scope="col" className="cislo">
                Měsíčně bez DPH
              </th>
            </tr>
          </thead>
          <tbody>
            {polozky(p).map((x) => (
              <tr key={x.popis}>
                <td data-popisek="Položka">{x.popis}</td>
                <td data-popisek="Měsíčně bez DPH" className="cislo">{kc(x.kcBezDph)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>
        Obec má {p.obyvatel} obyvatel, platí ceny pro velikost {VELIKOSTI[v]}. Orientační ceny ke 4. 11. 2026.
      </p>

      <h2>Změna úrovně</h2>
      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Úrovně editoru a jejich cena pro obec</caption>
          <thead>
            <tr>
              <th scope="col">Úroveň</th>
              <th scope="col">Princip</th>
              <th scope="col" className="cislo">
                Web měsíčně
              </th>
              <th scope="col">
                <span className="sr-only">Akce</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {UROVNE.map((u) => (
              <tr key={u}>
                <td data-popisek="Úroveň">{NAZEV_UROVNE[u]}</td>
                <td data-popisek="Princip">{PRINCIP_UROVNE[u]}</td>
                <td data-popisek="Web měsíčně" className="cislo">{kc(CENY_WEBU[u][v])}</td>
                <td data-popisek="Akce">{u === p.uroven ? <span className="stav neutralni">Máte</span> : <a href={`?uroven=${u}`}>Vyzkoušet</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>O změnu předplatného obec požádá e-mailem nebo telefonem. Smlouvu může vypovědět kdykoli, export dat je zdarma.</p>

      <h2>Faktury</h2>
      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Faktury obce</caption>
          <thead>
            <tr>
              <th scope="col">Číslo</th>
              <th scope="col">Období</th>
              <th scope="col">Vystaveno</th>
              <th scope="col">Splatnost</th>
              <th scope="col" className="cislo">
                Bez DPH
              </th>
              <th scope="col">Stav</th>
            </tr>
          </thead>
          <tbody>
            {faktury.map((f) => (
              <tr key={f.cislo}>
                <td data-popisek="Číslo">{f.cislo}</td>
                <td data-popisek="Období">{f.obdobi}</td>
                <td data-popisek="Vystaveno">{datum(f.vystaveno)}</td>
                <td data-popisek="Splatnost">{datum(f.splatnost)}</td>
                <td data-popisek="Bez DPH" className="cislo">{kc(soucet(f))}</td>
                <td data-popisek="Stav">
                  <span className={`stav ${tridaFaktury(f.stav)}`}>{NAZVY_STAVU_FAKTURY[f.stav]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>Fakturu u roční licence posíláme do datové schránky, u měsíčního předplatného doklad e-mailem. DPH se připočte, je-li CodeKom jejím plátcem: [DOPLNIT: plátce DPH].</p>
    </>
  )
}

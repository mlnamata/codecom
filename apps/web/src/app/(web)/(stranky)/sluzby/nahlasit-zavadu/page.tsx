import type { Metadata } from 'next'
import { formatDateTime } from '@codekom/typy/pravidla'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'
import { FormularZavady } from './FormularZavady'

export const metadata: Metadata = { title: 'Nahlásit závadu' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function NahlasitZavadu({ searchParams }: { searchParams: SearchParams }) {
  const obec = await nactiObec()
  const z = await zdroj()
  const kategorie = await z.kategorieZavad(slugObce())
  const sp = await searchParams
  const kod = (Array.isArray(sp.kod) ? sp.kod[0] : sp.kod)?.trim().toUpperCase().slice(0, 12) ?? ''
  const hlaseni = kod ? await z.hlaseniZavad(slugObce(), kod) : null
  const stavy = await z.stavyZavad(slugObce())

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Služby', href: '/sluzby' }, { nazev: 'Nahlásit závadu' }]} />
      <h1>Nahlásit závadu</h1>
      <p>Nesvítí lampa, je díra v cestě nebo přetéká koš? Napište nám. Nefoťte prosím lidi ani SPZ aut.</p>
      <FormularZavady kategorie={kategorie} />

      <h2 id="stav">Jak se řeší vaše hlášení</h2>
      <form method="get" action="/sluzby/nahlasit-zavadu#stav" className="panel">
        <div className="pole">
          <label htmlFor="kod">Sledovací kód</label>
          <span id="kod-napoveda" className="napoveda">
            Osm znaků, které jste dostali po odeslání.
          </span>
          <input id="kod" name="kod" type="text" defaultValue={kod} maxLength={12} autoComplete="off" aria-describedby="kod-napoveda" />
        </div>
        <button type="submit">Zjistit stav</button>
      </form>
      {kod ? (
        hlaseni ? (
          <section className="panel" aria-labelledby="stav-nadpis" role="status">
            <h3 id="stav-nadpis" style={{ marginTop: 0 }}>
              Hlášení {hlaseni.cislo}
            </h3>
            <dl className="udaje">
              <dt>Stav</dt>
              <dd>{stavy.find((s) => s.id === hlaseni.stav)?.nazev ?? hlaseni.stav}</dd>
              <dt>Místo</dt>
              <dd>{hlaseni.misto}</dd>
              <dt>Nahlášeno</dt>
              <dd>{formatDateTime(hlaseni.vytvoreno)}</dd>
              <dt>Odpověď úřadu</dt>
              <dd>{hlaseni.verejnaOdpoved ?? 'Zatím bez odpovědi.'}</dd>
            </dl>
          </section>
        ) : (
          <p role="status">Hlášení s kódem {kod} jsme nenašli. Zkontrolujte kód, nebo zavolejte na úřad.</p>
        )
      ) : null}

      <VyriditeNaUrade obec={obec}>Závadu můžete nahlásit i telefonem nebo osobně.</VyriditeNaUrade>
    </>
  )
}

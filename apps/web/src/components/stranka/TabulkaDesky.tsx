import type { DokumentDesky, KategorieDesky } from '@codekom/typy'
import {
  deskaHref,
  formatDay,
  formatVelikost,
  jeVychozi,
  NA_STRANU,
  pocetDokumentu,
  popisFiltru,
  stavDokumentu,
  typSouboru,
  type DeskaFiltry,
} from '@codekom/typy/pravidla'

const STAV_TEXT = { pripraveno: 'Připraveno', visi: 'Visí', sejmuto: 'Sejmuto' } as const

interface Props {
  filtry: DeskaFiltry
  kategorie: KategorieDesky[]
  polozky: DokumentDesky[]
  celkem: number
  dnes: string
  cesta: string
  /** Archiv nemá volbu stavu, ukazuje jen sejmuté. */
  archiv?: boolean
}

/** Formulář GET, tabulka a stránkování úřední desky. Celý stav je v URL. */
export function TabulkaDesky({ filtry, kategorie, polozky, celkem, dnes, cesta, archiv }: Props) {
  const nazevKategorie = (slug: string) => kategorie.find((k) => k.slug === slug)?.nazev ?? slug
  const stran = Math.max(1, Math.ceil(celkem / NA_STRANU))
  const popis = popisFiltru(filtry, filtry.kategorie ? nazevKategorie(filtry.kategorie) : null)
  const vychozi = archiv ? !filtry.kategorie && !filtry.q : jeVychozi(filtry)

  return (
    <>
      <form method="get" action={cesta} role="search" aria-label="Filtr úřední desky" className="panel">
        <div className="mrizka">
          <div className="pole">
            <label htmlFor="deska-kategorie">Kategorie</label>
            <select id="deska-kategorie" name="kategorie" defaultValue={filtry.kategorie ?? ''}>
              <option value="">Všechny kategorie</option>
              {kategorie.map((k) => (
                <option key={k.slug} value={k.slug}>
                  {k.nazev}
                </option>
              ))}
            </select>
          </div>
          {archiv ? null : (
            <div className="pole">
              <label htmlFor="deska-stav">Zobrazit</label>
              <select id="deska-stav" name="stav" defaultValue={filtry.stav}>
                <option value="visi">Visí na desce</option>
                <option value="sejmuto">Sejmuté (archiv)</option>
                <option value="vse">Všechny</option>
              </select>
            </div>
          )}
          <div className="pole">
            <label htmlFor="deska-q">Hledat v názvu nebo čísle jednacím</label>
            <input id="deska-q" name="q" type="search" defaultValue={filtry.q} maxLength={100} />
          </div>
        </div>
        <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <button type="submit">Použít filtr</button>
          {vychozi ? null : <a href={cesta}>Zrušit filtr</a>}
        </p>
      </form>

      <p role="status">
        {pocetDokumentu(celkem)}. {popis}.
      </p>

      {polozky.length === 0 ? (
        <div className="panel">
          {vychozi ? (
            <p style={{ margin: 0 }}>{archiv ? 'V archivu zatím nic není.' : 'Na úřední desce teď nic nevisí.'}</p>
          ) : (
            <p style={{ margin: 0 }}>
              Žádný dokument neodpovídá filtru. <a href={cesta}>Zrušit filtr</a>
            </p>
          )}
        </div>
      ) : (
        <div className="tabulka-obal">
          <table>
            <caption>
              Dokumenty na úřední desce: {popis}
              {stran > 1 ? `, strana ${filtry.strana} z ${stran}` : ''}
            </caption>
            <thead>
              <tr>
                <th scope="col">Dokument</th>
                <th scope="col">Kategorie</th>
                <th scope="col">Číslo jednací</th>
                <th scope="col">Vyvěšeno</th>
                <th scope="col">Sejmutí</th>
                <th scope="col">Stav</th>
                <th scope="col">Soubor</th>
              </tr>
            </thead>
            <tbody>
              {polozky.map((d) => {
                const stav = stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes)
                const velikost = formatVelikost(d.soubor.velikost)
                return (
                  <tr key={d.id}>
                    <th scope="row" style={{ fontWeight: 400 }}>
                      <a href={`/uredni-deska/${d.id}`}>{d.nazev}</a>
                    </th>
                    <td>{nazevKategorie(d.kategorie)}</td>
                    <td>{d.cisloJednaci}</td>
                    <td>{formatDay(d.vyvesenoOd)}</td>
                    <td>{d.vyvesenoDo ? formatDay(d.vyvesenoDo) : 'do odvolání'}</td>
                    <td>{STAV_TEXT[stav]}</td>
                    <td>
                      <a href={`/uredni-deska/${d.id}/soubor`}>
                        {typSouboru(d.soubor.typ)}
                        {velikost ? `, ${velikost}` : ''}
                        <span className="sr-only">: {d.nazev}</span>
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {stran > 1 ? (
        <nav aria-label="Stránkování">
          <ul className="strankovani">
            {filtry.strana > 1 ? (
              <li>
                <a href={deskaHref({ ...filtry, strana: filtry.strana - 1 }, cesta)}>Předchozí strana</a>
              </li>
            ) : null}
            {Array.from({ length: stran }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                {n === filtry.strana ? (
                  <span aria-current="page">Strana {n}</span>
                ) : (
                  <a href={deskaHref({ ...filtry, strana: n }, cesta)}>Strana {n}</a>
                )}
              </li>
            ))}
            {filtry.strana < stran ? (
              <li>
                <a href={deskaHref({ ...filtry, strana: filtry.strana + 1 }, cesta)}>Další strana</a>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </>
  )
}

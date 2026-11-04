import type { Obec } from '@codekom/typy'
import type { ReactNode } from 'react'

/** Drobečková navigace. Poslední položka je aktuální stránka. */
export function Drobecky({ polozky }: { polozky: { nazev: string; href?: string }[] }) {
  return (
    <nav aria-label="Drobečková navigace">
      <ol className="drobecky">
        <li>
          <a href="/">Úvod</a>
        </li>
        {polozky.map((p) => (
          <li key={p.nazev}>{p.href ? <a href={p.href}>{p.nazev}</a> : <span aria-current="page">{p.nazev}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

const DNY = ['', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle']

export function UredniHodiny({ obec }: { obec: Obec }) {
  return (
    <dl className="udaje">
      {obec.uredniHodiny.map((h) => (
        <div key={h.den} style={{ display: 'contents' }}>
          <dt>{DNY[h.den]}</dt>
          <dd>
            {h.od.replace(/^0/, '')} až {h.do.replace(/^0/, '')}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Pravidlo 6: každá online služba má i cestu přes úřad. */
export function VyriditeNaUrade({ obec, children }: { obec: Obec; children?: ReactNode }) {
  return (
    <section className="panel" aria-labelledby="na-urade">
      <h2 id="na-urade" style={{ marginTop: 0 }}>
        Vyřídíte i na úřadě
      </h2>
      {children ? <p>{children}</p> : null}
      <p>
        Obecní úřad {obec.nazev}, {obec.adresa.ulice}, {obec.adresa.psc} {obec.adresa.obec}
        <br />
        Úřední hodiny: {obec.uredniHodinyText}
        <br />
        Telefon: {obec.telefon}
      </p>
    </section>
  )
}

/** Krátký kontakt na úřad pro chybové a prázdné stavy. */
export function KontaktUradu({ obec }: { obec: Obec }) {
  return (
    <p>
      Zavolejte na obecní úřad: {obec.telefon}, nebo přijďte na adresu {obec.adresa.ulice}, {obec.adresa.obec} ({obec.uredniHodinyText}).
    </p>
  )
}

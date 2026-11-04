'use client'

// Jen kontakt obce, bez validace a zbytku dat, aby klientský balík zůstal malý.
import obec from '../../../../../../obsah/javori-lhota/obec.json'

/** Chybová stránka. Úřad je vždy záložní cesta (pravidlo 6). */
export default function Chyba({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <h1>Stránku se nepodařilo načíst</h1>
      <p>Zkuste to prosím znovu. Pokud chyba trvá, obraťte se na obecní úřad.</p>
      <p>
        <button type="submit" onClick={reset}>
          Zkusit znovu
        </button>
      </p>
      <p>
        Obecní úřad {obec.nazev}, {obec.adresa.ulice}, {obec.adresa.psc} {obec.adresa.obec}
        <br />
        Úřední hodiny: {obec.uredniHodinyText}
        <br />
        Telefon: {obec.telefon}
      </p>
    </>
  )
}

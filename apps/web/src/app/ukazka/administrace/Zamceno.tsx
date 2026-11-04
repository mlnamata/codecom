import { NAZEV_UROVNE, PRINCIP_UROVNE, type Uroven } from '@/ukazka/uroven'

/** Obrazovka, která v nižší úrovni není. V ostrém provozu ji server vůbec nevydá. */
export function Zamceno({ od, co }: { od: Uroven; co: string }) {
  return (
    <div className="zamcena-stranka">
      <p style={{ marginTop: 0, fontWeight: 600 }}>
        {co} je od úrovně {NAZEV_UROVNE[od]} („{PRINCIP_UROVNE[od]}“).
      </p>
      <p>Na vyšší úroveň obec přejde kdykoli a obsah webu se zachová.</p>
      <p className="radek-akci" style={{ marginBottom: 0 }}>
        <a className="tlacitko" href={`?uroven=${od}`}>
          Vyzkoušet úroveň {NAZEV_UROVNE[od]}
        </a>
        <a href="/ukazka/administrace/predplatne">Předplatné obce</a>
      </p>
    </div>
  )
}

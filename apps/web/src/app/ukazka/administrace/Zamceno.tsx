import { NAZEV_UROVNE, PRINCIP_UROVNE, type Uroven } from '@/ukazka/uroven'

/** Obrazovka, která v nižší úrovni není. V ostrém provozu ji server vůbec nevydá. */
export function Zamceno({ od, co }: { od: Uroven; co: string }) {
  return (
    <div className="zamcena-stranka">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 8,
            background: '#eff6ff',
            color: '#1d4ed8',
          }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <strong style={{ fontSize: 15, color: '#0f172a' }}>Dostupné ve vyšší úrovni</strong>
      </div>
      <p style={{ marginTop: 0, fontWeight: 600 }}>
        {co} je od úrovně {NAZEV_UROVNE[od]} („{PRINCIP_UROVNE[od]}“).
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 13.5 }}>
        Na vyšší úroveň obec přejde kdykoli a veškerý obsah i struktura webu se v plném rozsahu zachová.
      </p>
      <p className="radek-akci" style={{ marginBottom: 0, marginTop: 16 }}>
        <a className="tlacitko" href={`?uroven=${od}`}>
          Vyzkoušet úroveň {NAZEV_UROVNE[od]}
        </a>
        <a href="/ukazka/administrace/predplatne" style={{ fontSize: 13.5, textDecoration: 'underline' }}>
          Předplatné obce
        </a>
      </p>
    </div>
  )
}

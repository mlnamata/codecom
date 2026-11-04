/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S03-Studanka.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
          <ZnakObce velikost={36} />
          <span>
            <span style={{ display: "block", fontFamily: "var(--font-alegreya), Georgia, serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.2" }}>Javoří Lhota</span>
            <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{"pro ty, kdo tu žijí, i pro chalupáře"}</span>
          </span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
          <a href="/zivotni-situace" style={{ color: "var(--ink)", textDecoration: "none" }}>Pro chalupáře</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Obec a úřad"}</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Příroda a výlety"}</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Kontakty</a>
        </nav>
        {' '}
        <details className="nav-narrow">
          <summary>
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2"></path>
            </svg>
            Menu
          </summary>
          <nav aria-label="Hlavní menu">
            <a href="/zivotni-situace">Pro chalupáře</a>
            <a href="/obecni-urad">{"Obec a úřad"}</a>
            <a href="/obecni-urad">{"Příroda a výlety"}</a>
            <a href="/obecni-urad">Kontakty</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S12-Kolonada.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
          <ZnakObce velikost={30} />
          <span style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontWeight: "600", fontSize: "26px", lineHeight: "1" }}>Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 28px", fontWeight: "500" }}>
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Obec a úřad"}</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Kultura</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Anenský pramen</a>
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
            <a href="/obecni-urad">{"Obec a úřad"}</a>
            <a href="/obecni-urad">Kultura</a>
            <a href="/obecni-urad">Anenský pramen</a>
            <a href="/obecni-urad">Kontakty</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

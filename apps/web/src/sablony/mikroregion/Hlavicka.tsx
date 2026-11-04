/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S19-Mikroregion.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
          <ZnakObce velikost={32} />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.15" }}>
            <span style={{ fontWeight: "600", fontSize: "20px" }}>Javoří Lhota</span>
            <span style={{ fontSize: "14px", color: "var(--muted)" }}>obec se čtyřmi částmi</span>
          </span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Části obce</a>
          {' '}
          <a href="/zastupitelstvo" style={{ color: "var(--ink)", textDecoration: "none" }}>Osadní výbory</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřad</a>
          {' '}
          <a href="/uredni-deska" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřední deska</a>
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
            <a href="/obecni-urad">Části obce</a>
            <a href="/zastupitelstvo">Osadní výbory</a>
            <a href="/obecni-urad">Úřad</a>
            <a href="/uredni-deska">Úřední deska</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

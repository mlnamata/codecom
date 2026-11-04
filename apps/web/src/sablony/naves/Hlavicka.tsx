/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/Main.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "20px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "var(--ink)" }}>
        <ZnakObce velikost={40} />
        <span>
          <span style={{ display: "block", fontWeight: "600", fontSize: "20px", lineHeight: "1.2" }}>Javoří Lhota</span>
          <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>obec pod Javorníkem</span>
        </span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 24px", fontWeight: "500" }}>
        <a href="/obecni-urad" style={{ textDecoration: "none", color: "var(--ink)" }}>Obecní úřad</a>
        {' '}
        <a href="/obecni-urad" style={{ textDecoration: "none", color: "var(--ink)" }}>{"Život v obci"}</a>
        {' '}
        <a href="/uredni-deska" style={{ textDecoration: "none", color: "var(--ink)" }}>Úřední deska</a>
        {' '}
        <a href="/obecni-urad" style={{ textDecoration: "none", color: "var(--ink)" }}>Kontakty</a>
        {' '}
        <a href="/hledat" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", background: "var(--bg)", color: "var(--ink)", textDecoration: "none", boxShadow: "inset 0 0 0 1px var(--line)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-3.5-3.5"></path>
          </svg>
          Hledat
        </a>
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
          <a href="/obecni-urad">Obecní úřad</a>
          <a href="/obecni-urad">{"Život v obci"}</a>
          <a href="/uredni-deska">Úřední deska</a>
          <a href="/obecni-urad">Kontakty</a>
          <a href="/hledat">Hledat</a>
        </nav>
      </details>
    </header>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S14-Hraz.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
        <ZnakObce velikost={30} />
        <span style={{ fontWeight: "600", fontSize: "20px" }}>Javoří Lhota</span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 24px", fontWeight: "500" }}>
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřad</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Rybníky a voda"}</a>
        {' '}
        <a href="/akce" style={{ color: "var(--ink)", textDecoration: "none" }}>Akce</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Kontakty</a>
        {' '}
        <a href="/hledat" aria-label="Hledat na webu" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", color: "var(--ink)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-4-4"></path>
          </svg>
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
          <a href="/obecni-urad">Úřad</a>
          <a href="/obecni-urad">{"Rybníky a voda"}</a>
          <a href="/akce">Akce</a>
          <a href="/obecni-urad">Kontakty</a>
          <a href="/hledat">Hledat na webu</a>
        </nav>
      </details>
    </header>
  )
}

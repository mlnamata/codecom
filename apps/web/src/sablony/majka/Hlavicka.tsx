/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S05-Majka.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
          <ZnakObce velikost={32} />
          <span style={{ fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "30px", lineHeight: "1.1" }}>Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
          <a href="/akce" style={{ color: "var(--ink)", textDecoration: "none" }}>Akce</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Spolky</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Obecní úřad</a>
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
            <a href="/akce">Akce</a>
            <a href="/obecni-urad">Spolky</a>
            <a href="/obecni-urad">Obecní úřad</a>
            <a href="/obecni-urad">Kontakty</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

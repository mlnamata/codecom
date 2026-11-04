/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S16-Kompas.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "14px clamp(16px, 3vw, 28px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
          <ZnakObce velikost={30} />
          <span style={{ fontFamily: "var(--font-red-hat-display), system-ui, sans-serif", fontWeight: "600", fontSize: "20px" }}>Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Mapa obce</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřad</a>
          {' '}
          <a href="/uredni-deska" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřední deska</a>
          {' '}
          <a href="/sluzby/nahlasit-zavadu" style={{ color: "var(--ink)", textDecoration: "none" }}>Nahlásit závadu</a>
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
            <a href="/obecni-urad">Mapa obce</a>
            <a href="/obecni-urad">Úřad</a>
            <a href="/uredni-deska">Úřední deska</a>
            <a href="/sluzby/nahlasit-zavadu">Nahlásit závadu</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

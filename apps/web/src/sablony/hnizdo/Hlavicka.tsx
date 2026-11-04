/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S06-Hnizdo.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header className="deep" style={{ background: "var(--deep)", color: "#FFFFFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FFFFFF", textDecoration: "none" }}>
          <ZnakObce velikost={32} />
          <span style={{ fontWeight: "600", fontSize: "20px" }}>Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 24px", fontWeight: "500" }}>
          <a href="/obecni-urad" style={{ color: "#FFFFFF", textDecoration: "none" }}>{"Škola a školka"}</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "#FFFFFF", textDecoration: "none" }}>Doprava</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "#FFFFFF", textDecoration: "none" }}>Obecní úřad</a>
          {' '}
          <a href="/sluzby/nahlasit-zavadu" style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 16px", borderRadius: "8px", background: "#FFFFFF", color: "var(--deep)", textDecoration: "none", fontWeight: "600" }}>Nahlásit závadu</a>
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
            <a href="/obecni-urad">{"Škola a školka"}</a>
            <a href="/obecni-urad">Doprava</a>
            <a href="/obecni-urad">Obecní úřad</a>
            <a href="/sluzby/nahlasit-zavadu">Nahlásit závadu</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

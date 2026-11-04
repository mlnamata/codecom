/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S02-Zvonice.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)", borderBottom: "8px solid var(--primary)" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px 24px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--on-deep)", textDecoration: "none" }}>
          <ZnakObce velikost={28} />
          <span style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "24px", lineHeight: "1.2" }}>Obec Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/obecni-urad" style={{ color: "var(--on-deep)" }}>Úřad</a>
          {' '}
          <a href="/uredni-deska" style={{ color: "var(--on-deep)" }}>Úřední deska</a>
          {' '}
          <a href="/sluzby/platby" style={{ color: "var(--on-deep)" }}>Poplatky</a>
          {' '}
          <a href="/hledat" style={{ color: "var(--on-deep)" }}>Hledat</a>
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
            <a href="/uredni-deska">Úřední deska</a>
            <a href="/sluzby/platby">Poplatky</a>
            <a href="/hledat">Hledat</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

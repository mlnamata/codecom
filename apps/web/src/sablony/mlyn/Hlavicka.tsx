/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S13-Mlyn.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--on-deep)", textDecoration: "none" }}>
          <ZnakObce velikost={30} />
          <span style={{ fontFamily: "var(--font-barlow-condensed), system-ui, sans-serif", fontWeight: "600", fontSize: "24px", letterSpacing: "0.01em" }}>Javoří Lhota</span>
        </a>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
          <a href="/zivotni-situace" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Bydlím tady</a>
          {' '}
          <a href="/zivotni-situace" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Podnikám</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--on-deep)", textDecoration: "none" }}>{"Práce v obci"}</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Úřad</a>
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
            <a href="/zivotni-situace">Bydlím tady</a>
            <a href="/zivotni-situace">Podnikám</a>
            <a href="/obecni-urad">{"Práce v obci"}</a>
            <a href="/obecni-urad">Úřad</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

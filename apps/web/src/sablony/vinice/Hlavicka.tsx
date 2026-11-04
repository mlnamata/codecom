/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S08-Vinice.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ maxWidth: "1240px", margin: "0 auto", padding: "20px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--ink)", textDecoration: "none" }}>
        <ZnakObce velikost={28} />
        <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "600", fontSize: "22px" }}>Javoří Lhota</span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 28px", fontWeight: "500" }}>
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Výrobci</a>
        {' '}
        <a href="/akce" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Trhy a akce"}</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Obecní úřad</a>
        {' '}
        <a href="/obecni-urad" style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 16px", borderRadius: "8px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none" }}>Kontaktovat úřad</a>
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
          <a href="/obecni-urad">Výrobci</a>
          <a href="/akce">{"Trhy a akce"}</a>
          <a href="/obecni-urad">Obecní úřad</a>
          <a href="/obecni-urad">Kontaktovat úřad</a>
        </nav>
      </details>
    </header>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S18-Zpravodaj.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 24px", padding: "10px 0", borderBottom: "1px solid var(--ink)", fontSize: "14px" }}>
        <span>Ročník 31, číslo 11, listopad 2026</span>
        {' '}
        <span>Vydává obec Javoří Lhota, zdarma do každé schránky</span>
      </div>
      {' '}
      <a href="/" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px 20px", padding: "24px 0 18px", color: "var(--ink)", textDecoration: "none", textAlign: "center" }}>
        <ZnakObce velikost={48} />
        <span style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "clamp(40px, 7vw, 92px)", lineHeight: "1", letterSpacing: "-0.02em" }}>Javořílhotský zpravodaj</span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 28px", padding: "6px 0", borderTop: "3px double var(--ink)", borderBottom: "1px solid var(--ink)", fontWeight: "500" }}>
        <a href="/aktuality" style={{ color: "var(--ink)", textDecoration: "none" }}>Zprávy</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřad</a>
        {' '}
        <a href="/sluzby" style={{ color: "var(--ink)", textDecoration: "none" }}>Formuláře</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Spolky</a>
        {' '}
        <a href="/aktuality" style={{ color: "var(--ink)", textDecoration: "none" }}>Archiv čísel</a>
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
          <a href="/aktuality">Zprávy</a>
          <a href="/obecni-urad">Úřad</a>
          <a href="/sluzby">Formuláře</a>
          <a href="/obecni-urad">Spolky</a>
          <a href="/aktuality">Archiv čísel</a>
        </nav>
      </details>
    </header>
  )
}

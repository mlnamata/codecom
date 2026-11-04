/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S11-Radnice.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header className="deep" style={{ maxWidth: "1360px", margin: "0 auto", padding: "14px clamp(16px, 3vw, 28px)", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px 24px" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--on-deep)", textDecoration: "none" }}>
        <ZnakObce velikost={32} />
        <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.15" }}>
          <span style={{ fontWeight: "600", fontSize: "19px" }}>Javoří Lhota</span>
          <span style={{ fontSize: "14px", opacity: "0.85" }}>obecní úřad</span>
        </span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 24px", fontWeight: "500" }}>
        <a href="/obecni-urad" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Úřad</a>
        {' '}
        <a href="/uredni-deska" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Úřední deska</a>
        {' '}
        <a href="/zastupitelstvo" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Zastupitelstvo</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "var(--on-deep)", textDecoration: "none" }}>Kontakty</a>
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
          <a href="/zastupitelstvo">Zastupitelstvo</a>
          <a href="/obecni-urad">Kontakty</a>
        </nav>
      </details>
      {' '}
      <a href="/sluzby/nahlasit-zavadu" style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 18px", borderRadius: "10px", background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", fontWeight: "600" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3l9 16H3z"></path>
          <path d="M12 10v4M12 17h.01"></path>
        </svg>
        Nahlásit závadu
      </a>
    </header>
  )
}

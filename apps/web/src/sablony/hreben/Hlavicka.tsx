/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S09-Hreben.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "20px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#FFFFFF", textDecoration: "none" }}>
        <ZnakObce velikost={30} />
        <span style={{ fontWeight: "600", fontSize: "20px", fontStretch: "85%" }}>Javoří Lhota</span>
      </a>
      {' '}
      <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", fontWeight: "500" }}>
        <a href="/zivotni-situace" style={{ color: "#FFFFFF", textDecoration: "none" }}>Pro místní</a>
        {' '}
        <a href="/zivotni-situace" style={{ color: "#FFFFFF", textDecoration: "none" }}>Pro návštěvníky</a>
        {' '}
        <a href="/obecni-urad" style={{ color: "#FFFFFF", textDecoration: "none" }}>Obecní úřad</a>
        {' '}
        <a href="/hledat" style={{ color: "#FFFFFF" }}>Hledat</a>
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
          <a href="/zivotni-situace">Pro místní</a>
          <a href="/zivotni-situace">Pro návštěvníky</a>
          <a href="/obecni-urad">Obecní úřad</a>
          <a href="/hledat">Hledat</a>
        </nav>
      </details>
    </header>
  )
}

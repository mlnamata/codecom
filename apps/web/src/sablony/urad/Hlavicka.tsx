/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S20-Urad.html. */
import { ZnakObce } from '../sdilene/ZnakObce'

export function Hlavicka() {
  return (
    <header>
      <div style={{ background: "var(--surface)", fontSize: "14px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 20px" }}>
          <span>Oficiální web obce Javoří Lhota</span>
          {' '}
          <span>Úřad dnes otevřen 8 až 17 hodin</span>
        </div>
      </div>
      {' '}
      <div className="deep" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px 32px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "14px", color: "var(--on-primary)", textDecoration: "none" }}>
            <ZnakObce velikost={40} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
              <span style={{ fontWeight: "600", fontSize: "22px" }}>Obec Javoří Lhota</span>
              <span style={{ fontSize: "15px" }}>okres Klatovy, Plzeňský kraj</span>
            </span>
          </a>
          {' '}
          <form role="search" style={{ display: "flex", flex: "0 1 420px", minWidth: "0" }} action="/hledat" method="get">
            <label htmlFor="hledat20" className="sr">Hledat na webu obce</label>
            {' '}
            <input id="hledat20" type="search" placeholder="Co hledáte, třeba odpad nebo pobyt" style={{ flex: "1", minWidth: "0", minHeight: "48px", padding: "0 14px", border: "2px solid var(--on-primary)", borderRight: "0", borderRadius: "4px 0 0 4px", background: "var(--bg)", color: "var(--ink)", font: "inherit" }} name="q" />
            {' '}
            <button type="submit" style={{ minHeight: "48px", padding: "0 18px", border: "2px solid var(--on-primary)", borderRadius: "0 4px 4px 0", background: "var(--deep)", color: "var(--on-deep)", font: "inherit", fontWeight: "500", cursor: "pointer" }}>Hledat</button>
          </form>
        </div>
        {' '}
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "0 28px", fontWeight: "500" }}>
          <a href="/zivotni-situace" style={{ color: "var(--on-primary)", padding: "12px 0", boxShadow: "inset 0 -4px 0 var(--on-primary)", textDecoration: "none" }}>Životní situace</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--on-primary)", padding: "12px 0", textDecoration: "none" }}>Obecní úřad</a>
          {' '}
          <a href="/uredni-deska" style={{ color: "var(--on-primary)", padding: "12px 0", textDecoration: "none" }}>Úřední deska</a>
          {' '}
          <a href="/zastupitelstvo" style={{ color: "var(--on-primary)", padding: "12px 0", textDecoration: "none" }}>Samospráva</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--on-primary)", padding: "12px 0", textDecoration: "none" }}>Kontakty</a>
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
            <a href="/zivotni-situace">Životní situace</a>
            <a href="/obecni-urad">Obecní úřad</a>
            <a href="/uredni-deska">Úřední deska</a>
            <a href="/zastupitelstvo">Samospráva</a>
            <a href="/obecni-urad">Kontakty</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S11-Radnice.html. */

export function Paticka() {
  return (
    <footer className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <div style={{ maxWidth: "1296px", margin: "0 auto", padding: "32px clamp(16px, 3vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px" }}>
        <span>Obecní úřad Javoří Lhota, Náves 1, [PSČ], IČO [IČO], datová schránka [ID DS]</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace" style={{ color: "var(--on-deep)" }}>Povinné informace</a>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "var(--on-deep)" }}>Přístupnost</a>
          <a href="/ochrana-osobnich-udaju" style={{ color: "var(--on-deep)" }}>Osobní údaje</a>
        </nav>
      </div>
    </footer>
  )
}

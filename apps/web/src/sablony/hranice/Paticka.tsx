/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S07-Hranice.html. */

export function Paticka() {
  return (
    <footer className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px" }}>
        <span>Obecní úřad Javoří Lhota, Náves 1</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace" style={{ color: "var(--on-deep)" }}>Povinné informace</a>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "var(--on-deep)" }}>Přístupnost</a>
          <a href="/ochrana-osobnich-udaju" lang="de" style={{ color: "var(--on-deep)" }}>Impressum</a>
        </nav>
      </div>
    </footer>
  )
}

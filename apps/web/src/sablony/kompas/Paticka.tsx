/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S16-Kompas.html. */

export function Paticka() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "24px clamp(16px, 3vw, 28px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px" }}>
        <span>Obecní úřad Javoří Lhota, Náves 1, [TELEFON]</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace" style={{ color: "var(--link)" }}>Povinné informace</a>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "var(--link)" }}>Přístupnost</a>
          <a href="/ochrana-osobnich-udaju" style={{ color: "var(--link)" }}>Osobní údaje</a>
        </nav>
      </div>
    </footer>
  )
}

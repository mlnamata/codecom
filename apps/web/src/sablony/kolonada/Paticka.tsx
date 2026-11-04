/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S12-Kolonada.html. */

export function Paticka() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "28px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px", color: "var(--muted)" }}>
        <span>Obecní úřad Javoří Lhota, Náves 1, [E-MAIL], [TELEFON]</span>
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

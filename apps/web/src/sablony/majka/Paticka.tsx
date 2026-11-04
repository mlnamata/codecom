/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S05-Majka.html. */

export function Paticka() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "8px solid var(--r1)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px" }}>
        <span>{"Obecní úřad Javoří Lhota, otevřeno Po a St 8 až 17 hodin"}</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace">Povinné informace</a>
          <a href="/prohlaseni-o-pristupnosti">{"Prohlášení o přístupnosti"}</a>
          <a href="/ochrana-osobnich-udaju">Osobní údaje</a>
        </nav>
      </div>
    </footer>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S02-Zvonice.html. */

export function Paticka() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "32px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 32px", fontSize: "15px" }}>
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace">Povinně zveřejňované informace</a>
          <a href="/prohlaseni-o-pristupnosti">{"Prohlášení o přístupnosti"}</a>
          <a href="/ochrana-osobnich-udaju">Osobní údaje</a>
        </nav>
        {' '}
        <span style={{ color: "var(--muted)" }}>Obec Javoří Lhota, IČO [IČO]</span>
      </div>
    </footer>
  )
}

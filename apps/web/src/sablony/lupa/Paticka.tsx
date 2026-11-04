/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S15-Lupa.html. */

export function Paticka() {
  return (
    <footer className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "1.4em clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.6em 1.4em" }}>
        <span>Obecní úřad Javoří Lhota, Náves 1</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 1.2em" }}>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "var(--on-deep)" }}>{"Prohlášení o přístupnosti"}</a>
          <a href="/povinne-informace" style={{ color: "var(--on-deep)" }}>Povinné informace</a>
          <a href="/ochrana-osobnich-udaju" style={{ color: "var(--on-deep)" }}>Osobní údaje</a>
        </nav>
      </div>
    </footer>
  )
}

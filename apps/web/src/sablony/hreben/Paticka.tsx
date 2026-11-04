/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S09-Hreben.html. */

export function Paticka() {
  return (
    <footer className="deep" style={{ background: "var(--deep)", color: "#FFFFFF" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "28px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 28px", fontSize: "15px" }}>
        <span>Obecní úřad Javoří Lhota, [TELEFON], horská služba 1210</span>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          <a href="/povinne-informace" style={{ color: "#FFFFFF" }}>Povinné informace</a>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "#FFFFFF" }}>Přístupnost</a>
          <a href="/ochrana-osobnich-udaju" style={{ color: "#FFFFFF" }}>Osobní údaje</a>
        </nav>
      </div>
    </footer>
  )
}

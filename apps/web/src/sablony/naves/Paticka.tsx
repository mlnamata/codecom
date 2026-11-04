/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/Main.html. */

export function Paticka() {
  return (
    <footer className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "32px" }}>
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "17px" }}>Obecní úřad</h2>
          <p style={{ margin: "0" }}>
            Náves 1, [PSČ] Javoří Lhota
            <br />
            {"Po a St 8 až 17 hodin"}
            <br />
            [TELEFON]
          </p>
        </div>
        {' '}
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "17px" }}>Důležité formuláře</h2>
          <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
            <a href="/sluzby/platby" style={{ color: "var(--on-deep)" }}>{"Přihláška k poplatku za odpad"}</a>
            <a href="/sluzby#kaceni-stromu" style={{ color: "var(--on-deep)" }}>{"Žádost o kácení stromu"}</a>
          </p>
        </div>
        {' '}
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "17px" }}>Úřední údaje</h2>
          <p style={{ margin: "0" }}>
            IČO [IČO]
            <br />
            Datová schránka [ID DS]
            <br />
            Účet [ČÍSLO ÚČTU]
          </p>
        </div>
        {' '}
        <nav aria-label="Povinné informace" style={{ display: "flex", flexDirection: "column" }}>
          <a href="/povinne-informace" style={{ color: "var(--on-deep)" }}>Povinně zveřejňované informace</a>
          <a href="/prohlaseni-o-pristupnosti" style={{ color: "var(--on-deep)" }}>{"Prohlášení o přístupnosti"}</a>
          <a href="/ochrana-osobnich-udaju" style={{ color: "var(--on-deep)" }}>Ochrana osobních údajů</a>
        </nav>
      </div>
    </footer>
  )
}

/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S09-Hreben.html. */
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      {banner}
      <div className="deep" style={{ background: "var(--deep)", color: "#FFFFFF" }}>
        <Hlavicka />
      </div>
      <main id="obsah" tabIndex={-1}>
        <section className="deep" aria-labelledby="hreben-titulek" style={{ background: "var(--deep)", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px) 32px" }}>
            <h1 id="hreben-titulek" style={{ margin: "0", fontWeight: "500", fontStretch: "62%", fontSize: "clamp(72px, 17vw, 240px)", lineHeight: "0.95", letterSpacing: "-0.02em", overflowWrap: "anywhere" }}>Javorník</h1>
            {' '}
            <p style={{ margin: "8px 0 0", maxWidth: "40ch", fontSize: "20px", lineHeight: "1.45" }}>
              {"Javoří Lhota pod hřebenem, 1 012 metrů nad mořem. Na hřebeni dnes 2. listopadu v 10:40."}
            </p>
          </div>
          {' '}
          {/* Fotka je pás pod titulkem uvnitř hlavní oblasti, bílý text na ní neleží. */}
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>
            <FotoDlazdice soubor="sablona-09-hreben.webp" alt={POPISY_FOTEK.hreben ?? ""} styl={{ width: "100%", height: "clamp(220px, 34vw, 440px)", borderRadius: "12px" }} />
          </div>
          {' '}
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "8px clamp(16px, 4vw, 32px) 0" }}>
            <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "8px" }}>
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", color: "var(--ink)" }}>
                <dt style={{ fontSize: "15px", color: "var(--muted)" }}>Teplota na hřebeni</dt>
                <dd style={{ margin: "4px 0 0", fontSize: "36px", fontWeight: "500", fontStretch: "75%", fontVariantNumeric: "tabular-nums" }}>−1 °C</dd>
              </div>
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", color: "var(--ink)" }}>
                <dt style={{ fontSize: "15px", color: "var(--muted)" }}>{"Sníh u rozhledny"}</dt>
                <dd style={{ margin: "4px 0 0", fontSize: "36px", fontWeight: "500", fontStretch: "75%", fontVariantNumeric: "tabular-nums" }}>8 cm</dd>
              </div>
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", color: "var(--ink)" }}>
                <dt style={{ fontSize: "15px", color: "var(--muted)" }}>Vleky</dt>
                <dd style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: "500", lineHeight: "1.3" }}>mimo provoz, sezona od 19. prosince</dd>
              </div>
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", color: "var(--ink)" }}>
                <dt style={{ fontSize: "15px", color: "var(--muted)" }}>Silnice na Javorník</dt>
                <dd style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: "500", lineHeight: "1.3", color: "var(--link)" }}>sjízdná, ráno náledí</dd>
              </div>
            </dl>
          </div>
        </section>
        {' '}
        <section className="deep" style={{ background: "var(--deep)", color: "#FFFFFF" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 48px", padding: "28px 0", borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
              <span style={{ flex: "0 0 64px", fontSize: "20px", fontVariantNumeric: "tabular-nums", opacity: "0.8" }}>01</span>
              {' '}
              <h2 style={{ flex: "1 1 240px", margin: "0", fontSize: "32px", fontStretch: "75%" }}>Žiju tady</h2>
              {' '}
              <p style={{ flex: "2 1 360px", margin: "0", display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
                <a className="hit" href="/obecni-urad" style={{ color: "#FFFFFF" }}>Kdy se prohrnuje naše ulice</a>
                <a className="hit" href="/sluzby" style={{ color: "#FFFFFF" }}>Parkovací karta pro místní</a>
                <a className="hit" href="/sluzby/platby" style={{ color: "#FFFFFF" }}>Zaplatit poplatek za odpad</a>
                <a className="hit" href="/uredni-deska" style={{ color: "#FFFFFF" }}>Úřední deska</a>
              </p>
            </div>
            {' '}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 48px", padding: "28px 0", borderTop: "1px solid rgba(255, 255, 255, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
              <span style={{ flex: "0 0 64px", fontSize: "20px", fontVariantNumeric: "tabular-nums", opacity: "0.8" }}>02</span>
              {' '}
              <h2 style={{ flex: "1 1 240px", margin: "0", fontSize: "32px", fontStretch: "75%" }}>Přijel jsem na hory</h2>
              {' '}
              <p style={{ flex: "2 1 360px", margin: "0", display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
                <a className="hit" href="/obecni-urad" style={{ color: "#FFFFFF" }}>Webkamera na rozhledně</a>
                <a className="hit" href="/obecni-urad" style={{ color: "#FFFFFF" }}>{"Kde zaparkovat a kolik to stojí"}</a>
                <a className="hit" href="/obecni-urad" style={{ color: "#FFFFFF" }}>{"Ubytování v obci"}</a>
                <a className="hit" href="/obecni-urad" style={{ color: "#FFFFFF" }}>{"Horská služba a lékař"}</a>
              </p>
            </div>
          </div>
          {' '}
        </section>
        {' '}
        <section aria-labelledby="aktuality" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px" }}>
            <h2 id="aktuality" style={{ margin: "0 0 24px", fontSize: "40px", fontStretch: "75%" }}>{"Z obce a z hor"}</h2>
            {' '}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
              <article style={{ padding: "24px", borderRadius: "12px", background: "var(--bg)", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>30. října</p>
                <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/aktuality" style={{ color: "var(--ink)", textDecoration: "none" }}>Vleky na Javorníku pojedou od 19. prosince</a>
                </h3>
                <p style={{ margin: "0" }}>Pokud napadne aspoň 40 centimetrů sněhu. Permanentky prodává obecní úřad.</p>
              </article>
              {' '}
              <FotoDlazdice soubor="sablona-19-mikroregion.webp" alt={POPISY_FOTEK.mikroregion ?? ""} styl={{ height: "100%", minHeight: "220px", borderRadius: "12px" }} />
              {' '}
              <article style={{ padding: "24px", borderRadius: "12px", background: "var(--bg)", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>20. října</p>
                <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/aktuality" style={{ color: "var(--ink)", textDecoration: "none" }}>Nové parkoviště pod Javorníkem má 40 míst</a>
                </h3>
                <p style={{ margin: "0" }}>{"V zimě se platí 50 Kč za den, místní s kartou parkují zdarma."}</p>
              </article>
              {' '}
              <article style={{ padding: "24px", borderRadius: "12px", background: "var(--deep)", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "8px" }} className="deep">
                <p style={{ margin: "0", fontSize: "15px", opacity: "0.85" }}>Úřední deska</p>
                <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/uredni-deska" style={{ color: "#FFFFFF", textDecoration: "none" }}>{"Vyhláška o parkování v zimní sezoně"}</a>
                </h3>
                <p style={{ margin: "0" }}>visí do 15. prosince</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}

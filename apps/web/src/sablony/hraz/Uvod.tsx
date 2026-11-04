/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S14-Hraz.html. */
import type { ReactNode } from 'react'
import { Foto } from '../sdilene/Foto'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner, foto }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <section className="deep" aria-labelledby="hraz-titulek" style={{ position: "relative", background: "var(--deep)", color: "var(--on-deep)", overflow: "hidden" }}>
          {foto ? (
            <Foto sablona="hraz" styl={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
          ) : (
            <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
              <path d="M0 300 L1440 260 V520 H0z" style={{ fill: "var(--primary)" }}></path>
              <g className="hraz-deko" style={{ fill: "none", stroke: "var(--wave)" }} strokeWidth="3" strokeLinecap="round">
                <path d="M80 360 q30 -14 60 0 t60 0 t60 0"></path>
                <path d="M560 420 q30 -14 60 0 t60 0 t60 0 t60 0"></path>
                <path d="M1080 340 q30 -14 60 0 t60 0 t60 0"></path>
                <path d="M300 470 q30 -14 60 0 t60 0"></path>
              </g>
              <g className="hraz-deko">
                <path d="M760 268 L1440 230 V280 L760 300z" style={{ fill: "var(--surface)" }} opacity="0.9"></path>
                <g style={{ fill: "var(--wave)" }}>
                  <circle cx="880" cy="236" r="26"></circle>
                  <circle cx="930" cy="226" r="34"></circle>
                  <circle cx="1000" cy="234" r="24"></circle>
                  <circle cx="1220" cy="216" r="30"></circle>
                  <circle cx="1270" cy="222" r="22"></circle>
                </g>
                <path d="M1110 260 v-34 h40 v34z M1104 228 l26 -20 l26 20z" style={{ fill: "var(--accent)" }}></path>
              </g>
            </svg>
          )}
          {' '}
          <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "72px clamp(16px, 4vw, 32px) 200px" }}>
            <h1 id="hraz-titulek" style={{ margin: "0", maxWidth: "14ch", fontSize: "clamp(44px, 5.6vw, 76px)", lineHeight: "1.02", letterSpacing: "-0.02em" }}>{"Javoří Lhota u Mlýnského rybníka"}</h1>
            {' '}
            <p style={{ margin: "18px 0 0", maxWidth: "44ch", fontSize: "19px" }}>
              {"Obec se třemi rybníky a hrází z roku 1584. Výlov Mlýnského rybníka je v sobotu 14. listopadu."}
            </p>
          </div>
        </section>
        {' '}
        <section aria-labelledby="sluzby14" style={{ maxWidth: "1280px", margin: "-136px auto 0", padding: "0 clamp(16px, 4vw, 32px)", position: "relative" }}>
          <h2 id="sluzby14" className="sr">Služby obce</h2>
          {' '}
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 8px 24px rgba(8, 40, 44, 0.12), inset 0 0 0 1px var(--line)", overflow: "hidden" }}>
            <li style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <a href="/sluzby#svoz-odpadu" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>Odpady</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>plasty ve středu 4. 11.</span>
              </a>
            </li>
            <li style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <a href="/sluzby/platby" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>Poplatky</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>zaplatíte online</span>
              </a>
            </li>
            <li style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <a href="/obecni-urad" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12c3-4 6-4 9 0s6 4 9 0"></path>
                    <path d="M14 9l3-3M17 9V6h-3"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>Rybářské povolenky</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>na rok 2027 od prosince</span>
              </a>
            </li>
            <li style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <a href="/sluzby/nahlasit-zavadu" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3l9 16H3z"></path>
                    <path d="M12 10v4M12 17h.01"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>Nahlásit závadu</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>lampa, cesta, hráz</span>
              </a>
            </li>
            <li style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <a href="/sluzby#objednat-se-na-urad" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <circle cx="9" cy="12" r="2.5"></circle>
                    <path d="M14 10h4M14 14h3"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>{"Doklady a pobyt"}</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>Czech POINT na úřadě</span>
              </a>
            </li>
            <li style={{ borderBottom: "1px solid var(--line)" }}>
              <a href="/sluzby/rezervace" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "24px", minHeight: "160px", color: "var(--ink)", textDecoration: "none" }}>
                <span style={{ display: "inline-flex", width: "44px", height: "44px", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "var(--surface)", color: "var(--primary)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 21V9l8-5 8 5v12"></path>
                    <path d="M9 21v-6h6v6"></path>
                  </svg>
                </span>
                <span style={{ fontWeight: "600" }}>Pronájem sálu</span>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>hasičárna, do 120 lidí</span>
              </a>
            </li>
          </ul>
        </section>
        {' '}
        <section aria-labelledby="voda14" style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 56px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px 24px", marginBottom: "20px" }}>
            <h2 id="voda14" style={{ margin: "0", fontSize: "36px" }}>{"Voda v obci dnes"}</h2>
            {' '}
            <p style={{ margin: "0", color: "var(--muted)" }}>{"Čidla na hrázi a ve vodárně, změřeno v 10:30"}</p>
          </div>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
            <div style={{ padding: "24px", borderRadius: "16px", background: "var(--surface)", display: "flex", gap: "20px", alignItems: "center" }}>
              <svg viewBox="0 0 48 120" role="img" aria-label="Hladina na 103 procentech běžného stavu" style={{ flex: "none", width: "40px", height: "100px" }}>
                <rect x="1" y="1" width="46" height="118" rx="10" style={{ fill: "var(--bg)", stroke: "var(--line)" }} strokeWidth="2"></rect>
                <rect x="5" y="30" width="38" height="85" rx="7" style={{ fill: "var(--wave)" }}></rect>
                <path d="M0 40 H48" style={{ stroke: "var(--ink)" }} strokeWidth="2" strokeDasharray="4 3"></path>
              </svg>
              {' '}
              <dl style={{ margin: "0" }}>
                <dt style={{ color: "var(--muted)" }}>Mlýnský rybník</dt>
                <dd style={{ margin: "2px 0 0", fontSize: "32px", fontWeight: "500", fontVariantNumeric: "tabular-nums" }}>412 cm</dd>
                <dd style={{ margin: "0" }}>běžně 400 cm, před výlovem se upouští</dd>
              </dl>
            </div>
            {' '}
            <div style={{ padding: "24px", borderRadius: "16px", background: "var(--surface)" }}>
              <dl style={{ margin: "0" }}>
                <dt style={{ color: "var(--muted)" }}>Javornický potok</dt>
                <dd style={{ margin: "2px 0 0", fontSize: "32px", fontWeight: "500" }}>bez povodně</dd>
                <dd style={{ margin: "0" }}>průtok 0,8 m³ za sekundu, první stupeň je od 4 m³</dd>
              </dl>
            </div>
            {' '}
            <div style={{ padding: "24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "inset 0 0 0 2px var(--accent)" }}>
              <dl style={{ margin: "0" }}>
                <dt style={{ color: "var(--muted)" }}>Vodovod</dt>
                <dd style={{ margin: "2px 0 0", fontSize: "32px", fontWeight: "500" }}>čt 5. 11. vypnuto</dd>
                <dd style={{ margin: "0" }}>{"od 8 do 14 hodin v ulicích Hlavní a K Javorníku, cisterna stojí na návsi"}</dd>
              </dl>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="cisla14" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
          <h2 id="cisla14" className="sr">{"Rybníky v číslech"}</h2>
          {' '}
          <dl style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt>{"rybníky v katastru"}</dt>
              <dd style={{ margin: "0", fontSize: "48px", fontWeight: "500", fontVariantNumeric: "tabular-nums" }}>3</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt>hektarů vodní plochy</dt>
              <dd style={{ margin: "0", fontSize: "48px", fontWeight: "500", fontVariantNumeric: "tabular-nums" }}>42</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt>rok, kdy postavili hráz</dt>
              <dd style={{ margin: "0", fontSize: "48px", fontWeight: "500", fontVariantNumeric: "tabular-nums" }}>1584</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt>rybářských povolenek letos</dt>
              <dd style={{ margin: "0", fontSize: "48px", fontWeight: "500", fontVariantNumeric: "tabular-nums" }}>180</dd>
            </div>
          </dl>
        </section>
        {' '}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <section aria-labelledby="zpravy14" style={{ flex: "2 1 520px", minWidth: "0" }}>
            <h2 id="zpravy14" style={{ margin: "0 0 12px", fontSize: "32px" }}>Zprávy</h2>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>29. října</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/aktuality/hraz-mlynskeho-rybnika-bez-zavad" style={{ color: "var(--ink)" }}>Hráz Mlýnského rybníka prošla kontrolou bez závad</a>
              </h3>
              <p style={{ margin: "0" }}>{"Technik z povodí doporučil jen vyčistit bezpečnostní přeliv."}</p>
            </article>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>27. října</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/aktuality/bioodpad-naposledy-20-listopadu" style={{ color: "var(--ink)" }}>Bioodpad se naposledy vyveze 20. listopadu</a>
              </h3>
              <p style={{ margin: "0" }}>{"Hnědé nádoby pak zůstanou u domů do března."}</p>
            </article>
          </section>
          {' '}
          <aside aria-labelledby="vylov14" className="deep" style={{ flex: "1 1 300px", minWidth: "0", padding: "28px", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", alignSelf: "flex-start" }}>
            <p style={{ margin: "0", fontSize: "15px", opacity: "0.85" }}>sobota 14. listopadu od 9 hodin</p>
            {' '}
            <h2 id="vylov14" style={{ margin: "6px 0 10px", fontSize: "30px" }}>Výlov Mlýnského rybníka</h2>
            {' '}
            <p style={{ margin: "0" }}>
              {"Prodej kaprů a amurů přímo z kádí, rybí polévka od hasičů. Parkujte u pily, hráz bude pro auta zavřená."}
            </p>
            {' '}
            <svg viewBox="0 0 240 24" aria-hidden="true" style={{ display: "block", width: "100%", height: "24px", marginTop: "16px" }}>
              <path d="M0 12 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" style={{ fill: "none", stroke: "var(--wave)" }} strokeWidth="3"></path>
            </svg>
          </aside>
        </div>
      </main>
      <Paticka />
    </>
  )
}

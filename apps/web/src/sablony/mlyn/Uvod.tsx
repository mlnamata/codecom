/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S13-Mlyn.html. */
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
        <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 48px", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 640px", minWidth: "0" }}>
              <h1 style={{ margin: "0", fontFamily: "var(--font-barlow-condensed), system-ui, sans-serif", fontWeight: "600", fontSize: "clamp(56px, 9vw, 132px)", lineHeight: "0.92", letterSpacing: "-0.01em" }}>{"Pila, mlýn a 140 míst k práci"}</h1>
              {' '}
              <p style={{ margin: "20px 0 0", maxWidth: "52ch", fontSize: "19px", color: "var(--muted)" }}>
                {"V Javoří Lhotě se pracuje. Pila Na Rovném, Pivovar Javorník a obecní služby hledají lidi a za pilou prodáváme tři parcely pro dílny."}
              </p>
              {' '}
              <p style={{ margin: "24px 0 0", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a href="#prace13" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 22px", borderRadius: "4px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "600" }}>Volná místa</a>
                <a href="#parcely13" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 22px", borderRadius: "4px", color: "var(--ink)", textDecoration: "none", fontWeight: "600", boxShadow: "inset 0 0 0 2px var(--ink)" }}>Parcely Za pilou</a>
              </p>
            </div>
            {' '}
            <svg viewBox="0 0 200 200" role="img" aria-label="Razítko: Průmyslová zóna Na Rovném, stavět se dá od roku 2027" style={{ flex: "0 0 auto", width: "clamp(150px, 16vw, 200px)", height: "auto" }}>
              <defs>
                <path id="kruh13" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0"></path>
              </defs>
              <circle cx="100" cy="100" r="96" style={{ fill: "var(--accent)" }}></circle>
              <circle cx="100" cy="100" r="54" style={{ fill: "none", stroke: "var(--on-accent)" }} strokeWidth="1.5"></circle>
              <text style={{ fill: "var(--on-accent)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "17px", letterSpacing: "0.06em" }}>
                <textPath href="#kruh13">Průmyslová zóna Na Rovném, stavět od 2027</textPath>
              </text>
              <text x="100" y="96" textAnchor="middle" style={{ fill: "var(--on-accent)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "40px" }}>4,6</text>
              <text x="100" y="122" textAnchor="middle" style={{ fill: "var(--on-accent)", fontFamily: "var(--font-barlow), sans-serif", fontWeight: "500", fontSize: "15px" }}>hektaru</text>
            </svg>
          </div>
          {' '}
          <dl style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px) 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "0" }}>
            <div style={{ padding: "16px 20px 0 0", borderTop: "2px solid var(--ink)" }}>
              <dt style={{ color: "var(--muted)" }}>{"firem v obci"}</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "48px", fontVariantNumeric: "tabular-nums" }}>31</dd>
            </div>
            <div style={{ padding: "16px 20px 0 0", borderTop: "2px solid var(--ink)" }}>
              <dt style={{ color: "var(--muted)" }}>pracovních míst</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "48px", fontVariantNumeric: "tabular-nums" }}>140</dd>
            </div>
            <div style={{ padding: "16px 20px 0 0", borderTop: "2px solid var(--ink)" }}>
              <dt style={{ color: "var(--muted)" }}>volných pozic teď</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "48px", fontVariantNumeric: "tabular-nums", color: "var(--link)" }}>4</dd>
            </div>
            <div style={{ padding: "16px 20px 0 0", borderTop: "2px solid var(--ink)" }}>
              <dt style={{ color: "var(--muted)" }}>kilometrů do Klatov</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "48px", fontVariantNumeric: "tabular-nums" }}>26</dd>
            </div>
          </dl>
        </section>
        {' '}
        {foto ? <Foto sablona="mlyn" styl={{ width: "100%", height: "clamp(240px, 30vw, 420px)" }} /> : null}
        {' '}
        <section id="prace13" aria-labelledby="prace13-t" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px)" }}>
            <h2 id="prace13-t" style={{ margin: "0 0 20px", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "44px" }}>{"Práce v obci"}</h2>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--line)" }}>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/obecni-urad" style={{ flex: "2 1 280px", color: "var(--ink)", fontWeight: "600", fontSize: "19px" }}>Řidič vysokozdvižného vozíku</a>
                <span style={{ flex: "1 1 180px" }}>Pila Na Rovném</span>
                <span style={{ flex: "1 1 160px", color: "var(--muted)" }}>plný úvazek, směny</span>
                <span style={{ flex: "0 0 auto", padding: "4px 10px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", fontSize: "15px" }}>do 20. 11.</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/obecni-urad" style={{ flex: "2 1 280px", color: "var(--ink)", fontWeight: "600", fontSize: "19px" }}>Kuchařka nebo kuchař ve školní jídelně</a>
                <span style={{ flex: "1 1 180px" }}>{"ZŠ a MŠ Javoří Lhota"}</span>
                <span style={{ flex: "1 1 160px", color: "var(--muted)" }}>úvazek 0,75, od ledna</span>
                <span style={{ flex: "0 0 auto", padding: "4px 10px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", fontSize: "15px" }}>do 30. 11.</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/obecni-urad" style={{ flex: "2 1 280px", color: "var(--ink)", fontWeight: "600", fontSize: "19px" }}>Pracovník údržby obce na zimu</a>
                <span style={{ flex: "1 1 180px" }}>Obec Javoří Lhota</span>
                <span style={{ flex: "1 1 160px", color: "var(--muted)" }}>prosinec až březen, řidičák C</span>
                <span style={{ flex: "0 0 auto", padding: "4px 10px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", fontSize: "15px" }}>do 16. 11.</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 24px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/obecni-urad" style={{ flex: "2 1 280px", color: "var(--ink)", fontWeight: "600", fontSize: "19px" }}>Pomocný sládek</a>
                <span style={{ flex: "1 1 180px" }}>Pivovar Javorník</span>
                <span style={{ flex: "1 1 160px", color: "var(--muted)" }}>plný úvazek, zaučíme</span>
                <span style={{ flex: "0 0 auto", padding: "4px 10px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", fontSize: "15px" }}>průběžně</span>
              </li>
            </ul>
            {' '}
            <p style={{ margin: "16px 0 0" }}>
              {"Nabízíte práci v obci? "}
              <a href="/obecni-urad" style={{ color: "var(--link)", fontWeight: "600" }}>Pošlete nám inzerát</a>
              , zveřejníme ho zdarma.
            </p>
          </div>
        </section>
        {' '}
        <section id="parcely13" aria-labelledby="parcely13-t" style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <div style={{ flex: "1 1 340px", minWidth: "0" }}>
            <h2 id="parcely13-t" style={{ margin: "0 0 12px", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "44px" }}>Parcely Za pilou</h2>
            {' '}
            <p style={{ margin: "0 0 20px", maxWidth: "46ch" }}>
              {"Tři parcely pro dílny a sklady. Sítě budou hotové do června 2027, cena 450 Kč za metr čtvereční. Přednost mají firmy, které zaměstnají lidi z obce."}
            </p>
            {' '}
            <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 16px" }}>
              <dt style={{ fontWeight: "600" }}>P1</dt>
              <dd style={{ margin: "0" }}>1,8 ha, volná</dd>
              <dt style={{ fontWeight: "600" }}>P2</dt>
              <dd style={{ margin: "0" }}>1,5 ha, rezervovaná do 31. 12.</dd>
              <dt style={{ fontWeight: "600" }}>P3</dt>
              <dd style={{ margin: "0" }}>1,3 ha, volná</dd>
            </dl>
            {' '}
            <p style={{ margin: "20px 0 0" }}>
              <a href="/obecni-urad" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Podmínky prodeje a kontakt na místostarostu"}</a>
            </p>
          </div>
          {' '}
          <svg viewBox="0 0 600 380" role="img" aria-label="Plánek parcel Za pilou: P1 a P3 volné, P2 rezervovaná, vedle pila a potok" style={{ flex: "1.4 1 420px", minWidth: "0", width: "100%", height: "auto", borderRadius: "8px", background: "var(--surface)" }}>
            <defs>
              <pattern id="srafa13" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="10" height="10" style={{ fill: "var(--bg)" }}></rect>
                <path d="M0 0 V10" style={{ stroke: "var(--accent)" }} strokeWidth="3"></path>
              </pattern>
            </defs>
            <path d="M0 330 C120 300 220 360 340 320 S520 290 600 310 V380 H0z" style={{ fill: "var(--accent)" }} opacity="0.25"></path>
            <rect x="0" y="150" width="600" height="28" style={{ fill: "var(--bg)" }}></rect>
            <path d="M0 164 H600" style={{ stroke: "var(--line)" }} strokeWidth="2" strokeDasharray="14 10"></path>
            <rect x="30" y="30" width="180" height="104" rx="2" style={{ fill: "var(--muted)" }} opacity="0.5"></rect>
            <text x="120" y="88" textAnchor="middle" style={{ fill: "var(--ink)", fontFamily: "var(--font-barlow), sans-serif", fontWeight: "600", fontSize: "18px" }}>Pila</text>
            <rect x="230" y="30" width="160" height="104" rx="2" style={{ fill: "var(--primary)" }}></rect>
            <text x="310" y="78" textAnchor="middle" style={{ fill: "var(--on-primary)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "30px" }}>P1</text>
            <text x="310" y="104" textAnchor="middle" style={{ fill: "var(--on-primary)", fontFamily: "var(--font-barlow), sans-serif", fontSize: "15px" }}>1,8 ha, volná</text>
            <rect x="410" y="30" width="160" height="104" rx="2" style={{ fill: "url(#srafa13)", stroke: "var(--ink)" }} strokeWidth="1.5"></rect>
            <text x="490" y="78" textAnchor="middle" style={{ fill: "var(--ink)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "30px" }}>P2</text>
            <rect x="436" y="88" width="108" height="24" rx="2" style={{ fill: "var(--bg)" }}></rect>
            <text x="490" y="105" textAnchor="middle" style={{ fill: "var(--ink)", fontFamily: "var(--font-barlow), sans-serif", fontSize: "15px" }}>rezervovaná</text>
            <rect x="230" y="194" width="200" height="100" rx="2" style={{ fill: "var(--primary)" }}></rect>
            <text x="330" y="238" textAnchor="middle" style={{ fill: "var(--on-primary)", fontFamily: "var(--font-barlow-condensed), sans-serif", fontWeight: "600", fontSize: "30px" }}>P3</text>
            <text x="330" y="264" textAnchor="middle" style={{ fill: "var(--on-primary)", fontFamily: "var(--font-barlow), sans-serif", fontSize: "15px" }}>1,3 ha, volná</text>
            <text x="40" y="360" style={{ fill: "var(--ink)", fontFamily: "var(--font-barlow), sans-serif", fontSize: "15px" }}>Javornický potok</text>
            <text x="560" y="190" textAnchor="end" style={{ fill: "var(--muted)", fontFamily: "var(--font-barlow), sans-serif", fontSize: "14px" }}>silnice na Hájek</text>
          </svg>
        </section>
      </main>
      <Paticka />
    </>
  )
}

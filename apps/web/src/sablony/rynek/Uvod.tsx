/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S10-Rynek.html. */
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        {/* Velká fotka návsi vládne úvodu, karty leží přes její spodní okraj jako v šabloně Sirius. Text nikdy neleží přímo na fotce. */}
        <div className="rn-foto">
          <FotoDlazdice soubor="sablona-10-rynek.webp" alt={POPISY_FOTEK.rynek ?? ""} styl={{ width: "100%", height: "clamp(300px, 48vw, 600px)" }} />
        </div>
        {' '}
        <section className="rn-pres" style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
          <div style={{ flex: "3 1 520px", minWidth: "0", padding: "clamp(24px, 4vw, 48px)", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 0 0 1px var(--line)" }}>
            <h1 style={{ margin: "0", fontFamily: "var(--font-vollkorn), Georgia, serif", fontWeight: "500", fontSize: "clamp(38px, 4.6vw, 64px)", lineHeight: "1.05", letterSpacing: "-0.01em" }}>{"Roubená náves a úřad, který na ní sídlí"}</h1>
            {' '}
            <p style={{ margin: "20px 0 0", maxWidth: "52ch", fontSize: "19px", lineHeight: "1.5", color: "var(--muted)" }}>
              {"Javoří Lhota je vesnická památková zóna od roku 1995. Na návsi stojí 23 roubenek, kostel svatého Václava a lípa vysazená v roce 1726."}
            </p>
            {' '}
            <p style={{ margin: "28px 0 0", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="/sluzby" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 20px", borderRadius: "8px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "600" }}>Potřebuji vyřídit</a>
              <a href="/obecni-urad" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 20px", borderRadius: "8px", color: "var(--ink)", textDecoration: "none", fontWeight: "600", boxShadow: "inset 0 0 0 1px var(--line)", background: "var(--bg)" }}>Procházka po návsi</a>
            </p>
          </div>
          {' '}
          <div className="on-primary" style={{ flex: "1 1 240px", minWidth: "0", padding: "clamp(24px, 3vw, 32px)", borderRadius: "16px", background: "var(--primary)", color: "var(--on-primary)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-vollkorn), Georgia, serif", fontSize: "64px", lineHeight: "1", fontVariantNumeric: "tabular-nums" }}>23</span>
            <span style={{ fontSize: "19px" }}>{"roubenek v památkové zóně"}</span>
            <a className="hit" href="/sluzby/nahlasit-zavadu" style={{ alignSelf: "flex-start", marginTop: "auto", color: "var(--on-primary)", fontWeight: "600" }}>Co smím opravit sám</a>
          </div>
        </section>
        {' '}
        <section aria-labelledby="sluzby10" style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 56px" }}>
          <h2 id="sluzby10" className="sr">Nejčastější služby</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "1px", background: "var(--line)", border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden" }}>
            <a href="/obecni-urad" style={{ padding: "24px", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                <path d="M3 21h18M5 21V10l7-5 7 5v11"></path>
                <path d="M9 21v-6h6v6"></path>
              </svg>
              <span style={{ fontWeight: "600" }}>{"Stavby v památkové zóně"}</span>
              <span style={{ color: "var(--muted)", fontSize: "15px" }}>okna, střechy, ploty, fasády</span>
            </a>
            {' '}
            <a href="/zivotni-situace/stehuji-se-do-obce" style={{ padding: "24px", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <circle cx="9" cy="12" r="2.5"></circle>
                <path d="M14 10h4M14 14h3"></path>
              </svg>
              <span style={{ fontWeight: "600" }}>{"Doklady a pobyt"}</span>
              <span style={{ color: "var(--muted)", fontSize: "15px" }}>{"přihlášení k pobytu, Czech POINT"}</span>
            </a>
            {' '}
            <a href="/sluzby/platby" style={{ padding: "24px", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span style={{ fontWeight: "600" }}>Poplatky</span>
              <span style={{ color: "var(--muted)", fontSize: "15px" }}>odpad 900 Kč, pes 200 Kč</span>
            </a>
            {' '}
            <a href="/zivotni-situace/zemrel-nam-blizky-clovek" style={{ padding: "24px", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                <path d="M12 3v18M7 8h10"></path>
              </svg>
              <span style={{ fontWeight: "600" }}>Hřbitov</span>
              <span style={{ color: "var(--muted)", fontSize: "15px" }}>nájem hrobového místa</span>
            </a>
          </div>
        </section>
        {' '}
        <section style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "48px" }}>
            <div style={{ flex: "2 1 520px", minWidth: "0" }}>
              <h2 style={{ margin: "0 0 24px", fontFamily: "var(--font-vollkorn), Georgia, serif", fontWeight: "500", fontSize: "40px" }}>{"Z radnice"}</h2>
              {' '}
              <article style={{ padding: "20px 0", borderTop: "1px solid var(--line)" }}>
                <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>24. října</p>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-vollkorn), Georgia, serif", fontWeight: "500", fontSize: "26px", lineHeight: "1.25" }}>
                  <a href="/aktuality/socha-svateho-jana-zpatky-na-sloupu" style={{ color: "var(--ink)", textDecoration: "none" }}>Restaurátoři dokončili opravu sloupu se sochou svatého Jana</a>
                </h3>
                <p style={{ margin: "0", maxWidth: "60ch" }}>Oprava stála 380 tisíc korun, 70 procent zaplatilo ministerstvo kultury.</p>
              </article>
              {' '}
              <article style={{ padding: "20px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>20. října</p>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-vollkorn), Georgia, serif", fontWeight: "500", fontSize: "26px", lineHeight: "1.25" }}>
                  <a href="/akce" style={{ color: "var(--ink)", textDecoration: "none" }}>Adventní trh na návsi: přihlášky stánků do 15. listopadu</a>
                </h3>
                <p style={{ margin: "0", maxWidth: "60ch" }}>{"Trh bude v sobotu 29. listopadu od 14 hodin."}</p>
              </article>
            </div>
            {' '}
            <div style={{ flex: "1 1 300px", minWidth: "0" }}>
              <h2 style={{ margin: "0 0 24px", fontFamily: "var(--font-vollkorn), Georgia, serif", fontWeight: "500", fontSize: "40px" }}>Kultura</h2>
              {' '}
              <FotoDlazdice soubor="sablona-01-naves.webp" alt={POPISY_FOTEK.naves ?? ""} styl={{ aspectRatio: "3 / 2", borderRadius: "16px", marginBottom: "24px" }} />
              {' '}
              <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "72px 1fr", gap: "16px 12px", fontVariantNumeric: "lining-nums tabular-nums" }}>
                <dt style={{ fontFamily: "var(--font-vollkorn), Georgia, serif", fontSize: "22px", color: "var(--link)" }}>8. 11.</dt>
                <dd style={{ margin: "0" }}>Prohlídka kostela svatého Václava, 14 hodin</dd>
                <dt style={{ fontFamily: "var(--font-vollkorn), Georgia, serif", fontSize: "22px", color: "var(--link)" }}>15. 11.</dt>
                <dd style={{ margin: "0" }}>{"Varhanní koncert v kostele"}</dd>
                <dt style={{ fontFamily: "var(--font-vollkorn), Georgia, serif", fontSize: "22px", color: "var(--link)" }}>29. 11.</dt>
                <dd style={{ margin: "0" }}>{"Adventní trh a rozsvícení stromu"}</dd>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}

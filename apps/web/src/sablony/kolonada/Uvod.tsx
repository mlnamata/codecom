/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S12-Kolonada.html. */
import type { ReactNode } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode }) {
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <section style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 120px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
            <div style={{ flex: "1 1 460px", minWidth: "0" }}>
              <h1 style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontWeight: "500", fontSize: "clamp(48px, 6vw, 84px)", lineHeight: "1", letterSpacing: "-0.01em" }}>{"Javoří Lhota, obec u Anenského pramene"}</h1>
              {' '}
              <figure style={{ margin: "32px 0 0", padding: "0 0 0 24px", borderLeft: "2px solid var(--primary)" }}>
                <blockquote style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "26px", lineHeight: "1.35", maxWidth: "34ch" }}>
                  {"Letos jsme opravili sloup se sochou svatého Jana a hřiště za školou. V listopadu rozhodujeme o rozpočtu na příští rok, přijďte to probrat s námi"}
                </blockquote>
                {' '}
                <figcaption style={{ marginTop: "14px", color: "var(--muted)" }}>Marie Šťastná, starostka</figcaption>
              </figure>
              {' '}
              <p style={{ margin: "28px 0 0", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <a href="/uredni-deska/pozvanka-zasedani-9-11" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 22px", borderRadius: "999px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "600" }}>Zasedání 9. listopadu</a>
                <a href="/obecni-urad" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 22px", borderRadius: "999px", color: "var(--ink)", textDecoration: "none", fontWeight: "600", boxShadow: "inset 0 0 0 1px var(--ink)" }}>Napsat starostce</a>
              </p>
            </div>
            {' '}
            <div style={{ flex: "0 1 400px", minWidth: "0", margin: "0 auto" }}>
              <svg viewBox="0 0 400 480" role="img" aria-label="Ilustrace: starostka v oblouku kolonády u pramene" style={{ width: "100%", height: "auto", display: "block" }}>
                <path d="M20 480 V200 a180 180 0 0 1 360 0 V480z" style={{ fill: "var(--bg)" }}></path>
                <path d="M44 480 V204 a156 156 0 0 1 312 0 V480z" style={{ fill: "var(--primary)" }} opacity="0.14"></path>
                <circle cx="200" cy="210" r="58" style={{ fill: "var(--primary)" }} opacity="0.85"></circle>
                <path d="M146 214 a54 60 0 0 1 108 0 c0 -50 -22 -78 -54 -78 s-54 28 -54 78z" style={{ fill: "var(--ink)" }} opacity="0.85"></path>
                <path d="M84 480 c0 -96 52 -150 116 -150 s116 54 116 150z" style={{ fill: "var(--primary)" }}></path>
                <path d="M176 334 l24 40 l24 -40" style={{ fill: "none", stroke: "var(--bg)" }} strokeWidth="4" strokeLinejoin="round"></path>
                <g style={{ stroke: "var(--accent)" }} strokeWidth="2" fill="none">
                  <path d="M20 200 a180 180 0 0 1 360 0"></path>
                  <path d="M20 480 V200 M380 480 V200"></path>
                </g>
              </svg>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="cisla12" className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
          <h2 id="cisla12" className="sr">{"Obec v číslech"}</h2>
          {' '}
          <dl style={{ maxWidth: "1240px", margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px) 140px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt style={{ opacity: "0.85" }}>obyvatel ve čtyřech částech</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "56px", lineHeight: "1.1", fontVariantNumeric: "lining-nums" }}>684</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt style={{ opacity: "0.85" }}>{"metrů má Javorník s rozhlednou"}</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "56px", lineHeight: "1.1", fontVariantNumeric: "lining-nums" }}>1 012</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt style={{ opacity: "0.85" }}>let je lípě na návsi</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "56px", lineHeight: "1.1", fontVariantNumeric: "lining-nums" }}>300</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}>
              <dt style={{ opacity: "0.85" }}>{"stupňů má voda v pramenu"}</dt>
              <dd style={{ margin: "0", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "56px", lineHeight: "1.1", fontVariantNumeric: "lining-nums" }}>7,5</dd>
            </div>
          </dl>
        </section>
        {' '}
        <section aria-labelledby="zpravy12" style={{ maxWidth: "1240px", margin: "-104px auto 0", padding: "0 clamp(16px, 4vw, 32px)", position: "relative" }}>
          <h2 id="zpravy12" className="sr">Zprávy</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
            <article style={{ padding: "28px", borderRadius: "4px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08), inset 0 0 0 1px var(--line)" }}>
              <p style={{ margin: "0 0 8px", color: "var(--muted)", fontSize: "15px" }}>24. října</p>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "28px", lineHeight: "1.15" }}>
                <a href="/aktuality/socha-svateho-jana-zpatky-na-sloupu" style={{ color: "var(--ink)", textDecoration: "none" }}>Socha svatého Jana je zpátky na sloupu</a>
              </h3>
              <p style={{ margin: "0" }}>Restaurování stálo 380 tisíc korun, většinu zaplatilo ministerstvo kultury.</p>
            </article>
            {' '}
            <article style={{ padding: "28px", borderRadius: "4px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08), inset 0 0 0 1px var(--line)" }}>
              <p style={{ margin: "0 0 8px", color: "var(--muted)", fontSize: "15px" }}>12. října</p>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "28px", lineHeight: "1.15" }}>
                <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Rozbor vody z Anenského pramene: vhodná k pití"}</a>
              </h3>
              <p style={{ margin: "0" }}>{"Další rozbor bude v lednu. Výsledky visí u altánu a na webu."}</p>
            </article>
            {' '}
            <article style={{ padding: "28px", borderRadius: "4px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08), inset 0 0 0 1px var(--line)" }}>
              <p style={{ margin: "0 0 8px", color: "var(--muted)", fontSize: "15px" }}>Úřední deska</p>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "28px", lineHeight: "1.15" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ color: "var(--ink)", textDecoration: "none" }}>Návrh rozpočtu na rok 2027</a>
              </h3>
              <p style={{ margin: "0" }}>Visí do 11. listopadu, připomínky přijímá úřad.</p>
            </article>
          </div>
        </section>
        {' '}
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 80px", display: "flex", flexWrap: "wrap", gap: "48px" }}>
          <section aria-labelledby="program12" style={{ flex: "3 1 520px", minWidth: "0" }}>
            <h2 id="program12" style={{ margin: "0 0 16px", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "44px", lineHeight: "1.1" }}>Program na listopad</h2>
            {' '}
            <ol style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "26px", color: "var(--link)", fontVariantNumeric: "lining-nums" }}>7. 11.</span>
                <span>
                  <a href="/akce#lampionovy-pruvod" style={{ color: "var(--ink)", fontWeight: "600" }}>Lampionový průvod</a>
                  <span style={{ display: "block", color: "var(--muted)" }}>od hasičárny ke kapli svaté Anny, 17 hodin</span>
                </span>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "26px", color: "var(--link)", fontVariantNumeric: "lining-nums" }}>15. 11.</span>
                <span>
                  <a href="/akce#varhanni-koncert" style={{ color: "var(--ink)", fontWeight: "600" }}>Varhanní koncert</a>
                  <span style={{ display: "block", color: "var(--muted)" }}>kostel svatého Václava, 18 hodin, vstupné dobrovolné</span>
                </span>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "26px", color: "var(--link)", fontVariantNumeric: "lining-nums" }}>28. 11.</span>
                <span>
                  <a href="/akce#rozsviceni-vanocniho-stromu" style={{ color: "var(--ink)", fontWeight: "600" }}>Rozsvícení vánočního stromu</a>
                  <span style={{ display: "block", color: "var(--muted)" }}>{"náves u lípy, 17 hodin, zpívají děti ze školy"}</span>
                </span>
              </li>
            </ol>
          </section>
          {' '}
          <aside aria-labelledby="pramen12" style={{ flex: "2 1 320px", minWidth: "0", padding: "28px", borderRadius: "200px 200px 4px 4px", background: "var(--surface)", textAlign: "center" }}>
            <svg viewBox="0 0 120 90" aria-hidden="true" style={{ width: "120px", height: "90px", margin: "12px auto 0", display: "block" }}>
              <path d="M10 88 V40 a50 30 0 0 1 100 0 V88" style={{ fill: "none", stroke: "var(--primary)" }} strokeWidth="3"></path>
              <path d="M30 88 V48 M60 88 V44 M90 88 V48" style={{ stroke: "var(--primary)" }} strokeWidth="3"></path>
              <path d="M56 70 q4 -10 8 0 q-4 6 -8 0z" style={{ fill: "var(--primary)" }}></path>
            </svg>
            {' '}
            <h2 id="pramen12" style={{ margin: "12px 0 8px", fontFamily: "var(--font-cormorant-garamond), Georgia, serif", fontSize: "32px" }}>Anenský pramen</h2>
            {' '}
            <p style={{ margin: "0 auto", maxWidth: "30ch" }}>{"Altán pod kaplí svaté Anny, 15 minut pěšky z návsi. Voda teče celý rok."}</p>
            {' '}
            <p style={{ margin: "12px 0 0" }}>
              <a href="/obecni-urad" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Rozbory vody a cesta k pramenu"}</a>
            </p>
          </aside>
        </div>
      </main>
      <Paticka />
    </>
  )
}

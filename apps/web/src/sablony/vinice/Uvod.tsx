/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S08-Vinice.html. */
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
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px) 0", display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
          <div style={{ flex: "1 1 440px", minWidth: "0" }}>
            <h1 style={{ margin: "0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "400", fontSize: "clamp(40px, 4.6vw, 64px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{"Sýr z farmy U Lípy, pivo z Javorníku a med z Podjavoří"}</h1>
            {' '}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "40px", alignItems: "center" }}>
              <svg viewBox="0 0 120 90" aria-hidden="true" style={{ width: "120px", height: "90px", borderRadius: "12px", background: "var(--surface)" }}>
                <path d="M0 70 C30 60 60 66 120 58 V90 H0z" style={{ fill: "var(--row)" }}></path>
                <rect x="30" y="34" width="56" height="30" rx="4" style={{ fill: "var(--bg)" }}></rect>
                <path d="M26 36 l32 -18 l32 18z" style={{ fill: "var(--primary)" }}></path>
              </svg>
              {' '}
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: "600" }}>Sobotní trh</p>
                <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>náves, každou sobotu 8 až 12</p>
              </div>
              {' '}
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: "600" }}>Napište nám</p>
                <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>[E-MAIL]</p>
              </div>
            </div>
          </div>
          {' '}
          <div style={{ flex: "1 1 440px", minWidth: "0", position: "relative", minHeight: "440px" }}>
            <svg viewBox="0 0 300 360" role="img" aria-label="Pastviny farmy U Lípy" style={{ position: "absolute", left: "0", top: "0", width: "52%", height: "auto", borderRadius: "16px", background: "var(--surface)" }}>
              <path d="M0 220 C80 190 160 210 300 180 V360 H0z" style={{ fill: "var(--row)" }}></path>
              <path d="M0 260 C100 240 200 252 300 236" style={{ stroke: "var(--row2)" }} strokeWidth="10" fill="none"></path>
              <path d="M0 300 C100 284 200 292 300 280" style={{ stroke: "var(--row2)" }} strokeWidth="10" fill="none"></path>
              <ellipse cx="160" cy="200" rx="36" ry="20" style={{ fill: "var(--bg)" }}></ellipse>
              <circle cx="196" cy="190" r="12" style={{ fill: "var(--bg)" }}></circle>
              <rect x="140" y="214" width="6" height="18" style={{ fill: "var(--ink)" }}></rect>
              <rect x="174" y="214" width="6" height="18" style={{ fill: "var(--ink)" }}></rect>
              <circle cx="240" cy="70" r="26" style={{ fill: "var(--row2)" }}></circle>
            </svg>
            {' '}
            <svg viewBox="0 0 360 300" role="img" aria-label="Pivovar Javorník a chmelnice" style={{ position: "absolute", right: "0", bottom: "0", width: "66%", height: "auto", borderRadius: "16px", background: "var(--deep)" }}>
              <g style={{ stroke: "var(--row)" }} strokeWidth="3">
                <path d="M40 300 V120 M90 300 V110 M140 300 V120 M190 300 V110 M240 300 V120 M290 300 V110 M340 300 V120"></path>
              </g>
              <g style={{ fill: "var(--row2)" }}>
                <circle cx="40" cy="160" r="12"></circle>
                <circle cx="90" cy="190" r="12"></circle>
                <circle cx="140" cy="150" r="12"></circle>
                <circle cx="190" cy="200" r="12"></circle>
                <circle cx="240" cy="170" r="12"></circle>
                <circle cx="290" cy="210" r="12"></circle>
                <circle cx="340" cy="180" r="12"></circle>
              </g>
              <path d="M0 110 H360" style={{ stroke: "var(--row2)" }} strokeWidth="2"></path>
            </svg>
            {' '}
            <a href="/obecni-urad" style={{ position: "absolute", right: "16px", bottom: "16px", display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "8px", background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", fontWeight: "600" }}>Mapa výrobců</a>
          </div>
        </section>
        {' '}
        {foto ? (
          <Foto sablona="vinice" styl={{ display: "block", width: "100%", maxWidth: "1240px", margin: "24px auto 0", height: "auto" }} />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 1240 180" preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", maxWidth: "1240px", margin: "24px auto 0", height: "auto" }}>
            <text x="620" y="150" textAnchor="middle" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "400", fontSize: "190px", fill: "none", stroke: "var(--line)", strokeWidth: "2" }}>{"z naší obce"}</text>
          </svg>
        )}
        {' '}
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "32px clamp(16px, 4vw, 32px) 56px" }}>
          <p style={{ margin: "0 auto", maxWidth: "30ch", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "400", fontSize: "clamp(26px, 3vw, 38px)", lineHeight: "1.3" }}>
            {"Obec půjčuje stánky "}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: "-4px", stroke: "var(--primary)" }}>
              <path d="M3 10h18l-2-5H5z"></path>
              <path d="M5 10v9h14v-9"></path>
            </svg>
            {" zdarma, platí elektřinu na trhu "}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: "-4px", stroke: "var(--primary)" }}>
              <path d="M13 2L4 14h7l-1 8 9-12h-7z"></path>
            </svg>
            {" a každý měsíc píše o jednom výrobci do zpravodaje "}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: "-4px", stroke: "var(--primary)" }}>
              <rect x="4" y="3" width="16" height="18" rx="2"></rect>
              <path d="M8 8h8M8 12h8M8 16h5"></path>
            </svg>
          </p>
        </section>
        {' '}
        <section aria-labelledby="vyrobci" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px) 72px" }}>
          <h2 id="vyrobci" className="sr">Místní výrobci</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
            <article style={{ minHeight: "260px", padding: "24px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <h3 style={{ margin: "0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "24px" }}>{"Farma U Lípy"}</h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>{"kozí sýry a tvaroh, prodej ze dvora v pátek od 14 hodin"}</p>
              <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Profil farmy</a>
            </article>
            {' '}
            <svg viewBox="0 0 280 260" role="img" aria-label="Sýry na dřevěném prkénku" style={{ width: "100%", height: "100%", minHeight: "260px", borderRadius: "16px", background: "var(--row2)" }}>
              <rect x="30" y="150" width="220" height="40" rx="8" style={{ fill: "var(--primary)" }}></rect>
              <path d="M60 150 l40 -60 h60 l-20 60z" style={{ fill: "var(--bg)" }}></path>
              <circle cx="190" cy="132" r="22" style={{ fill: "var(--bg)" }}></circle>
              <circle cx="110" cy="118" r="5" style={{ fill: "var(--row2)" }}></circle>
              <circle cx="130" cy="132" r="4" style={{ fill: "var(--row2)" }}></circle>
            </svg>
            {' '}
            <article style={{ minHeight: "260px", padding: "24px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <h3 style={{ margin: "0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "24px" }}>Pivovar Javorník</h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>{"světlý ležák a sezonní pivo, výčep otevřený od čtvrtka do neděle"}</p>
              <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Profil pivovaru</a>
            </article>
            {' '}
            <svg viewBox="0 0 280 260" role="img" aria-label="Úly na kraji lesa v Podjavoří" style={{ width: "100%", height: "100%", minHeight: "260px", borderRadius: "16px", background: "var(--deep)" }}>
              <path d="M0 200 C80 180 180 190 280 176 V260 H0z" style={{ fill: "var(--row)" }}></path>
              <g style={{ fill: "var(--row2)" }}>
                <rect x="50" y="150" width="50" height="50" rx="4"></rect>
                <rect x="120" y="140" width="50" height="60" rx="4"></rect>
                <rect x="190" y="152" width="50" height="48" rx="4"></rect>
              </g>
              <g style={{ fill: "var(--deep)" }}>
                <rect x="70" y="176" width="10" height="4"></rect>
                <rect x="140" y="176" width="10" height="4"></rect>
                <rect x="210" y="176" width="10" height="4"></rect>
              </g>
            </svg>
          </div>
        </section>
        {' '}
        <section style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "48px" }}>
            <div style={{ flex: "2 1 480px", minWidth: "0" }}>
              <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "32px" }}>Kde koupit tento týden</h2>
              {' '}
              <dl style={{ margin: "0" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "12px 0" }}>
                  <dt style={{ fontWeight: "600" }}>{"Farma U Lípy"}</dt>
                  <span aria-hidden="true" style={{ flex: "1", borderBottom: "2px dotted var(--line)" }}></span>
                  <dd style={{ margin: "0" }}>pá 14 až 18</dd>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "12px 0" }}>
                  <dt style={{ fontWeight: "600" }}>Pivovar Javorník</dt>
                  <span aria-hidden="true" style={{ flex: "1", borderBottom: "2px dotted var(--line)" }}></span>
                  <dd style={{ margin: "0" }}>čt až ne 15 až 22</dd>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "12px 0" }}>
                  <dt style={{ fontWeight: "600" }}>Pekárna Šťastných</dt>
                  <span aria-hidden="true" style={{ flex: "1", borderBottom: "2px dotted var(--line)" }}></span>
                  <dd style={{ margin: "0" }}>po až so 6 až 11</dd>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "12px 0" }}>
                  <dt style={{ fontWeight: "600" }}>{"Med z Podjavoří"}</dt>
                  <span aria-hidden="true" style={{ flex: "1", borderBottom: "2px dotted var(--line)" }}></span>
                  <dd style={{ margin: "0" }}>na sobotním trhu</dd>
                </div>
              </dl>
            </div>
            {' '}
            <aside aria-labelledby="urad08" style={{ flex: "1 1 280px", minWidth: "0", padding: "24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
              <h2 id="urad08" style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "600" }}>Obecní úřad</h2>
              {' '}
              <p style={{ margin: "0 0 12px" }}>Dnes otevřeno 8 až 17 hodin. Náves 1, [TELEFON].</p>
              {' '}
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/uredni-deska">Úřední deska</a>
                <a className="hit" href="/sluzby/platby">Zaplatit poplatky</a>
                <a className="hit" href="/sluzby/rezervace">Pronájem stánku na trhu</a>
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}

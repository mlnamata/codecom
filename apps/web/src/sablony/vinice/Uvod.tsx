/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S08-Vinice.html. */
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
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
          <div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <FotoDlazdice soubor="sablona-08-vinice.webp" alt="Malý farmářský trh na návsi, dřevěné stánky s kozím sýrem, medem a chlebem." styl={{ aspectRatio: "4 / 3", borderRadius: "16px" }} />
            <a href="/obecni-urad" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 16px", borderRadius: "8px", background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", fontWeight: "600" }}>Mapa výrobců</a>
          </div>
        </section>
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
            <FotoDlazdice soubor="sablona-10-rynek.webp" alt="Řada opravených roubených domů se šindelovými střechami na návsi." styl={{ height: "100%", minHeight: "260px", borderRadius: "16px" }} />
            {' '}
            <article style={{ minHeight: "260px", padding: "24px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <h3 style={{ margin: "0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "24px" }}>Pivovar Javorník</h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>{"světlý ležák a sezonní pivo, výčep otevřený od čtvrtka do neděle"}</p>
              <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Profil pivovaru</a>
            </article>
            {' '}
            <FotoDlazdice soubor="sablona-19-mikroregion.webp" alt="Údolí v podhůří Šumavy s vesničkami spojenými silničkami, podzim." styl={{ height: "100%", minHeight: "260px", borderRadius: "16px" }} />
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

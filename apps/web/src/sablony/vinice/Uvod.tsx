/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S08-Vinice.html. */
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
        {/* Velká fotka trhu vládne úvodu, karta s titulkem leží přes její spodní okraj jako v šabloně Sirius. Text nikdy neleží přímo na fotce. */}
        <div className="vn-foto">
          <FotoDlazdice soubor="sablona-08-vinice.webp" alt={POPISY_FOTEK.vinice ?? ""} styl={{ width: "100%", height: "clamp(300px, 48vw, 600px)" }} />
        </div>
        {' '}
        <section className="vn-pres" style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px) 56px" }}>
          <div style={{ padding: "clamp(24px, 4vw, 48px)", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 0 0 1px var(--line)", display: "flex", flexWrap: "wrap", gap: "32px 64px", alignItems: "flex-end" }}>
            <h1 style={{ flex: "2 1 480px", minWidth: "0", margin: "0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "400", fontSize: "clamp(34px, 4.2vw, 58px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{"Sýr z farmy U Lípy, pivo z Javorníku a med z Podjavoří"}</h1>
            {' '}
            <div style={{ flex: "1 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
              <dl style={{ margin: "0", display: "flex", flexWrap: "wrap", gap: "16px 32px" }}>
                <div>
                  <dt style={{ fontWeight: "600" }}>Sobotní trh</dt>
                  <dd style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "15px" }}>náves, každou sobotu 8 až 12</dd>
                </div>
                <div>
                  <dt style={{ fontWeight: "600" }}>Napište nám</dt>
                  <dd style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: "15px" }}>[E-MAIL]</dd>
                </div>
              </dl>
              {' '}
              <a href="/obecni-urad" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 20px", borderRadius: "8px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "600" }}>Mapa výrobců</a>
            </div>
          </div>
        </section>
        {' '}
        <section>
          <p style={{ maxWidth: "1240px", margin: "0 auto", padding: "16px clamp(16px, 4vw, 32px) 48px", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "400", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: "1.35" }}>
            <span style={{ display: "block", maxWidth: "36ch" }}>{"Obec půjčuje stánky zdarma, platí elektřinu na trhu a každý měsíc píše o jednom výrobci do zpravodaje."}</span>
          </p>
        </section>
        {' '}
        <section aria-labelledby="vyrobci" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px) 72px" }}>
          <h2 id="vyrobci" className="sr">Místní výrobci</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "24px" }}>
            <article style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <FotoDlazdice soubor="sablona-04-lipa.webp" alt={POPISY_FOTEK.lipa ?? ""} styl={{ aspectRatio: "3 / 2", borderRadius: "16px" }} />
              <h3 style={{ margin: "8px 0 0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "26px" }}>{"Farma U Lípy"}</h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>{"kozí sýry a tvaroh, prodej ze dvora v pátek od 14 hodin"}</p>
              <a className="hit" href="/obecni-urad" style={{ alignSelf: "flex-start", fontWeight: "600" }}>Profil farmy</a>
            </article>
            {' '}
            <article style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <FotoDlazdice soubor="sablona-13-mlyn.webp" alt={POPISY_FOTEK.mlyn ?? ""} styl={{ aspectRatio: "3 / 2", borderRadius: "16px" }} />
              <h3 style={{ margin: "8px 0 0", fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "500", fontSize: "26px" }}>Pivovar Javorník</h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>{"světlý ležák a sezonní pivo, výčep otevřený od čtvrtka do neděle"}</p>
              <a className="hit" href="/obecni-urad" style={{ alignSelf: "flex-start", fontWeight: "600" }}>Profil pivovaru</a>
            </article>
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

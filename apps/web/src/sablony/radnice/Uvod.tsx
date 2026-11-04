'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S11-Radnice.html. */

import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Fragment } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  const v = useHodnoty()
  return (
    <>
      {banner}
      <div style={{ background: "var(--surface)", padding: "12px clamp(8px, 2vw, 16px) 0" }}>
        <Hlavicka />
        {' '}
        <section aria-labelledby="ticker" style={{ maxWidth: "1360px", margin: "0 auto", padding: "12px 4px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 20px", fontSize: "15px" }}>
          <h2 id="ticker" style={{ margin: "0", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)" }}></span>
            Právě teď
          </h2>
          {' '}
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
            <li style={{ paddingLeft: "20px", borderLeft: "1px solid var(--line)" }}>10:40 Silnice na Javorník sjízdná, ráno náledí</li>
            <li style={{ paddingLeft: "20px", borderLeft: "1px solid var(--line)" }}>9:15 Plasty se vyvážejí ve středu 4. listopadu</li>
            <li style={{ paddingLeft: "20px", borderLeft: "1px solid var(--line)" }}>8:00 Most přes potok je zavřený do 30. listopadu</li>
          </ul>
        </section>
      </div>
      <main id="obsah" tabIndex={-1} style={{ background: "var(--surface)" }}>
        <section className="deep" aria-labelledby="radnice-titulek" style={{ maxWidth: "1360px", margin: "0 auto", borderRadius: "24px", background: "var(--deep)", color: "var(--on-deep)", padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px) 128px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "32px" }}>
          <div style={{ flex: "1 1 460px", minWidth: "0", padding: "clamp(8px, 2vw, 24px) clamp(4px, 1vw, 8px) 0" }}>
            <h1 id="radnice-titulek" style={{ margin: "0", fontSize: "clamp(40px, 5vw, 64px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}>Co dnes potřebujete vyřídit?</h1>
            {' '}
            <p style={{ margin: "16px 0 28px", fontSize: "19px", maxWidth: "46ch", opacity: "0.9" }}>
              Většinu věcí zvládnete online. Na úřad chodí jen ti, kdo musí podepsat nebo něco převzít.
            </p>
            {' '}
            <div role="group" aria-label="Pro koho zobrazit služby" style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px", padding: "4px", borderRadius: "12px", boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.28)" }}>
              {v.tabs.map((t, i) => (
                <Fragment key={i}>
                  <button type="button" onClick={t.pick} aria-pressed={t.sel} style={{ minHeight: "44px", padding: "0 16px", border: "0", borderRadius: "9px", background: t.bg, color: t.ink, font: "inherit", fontWeight: "500", cursor: "pointer" }}>{t.label}</button>
                </Fragment>
              ))}
            </div>
          </div>
          {' '}
          {/* Fotka stojí vedle textu (na telefonu pod ním), bílý text nikdy neleží na fotografii. */}
          <FotoDlazdice soubor="sablona-11-radnice.webp" alt={POPISY_FOTEK.radnice ?? ""} styl={{ flex: "1 1 380px", minWidth: "0", aspectRatio: "4 / 3", maxHeight: "420px", borderRadius: "16px" }} />
        </section>
        {' '}
        <div style={{ maxWidth: "1296px", margin: "-88px auto 0", padding: "0 clamp(16px, 3vw, 32px)", position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "12px" }}>
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Úřad dnes</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>otevřeno 8 až 17</p>
            <a href="/obecni-urad" className="hit" style={{ marginTop: "8px", color: "var(--link)" }}>Úřední hodiny</a>
          </div>
          {' '}
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Nejbližší svoz</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>plasty ve středu 4. 11.</p>
            <a href="/sluzby#svoz-odpadu" className="hit" style={{ marginTop: "8px", color: "var(--link)" }}>Svozový kalendář</a>
          </div>
          {' '}
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Zastupitelstvo</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>{"pondělí 9. 11. v 18 hodin"}</p>
            <a href="/uredni-deska/pozvanka-zasedani-9-11" className="hit" style={{ marginTop: "8px", color: "var(--link)" }}>Program zasedání</a>
          </div>
        </div>
        {' '}
        <section aria-labelledby="sluzby11" style={{ maxWidth: "1296px", margin: "0 auto", padding: "56px clamp(16px, 3vw, 32px) 0" }}>
          <h2 id="sluzby11" style={{ margin: "0 0 20px", fontSize: "32px" }}>Nejčastější služby</h2>
          {' '}
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "0 32px" }}>
            {v.services.map((s, i) => (
              <Fragment key={i}>
                <li style={{ borderTop: "1px solid var(--line)" }}>
                  <a href={s.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", minHeight: "72px", padding: "12px 0", color: "var(--ink)", textDecoration: "none" }}>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: "600", color: "var(--link)" }}>{s.t}</span>
                      <span style={{ color: "var(--muted)", fontSize: "15px" }}>{s.d}</span>
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", color: "var(--muted)" }}>
                      <path d="M9 6l6 6-6 6"></path>
                    </svg>
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </section>
        {' '}
        <section aria-labelledby="kdo11" style={{ maxWidth: "1296px", margin: "0 auto", padding: "56px clamp(16px, 3vw, 32px) 0" }}>
          <h2 id="kdo11" style={{ margin: "0 0 20px", fontSize: "32px" }}>Kdo vám na úřadě pomůže</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "12px" }}>
            <div className="deep" style={{ padding: "24px", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "20px" }}>Starostka</h3>
              <p style={{ margin: "0" }}>Marie Šťastná</p>
              <p style={{ margin: "0", opacity: "0.85", fontSize: "15px" }}>{"Út a Čt 8 až 12, jindy po domluvě"}</p>
              <a href="/obecni-urad" style={{ marginTop: "auto", paddingTop: "12px", color: "var(--on-deep)" }}>[E-MAIL]</a>
            </div>
            {' '}
            <div className="deep" style={{ padding: "24px", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "20px" }}>{"Poplatky a pokladna"}</h3>
              <p style={{ margin: "0" }}>Jana Malá</p>
              <p style={{ margin: "0", opacity: "0.85", fontSize: "15px" }}>odpad, psi, nájmy, platby kartou</p>
              <a href="/obecni-urad" style={{ marginTop: "auto", paddingTop: "12px", color: "var(--on-deep)" }}>[TELEFON]</a>
            </div>
            {' '}
            <div className="deep" style={{ padding: "24px", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "20px" }}>Evidence obyvatel</h3>
              <p style={{ margin: "0" }}>kancelář č. 2</p>
              <p style={{ margin: "0", opacity: "0.85", fontSize: "15px" }}>pobyt, Czech POINT, ověřování</p>
              <a href="/obecni-urad" style={{ marginTop: "auto", paddingTop: "12px", color: "var(--on-deep)" }}>[E-MAIL]</a>
            </div>
            {' '}
            <div className="deep" style={{ padding: "24px", borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{ margin: "0", fontSize: "20px" }}>{"Stavby a pozemky"}</h3>
              <p style={{ margin: "0" }}>místostarosta Petr Kos</p>
              <p style={{ margin: "0", opacity: "0.85", fontSize: "15px" }}>územní plán, přípojky, zábory</p>
              <a href="/obecni-urad" style={{ marginTop: "auto", paddingTop: "12px", color: "var(--on-deep)" }}>[TELEFON]</a>
            </div>
          </div>
        </section>
        {' '}
        <div style={{ maxWidth: "1296px", margin: "0 auto", padding: "56px clamp(16px, 3vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <section aria-labelledby="zpravy11" style={{ flex: "2 1 520px", minWidth: "0" }}>
            <h2 id="zpravy11" style={{ margin: "0 0 12px", fontSize: "32px" }}>{"Zprávy z úřadu"}</h2>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>30. října</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ display: "inline-block", paddingBlock: "2px", color: "var(--ink)" }}>Rozpočet na rok 2027 visí na úřední desce do 11. listopadu</a>
              </h3>
              <p style={{ margin: "0" }}>Připomínky můžete poslat e-mailem nebo říct na zasedání 9. listopadu.</p>
            </article>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>27. října</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/aktuality/bioodpad-naposledy-20-listopadu" style={{ display: "inline-block", paddingBlock: "2px", color: "var(--ink)" }}>Bioodpad se naposledy vyveze 20. listopadu</a>
              </h3>
              <p style={{ margin: "0" }}>{"Hnědé nádoby pak zůstanou u domů do března."}</p>
            </article>
          </section>
          {' '}
          <section aria-labelledby="deska11" style={{ flex: "1 1 300px", minWidth: "0", padding: "24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", alignSelf: "flex-start" }}>
            <h2 id="deska11" style={{ margin: "0 0 12px", fontSize: "24px" }}>Úřední deska</h2>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" className="hit" style={{ color: "var(--link)" }}>Návrh rozpočtu obce na rok 2027</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 11. 11. 2026</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/uzavirka-mostu" className="hit" style={{ color: "var(--link)" }}>Uzavírka mostu přes Javornický potok</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 30. 11. 2026</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/pozvanka-zasedani-9-11" className="hit" style={{ color: "var(--link)" }}>Pozvánka na zasedání zastupitelstva</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 9. 11. 2026</span>
              </li>
            </ul>
            {' '}
            <a href="/uredni-deska" className="hit" style={{ marginTop: "8px", fontWeight: "600", color: "var(--link)" }}>Celá úřední deska</a>
          </section>
        </div>
      </main>
      <Paticka />
    </>
  )
}

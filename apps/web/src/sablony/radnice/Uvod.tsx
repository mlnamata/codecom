'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S11-Radnice.html. */

import type { ReactNode } from 'react'
import { Foto } from '../sdilene/Foto'
import { Fragment } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner, foto }: { banner: ReactNode; foto: boolean }) {
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
        <section className="deep" aria-labelledby="radnice-titulek" style={{ maxWidth: "1360px", margin: "0 auto", borderRadius: "24px", background: "var(--deep)", color: "var(--on-deep)", position: "relative", overflow: "hidden" }}>
          {foto ? (
            <Foto sablona="radnice" styl={{ position: "absolute", right: "0", bottom: "0", width: "min(56%, 640px)", height: "auto", display: "block" }} />
          ) : (
            <svg viewBox="0 0 640 420" aria-hidden="true" style={{ position: "absolute", right: "0", bottom: "0", width: "min(56%, 640px)", height: "auto", display: "block" }}>
              <rect x="120" y="190" width="400" height="230" style={{ fill: "var(--primary)" }} opacity="0.35"></rect>
              <rect x="270" y="70" width="100" height="350" style={{ fill: "var(--primary)" }} opacity="0.55"></rect>
              <path d="M262 74 l58 -60 l58 60z" style={{ fill: "var(--primary)" }} opacity="0.7"></path>
              <circle cx="320" cy="130" r="26" style={{ fill: "var(--on-deep)" }} opacity="0.9"></circle>
              <path d="M320 130 V114 M320 130 h10" style={{ stroke: "var(--deep)" }} strokeWidth="3" strokeLinecap="round"></path>
              <g style={{ fill: "var(--on-deep)" }} opacity="0.5">
                <rect x="150" y="230" width="34" height="50" rx="17"></rect>
                <rect x="206" y="230" width="34" height="50" rx="17"></rect>
                <rect x="400" y="230" width="34" height="50" rx="17"></rect>
                <rect x="456" y="230" width="34" height="50" rx="17"></rect>
                <rect x="150" y="310" width="34" height="50" rx="17"></rect>
                <rect x="206" y="310" width="34" height="50" rx="17"></rect>
                <rect x="400" y="310" width="34" height="50" rx="17"></rect>
                <rect x="456" y="310" width="34" height="50" rx="17"></rect>
              </g>
              <path d="M296 420 v-56 a24 24 0 0 1 48 0 v56z" style={{ fill: "var(--deep)" }}></path>
              <path d="M320 14 V-10" style={{ stroke: "var(--accent)" }} strokeWidth="3"></path>
              <path d="M320 -10 h26 l-6 8 l6 8 h-26z" style={{ fill: "var(--accent)" }}></path>
            </svg>
          )}
          {' '}
          <div style={{ position: "relative", padding: "clamp(40px, 6vw, 72px) clamp(20px, 4vw, 56px) 140px", maxWidth: "720px" }}>
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
        </section>
        {' '}
        <div style={{ maxWidth: "1296px", margin: "-88px auto 0", padding: "0 clamp(16px, 3vw, 32px)", position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "12px" }}>
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Úřad dnes</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>otevřeno 8 až 17</p>
            <a href="/obecni-urad" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>Úřední hodiny</a>
          </div>
          {' '}
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Nejbližší svoz</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>plasty ve středu 4. 11.</p>
            <a href="/sluzby#svoz-odpadu" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>Svozový kalendář</a>
          </div>
          {' '}
          <div style={{ padding: "20px 24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 0 0 1px var(--line)" }}>
            <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Zastupitelstvo</p>
            <p style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: "500" }}>{"pondělí 9. 11. v 18 hodin"}</p>
            <a href="/uredni-deska/pozvanka-zasedani-9-11" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>Program zasedání</a>
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
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ color: "var(--ink)" }}>Rozpočet na rok 2027 visí na úřední desce do 11. listopadu</a>
              </h3>
              <p style={{ margin: "0" }}>Připomínky můžete poslat e-mailem nebo říct na zasedání 9. listopadu.</p>
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
          <section aria-labelledby="deska11" style={{ flex: "1 1 300px", minWidth: "0", padding: "24px", borderRadius: "16px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", alignSelf: "flex-start" }}>
            <h2 id="deska11" style={{ margin: "0 0 12px", fontSize: "24px" }}>Úřední deska</h2>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ color: "var(--link)" }}>Návrh rozpočtu obce na rok 2027</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 11. 11. 2026</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/uzavirka-mostu" style={{ color: "var(--link)" }}>Uzavírka mostu přes Javornický potok</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 30. 11. 2026</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/uredni-deska/pozvanka-zasedani-9-11" style={{ color: "var(--link)" }}>Pozvánka na zasedání zastupitelstva</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 9. 11. 2026</span>
              </li>
            </ul>
            {' '}
            <a href="/uredni-deska" style={{ display: "inline-block", marginTop: "8px", fontWeight: "600", color: "var(--link)" }}>Celá úřední deska</a>
          </section>
        </div>
      </main>
      <Paticka />
    </>
  )
}

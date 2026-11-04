'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S03-Studanka.html. */

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
      <aside aria-label="Kontakt na úřad" className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)", fontSize: "15px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "8px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "4px 24px" }}>
          <span>Úřad dnes 8 až 17 hodin</span>
          <span>[TELEFON]</span>
          <a href="/obecni-urad" className="odkaz-lista" style={{ color: "var(--on-deep)" }}>[E-MAIL]</a>
        </div>
      </aside>
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <section style={{ display: "flex", flexWrap: "wrap" }}>
          <FotoDlazdice soubor="sablona-03-studanka.webp" alt={POPISY_FOTEK.studanka ?? ""} styl={{ flex: "1 1 480px", minWidth: "0", minHeight: "360px", display: "block" }} />
          {' '}
          <div className="deep" style={{ flex: "1 1 400px", minWidth: "0", background: "var(--deep)", color: "var(--on-deep)", padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" }}>
            <h1 style={{ margin: "0", fontFamily: "var(--font-alegreya), Georgia, serif", fontWeight: "500", fontSize: "clamp(40px, 4.4vw, 60px)", lineHeight: "1.1" }}>
              <span style={{ fontWeight: "600" }}>Dobrý den,</span>
              {" vítejte v Javoří Lhotě"}
            </h1>
            {' '}
            <p style={{ margin: "0", maxWidth: "40ch", fontSize: "19px", lineHeight: "1.5" }}>
              {"Na stránkách najdete, co platí právě teď, ať tu bydlíte celý rok, nebo jen o víkendech."}
            </p>
            {' '}
            <div role="group" aria-label="Roční období" style={{ display: "inline-flex", alignSelf: "flex-start", padding: "4px", borderRadius: "12px", boxShadow: "inset 0 0 0 1px var(--on-deep)" }}>
              <button type="button" onClick={v.toLeto} aria-pressed={v.letoOn} style={{ minHeight: "44px", padding: "0 20px", borderRadius: "8px", border: "0", font: "inherit", fontWeight: "500", cursor: "pointer", background: v.letoBg, color: v.letoInk }}>Léto</button>
              {' '}
              <button type="button" onClick={v.toZima} aria-pressed={v.zimaOn} style={{ minHeight: "44px", padding: "0 20px", borderRadius: "8px", border: "0", font: "inherit", fontWeight: "500", cursor: "pointer", background: v.zimaBg, color: v.zimaInk }}>Zima</button>
            </div>
          </div>
        </section>
        {' '}
        <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
          <form role="search" className="hledani-prekryv" style={{ flex: "1 1 300px", minWidth: "0", marginTop: "-48px", padding: "28px", borderRadius: "4px", background: "var(--accent)", color: "var(--on-accent)", display: "flex", flexDirection: "column", gap: "12px", position: "relative" }} action="/hledat" method="get">
            <h2 style={{ margin: "0", fontFamily: "var(--font-alegreya), Georgia, serif", fontSize: "26px" }}>Hledáte něco?</h2>
            {' '}
            <label htmlFor="q03" style={{ fontWeight: "500" }}>Hledat na webu obce</label>
            {' '}
            <div style={{ display: "flex", gap: "8px" }}>
              <input id="q03" type="search" placeholder="např. vodoměr" style={{ flex: "1", minWidth: "0", height: "48px", padding: "0 12px", border: "1px solid var(--on-accent)", borderRadius: "8px", font: "inherit", background: "var(--surface)", color: "var(--ink)" }} name="q" />
              {' '}
              <button type="submit" aria-label="Hledat" style={{ width: "48px", height: "48px", border: "0", borderRadius: "8px", background: "var(--on-accent)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M20 20l-3.5-3.5"></path>
                </svg>
              </button>
            </div>
          </form>
          {' '}
          <nav aria-label="Rozcestník" style={{ flex: "3 1 560px", minWidth: "0", padding: "32px 0 8px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "24px 32px" }}>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M3 11l9-7 9 7v9H3z"></path>
                  <path d="M10 20v-6h4v6"></path>
                </svg>
                Pro chalupáře
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/sluzby/platby">Poplatek za rekreační objekt</a>
                <a className="hit" href="/obecni-urad">Odečet vodoměru</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M4 21V9l8-5 8 5v12"></path>
                  <path d="M9 21v-7h6v7"></path>
                </svg>
                Obecní úřad
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/uredni-deska">Úřední deska</a>
                <a className="hit" href="/zastupitelstvo">Zastupitelstvo</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"></path>
                </svg>
                {"Odpady a voda"}
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/sluzby#svoz-odpadu">Kalendář svozu</a>
                <a className="hit" href="/aktuality/pitna-voda-cisterny">Rozbor pitné vody</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M12 3l3 7h-6z"></path>
                  <path d="M12 8l5 10H7z"></path>
                  <path d="M12 18v3"></path>
                </svg>
                {"Příroda a výlety"}
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/obecni-urad">Rozhledna na Javorníku</a>
                <a className="hit" href="/obecni-urad">Mlýnský rybník</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Poplatky
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/sluzby/platby">Zaplatit kartou online</a>
                <a className="hit" href="/sluzby/platby">{"Kolik a do kdy"}</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M4 5h16v12H8l-4 4z"></path>
                </svg>
                Kontakty
              </h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/obecni-urad">{"Starostka a úřad"}</a>
                <a className="hit" href="/aktuality">Odebírat zprávy e-mailem</a>
              </p>
            </div>
          </nav>
        </section>
        {' '}
        <section aria-labelledby="sezona" style={{ maxWidth: "1240px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px)" }}>
          <h2 id="sezona" style={{ margin: "0 0 4px", fontFamily: "var(--font-alegreya), Georgia, serif", fontSize: "36px" }}>{v.seasonTitle}</h2>
          {' '}
          <p style={{ margin: "0 0 32px", color: "var(--muted)" }}>{v.seasonLead}</p>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "32px" }}>
            {v.items.map((it, i) => (
              <Fragment key={i}>
                <div style={{ paddingTop: "16px", borderTop: "3px solid var(--deep)" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "600" }}>{it.title}</h3>
                  {' '}
                  <p style={{ margin: "0" }}>{it.text}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
        {' '}
        <section style={{ display: "flex", flexWrap: "wrap", background: "var(--surface)" }}>
          <div style={{ flex: "1 1 400px", minWidth: "0", padding: "clamp(40px, 6vw, 80px) clamp(24px, 5vw, 64px)", background: "var(--primary)", color: "var(--on-primary)" }} className="deep">
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-alegreya), Georgia, serif", fontSize: "36px" }}>{"Výlety z Javoří Lhoty"}</h2>
            {' '}
            <p style={{ margin: "0 0 24px", maxWidth: "44ch" }}>
              {"Na rozhlednu na Javorníku je to z návsi 50 minut po žluté. Kolem Mlýnského rybníka vede naučná stezka dlouhá 4 kilometry."}
            </p>
            {' '}
            <a href="/obecni-urad" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 20px", borderRadius: "8px", background: "var(--on-primary)", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Mapa výletů</a>
          </div>
          {' '}
          <div style={{ flex: "1 1 400px", minWidth: "0", padding: "48px clamp(24px, 5vw, 64px)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ margin: "0", fontFamily: "var(--font-alegreya), Georgia, serif", fontSize: "28px" }}>{"Zprávy z obce"}</h2>
            {' '}
            <p style={{ margin: "0" }}>
              <a className="hit" href="/aktuality/nove-hriste-za-skolou" style={{ fontWeight: "600" }}>Nové hřiště za školou je otevřené</a>
              <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>26. října</span>
            </p>
            {' '}
            <p style={{ margin: "0" }}>
              <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Rozbor vody ze studánky: voda je pitná</a>
              <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>22. října</span>
            </p>
            {' '}
            <p style={{ margin: "0" }}>
              <a className="hit" href="/aktuality/bioodpad-naposledy-20-listopadu" style={{ fontWeight: "600" }}>Svoz bioodpadu končí 20. listopadu</a>
              <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>20. října</span>
            </p>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}

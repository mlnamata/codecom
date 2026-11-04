'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S02-Zvonice.html. */

import type { DataUvodu } from '../sdilene/typy'
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Fragment } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { denSlovem } from '../sdilene/format'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner, data }: { banner: ReactNode; data: DataUvodu; foto: boolean }) {
  const v = useHodnoty()
  return (
    <>
      <Hlavicka />
      {banner}
      <main id="obsah" tabIndex={-1} style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 80px" }}>
        <div style={{ maxWidth: "720px" }}>
          <h1 style={{ margin: "0", fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "clamp(40px, 5vw, 56px)", lineHeight: "1.1", letterSpacing: "-0.01em" }}>Obec Javoří Lhota</h1>
          {' '}
          <p style={{ margin: "16px 0 0", fontSize: "21px", lineHeight: "1.5", color: "var(--muted)" }}>
            {"684 obyvatel, okres Klatovy. Tady najdete všechno, co obec zveřejňuje, a co se dá vyřídit bez cesty na úřad."}
          </p>
          {' '}
          <div style={{ margin: "32px 0 0", padding: "4px 0 4px 20px", borderLeft: "8px solid var(--line)" }}>
            <p style={{ margin: "0" }}>
              {"Dnes, v pondělí, má úřad otevřeno "}
              <strong>od 8 do 17 hodin</strong>
              . Starostka Marie Šťastná přijímá občany od 15 hodin.
            </p>
          </div>
        </div>
        {' '}
        <FotoDlazdice soubor="sablona-02-zvonice.webp" alt={POPISY_FOTEK.zvonice ?? ""} styl={{ marginTop: "40px", width: "100%", height: "clamp(220px, 30vw, 380px)", borderRadius: "4px" }} />
        {' '}
        <section aria-labelledby="ukony" style={{ marginTop: "56px" }}>
          <h2 id="ukony" style={{ margin: "0 0 16px", fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "32px" }}>Nejčastější úkony</h2>
          {' '}
          <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "0 40px" }}>
            <li style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
              <a className="hit" href="/sluzby/platby" style={{ fontSize: "19px", fontWeight: "600" }}>Zaplatit poplatek za odpad</a>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{"900 Kč na osobu a rok, splatný do 31. května"}</p>
            </li>
            <li style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
              <a className="hit" href="/sluzby/nahlasit-zavadu" style={{ fontSize: "19px", fontWeight: "600" }}>Nahlásit závadu</a>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>lampa, výmol, rozbitá lavička, černá skládka</p>
            </li>
            <li style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
              <a className="hit" href="/sluzby#svoz-odpadu" style={{ fontSize: "19px", fontWeight: "600" }}>Zjistit termín svozu odpadu</a>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>kalendář podle ulice, bioodpad do 20. listopadu</p>
            </li>
            <li style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
              <a className="hit" href="/sluzby#objednat-se-na-urad" style={{ fontSize: "19px", fontWeight: "600" }}>Objednat se na úřad</a>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{"Czech POINT, ověření podpisu, přihlášení k pobytu"}</p>
            </li>
          </ul>
        </section>
        {' '}
        <section aria-labelledby="deska" style={{ marginTop: "56px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px 24px", marginBottom: "16px" }}>
            <h2 id="deska" style={{ margin: "0", fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "32px" }}>Úřední deska</h2>
            {' '}
            <a className="hit" href="/uredni-deska/archiv">Archiv úřední desky</a>
          </div>
          {' '}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span id="filtr-kat" style={{ fontWeight: "600", marginRight: "4px" }}>Kategorie</span>
            {' '}
            <div role="group" aria-labelledby="filtr-kat" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {v.cats.map((ct, i) => (
                <Fragment key={i}>
                  <button type="button" onClick={ct.pick} aria-pressed={ct.pressed} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "8px", border: `1px solid ${ct.edge}`, background: ct.bg, color: ct.ink, font: "inherit", fontSize: "16px", cursor: "pointer" }}>{ct.label}</button>
                </Fragment>
              ))}
            </div>
          </div>
          {' '}
          <button type="button" onClick={v.toggleOld} aria-pressed={v.oldPressed} style={{ display: "inline-flex", alignItems: "center", gap: "12px", minHeight: "44px", padding: "0", border: "0", background: "transparent", color: "var(--ink)", font: "inherit", fontSize: "16px", cursor: "pointer" }}>
            <span aria-hidden="true" style={{ width: "24px", height: "24px", border: "2px solid var(--ink)", borderRadius: "4px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
              <span style={{ width: "12px", height: "12px", borderRadius: "2px", background: v.oldMark }}></span>
            </span>
            {"Zobrazit i sejmuté dokumenty"}
          </button>
          {' '}
          <p aria-live="polite" style={{ margin: "8px 0 12px", color: "var(--muted)" }}>{v.countText}</p>
          {' '}
          <div style={{ border: "1px solid var(--line)", borderRadius: "4px", padding: "4px 20px" }}>
            <div role="table" aria-label="Dokumenty na úřední desce" aria-rowcount={v.rowCount} style={{ fontVariantNumeric: "tabular-nums" }}>
              <div role="rowgroup">
                <div role="row" className="drow dhead" style={{ color: "var(--muted)", fontSize: "15px", fontWeight: "600" }}>
                  <span role="columnheader">Dokument</span>
                  <span role="columnheader">Vyvěšeno</span>
                  <span role="columnheader">Sejmutí</span>
                </div>
              </div>
              {' '}
              <div role="rowgroup">
                {v.docs.map((d, i) => (
                  <Fragment key={i}>
                    <div role="row" className="drow">
                      <span role="cell">
                        <a href={d.href} className="dodkaz" style={{ fontWeight: "600" }}>{d.title}</a>
                        <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{d.cat}{d.state}</span>
                      </span>
                      <span role="cell" className="dfrom">{d.from}</span>
                      <span role="cell" className="dto">{d.to}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            {' '}
            {v.empty ? (
              <>
                <div style={{ padding: "20px 0" }}>
                  <p style={{ margin: "0 0 8px", fontWeight: "600" }}>{"V této kategorii teď nic nevisí"}</p>
                  <p style={{ margin: "0" }}>
                    {"Starší dokumenty najdete v archivu. "}
                    <button type="button" onClick={v.reset} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "8px", border: "1px solid var(--ink)", background: "var(--bg)", color: "var(--ink)", font: "inherit", fontSize: "16px", cursor: "pointer" }}>Zrušit filtr</button>
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </section>
        {' '}
        <section aria-labelledby="urad" style={{ marginTop: "56px" }}>
          <h2 id="urad" style={{ margin: "0 0 16px", fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "32px" }}>Obecní úřad</h2>
          {' '}
          <dl className="udaje-uradu" style={{ margin: "0", display: "grid", gridTemplateColumns: "minmax(140px, 220px) 1fr", borderTop: "1px solid var(--line)" }}>
            <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Úřední hodiny</dt>
            <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>{"pondělí a středa 8 až 17, úterý a čtvrtek 8 až 12"}</dd>
            <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Adresa</dt>
            <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>Náves 1, [PSČ] Javoří Lhota</dd>
            <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Telefon</dt>
            <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>[TELEFON]</dd>
            <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>E-mail</dt>
            <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
              <a href="/obecni-urad">[E-MAIL]</a>
            </dd>
            <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Datová schránka</dt>
            <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>[ID DS]</dd>
          </dl>
        </section>
        {' '}
        <section aria-labelledby="zpravy" style={{ marginTop: "56px", maxWidth: "720px" }}>
          <h2 id="zpravy" style={{ margin: "0 0 16px", fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "32px" }}>{"Zprávy z obce"}</h2>
          {' '}
          <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
            {data.aktuality.slice(0, 2).map((x) => (
                <li key={x.id}>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{denSlovem(x.publikovanoDen)}</span>
                  <a className="hit" href={x.href} style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontSize: "23px", lineHeight: "1.3", color: "var(--ink)" }}>{x.titulek}</a>
                </li>
            ))}
          </ul>
        </section>
      </main>
      <Paticka />
    </>
  )
}

'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S07-Hranice.html. */

import type { ReactNode } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner }: { banner: ReactNode }) {
  const v = useHodnoty()
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <h1 className="sr">Obec Javoří Lhota, Gemeinde Javoří Lhota</h1>
        {' '}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px)", display: "grid", gridTemplateColumns: v.cols, gap: "40px 72px", position: "relative" }}>
          {v.showCs ? (
            <>
              <div lang="cs">
                <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-ibm-plex-serif), Georgia, serif", fontWeight: "500", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.12" }}>Obec, ze které je to do Bavorska 4 kilometry</h2>
                {' '}
                <p style={{ margin: "0 0 20px", maxWidth: "46ch" }}>
                  {"Žijeme u hranice s Bavorskem. Co platí u nás, co za hranicí a co děláme společně s obcí Waldkirchen am Grenzbach."}
                </p>
                {' '}
                <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                  <a className="hit" href="/sluzby/platby">Zaplatit poplatky</a>
                  <a className="hit" href="/uredni-deska">Úřední deska</a>
                  <a className="hit" href="/obecni-urad">{"Práce a lékař v Německu"}</a>
                </p>
              </div>
            </>
          ) : null}
          {' '}
          {v.showBoth ? (
            <>
              <div aria-hidden="true" className="border-line" style={{ position: "absolute", top: "56px", bottom: "56px", left: "50%", borderLeft: "2px dashed var(--line)" }}>
                <span style={{ position: "absolute", top: "0", left: "-9px", width: "16px", height: "22px", borderRadius: "4px 4px 0 0", background: "var(--primary)" }}></span>
                <span style={{ position: "absolute", bottom: "0", left: "-9px", width: "16px", height: "22px", borderRadius: "4px 4px 0 0", background: "var(--primary)" }}></span>
              </div>
            </>
          ) : null}
          {' '}
          {v.showDe ? (
            <>
              <div lang="de">
                <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-ibm-plex-serif), Georgia, serif", fontWeight: "500", fontSize: "clamp(32px, 3.6vw, 46px)", lineHeight: "1.12" }}>Ein Dorf, vier Kilometer von Bayern entfernt</h2>
                {' '}
                <p style={{ margin: "0 0 20px", maxWidth: "46ch" }}>
                  Wir leben an der Grenze zu Bayern. Was bei uns gilt, was drüben gilt und was wir gemeinsam mit Waldkirchen am Grenzbach machen.
                </p>
                {' '}
                <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                  <a className="hit" href="/obecni-urad">Wanderwege und Radwege</a>
                  <a className="hit" href="/obecni-urad">Unterkunft im Dorf</a>
                  <a className="hit" href="/obecni-urad">Notdienst und Ärzte</a>
                </p>
              </div>
            </>
          ) : null}
        </section>
        {' '}
        <section aria-labelledby="spolecne" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px)" }}>
            <h2 id="spolecne" style={{ margin: "0 0 24px", fontFamily: "var(--font-ibm-plex-serif), Georgia, serif", fontWeight: "500", fontSize: "34px" }}>
              {"Společně "}
              <span lang="de" style={{ color: "var(--muted)" }}>/ Gemeinsam</span>
            </h2>
            {' '}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
              <article style={{ padding: "24px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", display: "flex", gap: "16px" }}>
                <span aria-hidden="true" style={{ flex: "0 0 56px", height: "64px", borderRadius: "4px", background: "var(--primary)", color: "var(--on-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1.1" }}>
                  <span style={{ fontSize: "24px", fontWeight: "600" }}>11</span>
                  <span style={{ fontSize: "13px" }}>lis</span>
                </span>
                <span>
                  <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>Svatomartinský průvod přes hranici</a>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{"od hraničního kamene v 17 hodin"}</span>
                  <span lang="de" style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>Martinsumzug über die Grenze</span>
                </span>
              </article>
              {' '}
              <article style={{ padding: "24px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", display: "flex", gap: "16px" }}>
                <span aria-hidden="true" style={{ flex: "0 0 56px", height: "64px", borderRadius: "4px", background: "var(--primary)", color: "var(--on-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1.1" }}>
                  <span style={{ fontSize: "24px", fontWeight: "600" }}>29</span>
                  <span style={{ fontSize: "13px" }}>lis</span>
                </span>
                <span>
                  <a className="hit" href="/akce" style={{ fontWeight: "600", color: "var(--ink)" }}>Adventní trh obou obcí</a>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>náves Javoří Lhoty, od 14 hodin</span>
                  <span lang="de" style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>Gemeinsamer Adventsmarkt</span>
                </span>
              </article>
              {' '}
              <article style={{ padding: "24px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)", display: "flex", gap: "16px" }}>
                <span aria-hidden="true" style={{ flex: "0 0 56px", height: "64px", borderRadius: "4px", background: "var(--primary)", color: "var(--on-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1.1" }}>
                  <span style={{ fontSize: "24px", fontWeight: "600" }}>1</span>
                  <span style={{ fontSize: "13px" }}>pro</span>
                </span>
                <span>
                  <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>{"Zimní uzávěra cesty k hraničnímu přechodu"}</a>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>pěší přechod zůstává otevřený</span>
                  <span lang="de" style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>Wintersperre des Weges</span>
                </span>
              </article>
            </div>
          </div>
        </section>
        {' '}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "40px" }}>
          <div>
            <h2 style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: "600" }}>Úřední deska</h2>
            <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>
              {"Úřední dokumenty jsou česky. "}
              <span lang="de">Amtliche Dokumente erscheinen auf Tschechisch.</span>
            </p>
            <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
              <a className="hit" href="/uredni-deska/navrh-rozpoctu-2027">Návrh rozpočtu obce na rok 2027</a>
              <a className="hit" href="/uredni-deska/uzavirka-mostu">Uzavírka mostu přes Javornický potok</a>
            </p>
          </div>
          {' '}
          <div>
            <h2 style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: "600" }}>Přes hranici</h2>
            <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
              <a className="hit" href="/obecni-urad">{"Práce v Bavorsku a pojištění"}</a>
              <a className="hit" href="/obecni-urad">Lékařská pohotovost na obou stranách</a>
              <a className="hit" href="/obecni-urad">Autobus do Waldkirchenu</a>
            </p>
          </div>
          {' '}
          <div>
            <h2 style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: "600" }}>
              {"Napište nám "}
              <span lang="de" style={{ color: "var(--muted)", fontWeight: "500" }}>/ Schreiben Sie uns</span>
            </h2>
            <p style={{ margin: "0" }}>
              Náves 1, Javoří Lhota
              <br />
              [TELEFON]
              <br />
              <a href="/obecni-urad">[E-MAIL]</a>
              <br />
              {"Mluvíme česky a německy."}
            </p>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}

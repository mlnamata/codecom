/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S06-Hnizdo.html. */
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
        <section className="deep" style={{ position: "relative", background: "var(--deep)", color: "#FFFFFF", overflow: "hidden" }}>
          <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 40px" }}>
            <h1 style={{ margin: "0", maxWidth: "16ch", fontSize: "clamp(40px, 5.4vw, 68px)", lineHeight: "1.08", letterSpacing: "-0.02em" }}>{"Škola, školka a autobus na jednom místě"}</h1>
            {' '}
            <p style={{ margin: "16px 0 0", maxWidth: "46ch", fontSize: "19px", lineHeight: "1.5", color: "#FFFFFF" }}>
              {"Pro rodiny v Javoří Lhotě. Jídelníček, zápisy, odjezdy do Klatov a co se v obci staví."}
            </p>
          </div>
          {' '}
          {/* Fotka leží pod textem, ne pod ním: bílý text nikdy nestojí přímo na fotografii. */}
          <FotoDlazdice soubor="sablona-06-hnizdo.webp" alt={POPISY_FOTEK.hnizdo ?? ""} styl={{ width: "100%", height: "clamp(240px, 32vw, 400px)" }} />
        </section>
        {' '}
        <div style={{ position: "relative", maxWidth: "1200px", margin: "-120px auto 0", padding: "0 clamp(16px, 4vw, 32px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "0" }}>
          <a href="/obecni-urad" style={{ padding: "32px", minHeight: "220px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 10l9-5 9 5-9 5z"></path>
              <path d="M7 12v5c3 2 7 2 10 0v-5"></path>
            </svg>
            <span style={{ fontSize: "22px", fontWeight: "600" }}>{"Škola a školka"}</span>
            <span>Zápis do školky 5. května, jídelníček na tento týden, družina do 16:30</span>
          </a>
          {' '}
          <a href="/obecni-urad" style={{ padding: "32px", minHeight: "220px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="4" width="16" height="13" rx="2"></rect>
              <path d="M4 11h16M8 20v-3M16 20v-3"></path>
            </svg>
            <span style={{ fontSize: "22px", fontWeight: "600" }}>{"Doprava a parkování"}</span>
            <span>{"Linka 431 do Klatov, objížďka přes Hájek, parkování u školy"}</span>
          </a>
          {' '}
          <a href="/obecni-urad" style={{ padding: "32px", minHeight: "220px", background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 21h18M5 21V10l7-5 7 5v11"></path>
              <path d="M10 21v-5h4v5"></path>
            </svg>
            <span style={{ fontSize: "22px", fontWeight: "600" }}>{"Výstavba a pozemky"}</span>
            <span>Lokalita Za Humny: 12 parcel, sítě hotové do června 2027</span>
          </a>
        </div>
        {' '}
        <section aria-labelledby="tyden" style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 32px" }}>
          <h2 id="tyden" style={{ margin: "0 0 20px", fontSize: "32px" }}>{"Tento týden v obci"}</h2>
          {' '}
          <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "12px" }}>
            <li style={{ padding: "20px", borderRadius: "16px", background: "var(--primary)", color: "var(--on-primary)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>Dnes, po 2.</span>
              <span>
                <span style={{ display: "block", fontSize: "14px", opacity: "0.9" }}>Oběd ve školce</span>
                kuřecí rizoto, okurkový salát
              </span>
              <span>
                <span style={{ display: "block", fontSize: "14px", opacity: "0.9" }}>Odpoledne</span>
                uzavírka mostu začíná
              </span>
            </li>
            <li style={{ padding: "20px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>Út 3.</span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Oběd</span>
                čočková polévka, palačinky
              </span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Odpoledne</span>
                {"cvičení rodičů s dětmi 16:30"}
              </span>
            </li>
            <li style={{ padding: "20px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>St 4.</span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Oběd</span>
                hovězí guláš, chléb
              </span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Ráno</span>
                svoz plastů
              </span>
            </li>
            <li style={{ padding: "20px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>Čt 5.</span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Oběd</span>
                rybí prsty, bramborová kaše
              </span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>8 až 14 hodin</span>
                {"nepoteče voda v Hlavní"}
              </span>
            </li>
            <li style={{ padding: "20px", borderRadius: "16px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>Pá 6.</span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Oběd</span>
                dýňová polévka, buchtičky
              </span>
              <span>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>Odpoledne</span>
                družina jen do 15 hodin
              </span>
            </li>
          </ol>
        </section>
        {' '}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px clamp(16px, 4vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <div style={{ flex: "3 1 420px", minWidth: "0" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "32px" }}>{"Ze školy, školky a obce"}</h2>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "19px", fontWeight: "600" }}>
                <a href="/aktuality/zapis-do-skolky-5-kvetna" style={{ display: "inline-block", paddingBlock: "2px", color: "var(--ink)", textDecoration: "none" }}>Zápis do školky bude 5. května, přihlášky půjdou podat online</a>
              </h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>Mateřská škola, 24. října</p>
            </article>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "19px", fontWeight: "600" }}>
                <a href="/aktuality/nove-hriste-za-skolou" className="hit" style={{ color: "var(--ink)", textDecoration: "none" }}>Nové hřiště za školou je otevřené</a>
              </h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>Obec, 26. října</p>
            </article>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "19px", fontWeight: "600" }}>
                <a href="/aktuality" className="hit" style={{ color: "var(--ink)", textDecoration: "none" }}>Zastupitelé dají příspěvek 2 000 Kč na letní tábor</a>
              </h3>
              <p style={{ margin: "0", color: "var(--muted)" }}>Úřední deska, visí do 11. listopadu</p>
            </article>
          </div>
          {' '}
          <aside aria-labelledby="bus" style={{ flex: "2 1 320px", minWidth: "0", padding: "28px", borderRadius: "20px", background: "var(--surface)" }}>
            <h2 id="bus" style={{ margin: "0 0 4px", fontSize: "24px" }}>Autobus do Klatov</h2>
            {' '}
            <p style={{ margin: "0 0 16px", color: "var(--muted)" }}>{"linka 431, zastávka u hájovny po dobu uzavírky"}</p>
            {' '}
            <div role="table" aria-label="Nejbližší odjezdy" style={{ fontVariantNumeric: "tabular-nums" }}>
              <div role="row" style={{ display: "grid", gridTemplateColumns: "96px 1fr", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span role="cell" style={{ fontSize: "24px", fontWeight: "600" }}>13:42</span>
                <span role="cell" style={{ alignSelf: "center" }}>za 12 minut</span>
              </div>
              {' '}
              <div role="row" style={{ display: "grid", gridTemplateColumns: "96px 1fr", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span role="cell" style={{ fontSize: "24px", fontWeight: "600" }}>14:12</span>
                <span role="cell" style={{ alignSelf: "center" }}>{"jede až k nádraží"}</span>
              </div>
              {' '}
              <div role="row" style={{ display: "grid", gridTemplateColumns: "96px 1fr", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span role="cell" style={{ fontSize: "24px", fontWeight: "600" }}>15:42</span>
                <span role="cell" style={{ alignSelf: "center" }}>nízkopodlažní</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Paticka />
    </>
  )
}

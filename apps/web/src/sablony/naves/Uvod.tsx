/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/Main.html. */
import type { ReactNode } from 'react'
import { Foto } from '../sdilene/Foto'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      {banner}
      <div className="naves-uvod" style={{ position: "relative", isolation: "isolate" }}>
        <Hlavicka />
        {' '}
        <main id="obsah" tabIndex={-1} style={{ maxWidth: "1240px", margin: "0 auto", padding: "300px clamp(16px, 4vw, 32px) 64px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
          {/* Fotka je v main kvůli oblastem stránky, polohou ale leží pod záhlavím i obsahem vnějšího bloku. */}
          <Foto sablona="naves" styl={{ position: "absolute", inset: "0 0 auto 0", width: "100%", height: "600px", display: "block", zIndex: -1 }} />
          <aside aria-label="Rychlé odkazy a počasí" className="m-odkazy" style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <nav className="on-primary" aria-labelledby="obec-menu" style={{ borderRadius: "16px", background: "var(--primary)", color: "var(--on-primary)", padding: "8px" }}>
              <h2 id="obec-menu" className="sr">Rychlá navigace</h2>
              {' '}
              <a href="/" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.12)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "500" }}>Úvod</a>
              {' '}
              <a href="/sluzby/platby" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", color: "var(--on-primary)", textDecoration: "none" }}>Zaplatit poplatky</a>
              {' '}
              <a href="/sluzby#svoz-odpadu" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", color: "var(--on-primary)", textDecoration: "none" }}>Svoz odpadu</a>
              {' '}
              <a href="/sluzby/nahlasit-zavadu" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", color: "var(--on-primary)", textDecoration: "none" }}>Nahlásit závadu</a>
              {' '}
              <a href="/zastupitelstvo" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", color: "var(--on-primary)", textDecoration: "none" }}>Zastupitelstvo</a>
              {' '}
              <a href="/uredni-deska" style={{ display: "flex", alignItems: "center", minHeight: "44px", padding: "0 12px", color: "var(--on-primary)", textDecoration: "none" }}>{"Dokumenty a vyhlášky"}</a>
            </nav>
            {' '}
            <section aria-labelledby="pocasi" style={{ borderRadius: "16px", background: "var(--bg)", padding: "20px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 0 0 1px var(--line)" }}>
              <h2 id="pocasi" style={{ margin: "0 0 12px", fontSize: "17px" }}>Počasí na návsi</h2>
              {' '}
              <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="18" cy="18" r="8" style={{ fill: "var(--accent)" }}></circle>
                  <path d="M14 36h22a8 8 0 0 0-2-15.7A10 10 0 0 0 15 24a6 6 0 0 0-1 12z" style={{ fill: "var(--surface)", stroke: "var(--muted)" }} strokeWidth="1.5"></path>
                </svg>
                <span>
                  <span style={{ display: "block", fontSize: "32px", lineHeight: "1.1", fontVariantNumeric: "tabular-nums" }}>9 °C</span>
                  <span style={{ color: "var(--muted)", fontSize: "15px" }}>polojasno, vítr 12 km/h</span>
                </span>
              </p>
              {' '}
              <dl style={{ margin: "16px 0 0", display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 12px", fontVariantNumeric: "tabular-nums", fontSize: "15px" }}>
                <dt>Čtvrtek</dt>
                <dd style={{ margin: "0", textAlign: "right" }}>7 °C, déšť</dd>
                <dt>Pátek</dt>
                <dd style={{ margin: "0", textAlign: "right" }}>4 °C, oblačno</dd>
              </dl>
              {' '}
              <p style={{ margin: "12px 0 0", fontSize: "14px", color: "var(--muted)" }}>Předpověď ČHMÚ</p>
            </section>
          </aside>
          {' '}
          <div className="m-center" style={{ flex: "999 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <section style={{ borderRadius: "16px", background: "var(--deep)", color: "var(--on-deep)", padding: "28px 32px" }} className="deep">
              <h1 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.02em" }}>{"Vítejte v Javoří Lhotě"}</h1>
              {' '}
              <p style={{ margin: "8px 0 0", maxWidth: "52ch", fontSize: "18px", lineHeight: "1.5" }}>
                {"684 obyvatel, náves s třistaletou lípou, kostel svatého Václava a Mlýnský rybník pod Javorníkem."}
              </p>
            </section>
            {' '}
            <section aria-labelledby="zajem" style={{ borderRadius: "16px", background: "var(--bg)", padding: "24px 28px", boxShadow: "inset 0 0 0 1px var(--line)" }}>
              <h2 id="zajem" style={{ margin: "0 0 16px", fontSize: "22px" }}>Co potřebujete</h2>
              {' '}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))", gap: "16px 24px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "15px", color: "var(--muted)", fontWeight: "500" }}>Obecní úřad</h3>
                  <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                    <a className="hit" href="/obecni-urad">{"Úřední hodiny a kontakty"}</a>
                    <a className="hit" href="/zastupitelstvo">Zastupitelstvo</a>
                    <a className="hit" href="/uredni-deska/navrh-rozpoctu-2027">Rozpočet obce</a>
                  </p>
                </div>
                {' '}
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "15px", color: "var(--muted)", fontWeight: "500" }}>{"Život v obci"}</h3>
                  <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                    <a className="hit" href="/obecni-urad">{"Škola a školka"}</a>
                    <a className="hit" href="/obecni-urad">{"Lékař a pošta"}</a>
                    <a className="hit" href="/obecni-urad">{"Spolky a hasiči"}</a>
                  </p>
                </div>
                {' '}
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "15px", color: "var(--muted)", fontWeight: "500" }}>Okolí</h3>
                  <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                    <a className="hit" href="/obecni-urad">Rozhledna na Javorníku</a>
                    <a className="hit" href="/obecni-urad">Mlýnský rybník</a>
                    <a className="hit" href="/obecni-urad">Kaple svaté Anny</a>
                  </p>
                </div>
              </div>
            </section>
            {' '}
            <section aria-labelledby="zpravy" style={{ borderRadius: "16px", background: "var(--bg)", padding: "24px 28px", boxShadow: "inset 0 0 0 1px var(--line)" }}>
              <h2 id="zpravy" style={{ margin: "0 0 16px", fontSize: "22px" }}>{"Zprávy z obce"}</h2>
              {' '}
              <article style={{ display: "flex", flexWrap: "wrap", gap: "20px", paddingBottom: "20px", borderBottom: "1px solid var(--line)" }}>
                <FotoDlazdice soubor="sablona-06-hnizdo.webp" alt="Malá venkovská škola s novým dřevěným hřištěm, na zemi podzimní listí." styl={{ flex: "1 1 220px", maxWidth: "280px", aspectRatio: "7 / 4", borderRadius: "12px" }} />
                {' '}
                <div style={{ flex: "2 1 260px", minWidth: "0" }}>
                  <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>26. října</p>
                  {' '}
                  <h3 style={{ margin: "0 0 8px", fontSize: "21px", lineHeight: "1.3" }}>
                    <a href="/aktuality/nove-hriste-za-skolou" style={{ color: "var(--ink)", textDecoration: "none" }}>Nové hřiště za školou je otevřené</a>
                  </h3>
                  {' '}
                  <p style={{ margin: "0" }}>
                    {"Hřiště pro děti od 3 do 12 let stavěla obec s dotací Plzeňského kraje. Otevřeno je denně od 8 do 20 hodin."}
                  </p>
                </div>
              </article>
              {' '}
              <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                  <a className="hit" href="/aktuality/bioodpad-naposledy-20-listopadu" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: "500" }}>Svoz bioodpadu končí 20. listopadu</a>
                  <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>23. 10.</span>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                  <a className="hit" href="/aktuality/oprava-chodniku-v-lipove" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: "500" }}>{"Zastupitelé schválili opravu chodníku v Lipové"}</a>
                  <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>21. 10.</span>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0" }}>
                  <a className="hit" href="/aktuality/hasici-vyhrali-okrskovou-soutez" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: "500" }}>Hasiči vyhráli okrskovou soutěž</a>
                  <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>18. 10.</span>
                </li>
              </ul>
            </section>
          </div>
          {' '}
          <aside aria-label="Hlášení a akce" style={{ flex: "1 1 280px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <section aria-labelledby="hlaseni" style={{ borderRadius: "16px", background: "var(--bg)", padding: "20px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 0 0 1px var(--line)" }}>
              <h2 id="hlaseni" style={{ margin: "0 0 12px", fontSize: "17px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--muted)" }}>
                  <path d="M3 10v4h4l6 5V5L7 10z"></path>
                  <path d="M17 9a4 4 0 0 1 0 6"></path>
                </svg>
                Hlášení rozhlasu
              </h2>
              {' '}
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <a className="hit" href="/hlaseni-rozhlasu" style={{ fontWeight: "500" }}>Ve čtvrtek nepoteče voda</a>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{"Hlavní a Za Školou, 8 až 14 hodin"}</span>
                </li>
                <li>
                  <a className="hit" href="/akce#sber-nebezpecneho-odpadu" style={{ fontWeight: "500" }}>Sběr nebezpečného odpadu</a>
                  <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>sobota 7. 11. na návsi, 9 až 11 hodin</span>
                </li>
              </ul>
              {' '}
              <a className="hit" href="/hlaseni-rozhlasu" style={{ fontSize: "15px" }}>Všechna hlášení</a>
            </section>
            {' '}
            <section aria-labelledby="akce" style={{ borderRadius: "16px", background: "var(--bg)", padding: "20px", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 0 0 1px var(--line)" }}>
              <h2 id="akce" style={{ margin: "0 0 12px", fontSize: "17px" }}>Nejbližší akce</h2>
              {' '}
              <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "12px", alignItems: "start" }}>
                  <span aria-hidden="true" style={{ borderRadius: "8px", overflow: "hidden", textAlign: "center", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                    <span style={{ display: "block", background: "var(--primary)", color: "var(--on-primary)", fontSize: "12px", lineHeight: "20px" }}>lis</span>
                    <span style={{ display: "block", fontSize: "22px", lineHeight: "32px", fontVariantNumeric: "tabular-nums" }}>7</span>
                  </span>
                  <span>
                    <a className="hit" href="/akce#lampionovy-pruvod" style={{ fontWeight: "500" }}>Lampionový průvod</a>
                    <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>{"sobota 7. listopadu v 17 hodin od hasičárny"}</span>
                  </span>
                </li>
                <li style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "12px", alignItems: "start" }}>
                  <span aria-hidden="true" style={{ borderRadius: "8px", overflow: "hidden", textAlign: "center", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                    <span style={{ display: "block", background: "var(--primary)", color: "var(--on-primary)", fontSize: "12px", lineHeight: "20px" }}>lis</span>
                    <span style={{ display: "block", fontSize: "22px", lineHeight: "32px", fontVariantNumeric: "tabular-nums" }}>14</span>
                  </span>
                  <span>
                    <a className="hit" href="/akce#vylov-mlynskeho-rybnika" style={{ fontWeight: "500" }}>Výlov Mlýnského rybníka</a>
                    <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>sobota 14. listopadu od 9 hodin, prodej ryb na hrázi</span>
                  </span>
                </li>
                <li style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "12px", alignItems: "start" }}>
                  <span aria-hidden="true" style={{ borderRadius: "8px", overflow: "hidden", textAlign: "center", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                    <span style={{ display: "block", background: "var(--primary)", color: "var(--on-primary)", fontSize: "12px", lineHeight: "20px" }}>lis</span>
                    <span style={{ display: "block", fontSize: "22px", lineHeight: "32px", fontVariantNumeric: "tabular-nums" }}>28</span>
                  </span>
                  <span>
                    <a className="hit" href="/akce#rozsviceni-vanocniho-stromu" style={{ fontWeight: "500" }}>Rozsvícení vánočního stromu</a>
                    <span style={{ display: "block", fontSize: "15px", color: "var(--muted)" }}>sobota 28. listopadu pod lípou na návsi</span>
                  </span>
                </li>
              </ul>
            </section>
          </aside>
        </main>
      </div>
      <Paticka />
    </>
  )
}

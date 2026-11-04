/** Úvod šablony 22 Achernar: tmavé sklo, noční fotka v rámu a svítivý akcent. Obsah z dat Javoří Lhoty. */
import type { ReactNode } from 'react'
import type { DataUvodu } from '../sdilene/typy'
import { Foto } from '../sdilene/Foto'
import { denCely, denKratce, denSlovem } from '../sdilene/format'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

const UKONY = [
  { text: 'Zaplatit poplatek za odpad', href: '/sluzby/platby', popis: '900 Kč na osobu a rok, splatný do 31. května' },
  { text: 'Nahlásit závadu', href: '/sluzby/nahlasit-zavadu', popis: 'lampa, výmol, rozbitá lavička, černá skládka' },
  { text: 'Zjistit termín svozu odpadu', href: '/sluzby#svoz-odpadu', popis: 'kalendář podle ulice, bioodpad do 20. listopadu' },
  { text: 'Objednat se na úřad', href: '/sluzby#objednat-se-na-urad', popis: 'Czech POINT, ověření podpisu, přihlášení k pobytu' },
]

export function Uvod({ banner, data, foto }: { banner: ReactNode; data: DataUvodu; foto: boolean }) {
  const kategorie = (slug: string) => data.kategorieDesky.find((k) => k.slug === slug)?.nazev ?? slug
  return (
    <>
      {banner}
      <div className="nc-pozadi">
        <Hlavicka />
        <main id="obsah" tabIndex={-1} className="nc-obal">
          <section className={foto ? 'nc-hero' : 'nc-hero nc-bez-fotky'} aria-labelledby="nc-nadpis">
            <div className="nc-sklo nc-panel nc-uvitani">
              <h1 id="nc-nadpis">Obec Javoří Lhota</h1>
              <p className="nc-perex">684 obyvatel, okres Klatovy. Tady najdete všechno, co obec zveřejňuje, a co se dá vyřídit bez cesty na úřad.</p>
              <p className="nc-dnes">
                {'Dnes, v pondělí, má úřad otevřeno '}
                <strong>od 8 do 17 hodin</strong>. Starostka Marie Šťastná přijímá občany od 15 hodin.
              </p>
            </div>
            {foto ? <Foto sablona="noc" soubor="sablona-17-magistrat.webp" styl={{ width: '100%', height: '100%', minHeight: '280px', borderRadius: '28px' }} /> : null}
          </section>

          <section className="nc-sekce" aria-labelledby="nc-ukony">
            <h2 id="nc-ukony">Nejčastější úkony</h2>
            <ul className="nc-ukony">
              {UKONY.map((u) => (
                <li key={u.text} className="nc-sklo">
                  <a href={u.href}>{u.text}</a>
                  <span>{u.popis}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="nc-mrizka">
            <section className="nc-sklo nc-panel nc-deska" aria-labelledby="nc-deska">
              <div className="nc-hlava">
                <h2 id="nc-deska">Úřední deska</h2>
                <a href="/uredni-deska">Celá úřední deska</a>
              </div>
              <ul className="nc-seznam">
                {data.deska.slice(0, 5).map((d) => (
                  <li key={d.id}>
                    <a href={d.href}>{d.nazev}</a>
                    <span className="nc-tlumene">
                      {kategorie(d.kategorie)}, visí do {denCely(d.vyvesenoDo)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="nc-sklo nc-panel" aria-labelledby="nc-rozhlas">
              <div className="nc-hlava">
                <h2 id="nc-rozhlas">Hlášení rozhlasu</h2>
                <a href="/hlaseni-rozhlasu">Všechna hlášení</a>
              </div>
              <ul className="nc-seznam">
                {data.rozhlas.slice(0, 3).map((r) => (
                  <li key={r.id}>
                    <span className="nc-cas">{denKratce(r.casDen)}</span>
                    <a href={r.href}>{r.titulek}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="nc-sklo nc-panel" aria-labelledby="nc-zpravy">
              <div className="nc-hlava">
                <h2 id="nc-zpravy">Zprávy z obce</h2>
                <a href="/aktuality">Všechny zprávy</a>
              </div>
              <ul className="nc-seznam">
                {data.aktuality.slice(0, 3).map((x) => (
                  <li key={x.id}>
                    <span className="nc-tlumene">{denSlovem(x.publikovanoDen)}</span>
                    <a href={x.href} className="nc-titulek">
                      {x.titulek}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="nc-sklo nc-panel" aria-labelledby="nc-urad">
              <h2 id="nc-urad">Obecní úřad</h2>
              <dl className="nc-kontakt">
                <dt>Úřední hodiny</dt>
                <dd>pondělí a středa 8 až 17, úterý a čtvrtek 8 až 12</dd>
                <dt>Adresa</dt>
                <dd>Náves 1, [PSČ] Javoří Lhota</dd>
                <dt>Telefon</dt>
                <dd>[TELEFON]</dd>
                <dt>E-mail</dt>
                <dd>
                  <a href="/obecni-urad">[E-MAIL]</a>
                </dd>
                <dt>Datová schránka</dt>
                <dd>[ID DS]</dd>
              </dl>
            </section>
          </div>
        </main>
      </div>
      <Paticka />
    </>
  )
}

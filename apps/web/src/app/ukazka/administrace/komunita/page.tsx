import type { Metadata } from 'next'
import dataKomunity from '../../../../../../../obsah/javori-lhota/komunita.json'

export const metadata: Metadata = { title: 'Komunita a půjčovna | Administrace' }

export default function AdministraceKomunity() {
  const { pujcovna, bazar, spolujizda, dobrovolnictvi } = dataKomunity

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h1>Správa obecní půjčovny a komunitního bazaru</h1>
        <a href="/komunita" className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          Otevřít veřejnou komunitu
        </a>
      </div>
      <p>
        Správa inventáře obecní půjčovny nářadí, schvalování výpůjček, moderace inzerátů sousedského bazaru a evidence dobrovolníků.
      </p>

      <section style={{ marginTop: 24 }} aria-labelledby="sprava-pujcovny">
        <h2 id="sprava-pujcovny">Inventář obecní půjčovny ({pujcovna.length} položek)</h2>
        <ul className="seznam-bloku">
          {pujcovna.map((p) => (
            <li key={p.id}>
              <div>
                <strong>{p.nazev}</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Kategorie: {p.kategorie} · Půjčovné: {p.pujcovne} · Vratná kauce: {p.kauce}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    background: p.stav === 'volno' ? '#e6f4ea' : '#fef7e0',
                    color: p.stav === 'volno' ? '#137333' : '#b06000',
                  }}
                >
                  {p.stav === 'volno' ? 'K dispozici' : 'Vypůjčeno / rezervováno'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-bazaru">
        <h2 id="sprava-bazaru">Inzeráty v sousedském bazaru ({bazar.length} inzerátů)</h2>
        <ul className="seznam-bloku">
          {bazar.map((b) => (
            <li key={b.id}>
              <div>
                <strong>{b.nazev}</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Typ: {b.typ} · Vložil: {b.autor} ({b.datum}) · Cena: {b.cena}
                </div>
              </div>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 500,
                  background: '#e6f4ea',
                  color: '#137333',
                }}
              >
                Schváleno
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-akci">
        <h2 id="sprava-akci">Dobrovolnické brigády a spolujízda</h2>
        <div className="mrizka">
          <div className="panel-bily">
            <h3 style={{ margin: '0 0 8px', fontSize: 17 }}>Brigády a pomoc</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {dobrovolnictvi.map((d) => (
                <li key={d.id} style={{ padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  <strong>{d.nazev}</strong>
                  <div className="vedlejsi" style={{ fontSize: 13 }}>
                    Přihlášeno {d.prihlaseno} z {d.kapacita} osob ({d.termin})
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-bily">
            <h3 style={{ margin: '0 0 8px', fontSize: 17 }}>Aktivní nabídky spolujízdy</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {spolujizda.map((s) => (
                <li key={s.id} style={{ padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  <strong>{s.trasa}</strong>
                  <div className="vedlejsi" style={{ fontSize: 13 }}>
                    Řidič: {s.ridic} · Volná místa: {s.volno}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

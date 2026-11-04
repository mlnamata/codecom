import type { Metadata } from 'next'
import dataMajetku from '../../../../../../../obsah/javori-lhota/majetek.json'

export const metadata: Metadata = { title: 'Majetek a energetika | Administrace' }

export default function AdministraceMajetku() {
  const { bytyAPozemky, energetika, hrbitov } = dataMajetku

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h1>Správa obecních nemovitostí a energetiky</h1>
        <a href="/majetek" className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          Otevřít veřejnou správu majetku
        </a>
      </div>
      <p>
        Správa obecních bytů a startovacího bydlení, evidence parcel pro rodinné domy, monitoring komunitní energetiky a pasport hřbitova.
      </p>

      <section style={{ marginTop: 24 }} aria-labelledby="sprava-bytu">
        <h2 id="sprava-bytu">Obecní bytový fond a startovací byty</h2>
        <div className="panel-bily">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <strong>{bytyAPozemky.obecniDomy[0]?.adresa}</strong>
              <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                Celkem {bytyAPozemky.obecniDomy[0]?.celkemBytu} bytů · {bytyAPozemky.obecniDomy[0]?.startovaciByty} startovací byty · {bytyAPozemky.obecniDomy[0]?.volneByty} volný byt k přidělení
              </div>
            </div>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                background: '#e8f0fe',
                color: '#1a73e8',
              }}
            >
              V pořadníku: {bytyAPozemky.poradnik.pocetZadosti} zájemci
            </span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-fve">
        <h2 id="sprava-fve">Komunitní energetika a FVE systémy</h2>
        <div className="mrizka">
          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Instalované výrobny elektřiny</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: 14 }}>
              {energetika.zdroje.map((z) => (
                <li key={z.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  <span>{z.nazev} ({z.vykonKwp} kWp)</span>
                  <strong style={{ color: '#137333' }}>{z.aktualneKw} kW</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Sdílení elektřiny v komunitě</h3>
            <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 8px' }}>
              Registrace: {energetika.edcRegistrace} · Zapojeno {energetika.sdileniObcanum.zapojenoDomacnosti} domácností
            </p>
            <div style={{ fontSize: 14, marginTop: 8 }}>
              Cena sdílené elektřiny: <strong>{energetika.sdileniObcanum.cenaKwh}</strong>
              <br />
              Volná kapacita k odběru: <strong>{energetika.sdileniObcanum.volnaKapacita}</strong>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-hrbitova">
        <h2 id="sprava-hrbitova">Pasport hřbitova a pachtovní smlouvy</h2>
        <div className="panel-bily">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <strong>{hrbitov.nazev}</strong>
              <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                Celkem {hrbitov.hrobovaMistaCelkem} hrobových míst · {hrbitov.obsazeno} obsazeno · {hrbitov.volnychMist} volných k pachtu
              </div>
            </div>
            <span className="vedlejsi" style={{ fontSize: 13 }}>
              {hrbitov.radaPachtu}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

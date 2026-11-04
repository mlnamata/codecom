import type { Metadata } from 'next'
import dataChytreObce from '../../../../../../../obsah/javori-lhota/chytra-obec.json'

export const metadata: Metadata = { title: 'IoT čidla a živá data | Administrace' }

export default function AdministraceIot() {
  const { senzory, technika, parkovani, nabijecky } = dataChytreObce

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h1>Správa IoT čidel a techniky</h1>
        <a href="/chytra-obec" className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          Otevřít veřejný dashboard
        </a>
      </div>
      <p>
        Přehled a konfigurace LoRaWAN / NB-IoT bran, limitů automatického varování v krizovém banneru a GPS tras komunální techniky.
      </p>

      <section style={{ marginTop: 24 }} aria-labelledby="stav-bran">
        <h2 id="stav-bran">Stav komunikačních bran a čidel</h2>
        <div className="panel-bily">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <strong>LoRaWAN Brána úřad (MikroTik wAP LR8)</strong>
              <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                Frekvence 868 MHz · 14 aktivních čidel v dosahu · síla signálu 98 %
              </div>
            </div>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                background: '#e6f4ea',
                color: '#137333',
              }}
            >
              Online (bez výpadku)
            </span>
          </div>
        </div>

        <div className="mrizka" style={{ marginTop: 12 }}>
          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Automatické varování – Javornický potok</h3>
            <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
              Při překročení limitu systém automaticky vyvěsí krizový banner na web a odešle notifikaci občanům v aplikaci.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>1. SPA (bdělost):</span>
                <strong>{senzory.potok.stupne.bdelost} cm</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>2. SPA (pohotovost):</span>
                <strong>{senzory.potok.stupne.pohotovost} cm</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>3. SPA (ohrožení):</span>
                <strong>{senzory.potok.stupne.ohrozeni} cm</strong>
              </div>
            </div>
          </div>

          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Parkoviště a dobíjení EV</h3>
            <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
              Stav v reálném čase hlášený ultrazvukovými magnetickými senzory v zemi.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {parkovani.map((p) => (
                <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>{p.nazev}:</span>
                  <strong>{p.volno} z {p.kapacita} volno</strong>
                </li>
              ))}
              {nabijecky.map((n) => (
                <li key={n.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderTop: '1px solid var(--line)', marginTop: 4, paddingTop: 4 }}>
                  <span>{n.nazev}:</span>
                  <strong>1 stojan v provozu, 1 volný</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-techniky">
        <h2 id="sprava-techniky">GPS jednotky komunální techniky</h2>
        <ul className="seznam-bloku">
          {technika.map((t) => (
            <li key={t.id}>
              <div>
                <strong>{t.nazev}</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Řidič: {t.ridic} · Poslední aktivita: {t.poloha}
                </div>
              </div>
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  background: t.stav === 'v-terenu' ? '#e8f0fe' : 'var(--surface)',
                  color: t.stav === 'v-terenu' ? '#1a73e8' : 'var(--ink)',
                  border: '1px solid var(--line)',
                }}
              >
                {t.stavText}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

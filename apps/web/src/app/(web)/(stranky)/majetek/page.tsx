import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'
import dataMajetku from '../../../../../../../obsah/javori-lhota/majetek.json'

export const metadata: Metadata = {
  title: 'Správa majetku a infrastruktury | Javoří Lhota',
  description: 'Obecní byty a stavební parcely, komunitní energetika FVE a digitální pasport hřbitova.',
}

export default async function MajetekStranka() {
  const obec = await nactiObec()
  const { bytyAPozemky, energetika, hrbitov } = dataMajetku

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Správa majetku' }]} />
      <h1 style={{ marginBottom: 4 }}>Správa obecního majetku a energetiky</h1>
      <p style={{ maxWidth: 720 }}>
        Agenda obecního bydlení, pořadníky na startovací byty, prodej stavebních parcel, komunitní sdílení elektřiny z obecních fotovoltaik a digitální pasport hřbitova.
      </p>

      {/* 1. Obecní byty a stavební parcely */}
      <section style={{ marginTop: 36 }} aria-labelledby="sekce-byty">
        <h2 id="sekce-byty" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Obecní byty a stavební parcely
        </h2>
        <div className="mrizka" style={{ marginTop: 16 }}>
          {bytyAPozemky.obecniDomy.map((d) => (
            <div key={d.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{d.adresa}</h3>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#e6f4ea',
                    color: '#137333',
                  }}
                >
                  Volno: {d.volneByty} byt
                </span>
              </div>
              <p style={{ margin: '8px 0 12px', fontSize: 14 }}>{d.popis}</p>
              <p className="vedlejsi" style={{ margin: 0, fontSize: 13 }}>
                Celkem {d.celkemBytu} bytů v domě, z toho {d.startovaciByty} startovací byty.
              </p>
            </div>
          ))}

          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Pořadník na startovací bydlení</h3>
            <p className="vedlejsi" style={{ margin: '0 0 10px', fontSize: 13 }}>
              V evidenci jsou aktuálně <strong>{bytyAPozemky.poradnik.pocetZadosti} platné žádosti</strong>.
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
              {bytyAPozemky.poradnik.podminky.map((podminka, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {podminka}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 style={{ fontSize: 18, marginTop: 24, marginBottom: 12 }}>Zasíťované parcely pro rodinné domy</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="tabulka" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--line)', fontSize: 14, color: 'var(--muted)' }}>
                <th style={{ padding: '8px 12px' }}>Číslo parcely</th>
                <th style={{ padding: '8px 12px' }}>Lokalita</th>
                <th style={{ padding: '8px 12px' }}>Výměra</th>
                <th style={{ padding: '8px 12px' }}>Cena za m²</th>
                <th style={{ padding: '8px 12px' }}>Celková cena</th>
                <th style={{ padding: '8px 12px' }}>Stav</th>
              </tr>
            </thead>
            <tbody>
              {bytyAPozemky.parcely.map((p) => (
                <tr key={p.cislo} style={{ borderBottom: '1px solid var(--line)', fontSize: 15 }}>
                  <td style={{ padding: '12px' }}>
                    <strong>{p.cislo}</strong>
                  </td>
                  <td style={{ padding: '12px' }}>{p.lokalita}</td>
                  <td style={{ padding: '12px' }}>{p.vymera} m²</td>
                  <td style={{ padding: '12px' }}>{p.cenaZaMetr.toLocaleString('cs-CZ')} Kč</td>
                  <td style={{ padding: '12px' }}>
                    <strong>{p.celkemCena.toLocaleString('cs-CZ')} Kč</strong>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        background: p.stav === 'k-prodeji' ? '#e6f4ea' : '#fce8e6',
                        color: p.stav === 'k-prodeji' ? '#137333' : '#c5221f',
                      }}
                    >
                      {p.stav === 'k-prodeji' ? 'K prodeji' : 'Rezervováno'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Komunitní energetika a FVE dashboard */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-energetika">
        <h2 id="sekce-energetika" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Komunitní energetika a fotovoltaika
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          Registrace v Elektroenergetickém datovém centru: {energetika.edcRegistrace}. Občané obce mohou odebírat přebytky elektřiny za zvýhodněnou cenu.
        </p>

        <div className="mrizka">
          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <span className="vedlejsi" style={{ fontSize: 13 }}>
              Aktuální výkon FVE
            </span>
            <div style={{ margin: '8px 0', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600 }}>{energetika.aktualniVyroba}</span>
              <span className="vedlejsi">kW</span>
              <span className="vedlejsi" style={{ marginLeft: 16, fontSize: 14 }}>
                z {energetika.instalovanyVykonCelkem}
              </span>
            </div>
            <p className="vedlejsi" style={{ margin: 0, fontSize: 13 }}>
              Dnes vyrobeno: {energetika.vyrobaDnes} kWh · Ušetřeno {energetika.usporenoCo2Dnes}
            </p>
          </div>

          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <span className="vedlejsi" style={{ fontSize: 13 }}>
              Bateriové úložiště úřadu
            </span>
            <div style={{ margin: '8px 0', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600 }}>{energetika.stavUloziste} %</span>
              <span className="vedlejsi" style={{ marginLeft: 16, fontSize: 14 }}>
                kapacita {energetika.kapacitaUloziste} kWh
              </span>
            </div>
            <div style={{ background: 'var(--surface)', height: 8, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ background: '#137333', width: `${energetika.stavUloziste}%`, height: '100%' }} />
            </div>
          </div>

          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <span className="vedlejsi" style={{ fontSize: 13 }}>
              Sdílení elektřiny sousedům
            </span>
            <div style={{ margin: '8px 0', fontSize: 17, fontWeight: 600 }}>
              {energetika.sdileniObcanum.cenaKwh}
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 14 }}>
              Zapojeno <strong>{energetika.sdileniObcanum.zapojenoDomacnosti} domácností</strong>. {energetika.sdileniObcanum.usetrenoObcanumRocne}.
            </p>
            <span className="vedlejsi" style={{ fontSize: 13 }}>
              Volná kapacita: {energetika.sdileniObcanum.volnaKapacita}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Digitální hřbitov 2.0 */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-hrbitov">
        <h2 id="sekce-hrbitov" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Digitální pasport hřbitova a tichá vzpomínka
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          {hrbitov.nazev}. Celkem {hrbitov.hrobovaMistaCelkem} hrobových míst ({hrbitov.obsazeno} obsazeno, {hrbitov.volnychMist} volných k pachtu). {hrbitov.radaPachtu}.
        </p>

        <h3 style={{ fontSize: 18, marginBottom: 12 }}>Významné osobnosti obce a památníky</h3>
        <div className="mrizka">
          {hrbitov.vyznamneOsobnosti.map((o) => (
            <div key={o.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ margin: 0, fontSize: 17 }}>{o.jmeno}</h4>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  {o.letopocet}
                </span>
              </div>
              <p className="vedlejsi" style={{ fontSize: 13, margin: '4px 0 10px' }}>
                Umístění: {o.sektor}
              </p>
              <p style={{ fontSize: 14, margin: '0 0 16px' }}>{o.popis}</p>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  Zapálených vzpomínek: <strong>{o.zapalenychSvicek}</strong>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Tichá vzpomínka
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <VyriditeNaUrade obec={obec}>
          Máte zájem o zařazení do pořadníku na obecní startovací byt, koupi stavební parcely nebo registraci do komunitní energetiky? Žádosti vyřizuje místostarosta a účetní obce.
        </VyriditeNaUrade>
      </div>
    </>
  )
}

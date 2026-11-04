import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'
import dataChytreObce from '../../../../../../../obsah/javori-lhota/chytra-obec.json'

export const metadata: Metadata = {
  title: 'Chytrá obec a živá data | Javoří Lhota',
  description: 'Živá data z obecních IoT senzorů, kvalita ovzduší, hladina potoka, sledování techniky a odjezdy spojů.',
}

export default async function ChytraObecStranka() {
  const obec = await nactiObec()
  const { senzory, technika, parkovani, nabijecky, odjezdy, posledniAktualizace } = dataChytreObce

  const datumAktualizace = new Intl.DateTimeFormat('cs-CZ', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Prague',
  }).format(new Date(posledniAktualizace))

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Chytrá obec a živá data' }]} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px 16px' }}>
        <h1 style={{ marginBottom: 4 }}>Chytrá obec a živá data</h1>
        <span className="vedlejsi" style={{ fontSize: 14 }}>
          Aktualizováno: {datumAktualizace}
        </span>
      </div>
      <p style={{ maxWidth: 720 }}>
        Přehled dat z obecních IoT čidel připojených přes sítě LoRaWAN a NB-IoT, živá poloha obecní techniky, stav parkovišť a reálné odjezdy veřejné dopravy.
      </p>

      {/* 1. Enviromentální senzory */}
      <section style={{ marginTop: 32 }} aria-labelledby="sekce-senzory">
        <h2 id="sekce-senzory" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Enviromentální čidla a stav potoka
        </h2>
        <div className="mrizka" style={{ marginTop: 16 }}>
          {/* Vodočet potoka */}
          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="vedlejsi" style={{ fontSize: 13, textTransform: 'none' }}>
                  {senzory.potok.tok}
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: 18 }}>Hladina a průtok</h3>
              </div>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: '#e6f4ea',
                  color: '#137333',
                  border: '1px solid #ceead6',
                }}
              >
                {senzory.potok.stavNazev}
              </span>
            </div>
            <div style={{ margin: '16px 0 12px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>{senzory.potok.hladina}</span>
              <span className="vedlejsi">{senzory.potok.jednotka}</span>
              <span className="vedlejsi" style={{ marginLeft: 16, fontSize: 14 }}>
                průtok {senzory.potok.prutok} {senzory.potok.prutokJednotka}
              </span>
            </div>
            <div style={{ background: 'var(--surface)', height: 8, borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  background: 'var(--primary)',
                  width: `${Math.min(100, (senzory.potok.hladina / senzory.potok.stupne.ohrozeni) * 100)}%`,
                  height: '100%',
                }}
              />
            </div>
            <p className="vedlejsi" style={{ margin: '8px 0 0', fontSize: 13 }}>
              Měřicí profil: {senzory.potok.profil}. 1. stupeň bdělosti nastává při {senzory.potok.stupne.bdelost} cm (automatické varování v krizovém banneru).
            </p>
          </div>

          {/* Kvalita ovzduší */}
          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  Meteostanice
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: 18 }}>Kvalita ovzduší</h3>
              </div>
              <span
                style={{
                  padding: '3px 8px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: '#e6f4ea',
                  color: '#137333',
                  border: '1px solid #ceead6',
                }}
              >
                {senzory.ovzdusi.aqiStav}
              </span>
            </div>
            <div style={{ margin: '16px 0 12px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>{senzory.ovzdusi.teplota}</span>
              <span className="vedlejsi">°C</span>
              <span className="vedlejsi" style={{ marginLeft: 16, fontSize: 14 }}>
                AQI index {senzory.ovzdusi.aqi}
              </span>
            </div>
            <p className="vedlejsi" style={{ margin: 0, fontSize: 13 }}>
              PM2.5: {senzory.ovzdusi.pm25} µg/m³ · PM10: {senzory.ovzdusi.pm10} µg/m³ · tlak: {senzory.ovzdusi.tlak} hPa · vlhkost vzduchu: {senzory.ovzdusi.vlhkost} %
            </p>
          </div>

          {/* Stav vozovky a lesopark */}
          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div>
              <span className="vedlejsi" style={{ fontSize: 13 }}>
                Dopravní senzor
              </span>
              <h3 style={{ margin: '4px 0 0', fontSize: 18 }}>Teplota a stav vozovky</h3>
            </div>
            <div style={{ margin: '16px 0 12px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>{senzory.vozovka.teplotaPovrchu}</span>
              <span className="vedlejsi">°C</span>
              <span className="vedlejsi" style={{ marginLeft: 16, fontSize: 14 }}>
                povrch: {senzory.vozovka.stavVozovky}
              </span>
            </div>
            <p className="vedlejsi" style={{ margin: 0, fontSize: 13 }}>
              {senzory.vozovka.usek}. Čidlo vozovky nehlásí námrazu. Vlhkost půdy v lesoparku je {senzory.puda.vlhkostPudy} % s nízkým rizikem požáru.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Sledování komunální techniky */}
      <section style={{ marginTop: 40 }} aria-labelledby="sekce-technika">
        <h2 id="sekce-technika" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Sledování komunální techniky (GPS údržba)
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          V zimním období zde vidíte, které ulice jsou prohrnuté a kde se sypač aktuálně pohybuje.
        </p>
        <ul className="seznam" style={{ listStyle: 'none', padding: 0 }}>
          {technika.map((t) => (
            <li
              key={t.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                padding: '16px 20px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                marginBottom: 12,
                background: 'var(--bg)',
              }}
            >
              <div style={{ minWidth: 260, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ fontSize: 17 }}>{t.nazev}</strong>
                  <span className="vedlejsi" style={{ fontSize: 13 }}>
                    ({t.typ})
                  </span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 14 }}>
                  Řidič: {t.ridic} · Aktuální poloha: <em>{t.poloha}</em>
                </p>
                <p className="vedlejsi" style={{ margin: '2px 0 0', fontSize: 13 }}>
                  {t.posledniTrasa}
                </p>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    background: t.stav === 'v-terenu' ? '#e8f0fe' : 'var(--surface)',
                    color: t.stav === 'v-terenu' ? '#1a73e8' : 'var(--ink)',
                    border: '1px solid var(--line)',
                  }}
                >
                  {t.stavText}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Chytré parkování a dobíjení EV */}
      <section style={{ marginTop: 40 }} aria-labelledby="sekce-doprava">
        <h2 id="sekce-doprava" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Chytré parkování a nabíjecí stanice pro elektromobily
        </h2>
        <div className="mrizka" style={{ marginTop: 16 }}>
          {parkovani.map((p) => (
            <div key={p.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{p.nazev}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '12px 0' }}>
                <span style={{ fontSize: 32, fontWeight: 600 }}>{p.volno}</span>
                <span className="vedlejsi">volných z {p.kapacita} míst</span>
              </div>
              <p className="vedlejsi" style={{ margin: 0, fontSize: 13 }}>
                Pravidla: {p.poplatek}
              </p>
            </div>
          ))}

          {nabijecky.map((n) => (
            <div key={n.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{n.nazev}</h3>
                <span className="vedlejsi" style={{ fontSize: 12 }}>
                  {n.lokace}
                </span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {n.konektory.map((k, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                    <span>
                      Stojan {i + 1} ({k.vykon})
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        background: k.stav === 'volno' ? '#e6f4ea' : '#fce8e6',
                        color: k.stav === 'volno' ? '#137333' : '#c5221f',
                      }}
                    >
                      {k.stav === 'volno' ? 'Volný k nabíjení' : 'Obsazen'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="vedlejsi" style={{ margin: '10px 0 0', fontSize: 13 }}>
                Cena: {n.cena}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Živé odjezdy spojů */}
      <section style={{ marginTop: 40 }} aria-labelledby="sekce-odjezdy">
        <h2 id="sekce-odjezdy" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Živé odjezdy autobusů a vlaků (s reálným zpožděním)
        </h2>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table className="tabulka" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--line)', fontSize: 14, color: 'var(--muted)' }}>
                <th style={{ padding: '8px 12px' }}>Linka</th>
                <th style={{ padding: '8px 12px' }}>Směr jízdy</th>
                <th style={{ padding: '8px 12px' }}>Zastávka</th>
                <th style={{ padding: '8px 12px' }}>Plánovaný odjezd</th>
                <th style={{ padding: '8px 12px' }}>Aktuální stav</th>
              </tr>
            </thead>
            <tbody>
              {odjezdy.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--line)', fontSize: 15 }}>
                  <td style={{ padding: '12px' }}>
                    <strong>{o.linka}</strong>
                  </td>
                  <td style={{ padding: '12px' }}>{o.smer}</td>
                  <td style={{ padding: '12px' }} className="vedlejsi">
                    {o.stanice}
                  </td>
                  <td style={{ padding: '12px' }}>{o.odjezd}</td>
                  <td style={{ padding: '12px' }}>
                    {o.zpozdeniMin > 0 ? (
                      <span style={{ color: '#b06000', fontWeight: 600 }}>Zpoždění +{o.zpozdeniMin} min</span>
                    ) : (
                      <span style={{ color: '#137333', fontWeight: 500 }}>Jede včas</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <VyriditeNaUrade obec={obec}>
          Potřebujete vyčíst podrobnější historická data z obecní meteostanice nebo nahlásit poruchu dobíjecí stanice? Obraťte se na správce technických služeb obce.
        </VyriditeNaUrade>
      </div>
    </>
  )
}

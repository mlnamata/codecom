import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'
import dataKomunity from '../../../../../../../obsah/javori-lhota/komunita.json'

export const metadata: Metadata = {
  title: 'Komunitní sdílení a lokální ekonomika | Javoří Lhota',
  description: 'Obecní půjčovna nářadí, sousedský bazar a darovna, spolujízda a burza dobrovolnictví.',
}

export default async function KomunitaStranka() {
  const obec = await nactiObec()
  const { pujcovna, bazar, spolujizda, dobrovolnictvi } = dataKomunity

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Komunitní sdílení' }]} />
      <h1 style={{ marginBottom: 4 }}>Komunitní sdílení a sousedská pomoc</h1>
      <p style={{ maxWidth: 720 }}>
        Místo pro sousedské sdílení techniky, přebytků ze zahrad a dílen, organizaci spolujízdy do práce a škol a brigády pro zvelebení naší obce.
      </p>

      {/* 1. Obecní půjčovna nářadí */}
      <section style={{ marginTop: 36 }} aria-labelledby="sekce-pujcovna">
        <h2 id="sekce-pujcovna" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Obecní půjčovna vybavení (Tool Library)
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          Vybavení si mohou zapůjčit občané s trvalým pobytem v Javoří Lhotě. Výdej probíhá v areálu technických služeb.
        </p>
        <div className="mrizka">
          {pujcovna.map((p) => (
            <div
              key={p.id}
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <span className="vedlejsi" style={{ fontSize: 13 }}>
                    {p.kategorie}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      background: p.stav === 'volno' ? '#e6f4ea' : '#fef7e0',
                      color: p.stav === 'volno' ? '#137333' : '#b06000',
                    }}
                  >
                    {p.stav === 'volno' ? 'K dispozici' : 'Rezervováno'}
                  </span>
                </div>
                <h3 style={{ margin: '8px 0 4px', fontSize: 18 }}>{p.nazev}</h3>
                <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
                  Parametry: {p.tlak}
                </p>
                <p style={{ fontSize: 14, margin: '0 0 16px' }}>{p.popis}</p>
              </div>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span>Půjčovné: <strong>{p.pujcovne}</strong></span>
                  <span className="vedlejsi">Vratná kauce: {p.kauce}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sousedský bazar a darovna */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-bazar">
        <h2 id="sekce-bazar" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Sousedský bazar a darovna (přebytky za odvoz)
        </h2>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bazar.map((b) => (
            <div
              key={b.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 12,
                padding: '16px 20px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                background: 'var(--bg)',
              }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      background: b.typ === 'poptavka' ? '#e8f0fe' : b.typ === 'darovna' ? '#e6f4ea' : 'var(--surface)',
                      color: b.typ === 'poptavka' ? '#1a73e8' : b.typ === 'darovna' ? '#137333' : 'var(--ink)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {b.typ === 'poptavka' ? 'Poptávka' : b.typ === 'darovna' ? 'Darovna' : 'Nabídka'}
                  </span>
                  <strong style={{ fontSize: 17 }}>{b.nazev}</strong>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 15 }}>{b.popis}</p>
                <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                  Vložil: {b.autor} · {b.datum}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)' }}>{b.cena}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sousedská spolujízda */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-spolujizda">
        <h2 id="sekce-spolujizda" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Sousedská spolujízda (dojíždění do měst)
        </h2>
        <div className="mrizka" style={{ marginTop: 16 }}>
          {spolujizda.map((s) => (
            <div key={s.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{s.trasa}</h3>
              <p style={{ margin: '8px 0', fontSize: 14 }}>
                <strong>Čas odjezdu:</strong> {s.kdy}
                <br />
                <strong>Návrat:</strong> {s.navrat}
              </p>
              <p className="vedlejsi" style={{ margin: '0 0 12px', fontSize: 13 }}>
                Řidič: {s.ridic} · {s.kontakt}
              </p>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Příspěvek: {s.prispevek}</span>
                <span style={{ color: '#137333', fontWeight: 500 }}>Volná místa: {s.volno}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Burza dobrovolnictví a brigád */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-brigady">
        <h2 id="sekce-brigady" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Burza dobrovolnictví a společné brigády
        </h2>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {dobrovolnictvi.map((d) => (
            <div
              key={d.id}
              style={{
                padding: '20px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                background: 'var(--bg)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{d.nazev}</h3>
                  <span className="vedlejsi" style={{ fontSize: 14 }}>
                    Organizátor: {d.organizator} · Termín: <strong>{d.termin}</strong>
                  </span>
                </div>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 9999,
                    fontSize: 13,
                    fontWeight: 600,
                    background: '#e6f4ea',
                    color: '#137333',
                  }}
                >
                  Přihlášeno: {d.prihlaseno} z {d.kapacita} dobrovolníků
                </span>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 15 }}>
                Místo srazu: {d.misto}. {d.odmena}.
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <VyriditeNaUrade obec={obec}>
          Chcete si zarezervovat party stan nebo štípač na dřevo mimo web? Zavolejte do kanceláře úřadu nebo se stavte v úředních hodinách.
        </VyriditeNaUrade>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'
import dataBezpecnosti from '../../../../../../../obsah/javori-lhota/bezpecnost.json'

export const metadata: Metadata = {
  title: 'Bezpečnost, AED a ztráty a nálezy | Javoří Lhota',
  description: 'Ztráty a nálezy zvířat i věcí, mapa defibrilátorů AED a informace o kamerovém dohledu.',
}

export default async function BezpecnostStranka() {
  const obec = await nactiObec()
  const { ztratyANalezy, aedDefibrilatory, kamery } = dataBezpecnosti

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Bezpečnost a AED' }]} />
      <h1 style={{ marginBottom: 4 }}>Bezpečnost obce, AED a ztráty a nálezy</h1>
      <p style={{ maxWidth: 720 }}>
        Registr ztracených a nalezených zvířat a věcí, umístění automatických externích defibrilátorů (AED) s nepřetržitou dostupností a informace o obecním kamerovém systému.
      </p>

      {/* 1. AED a první pomoc */}
      <section style={{ marginTop: 36 }} aria-labelledby="sekce-aed">
        <h2 id="sekce-aed" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Defibrilátory AED a záchrana života
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          V případě náhlé zástavy oběhu volejte ihned linku 155. Přístroj AED mluví česky a vede zachránce krok za krokem.
        </p>
        <div className="mrizka">
          {aedDefibrilatory.map((aed) => (
            <div key={aed.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{aed.lokace}</h3>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: aed.dostupnost.includes('24/7') ? '#e6f4ea' : '#e8f0fe',
                    color: aed.dostupnost.includes('24/7') ? '#137333' : '#1a73e8',
                    border: '1px solid var(--line)',
                  }}
                >
                  {aed.dostupnost}
                </span>
              </div>
              <p style={{ margin: '10px 0 6px', fontSize: 14 }}>
                <strong>Umístění:</strong> {aed.umisteni}
              </p>
              <p className="vedlejsi" style={{ margin: '0 0 10px', fontSize: 13 }}>
                Kód skříňky: {aed.pinBox}
              </p>
              <p className="vedlejsi" style={{ margin: '0 0 8px', fontSize: 13 }}>
                Model: {aed.typ} (GPS: {aed.souradnice})
              </p>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, fontSize: 12, color: '#137333' }}>
                {aed.stav}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Ztráty a nálezy 2.0 */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-ztraty">
        <h2 id="sekce-ztraty" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Ztráty a nálezy (zvířata i nalezené věci)
        </h2>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ztratyANalezy.map((z) => (
            <div
              key={z.id}
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
                      background: z.kategorie === 'zvire' ? '#fef7e0' : 'var(--surface)',
                      color: z.kategorie === 'zvire' ? '#b06000' : 'var(--ink)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {z.kategorie === 'zvire' ? 'Zvíře' : 'Předmět'}
                  </span>
                  <strong style={{ fontSize: 17 }}>{z.nazev}</strong>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 14 }}>{z.popis}</p>
                <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                  Místo nálezu: {z.misto} · Nalezeno dne {z.datum}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--primary)' }}>
                  Kde se nachází: {z.pece}
                </p>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    background: z.stav === 'hleda-majitele' ? '#fde8e8' : '#e6f4ea',
                    color: z.stav === 'hleda-majitele' ? '#c5221f' : '#137333',
                  }}
                >
                  {z.stav === 'hleda-majitele' ? 'Hledá se majitel' : 'K vyzvednutí'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Veřejné kamery */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-kamery">
        <h2 id="sekce-kamery" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Veřejné webové kamery (stav dopravy a toku)
        </h2>
        <div className="mrizka" style={{ marginTop: 16 }}>
          {kamery.map((k) => (
            <div key={k.id} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>{k.nazev}</h3>
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
                  Živý přenos
                </span>
              </div>
              <p className="vedlejsi" style={{ fontSize: 13, margin: '6px 0 10px' }}>
                Umístění: {k.umisteni}
              </p>
              <p style={{ fontSize: 14, margin: '0 0 12px' }}>{k.ucel}</p>
              <p className="vedlejsi" style={{ margin: 0, fontSize: 12 }}>
                Ochrana soukromí: {k.gdprPoznamka}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <VyriditeNaUrade obec={obec}>
          Našli jste v katastru obce ztracené zvíře nebo cenný předmět? Nahlaste nález do podatelny obecního úřadu nebo přímo starostce obce.
        </VyriditeNaUrade>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import dataPortalu from '../../../../../../../obsah/javori-lhota/portal.json'

export const metadata: Metadata = { title: 'Zastupitelský extranet | Administrace' }

export default function AdministraceExtranet() {
  const { extranetZastupitele, gamifikace, developerPortal } = dataPortalu

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <h1>Zastupitelský extranet a portál</h1>
        <a href="/portal" className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          Otevřít veřejný portál
        </a>
      </div>
      <p>
        Správa neveřejných podkladů pro zasedání zastupitelstva obce, diskuze radních, nastavení občanských kreditů a správa API webhooků.
      </p>

      <section style={{ marginTop: 24 }} aria-labelledby="pristi-zasedani">
        <h2 id="pristi-zasedani">Příští zasedání zastupitelstva</h2>
        <div className="panel-bily">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <strong>{extranetZastupitele.pristiZasedani.cislo}</strong>
              <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                {extranetZastupitele.pristiZasedani.datum} · {extranetZastupitele.pristiZasedani.misto}
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
              Průměrná docházka {extranetZastupitele.dochazkaZastupitelu.prumerDochazky}
            </span>
          </div>

          <h3 style={{ margin: '16px 0 8px', fontSize: 15 }}>Podklady k projednání ({extranetZastupitele.pristiZasedani.podklady.length} dokumentů)</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
            {extranetZastupitele.pristiZasedani.podklady.map((p) => (
              <li
                key={p.nazev}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--line)',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.nazev}</div>
                  <div className="vedlejsi" style={{ fontSize: 12 }}>
                    Formát: {p.typ} · Velikost: {p.velikost}
                  </div>
                </div>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: p.duverne ? '#fef7e0' : '#e6f4ea',
                    color: p.duverne ? '#b06000' : '#137333',
                  }}
                >
                  {p.duverne ? 'Důvěrný podklad' : 'Veřejný podklad'}
                </span>
              </li>
            ))}
          </ul>

          <h3 style={{ margin: '16px 0 8px', fontSize: 15 }}>Pracovní diskuze k bodům jednání</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
            {extranetZastupitele.pristiZasedani.diskuze.map((d) => (
              <li
                key={d.tema}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--line)',
                  gap: 8,
                }}
              >
                <span>{d.tema}</span>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  {d.prispevku} příspěvků ({d.posledni})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-gamifikace">
        <h2 id="sprava-gamifikace">Správa občanských kreditů a odměn</h2>
        <div className="mrizka">
          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Pravidla udělování bodů</h3>
            <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
              Body se připisují občanovi po schválení hlášení nebo po zaevidování platby.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {gamifikace.pravidla.map((pr) => (
                <li
                  key={pr.cinnost}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span>{pr.cinnost}</span>
                  <strong style={{ color: '#137333' }}>{pr.body}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-bily">
            <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Dostupné odměny v katalogu</h3>
            <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
              Odměny, které si občan může směnit za své nasbírané kredity.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
              {gamifikace.odmeny.map((o) => (
                <li
                  key={o.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: '1px solid var(--line)',
                    gap: 8,
                  }}
                >
                  <div>
                    <div>{o.nazev}</div>
                    <div className="vedlejsi" style={{ fontSize: 12 }}>
                      {o.dostupnost}
                    </div>
                  </div>
                  <strong>{o.cenaBodu} bodů</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 32 }} aria-labelledby="sprava-api">
        <h2 id="sprava-api">Vývojářské rozhraní a webhooky</h2>
        <div className="panel-bily">
          <h3 style={{ margin: '0 0 6px', fontSize: 17 }}>Aktivní Webhook notifikace</h3>
          <p className="vedlejsi" style={{ fontSize: 13, margin: '0 0 12px' }}>
            Okamžité doručování zpráv externím službám a systémům záchranných složek.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
            {developerPortal.webhooks.map((w) => (
              <li
                key={w.udalost}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--line)',
                  gap: 12,
                }}
              >
                <div>
                  <code style={{ fontSize: 13, background: 'var(--tlumena-svetla)', padding: '2px 6px', borderRadius: 4 }}>
                    {w.udalost}
                  </code>
                  <div className="vedlejsi" style={{ fontSize: 12, marginTop: 4 }}>
                    {w.popis}
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
                  Aktivní
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

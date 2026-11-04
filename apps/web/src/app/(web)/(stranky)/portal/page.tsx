import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'
import dataPortalu from '../../../../../../../obsah/javori-lhota/portal.json'

export const metadata: Metadata = {
  title: 'Portály, gamifikace a otevřená data | Javoří Lhota',
  description: 'Extranet zastupitelů, systém občanských kreditů a vývojářské API s otevřenými daty.',
}

export default async function PortalStranka() {
  const obec = await nactiObec()
  const { extranetZastupitele, gamifikace, developerPortal } = dataPortalu

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Portály a API' }]} />
      <h1 style={{ marginBottom: 4 }}>Zastupitelský portál, občanské body a API</h1>
      <p style={{ maxWidth: 720 }}>
        Pracovní zázemí pro volené zástupce obce, motivační systém občanských bodů a strojově čitelná otevřená data pro vývojáře a chytré domácnosti.
      </p>

      {/* 1. Zastupitelský extranet */}
      <section style={{ marginTop: 36 }} aria-labelledby="sekce-extranet">
        <h2 id="sekce-extranet" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Zastupitelský portál (Extranet)
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          Zabezpečená zóna pro zastupitele obce s neveřejnými pracovními verzemi dokumentů a diskuzním fórem.
        </p>

        <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <span className="vedlejsi" style={{ fontSize: 13 }}>
                Nadcházející jednání
              </span>
              <h3 style={{ margin: '4px 0 0', fontSize: 18 }}>{extranetZastupitele.pristiZasedani.cislo}</h3>
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
              Veřejné zasedání
            </span>
          </div>

          <p style={{ margin: '8px 0 16px', fontSize: 14 }}>
            Termín: <strong>{extranetZastupitele.pristiZasedani.datum}</strong> ({extranetZastupitele.pristiZasedani.misto})
          </p>

          <h4 style={{ fontSize: 15, margin: '16px 0 8px' }}>Pracovní materiály a návrhy usnesení</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {extranetZastupitele.pristiZasedani.podklady.map((doc, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 14,
                }}
              >
                <span>{doc.nazev}</span>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  {doc.typ} · {doc.velikost} {doc.duverne ? '· Důvěrné' : ''}
                </span>
              </li>
            ))}
          </ul>

          <h4 style={{ fontSize: 15, margin: '20px 0 8px' }}>Interní diskuze k projektům</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {extranetZastupitele.pristiZasedani.diskuze.map((disk, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  background: 'var(--surface)',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                }}
              >
                <span><strong>{disk.tema}</strong></span>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  {disk.prispevku} příspěvků · {disk.posledni}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Gamifikace a občanské body */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-gamifikace">
        <h2 id="sekce-gamifikace" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Občanské body a odměny
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          {gamifikace.popis} Body se připisují na účet občana v mobilní aplikaci CodeKom.
        </p>

        <div className="mrizka">
          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>Jak získat body</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {gamifikace.pravidla.map((pr, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: 14,
                  }}
                >
                  <span>{pr.cinnost}</span>
                  <strong style={{ color: '#137333' }}>{pr.body}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>Katalog sousedských odměn</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {gamifikace.odmeny.map((odm) => (
                <li
                  key={odm.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: 14,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{odm.nazev}</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{odm.cenaBodu} bodů</span>
                  </div>
                  <span className="vedlejsi" style={{ fontSize: 12, marginTop: 2 }}>
                    Dostupnost: {odm.dostupnost}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Developer portal a otevřená data */}
      <section style={{ marginTop: 44 }} aria-labelledby="sekce-developer">
        <h2 id="sekce-developer" style={{ fontSize: 22, borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>
          Developer portal, otevřená data a webhooky
        </h2>
        <p className="vedlejsi" style={{ margin: '8px 0 16px' }}>
          {developerPortal.popis} Přístup je bezplatný a nevyžaduje registraci.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {developerPortal.endpointy.map((ep, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px 20px',
                border: '1px solid var(--line)',
                borderRadius: 8,
                background: 'var(--bg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <code
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    background: 'var(--surface)',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {ep.cesta}
                </code>
                <span className="vedlejsi" style={{ fontSize: 13 }}>
                  Formát: {ep.format}
                </span>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 14 }}>{ep.popis}</p>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 18, marginTop: 24, marginBottom: 12 }}>Dostupné Webhooky</h3>
        <div className="mrizka">
          {developerPortal.webhooks.map((wh, idx) => (
            <div key={idx} className="panel" style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: 16 }}>
              <code style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{wh.udalost}</code>
              <p style={{ margin: '6px 0 0', fontSize: 13 }} className="vedlejsi">
                {wh.popis}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 40 }}>
        <VyriditeNaUrade obec={obec}>
          Jste zastupitel a potřebujete obnovit přihlašovací údaje k extranetu nebo API klíče? Kontaktujte administrátora IT systému na obecním úřadě.
        </VyriditeNaUrade>
      </div>
    </>
  )
}

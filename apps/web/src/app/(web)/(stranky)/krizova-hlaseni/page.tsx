import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { UROVNE } from '@codekom/tokeny'
import type { KrizoveHlaseni } from '@codekom/typy'
import { bezpecnyOdkaz, formatDateTime, tykaSe } from '@codekom/typy/pravidla'
import { IkonaUrovne } from '@/components/krize/IkonaUrovne'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Krizová hlášení' }

function Hlaseni({ h, casti }: { h: KrizoveHlaseni; casti: { slug: string; nazev: string }[] }) {
  const u = UROVNE[h.uroven]
  const odkaz = bezpecnyOdkaz(h.odkazUrl)
  const tyka = tykaSe(h.casti, casti)
  return (
    <article style={{ background: u.bg, color: u.ink, borderLeft: `6px solid ${u.edge}`, padding: '16px 20px', margin: '0 0 16px', borderRadius: 4 }}>
      <h3 style={{ margin: 0, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <IkonaUrovne uroven={h.uroven} className="mt-1 size-[22px] shrink-0" />
        <span>
          {u.nazev}: {h.titulek}
        </span>
      </h3>
      <p style={{ margin: '8px 0 0' }}>{h.text}</p>
      {tyka ? <p style={{ margin: '4px 0 0' }}>Týká se: {tyka}</p> : null}
      <p style={{ margin: '4px 0 0' }}>
        Platí od {formatDateTime(h.platiOd)}
        {h.platiDo ? ` do ${formatDateTime(h.platiDo)}` : ' do odvolání'}
      </p>
      {odkaz ? (
        <p style={{ margin: '4px 0 0' }}>
          <a href={odkaz} style={{ color: 'inherit', fontWeight: 600 }}>
            {h.odkazText ?? 'Více informací'}
          </a>
        </p>
      ) : null}
    </article>
  )
}

export default async function KrizovaHlaseni() {
  const obec = await nactiObec()
  const { aktivni, archiv } = await (await zdroj()).vsechnaKrize(slugObce(), demoTed())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Krizová hlášení' }]} />
      <h1>Krizová hlášení</h1>
      <p>
        Hlášení obce nenahrazují varovný systém Integrovaného záchranného systému. Při ohrožení života nebo zdraví volejte 112 a řiďte se
        pokyny záchranářů a sirén.
      </p>
      <h2>Platí teď</h2>
      {aktivni.length === 0 ? <p>Teď neplatí žádné hlášení.</p> : aktivni.map((h) => <Hlaseni key={h.id} h={h} casti={obec.castiObce} />)}
      <h2>Archiv</h2>
      {archiv.length === 0 ? (
        <p>Archiv je prázdný.</p>
      ) : (
        archiv.map((h) => <Hlaseni key={h.id} h={h} casti={obec.castiObce} />)
      )}
    </>
  )
}

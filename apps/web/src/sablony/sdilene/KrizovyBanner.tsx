import { krizovaHlaseni as semenoKrize, demoTed } from '@codekom/demo-data'
import { UROVNE } from '@codekom/tokeny'
import type { KrizoveHlaseni } from '@codekom/typy'
import { bezpecnyOdkaz, klicSkryti, lzeSkryt, tykaSe } from '@codekom/typy/pravidla'
import { IkonaUrovne } from '@/components/krize/IkonaUrovne'
import { SkrytHlaseni } from '@/components/krize/SkrytHlaseni'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce, stavUkazky } from '@/lib/web'
import { SledovaniKrize } from './SledovaniKrize'

/**
 * Krizový banner: nejvýš jedno hlášení, to nejzávažnější. Úroveň je napsaná slovem,
 * barva je doplněk. Krizovou situaci nejde skrýt, informaci a výstrahu ano.
 * V ukázce může pruh banner vynutit; takový stav se pollingem nepřepisuje.
 */
export async function KrizovyBanner() {
  const stav = await stavUkazky()
  const obec = await nactiObec()

  let hlavni: KrizoveHlaseni | null
  let dalsich = 0
  const vynuceno = stav.krize !== undefined
  if (stav.krize === 'off') {
    hlavni = null
  } else if (stav.krize) {
    const uroven = stav.krize
    hlavni = semenoKrize.find((h) => h.uroven === uroven) ?? null
  } else {
    const k = await (await zdroj()).krize(slugObce(), demoTed())
    hlavni = k.hlavni
    dalsich = k.dalsich
  }

  const sledovani = vynuceno ? null : <SledovaniKrize obec={obec.slug} klic={hlavni ? klicSkryti(hlavni) : null} />
  if (!hlavni) return sledovani

  const u = UROVNE[hlavni.uroven]
  const odkaz = bezpecnyOdkaz(hlavni.odkazUrl)
  const casti = tykaSe(hlavni.casti, obec.castiObce)
  const krize = hlavni.uroven === 'emergency'

  return (
    <>
      <section
        className="alert"
        aria-labelledby="krize-titulek"
        data-uroven={hlavni.uroven}
        style={{ background: u.bg, color: u.ink, borderBottom: `4px solid ${u.edge}`, fontSize: 17, lineHeight: 1.5 }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px clamp(16px, 4vw, 32px)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <IkonaUrovne uroven={hlavni.uroven} className="mt-px size-[22px] shrink-0" />
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 id="krize-titulek" style={{ margin: 0, fontSize: 17, lineHeight: 1.35, fontWeight: 600 }}>
              {u.nazev}: {hlavni.titulek}
            </h2>
            <p style={{ margin: '2px 0 0' }}>
              {hlavni.text}{' '}
              {odkaz ? (
                <a href={odkaz} style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}>
                  {hlavni.odkazText ?? 'Více informací'}
                </a>
              ) : null}
            </p>
            {casti ? <p style={{ margin: '2px 0 0' }}>Týká se: {casti}</p> : null}
            {dalsich > 0 ? (
              <p style={{ margin: '2px 0 0' }}>
                <a href="/krizova-hlaseni" style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}>
                  Další hlášení: {dalsich}
                </a>
              </p>
            ) : null}
          </div>
          {lzeSkryt(hlavni) && !krize ? <SkrytHlaseni klic={klicSkryti(hlavni)} titulek={hlavni.titulek} /> : null}
        </div>
      </section>
      {sledovani}
    </>
  )
}

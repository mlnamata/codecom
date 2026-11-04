import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

type Params = Promise<{ slug: string }>

const ZPUSOB = { online: 'Online', urad: 'Na úřadě', samo: 'Proběhne samo' } as const

async function najdi(slug: string) {
  return (await (await zdroj()).zivotniSituace(slugObce())).find((s) => s.slug === slug) ?? null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const s = await najdi((await params).slug)
  return { title: s?.nazev ?? 'Životní situace nenalezena' }
}

export default async function Situace({ params }: { params: Params }) {
  const obec = await nactiObec()
  const s = await najdi((await params).slug)
  if (!s) notFound()
  const sluzby = await (await zdroj()).sluzby(slugObce())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Životní situace', href: '/zivotni-situace' }, { nazev: s.kratkyNazev }]} />
      <h1>{s.nazev}</h1>
      <p>{s.kdoPoradi}</p>
      <ol style={{ paddingLeft: 24 }}>
        {[...s.kroky]
          .sort((a, b) => a.poradi - b.poradi)
          .map((k) => {
            const sluzba = k.sluzba ? sluzby.find((x) => x.id === k.sluzba) : null
            return (
              <li key={k.poradi} style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, margin: '0 0 4px' }}>{k.nazev}</h2>
                <p style={{ margin: '0 0 4px' }}>
                  <span className="stitek">{ZPUSOB[k.zpusob]}</span>
                </p>
                <p style={{ margin: 0 }}>{k.text}</p>
                {sluzba ? (
                  <p style={{ margin: '4px 0 0' }}>
                    <a href={sluzba.odkaz ?? `/sluzby#${sluzba.slug}`}>{sluzba.nazev}</a>
                  </p>
                ) : null}
              </li>
            )
          })}
      </ol>
      <VyriditeNaUrade obec={obec}>{s.uradCesta}</VyriditeNaUrade>
    </>
  )
}

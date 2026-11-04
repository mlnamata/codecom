import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Služby obce' }

export default async function Sluzby() {
  const obec = await nactiObec()
  const sluzby = await (await zdroj()).sluzby(slugObce())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Služby' }]} />
      <h1>Služby obce</h1>
      <p>Co můžete vyřídit online a co na úřadě. U každé služby je i cesta přes úřad.</p>
      <ul className="seznam">
        {sluzby.map((s) => (
          <li key={s.id} id={s.slug}>
            <h2 style={{ fontSize: 21 }}>{s.odkaz ? <a href={s.odkaz}>{s.nazev}</a> : s.nazev}</h2>
            <p style={{ margin: '0 0 4px' }}>{s.popis}</p>
            <p style={{ margin: 0 }} className="vedlejsi">
              {s.zpusob === 'online' ? 'Online, nebo na úřadě: ' : 'Na úřadě: '}
              {s.uradCesta}
            </p>
          </li>
        ))}
      </ul>
      <VyriditeNaUrade obec={obec} />
    </>
  )
}

import type { Metadata } from 'next'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Zastupitelstvo' }

export default async function Zastupitelstvo() {
  const z = await zdroj()
  const zastupitele = await z.zastupitele(slugObce())
  const obdobi = zastupitele[0]?.obdobi
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Zastupitelstvo' }]} />
      <h1>Zastupitelstvo</h1>
      {obdobi ? <p>Volební období {obdobi}.</p> : null}
      <ul className="seznam">
        {zastupitele.map((p) => {
          const jmeno = [p.titulPred, p.jmeno].filter(Boolean).join(' ') + (p.titulZa ? `, ${p.titulZa}` : '')
          return (
            <li key={p.id}>
              <h2 style={{ fontSize: 21 }}>{jmeno}</h2>
              <p style={{ margin: 0 }}>
                {p.funkceText.charAt(0).toUpperCase() + p.funkceText.slice(1)}
                {p.vybory ? `, ${p.vybory}` : ''}
                {p.zvolenZa ? `, zvolen za ${p.zvolenZa}` : ''}
              </p>
              {p.uredniHodiny ? <p style={{ margin: 0 }}>Přijímá: {p.uredniHodiny}</p> : null}
              {p.email || p.telefon ? (
                <p style={{ margin: 0 }} className="vedlejsi">
                  {[p.telefon && `telefon ${p.telefon}`, p.email && `e-mail ${p.email}`].filter(Boolean).join(', ')}
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>
      <p>
        Pozvánky na zasedání a usnesení jsou na <a href="/uredni-deska?kategorie=zastupitelstvo">úřední desce</a>.
      </p>
    </>
  )
}

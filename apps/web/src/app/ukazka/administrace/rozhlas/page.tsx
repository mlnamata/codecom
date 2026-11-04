import type { Metadata } from 'next'
import { RozhlasKlient } from './RozhlasKlient'

export const metadata: Metadata = { title: 'Rozhlas, SMS brána a zpravodaj | Administrace' }
export const dynamic = 'force-dynamic'

export default function RozhlasPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Obecní rozhlas, SMS brána, zpravodaj a ankety</h1>
        <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
          Multikanálová komunikace bez cizích služeb
        </span>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Integrované komunikační centrum obce Javoří Lhota. Úředníci nemusí platit ani otevírat externí nástroje pro rozesílání SMS, ovládání bezdrátového rozhlasu, tvorbu anket nebo skládání tištěného obecního zpravodaje — vše odešlete z jednoho místa a rukopis zpravodaje stáhnete přímo pro Microsoft Word.
      </p>

      <RozhlasKlient />
    </>
  )
}

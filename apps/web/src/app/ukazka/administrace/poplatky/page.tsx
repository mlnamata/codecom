import type { Metadata } from 'next'
import { PoplatkyKlient } from './PoplatkyKlient'

export const metadata: Metadata = { title: 'Poplatky, pokladna a dlužníci | Administrace' }
export const dynamic = 'force-dynamic'

export default function PoplatkyPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Místní poplatky, obecní pokladna a evidence dlužníků</h1>
        <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
          Integrovaná pokladna a správa poplatků
        </span>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Kompletní správa místních poplatků za komunální odpad, psy, stočné a hrobová místa přímo v administraci obce. Účetní ani pokladní nemusí přepínat do externího účetního systému — v jednom okně přijímají hotovost na přepážce (PPD/VPD), odesílají QR upomínky neplatičům, generují platební výměry do Microsoft Word a exportují pokladní knihu do Microsoft Excel.
      </p>

      <PoplatkyKlient />
    </>
  )
}

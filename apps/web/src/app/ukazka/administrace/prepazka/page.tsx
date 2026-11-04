import type { Metadata } from 'next'
import { PrepazkaKlient } from './PrepazkaKlient'

export const metadata: Metadata = { title: 'Přepážka, matrika a revize | Administrace' }
export const dynamic = 'force-dynamic'

export default function PrepazkaPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Přepážka úřadu, ověřovací kniha, revize a jubilea</h1>
        <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
          Každodenní agenda obecního úřadu
        </span>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Pracoviště pro přepážkovou agendu obecního úřadu. Zahrnuje digitální ověřovací knihu pro vidimaci a legalizaci s tiskem doložek do Microsoft Word, centrální lhůtník technických revizí obecních budov (škola, kotelna, komíny, hřiště, AED) a evidenci životních jubileí občanů pro Sbor pro občanské záležitosti (SPOZ).
      </p>

      <PrepazkaKlient />
    </>
  )
}

import type { Metadata } from 'next'
import { SmlouvyKlient } from './SmlouvyKlient'

export const metadata: Metadata = { title: 'Smlouvy, faktury a Registr smluv | Administrace' }
export const dynamic = 'force-dynamic'

export default function SmlouvyPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Smlouvy, došlé faktury, rozpočet a Registr smluv</h1>
        <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
          Napojení na ISRS a bankovní příkazy
        </span>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Kompletní správa obecních smluv, objednávek, došlých faktur a rozpočtu obce na jednom místě. Starostka ani účetní nemusí opouštět systém kvůli přihlašování do Registru smluv MVČR nebo externího programu na schvalování faktur — smlouvy s doložkou dle § 41 zákona o obcích se generují přímo pro Microsoft Word a schválené faktury lze vyexportovat do Microsoft Excel a bankovnictví.
      </p>

      <SmlouvyKlient />
    </>
  )
}

import type { Metadata } from 'next'
import { PostaKlient } from './PostaKlient'

export const metadata: Metadata = { title: 'Obecní e-mail, ISDS a pošta | Administrace' }
export const dynamic = 'force-dynamic'

export default function PostaPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Obecní e-mail, datová schránka a e-podatelna</h1>
        <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
          Jednotné pracoviště úřadu bez externích aplikací
        </span>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Kompletní komunikační a spisový uzel obce. Starostka, tajemník i podatelna vyřizují veškerou úřední agendu přímo v CodeKom bez nutnosti odbíhat do externích aplikací. Zprávy z e-mailu a datové schránky ISDS lze jedním kliknutím převést na úřední desku, vytvořit z nich úkol pro technické služby nebo vygenerovat kompletní úřední rozhodnutí připravené pro Microsoft Word a exportovat podací deník pro Microsoft Excel.
      </p>

      {/* Přehled 3 integrovaných výhod */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ padding: '12px 16px', background: '#ffffff', border: '1px solid var(--line)', borderRadius: 8 }}>
          <strong style={{ display: 'block', fontSize: 13.5, color: 'var(--ink)', marginBottom: 2 }}>
            1. Integrovaný e-mail a ISDS
          </strong>
          <span className="vedlejsi" style={{ fontSize: 12.5 }}>
            Přímý příjem zpráv ze schránek @javorilhota.cz i státní datové schránky ISDS bez přepínání na webové portály.
          </span>
        </div>

        <div style={{ padding: '12px 16px', background: '#ffffff', border: '1px solid var(--line)', borderRadius: 8 }}>
          <strong style={{ display: 'block', fontSize: 13.5, color: 'var(--ink)', marginBottom: 2 }}>
            2. Provázanost s Microsoft Office
          </strong>
          <span className="vedlejsi" style={{ fontSize: 12.5 }}>
            Generování podkladů a rozhodnutí se všemi náležitostmi (č.j., spis, hlavička) pro MS Word a export podacího deníku do MS Excel.
          </span>
        </div>

        <div style={{ padding: '12px 16px', background: '#ffffff', border: '1px solid var(--line)', borderRadius: 8 }}>
          <strong style={{ display: 'block', fontSize: 13.5, color: 'var(--ink)', marginBottom: 2 }}>
            3. Rychlé obecní akce 1 kliknutím
          </strong>
          <span className="vedlejsi" style={{ fontSize: 12.5 }}>
            Z došlé zprávy okamžitě vyvěsíte přílohu na úřední desku, založíte závadu pro údržbu nebo odpovíte úřední šablonou.
          </span>
        </div>
      </div>

      <PostaKlient />
    </>
  )
}

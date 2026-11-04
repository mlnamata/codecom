import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'
import { VELIKOST_OG, fontyOg } from '@/lib/og'
import { najdiSablonu, sablonyGalerie } from '@/lib/sablony'

export const alt = 'Snímek šablony webu obce CodeKom'
export const size = VELIKOST_OG
export const contentType = 'image/png'
export const generateStaticParams = () => sablonyGalerie().map((s) => ({ klic: s.klic }))

export default async function Obrazek({ params }: { params: Promise<{ klic: string }> }) {
  const s = najdiSablonu((await params).klic)
  const snimek = s ? await sharp(readFileSync(resolve(process.cwd(), 'public', s.palety[0]!.snimek.slice(1)))).resize(760).png().toBuffer() : null
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', padding: 64, gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 16 }}>
          <div style={{ color: '#bdbdbd', fontFamily: 'Montserrat', fontWeight: 500, fontSize: 28 }}>Šablona webu obce</div>
          <div style={{ color: '#fff', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 72 }}>{s?.nazev ?? 'CodeKom'}</div>
          <div style={{ color: '#bdbdbd', fontFamily: 'Montserrat', fontWeight: 500, fontSize: 26 }}>CodeKom</div>
        </div>
        {snimek ? <img src={`data:image/png;base64,${snimek.toString('base64')}`} width={620} height={436} alt="" style={{ border: '1px solid #444' }} /> : null}
      </div>
    ),
    { ...size, fonts: fontyOg() },
  )
}

import { ImageResponse } from 'next/og'
import { VELIKOST_OG, fontyOg, logoBileDataUrl } from '@/lib/og'

export const alt = 'CodeKom, Tvoříme kódy pro lidi.'
export const size = VELIKOST_OG
export const contentType = 'image/png'

export default function Obrazek() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <img src={logoBileDataUrl()} width={420} height={281} alt="" />
        <div style={{ color: '#bdbdbd', fontFamily: 'Montserrat', fontWeight: 500, fontSize: 30 }}>Web, úřední deska a aplikace pro obce</div>
      </div>
    ),
    { ...size, fonts: fontyOg() },
  )
}

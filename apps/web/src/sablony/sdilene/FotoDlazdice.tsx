import type { CSSProperties } from 'react'
import { AiStitek } from './AiStitek'

/**
 * Doplňková fotografie uvnitř obsahu šablony (dlaždice, karta). Na rozdíl od úvodní
 * fotky (Foto) není samostatnou oblastí stránky. Fotky jsou vygenerované AI, proto štítek AI.
 * `soubor` je název souboru v /demo/foto.
 */
export function FotoDlazdice({ soubor, alt, styl }: { soubor: string; alt: string; styl?: CSSProperties }) {
  return (
    <figure style={{ position: 'relative', margin: 0, overflow: 'hidden', ...styl }}>
      <img src={`/demo/foto/${soubor}`} alt={alt} width={1600} height={900} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      <figcaption style={{ position: 'absolute', right: 12, bottom: 12, margin: 0, padding: 0, zIndex: 1 }}>
        <AiStitek velikost={30} />
      </figcaption>
    </figure>
  )
}

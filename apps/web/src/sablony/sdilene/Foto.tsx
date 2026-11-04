import type { CSSProperties } from 'react'
import { sablona } from '@codekom/tokeny'
import { POPISY_FOTEK } from './popisy-fotek'
import { AiStitek } from './AiStitek'

/**
 * Fotografický úvod místo kreslené ilustrace. Fotka má kruhový štítek AI.
 * Text šablony leží na plochách šablony, ne přímo na fotce.
 */
export function Foto({ sablona: klic, styl }: { sablona: string; styl: CSSProperties }) {
  const s = sablona(klic)
  const src = `/demo/foto/sablona-${s.cislo}-${klic}.webp`
  return (
    <figure className="foto-uvod" style={{ position: 'relative', ...styl, margin: 0, overflow: 'hidden' }}>
      <img
        src={src}
        alt={POPISY_FOTEK[klic] ?? 'Ilustrační fotografie obce'}
        width={1600}
        height={900}
        fetchPriority="high"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <figcaption
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          margin: 0,
          padding: 0,
          zIndex: 1,
        }}
      >
        <AiStitek velikost={34} />
      </figcaption>
    </figure>
  )
}

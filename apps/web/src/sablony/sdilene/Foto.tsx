import type { CSSProperties } from 'react'
import { sablona } from '@codekom/tokeny'
import { POPISY_FOTEK } from './popisy-fotek'

/**
 * Fotografický úvod místo kreslené ilustrace. Fotka je vygenerovaná AI, proto má vždy
 * viditelný popisek. Text šablony leží na plochách šablony, ne přímo na fotce.
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
          right: 8,
          bottom: 8,
          padding: '4px 8px',
          borderRadius: 4,
          background: '#1A1A18',
          color: '#FFFFFF',
          fontSize: 14,
          lineHeight: 1.4,
          zIndex: 1,
        }}
      >
        Ilustrační fotografie vytvořená umělou inteligencí
      </figcaption>
    </figure>
  )
}

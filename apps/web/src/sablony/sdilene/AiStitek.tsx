import type { CSSProperties } from 'react'

/**
 * Kruhový štítek AI jako vodoznak (nahrazuje původní textový nápis). Text je jen pro čtečky obrazovky.
 * Zobrazuje se v rohu ilustrační fotografie i u odpovědí AI asistenta.
 */
export function AiStitek({
  velikost = 32,
  popisek = 'Ilustrační fotografie vytvořená umělou inteligencí',
  styl,
}: {
  velikost?: number
  popisek?: string
  styl?: CSSProperties
}) {
  return (
    <span
      aria-label={popisek}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: velikost,
        height: velikost,
        borderRadius: '50%',
        background: 'rgba(26, 26, 24, 0.72)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        flexShrink: 0,
        ...styl,
      }}
    >
      <img
        src="/ai-stitek.png"
        alt="AI"
        width={velikost}
        height={velikost}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </span>
  )
}

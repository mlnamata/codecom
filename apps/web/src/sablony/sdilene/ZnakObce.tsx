/** Znak ukázkové obce (konstanta ZNAK z design/generator/build.py). Dekorativní, název obce je vždy vedle v textu. */
export function ZnakObce({ velikost }: { velikost: number }) {
  return (
    <svg width={velikost} height={Math.round(velikost * 1.2)} viewBox="0 0 40 48" aria-hidden="true" focusable="false" style={{ flex: '0 0 auto' }}>
      <path d="M2 2h36v20c0 12-8 20-18 24C10 42 2 34 2 22z" fill="#2E6B3F" />
      <path
        d="M20 5l2.5 5.5 4-2-1 6 5-1.5-2.5 5 3.5 1.5-6 3 1 3.5-5-1V31h-3v-6l-5 1 1-3.5-6-3 3.5-1.5-2.5-5 5 1.5-1-6 4 2z"
        fill="#E2B33C"
      />
      <path d="M10 37c2.2-1.6 4.4-1.6 6.7 0s4.4 1.6 6.7 0 4.4-1.6 6.6 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Stejný znak jako soubor SVG (pro /api/obce a znakUrl). */
export const ZNAK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">' +
  '<path d="M2 2h36v20c0 12-8 20-18 24C10 42 2 34 2 22z" fill="#2E6B3F"/>' +
  '<path d="M20 5l2.5 5.5 4-2-1 6 5-1.5-2.5 5 3.5 1.5-6 3 1 3.5-5-1V31h-3v-6l-5 1 1-3.5-6-3 3.5-1.5-2.5-5 5 1.5-1-6 4 2z" fill="#E2B33C"/>' +
  '<path d="M10 37c2.2-1.6 4.4-1.6 6.7 0s4.4 1.6 6.7 0 4.4-1.6 6.6 0" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>'

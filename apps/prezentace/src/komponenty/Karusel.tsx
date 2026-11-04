'use client'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

/**
 * Vodorovný pás položek s tlačítky Předchozí a Další.
 * Bez JavaScriptu zůstane obyčejný posuvný pás, šipkami jde posouvat i z klávesnice.
 * Položky (`<li>`) si šířku a `snap-start` nastavují samy.
 */
export function Karusel({ children, popis, popisPasu }: { children: ReactNode; popis: string; popisPasu: string }) {
  const pas = useRef<HTMLUListElement>(null)
  const idPasu = useId()
  const [naZacatku, setNaZacatku] = useState(true)
  const [naKonci, setNaKonci] = useState(false)
  const [pozice, setPozice] = useState({ od: 1, do: 1, celkem: 0 })

  useEffect(() => {
    const el = pas.current
    if (!el) return
    const aktualizuj = () => {
      setNaZacatku(el.scrollLeft <= 4)
      setNaKonci(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
      const prvni = el.children[0] as HTMLElement | undefined
      const celkem = el.children.length
      if (!prvni || !celkem) return
      const krok = prvni.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')
      const od = Math.min(celkem, Math.round(el.scrollLeft / krok) + 1)
      const videt = Math.max(1, Math.floor((el.clientWidth + 8) / krok))
      setPozice({ od, do: Math.min(celkem, od + videt - 1), celkem })
    }
    aktualizuj()
    el.addEventListener('scroll', aktualizuj, { passive: true })
    window.addEventListener('resize', aktualizuj)
    return () => {
      el.removeEventListener('scroll', aktualizuj)
      window.removeEventListener('resize', aktualizuj)
    }
  }, [])

  const posun = (smer: 1 | -1) => {
    const el = pas.current
    if (!el) return
    const klid = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: smer * el.clientWidth * 0.9, behavior: klid ? 'auto' : 'smooth' })
  }

  return (
    <div role="region" aria-roledescription="karusel" aria-label={popis}>
      <div className="flex items-center justify-end gap-2">
        {pozice.celkem ? (
          <p className="mr-auto text-[15px] text-sediva" aria-hidden="true">
            {pozice.od === pozice.do ? pozice.od : `${pozice.od}–${pozice.do}`} z {pozice.celkem}
          </p>
        ) : null}
        <button type="button" onClick={() => posun(-1)} disabled={naZacatku} aria-controls={idPasu} className="tlacitko-obrys !min-h-11 !px-5 disabled:cursor-default disabled:opacity-40">
          Předchozí
        </button>
        <button type="button" onClick={() => posun(1)} disabled={naKonci} aria-controls={idPasu} className="tlacitko-obrys !min-h-11 !px-5 disabled:cursor-default disabled:opacity-40">
          Další
        </button>
      </div>
      <ul
        id={idPasu}
        ref={pas}
        tabIndex={0}
        aria-label={popisPasu}
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 outline-offset-4 motion-reduce:scroll-auto"
      >
        {children}
      </ul>
    </div>
  )
}

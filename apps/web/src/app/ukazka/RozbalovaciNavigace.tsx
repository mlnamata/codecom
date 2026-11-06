'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

/**
 * Boční navigace administrace. Na širokém displeji je to lepivý panel s vlastním posuvníkem.
 * Na telefonu ji otevře tlačítko Menu jako vysouvací panel přes obsah: Esc a tlačítko Zavřít
 * ho zavřou, fokus se vrátí na tlačítko Menu, po přechodu na jinou stránku se zavře sám.
 * Administrace obce přidává značku nahoru a kartu dolů (`zahlavi`, `paticka`), správa CodeKom ne.
 */
export function RozbalovaciNavigace({
  popisek,
  aktualni,
  zahlavi,
  paticka,
  children,
}: {
  popisek: string
  aktualni?: string
  /** Volitelná značka nad menu (znak a název obce). */
  zahlavi?: ReactNode
  /** Volitelná karta pod menu. */
  paticka?: ReactNode
  children: ReactNode
}) {
  const id = useId()
  const tlacitko = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const cesta = usePathname()
  // Panel si pamatuje stránku, na které se otevřel; po přechodu jinam je tím zavřený.
  const [otevrenoNa, setOtevrenoNa] = useState<string | null>(null)
  const otevreno = otevrenoNa === cesta
  const setOtevreno = (o: boolean) => setOtevrenoNa(o ? cesta : null)

  useEffect(() => {
    if (!otevreno) return
    panel.current?.querySelector<HTMLElement>('a, button')?.focus()
    const priKlavese = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOtevrenoNa(null)
        tlacitko.current?.focus()
      }
    }
    document.addEventListener('keydown', priKlavese)
    document.documentElement.classList.add('admin-menu-otevreno')
    return () => {
      document.removeEventListener('keydown', priKlavese)
      document.documentElement.classList.remove('admin-menu-otevreno')
    }
  }, [otevreno])

  const zavri = () => {
    setOtevreno(false)
    tlacitko.current?.focus()
  }

  return (
    <nav aria-label={popisek} className="admin__navigace">
      <button ref={tlacitko} type="button" className="admin__menu" aria-expanded={otevreno} aria-controls={id} onClick={() => setOtevreno(!otevreno)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="admin__menu-titulek">Menu</span>
        {aktualni ? <span className="admin__menu-stranka">{aktualni}</span> : null}
      </button>
      {otevreno ? <div className="admin__clona" aria-hidden="true" onClick={zavri} /> : null}
      <div ref={panel} id={id} className="admin__navigace-obsah" data-otevreno={otevreno ? 'true' : 'false'}>
        <div className="admin__navigace-hlava">
          <span>{popisek}</span>
          <button type="button" className="admin__zavrit" onClick={zavri}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
            Zavřít
          </button>
        </div>
        {zahlavi}
        {zahlavi || paticka ? <div className="admin__navigace-seznam">{children}</div> : children}
        {paticka}
      </div>
    </nav>
  )
}

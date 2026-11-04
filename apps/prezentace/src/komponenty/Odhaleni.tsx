'use client'
import { useEffect, useRef, type ReactNode } from 'react'

/** Obsah se jemně vysune, když dojede do obrazovky. Bez JavaScriptu a s omezeným pohybem je vidět hned. */
export function Odhaleni({ children, className = '', zpozdeni = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; zpozdeni?: number; as?: 'div' | 'li' | 'section' | 'article' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('videt')
      return
    }
    const o = new IntersectionObserver(
      (z) => {
        if (z.some((x) => x.isIntersecting)) {
          el.classList.add('videt')
          o.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return (
    <Tag ref={ref as never} className={`odhaleni ${className}`} style={zpozdeni ? { transitionDelay: `${zpozdeni}ms` } : undefined}>
      {children}
    </Tag>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface Odpoved {
  hlavni: { id: string; updatedAt: string; uroven: string; urovenNazev: string; titulek: string } | null
}

/**
 * Každých 60 s (jen když je stránka vidět) se zeptá na aktivní hlášení. Nové nebo
 * změněné hlášení oznámí v oblasti role="status" (krizi důrazně) a obnoví stránku.
 */
export function SledovaniKrize({ obec, klic }: { obec: string; klic: string | null }) {
  const router = useRouter()
  const [zprava, setZprava] = useState('')
  const [dulezite, setDulezite] = useState(false)
  const posledni = useRef(klic)

  useEffect(() => {
    posledni.current = klic
  }, [klic])

  useEffect(() => {
    let zruseno = false
    const zkontroluj = async () => {
      if (document.visibilityState !== 'visible') return
      try {
        const r = await fetch(`/api/krize/aktivni?obec=${encodeURIComponent(obec)}`, { cache: 'no-store' })
        if (!r.ok || zruseno) return
        const data = (await r.json()) as Odpoved
        const novy = data.hlavni ? `krize:${data.hlavni.id}:${data.hlavni.updatedAt}` : null
        if (novy !== posledni.current) {
          posledni.current = novy
          setDulezite(data.hlavni?.uroven === 'emergency')
          setZprava(data.hlavni ? `Nové hlášení. ${data.hlavni.urovenNazev}: ${data.hlavni.titulek}` : 'Hlášení skončilo.')
          router.refresh()
        }
      } catch {
        // Bez sítě zůstane zobrazené poslední hlášení.
      }
    }
    const id = window.setInterval(zkontroluj, 60_000)
    document.addEventListener('visibilitychange', zkontroluj)
    return () => {
      zruseno = true
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', zkontroluj)
    }
  }, [obec, router])

  return (
    <div role="status" aria-live={dulezite ? 'assertive' : 'polite'} className="sr-only">
      {zprava}
    </div>
  )
}

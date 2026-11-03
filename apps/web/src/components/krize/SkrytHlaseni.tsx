'use client'

import { useEffect, useState } from 'react'

const read = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

const write = (key: string): void => {
  try {
    window.localStorage.setItem(key, '1')
  } catch {
    // Private mode or blocked storage: the banner hides for this page view only.
  }
}

/**
 * "Skrýt" button for information and warning banners. It renders only after hydration,
 * so visitors without JavaScript never see a button that does nothing. The dismissal is
 * remembered per alert version: an edited alert shows again.
 */
export function SkrytHlaseni({ klic, titulek }: { klic: string; titulek: string }) {
  const [ready, setReady] = useState(false)
  const [button, setButton] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    const section = button?.closest('section')
    if (!section) return
    section.hidden = read(klic)
    setReady(true)
  }, [button, klic])

  return (
    <button
      ref={setButton}
      type="button"
      hidden={!ready}
      aria-label={`Skrýt hlášení: ${titulek}`}
      onClick={() => {
        write(klic)
        const section = button?.closest('section')
        if (section) section.hidden = true
        document.getElementById('obsah')?.focus()
      }}
      className="-my-1 ml-auto inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded px-3 font-semibold underline-offset-2 hover:underline focus-visible:outline-current"
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
      Skrýt
    </button>
  )
}

import Image from 'next/image'

/** Snímek úvodní stránky šablony v tenkém rámu okna prohlížeče. */
export function Snimek({ src, alt, priorita = false, sizes = '(min-width: 1120px) 280px, 50vw' }: { src: string; alt: string; priorita?: boolean; sizes?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="flex h-7 items-center gap-1.5 border-b border-black/5 bg-[#f3f4f8] px-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#d4d7e0]" />
        <span className="size-2.5 rounded-full bg-[#d4d7e0]" />
        <span className="size-2.5 rounded-full bg-[#d4d7e0]" />
      </div>
      <Image src={src} alt={alt} width={1280} height={900} sizes={sizes} priority={priorita} className="block h-auto w-full" />
    </div>
  )
}

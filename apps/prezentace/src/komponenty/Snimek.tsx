import Image from 'next/image'

/** Snímek úvodní stránky šablony v tenkém rámu okna prohlížeče. */
export function Snimek({ src, alt, priorita = false, sizes = '(min-width: 1120px) 280px, 50vw' }: { src: string; alt: string; priorita?: boolean; sizes?: string }) {
  return (
    <div className="border border-linka bg-white">
      <div className="flex h-6 items-center gap-1.5 border-b border-linka px-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-linka" />
        <span className="size-2 rounded-full bg-linka" />
        <span className="size-2 rounded-full bg-linka" />
      </div>
      <Image src={src} alt={alt} width={1280} height={900} sizes={sizes} priority={priorita} className="block h-auto w-full" />
    </div>
  )
}

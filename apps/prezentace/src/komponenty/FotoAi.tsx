import Image from 'next/image'

/** Fotka vytvořená umělou inteligencí. Poznámka pod obrazem je povinná. */
export function FotoAi({ src, alt, priorita = false, className = '', pomer = 'aspect-[16/10]' }: { src: string; alt: string; priorita?: boolean; className?: string; pomer?: string }) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-plocha ${pomer}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1120px) 560px, 100vw" className="object-cover" priority={priorita} />
      </div>
      <figcaption className="stitek mt-2">Ilustrační fotografie vytvořená umělou inteligencí</figcaption>
    </figure>
  )
}

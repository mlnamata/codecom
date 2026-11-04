/** Logo CodeKom: vektorový monogram a název z brand/svg (scripts/logo-svg.mjs). */
export function Logo({ bile = false }: { bile?: boolean }) {
  const b = bile ? 'bile' : 'cerne'
  return (
    <span className="inline-flex items-center gap-3">
      <img src={`/brand-svg/znak-${b}.svg`} alt="" width={570} height={430} className="h-9 w-auto" />
      <img src={`/brand-svg/nazev-${b}.svg`} alt="CodeKom" width={535} height={87} className="h-[22px] w-auto" />
    </span>
  )
}

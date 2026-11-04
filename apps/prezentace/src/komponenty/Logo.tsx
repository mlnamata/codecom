/** Logo CodeKom: monogram a název, oříznuté z PNG v brand/. */
export function Logo({ bile = false }: { bile?: boolean }) {
  const b = bile ? 'bily' : 'cerny'
  return (
    <span className="inline-flex items-center gap-3">
      <img src={`/logo/znak-${b}.png`} alt="" width={564} height={423} className="h-9 w-auto" />
      <img src={`/logo/nazev-${b}.png`} alt="CodeKom" width={528} height={81} className="h-[22px] w-auto" />
    </span>
  )
}

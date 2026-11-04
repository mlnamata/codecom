import { notFound, permanentRedirect } from 'next/navigation'

/** Řídicí panel se přesunul do administrace. Stará adresa z odkazů a záložek přesměruje. */
export default function StaryPanel() {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
  permanentRedirect('/ukazka/administrace/panel')
}

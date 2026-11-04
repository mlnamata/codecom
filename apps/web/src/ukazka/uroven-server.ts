import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_UROVNE, jeUroven, type Uroven } from './uroven'
import { predplatneObce } from '@/lib/data/predplatne'

/** Úroveň v ukázce: volba návštěvníka z cookie, jinak úroveň z předplatného obce. */
export async function urovenAdministrace(): Promise<Uroven> {
  const v = (await cookies()).get(COOKIE_UROVNE)?.value
  if (jeUroven(v)) return v
  return predplatneObce('javori-lhota')?.uroven ?? 'zaklad'
}

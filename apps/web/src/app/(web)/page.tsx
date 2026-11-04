import { dataUvodu, vzhled } from '@/lib/web'
import { KrizovyBanner } from '@/sablony/sdilene/KrizovyBanner'

export default async function Uvod() {
  const { modul, foto } = await vzhled()
  const data = await dataUvodu()
  return <modul.Uvod banner={<KrizovyBanner />} data={data} foto={foto} />
}

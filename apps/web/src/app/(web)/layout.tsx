import type { ReactNode } from 'react'
import { demoTed } from '@codekom/demo-data'
import { cssPromenne, SABLONY } from '@codekom/tokeny'
import { zdroj } from '@/lib/data/zdroj'
import { dataUvodu, slugObce, vzhled } from '@/lib/web'
import { FOTO_SABLON } from '@/sablony/foto'
import { PrepinacUkazky, type SablonaVPrepinaci } from '@/ukazka/PrepinacUkazky'
import { PISMA, ZVETSENI } from '@/ukazka/pisma'
import { vlastniBarvy } from '@/ukazka/vlastni-vzhled'
import { ukazkaZapnuta, type KrizeUkazky } from '@/ukazka/stav'

/** Sdílený obal veřejného webu: pruh ukázky a kořen zvolené šablony s jejími barvami a písmem. */
export default async function WebLayout({ children }: { children: ReactNode }) {
  const { stav, sablona, paleta, indexPalety, modul } = await vzhled()
  const data = await dataUvodu()

  let pruh: ReactNode = null
  if (ukazkaZapnuta()) {
    let krize: KrizeUkazky = stav.krize ?? 'off'
    if (!stav.krize) {
      const k = await (await zdroj()).krize(slugObce(), demoTed())
      krize = k.hlavni?.uroven ?? 'off'
    }
    const sablony: SablonaVPrepinaci[] = SABLONY.map((s) => ({
      klic: s.klic,
      cislo: s.cislo,
      nazev: s.nazev,
      palety: s.palety.map((p) => ({ nazev: p.nazev, bg: p.bg, primary: p.primary, accent: p.accent })),
      foto: FOTO_SABLON.has(s.klic),
    }))
    pruh = (
      <PrepinacUkazky
        sablony={sablony}
        sablona={sablona.klic}
        paleta={indexPalety}
        krize={krize}
        vynuceno={stav.krize !== undefined}
        vlastni={{ barva: stav.barva ?? null, akcent: stav.akcent ?? null, pismo: stav.pismo ?? null, velikost: stav.velikost ?? 'bezna' }}
        vychoziBarvy={{ primary: paleta.primary, accent: paleta.accent }}
        pisma={Object.entries(PISMA).map(([klic, p]) => ({ klic, nazev: p.nazev }))}
        appUrl={process.env.NEXT_PUBLIC_APP_URL || null}
        codekomUrl={process.env.NEXT_PUBLIC_CODEKOM_URL || null}
      />
    )
  }

  const obsah = modul.Stav ? (
    <modul.Stav paleta={paleta} data={data}>
      {children}
    </modul.Stav>
  ) : (
    children
  )

  const pismo = stav.pismo ? PISMA[stav.pismo] : null
  const zvetseni = ZVETSENI[stav.velikost ?? 'bezna']

  return (
    <>
      <a className="preskocit" href="#obsah">
        Přeskočit na obsah
      </a>
      {pruh}
      <div
        className={`site sablona-${sablona.klic} ${modul.tridyPisem}${pismo ? ` ${pismo.trida}` : ''}`}
        data-sablona={sablona.klic}
        data-paleta={indexPalety}
        data-vlastni-pismo={pismo ? '' : undefined}
        style={{
          ...cssPromenne(paleta),
          ...vlastniBarvy(paleta, stav),
          ...(pismo ? { '--pismo-ukazky': pismo.rodina } : {}),
          ...(zvetseni !== 1 ? { zoom: zvetseni } : {}),
          background: 'var(--bg)',
          color: 'var(--ink)',
          fontFamily: pismo ? pismo.rodina : modul.pismo,
          fontSize: sablona.velikostTextu,
          lineHeight: sablona.radkovani,
        }}
      >
        {obsah}
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { Drobecky } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'

export const metadata: Metadata = { title: 'Prohlášení o přístupnosti' }

/**
 * Prohlášení podle zákona č. 99/2019 Sb. Výsledek posouzení a datum jsou [DOPLNIT],
 * dokud audit neproběhne. Web je stavěný podle WCAG 2.2 AA.
 */
export default async function ProhlaseniOPristupnosti() {
  const obec = await nactiObec()
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Prohlášení o přístupnosti' }]} />
      <h1>Prohlášení o přístupnosti</h1>
      <p>
        Obec {obec.nazev} se zavazuje zpřístupnit své webové stránky v souladu se zákonem č. 99/2019 Sb., o přístupnosti internetových
        stránek a mobilních aplikací. Toto prohlášení se vztahuje na tento web.
      </p>

      <h2>Stav souladu</h2>
      <p>
        Web je navržený podle normy EN 301 549 V3.2.1 a pravidel WCAG 2.2 na úrovni AA. Výsledek posouzení: [DOPLNIT: plně v souladu,
        nebo částečně v souladu s výčtem nesouladů].
      </p>

      <h2>Nepřístupný obsah</h2>
      <p>[DOPLNIT: obsah, který není přístupný, a důvod, například skenované dokumenty starších vyhlášek]</p>

      <h2>Vypracování prohlášení</h2>
      <p>
        Prohlášení bylo vypracováno dne [DOPLNIT: datum] na základě [DOPLNIT: vlastního posouzení obce, nebo posouzení třetí stranou].
        Prohlášení bylo naposledy přezkoumáno dne [DOPLNIT: datum].
      </p>

      <h2>Zpětná vazba a kontakty</h2>
      <p>
        Pokud na webu narazíte na nepřístupný obsah, napište nám na {obec.email}, zavolejte na {obec.telefon} nebo přijďte na obecní úřad,{' '}
        {obec.adresa.ulice}, v úředních hodinách ({obec.uredniHodinyText}). Odpovíme bez zbytečného odkladu.
      </p>

      <h2>Vymáhání</h2>
      <p>
        Pokud nebudete spokojeni s vyřízením svého podnětu, můžete se obrátit na Ministerstvo vnitra, které dohlíží na plnění zákona o
        přístupnosti. [OVĚŘIT: aktuální kontakt dozorového orgánu]
      </p>
    </>
  )
}

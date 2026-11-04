import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Drobecky, UredniHodiny } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'

export const metadata: Metadata = { title: 'Povinně zveřejňované informace' }

/**
 * 14 položek ve struktuře přílohy vyhlášky č. 515/2020 Sb. v pevném pořadí.
 * [OVĚŘIT] Přesné názvy a členění položek v e-Sbírce. Do ověření text necituje znění vyhlášky.
 */
export default async function PovinneInformace() {
  const obec = await nactiObec()
  const polozky: { nazev: string; obsah: ReactNode }[] = [
    { nazev: 'Název', obsah: <p>Obec {obec.nazev}</p> },
    {
      nazev: 'Důvod a způsob založení',
      obsah: <p>Obec je územní samosprávný celek podle zákona č. 128/2000 Sb., o obcích. [DOPLNIT: údaje o vzniku obce]</p>,
    },
    {
      nazev: 'Organizační struktura',
      obsah: (
        <p>
          Zastupitelstvo obce, starostka, místostarosta a obecní úřad. Složení je na stránce <a href="/zastupitelstvo">Zastupitelstvo</a>,
          kontakty na stránce <a href="/obecni-urad">Obecní úřad</a>.
        </p>
      ),
    },
    {
      nazev: 'Kontaktní spojení',
      obsah: (
        <>
          <p>
            Poštovní adresa a adresa úřadovny: {obec.adresa.ulice}, {obec.adresa.psc} {obec.adresa.obec}
            <br />
            Telefon: {obec.telefon}
            <br />
            E-mail podatelny: {obec.email}
          </p>
          <UredniHodiny obec={obec} />
        </>
      ),
    },
    { nazev: 'Případné platby lze poukázat', obsah: <p>Číslo účtu: {obec.cisloUctu}</p> },
    { nazev: 'IČO', obsah: <p>{obec.ico}</p> },
    { nazev: 'DIČ', obsah: <p>{obec.dic}</p> },
    {
      nazev: 'Dokumenty',
      obsah: (
        <p>
          Rozpočet, závěrečný účet a další dokumenty jsou na <a href="/uredni-deska">úřední desce</a> a v jejím{' '}
          <a href="/uredni-deska/archiv">archivu</a>.
        </p>
      ),
    },
    {
      nazev: 'Žádosti o informace',
      obsah: (
        <p>
          Žádost podle zákona č. 106/1999 Sb. podáte ústně nebo písemně na obecním úřadě, e-mailem {obec.email} nebo datovou schránkou{' '}
          {obec.datovaSchranka}.
        </p>
      ),
    },
    {
      nazev: 'Příjem podání a podnětů',
      obsah: (
        <p>
          Podání přijímá obecní úřad v úředních hodinách, e-mailem a datovou schránkou {obec.datovaSchranka}. Podněty k závadám můžete{' '}
          <a href="/sluzby/nahlasit-zavadu">nahlásit online</a>.
        </p>
      ),
    },
    {
      nazev: 'Předpisy',
      obsah: (
        <p>
          Obecně závazné vyhlášky obce jsou na <a href="/uredni-deska?kategorie=vyhlasky">úřední desce</a>. [DOPLNIT: seznam
          nejdůležitějších používaných předpisů]
        </p>
      ),
    },
    { nazev: 'Úhrady za poskytování informací', obsah: <p>[DOPLNIT: sazebník úhrad a rozhodnutí o úhradách]</p> },
    { nazev: 'Licenční smlouvy', obsah: <p>[DOPLNIT: licenční smlouvy, pokud je obec uzavřela]</p> },
    { nazev: 'Výroční zpráva podle zákona č. 106/1999 Sb.', obsah: <p>[DOPLNIT: výroční zprávy za poslední roky]</p> },
  ]
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Povinně zveřejňované informace' }]} />
      <h1>Povinně zveřejňované informace</h1>
      <p>Informace, které obec zveřejňuje podle zákona č. 106/1999 Sb., o svobodném přístupu k informacím, ve struktuře podle vyhlášky.</p>
      <ol style={{ paddingLeft: 24 }}>
        {polozky.map((p) => (
          <li key={p.nazev}>
            <h2 style={{ fontSize: 20, margin: '20px 0 4px' }}>{p.nazev}</h2>
            {p.obsah}
          </li>
        ))}
      </ol>
    </>
  )
}

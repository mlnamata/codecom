import type { Metadata } from 'next'
import { Drobecky } from '@/components/stranka/Casti'
import { nactiObec } from '@/lib/web'

export const metadata: Metadata = { title: 'Ochrana osobních údajů' }

/** Vzor C z docs/pravni-dokumenty.md, doplněný údaji obce. Hranaté závorky zůstávají viditelné. */
export default async function OchranaOsobnichUdaju() {
  const obec = await nactiObec()
  const ucely: [string, string, string, string][] = [
    ['Zveřejňování na úřední desce', 'údaje v dokumentech, které zveřejnit musíme', 'právní povinnost, čl. 6 odst. 1 písm. c) GDPR, § 26 správního řádu a další zákony', 'po dobu vyvěšení, dokumenty s osobními údaji pak z webu odstraníme'],
    ['Aktuality a kontakty zastupitelů', 'jméno, funkce, služební kontakt, fotografie', 'veřejný zájem, čl. 6 odst. 1 písm. e) GDPR', 'po dobu funkce'],
    ['Hlášení závad a podněty', 'popis, fotografie, poloha, nepovinně jméno a kontakt', 'veřejný zájem, čl. 6 odst. 1 písm. e) GDPR, péče o obec podle zákona o obcích', '[2 roky] od vyřízení, nebo podle spisového plánu'],
    ['Krizová hlášení a oznámení do telefonu', 'identifikátor zařízení, sledované části obce', 'veřejný zájem, čl. 6 odst. 1 písm. e) GDPR', 'do odhlášení odběru'],
    ['AI asistent', 'text dotazu bez jména a účtu', 'veřejný zájem, čl. 6 odst. 1 písm. e) GDPR', '[30] dní'],
    ['Technické záznamy webu a aplikace', 'IP adresa, čas, typ zařízení', 'povinnost zabezpečení, čl. 6 odst. 1 písm. c) a čl. 32 GDPR', '90 dní'],
  ]
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Ochrana osobních údajů' }]} />
      <h1>Informace o zpracování osobních údajů</h1>

      <h2>Kdo vaše údaje zpracovává</h2>
      <p>
        Správce: Obec {obec.nazev}, {obec.adresa.ulice}, {obec.adresa.psc} {obec.adresa.obec}, IČO {obec.ico}, datová schránka{' '}
        {obec.datovaSchranka}, e-mail {obec.email}, telefon {obec.telefon}.
      </p>
      <p>
        Pověřenec pro ochranu osobních údajů: {obec.poverenec.jmeno}, {obec.poverenec.email}, {obec.poverenec.telefon}.
      </p>
      <p>Web pro obec technicky provozuje CodeKom s.r.o. jako zpracovatel. Vaše údaje používá jen podle pokynů obce.</p>

      <h2>Proč údaje zpracováváme</h2>
      <div className="tabulka-obal">
        <table>
          <caption>Účely zpracování osobních údajů</caption>
          <thead>
            <tr>
              <th scope="col">Účel</th>
              <th scope="col">Jaké údaje</th>
              <th scope="col">Právní základ</th>
              <th scope="col">Jak dlouho</th>
            </tr>
          </thead>
          <tbody>
            {ucely.map(([ucel, udaje, zaklad, doba]) => (
              <tr key={ucel}>
                <th scope="row" style={{ fontWeight: 400 }}>
                  {ucel}
                </th>
                <td>{udaje}</td>
                <td>{zaklad}</td>
                <td>{doba}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>U hlášení závad nemusíte uvádět jméno ani kontakt, bez nich vám ale nemůžeme odpovědět.</p>

      <h2>Komu údaje předáváme</h2>
      <ul>
        <li>Zpracovatelům: CodeKom s.r.o. a jeho dodavatelům hostingu. Seznam vám na vyžádání pošleme.</li>
        <li>Veřejnosti: jen to, co zveřejnit musíme, nebo co sami zveřejníte.</li>
        <li>Veřejným orgánům: pokud to ukládá zákon.</li>
        <li>Data jsou uložená v EU.</li>
      </ul>

      <h2>AI asistent</h2>
      <ul>
        <li>Asistent je umělá inteligence, ne úředník. Vždy vás na to upozorní.</li>
        <li>Odpovídá jen z dokumentů obce a u odpovědi uvede, odkud ji má. Může se splést. Důležité věci si ověřte na úřadě.</li>
        <li>Dotazy neukládáme k vašemu jménu ani účtu a nepoužíváme je k tréninku umělé inteligence.</li>
      </ul>

      <h2>Vaše práva</h2>
      <p>
        Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování, námitku a přenositelnost (čl. 15 až 21 GDPR) a právo podat
        stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7. Napište pověřenci, pošlete datovou zprávu nebo přijďte
        na úřad. Odpovíme do jednoho měsíce.
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>
        Web používá jen nezbytnou cookie <code>ukazka</code>, která si pamatuje zvolený vzhled ukázkového webu. Neměříme návštěvnost a
        nepoužíváme služby třetích stran.
      </p>
      <p>Tento text platí od [DATUM].</p>
    </>
  )
}

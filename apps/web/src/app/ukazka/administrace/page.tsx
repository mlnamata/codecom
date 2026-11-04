import { demoTed } from '@codekom/demo-data'
import { pragueDayKey, stavDokumentu } from '@codekom/typy/pravidla'
import { aktivniHlaseni } from '@codekom/typy/pravidla'
import { uloziste } from '@/lib/data/demo-pamet'

export const dynamic = 'force-dynamic'

export default function Prehled() {
  const u = uloziste()
  const dnes = pragueDayKey(demoTed())
  const visi = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'visi').length
  const aktivni = aktivniHlaseni(
    u.krize.filter((h) => h.stav === 'vydano'),
    demoTed(),
  ).length
  const nove = u.zavady.filter((z) => z.stav === 'nove').length
  const pocty: [string, number, string][] = [
    ['Aktuality', u.aktuality.length, '/aktuality'],
    ['Dokumenty, které visí', visi, '/uredni-deska'],
    ['Aktivní krizová hlášení', aktivni, '/krizova-hlaseni'],
    ['Nová hlášení závad', nove, '/ukazka/administrace/zavady'],
  ]
  return (
    <>
      <h1>Přehled</h1>
      <p>Co se v obci právě děje. Změny z ukázky se hned projeví na webu ve všech šablonách i v aplikaci.</p>
      <ul className="mrizka" style={{ listStyle: 'none', padding: 0, maxWidth: 'none' }}>
        {pocty.map(([nazev, pocet, href]) => (
          <li key={nazev} className="panel" style={{ margin: 0 }}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 600 }}>{pocet}</p>
            <p style={{ margin: 0 }}>
              <a href={href}>{nazev}</a>
            </p>
          </li>
        ))}
      </ul>
      <h2>Co chcete udělat</h2>
      <ul>
        <li>
          <a href="/ukazka/administrace/aktuality">Napsat aktualitu</a>
        </li>
        <li>
          <a href="/ukazka/administrace/deska">Vyvěsit dokument na úřední desku</a>
        </li>
        <li>
          <a href="/ukazka/administrace/krize">Vydat krizové hlášení</a>
        </li>
        <li>
          <a href="/ukazka/administrace/zavady">Vyřídit hlášení závad</a>
        </li>
      </ul>
    </>
  )
}

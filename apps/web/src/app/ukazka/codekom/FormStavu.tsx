import { NAZVY_STAVU_FAKTURY } from '@/lib/data/predplatne'
import { zmenFakturu } from './akce'

export function FormStavu({ cislo, stav, zpet }: { cislo: string; stav: string; zpet: string }) {
  return (
    <form action={zmenFakturu} className="radek-akci" style={{ flexWrap: 'nowrap' }}>
      <input type="hidden" name="cislo" value={cislo} />
      <input type="hidden" name="zpet" value={zpet} />
      <label htmlFor={`stav-${cislo}`} className="sr-only">
        Nový stav faktury {cislo}
      </label>
      <select id={`stav-${cislo}`} name="stav" defaultValue={stav} style={{ minWidth: 180, margin: 0 }}>
        {Object.entries(NAZVY_STAVU_FAKTURY).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
      <button type="submit" className="mala">
        Uložit
      </button>
    </form>
  )
}

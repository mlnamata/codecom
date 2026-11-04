/** Hlavička šablony 21 Canopus: skleněný pruh se znakem obce a menu, na telefonu sbalené. */
import { ZnakObce } from '../sdilene/ZnakObce'

const MENU = [
  { text: 'Úřad', href: '/obecni-urad' },
  { text: 'Úřední deska', href: '/uredni-deska' },
  { text: 'Zprávy', href: '/aktuality' },
  { text: 'Akce', href: '/akce' },
  { text: 'Poplatky', href: '/sluzby/platby' },
  { text: 'Hledat', href: '/hledat' },
]

export function Hlavicka() {
  return (
    <header className="sk-hlavicka">
      <div className="sk-hlavicka-pruh sk-sklo">
        <a href="/" className="sk-znacka">
          <ZnakObce velikost={30} />
          <span>Obec Javoří Lhota</span>
        </a>
        <nav className="nav-wide" aria-label="Hlavní menu">
          {MENU.map((m) => (
            <a key={m.href} href={m.href}>
              {m.text}
            </a>
          ))}
        </nav>
        <details className="nav-narrow">
          <summary>
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2"></path>
            </svg>
            Menu
          </summary>
          <nav aria-label="Hlavní menu">
            {MENU.map((m) => (
              <a key={m.href} href={m.href}>
                {m.text}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}

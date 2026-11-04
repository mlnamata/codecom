# Web obce: ukázka Javoří Lhota

Funkční prototyp webu smyšlené obce Javoří Lhota (prompt 07). Běží bez databáze, účtů a externích služeb. Data jsou z `obsah/javori-lhota` a drží se v paměti serveru.

## Jak spustit ukázku

Potřebujete Node.js 22 a pnpm 10. Z kořene repozitáře:

```bash
pnpm install
```

```bash
pnpm demo
```

Web běží na http://localhost:3000. Produkční sestavení:

```bash
pnpm --filter codekom-web build
```

```bash
pnpm --filter codekom-web start
```

Build potřebuje internet: `next/font` při buildu stáhne písma šablon z Google Fonts a uloží je k webu. Za běhu web Google nevolá.

## Adresy stavů pro prezentaci

Pruh „Ukázka CodeKom“ nastavuje parametry URL. Odkaz otevře přesně daný stav:

| Stav | Adresa |
| --- | --- |
| Lípa, druhá paleta, výstraha, fotografie | `/?sablona=lipa&paleta=1&krize=warning&foto=1` |
| Úřad bez banneru | `/?sablona=urad&krize=off` |
| Banner podle dat obce | `/?krize=auto` |
| Ukázka administrace, úroveň Základ | `/ukazka/administrace?uroven=zaklad` |
| Ukázka administrace, úroveň Pokročilý | `/ukazka/administrace?uroven=pokrocily` |
| Ukázka administrace, úroveň Advance | `/ukazka/administrace?uroven=advance` |
| Interní správa CodeKom (předplatné, faktury) | `/ukazka/codekom` |

Parametry: `sablona` (klíč šablony, například `naves`, `zvonice`, `urad`), `paleta` (0 až 2), `krize` (`off`, `info`, `warning`, `emergency`, `auto`), `foto` (0 nebo 1, výchozí 1: fotografie). Volba se uloží do nezbytné cookie `ukazka`.

## Proměnné

Popis je v [`.env.example`](.env.example). Ukázkové hodnoty (nejsou tajné) jsou v `.env.development` a `.env.production`.

## Omezení ukázky

- Úložiště je v paměti jednoho procesu. Po restartu, a na Vercelu po studeném startu funkce, se vrátí výchozí data. Na serverless může každá instance funkce mít vlastní kopii dat, takže změna z administrace nemusí být vidět ve všech požadavcích.
- Ukázka administrace nemá přihlášení. Role v hlavičce `X-Ukazka-Role` (`spravce`, `redaktor`) u `POST /api/krize` a `PATCH /api/hlaseni-zavad/<id>` je jen ukázka práv, není to zabezpečení. Bez `NEXT_PUBLIC_UKAZKA=1` tyto cesty vrací 404.
- QR platba používá zjevně neplatný IBAN, protože ukázková obec nemá číslo účtu. Kód je označený „Ukázka, neplaťte“.
- PDF dokumentů desky vznikají z textu dokumentu. Skutečné soubory budou v privátním úložišti za handlerem `/uredni-deska/[id]/soubor` (prompt 01).

## Endpointy pro aplikaci

| Endpoint | Popis |
| --- | --- |
| `GET /api/krize/aktivni?obec=javori-lhota` | jedno nejzávažnější hlášení a počet dalších |
| `GET /api/obce` | seznam obcí s aplikací |
| `GET /api/obce/javori-lhota/prehled` | souhrn pro úvod aplikace |
| `POST /api/hlaseni-zavad` | nové hlášení závady (5 za minutu na IP) |
| `GET /api/hlaseni-zavad?obec=&kod=` | stav hlášení bez kontaktu |
| `POST /api/krize` | vydání hlášení (ukázková role) |
| `PATCH /api/hlaseni-zavad/<id>` | změna stavu (ukázková role) |

Tvar odpovědí je v zod schématech `@codekom/typy`. CORS je povolený jen pro `CODEKOM_APP_ORIGIN`.

## Kontroly

```bash
pnpm typecheck
```

```bash
pnpm lint
```

```bash
pnpm test
```

```bash
pnpm e2e
```

```bash
pnpm a11y
```

`e2e` a `a11y` běží nad sestaveným webem (`next build` a `next start`), Playwright si server spustí sám. Prohlížeč pro testy nainstalujete příkazem `pnpm --filter codekom-web exec playwright install chromium`.

## Šablony

Šablony v `src/sablony/<klic>` vznikly převodem návrhů skriptem `design/generator/do-tsx.py` (`pnpm --filter codekom-web sablony`). Od převodu jsou TSX zdrojem pravdy. Logika interaktivních šablon je v `logika.ts` a upravuje se ručně, skript ji nepřepisuje. Kam vedou odkazy z návrhů, určuje tabulka `src/sablony/sdilene/odkazy.ts`.

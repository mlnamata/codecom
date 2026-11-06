# MVP CodeKom

Stav k 6. 11. 2026. MVP je klikací ukázka platformy na smyšlené obci Javoří Lhota a firemní web s nabídkou. Slouží k předvedení starostům. Data jsou ukázková a drží se v paměti serveru, po restartu se vrátí.

## Co MVP obsahuje

### Web obce (`mlnamata/codecom`, `apps/web`)

- **Šablony:** 23 šablon webu obce, každá ve 3 paletách:
  - 01 Sirius až 20 Betelgeuse,
  - skleněné 21 Canopus, 22 Achernar a 23 Bellatrix.

  Úvody ukazují jen fotky z `design/obrazky/foto` s vodoznakem AI.
- **Lišta ukázky:** volba šablony a palety, krizový banner, „Vlastní vzhled“ (barvy, písmo, velikost) a odkazy na administraci, řídicí panel a firemní web.
- **Stránky obce:**
  - úřední deska s PDF dokumenty, aktuality, akce, obecní úřad, zastupitelstvo,
  - služby: platby s QR Platbou, hlášení závad, rezervace,
  - krizová hlášení, hlášení rozhlasu, hledání, životní situace,
  - chytrá obec, komunita, majetek a bezpečnost,
  - povinné informace, prohlášení o přístupnosti a ochrana osobních údajů.
- **API pro aplikaci:** `/api/obce`, `/api/obce/[slug]/prehled`, `/api/krize`, `/api/krize/aktivni`, `/api/hlaseni-zavad`.

### Administrace obce (`/ukazka/administrace`)

- **Vzhled:** střídmý pracovní nástroj, tmavý režim jako výchozí a světlý po přepnutí. Akcentová barva je zelená ze znaku obce.
- **Úrovně editoru:** Základ, Pokročilý a Advance. Vyšší úrovně odemykají další obrazovky.
- **Přehled:** blok K vyřízení, čísla obce, graf úřední desky, stav závad a poslední aktivita.
- **Řídicí panel** (`/ukazka/administrace/panel`):
  - upravitelná plocha s widgety: stav obce, mapa s vrstvami, kamera, energie, parkování, teploty, čidla, zámky, odjezdy a závady,
  - widgety jde přidat, odebrat, přesunout tažením i tlačítky a změnit jejich šířku.
- **Obrazovky:** celkem 22, například pošta a ISDS, rozhlas, úřední deska, krize, závady, schvalování, poplatky, smlouvy, přepážka, stránky, skladatel webu, vzhled, AI asistent a uživatelé.

### Správa CodeKom (`/ukazka/codekom`)

Předplatné obcí, jejich úrovně a moduly a faktury. Kromě Javoří Lhoty jsou obce smyšlené.

### Firemní web (`mlnamata/codekom_web`)

- **Stránky:** úvod, co umíme, pro koho, ukázky šablon, úrovně, ceník s kalkulačkou, katalog zařízení, dotace, přechod, bezpečnost a právo, FAQ, kontakt, o nás a ke stažení.
- **Katalog zařízení:** hlavice, zámky, měřidla, čidla, meteostanice, brána, venkovní úřední deska a webkamery.

## Výsledky celkové kontroly 6. 11. 2026

| Kontrola | `codecom` | `codekom_web` |
| --- | --- | --- |
| `pnpm typecheck` | prošlo | prošlo |
| `pnpm lint` (včetně unslop) | prošlo, bez chyb a varování | prošlo |
| `pnpm test` (Vitest) | 66 testů prošlo (web 47, typy 11, tokeny 4, demo data 4) | 33 testů prošlo |
| `pnpm build` | prošlo | prošlo, `pnpm obsah` také |
| `pnpm e2e` (Playwright, 375 a 1280 px) | 110 testů prošlo | 18 testů prošlo |
| `pnpm a11y` (axe, WCAG 2.2 AA a best-practice) | 38 testů prošlo: 23 šablon ve 3 paletách, bannery, vnitřní stránky, 23 obrazovek administrace v obou režimech, řídicí panel i v režimu úprav, správa CodeKom | 20 stránek prošlo |
| Procházení všech odkazů | 87 stránek, žádný nefunkční odkaz, žádná chyba v konzoli | 39 stránek, žádný nefunkční odkaz, žádná chyba v konzoli |

Lint před touto kontrolou padal na dvou souborech ukázky (`PoplatkyKlient.tsx` a `SmlouvyKlient.tsx`, náhodné ID v renderu). Opraveno v `d7930e9`.

Mobilní aplikace a brána IoT jsou v samostatném repozitáři `mlnamata/codecom_app` a tahle kontrola je nezahrnuje.

## Jak MVP spustit

```bash
pnpm install
```

```bash
pnpm --filter codekom-web dev
```

Ukázka běží na `http://localhost:3000`, administrace na `/ukazka/administrace`. Proměnné jsou popsané v `apps/web/.env.example`. Pro ukázku stačí výchozí `CODEKOM_ZDROJ=demo` a `NEXT_PUBLIC_UKAZKA=1`.

Nasazení: Vercel s regionem `fra1` (`vercel.json` v obou repozitářích). Ukázka obce https://codekom.vercel.app, firemní web https://codekomweb.vercel.app.

## Co MVP není

- **Skutečná data:** zdroj `payload` (Payload 3 nad Supabase Postgres ve Frankfurtu) ještě není napojený, dodá ho prompt 01. Úpravy v administraci se drží jen v paměti nebo v prohlížeči.
- **Přihlášení:** ukázka administrace je otevřená bez přihlášení, jen s `NEXT_PUBLIC_UKAZKA=1`. Není to produkční zabezpečení.
- **AI asistent:** v ukázce není připojený k modelu na serveru v ČR.
- **Webkamery, čidla a zámky:** v řídicím panelu jsou ukázková data, nic není připojené k zařízením.
- **Rezervace prostor:** v administraci chybí obrazovka `[DOPLNIT: obrazovka rezervací]`.

## Před prvním ostrým provozem

1. Napojit skutečná data a přihlášení (prompt 01), migrace a databázové pravidlo úřední desky.
2. Doplnit údaje skutečné obce místo zástupných údajů ukázky. V `obsah/javori-lhota` je to 26× `[E-MAIL]`, 16× `[TELEFON]`, 8× `[ORP]`, 3× `[PSČ]`, 2× `[IČO]`, 2× `[ID DS]` a 2× `[ČÍSLO ÚČTU]`. Ve webu zbývá dalších asi 20 míst `[DOPLNIT: …]`, například výroční zprávy, plátce DPH, sazebník úhrad a obsah, který není přístupný.
3. Firemní web: ceny 13 zařízení a obou webkamer, údaje firmy (IČO, sídlo, kontakty) a 72 míst `[DOPLNIT]` a 38 míst `[OVĚŘIT]` podle `pnpm obsah`.
4. Právní kontrola:
   - smlouvy s obcí a smlouvy o zpracování (`docs/pravni-dokumenty.md`) advokátem,
   - posouzení podle GDPR pro každou webkameru,
   - zda vodoznak AI u fotek stačí pro čl. 50 odst. 4 AI Actu `[OVĚŘIT]`.
5. Založit CodeKom s.r.o. a rozhodnout fakturační systém `[DOPLNIT: fakturační systém]`.
6. Položky `[OVĚŘIT]` ze záznamu ověření (`docs/verification-log.md`): přednost route handlerů před Payloadem, port Expo webu a vyhláška 515/2020 Sb.

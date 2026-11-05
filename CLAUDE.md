# CodeKom – kontext pro Claude Code

CodeKom je platforma pro české obce: web s úřední deskou, mobilní aplikace pro občany a úřad, digitální úřad, správa obecních budov (IoT) a AI asistent na vlastním serveru v ČR. Pilot jsou obce do 2 000 obyvatel v Plzeňském kraji. Firma CodeKom s.r.o. (zatím nezaložená) patří holdingu, sesterský projekt AutoCore s tímto repozitářem nesouvisí.

Zadání jednotlivých částí jsou v `prompty/`. Důvody rozhodnutí jsou v `docs/rozhodnuti.md`. Pokud tento soubor a prompt říkají něco jiného, platí prompt.

## Uspořádání repozitáře

```
apps/web          Next.js 16 + Payload 3: weby obcí, administrace, REST API pro aplikaci
apps/mobile       Expo: aplikace s rolemi občan a úřad
apps/ai           služba AI asistenta (RAG nad dokumenty obcí, volá model na AI serveru)
apps/brana        agent na mini PC v budově (vedle Home Assistant)
packages/typy     sdílené typy a zod schémata (z payload-types.ts)
packages/tokeny   barvy, krizové úrovně a další tokeny pro web i aplikaci
design/           klikací návrhy (.dc.html), generátor šablon, nástroje kontroly, fotky (obrazky/foto) a snímky šablon (snimky)
obsah/            hotový obsah: ukázková obec Javoří Lhota (JSON) a texty prezentačního webu (Markdown)
docs/             návrh platformy, právní dokumenty, záznam rozhodnutí
research/         rešerše, ze které prompty vychází
brand/            logo CodeKom
```

Monorepo běží na pnpm workspaces a Turborepo. `apps/web` vznikl dřív s npm. Při zakládání monorepa ho převeď na pnpm a smaž `package-lock.json`.

## Stack a verze (stav 3. 11. 2026)

Před instalací ověř aktuální verzi přes `npm view <balíček> version`. Patch verze pak zvedni, major verze bez důvodu neměň.

| Oblast | Volba |
| --- | --- |
| Runtime | Node.js 22 LTS nebo novější LTS, pnpm |
| Web | Next.js 16.4 (App Router), React 19.3, TypeScript strict s `noUncheckedIndexedAccess` |
| CMS | Payload 3.92 uvnitř Next.js, `@payloadcms/db-postgres`, editor Lexical, admin česky (`@payloadcms/translations/languages/cs`) |
| Data | Supabase Postgres v regionu eu-central-1 (Frankfurt), schéma `obec`, mimo Data API |
| Soubory | Supabase Storage přes S3 API |
| UI | Tailwind CSS 4.3, shadcn/ui, tokeny podle design systému gov.cz |
| Mobil | Expo SDK 58 (vyšlo 29. 9. 2026, nová architektura, Hermes), Expo Router, TanStack Query |
| AI | open-weight model přes vLLM s OpenAI API, embeddingy bge-m3, pgvector na AI serveru v ČR |
| Hosting | Vercel s funkcemi v regionu `fra1` (výchozí `iad1` je v USA, proto ho vždy přepiš), nebo vlastní server v EU |
| Testy | Vitest, Testing Library, Playwright, axe-core, PGlite pro migrace |

## Jazyk a pojmenování

- Komentáře a texty pro uživatele jsou česky. Commity česky v rozkazovacím způsobu, například „Přidej filtr úřední desky podle kategorie“.
- Doménové názvy jsou česky bez diakritiky: `uredniDeska`, `vyvesenoOd`, `krizovaHlaseni`, `zastupitele`. Technické názvy jsou anglicky: `useQuery`, `handler`, `config`.
- Slugy kolekcí a URL jsou s pomlčkami: `uredni-deska`, `krizova-hlaseni`. Sloupce v databázi generuje Payload (`vyveseno_od`).
- Data a časy se zobrazují v Europe/Prague. Kalendářní dny (visí od, visí do) se ukládají jako 12:00 UTC daného dne, viz `apps/web/src/lib/datum.ts`.

## Pravidla domény, která se nesmí porušit

1. **Úřední deska.** Zveřejněný dokument, který už visel, nejde smazat. Hlídá to i databázový trigger. Změny se ukládají jako verze. Dokument je veřejný od prvního dne vyvěšení. Po posledním dni přejde do archivu, nebo zmizí z webu, je-li označený „Po sejmutí nezveřejňovat“, což je výchozí volba.
2. **Krizová hlášení.** Na webu i v aplikaci je vidět vždy jen jedno, to nejzávažnější (krize, potom výstraha, potom informace). Úroveň je napsaná slovem, barva je jen doplněk. Krizovou situaci nejde zavřít. Hlášení nenahrazuje varovný systém IZS.
3. **Peníze.** Platby občanů jdou přímo na účet obce. CodeKom peníze nikdy nedrží.
4. **AI.** Asistent vždy řekne, že je umělá inteligence (čl. 50 AI Actu, platí od 2. 8. 2026). Odpovídá jen z dokumentů dané obce a cituje je. Dotazy neukládá k osobě a netrénuje se na nich. Model běží na serveru v ČR.
5. **Budovy.** Zámek musí jít vždy otevřít klíčem a ochrana proti mrazu nesmí záviset na cloudu. Brána řídí budovu i bez internetu.
6. **Úřad je fallback.** Každá online služba má na stránce i offline cestu: telefon, úřední hodiny, adresu.

## Data a právo

- U dat občanů je správcem obec a CodeKom zpracovatelem (čl. 28 GDPR). Účet v aplikaci spravuje CodeKom. Podrobnosti jsou v `docs/pravni-dokumenty.md`.
- Všechna osobní data zůstávají v EU. Bez souhlasu se nepouží analytika ani třetí strany (§ 89 odst. 3 zákona č. 127/2005 Sb.). Jsou dovolené jen nezbytné cookies.
- Přístupnost je zákonná povinnost obcí (zákon č. 99/2019 Sb., EN 301 549 V3.2.1, tedy WCAG 2.1 AA). Stavíme rovnou podle WCAG 2.2 AA a každý web má prohlášení o přístupnosti.
- Tajné klíče patří jen do `.env`, nikdy do kódu, logů ani commitů. Každá aplikace má `.env.example` s popisem proměnných.

## Design

- Pravidla unslop (Damir Sokolovsky, CC BY 4.0):
  - řezy písma nejvýš 600,
  - věty začínají velkým písmenem, bez vykřičníků, krátké popisky bez tečky,
  - jedna akcentová barva, žádné přechody, záře ani emoji,
  - mřížka po 4 px, tenké linky.
- Firemní prezentační web CodeKom se 4. 11. 2026 přesunul do samostatného repozitáře `mlnamata/codekom_web` (má vlastní pravidla vzhledu). Weby obcí a aplikace zůstávají podle unslop.
- Nepoužívej nadpisy nad nadpisy velkými písmeny, odkazy se šipkou „→“, řetězce „A · B“ ani kartičky jako ze SaaS šablony.
- Text má velikost 17 px, cíle pro dotyk aspoň 44 × 44 px, kontrast textu aspoň 4,5 : 1.
- Výjimka: skleněné šablony 21 Canopus, 22 Achernar a 23 Bellatrix smí na přání zakladatele ze 4. 11. 2026 porušit unslop (sklo, přechody, záře, řezy nad 600). Kontrast, 44 px a omezený pohyb platí i pro ně.
- Výjimka: administrace obce (`apps/web/src/app/ukazka/administrace`, `admin.css`) má na přání zakladatele z 5. 11. 2026 vzhled moderního SaaS dashboardu: tmavý režim jako výchozí, fialový akcent, karty s čísly, grafy, jemné přechody a sklo. Unslop tam neplatí, kontrast 4,5 : 1, 44 px, `prefers-reduced-motion` a WCAG 2.2 AA ano.
- Šablony webů obcí jsou v `design/prototypy` (20 šablon, každá ve 3 barevných variantách). Vzhled ber odtud, obsah z ukázkové obce Javoří Lhota v `obsah/javori-lhota`.
- Texty a obsah nevymýšlej. Ukázková obec bere obsah z `obsah/javori-lhota`. Co chybí, označ `[DOPLNIT]`.
- Fotky z `design/obrazky/foto` jsou vygenerované AI. Kde se zobrazí, má v rohu vodoznak AI (`AiStitek`). Viditelný nápis „Ilustrační fotografie vytvořená umělou inteligencí“ tam nebude, text je jen pro čtečky obrazovky (přání zakladatele ze 4. 11. 2026, platí i proti starším promptům).
- Logo CodeKom je v `brand/`, černobílé. Na webech obcí je jen v patičce, hlavní značkou je znak obce.

## Jak pracovat

1. Než začneš, přečti si zadání celé, prohlédni dotčené soubory a sepiš plán. U větší práce založ seznam úkolů a průběžně ho odškrtávej.
2. Ptej se, jen když zadání připouští víc výkladů s jiným výsledkem, nebo když chybí údaj, který zná jen zakladatel. Jinak zvol postup podle dobré praxe a zapiš ho do `docs/rozhodnuti.md`.
3. Pracuj po malých ověřených krocích. Po každém kroku spusť kontroly a commitni.
4. Nikdy nepředstírej hotovou práci. Test nesmí být upravený tak, aby prošel, ani přeskočený. Žádné `any` nebo `@ts-ignore` jen kvůli tichému typecheck. Když něco nejde, napiš to.
5. Nemaž cizí kód ani soubory mimo zadání. Neměň migrace, které už byly nasazené. Na každou změnu schématu napiš novou migraci.
6. Údaje, které neznáš (IČO, ceny, kontakty), nevymýšlej. Napiš `[DOPLNIT: …]`. Kde rešerše píše NEOVĚŘENO, ověř údaj z dokumentace, nebo ho tak nech označený.

## Práce více agentů najednou

Na repozitáři pracuje víc instancí Claude současně. Aby měly přehled jedna o druhé:

1. Po každém ověřeném kroku (kontroly prošly) hned commitni a pushni na `main`. Nečekej na konec celé práce.
2. Do commitu přidávej jen soubory, které jsi změnil ty (`git add <cesty>`, nikdy `git add -A`). Cizí rozdělané změny v pracovním stromu nech být.
3. Před pushem `git pull --rebase --autostash origin main` (`--autostash` odloží rozdělané změny ostatních ve stejném pracovním stromu). Při konfliktu se zastav a napiš, s čím je konflikt. Nikdy nepoužívej force push.
4. Na začátku práce si stáhni `main` a podívej se do `docs/progress.md`, kdo na čem pracuje. Svůj úkol tam zapiš (stav, oblast souborů) a při každém commitu ho aktualizuj.
5. Drž se své oblasti souborů. Když potřebuješ měnit sdílený soubor (`globals.css`, `package.json`, lockfile), udělej to malým samostatným commitem a hned ho pushni.

## Kontrola hotovo

Práce je hotová, až když v dotčené aplikaci projde:

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint
pnpm test        # Vitest včetně testů pravidel domény
pnpm e2e         # Playwright: klíčové cesty na 375 a 1280 px
pnpm a11y        # axe-core (WCAG 2.1 AA + best-practice) bez chyb
```

Na konci napiš krátké shrnutí:
- co je hotové a čím je to ověřené,
- co zbývá,
- kde jsou místa `[DOPLNIT]`.

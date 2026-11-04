# Prompty pro Claude Code

Všechno potřebné je připravené v repozitáři: zadání, texty, obsah ukázkové obce, fotky, snímky šablon a záznam rozhodnutí. Claude Code podle promptu jen píše kód a skládá stránky. Na nic se ptát nemusí. Údaje, které zatím chybí (IČO, kontakty, domény), nechá jako `[DOPLNIT]`.

## Jak spustit

1. Naklonuj repozitář a otevři ho v Claude Code. `CLAUDE.md` se načte sám.
2. Napiš: `Proveď zadání v prompty/00-dokonceni-pripravy.md`, potom v nové konverzaci `Proveď zadání v prompty/06-prezentacni-web.md` a tak dál podle tabulky.
3. Na každý prompt otevři novou konverzaci. Prompt má milníky, po každém se spustí kontroly a vznikne commit, takže jde navázat i po přerušení („Pokračuj v zadání prompty/07-prototyp-webu.md od posledního hotového milníku“).
4. Na konci Claude Code napíše, co je hotové a čím je to ověřené, co zbývá a kde jsou `[DOPLNIT]`.

## Pořadí

| Krok | Prompt | Výsledek |
| --- | --- | --- |
| 0 | [`00-dokonceni-pripravy.md`](00-dokonceni-pripravy.md) | Dopíše texty prezentace (`obsah/prezentace`) a obsah ukázkové obce (`obsah/javori-lhota`). Bez kódu. |
| 1 | [`06-prezentacni-web.md`](06-prezentacni-web.md) | Marketingový web CodeKom pro starosty: ukázky 20 šablon, orientační ceny „od“, právo a bezpečnost, ke stažení. Texty z `obsah/prezentace`. |
| 2 | [`07-prototyp-webu.md`](07-prototyp-webu.md) | Živý web Javoří Lhoty bez databáze: 20 šablon × 3 palety, krizový banner, úřední deska, služby, ukázka administrace. |
| 3 | [`08-prototyp-aplikace.md`](08-prototyp-aplikace.md) | Aplikace v prohlížeči s rolemi Občan a Úřad nad stejnými daty. |
| 4 | [`01-web-obce.md`](01-web-obce.md) | Ostrý web obcí: Payload, Supabase, více obcí, editor ve třech úrovních. Vymění zdroj dat prototypu za databázi. |
| 5 | [`03-digitalni-urad.md`](03-digitalni-urad.md) | Formuláře, platby na účet obce, rezervace, hlášení závad, životní situace. |
| 6 | [`02-mobilni-aplikace.md`](02-mobilni-aplikace.md) | Ostrá aplikace: přihlášení, push, obchody. Navazuje na prototyp 08. |
| 7 | [`05-ai-asistent.md`](05-ai-asistent.md) | AI asistent nad dokumenty obce a vlastní AI server v ČR. |
| 8 | [`04-iot-budovy.md`](04-iot-budovy.md) | Brána v budově, topení, zámky, dashboard, otevření dveří z aplikace. |

Kroky 1 až 3 stačí k tomu, aby starosta viděl, jak CodeKom vypadá a funguje. Kroky 4 až 8 jsou kompletní systém. Každý prompt funguje i v jiném pořadí: když chybí něco ze sdíleného základu, založí to v minimu a zapíše do `docs/rozhodnuti.md`.

## Připravené podklady

| Cesta | Obsah |
| --- | --- |
| `obsah/prezentace/*.md` | hotové texty všech stránek prezentačního webu a registr tvrzení |
| `obsah/javori-lhota/*.json` | obsah ukázkové obce: zprávy, úřední deska, akce, krizová hlášení, služby, závady, budovy, ukázka asistenta |
| `design/prototypy/` | klikací návrhy 20 šablon, editoru, aplikace a IoT |
| `design/snimky/` | snímky úvodů šablon pro galerii (80 souborů WebP) |
| `design/obrazky/foto/` | fotky vygenerované AI pro úvody šablon a prezentační web |
| `brand/` | logo CodeKom |
| `docs/rozhodnuti.md` | všechna rozhodnutí a jejich důvody |
| `KONTROLA.md` | výsledek kontroly promptů a sloučený seznam `[DOPLNIT]` |

## Než začneš

- Na počítači: Node.js 22 nebo novější, pnpm (`corepack enable`), Python 3 a Git. Pro kroky 4 a další účet Supabase (region Frankfurt) a hodnoty do `.env` podle `.env.example`. Klíče patří jen do `.env`.
- Nic se nenasazuje. Nasazení na Vercel (region `fra1`) je až samostatný krok, až o něm rozhodneš.

# CodeKom

Platforma pro obce: web s úřední deskou, mobilní aplikace pro občany a úřad, digitální úřad, správa obecních budov (IoT) a AI asistent, který odpovídá z dokumentů obce. Pilot cílí na obce do 2 000 obyvatel v Plzeňském kraji.

Projekt je ve fázi návrhu. V repozitáři jsou podklady, návrhy, rozpracovaný kód webu a prompty, podle kterých Claude Code postaví jednotlivé části. Texty, obsah ukázkové obce, fotky a snímky jsou připravené předem, takže Claude Code jen píše kód.

## Co kde je

| Složka | Obsah |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Společný kontext pro Claude Code: produkt, pravidla, stack, konvence, kontrola hotovo |
| [`prompty/`](prompty) | Osm velkých promptů (marketingový web, prototyp webu a aplikace, kompletní systém) a [návod, v jakém pořadí je spustit](prompty/README.md) |
| [`obsah/`](obsah) | Hotové texty prezentačního webu a kompletní obsah ukázkové obce Javoří Lhota (JSON) |
| [`docs/navrh-platformy/`](docs/navrh-platformy) | Návrh platformy: průzkum, šablony, editor, digitalizace, IoT, AI |
| [`docs/pravni-dokumenty.md`](docs/pravni-dokumenty.md) | Smlouva s obcí, smlouva o zpracování, vzor informací pro obec, zásady CodeKomu, podmínky aplikace |
| [`docs/rozhodnuti.md`](docs/rozhodnuti.md) | Záznam rozhodnutí a jejich důvodů |
| [`research/`](research) | Rešerše k promptům (zpráva a poznámky) a rozbor šablon z ThemeForestu |
| [`brand/`](brand) | Logo CodeKom ve všech variantách a pravidla použití |
| [`apps/web/`](apps/web) | Rozpracovaný web obce: Next.js 16 + Payload 3 + Supabase, kolekce, migrace, pravidla v databázi |
| [`design/prototypy/`](design/prototypy) | Klikací návrhy: 20 šablon webu pro smyšlenou obec Javoří Lhota, editor ve 3 úrovních, IoT dashboard, mobilní aplikace |
| [`design/generator/`](design/generator) | Generátor šablon: palety, texty šablon, sestavení `.dc.html` |
| [`design/nastroje/`](design/nastroje) | Kontrola návrhů: snímky, axe (WCAG 2.1 AA), sondy UX, barevné varianty |
| [`design/snimky/`](design/snimky) | Snímky úvodů 20 šablon ve 3 paletách pro galerii prezentačního webu |
| [`design/obrazky/`](design/obrazky) | Zadání fotek pro Gemini, skript `obrazky.py` a vygenerované fotky |

## Jak stavět s Claude Code

1. Otevři repozitář v Claude Code. Soubor `CLAUDE.md` se načte sám.
2. Napiš „Proveď zadání v prompty/06-prezentacni-web.md“. Pořadí a podrobnosti jsou v [`prompty/README.md`](prompty/README.md): marketingový web, prototyp webu Javoří Lhoty, aplikace v prohlížeči, potom kompletní systém.
3. Prompt chce po agentovi plán, průběžný seznam úkolů a na konci důkaz hotovo: typecheck, testy, kontrolu přístupnosti a seznam toho, co zbývá.

## Návrhy a jejich kontrola

Šablony se generují z `design/generator`:

```bash
cd design/generator
python3 build.py              # všech 20 šablon
python3 build.py S09-Hreben   # jen vybrané
```

Kontrola (potřebuje Node 22, Playwright a axe-core v `design/nastroje`):

```bash
cd design/nastroje
npm install
W=1440,375 node review.js ../../research/snimky S09-Hreben.dc.html   # snímky + axe
node variants.js ../../research/varianty S09-Hreben.dc.html          # axe pro všechny barevné varianty
```

Soubory `.dc.html` jsou návrhy pro plátno Claude Design. V prohlížeči je zobrazí `design/nastroje/minidc.js`, který napodobí jejich běhové prostředí.

## Rozpracovaný web

Kód v `apps/web` je stav před monorepem (npm). Prompt 07 ho převede na pnpm a doplní veřejnou část, prompt 01 databázi a administraci. Do té doby:

```bash
cd apps/web
npm install
cp .env.example .env          # doplnit DATABASE_URI a PAYLOAD_SECRET
npm run typecheck
npm run migrate               # vytvoří schéma obec v Supabase
npm run dev
```

## Poděkování

Pravidla návrhu vychází ze skillu [unslop](https://github.com/heydamir/unslop) od Damira Sokolovského (CC BY 4.0). Barvy a krizová hlášení vychází z design systému gov.cz, GOV.UK a USWDS.

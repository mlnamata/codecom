# Prompt: Web obce a redakční systém

Použití: vlož celý text do Claude Code v kořeni repozitáře /home/claude/codecom. Ostatní části (mobil, digitální úřad, IoT, AI) staví na kolekcích a endpointech z této části.
Závisí na: žádné jiné části. Je to základ, který musí být hotový jako první.

<kontext>
Web obce je vstupní produkt CodeKomu. Zákon po něm chce elektronickou úřední desku (§ 26 správního řádu), povinně zveřejňované informace (vyhl. 515/2020 Sb.), prohlášení o přístupnosti (zákon 99/2019 Sb.) a souhlas s cookies (§ 89 odst. 3 zákona 127/2005 Sb.). Čtou ho občané včetně seniorů na pomalém mobilu. Spravuje ho starosta nebo účetní, takže editor nesmí dovolit rozbít přístupnost ani povinné části.

Jeden nasazený `apps/web` obsluhuje všechny obce (tenant = obec) na jejich doménách. Společný kontext je v `CLAUDE.md`. Podklady: `docs/navrh-platformy/01` až `04`, `docs/rozhodnuti.md`, `docs/pravni-dokumenty.md`, `research/poznamky/web_obce_a_prodej.md` a `stack_a_claude_code.md`. Vzhled šablon je v `design/prototypy` (`Main.dc.html` = naves, `S02` až `S20`) a jeho zdroj v `design/generator` (`palettes.py`: 12 barevných tokenů pro každou ze 3 palet, `tpls.py`: písma a metadata, `bodies/`: těla stránek). Z `design/nastroje` znovu použij, co jde.
</kontext>

<cil>
Na konci běží demo obec Javoří Lhota s obsahem z prototypů na dvou doménách (vlastní a záložní subdoména) a obsah jedné obce není vidět v jiné. Všech 20 šablon se třemi paletami funguje jako React layouty a obec si šablonu a paletu vybere v české administraci. Úřední deska a krizový banner splňují pravidla z `CLAUDE.md` a z tohoto zadání, včetně záznamu o vyvěšení a sejmutí. Povinné informace a prohlášení o přístupnosti se generují z dat obce, editor má tři úrovně a nedovolí publikovat nepřístupný vzhled. Testy, axe a migrace na čisté databázi projdou.
</cil>

<vychozi_stav>
`apps/web` už obsahuje práci, kterou převezmi a nepřepisuj:
- Kolekce `aktuality`, `uredni-deska`, `kategorie-desky`, `krizova-hlaseni`, `zastupitele`, `dokumenty`, `media`, `users` v `src/collections` (verze, `skrytPoSejmuti`, validace dnů, odkazů a období).
- Dvě migrace (`20261102_091023_zakladni_model`, `20261102_091100_pravidla_a_ochrana`): CHECK omezení, částečné indexy, trigger `uredni_deska_nemazat`, RLS bez politik, odebraná práva `anon` a `authenticated`, schéma `obec`. Aplikované migrace neměň, změny schématu dělej novou migrací přes `payload migrate:create` a zkontroluj vygenerované SQL.
- `src/lib/datum.ts` (dny jako 12:00 UTC, Europe/Prague), `src/lib/deska.ts` (parsování URL parametrů, `deskaWhere`, `deskaSort`, stav dokumentu, popisky, čeština množných čísel), `src/lib/krize.ts` (výběr jednoho hlášení, `lzeSkryt`, `klicSkryti`, `bezpecnyOdkaz`), `src/lib/revalidate.ts` (`obnovit` s `revalidateTag(tag, { expire: 0 })`), `src/access/roles.ts`.
- Komponenty `IkonaUrovne` a `SkrytHlaseni` (tlačítko až po hydrataci, `localStorage` s klíčem `krize:id:updatedAt`, po skrytí fokus na `#obsah`) a `globals.css` s tokeny gov.cz a barvami krizových úrovní.

Nedokončené: banner, výpis desky, stránky, testy. Pasti, které oprav novou migrací nebo kódem:
1. `roles` má hodnoty `admin` a `redaktor`. Sdílené rozhraní má `superadmin`, `spravce`, `redaktor`. Datová migrace přejmenuje `admin` na `spravce`.
2. `unique` na `kategorie-desky.nazev|slug` a `aktuality.slug` je globální, musí platit v rámci obce (složený index s `obec_id`).
3. `dokumenty` a `media` mají `read: () => true`, takže soubor sejmutého dokumentu s „Po sejmutí nezveřejňovat“ by zůstal dostupný přes přímou adresu. Soubory desky servíruj přes route handler s kontrolou stavu.
4. `obnovit(['deska'])`, `obnovit(['krize'])` a `revalidatePath('/uredni-deska')` jsou globální. Tagy musí být `obec:<id>:deska`, `obec:<id>:krize` a podobně.
5. `KrizoveHlaseni.tykaSe` (text) nahraď polem `casti` (viz datový model).
6. `SkrytHlaseni` zaostřuje `#obsah`. Každý layout musí mít `<main id="obsah" tabIndex={-1}>` a odkaz „Přeskočit na obsah“.
7. Verze v `package.json` jsou pod aktuálním stavem (Payload 3.91.0, Next 16.4.1), viz M0.
</vychozi_stav>

<rozsah>
Postav:
1. Monorepo pnpm + Turborepo, převod `apps/web`, `packages/typy`, `packages/tokeny`.
2. Multi-tenant: kolekce `obce`, plugin, mapování hostname na obec, domény, filtrování všeho podle obce.
3. 20 šablon úvodní stránky, sdílené vnitřní stránky, tokeny a 3 palety, výběr v administraci a náhled.
4. Mapu webu, všechny stránky a obsahové kolekce z této specifikace.
5. Úřední deska: výpis, detail, RSS a Atom, evidence vyvěšení a sejmutí, export.
6. Krizový banner, stránku a endpoint.
7. Povinné informace, prohlášení o přístupnosti, cookies, osobní údaje.
8. Hledání, SEO, výkon.
9. Editor ve třech úrovních, schvalování, plánované publikování, náhled, audit, 2FA, přehled, import ze starého webu.
10. Testy a CI.

Mimo rozsah: mobilní aplikace, push a SMS, digitální úřad (formuláře, platby, rezervace, `zivotniSituace`, `hlaseniZavad`), IoT, AI asistent a audionovinky, odpadový kalendář, ankety, podweby organizací, mega menu, vlastní HTML v Advance, překlady obsahu (Hranice má německé popisky rozhraní, obsah česky), prezentační web, kolekce `obcane` a endpointy `/api/obce/<slug>/prehled`, `/api/mobilni-zarizeni`, `/api/hlaseni-zavad`, `/api/asistent/dotaz`, `/api/poptavky`. Pro `/prehled` nech jen čisté funkce v `src/data/` (aktuality, deska, rozhlas, krize podle obce).
</rozsah>

<architektura>
Monorepo: kořenový `package.json`, `pnpm-workspace.yaml`, `turbo.json` s úlohami `typecheck`, `lint`, `test`, `e2e`, `a11y`, `build`. Smaž `apps/web/package-lock.json`. Ostatní aplikace nezakládej, workspace je počítá (`apps/*`). Hoisting pro Metro nenastavuj.
- `packages/typy`: typy z `payload-types.ts` (skript `generate:types` je zkopíruje), zod schémata veřejných odpovědí (`KrizeAktivniOdpoved` a další), společné konstanty rolí a úrovní editoru.
- `packages/tokeny`: krizové úrovně a barvy (z `CLAUDE.md`), metadata 20 šablon (klíč, číslo, název, písma, extra tokeny), 20 × 3 palet (vygeneruj z `design/generator/palettes.py` skriptem a test ověří shodu), funkce `kontrast`, `zkontrolujTokeny`, generátor CSS proměnných. `lib/krize.ts` v `apps/web` jen importuje konstanty, logiku nech.

Struktura `apps/web/src`:
- `app/(payload)` administrace, `app/(web)/sites/[obec]/...` veřejný web (ne `_obec`, podtržítková složka není route), `app/api/...`.
- `proxy.ts` (Next 16): z hlavičky Host najde obec, přepíše `/x` na `/sites/<slug>/x`. Přímý požadavek na `/sites/*` zvenku vrací 404. Neznámý host vrací 404 bez úniku dat. Cesty `/admin`, `/api`, `/_next` se nepřepisují. Společná doména administrace: [DOPLNIT: doména administrace CodeKom]. Lokálně `<slug>.localhost`.
- `src/data/*.ts`: jediná vrstva, která čte data pro veřejný web. Každá funkce bere `obecId`, vždy filtruje `where: { obec: { equals } }`, volá Local API s `overrideAccess: false` a je v `use cache` s `cacheTag('obec:<id>:<oblast>')` a explicitním `cacheLife`. Lint pravidlo zakáže `payload.find` mimo `src/data`.
- `src/sablony/<klic>/` pro 20 šablon: `Uvod.tsx`, `Hlavicka.tsx`, `Patka.tsx`, `fonty.ts`, klientské ostrůvky jen kde prototyp interaktivitu opravdu má (přepínač Léto/Zima, velikost písma, mapa, záložky). Registr `src/sablony/index.ts`. Hlavička a patička jsou součástí šablony, tělo vnitřních stránek je sdílené (`src/sablony/sdilene`) a bere vzhled z CSS proměnných na obalu `<div data-sablona data-paleta style={tokeny}>`.
- `src/bloky/`: knihovna bloků úvodní stránky (viz funkce) a bloky obsahu stránek.
- `src/pravni/`: `povinne-informace.ts` (14 položek s názvy), `lhuty.ts` (zákonné lhůty jako konfigurace se `zdroj` a `overeno`), `prohlaseni-pristupnosti.ts`.

Hosting: `vercel.json` s `regions: ["fra1"]` a crony. Vercel Cron běží v UTC, proto dvě spuštění (22:05 a 23:05 UTC), handler je idempotentní, chráněný `CRON_SECRET`. Úkoly: obnovit tag desky po půlnoci v Praze, zapsat událost „sejmuto“, spustit naplánované publikace. Skript `scripts/domena-pridat.ts` přidá doménu obce přes Vercel API a vypíše DNS záznamy. Soubory: `@payloadcms/storage-s3` na Supabase Storage, privátní bucket. Databáze: `DATABASE_URI` přes pooler 6543 s malým `pool.max`, migrace přes `DATABASE_URI_MIGRACE` (přímé spojení nebo pooler 5432).

Rozhraní ven: `GET /api/krize/aktivni?obec=<slug>` vrací `{ hlavni, dalsich }`, kde `hlavni` je jedno nejzávažnější aktivní hlášení nebo `null`. Pole hlášení: `id`, `uroven`, `titulek`, `text`, `odkazText`, `odkazUrl`, `casti` (pole `{nazev, slug}`), `platiOd`, `platiDo`, `updatedAt`.
</architektura>

<datovy_model>
Plugin `@payloadcms/plugin-multi-tenant`: `tenantsSlug: 'obce'`, pole tenanta `obec` na všech obsahových kolekcích, uživatelům pole `obce`, `userHasAccessToAllTenants` pro `superadmin`, `cleanupAfterTenantDelete: false`. Smazání obce smí jen superadmin a jen archivací. Veřejné čtení vždy filtruj podle obce sám (plugin hlídá přihlášené, ne anonymy). Nové a měněné kolekce:

| Kolekce | Pole a pravidla |
| --- | --- |
| `obce` | sdílená pole ze zadání (`nazev`, `slug`, `domeny[]`, `sablona`, `paleta` 0–2, `urovenEditoru`, `moduly[]`, `znak`, `adresa`, `ico`, `datovaSchranka`, `cisloUctu`, `uredniHodiny`, `kontakty`, `poverenec`, `castiObce[{nazev,slug}]`) plus `dic`, `adresaUradovny`, `podatelnaEmail`, `telefon`, `analytika` (`zadna`, `logy`, `souhlas`). Doména: unikátní hostname bez schématu, validace tvaru. `urovenEditoru`, `moduly`, `domeny` smí měnit jen superadmin. `sablona` a `paleta` smí měnit správce |
| `users` | role `superadmin`, `spravce`, `redaktor`; `obce[]`; TOTP pole (šifrované tajemství, záložní kódy hashované). Počet uživatelů obce podle úrovně (3, 10, neomezeně) |
| `nastaveni-webu` | jeden dokument na obec, `versions.drafts`; `vzhled` (12 barevných tokenů, písmo, zaoblení, hustota), `uvodniBloky[{typ, viditelny, nastaveni}]`, `menu` (přejmenování a pořadí), `seo` (popis, obrázek pro sdílení), `rozcestnik` |
| `stranky` | `nazev`, `slug`, `rodic` (nejvýš 2 úrovně, validace), `typ` (`text`, `rozcestnik`, `kontakt`), `skupina` (`situace`, `sluzba`, `obecna`), `obsah` (Lexical), `poradi`, `vMenu`, `systemovyKlic`, `schvaleni`. Stránky se `systemovyKlic` nejdou smazat, přesunout ani vrátit do konceptu (access + DB trigger novou migrací) |
| `aktuality` | stávající plus `obec` a `schvaleni` (`koncept`, `ke-schvaleni`, `vraceno`, `schvaleno` s komentářem; stejné pole mají `stranky` a `uredni-deska`) |
| `akce` | `nazev`, `slug`, `od`, `do`, `celyDen`, `misto`, `popis`, `porada` (spolek), `kategorie`, `obrazek` |
| `rozhlas` | `text` (prostý, max 1 000 znaků), `platiOd`, `platiDo`, `casRelace`. Bez audia |
| `zasedani` | `datum`, `typ`, `program`, `pozvanka`, `zapis`, `usneseni` (soubory v `dokumenty`), `zverejnenoNaDesce`; upozornění podle `lhuty.ts` |
| `zastupitele` | stávající plus `obec` |
| `uredni-deska` | stávající plus `obec`, `verejnaVyhlaska` (checkbox), `osobniUdajeKontrola` (`neobsahuje`, `anonymizovano`, `zakonnyDuvod`; povinné pro publikaci), `importovano`. `skrytPoSejmuti` výchozí `true` (změň `defaultValue`, nová migrace pro výchozí hodnotu sloupce). Veřejná vyhláška: `vyvesenoDo` nejdříve `nejdrivSejmuti(od)` (funkce v `lib/deska.ts`, test) |
| `kategorie-desky` | stávající plus `obec`, unikátnost v rámci obce |
| `evidence-vyveseni` | jen přidávání: `dokumentId`, `verze`, `udalost` (`vyveseno`, `zmeneno`, `sejmuto`, `ukonceno`), `nazev`, `puvodce`, `vyvesenoOd`, `vyvesenoDo`, `uzivatel`, `sha256`, `cas`. Trigger v databázi zakáže UPDATE a DELETE |
| `audit` | jen přidávání: `uzivatel`, `akce` (vytvoření, změna, publikace, smazání, přihlášení, neúspěšné přihlášení), `kolekce`, `dokumentId`, `zmeny` (rozdíl bez hesel a tajemství), `cas`, `ip` zkrácená. Trigger jako výše. Čte správce své obce a superadmin |
| `krizova-hlaseni` | stávající, `tykaSe` nahraď polem `casti` (pole slugů z `obce.castiObce`, prázdné = celá obec, validace vůči obci); datová migrace zkusí `tykaSe` spárovat podle názvu, nespárované zapíše do `text` s větou „Týká se: …“ |
| `dokumenty` | stávající plus `obec`, `urceni` (`deska`, `verejny`), `typ` (`obecny`, `vyhlaska`, `rozpocet`, `zaverecny-ucet`, `vyhled`, `zapis`, `zpravodaj`), `rok`, `sha256` (počítá hook při nahrání). Soubor navázaný na vyvěšenou desku nejde nahradit, jen přidat nový dokument |
| `media` | stávající plus `obec`, `altSchvaleno`, `altSchvalil` |
| `galerie` | `nazev`, `slug`, `datum`, `obrazky[]` (`media`). Publikovat jde, jen když mají všechny obrázky `altSchvaleno` |
| `povinne-informace` | jeden dokument na obec, 14 pevných položek s `kod` (1 až 14, podpoložky 4.1 až 4.8, 8.1 až 8.2, 11.1 až 11.2, 12.1 až 12.2, 13.1 až 13.2), názvy zamčené v kódu, editovatelný je `obsah` a příznak `nepouziva` |
| `popisy-ukonu` | pole Přílohy č. 2 vyhlášky 515/2020 (přesný seznam z textu vyhlášky, odhad kolem 21), vzory úkonů (odpady, pes, hrobové místo, ověření podpisu) označené „vzor k úpravě obcí“ |
| `prohlaseni-pristupnosti` | jeden dokument na obec: `stavSouladu` (`uplny`, `castecny`, `nesoulad`), `nepristupnyObsah[{popis, duvod, nahradniReseni}]`, `datumSestaveni`, `datumPrezkumu`, `textUpraveny` (volitelný) |

Tabulky mimo Payload (SQL v nové migraci, schéma `obec`, RLS bez politik): `hledani` (`obec_id`, `typ`, `ref_id`, `titul`, `text`, `url`, `viditelne_od`, `viditelne_do`, `tsv`) a `navstevnost_den` (`obec_id`, `den`, `cesta`, `pocet`, bez IP a user-agenta).

Přístup: anonym čte jen publikované záznamy své obce (`publishedOr` zachovej). Redaktor a správce vidí jen své obce. Úroveň editoru omezuje zápis na serveru.
</datovy_model>

<funkce>
**Mapa webu** (nejvýš 2 úrovně, úkolové názvy, hlavní menu nejvýš 5 položek). Hlavní menu: Potřebuji vyřídit, Úřad, Aktuality a akce, Obec, Kontakty. Úvod je logo a znak. Hledání a Krizová hlášení jsou v hlavičce a patičce.

| Cesta | Obsah |
| --- | --- |
| `/` | úvodní stránka šablony |
| `/potrebuji-vyridit`, `/potrebuji-vyridit/[slug]`, `/potrebuji-vyridit/a-z` | životní situace a abecední seznam služeb ze `stranky` (`skupina` situace a služba). Až dodá digitální úřad `zivotniSituace`, přepne se zdroj v jediném adaptéru `src/data/situace.ts`. U každé služby je i cesta offline: telefon, úřední hodiny, adresa |
| `/urad` | rozcestník |
| `/uredni-deska`, `/uredni-deska/[id]` | deska a detail; `/uredni-deska/rss.xml`, `/uredni-deska/atom.xml` |
| `/urad/zastupitelstvo` | zastupitelé a zasedání se zápisy |
| `/urad/vyhlasky`, `/urad/rozpocet` | dokumenty podle `typ` (rozpočet, výhled, závěrečný účet) |
| `/urad/povinne-informace`, `/urad/povinne-informace/ukony/[slug]` | vyhláška 515/2020 |
| `/urad/osobni-udaje`, `/urad/prohlaseni-o-pristupnosti` | texty z `docs/pravni-dokumenty.md` jako šablona s hranatými závorkami `[DOPLNIT]` |
| `/aktuality`, `/aktuality/[slug]`, `/akce`, `/akce/[slug]`, `/rozhlas`, `/zpravodaj` | aktuality s rubrikami, kalendář akcí s `kalendar.ics`, hlášení rozhlasu jako text, čísla zpravodaje |
| `/obec`, `/obec/historie`, `/obec/casti`, `/obec/mapa` | o obci; mapa bez dlaždic třetích stran před kliknutím (dvě kliknutí), jinak odkaz na mapy |
| `/krizova-hlaseni`, `/kontakty`, `/hledani`, `/sitemap.xml`, `/robots.txt` | viz níže |

Patička: Povinně zveřejňované informace, Prohlášení o přístupnosti, Osobní údaje, Nastavení cookies, Mapa stránek, Úřední deska, RSS, Kontakty a text „Provozuje CodeKom“ s černobílým logem z `brand/`. Hlavní značkou je znak obce.

**Šablony.** Z `design/generator/bodies` a prototypů převeď všech 20 úvodních stránek do React layoutů. Ilustrace jsou SVG v kódu, barvy z paletových extra tokenů (`hill`, `meadow`, `roof`), žádné stockové fotky. Písma s licencí OFL hostuj u nás (prototypy používají Google Fonts, produkce ne), načte se jen sada aktivní šablony. Bloky závislé na jiných modulech (hladina z IoT, odpady, odpověď AI) zobrazují ručně zadané ukázkové hodnoty s příznakem `zdroj: 'rucne'`, nebo se nenabízejí. Povinné bloky: hlavička, krizový banner, rychlé akce, výtah z úřední desky, kontakty a úřední hodiny, patička. Obec si v administraci (pohled „Vzhled“) vybere šablonu a paletu z galerie 20 × 3 s náhledem na `/nahled/[sablona]/[paleta]` (jen přihlášení, data Javoří Lhoty, parametr `?krize=info|warning|emergency` jen v náhledu).

**Úřední deska výpis.** Formulář `next/form` s metodou GET: výběr kategorie, skupina přepínačů Visí / Sejmuté / Všechny (`fieldset` a `legend`), hledání (`type="search"`, viditelný popisek), tlačítko Filtrovat, odkaz Zrušit filtr jen u neprázdného filtru. Stav jen v URL (`parseDeskaParams`, `deskaHref`, `deskaWhere`, `deskaSort`). Tabulka má `caption` z `popisFiltru` a počtu, `th scope="col"`, název dokumentu jako `th scope="row"` s odkazem, sloupce Kategorie, Číslo jednací, Vyvěšeno, Sejmutí („do odvolání“, je-li prázdné), Stav textem, Soubor (typ, velikost). Na mobilu, kde řádky přejdou na bloky, nastav explicitní role `table`, `rowgroup`, `row`, `columnheader`, `rowheader`, `cell`. Stránkování 25 na stranu: `nav` s popiskem, `aria-current="page"`, předchozí a další, `rel` odkazy. Strana mimo rozsah přesměruje na poslední. Oblast `role="status"` hlásí počet nalezených. Prázdný stav: „Na úřední desce teď nic nevisí.“ s odkazem na sejmuté, při filtru „Žádný dokument neodpovídá filtru.“ s odkazem Zrušit filtr. Načítání: `loading.tsx` s `aria-busy`. Chyba: `error.tsx` s telefonem, úředními hodinami a adresou obce.

**Detail dokumentu.** `h1`, popisný seznam (původce, kategorie, číslo jednací, vyvěšeno, sejmuto nebo „visí do“, stav), anotace, soubory přes `/uredni-deska/[id]/soubor/[souborId]`. Handler pustí soubor, jen když dokument visí, nebo je sejmutý a není `skrytPoSejmuti`. Jinak 404. Detail ukazuje „Záznam o vyvěšení“ (události z `evidence-vyveseni`, SHA-256 souboru). Sejmutý skrytý dokument vrací 404 s větou „Dokument už není na úřední desce zveřejněn.“.

**Evidence a export.** Hook `afterChange` zapíše událost `vyveseno` při prvním zveřejnění a `zmeneno` při každé další změně (nová verze). Denní cron zapíše `sejmuto` pro dokumenty po posledním dni. `GET /api/uredni-deska/evidence?od=&do=&format=csv|pdf` (správce a superadmin své obce) vrací seznam; `GET /api/uredni-deska/[id]/potvrzeni?format=pdf` potvrzení o vyvěšení jednoho dokumentu. CSV je UTF-8 s BOM, středník, hodnoty začínající `=`, `+`, `-`, `@` ošetři proti vložení vzorce. PDF knihovnu zdůvodni v `docs/rozhodnuti.md`.

**RSS a Atom.** Jen dokumenty, které visí, nejvýš 100, správný `Content-Type`, escapování XML, stabilní `guid`, `<link rel="alternate">` na stránce desky. V testu validuj parserem.

**Krizový banner.** Layout vykreslí nejvýš jedno hlášení z `vyberBanner`. Prvek je `<section aria-labelledby="krize-nadpis">` s `<h2 id="krize-nadpis">` ve tvaru „Výstraha: titulek“ (úroveň slovem, ikona `IkonaUrovne` dekorativní), text, odkaz přes `bezpecnyOdkaz`, řádek „Týká se: …“ podle `casti` a „Další hlášení: N“ s odkazem na `/krizova-hlaseni`. Krizovou situaci nejde zavřít (žádné tlačítko). Informaci a výstrahu jde skrýt přes `SkrytHlaseni`, bez JavaScriptu tlačítko vůbec není. Banner leží v `Suspense` a čas čte při požadavku, ne ze statické cache, aby konec platnosti neměl zpoždění. Klientský ostrůvek volá `/api/krize/aktivni` každých 60 s, jen když je stránka viditelná (`visibilitychange` obnoví odpočet a hned dotáhne data). Nové nebo změněné hlášení (jiné `id` nebo `updatedAt`) nahradí banner a oznámí se v připravené prázdné oblasti `role="status" aria-live="polite"` (u krize `assertive`) větou „Nové hlášení: Výstraha, titulek“. Samotný banner `aria-live` nemá, aby se neoznamoval dvakrát. Odpověď endpointu má `Cache-Control: no-store`, data za ním jsou v cache s tagem `obec:<id>:krize` a okamžitou expirací po změně. Neznámá obec vrací 404 s `{ chyba }`, špatný dotaz 400. Stránka `/krizova-hlaseni` ukáže všechna aktivní hlášení (nejzávažnější první) a archiv posledních 12 měsíců, jednotlivě bez možnosti skrýt.

**Hledání.** Migrace zkontroluje `pg_available_extensions` a vytvoří `unaccent` a `pg_trgm` (na Supabase do schématu `extensions`). Český slovník (hunspell) je jen bonus, pokud je dostupný. Jinak konfigurace `simple` s `unaccent`. Obal `unaccent` do vlastní IMMUTABLE funkce (`search_path` pevně). Index naplňují hooky `afterChange` a `afterDelete` (aktuality, akce, stránky, deska, dokumenty, zastupitelé, povinné informace). Dotaz `websearch_to_tsquery` plus trigramová podobnost pro překlepy, řazení `ts_rank`, filtr `obec_id` a `viditelne_od/do` (skrytý sejmutý dokument se nenajde). Prázdný stav: „Nic nenalezeno. Zkuste kratší slovo nebo zavolejte na úřad“ s telefonem.

**Povinné informace.** Stránka vykreslí 14 položek v pořadí a s názvy z vyhlášky 515/2020 (text převezmi z e-Sbírky do `src/pravni/povinne-informace.ts`). Položky 1, 4.x, 5, 6, 7 se předvyplní z `obce`, 8.1 a 8.2 a 11 odkazují na dokumenty podle `typ`, ostatní jsou obsah správce. Nevyplněná položka ukáže větu, že informaci obec nezveřejňuje, a v administraci je v kontrolním seznamu „chybí“. Pořadí a názvy editor nezmění.

**Prohlášení o přístupnosti.** Generátor sestaví text podle vzoru z metodického pokynu DIA (EN 301 549 V3.2.1): stav souladu, nepřístupný obsah s důvody a náhradním řešením, data sestavení a přezkumu, kontakt, postup při podezření na nesoulad. Správce text upraví. Tlačítko „Obnovit z generátoru“ vrací výchozí. Odkaz je v patičce každé stránky. Výchozí stav je `castecny`, dokud neproběhne ruční test čtečkou.

**Cookies a návštěvnost.** Výchozí `analytika: 'zadna'`, jsou jen nezbytné cookies a lišta se nezobrazuje. Volba `logy` počítá agregované zobrazení do `navstevnost_den` bez IP, user-agenta a identifikátoru v zařízení. Volba `souhlas` zobrazí lištu s rovnocennými tlačítky „Přijmout“ a „Odmítnout“, volba se uloží do nezbytné cookie a skripty měření se načtou až po souhlasu. Volbu jde kdykoli změnit v „Nastavení cookies“. Videa a mapy třetích stran jen po kliknutí.

**SEO a výkon.** `generateMetadata` (titulek, popis, canonical podle hlavní domény, OpenGraph, znak), `sitemap.xml` a `robots.txt` per host (záložní subdoména `noindex`, má-li obec vlastní), JSON-LD `GovernmentOrganization` (adresa, telefon, hodiny). Rozpočet: LCP pod 2,5 s na pomalém 4G (cíl 2,0 s), CLS do 0,1, první načtení do 500 kB, JavaScript do 100 kB gzip, `next/image` s rozměry. Rozpočty zapiš do `lighthouserc.json`.

**Editor ve třech úrovních.** Jedna aplikace, úroveň (`urovenEditoru`) je oprávnění vynucené na serveru v access funkcích a hookách (`src/access/urovne.ts`, tabulka schopností), ne jen skrytá tlačítka.

| Schopnost | Základ | Pokročilý | Advance |
| --- | --- | --- | --- |
| Stránky | do 30, 3 typy | neomezeně | neomezeně |
| Úvodní stránka | obsah do pevných bloků | přeskládat, skrýt, přidat bloky z knihovny | volné bloky a sloupce 1–4 |
| Menu | přejmenovat, přeskládat | přidat a vnořit na 2 úrovně | stejně |
| Vzhled | šablona a 1 ze 3 palet | + vlastní hlavní barva | všech 12 tokenů |
| Schvalování | redaktor smí publikovat | fronta, publikuje správce | stejně |
| Verze | 30 dní | 1 rok | neomezeně |

Skladatel úvodní stránky (vlastní pohled v administraci) pracuje nad `nastaveni-webu.uvodniBloky` v konceptu s živým náhledem. Povinné bloky a povinné stránky nejdou skrýt ani smazat. V Advance správce upravuje tokeny s živou kontrolou kontrastu: text na pozadí a mutovaný text aspoň 4,5 : 1, `onPrimary` na `primary`, `onAccent` na `accent`, `onDeep` na `deep` aspoň 4,5 : 1, odkaz na pozadí 4,5 : 1, `accent` a `link` jako prvek rozhraní a focus aspoň 3 : 1. Chyba zablokuje publikaci na serveru (`ValidationError` v hooku `beforeChange` při přechodu na publikováno) i v rozhraní, editor navrhne nejbližší vyhovující odstín. Změna šablony nesmí zrušit povinné bloky. Při přechodu na nižší úroveň se vlastní rozvržení zamrazí, zobrazuje se dál, ale nejde upravovat.

Schvalovací fronta (pohled v administraci pro Pokročilý a Advance) ukazuje záznamy `schvaleni: 'ke-schvaleni'` ze všech kolekcí, správce schválí, nebo vrátí s komentářem. Plánované publikování: `versions.drafts.schedulePublish` a fronta úloh Payloadu spouštěná cronem, který po zveřejnění obnoví tag obce. Náhled před publikací: Draft Mode s krátkodobým tokenem.

Administrace česky, přehled (dashboard) ukáže: čeká na schválení, brzy sejmuté dokumenty (7 dní), lhůty podle `lhuty.ts`, aktivní krizová hlášení a návštěvnost 7 dní, je-li zapnutá. 2FA (TOTP) je povinné pro `superadmin` a `spravce`: první přihlášení vyžádá zřízení, 10 záložních kódů, omezení pokusů. Hotový plugin ověř a použij, nebo napiš vlastní strategii a zapiš volbu do `docs/rozhodnuti.md`.

**Import ze starého webu.** Pohled „Import“ (správce) a skript `scripts/import-stary-web.ts`: RSS adresa aktualit nebo CSV aktualit a desky. Povolen jen `https`, blokuj privátní a lokální adresy (SSRF), omez velikost a počet. HTML převeď na Lexical a vyčisti. Vše se založí jako koncept s `importovano: true`, nikdy se nepublikuje automaticky. U desky zachová původní data vyvěšení a do evidence zapíše událost „importováno“. Výsledek ukáže počet zpracovaných, přeskočených a chybných řádků.
</funkce>

<pravidla>
- Úřední deska, § 26 správního řádu: nepřetržitě veřejně přístupná a dálkově přístupná. Veřejná vyhláška se považuje za doručenou 15. dnem po vyvěšení (zdroj: Právní prostor, Kasl 2016), proto výpočet `nejdrivSejmuti` a varování v administraci. Přesné znění § 26 a započítání dne [OVĚŘIT] v e-Sbírce.
- NSS 2 As 47/2016: vyvěšení musí být evidováno a prokazatelné. Proto `evidence-vyveseni` jen přidávací, hash souboru, verze místo přepsání, nemožnost smazat vyvěšený dokument (trigger už existuje) a export.
- „Po sejmutí nezveřejňovat“ je výchozí zapnuté. Dokument s touto volbou po posledním dni zmizí z webu, ze sitemapy, z RSS, z hledání i z přímého odkazu na soubor, v administraci a v evidenci zůstává.
- Osobní údaje: před publikací na desce správce potvrdí `osobniUdajeKontrola`. Checklist: rodná čísla, data narození, adresy a čísla účtů fyzických osob.
- Krizová hlášení: viz `CLAUDE.md`. Na stránce hlášení je věta, že hlášení nenahrazuje varovný systém IZS.
- Lhůty z 250/2000 Sb. (rozpočet, výhled, závěrečný účet) a § 95 odst. 2 zákona 128/2000 Sb. (zápis ze zastupitelstva) patří do `src/pravni/lhuty.ts` jako konfigurace s polem `zdroj` a `overeno`. Čísla z paměti (15 dnů před projednáním, zápis do 15 dnů, 6 let) jsou NEOVĚŘENÁ: použij je jen po ověření, jinak ponech hodnotu `null` a v administraci žádné upozornění.
- Vyhláška 515/2020 Sb.: 14 položek Přílohy č. 1 v pevném pořadí, osnova Přílohy č. 2. Rozpor v datu účinnosti (1. 8. 2021, nebo 15. den po vyhlášení) zapiš do ověření.
- Přístupnost: zákon 99/2019 Sb. (§ 8 prohlášení, § 9 podnět), EN 301 549 V3.2.1, stavíme na WCAG 2.2 AA. O pokutách netvrď nic.
- Cookies: § 89 odst. 3 zákona 127/2005 Sb. Měření bez zápisu do zařízení je konzervativní výklad, ÚOOÚ k němu stanovisko neověřeno.
- Úřad je fallback: stránka s online službou má i telefon, hodiny a adresu úřadu.
</pravidla>

<design_a_pristupnost>
- Pravidla unslop z `CLAUDE.md`: řezy písma nejvýš 600, věty velkým písmenem, bez vykřičníků, jedna akcentová barva, žádné přechody, záře a emoji, mřížka 4 px, tenké linky. Navíc žádné nadpisy nad nadpisy ve verzálkách a žádné odkazy se šipkou „→“. Napiš skript `pnpm unslop`, který zdroj a CSS zkontroluje (váhy 700 a více, `gradient`, verzálky přes `text-transform`, vykřičník v textech, emoji, „→“) a spouští se v `pnpm lint`.
- Text 17 px, řádkování textu 1,5 až 1,6, nadpisů 1,1 až 1,25, cíle dotyku aspoň 44 × 44 px, kontrast textu aspoň 4,5 : 1, focus aspoň 3 : 1 a viditelný (na tmavých pásech světlý). Obsah se vejde na 375 px bez vodorovného posunu a při zoomu 200 %.
- Landmarky: `header`, `nav` s popiskem, `main`, `footer`, banner jako `section`. Jedno `h1` na stránce, nadpisy bez přeskoku úrovní. Odkaz „Přeskočit na obsah“ je první prvek. Tabulky mají `caption`. Barva nikdy nenese význam sama (stav slovem). Respektuj `prefers-reduced-motion`. Přepínače ostrůvků ovladatelné klávesnicí a fungují bez JavaScriptu, kde to jde.
- Každá šablona má 3 palety a všechny kombinace projdou kontrastem automaticky (`zkontrolujTokeny` v testu).
- Texty česky, krátce, úkolově. Chyby říkají, co se stalo a co dělat.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Izolace obcí je akceptační kritérium, ne vedlejší efekt: veřejné čtení vždy přes `src/data` s filtrem obce, soubory, hledání, RSS, sitemap, export i endpoint krize testované proti úniku mezi obcemi. Plugin hlídá aplikační vrstvu, přímé SQL ji obchází, proto zůstává RLS bez politik a schéma mimo Data API.
- Secrets jen v `.env` (nový `.env.example`: `PAYLOAD_SECRET`, `DATABASE_URI`, `DATABASE_URI_MIGRACE`, `S3_*`, `CRON_SECRET`, `VERCEL_TOKEN`, klíč pro šifrování TOTP). Tajemství TOTP šifrovat (AES-GCM), nelogovat.
- Hlavičky: stávající plus CSP (nonce, bez `unsafe-inline` na veřejném webu; administraci Payloadu otestuj zvlášť), HSTS, `frame-ancestors 'none'`. Rate limit na `/api/krize/aktivni`, hledání, export a přihlášení.
- Data v EU: Supabase Frankfurt, Vercel `fra1`.
- Nahrávání: kontrola MIME podle obsahu, limit velikosti, PDF/DOCX/XLSX/JPEG/PNG/WebP/AVIF, názvy souborů se normalizují. Import: viz SSRF. Audit nikdy neukládá hesla ani tajemství.
</bezpecnost_a_soukromi>

<testy>
Test nepřeskakuj ani neupravuj, aby prošel.
- Vitest (jednotky): `datum`, `deska` (parsování URL, `deskaWhere` na hranách dne, `nejdrivSejmuti`, stavy), `krize` (výběr, pořadí, okna platnosti, `klicSkryti`, `bezpecnyOdkaz`), `urovne` (každá schopnost × úroveň × role), `kontrast`, generátor povinných informací a prohlášení, CSV (ošetření vzorců), RSS, mapování hostname, `unslop`.
- Integrace: Payload proti skutečnému Postgresu 17 v CI (service container, rozšíření `unaccent` a `pg_trgm`), migrace od nuly a `down`. PGlite jako rychlá kontrola migrací, pokud podporuje použitá rozšíření (ověř). Testy: trigger odmítne smazání vyvěšeného dokumentu, CHECK omezení, append-only tabulky, nemožnost smazat systémovou stránku, zámek nahrazení souboru, schvalování, blokace publikace s nízkým kontrastem, 2FA vynucení, cross-tenant (uživatel obce A nečte ani nezapisuje do B, veřejné funkce obce A nikdy nevrátí řádek obce B).
- Playwright na 375 a 1280 px: filtr desky (URL, stránkování, prázdné stavy, klávesnice), detail a soubory (sejmutý skrytý vrací 404), banner (info a výstraha jdou skrýt a zůstanou skryté po obnovení, po změně `updatedAt` se vrátí, krize nemá tlačítko, bez JavaScriptu tlačítko není, polling s `page.clock` oznámí nové hlášení do 60 s a při skryté záložce neprobíhá), dvě domény stejné obce, výběr šablony, hledání, cookies lišta, vynucené 2FA.
- axe (`@axe-core/playwright`, WCAG 2.1 AA a best-practice): úvodní stránka všech 20 šablon × 3 palet × 4 krizové stavy (žádný, info, warning, emergency) = 240 běhů, rozdělit do shardů. Navíc vnitřní stránky (deska, detail, povinné informace, prohlášení, hledání, aktualita, kontakty, krizová hlášení) na 3 šablonách × 3 paletách. Nula chyb.
- Lighthouse CI: rozpočty z `lighthouserc.json` na úvodní stránce, desce a aktualitě, profil mobil se zpomaleným 4G.
- CI (`.github/workflows/ci.yml`): `pnpm typecheck`, `lint`, `test`, migrace na čisté DB, `e2e`, `a11y`, Lighthouse.
</testy>

<postup>
Na začátku vypiš plán a seznam úkolů (`docs/progress.json` se stavy) a průběžně ho odškrtávej. Každý milník končí spuštěním `pnpm typecheck && pnpm lint && pnpm test` a commitem česky v rozkazovacím způsobu. Nezastavuj předčasně kvůli velikosti práce, po dvou neúspěšných opravách téhož problému se zastav a popiš ho.
- M0 Ověření a základ: ověř položky z `<overit>` a zapiš do `docs/verification-log.md`. Zvedni `payload` a všechny `@payloadcms/*` na přesně stejnou verzi (cíl 3.92.1, peer vyžaduje přesnou shodu), Next 16.4.x, React 19.3.x, Tailwind 4.3.x podle `npm view`. Major verze neměň. Založ monorepo a pnpm, ověř `pnpm build`.
- M1 Multi-tenant: `obce`, `users`, plugin, role, migrace (nové, na čisté DB), `proxy.ts`, `src/data`, `vercel.json`, seed obce Javoří Lhota, cross-tenant testy.
- M2 Tokeny a kostra šablon: `packages/tokeny`, registr šablon, sdílené vnitřní stránky, hlavička a patička, mapa webu, tři šablony (`naves`, `lipa`, `urad`), fonty, kontrola unslop.
- M3 Úřední deska: výpis, detail, soubory, evidence, export, RSS a Atom, cron, testy.
- M4 Krizový banner: komponenty, endpoint, stránka, `casti`, cache a testy včetně polling.
- M5 Obsah: aktuality, akce, rozhlas, zasedání, zastupitelé, stránky, dokumenty, galerie, rozpočet, hledání.
- M6 Právo: povinné informace, popisy úkonů, prohlášení o přístupnosti, osobní údaje, cookies a návštěvnost, SEO, sitemap, JSON-LD.
- M7 Editor: schopnosti úrovní, vzhled a kontrast, skladatel, schvalování, plánované publikování, náhled, audit, 2FA, přehled, import.
- M8 Zbývajících 17 šablon, seed obsahu z prototypů, matice axe 240 běhů, Lighthouse rozpočty, optimalizace.
- M9 CI, `.env.example`, dokumentace nasazení (domény, DNS, Vercel, Supabase), záznam rozhodnutí v `docs/rozhodnuti.md`, ruční průchod demo obce na dvou doménách.
</postup>

<hotovo_kdyz>
Vše projde a je to vidět:
1. `pnpm install && pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v kořeni bez chyby. Žádný přeskočený test.
2. `payload migrate` na prázdné databázi projde, `migrate:down` a znovu `up` také. Aplikované migrace z 2. 11. jsou beze změny.
3. Demo obec Javoří Lhota běží na vlastní doméně i na záložní subdoméně ([DOPLNIT: domény]; lokálně `javori-lhota.localhost` a druhý hostname), druhá obec nevidí její data a naopak (test).
4. Všech 20 šablon se 3 paletami se vykreslí z dat, přepnutí šablony a palety v administraci se projeví hned po uložení. `pnpm a11y` má 240 běhů bez chyb pro 4 krizové stavy.
5. Deska: filtr kategorie, stav a hledání v URL, stránkování, prázdné stavy, detail, RSS a Atom validní, export CSV a PDF, vyvěšený dokument nejde smazat (aplikace ani databáze), výchozí „Po sejmutí nezveřejňovat“ zapnuté a sejmutý skrytý dokument je nedostupný včetně souboru.
6. Banner: jedno hlášení, úroveň slovem, krize nejde zavřít, ostatní jdou skrýt s klíčem `id+updatedAt`, tlačítko až po hydrataci, obnova po 60 s s oznámením, `/krizova-hlaseni` a `/api/krize/aktivni` fungují, tag `krize` expiruje okamžitě.
7. Povinné informace mají 14 položek v pořadí vyhlášky, prohlášení o přístupnosti je vygenerované, editovatelné a odkazované v patičce každé stránky.
8. Editor: Základ, Pokročilý a Advance se chovají podle tabulky, povinné stránky a bloky nejdou smazat, nízký kontrast zablokuje publikaci, schvalovací fronta funguje, 2FA je povinné pro správce a superadmina, audit zaznamenává změny a nejde upravit.
9. Hledání najde „Zastupitelstvo“ i „zastupitelstvo“ bez diakritiky a nevrátí skryté dokumenty. Import RSS a CSV vytvoří koncepty.
10. Lighthouse rozpočty (LCP pod 2,5 s na pomalém 4G) splněny na úvodní stránce, desce a aktualitě.
11. `docs/verification-log.md` obsahuje výsledek každé položky z `<overit>`, neověřené je v kódu označené `[OVĚŘIT]`.
</hotovo_kdyz>

<overit>
Ověř z dokumentace a zapiš zdroj, datum a výsledek do `docs/verification-log.md`. Co se ověřit nepodaří, nech v kódu a administraci označené `[OVĚŘIT]`.

| Položka | Jak |
| --- | --- |
| Payload 3.92 a Next 16.4 kompatibilita, přesná shoda verzí `@payloadcms/*`, podpora `cacheComponents` a `use cache` s Local API, známé potíže s Turbopack | `npm view payload version`, `npm view @payloadcms/next@3.92.1 peerDependencies`, `gh issue list -R payloadcms/payload -S "next 16"`, changelog |
| Plugin multi-tenant: názvy voleb (`tenantField`, `tenantsArrayField`, `userHasAccessToAllTenants`), chování `unique` v rámci tenanta, drafty a autosave, veřejné čtení | https://payloadcms.com/docs/plugins/multi-tenant |
| Vlastní domény na Vercelu: limity počtu domén podle plánu, automatické TLS, API pro přidání domény | https://vercel.com/docs/platforms, https://vercel.com/docs/domains |
| Supabase Storage přes S3 adaptér Payloadu: endpoint, `forcePathStyle`, region, privátní bucket, klíče | https://supabase.com/docs/guides/storage/s3/compatibility, https://payloadcms.com/docs/upload/storage-adapters |
| `unaccent`, `pg_trgm` a český slovník na Supabase | `select name from pg_available_extensions` na projektu (nástroj Supabase `list_extensions`), https://supabase.com/docs/guides/database/extensions |
| Znění § 26 správního řádu (500/2004 Sb.), § 11 a § 17 zákona 250/2000 Sb., § 95 zákona 128/2000 Sb. ke 11/2026 | e-Sbírka (e-sbirka.gov.cz), metodika MV https://mvcr.cz/soubor/mv-113940-2-as-2020.aspx |
| Vyhláška 515/2020 Sb.: přesné názvy 14 položek Přílohy č. 1, pole Přílohy č. 2, datum účinnosti, novely | e-Sbírka, záložka Historie |
| 2FA pro Payload (TOTP): hotový plugin, nebo vlastní strategie | `npm search payload totp`, https://payloadcms.com/docs/authentication/overview |
| Metodický pokyn DIA (v1.6 a 1.7), vzor prohlášení, interval přezkumu | https://www.dia.gov.cz (odkazy v `research/poznamky/web_obce_a_prodej.md`) |
| § 89 odst. 3 zákona 127/2005 Sb. a stanovisko ÚOOÚ k měření bez zápisu do zařízení | e-Sbírka, https://uoou.gov.cz |
| `schedulePublish` a fronta úloh Payloadu s Postgresem, Vercel Cron a časové pásmo | dokumentace Payload Jobs a Vercel Cron |
| Písma šablon: latin-ext, OFL, načítá se jen sada aktivní šablony | soubory písem, síťové požadavky v Playwrightu |
| Změna dokumentu při vyvěšení (nová lhůta, nebo jen verze) | právník; do té doby verze a událost `zmeneno` bez resetu lhůty |
</overit>

<zaver>
Na konci napiš krátké shrnutí ve třech částech.
- Hotovo: co funguje a čím je to ověřené (výpis příkazů a počty, například „240 axe běhů bez chyb“, výsledky Lighthouse, ruční průchod demo obce na dvou doménách).
- Zbývá: co nevzniklo nebo je omezené, a které položky z `<overit>` zůstaly neověřené.
- Místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru: domény (CodeKom, administrace, demo), údaje obce Javoří Lhota (IČO, datová schránka, účet, DIČ), texty osobních údajů, kontakty, hodnoty v `lhuty.ts`.
Nepředstírej hotové, co hotové není.
</zaver>

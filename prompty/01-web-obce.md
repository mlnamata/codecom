# Prompt: Web obce a redakční systém

Použití: vlož celý text do Claude Code v kořeni repozitáře `codecom`, nebo napiš: Proveď zadání v `prompty/01-web-obce.md`. Ostatní části (mobil, digitální úřad, IoT, AI) staví na kolekcích a endpointech z této části.
Závisí na: žádné jiné části. Je to základ, který musí být hotový jako první.

<kontext>
Web obce je vstupní produkt CodeKomu. Zákon po něm chce elektronickou úřední desku (§ 26 správního řádu), povinně zveřejňované informace (vyhl. 515/2020 Sb.), prohlášení o přístupnosti (zákon 99/2019 Sb.) a souhlas s cookies (§ 89 odst. 3 zákona 127/2005 Sb.). Čtou ho i senioři na pomalém mobilu. Spravuje ho starosta nebo účetní, takže editor nesmí dovolit rozbít přístupnost ani povinné části.

Jeden nasazený `apps/web` obsluhuje všechny obce (tenant = obec) na jejich doménách. Společný kontext je v `CLAUDE.md`. Podklady: `docs/navrh-platformy/01` až `04`, `docs/rozhodnuti.md`, `docs/pravni-dokumenty.md`, `research/poznamky/web_obce_a_prodej.md` a `stack_a_claude_code.md`. Vzhled šablon je v `design/prototypy` (`Main.dc.html` = naves, `S02` až `S20`) a jeho zdroj v `design/generator` (`palettes.py`: 12 barevných tokenů pro každou ze 3 palet, `tpls.py`: písma a metadata, `bodies/`: těla stránek). Z `design/nastroje` použij, co jde.
</kontext>

<cil>
Na konci běží lokálně demo obec Javoří Lhota s obsahem z `obsah/javori-lhota/*.json` na dvou hostnames (vlastní doména a záložní subdoména se nastaví až při nasazení) a obsah jedné obce není vidět v jiné. Nic se nenasazuje, zakladatel zatím chce vše jen v repozitáři. Všech 20 šablon se třemi paletami funguje jako React layouty a obec je vybere v české administraci. Úřední deska a krizový banner splňují pravidla z `CLAUDE.md` a tohoto zadání, včetně záznamu o vyvěšení a sejmutí. Povinné informace a prohlášení o přístupnosti se generují z dat obce, editor má tři úrovně a nepustí do publikace nepřístupný vzhled. Testy, axe a migrace na čisté databázi projdou.
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

Prototypy 07 a 08. Pokud už proběhl prompt 07 (prototyp webu Javoří Lhoty bez databáze) nebo 08 (prototyp aplikace v prohlížeči), převezmi jejich datovou vrstvu, šablony, endpointy a obrazovky a jen vyměň zdroj dat; UI nepřepisuj. Konkrétně:
- Datová vrstva `apps/web/src/lib/data/` s rozhraním `ZdrojDat` a implementací `demo` zůstává. Přidej implementaci `payload` (Local API, pravidla o `src/data` a `use cache` z <architektura> platí pro ni) a volbu `CODEKOM_ZDROJ=payload`. Výchozí je `payload`, když je nastavené `DATABASE_URI`, jinak dál `demo`. Veřejné stránky volají jen rozhraní `ZdrojDat`, nikdy Payload přímo.
- Šablony v `apps/web/src/sablony/<klic>/` (`Hlavicka.tsx`, `Uvod.tsx`, `Paticka.tsx`, `styly.css`) jsou zdrojem pravdy; nepřevádějte je znovu z `design/generator` a drž názvy souborů z 07 (`Paticka.tsx`, ne `Patka.tsx`). Stránky ze 07 přesuň pod `app/(web)/sites/[obec]/` a obec předávej zdroji parametrem. Přepínač ukázky (`NEXT_PUBLIC_UKAZKA=1`) a `/ukazka/administrace` nech jako ukázku; skutečná administrace je Payload.
- Endpointy `GET /api/krize/aktivni`, `GET /api/obce`, `GET /api/obce/<slug>/prehled` a `POST /api/hlaseni-zavad` z 07 už existují nad demo daty. Ponech jejich tvar a zod schémata z `packages/typy`, přepni je na zdroj `payload` a doplň testy proti Payloadu. Pokud 07 neproběhl, `GET /api/obce` a `GET /api/krize/aktivni` postav podle <architektura>; `/prehled` a `POST /api/hlaseni-zavad` zůstávají mimo rozsah.
- Datové typy a domény z 07 (`@codekom/demo-data`, `@codekom/tokeny`, `@codekom/typy`) nepřepisuj; `packages/typy` sladi s `payload-types.ts`. Ukázkové úložiště v paměti (`demo-pamet.ts`) nepoužívej pro Payload.
- Pokud 07 ani 08 neproběhly, postupuj podle zbytku zadání a šablony převeď z `design/generator/bodies`.

Seed ukázkové obce. `seed:demo` (`pnpm --filter web seed:demo`) načte obsah z `obsah/javori-lhota/*.json` (soubory `obec.json`, `aktuality.json`, `akce.json`, `uredni-deska.json`, `krizova-hlaseni.json`, `rozhlas.json`, `zastupitele.json`), validuje ho zod schématy z `@codekom/demo-data` nebo `packages/typy` a zapíše do Payloadu. Obsah nic nevymýšlí ani nepřepisuje; chybí-li pole, je `[DOPLNIT: pole]`. Údaje jako IČO, datová schránka nebo účet jsou v JSON zjevná ukázka (například `[IČO]`) a seed je přenese beze změny. Ostatní soubory (`zivotni-situace.json`, `sluzby.json`, `prostory.json`, `hlaseni-zavad.json`, `budovy.json`, `asistent-ukazka.json`) patří promptům 03, 04 a 05. Datumy `vyvesenoOd` a `vyvesenoDo` ulož jako 12:00 UTC podle `src/lib/datum.ts`.
</vychozi_stav>

<rozsah>
Postav: monorepo; multi-tenant; 20 šablon se sdílenými vnitřními stránkami; mapu webu a obsahové kolekce; úřední desku s evidencí, exportem a kanály; krizový banner, stránku a endpoint; povinné informace, prohlášení o přístupnosti, cookies; hledání, SEO a výkon; editor ve třech úrovních se schvalováním, plánováním, náhledem, auditem, 2FA a importem; testy a CI.

Mimo rozsah: mobilní aplikace, push a SMS, digitální úřad (formuláře, platby, rezervace, `zivotniSituace`, `hlaseniZavad`), IoT, AI a audionovinky, odpadový kalendář, ankety, podweby, mega menu, vlastní HTML v Advance, překlady obsahu (Hranice má německé popisky rozhraní, obsah česky), prezentační web, kolekce `obcane` a `mobilni-zarizeni` a endpointy `/api/obce/<slug>/prehled`, `/api/mobilni-zarizeni`, `/api/hlaseni-zavad`, `/api/asistent/dotaz`, `/api/poptavky`. Pro `/prehled` nech jen čisté funkce v `src/data/` (aktuality, deska, rozhlas, krize podle obce). Do rozsahu patří `GET /api/obce` (seznam obcí s modulem `aplikace`, viz <architektura>) a pravidlo pro kolizi vlastních route handlerů s REST Payloadu, protože je aplikace potřebuje.
</rozsah>

<architektura>
Monorepo: kořenový `package.json`, `pnpm-workspace.yaml`, `turbo.json` s úlohami `typecheck`, `lint`, `test`, `e2e`, `a11y`, `build`. Smaž `apps/web/package-lock.json`. Ostatní aplikace nezakládej, workspace počítá s `apps/*`.
- `packages/typy`: typy z `payload-types.ts` (skript `generate:types` je zkopíruje), zod schémata veřejných odpovědí (`KrizeAktivniOdpoved` a další), společné konstanty rolí a úrovní editoru.
- `packages/tokeny`: krizové úrovně a barvy (z `CLAUDE.md`), metadata 20 šablon (klíč, číslo, název, písma, extra tokeny), 20 × 3 palet (vygeneruj z `design/generator/palettes.py` skriptem a test ověří shodu), funkce `kontrast`, `zkontrolujTokeny`, generátor CSS proměnných. `lib/krize.ts` jen importuje konstanty, logiku nech.

Struktura `apps/web/src`:
- `app/(payload)` administrace, `app/(web)/sites/[obec]/...` veřejný web (ne `_obec`, podtržítková složka není route), `app/api/...`.
- `proxy.ts` (Next 16): z hlavičky Host najde obec, přepíše `/x` na `/sites/<slug>/x`. Přímý požadavek na `/sites/*` zvenku vrací 404. Neznámý host vrací 404 bez úniku dat. Cesty `/admin`, `/api`, `/_next` se nepřepisují. Společná doména administrace: [DOPLNIT: doména administrace CodeKom]. Lokálně `<slug>.localhost`.
- `src/data/*.ts`: jediná vrstva, která čte data pro veřejný web. Každá funkce bere `obecId`, vždy filtruje `where: { obec: { equals } }`, volá Local API s `overrideAccess: false` a je v `use cache` s `cacheTag('obec:<id>:<oblast>')` a explicitním `cacheLife`. Lint zakáže `payload.find` mimo `src/data`.
- `src/sablony/<klic>/` pro 20 šablon: `Uvod.tsx`, `Hlavicka.tsx`, `Patka.tsx`, `fonty.ts`, klientské ostrůvky jen kde prototyp interaktivitu opravdu má (přepínač Léto/Zima, velikost písma, mapa, záložky). Registr `src/sablony/index.ts`. Hlavička a patička jsou součástí šablony, tělo vnitřních stránek je sdílené (`src/sablony/sdilene`) a bere vzhled z CSS proměnných na obalu `<div data-sablona data-paleta style={tokeny}>`.
- `src/bloky/`: knihovna bloků úvodní stránky a obsahu stránek.
- `src/pravni/`: `povinne-informace.ts` (14 položek s názvy), `lhuty.ts` (zákonné lhůty jako konfigurace se `zdroj` a `overeno`), `prohlaseni-pristupnosti.ts`.

Hosting (příprava, nic se nenasazuje; nasazení je volitelný poslední krok M10 „až zakladatel řekne“): `vercel.json` s `regions: ["fra1"]` a crony. Cron běží v UTC, proto dvě spuštění (22:05 a 23:05 UTC), handler `/api/cron/denni` je idempotentní a chráněný `CRON_SECRET`: obnoví tag desky po půlnoci v Praze, zapíše „sejmuto“, spustí naplánované publikace. Skript `scripts/domena-pridat.ts` přidá doménu obce přes Vercel API a vypíše DNS záznamy; napiš ho a otestuj proti mocku, ale nespouštěj ho proti skutečnému účtu. Soubory: `@payloadcms/storage-s3` na Supabase Storage, privátní bucket. Databáze: `DATABASE_URI` přes pooler 6543 s malým `pool.max`, migrace přes `DATABASE_URI_MIGRACE` (přímé spojení nebo pooler 5432).

Rozhraní ven: `GET /api/krize/aktivni?obec=<slug>` vrací `{ hlavni, dalsich }`, kde `hlavni` je jedno nejzávažnější aktivní hlášení nebo `null`. Pole: `id`, `uroven`, `titulek`, `text`, `odkazText`, `odkazUrl`, `casti` (`{nazev, slug}[]`), `platiOd`, `platiDo`, `updatedAt`.

`GET /api/obce`: veřejný seznam obcí se zapnutým modulem `aplikace`, jen veřejná pole `{ slug, nazev, okres, znakUrl, castiObce: [{nazev, slug}] }`, bez kontaktů a bez IČO, `Cache-Control: public, s-maxage=300` (cache 5 minut). Vlastní route handler `src/app/(payload)/api/obce/route.ts` má přednost před catch-all Payloadu [OVĚŘIT testem]; REST kolekce `obce` (read) je jen pro přihlášené uživatele obce, handler čte přes Local API s `overrideAccess: true` a vrací jen uvedená pole. Zod schéma `ObceSeznamOdpoved` je v `packages/typy` a používá ho aplikace (prompt 02, onboarding); v prototypu 07 stejný endpoint běží nad demo daty.

Vlastní route handlery a REST Payloadu. Cesty `/api/<slug-kolekce>` zabírá automatický REST Payloadu a catch-all `(payload)/api/[...slug]`. Vlastní handler v `src/app/(payload)/api/<cesta>/route.ts` má přednost, protože statická cesta vyhrává nad catch-all [OVĚŘIT testem na Next 16.4]. U každé kolekce s vlastním koncovým bodem zruš veřejný REST přístup. Kolekce `mobilni-zarizeni` (zakládá prompt 02) by v Payloadu dostala automatický REST `/api/mobilni-zarizeni`, který koliduje s vlastním koncovým bodem aplikace. Řešení: vlastní Next route handler `src/app/(payload)/api/mobilni-zarizeni/route.ts` (POST) má přednost před catch-all Payloadu [OVĚŘIT testem]; kolekce má REST přístup jen pro superadmina (create, read, update, delete) a handler zapisuje přes Local API s `overrideAccess: true` až po vlastní validaci (zod) a rate limitu. Test: POST jde do vlastního handleru, GET /api/mobilni-zarizeni bez přihlášení vrací 403. Pro `/api/obce` platí totéž, viz výše.
</architektura>

<datovy_model>
Plugin `@payloadcms/plugin-multi-tenant`: `tenantsSlug: 'obce'`, pole tenanta `obec` na všech obsahových kolekcích, uživatelům pole `obce`, `userHasAccessToAllTenants` pro `superadmin`, `cleanupAfterTenantDelete: false`; obec maže jen superadmin. Veřejné čtení vždy filtruj podle obce sám (plugin hlídá přihlášené, ne anonymy). Nové a měněné kolekce:

| Kolekce | Pole a pravidla |
| --- | --- |
| `obce` | sdílená pole ze zadání (`nazev`, `slug`, `domeny[]`, `sablona`, `paleta` 0–2, `urovenEditoru`, `moduly[]`, `znak`, `adresa`, `ico`, `datovaSchranka`, `cisloUctu`, `uredniHodiny`, `kontakty`, `poverenec`, `castiObce[{nazev,slug}]`) plus `okres`, `kraj`, `dic`, `adresaUradovny`, `podatelnaEmail`, `telefon`, `analytika` (`zadna`, `logy`, `souhlas`). Domény: unikátní hostnamy bez schématu. `urovenEditoru`, `moduly`, `domeny` smí měnit jen superadmin. `sablona` a `paleta` smí měnit správce |
| `users` | role `superadmin`, `spravce`, `redaktor`; `obce[]`; TOTP pole (šifrované tajemství, záložní kódy hashované). Počet uživatelů obce podle úrovně (3, 10, bez limitu) |
| `nastaveni-webu` | jeden dokument na obec, `versions.drafts`; `vzhled` (12 barevných tokenů, písmo, zaoblení, hustota), `uvodniBloky[{typ, viditelny, nastaveni}]`, `menu` (přejmenování a pořadí), `seo` (popis, obrázek pro sdílení) |
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
| `krizova-hlaseni` | stávající, `tykaSe` nahraď polem `casti` (pole slugů z `obce.castiObce`, prázdné = celá obec, validace vůči obci); datová migrace zkusí `tykaSe` spárovat podle názvu, nespárované zapíše do `text` s větou „Týká se: …“. Přístup: publikovat smí jen `spravce` a `superadmin` obce, `redaktor` jen koncept (viz Krizová hlášení a úroveň editoru) |
| `dokumenty` | stávající plus `obec`, `urceni` (`deska`, `verejny`), `typ` (`obecny`, `vyhlaska`, `rozpocet`, `zaverecny-ucet`, `vyhled`, `zapis`, `zpravodaj`), `rok`, `sha256` (počítá hook při nahrání). Soubor navázaný na vyvěšenou desku nejde nahradit, jen přidat nový dokument |
| `media` | stávající plus `obec`, `altSchvaleno`, `altSchvalil` |
| `galerie` | `nazev`, `slug`, `datum`, `obrazky[]` (`media`). Publikovat jde, jen když mají všechny obrázky `altSchvaleno` |
| `povinne-informace` | jeden dokument na obec, 14 pevných položek s `kod` (1 až 14, podpoložky 4.1 až 4.8 a 8.1 až 8.2; členění položek 11 až 13 na podpoložky [OVĚŘIT] v textu vyhlášky, rešerše je nepotvrzuje), názvy zamčené v kódu, editovatelný je `obsah` a příznak `nepouziva` |
| `popisy-ukonu` | pole Přílohy č. 2 vyhlášky 515/2020 (přesný seznam z textu vyhlášky, odhad kolem 21), vzory úkonů (odpady, pes, hrobové místo, ověření podpisu) označené „vzor k úpravě obcí“ |
| `prohlaseni-pristupnosti` | jeden dokument na obec: `stavSouladu` (`uplny`, `castecny`, `nesoulad`), `nepristupnyObsah[{popis, duvod, nahradniReseni}]`, `datumSestaveni`, `datumPrezkumu`, `textUpraveny` (volitelný) |

Tabulky mimo Payload (SQL v nové migraci, schéma `obec`, RLS bez politik): `hledani` (`obec_id`, `typ`, `ref_id`, `titul`, `text`, `url`, `viditelne_od`, `viditelne_do`, `tsv`) a `navstevnost_den` (`obec_id`, `den`, `cesta`, `pocet`, bez IP a user-agenta).

Přístup: anonym čte jen publikované záznamy své obce (`publishedOr` zachovej), redaktor a správce jen své obce, úroveň editoru omezuje zápis na serveru.
</datovy_model>

<funkce>
**Mapa webu** (nejvýš 2 úrovně, úkolové názvy, hlavní menu nejvýš 5 položek). Hlavní menu: Potřebuji vyřídit, Úřad, Aktuality a akce, Obec, Kontakty. Úvod je logo a znak. Hledání a Krizová hlášení jsou v hlavičce a patičce.

| Cesta | Obsah |
| --- | --- |
| `/` | úvodní stránka šablony |
| `/potrebuji-vyridit`, `/[slug]`, `/a-z` | životní situace a abecední seznam služeb ze `stranky` (`skupina`). Až digitální úřad dodá `zivotniSituace`, přepne se zdroj v adaptéru `src/data/situace.ts`. Služba má i cestu offline: telefon, hodiny, adresa |
| `/urad` | rozcestník |
| `/uredni-deska`, `/uredni-deska/[id]`, `rss.xml`, `atom.xml` | deska, detail a kanály |
| `/urad/zastupitelstvo`, `/urad/vyhlasky`, `/urad/rozpocet` | zastupitelé a zasedání se zápisy; dokumenty podle `typ` |
| `/urad/povinne-informace`, `.../ukony/[slug]` | vyhláška 515/2020 |
| `/urad/osobni-udaje`, `/urad/prohlaseni-o-pristupnosti` | text z `docs/pravni-dokumenty.md` se zbylými `[DOPLNIT]` |
| `/aktuality`, `/akce`, `/rozhlas`, `/zpravodaj` (a `[slug]`) | rubriky, kalendář s `kalendar.ics`, rozhlas jako text, čísla zpravodaje |
| `/obec`, `/obec/historie`, `/obec/casti`, `/obec/mapa` | mapa načítá dlaždice třetí strany až po kliknutí, jinak odkaz |
| `/krizova-hlaseni`, `/kontakty`, `/hledani`, `/sitemap.xml`, `/robots.txt` | viz níže |

Patička: Povinně zveřejňované informace, Prohlášení o přístupnosti, Osobní údaje, Nastavení cookies, Mapa stránek, Úřední deska, RSS, Kontakty a „Provozuje CodeKom“ s černobílým logem z `brand/`. Hlavní značkou je znak obce.

**Šablony.** Z `design/generator/bodies` a prototypů převeď všech 20 úvodních stránek do React layoutů. Ilustrace jsou SVG v kódu, barvy z paletových extra tokenů (`hill`, `meadow`, `roof`), žádné stockové fotky. Písma s licencí OFL hostuj u nás (prototypy používají Google Fonts, produkce ne), načte se jen sada aktivní šablony. Bloky závislé na jiných modulech (hladina z IoT, odpady, AI) mají ručně zadané ukázkové hodnoty (`zdroj: 'rucne'`), nebo se nenabízejí. Povinné bloky: hlavička, krizový banner, rychlé akce, výtah z úřední desky, kontakty a úřední hodiny, patička. Obec vybere šablonu a paletu v administraci (pohled „Vzhled“, galerie 20 × 3) s náhledem na `/nahled/[sablona]/[paleta]` (jen přihlášení, data Javoří Lhoty, `?krize=info|warning|emergency` jen zde).

**Úřední deska výpis.** Formulář `next/form` s metodou GET: výběr kategorie, skupina přepínačů Visí / Sejmuté / Všechny (`fieldset` a `legend`), hledání (`type="search"`, viditelný popisek), tlačítko Filtrovat, odkaz Zrušit filtr jen u neprázdného filtru. Stav jen v URL (`parseDeskaParams`, `deskaHref`, `deskaWhere`, `deskaSort`). Tabulka má `caption` z `popisFiltru` a počtu, `th scope="col"`, název dokumentu jako `th scope="row"` s odkazem, sloupce Kategorie, Číslo jednací, Vyvěšeno, Sejmutí („do odvolání“, je-li prázdné), Stav textem, Soubor (typ, velikost). Na mobilu, kde řádky přejdou na bloky, nastav explicitní role `table`, `rowgroup`, `row`, `columnheader`, `rowheader`, `cell`. Stránkování 25 na stranu: `nav` s popiskem, `aria-current="page"`, předchozí a další, `rel` odkazy. Strana mimo rozsah přesměruje na poslední. Oblast `role="status"` hlásí počet nalezených. Prázdný stav: „Na úřední desce teď nic nevisí.“ s odkazem na sejmuté, při filtru „Žádný dokument neodpovídá filtru.“ s odkazem Zrušit filtr. Načítání: `loading.tsx` s `aria-busy`. Chyba: `error.tsx` s telefonem, hodinami a adresou obce.

**Detail dokumentu.** `h1`, popisný seznam (původce, kategorie, číslo jednací, vyvěšeno, sejmuto nebo „visí do“, stav), anotace, soubory přes `/uredni-deska/[id]/soubor/[souborId]`, které handler pustí, jen když dokument visí, nebo je sejmutý bez `skrytPoSejmuti`. Dále „Záznam o vyvěšení“ (události, SHA-256). Sejmutý skrytý dokument vrací 404 s větou „Dokument už není na úřední desce zveřejněn.“.

**Evidence a export.** Hook `afterChange` zapíše `vyveseno` při prvním zveřejnění a `zmeneno` při každé další změně, denní cron `sejmuto` po posledním dni. `GET /api/uredni-deska/evidence?od=&do=&format=csv|pdf` (správce a superadmin své obce) vrací seznam; `GET /api/uredni-deska/[id]/potvrzeni?format=pdf` potvrzení o vyvěšení jednoho dokumentu. CSV je UTF-8 s BOM, středník, hodnoty začínající `=`, `+`, `-`, `@` ošetři proti vložení vzorce. PDF knihovnu zdůvodni v `docs/rozhodnuti.md`.

**RSS a Atom.** Jen dokumenty, které visí, nejvýš 100, správný `Content-Type`, escapování XML, stabilní `guid`, `<link rel="alternate">` na stránce desky. V testu validuj parserem.

**Krizový banner.** Layout vykreslí nejvýš jedno hlášení z `vyberBanner`. Prvek je `<section aria-labelledby="krize-nadpis">` s `<h2 id="krize-nadpis">` ve tvaru „Výstraha: titulek“ (úroveň slovem, `IkonaUrovne` dekorativní), text, odkaz přes `bezpecnyOdkaz`, „Týká se: …“ podle `casti` a „Další hlášení: N“ s odkazem na `/krizova-hlaseni`. Krizovou situaci nejde zavřít. Informaci a výstrahu jde skrýt přes `SkrytHlaseni`, bez JavaScriptu tlačítko není. Banner leží v `Suspense` a čas čte při požadavku, ne ze statické cache, aby konec platnosti nezpožďoval. Klientský ostrůvek volá `/api/krize/aktivni` každých 60 s, jen když je stránka viditelná (`visibilitychange` obnoví odpočet a hned dotáhne data). Nové nebo změněné hlášení (jiné `id` nebo `updatedAt`) nahradí banner a oznámí se v připravené prázdné oblasti `role="status" aria-live="polite"` (u krize `assertive`) větou „Nové hlášení: Výstraha, titulek“. Banner sám `aria-live` nemá, aby se neoznamoval dvakrát. Endpoint má `Cache-Control: no-store`, data za ním jsou v cache s tagem `obec:<id>:krize` a okamžitou expirací po změně. Neznámá obec vrací 404 s `{ chyba }`, špatný dotaz 400. `/krizova-hlaseni` ukáže všechna aktivní hlášení (nejzávažnější první) a archiv 12 měsíců, bez možnosti skrýt.

**Hledání.** Migrace ověří `pg_available_extensions` a vytvoří `unaccent` a `pg_trgm` (na Supabase do schématu `extensions`). Český slovník (hunspell) použij jen je-li dostupný, jinak konfigurace `simple` s `unaccent`. `unaccent` obal vlastní IMMUTABLE funkcí s pevným `search_path`. Index plní hooky `afterChange` a `afterDelete` (aktuality, akce, stránky, deska, dokumenty, zastupitelé, povinné informace). Dotaz `websearch_to_tsquery` plus trigramy pro překlepy, `ts_rank`, filtr `obec_id` a `viditelne_od/do`. Prázdný stav: „Nic nenalezeno. Zkuste kratší slovo nebo zavolejte na úřad“ a telefon.

**Povinné informace.** Stránka vykreslí 14 položek v pořadí a s názvy z vyhlášky 515/2020 (text převezmi z e-Sbírky do `src/pravni/povinne-informace.ts`). Položky 1, 4.x, 5, 6, 7 se předvyplní z `obce`, 8.1 a 8.2 a 11 odkazují na dokumenty podle `typ`, ostatní jsou obsah správce. Nevyplněná položka ukáže větu, že informaci obec nezveřejňuje, a v administraci je v kontrolním seznamu „chybí“.

**Prohlášení o přístupnosti.** Generátor sestaví text podle vzoru z metodického pokynu DIA (EN 301 549 V3.2.1): stav souladu, nepřístupný obsah s důvody a náhradním řešením, data sestavení a přezkumu, kontakt, postup při podezření na nesoulad. Správce text upraví, „Obnovit z generátoru“ vrací výchozí. Odkaz je v patičce každé stránky. Výchozí stav je `castecny`, dokud neproběhne ruční test čtečkou.

**Cookies a návštěvnost.** Výchozí `analytika: 'zadna'`, jsou jen nezbytné cookies a lišta se nezobrazuje. Volba `logy` počítá agregované zobrazení do `navstevnost_den` bez IP, user-agenta a identifikátoru v zařízení. Volba `souhlas` zobrazí lištu s rovnocennými tlačítky „Přijmout“ a „Odmítnout“, volba se uloží do nezbytné cookie a skripty měření se načtou až po souhlasu. Volbu jde kdykoli změnit v „Nastavení cookies“. Videa a mapy třetích stran jen po kliknutí.

**SEO a výkon.** `generateMetadata` (titulek, popis, canonical podle hlavní domény, OpenGraph, znak), `sitemap.xml` a `robots.txt` per host (záložní subdoména `noindex`, má-li obec vlastní), JSON-LD `GovernmentOrganization` (adresa, telefon, hodiny). Rozpočet: LCP pod 2,5 s na pomalém 4G (cíl 2,0 s), CLS do 0,1, první načtení do 500 kB, JavaScript do 100 kB gzip, `next/image` s rozměry. Rozpočty zapiš do `lighthouserc.json`.

**Editor ve třech úrovních.** Jedna aplikace, úroveň (`urovenEditoru`) je oprávnění vynucené na serveru v access funkcích a hookách (`src/access/urovne.ts`, tabulka schopností), ne jen skrytá tlačítka.

| Schopnost | Základ | Pokročilý | Advance |
| --- | --- | --- | --- |
| Stránky | do 30, 3 typy | neomezeně | neomezeně |
| Úvodní stránka | obsah do pevných bloků | přeskládat, skrýt, přidat bloky z knihovny | volné bloky a sloupce 1–4 |
| Menu | přejmenovat, přeskládat | přidat a vnořit na 2 úrovně | stejně |
| Vzhled | šablona a 1 ze 3 palet | + vlastní hlavní barva | všech 12 tokenů |
| Schvalování | redaktor smí publikovat (mimo `krizova-hlaseni`) | fronta, publikuje správce | stejně |
| Verze | 30 dní | 1 rok | neomezeně |

**Krizová hlášení a úroveň editoru.** Krizová hlášení publikuje jen `spravce` a `superadmin`, na webu i v aplikaci a na všech třech úrovních editoru (rozhodnutí zakladatele 4. 11. 2026). `redaktor` smí hlášení jen vytvořit a uložit jako koncept. Pravidlo vynucuje server: `access` kolekce `krizova-hlaseni` a hook `beforeChange` odmítnou přechod `_status` na `published` (také přes autosave, `schedulePublish` a Local API s `overrideAccess: false`) pro každého, kdo není `spravce` nebo `superadmin` obce; úroveň editoru toto pravidlo nemění (řádek `Schvalování` v tabulce níže se `krizova-hlaseni` netýká). Redaktor může koncept předat do fronty `ke-schvaleni`, kde fronta existuje (Pokročilý, Advance), ale schválit a publikovat ho smí jen správce. Aplikace (prompt 02) dodržuje totéž pravidlo.

Skladatel úvodní stránky (pohled v administraci) pracuje nad konceptem `nastaveni-webu.uvodniBloky` s živým náhledem. Povinné bloky a povinné stránky nejdou skrýt ani smazat. V Advance správce upravuje tokeny s živou kontrolou kontrastu: text na pozadí a mutovaný text aspoň 4,5 : 1, `onPrimary` na `primary`, `onAccent` na `accent`, `onDeep` na `deep` aspoň 4,5 : 1, odkaz na pozadí 4,5 : 1, `accent` a `link` jako prvek rozhraní a focus aspoň 3 : 1. Chyba zablokuje publikaci na serveru (`ValidationError` v hooku `beforeChange` při přechodu na publikováno) i v rozhraní, editor navrhne nejbližší vyhovující odstín. Změna šablony nesmí zrušit povinné bloky. Při přechodu na nižší úroveň se rozvržení zamrazí: zobrazuje se dál, ale nejde upravovat.

Schvalovací fronta (pohled pro Pokročilý a Advance) ukazuje záznamy `ke-schvaleni` ze všech kolekcí, správce schválí, nebo vrátí s komentářem. Plánované publikování: `versions.drafts.schedulePublish` a fronta úloh Payloadu spouštěná cronem, který po zveřejnění obnoví tag obce. Náhled před publikací: Draft Mode s krátkodobým tokenem.

Administrace česky, přehled (dashboard) ukáže: čeká na schválení, brzy sejmuté dokumenty (7 dní), lhůty podle `lhuty.ts`, aktivní krizová hlášení a návštěvnost 7 dní, je-li zapnutá. 2FA (TOTP) je povinné pro `superadmin` a `spravce`: první přihlášení vyžádá zřízení, 10 záložních kódů, omezení pokusů. Hotový plugin ověř, nebo napiš vlastní strategii a zapiš volbu do `docs/rozhodnuti.md`.

**Import ze starého webu.** Pohled „Import“ (správce) a `scripts/import-stary-web.ts`: RSS aktualit nebo CSV aktualit a desky. Jen `https`, blokuj privátní a lokální adresy (SSRF), omez velikost a počet. HTML převeď na Lexical a vyčisti. Vše vznikne jako koncept s `importovano: true`, nikdy se nepublikuje samo; deska zachová původní data vyvěšení. Výsledek ukáže počty zpracovaných, přeskočených a chybných řádků.
</funkce>

<pravidla>
- Úřední deska, § 26 správního řádu: nepřetržitě veřejně přístupná a dálkově přístupná. Veřejná vyhláška se považuje za doručenou 15. dnem po vyvěšení (zdroj: Právní prostor, Kasl 2016), proto výpočet `nejdrivSejmuti` a varování v administraci. Přesné znění § 26 a započítání dne [OVĚŘIT] v e-Sbírce.
- NSS 2 As 47/2016: vyvěšení musí být evidováno a prokazatelné. Proto `evidence-vyveseni` jen přidávací, hash souboru, verze místo přepsání, nemožnost smazat vyvěšený dokument (trigger už existuje) a export.
- „Po sejmutí nezveřejňovat“ je výchozí zapnuté. Takový dokument po posledním dni zmizí z webu, sitemapy, RSS, hledání i přímého odkazu na soubor, v administraci a evidenci zůstává.
- Osobní údaje: před publikací na desce správce potvrdí `osobniUdajeKontrola`. Checklist: rodná čísla, data narození, adresy a čísla účtů fyzických osob.
- Krizová hlášení: viz `CLAUDE.md`; na stránce hlášení je věta, že nenahrazují varovný systém IZS. Publikuje jen `spravce` a `superadmin`, redaktor jen koncept, na všech úrovních editoru.
- Lhůty z 250/2000 Sb. (rozpočet, výhled, závěrečný účet) a § 95 odst. 2 zákona 128/2000 Sb. (zápis ze zastupitelstva) patří do `src/pravni/lhuty.ts` jako konfigurace s polem `zdroj` a `overeno`. Čísla z paměti (15 dnů před projednáním, zápis do 15 dnů, 6 let) jsou NEOVĚŘENÁ: použij je jen po ověření, jinak ponech hodnotu `null` a v administraci žádné upozornění.
- Vyhláška 515/2020 Sb.: 14 položek Přílohy č. 1 v pevném pořadí, osnova Přílohy č. 2. Rozpor v datu účinnosti (1. 8. 2021, nebo 15. den po vyhlášení) ověř.
- Přístupnost: zákon 99/2019 Sb. (§ 8 prohlášení, § 9 podnět), EN 301 549 V3.2.1, stavíme na WCAG 2.2 AA. O pokutách netvrď nic.
- Cookies: § 89 odst. 3 zákona 127/2005 Sb. Měření bez zápisu do zařízení je konzervativní výklad, stanovisko ÚOOÚ neověřeno.
- Úřad je fallback: stránka s online službou má i telefon, hodiny a adresu úřadu.
</pravidla>

<design_a_pristupnost>
- Pravidla unslop z `CLAUDE.md`: řezy písma nejvýš 600, věty velkým písmenem, bez vykřičníků, jedna akcentová barva, žádné přechody, záře a emoji, mřížka 4 px, tenké linky. Navíc žádné nadpisy nad nadpisy ve verzálkách a žádné odkazy se šipkou „→“. `pnpm unslop` (součást `pnpm lint`) zkontroluje zdroj a CSS: váhy 700 a více, `gradient`, verzálky přes `text-transform`, vykřičník v textech, emoji, „→“.
- Text 17 px, řádkování textu 1,5 až 1,6, nadpisů 1,1 až 1,25, cíle dotyku aspoň 44 × 44 px, kontrast textu aspoň 4,5 : 1, focus aspoň 3 : 1 a viditelný (na tmavých pásech světlý). Obsah se vejde na 375 px bez vodorovného posunu a při zoomu 200 %.
- Landmarky `header`, `nav` s popiskem, `main`, `footer`. Jedno `h1`, nadpisy bez přeskoku úrovní. „Přeskočit na obsah“ je první prvek. Tabulky mají `caption`. Barva nenese význam sama. Respektuj `prefers-reduced-motion`. Ostrůvky jdou ovládat klávesnicí.
- Všech 60 kombinací šablona × paleta projde `zkontrolujTokeny` v testu.
- Texty česky, krátce, úkolově; chyby říkají, co dělat.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Izolace obcí je akceptační kritérium, ne vedlejší efekt: veřejné čtení vždy přes `src/data` s filtrem obce, soubory, hledání, RSS, sitemap, export i endpoint krize testované proti úniku mezi obcemi. Plugin hlídá aplikační vrstvu, přímé SQL ji obchází, proto zůstává RLS bez politik a schéma mimo Data API.
- Secrets jen v `.env` (`.env.example`: `PAYLOAD_SECRET`, `DATABASE_URI`, `DATABASE_URI_MIGRACE`, `S3_*`, `CRON_SECRET`, `VERCEL_TOKEN`, klíč k šifrování TOTP). Tajemství TOTP šifruj (AES-GCM) a nelogu.
- Hlavičky: stávající plus CSP (nonce, na veřejném webu bez `unsafe-inline`, administraci otestuj zvlášť), HSTS, `frame-ancestors 'none'`. Rate limit na `/api/krize/aktivni`, hledání, export a přihlášení.
- Data v EU: Supabase Frankfurt, Vercel `fra1`.
- Nahrávání: MIME podle obsahu, limit velikosti, normalizované názvy. Audit neukládá hesla ani tajemství.
</bezpecnost_a_soukromi>

<testy>
Test nepřeskakuj ani neupravuj, aby prošel.
- Vitest (jednotky): `datum`, `deska` (parsování URL, `deskaWhere` na hranách dne, `nejdrivSejmuti`, stavy), `krize` (výběr, pořadí, okna platnosti, `klicSkryti`, `bezpecnyOdkaz`), `urovne` (každá schopnost × úroveň × role), `kontrast`, generátor povinných informací a prohlášení, práva krizových hlášení (matice role `superadmin`, `spravce`, `redaktor` × úroveň Základ, Pokročilý, Advance × akce koncept, publikace, plánovaná publikace, autosave: publikovat smí jen `spravce` a `superadmin`, redaktor dostane 403 nebo `ValidationError` na každé úrovni, přes REST i Local API s `overrideAccess: false`), CSV (ošetření vzorců), RSS, mapování hostname, `unslop`.
- Integrace: Payload proti Postgresu 17 v CI (service container s `unaccent` a `pg_trgm`), migrace od nuly a `down`; PGlite jako rychlá kontrola migrací, pokud podporuje použitá rozšíření. Testy: trigger odmítne smazání vyvěšeného dokumentu, CHECK omezení, append-only tabulky, nesmazatelná systémová stránka, zámek nahrazení souboru, schvalování, blokace publikace s nízkým kontrastem, vynucené 2FA, cross-tenant (uživatel obce A nečte ani nezapisuje do B, veřejné funkce A nikdy nevrátí řádek B). Vlastní route handlery: `GET /api/obce` jde do vlastního handleru (ne do REST Payloadu), vrací jen obce s modulem `aplikace` a jen pole `slug`, `nazev`, `okres`, `znakUrl`, `castiObce`, má hlavičku `Cache-Control` s `s-maxage=300`, a `GET /api/obce` s parametry kolekce (`?depth=2`) žádné další pole neprozradí. Pro `mobilni-zarizeni`: pokud kolekce existuje, POST jde do vlastního handleru a GET /api/mobilni-zarizeni bez přihlášení vrací 403; pokud ještě neexistuje (zakládá ji 02), ověř mechanismus přednosti na `GET /api/obce`.
- Playwright na 375 a 1280 px: filtr desky (URL, stránkování, prázdné stavy, klávesnice), detail a soubory (sejmutý skrytý vrací 404), banner (info a výstraha jdou skrýt, zůstanou skryté po obnovení a po změně `updatedAt` se vrátí; krize nemá tlačítko; bez JavaScriptu tlačítko není; polling s `page.clock` oznámí nové hlášení do 60 s a na skryté záložce neběží), dvě domény jedné obce, výběr šablony, hledání, cookies lišta.
- axe (`@axe-core/playwright`, WCAG 2.1 AA a best-practice): úvodní stránka všech 20 šablon × 3 palet × 4 krizové stavy (žádný, info, warning, emergency) = 240 běhů, rozdělit do shardů. Navíc vnitřní stránky (deska, detail, povinné informace, prohlášení, hledání, aktualita, kontakty, krizová hlášení) na 3 šablonách × 3 paletách. Nula chyb.
- Lighthouse CI: rozpočty z `lighthouserc.json` na úvodní stránce, desce a aktualitě, mobil se zpomaleným 4G.
- CI (`.github/workflows/ci.yml`): typecheck, lint, test, migrace na čisté DB, e2e, a11y, Lighthouse.
</testy>

<postup>
Na začátku vypiš plán a úkoly (`docs/progress.json` se stavy) a průběžně je odškrtávej. Každý milník končí `pnpm typecheck && pnpm lint && pnpm test` a commitem česky v rozkazovacím způsobu. Po dvou neúspěšných opravách téhož problému se zastav a popiš ho.
- M0 Základ: ověř položky z `<overit>`. Zvedni `payload` a všechny `@payloadcms/*` na přesně stejnou verzi (cíl 3.92.1), Next 16.4.x, React 19.3.x, Tailwind 4.3.x podle `npm view`, major neměň. Založ monorepo, ověř `pnpm build`.
- M1 Multi-tenant: `obce`, `users`, plugin, role, migrace (nové, na čisté DB), `proxy.ts`, `src/data`, `vercel.json`, seed obce Javoří Lhota z `obsah/javori-lhota/obec.json`, `GET /api/obce`, cross-tenant testy.
- M2 Šablony, kostra: `packages/tokeny`, registr, sdílené vnitřní stránky, mapa webu, tři šablony (`naves`, `lipa`, `urad`), fonty, unslop.
- M3 Úřední deska: výpis, detail, soubory, evidence, export, RSS a Atom, cron, testy.
- M4 Krizový banner: komponenty, endpoint, stránka, `casti`, cache a testy včetně polling.
- M5 Obsah: aktuality, akce, rozhlas, zasedání, zastupitelé, stránky, dokumenty, galerie, rozpočet, hledání.
- M6 Právo: povinné informace, popisy úkonů, prohlášení o přístupnosti, osobní údaje, cookies a návštěvnost, SEO, sitemap, JSON-LD.
- M7 Editor: schopnosti úrovní, vzhled a kontrast, skladatel, schvalování, plánované publikování, náhled, audit, 2FA, přehled, import.
- M8 Zbývajících 17 šablon (jsou-li hotové z 07, jen je napoj na zdroj `payload`), seed obsahu z `obsah/javori-lhota/*.json`, matice axe 240 běhů, Lighthouse rozpočty, optimalizace.
- M9 CI, `.env.example`, dokumentace nasazení (jen jako návod), zápis rozhodnutí do `docs/rozhodnuti.md`, ruční průchod demo obce lokálně na dvou hostnames.
- M10 (volitelný, jen když zakladatel řekne): nasazení na Vercel `fra1`, připojení domén, ověření na produkci. Bez výslovného pokynu zakladatele nic nenasazuj, nekupuj domény a nespouštěj `scripts/domena-pridat.ts`.
</postup>

<hotovo_kdyz>
Vše projde a je to vidět:
1. `pnpm install && pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v kořeni bez chyby. Žádný přeskočený test.
2. `payload migrate` na prázdné databázi projde, `migrate:down` a znovu `up` také. Migrace z 2. 11. jsou beze změny.
3. Demo obec Javoří Lhota běží lokálně na dvou hostnames (`javori-lhota.localhost` a druhý hostname jako záložní subdoména; skutečné domény [DOPLNIT: domény] se řeší až při nasazení), druhá obec nevidí její data a naopak (test).
4. Všech 20 šablon × 3 palety se vykreslí z dat a přepnutí v administraci se projeví po uložení. `pnpm a11y`: 240 běhů bez chyb.
5. Deska: filtr kategorie, stavu a hledání v URL, stránkování, prázdné stavy, detail, validní RSS a Atom, export CSV a PDF, vyvěšený dokument nejde smazat (aplikace ani databáze), „Po sejmutí nezveřejňovat“ je výchozí a sejmutý skrytý dokument je nedostupný včetně souboru.
6. Banner: jedno hlášení, úroveň slovem, krize nejde zavřít, ostatní jdou skrýt (klíč `id+updatedAt`, tlačítko až po hydrataci), obnova po 60 s s oznámením, `/krizova-hlaseni` a `/api/krize/aktivni` fungují, tag `krize` expiruje okamžitě. Krizové hlášení publikuje jen správce a superadmin (test práv na všech třech úrovních), redaktor jen koncept.
7. Povinné informace mají 14 položek v pořadí vyhlášky, prohlášení o přístupnosti je vygenerované, editovatelné a odkazované v patičce každé stránky.
8. Editor: tři úrovně se chovají podle tabulky, povinné stránky a bloky nejdou smazat, nízký kontrast zablokuje publikaci, schvalovací fronta funguje, 2FA je povinné pro správce a superadmina, audit zaznamenává změny a nejde upravit.
9. Hledání najde „zastupitelstvo“ i bez diakritiky a nevrátí skryté dokumenty. Import RSS a CSV vytvoří koncepty.
    `GET /api/obce` vrací jen obce s modulem `aplikace` a jen veřejná pole, s cache 5 minut; vlastní handler má přednost před REST Payloadu (test).
10. Lighthouse rozpočty (LCP pod 2,5 s na pomalém 4G) splněny na úvodní stránce, desce a aktualitě.
11. `docs/verification-log.md` obsahuje výsledek každé položky z `<overit>`, neověřené je v kódu označené `[OVĚŘIT]`.
</hotovo_kdyz>

<overit>
Zapiš zdroj, datum a výsledek každé položky do `docs/verification-log.md`. Co se ověřit nepodaří, nech v kódu a administraci označené `[OVĚŘIT]`.

| Položka | Jak |
| --- | --- |
| Payload 3.92 a Next 16.4 kompatibilita, přesná shoda verzí `@payloadcms/*`, podpora `cacheComponents` a `use cache` s Local API, známé potíže s Turbopack | `npm view payload version`, `npm view @payloadcms/next@3.92.1 peerDependencies`, `gh issue list -R payloadcms/payload -S "next 16"`, changelog |
| Plugin multi-tenant: názvy voleb (`tenantField`, `tenantsArrayField`, `userHasAccessToAllTenants`), chování `unique` v rámci tenanta, drafty a autosave, veřejné čtení | https://payloadcms.com/docs/plugins/multi-tenant |
| Vlastní domény na Vercelu: limity podle plánu, TLS, API | https://vercel.com/docs/platforms |
| Supabase Storage přes S3 adaptér Payloadu: endpoint, `forcePathStyle`, region, privátní bucket | https://supabase.com/docs/guides/storage/s3/compatibility |
| `unaccent`, `pg_trgm` a český slovník na Supabase | `select name from pg_available_extensions` na projektu (nástroj Supabase `list_extensions`), https://supabase.com/docs/guides/database/extensions |
| Znění § 26 správního řádu (500/2004 Sb.), § 11 a § 17 zákona 250/2000 Sb., § 95 zákona 128/2000 Sb. k 11/2026 | e-Sbírka, metodika MV https://mvcr.cz/soubor/mv-113940-2-as-2020.aspx |
| Vyhláška 515/2020 Sb.: přesné názvy 14 položek Přílohy č. 1, pole Přílohy č. 2, datum účinnosti, novely | e-Sbírka, záložka Historie |
| 2FA pro Payload (TOTP): hotový plugin, nebo vlastní strategie | `npm search payload totp`, https://payloadcms.com/docs/authentication/overview |
| Metodický pokyn DIA (v1.6 a 1.7), vzor prohlášení | odkazy v `research/poznamky/web_obce_a_prodej.md` |
| § 89 odst. 3 zákona 127/2005 Sb. a stanovisko ÚOOÚ k měření bez zápisu do zařízení | e-Sbírka, https://uoou.gov.cz |
| `schedulePublish` a fronta úloh Payloadu, Vercel Cron v UTC | dokumentace Payload Jobs a Vercel Cron |
| Písma šablon: latin-ext, OFL, načítá se jen sada aktivní šablony | soubory písem, síťové požadavky v Playwrightu |
| Změna dokumentu při vyvěšení (nová lhůta, nebo jen verze) | právník; do té doby verze a událost `zmeneno` bez resetu lhůty |
</overit>

<zaver>
Na konci napiš shrnutí ve třech částech.
- Hotovo: co funguje a čím je to ověřené (příkazy a počty, například „240 axe běhů bez chyb“, výsledky Lighthouse, ruční průchod demo obce).
- Zbývá: co nevzniklo nebo je omezené a které položky z `<overit>` zůstaly neověřené.
- Místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru: domény (jen pro pozdější nasazení), údaje Javoří Lhoty (IČO, datová schránka, účet, DIČ), texty osobních údajů, kontakty, hodnoty v `lhuty.ts`.
</zaver>

# Prompt: Funkční prototyp webu Javoří Lhota

Vlož celý do Claude Code v kořeni repozitáře `codecom`, nebo napiš: Proveď zadání v `prompty/07-prototyp-webu.md`.
Závisí na: připravených podkladech `obsah/javori-lhota`, `design/` (generátor, prototypy, `obrazky/foto`) a `brand/`; na žádném jiném promptu. Pokud už proběhl prompt 06, monorepo jen zkontroluj a doplň, co chybí. Zakládá sdílený základ monorepa, ostatní prompty ho jen kontrolují.

<kontext>
Zakladatel chce, aby starosta malé obce viděl, jak by mohl vypadat a fungovat jeho web, ještě než existuje databáze, administrace Payloadu a nasazení. Tento prototyp je živý web ukázkové obce Javoří Lhota: všech 20 šablon ve 3 barevných variantách, krizový banner, funkční vnitřní stránky a online služby a ukázka redakčního rozhraní. Běží lokálně, bez databáze, účtů a externích služeb. Prezentační web (prompt 06) na něj odkazuje a bere z něj snímky, aplikace v prohlížeči (prompt 08) čte jeho endpointy.

Důležité pro pořadí: prototyp musí jít později přepnout na skutečná data bez přepisování vzhledu. Proto UI čte data jen přes rozhraní `ZdrojDat`, a prompt 01 pak vymění implementaci za Payload.

Společný kontext, pravidla domény a design jsou v `CLAUDE.md` (neopisuj). Podklady, které už v repozitáři jsou a které nesmíš měnit ani nahrazovat vlastním obsahem:
- `obsah/javori-lhota/*.json`: obec, aktuality, akce, úřední deska (kategorie i dokumenty), krizová hlášení, rozhlas, zastupitelé, životní situace, služby a poplatky, prostory a rezervace, hlášení závad, budovy, ukázka asistenta. Popis polí je v `obsah/javori-lhota/README.md`.
- `design/generator` (`build.py`, `tpls.py`, `palettes.py`, `bodies/*.html`), `design/prototypy/*.dc.html`, `design/obrazky/foto/<blok>.webp` s popisem v `design/obrazky/README.md`, `brand/`.
- Stávající práce v `apps/web/src/lib` (`datum.ts`, `deska.ts`, `krize.ts`), `src/components/krize` a kolekce Payloadu v `src/collections`.

Pokud některý z podkladů chybí nebo se liší od popisu níže, nevymýšlej náhradu: zapiš rozpor do `docs/rozhodnuti.md`, chybějící údaj označ `[DOPLNIT: …]` a pokračuj.
</kontext>

<cil>
Na konci `pnpm demo` (nebo `pnpm --filter web dev`) spustí na localhostu web Javoří Lhoty. Pruh „Ukázka CodeKom“ nad webem přepíná mezi 20 šablonami, 3 paletami, 4 stavy krizového banneru a variantou s fotografií; stav je v URL, takže na něj může odkazovat prezentační web. Fungují vnitřní stránky, platba s QR kódem, hlášení závady, rezervace a hledání. Ukázka administrace zapíše aktualitu, dokument na úřední desku, krizové hlášení nebo vyřízení závady do paměti serveru a změna je okamžitě vidět ve všech šablonách i v endpointech pro aplikaci. Celé to běží bez `DATABASE_URI`, `next build` projde a testy, přístupnost i snímky pro galerii prezentace jsou hotové.
</cil>

<vychozi_stav>
Zjištěno při přípravě zadání, ověř si to na začátku:
- `apps/web` je npm projekt s `package-lock.json`. Verze jsou pod aktuálním stavem (next 16.4.1, payload a `@payloadcms/*` 3.91.0, react 19.2.0, tailwindcss 4.1.14, axe-core 4.10.3). Skripty `lint`, `e2e`, `a11y` neexistují.
- `src/lib/datum.ts` (dny jako 12:00 UTC, Europe/Prague), `deska.ts`, `krize.ts`, `slug.ts`, `revalidate.ts`; komponenty `IkonaUrovne.tsx` a `SkrytHlaseni.tsx`; kolekce v `src/collections`; dvě aplikované migrace (neměň je).
- Složky `src/app/(payload)/admin`, `src/app/(payload)/api/[...slug]`, `src/app/(web)/*` a `apps/web/tests` jsou prázdné. Žádné testy dosud neexistují, takže „testy beze změny očekávání“ znamená: nejdřív napiš charakterizační testy proti stávajícímu chování a teprve potom přesouvej kód.
- `lib/krize.ts` má v typu `KrizoveHlaseni` pole `tykaSe` (text). Sdílená rozhraní mají `casti` (pole slugů částí obce). V přesunutých pravidlech použij `casti`; kolekci Payloadu neupravuj, to je práce promptu 01 (zapiš do rozhodnutí).
- `deska.ts` obsahuje `deskaWhere`, který závisí na typu `Where` z Payloadu. Ten zůstane v `apps/web/src/lib/deska.ts`; přesouvají se jen čisté funkce.
- `design/snimky` a `obsah/` v repozitáři nemusí ještě existovat. Pokud `obsah/javori-lhota` chybí, zastav se po M0 a napiš, že chybí podklad; nevymýšlej obsah.
</vychozi_stav>

<rozsah>
Postav:
1. Sdílený základ monorepa (M0, M1): kořen, pnpm, Turborepo, `packages/tokeny`, `packages/typy`, `packages/demo-data`, přesun čistých pravidel.
2. Datovou vrstvu s rozhraním `ZdrojDat`, implementací `demo` a ukázkovým úložištěm v paměti.
3. Převod 20 návrhů šablon na React (skript), z toho 10 statických a 10 interaktivních, a variantu s fotografií.
4. Krizový banner, přepínač ukázky, sdílené vnitřní stránky, služby, hledání.
5. Endpointy sdílené s aplikací a ukázku administrace.
6. Testy, přístupnost, skript snímků a README „Jak spustit ukázku“.

Mimo rozsah: Payload kolekce a administrace (prompt 01), skutečné přihlášení, e-maily, platby, push, volání AI (asistent je jen předpřipravená ukázka z `asistent-ukazka.json`), ovládání budov, nasazení a domény, `proxy.ts` podle hostitele (jedna obec), překlady obsahu (Hranice má německé popisky rozhraní z návrhu, obsah česky).
</rozsah>

<architektura>
**Monorepo (M0).** Kořenový `package.json` (private, `packageManager: pnpm@<verze z npm view pnpm version>`, `engines.node >=22`, skripty přes `turbo run`: `build`, `dev`, `typecheck`, `lint`, `test`, `e2e`, `a11y`; navíc `demo`), `pnpm-workspace.yaml` (`apps/*`, `packages/*`), `turbo.json`, `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, `moduleResolution: bundler`). `apps/web` převeď na pnpm, smaž `package-lock.json`. Verze zjisti přes `npm view` a pinuj přesně: orientačně next 16.4.5, payload a všechny `@payloadcms/*` přesně stejná verze 3.92.1, react 19.3.1, tailwindcss 4.3.4, axe-core 4.14.0, `@playwright/test` 1.64.1 (stav 4. 11. 2026, použij novější patch, pokud existuje). TypeScript nech na 5.9.x (na npm je 7.0.2, major) a Vitest na 3.x (na npm 5.1.0, major): ověř kompatibilitu s Next a Payloadem a rozhodnutí zapiš. `pnpm demo` spouští skript `scripts/demo.mjs`: web vždy, aplikaci (`apps/mobile`, port 8081) jen když existuje, vypíše adresy. Ukázkové proměnné (nejsou tajné) jsou v `apps/web/.env.development`, vzor v `.env.example` s popisem každé:

| Proměnná | Význam |
| --- | --- |
| `CODEKOM_ZDROJ` | `demo` nebo `payload`; výchozí `demo`, když chybí `DATABASE_URI`. Hodnota `payload` zatím vyhodí srozumitelnou chybu „zdroj dodá prompt 01“ |
| `CODEKOM_DEMO_DNES` | přepíše `DEMO_DNES` (ISO datum nebo datum a čas); výchozí 2026-11-04 12:00 Europe/Prague |
| `NEXT_PUBLIC_UKAZKA` | `1` zapne pruh „Ukázka CodeKom“ a odkazy na administraci ukázky; vkompiluje se při buildu |
| `CODEKOM_APP_ORIGIN` | jediný původ povolený v CORS endpointů; výchozí `http://localhost:8081` [OVĚŘIT port Expo web] |
| `NEXT_PUBLIC_APP_URL` | adresa aplikace pro odkaz „Aplikace“ v pruhu |
| `CODEKOM_VEREJNA_URL` | volitelný základ absolutních URL v odpovědích endpointů; jinak původ požadavku |

`next.config.ts` obalí konfiguraci `withPayload` jen při `CODEKOM_ZDROJ=payload`. Bez databáze nesmí `next build` ani `next dev` číst `DATABASE_URI` a veřejné stránky nesmí importovat `payload` ani `payload.config.ts` (pravidlo v ESLintu `no-restricted-imports`). Pokud `next build` bez `DATABASE_URI` neprojde, zjisti proč a oprav konfiguraci; neprojde-li to ani tak, zapiš to jako blokující nález.

**Balíčky.**
- `packages/tokeny` (`@codekom/tokeny`): skript `design/generator/tokeny.py` načte `PAL` a `K` z `palettes.py` a `T` z `tpls.py` a zapíše `src/sablony.ts` (generovaný, ručně se needituje). Šablony v pořadí 01 až 20 podle klíčů: naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad (klíče `T`: Main, S02-Zvonice … S20-Urad). U každé: `klic`, `cislo`, `nazev`, `podtitul` (`sub`), `inspirace` (`insp`), `pismo {googleFonts, family, popis}`, `velikostTextu` (výchozí 17 px, u Lupy 20 px), `radkovani`, `vychoziKrize` (`alert`), `prototyp` (soubor `.dc.html`), `palety`: 3 × {nazev, 12 tokenů `bg, surface, ink, muted, line, primary, onPrimary, link, accent, onAccent, deep, onDeep`, `extra: Record<string,string>`}. Ručně: `src/krize.ts` (úrovně `emergency`, `warning`, `info`, názvy slovem, pořadí, barvy gov.cz z `CLAUDE.md`) a `src/index.ts` s `cssPromenne(paleta)` (proměnné `--bg`, `--on-primary` a tak dál v kebab-case plus extra, stejně jako `build.py`), `sablona(klic)`, `paleta(klic, index)`, `jeKlicSablony`. Test: výstup `cssPromenne` shodný s řetězcem `vars` z prototypu pro všech 60 kombinací; kontrastní kontroly z `CHECKS` v `palettes.py` (stejné dvojice a prahy) projdou pro všech 60.
- `packages/typy` (`@codekom/typy`): zod schémata a typy Obec (včetně `vLokale`, `castiObce`, `uredniHodiny[{den 1–7, od, do}]`, `sablona`, `paleta` 0–2, `urovenEditoru`, `moduly`), Aktualita, Akce, KategorieDesky, DokumentDesky (`vyvesenoOd`, `vyvesenoDo` nebo null, `skrytPoSejmuti`, `cisloJednaci`, `puvodce`, `soubor`), KrizoveHlaseni (`uroven`, `titulek`, `text`, `odkazText`, `odkazUrl`, `casti`, `platiOd`, `platiDo`, `updatedAt`), HlaseniRozhlasu, Zastupitel, ZivotniSituace (kroky se `zpusob`: `online`, `urad`, `samo`), Sluzba, Poplatek, HlaseniZavad (stavy `nove`, `prijato`, `v_reseni`, `vyrizeno`, `zamitnuto`; `verejnaOdpoved`), Budova, PrvekBudovy, Prostor, Rezervace, a odpovědi endpointů: `KrizeAktivniOdpoved`, `ObceSeznamOdpoved`, `PrehledOdpoved`, `NovaZavadaVstup`, `ZavadaOdpoved`. Názvy polí drž podle `obsah/javori-lhota/README.md` a stávajících kolekcí. Čisté funkce přesuň do `src/pravidla/` (`datum.ts`, `deska.ts` bez `deskaWhere`, `krize.ts`, exportováno jako `@codekom/typy/pravidla`); `apps/web/src/lib/*` je jen re-exportuje a `deskaWhere` zůstává lokálně. Přidej čistou funkci `filtrujDesku(dokumenty, filtry, dnes)` se stejnou sémantikou jako `deskaWhere` (visí, sejmuté bez skrytých po sejmutí, všechny; hledání bez rozlišení velikosti písmen v názvu a čísle jednacím) a test, který hrany dne porovná s `deskaWhere`.
- `packages/demo-data` (`@codekom/demo-data`): importuje `obsah/javori-lhota/*.json`, validuje je schématy z `typy` při načtení (chyba vypíše soubor a pole), exportuje typovaná pole, `DEMO_DNES` a `demoTed()` (pevný okamžik, ne hodiny stroje; důvod: obsah dává smysl i za rok a testy jsou deterministické). Obsah nepřepisuje.

**Datová vrstva `apps/web/src/lib/data/`.**
```ts
export interface ZdrojDat {
  obec(slug: string): Promise<Obec | null>
  seznamObci(): Promise<ObecVerejna[]>
  aktuality(obec: string, o?: { limit?: number }): Promise<Aktualita[]>
  akce(obec: string, o?: { odDne?: string }): Promise<Akce[]>
  deska(obec: string, f: DeskaFiltry): Promise<{ polozky: DokumentDesky[]; celkem: number }>
  krize(obec: string, ted: Date): Promise<{ hlavni: KrizoveHlaseni | null; dalsich: number }>
  rozhlas(obec: string): Promise<HlaseniRozhlasu[]>
  zastupitele(obec: string): Promise<Zastupitel[]>
  zivotniSituace(obec: string): Promise<ZivotniSituace[]>
  sluzby(obec: string): Promise<Sluzba[]>
  poplatky(obec: string): Promise<Poplatek[]>
  prostory(obec: string): Promise<Prostor[]>
  hlaseniZavad(obec: string, kod: string): Promise<HlaseniZavad | null>
}
```
Soubory: `zdroj.ts` (rozhraní a volba podle `CODEKOM_ZDROJ`), `demo.ts` (implementace), `demo-pamet.ts` (úložiště), `zapis.ts` (zápisové operace jen pro demo). Úložiště je semínko z `demo-data` zkopírované do paměti procesu, uložené pod symbolem na `globalThis`, aby ho nerozbil hot reload. Zápisy: `pridejAktualitu`, `vyvesDokument`, `upravDokument` (nová verze), `smazDokument`, `vydejKrizi`, `ukonciKrizi`, `pridejZavadu`, `vyridZavadu`, `pridejRezervaci`, `obnovUkazku`. Omezení zapiš do README a do rozhodnutí: jeden proces, při restartu (a na serverless při studeném startu) se vrátí semínko. Obec se do stránek dostává jako parametr, ne jako konstanta, aby prompt 01 mohl přidat `sites/[obec]` bez zásahu do UI. Čas pro krizi a desku bere vždy `demoTed()`, nikdy `new Date()`.

**Struktura `apps/web/src`.**
- `app/(web)/...` veřejné stránky se společným layoutem (pruh ukázky, banner, hlavička a patička zvolené šablony), `app/api/...` endpointy, `app/ukazka/administrace`.
- `sablony/<klic>/`: `Hlavicka.tsx`, `Uvod.tsx`, `Paticka.tsx`, `styly.css`, `fonty.ts`, u interaktivních i `Interaktivni.tsx` (klient); registr `sablony/index.ts` s dynamickými importy po klíči, aby se do stránky dostala jen sada písem aktivní šablony.
- `sablony/sdilene/`: tělo vnitřních stránek, `KrizovyBanner.tsx`, `ZnakObce.tsx`, `Foto.tsx`, `odkazy.ts`.
- `ukazka/`: `PrepinacUkazky.tsx`, `stav.ts` (čtení a zápis stavu ukázky), `Administrace*.tsx`.
- `proxy.ts` (Next 16) jen pro ukázku: přečte `sablona`, `paleta`, `krize`, `foto` z URL, zvaliduje je (neplatné zahodí), uloží do cookie `ukazka` a předá efektivní stav hlavičkou `x-codekom-ukazka` do požadavku. Priorita: URL, potom cookie, potom výchozí hodnoty obce z dat. Layout čte stav z hlaviček.
- Fotky a PDF: `scripts/priprav-ukazku.ts` (spouští se před `dev` a `build`) zkopíruje `design/obrazky/foto/*.webp` do `public/demo/foto/`, vygeneruje znak obce do `public/demo/znak.svg` (SVG z konstanty `ZNAK` v `build.py`) a z pole `text` každého dokumentu desky vytvoří `public/demo/deska/<id>.pdf` a zapíše velikosti do `src/lib/data/generovano/velikosti.json`, které `demo.ts` doplní do `soubor.velikost`. PDF s českou diakritikou (knihovna s vloženým písmem OFL, například `pdf-lib` s `@pdf-lib/fontkit` a písmem z `@fontsource`; ověř, že diakritika projde, a volbu zdůvodni v rozhodnutí). Generované soubory jsou v `.gitignore`.
</architektura>

<datovy_model>
Prototyp nemá databázi. Datový model jsou schémata v `packages/typy` a tvar `obsah/javori-lhota/*.json`. Přidej jen to, co úložiště potřebuje navíc:
- `DokumentDesky.verze[]` ({cislo, cas, zmena}); první vyvěšení vytvoří událost `vyveseno`, každá další úprava `zmeneno`. Detail ukáže seznam jako „Záznam o vyvěšení“.
- `HlaseniZavad`: `id`, `cislo` (tvar `HZ-<rok>-<nnnn>`), `sledovaciKod` (8 znaků z abecedy bez zaměnitelných `0 O 1 I L`, generuje `crypto.randomInt`), `stav`, `verejnaOdpoved`, `kategorie`, `popis`, `misto`, `poloha` (nepovinná), `kontakt` (nepovinný, nikdy se nevrací veřejným endpointem), `vytvoreno`.
- `Rezervace`: `prostor`, `den`, `od`, `do`, `ucel`, `zadatel` (jméno a kontakt), `stav` (`ceka`, `schvaleno`, `zamitnuto`); stavy `ceka` a `schvaleno` blokují termín.
- Variabilní symbol platby: rok (4 číslice), číslo popisné (zleva doplněné nulami na 4) a pořadí poplatku (2 číslice); je to ukázkové schéma, zapiš do rozhodnutí `[DOPLNIT: pravidlo variabilních symbolů obce]`.
- Tvar odpovědí endpointů je v zod schématech `typy` a stejné schéma se používá na serveru i v testech.
</datovy_model>

<funkce>
**Převod šablon (M3, M4).** Skript `design/generator/do-tsx.py` importuje `ZNAK`, `BASE_CSS`, `narrow_menu` z `build.py` a z `bodies/<Soubor>.html` zapíše TSX. Převádí: `class` na `className`, `style` na objekt, SVG atributy do camelCase, `for` na `htmlFor`, komentáře, prázdné prvky, `[[ZNAK n]]` na `<ZnakObce velikost={n}/>`, `[[ALERT]]` na `<KrizovyBanner/>`, úzké menu podle `narrow_menu()`, českou typografii podle `build.py` (nezlomitelná mezera po jednopísmenných předložkách a spojkách), `href="#"` na trasy podle tabulky `odkazy.ts` (klíč je text odkazu; neznámé texty skript vypíše a skončí chybou, nic se tiše nepřeskočí). Panel palet (`SPEC`) se nepřevádí, nahrazuje ho pruh ukázky. Tělo se rozdělí na `Hlavicka.tsx`, `Uvod.tsx`, `Paticka.tsx`. CSS šablony (`css` v `tpls.py`) a společné `BASE_CSS` bez pravidla pro `body` jde do `styly.css` zabalené do `.sablona-<klic> { … }` (CSS nesting; ověř ve výstupu buildu, že se pravidla rozbalila). `fonty.ts` skript vygeneruje z `googleFonts` jako literální volání `next/font/google` (volby musí být staticky čitelné, použité řezy nejvýš 600, osy podle dotazu). Kořen každé šablony: `<div className="site sablona-<klic>" style={cssPromenne(paleta)}>` s písmem, velikostí a řádkováním ze `sablony.ts`. Po převodu jsou TSX zdrojem pravdy, `design/` zůstává jako návrh; zapiš do rozhodnutí. Test: snapshot jedné šablony (`naves`) a test, že skript je idempotentní.

Statické šablony (10, serverové komponenty): naves, majka, hnizdo, vinice, hreben, rynek, kolonada, mlyn, hraz, zpravodaj.

Interaktivní šablony (10, klientské ostrůvky se stavem a logikou z `state` a `js` v `tpls.py`; skript převede i `sc-if` na podmíněné výrazy, `sc-for` na `map`, `{{x}}` na `{x}` a `onClick` na obsluhu, výpočet hodnot a stav doplň ručně a zachovej chování návrhu): zvonice (filtr desky podle kategorie, starší dokumenty), studanka (roční období), lipa (hledání), hranice (čeština a němčina, popisky rozhraní), radnice (pro koho: občan, podnikatel, návštěvník), lupa (velikost písma), kompas (vrstvy mapy), magistrat (přepínání zpráv), mikroregion (výběr obce), urad (životní situace). Klientský ostrůvek dostane data jako serializovatelné props ze serveru. Vše ovladatelné klávesnicí, stav oznámený `aria-pressed`, `aria-selected` nebo `aria-live`, podle návrhu.

**Seznamy z dat.** Na úvodech se čtyři seznamy (aktuality, úřední deska, akce, hlášení rozhlasu) napojí na `ZdrojDat`: markup první položky v šabloně se použije jako vzor, počet položek zůstane jako v návrhu (konstanta v `sablony/<klic>/limity.ts`), vyplní se pole, která data mají (název, datum přes `formatDay`, perex, kategorie, vyvěšeno a sejmutí); ostatní text může zůstat statický. U zvonice, urad a podobných ostrůvků, které měly data v `js`, nahradí tato pole data ze serveru. Zvláštní stránky: seznam „starší dokumenty“ ve zvonici čte stejné `filtrujDesku` jako stránka desky.

**Varianta s fotografií.** Při `foto=1` nahradí úvodní ilustraci šablony (SVG ve vrchní části úvodu) komponenta `Foto` s `design/obrazky/foto/sablona-NN-klic.webp` (`next/image`, rozměry, `priority`). Fotka má vždy viditelný popisek „Ilustrační fotografie vytvořená umělou inteligencí“ a popisný alt text; texty a ovládací prvky zůstávají čitelné (kontrast přes plochu pod textem, ne přes fotku). Pokud soubor chybí, zůstane ilustrace a skript vypíše varování.

**Krizový banner.** Server komponenta `KrizovyBanner` v layoutu, na pozici `[[ALERT]]` šablony, vykresluje nejvýš jedno hlášení. Znovupoužij `vyberBanner`, `lzeSkryt`, `klicSkryti`, `bezpecnyOdkaz`, `IkonaUrovne` a `SkrytHlaseni`. Tvar a chování jako v sekci „Krizový banner“ promptu 01: `section` s `aria-labelledby`, `h2` ve tvaru „Výstraha: titulek“ (úroveň slovem), text, odkaz, „Týká se: …“ podle `casti` (názvy z `castiObce`), „Další hlášení: N“ s odkazem na `/krizova-hlaseni`; krizi nejde zavřít; informaci a výstrahu jde skrýt a tlačítko vznikne až po hydrataci; klientský ostrůvek volá `/api/krize/aktivni` každých 60 s, jen když je stránka viditelná, a nové nebo změněné hlášení oznámí v prázdné oblasti `role="status"` (u krize `assertive`). Barvy a texty úrovní jsou z `@codekom/tokeny`. Stav banneru:
- bez volby (`krize` v ukázce není nastavené) se hlášení bere z úložiště k okamžiku `demoTed()`; tak se projeví vydání z administrace,
- `krize=off` banner vypne, `info`, `warning`, `emergency` zobrazí první ukázkové hlášení dané úrovně ze semínka bez ohledu na okno platnosti; takto vynucený banner se nepřepisuje pollingem a pruh ukázky u něj nabízí odkaz „Zobrazit podle dat obce“,
- `/api/krize/aktivni` čte vždy jen úložiště, nikdy přepínač.
`/krizova-hlaseni` ukáže všechna aktivní hlášení (nejzávažnější první), archiv ukončených, větu, že hlášení nenahrazují varovný systém IZS, a bez možnosti skrýt.

**Pruh ukázky** (`PrepinacUkazky`, jen s `NEXT_PUBLIC_UKAZKA=1`): vizuálně oddělený neutrálně šedý pruh jako panel palet v prototypech, nadpis „Ukázka CodeKom“. Ovládání: šablona (výběr z 20 podle `cislo nazev`), barevná varianta (3 tlačítka s názvem palety a třemi kapkami barev, `aria-pressed`), krizový banner (Vypnuto, Informace, Výstraha, Krize; `aria-pressed` ukazuje efektivní stav), úvodní obrázek (Ilustrace, Fotografie), odkazy Ukázka administrace a Aplikace. Změna nastaví URL parametry (`?sablona=lipa&paleta=1&krize=warning&foto=1`) přes `router.push`, proxy uloží cookie. Pruh je první za odkazem „Přeskočit na obsah“, cíle aspoň 44 × 44 px, viditelný fokus. Cookie `ukazka` je nutná pro funkci, kterou si návštěvník vyžádal, souhlas nepotřebuje; nic jiného se nenastavuje a neměří.

**Vnitřní stránky** (sdílená těla v hlavičce a patičce zvolené šablony, barvy a písmo ze šablony; na každé je jedno `h1`, `main id="obsah" tabIndex={-1}` a odkaz „Přeskočit na obsah“):

| Cesta | Obsah |
| --- | --- |
| `/uredni-deska` | vyvěšené dokumenty; formulář GET (kategorie, hledání), tabulka s `caption`, `th scope`, sloupci kategorie, číslo jednací, vyvěšeno, sejmutí („do odvolání“, je-li prázdné), stav textem, soubor (typ a velikost); stránkování 25 na stranu, prázdné stavy „Na úřední desce teď nic nevisí.“ a „Žádný dokument neodpovídá filtru.“ s odkazem Zrušit filtr; stav jen v URL přes `parseDeskaParams`, `deskaHref` |
| `/uredni-deska/archiv` | jen sejmuté dokumenty, které nejsou označeny „Po sejmutí nezveřejňovat“ |
| `/uredni-deska/[id]` | detail, popisný seznam, „Záznam o vyvěšení“, soubor přes `/uredni-deska/[id]/soubor`; sejmutý skrytý dokument vrací 404 s větou „Dokument už není na úřední desce zveřejněn.“ |
| `/aktuality`, `/aktuality/[slug]`, `/akce` | výpisy a detail, akce podle data od `demoTed()` |
| `/obecni-urad` | úřední hodiny, kontakty, úřední údaje (IČO, datová schránka, účet jako zjevná ukázka z dat), pověřenec |
| `/zastupitelstvo` | zastupitelé |
| `/zivotni-situace`, `/zivotni-situace/[slug]` | rozcestník a kroky se způsobem online, na úřadě, samo; každá služba má i cestu přes úřad |
| `/sluzby/platby` | poplatky; po zadání čísla popisného QR platba ve formátu SPD s částkou, měnou CZK, variabilním symbolem a zprávou (QR jako SVG na serveru, knihovna `qrcode` nebo ekvivalent; ověř verzi); viditelné „Ukázka, neplaťte“ u kódu i v zprávě platby; číslo účtu na IBAN převeď funkcí s unit testem, a pokud `cisloUctu` není platné číslo (ukázkový zástupce), použij zjevně neplatný IBAN `CZ0000000000000000000000` a vypiš, že kód nejde zaplatit; nikdy nevymýšlej skutečný účet |
| `/sluzby/nahlasit-zavadu` | formulář (kategorie z dat, popis, místo, volitelně kontakt), validace schématem `NovaZavadaVstup` s chybami u polí a shrnutím nahoře, po odeslání číslo a sledovací kód, vyhledání stavu podle kódu (zobrazí stav a veřejnou odpověď, nikdy kontakt) |
| `/sluzby/rezervace` | sál a hasičárna z `prostory.json`, volné a obsazené termíny na nejbližších 8 týdnů od `demoTed()`, formulář žádosti (prostor, den, od, do, účel, kontakt) s kontrolou kolize a času v minulosti, výsledek „Žádost čeká na schválení“ |
| `/krizova-hlaseni` | viz banner |
| `/hledat` | hledání bez ohledu na diakritiku a velikost písmen v aktualitách, akcích, vyvěšených dokumentech, zastupitelích, službách a životních situacích; skryté a sejmuté skryté dokumenty se nikdy nenajdou; prázdný stav s telefonem úřadu |
| `/povinne-informace` | 14 položek podle struktury vyhlášky 515/2020 Sb. v pevném pořadí; přesné názvy a členění `[OVĚŘIT]` v e-Sbírce jako v promptu 01, do té doby formulace „podle vyhlášky“ bez citace znění; údaje předvyplněné z obce |
| `/prohlaseni-o-pristupnosti`, `/ochrana-osobnich-udaju` | texty podle `docs/pravni-dokumenty.md` s ukázkovými údaji a zbylými `[DOPLNIT]` viditelnými |

Každá online služba má na stránce blok „Vyřídíte i na úřadě“ s telefonem, hodinami a adresou (pravidlo 6). Soubory dokumentů se otevírají vždy přes handler `/uredni-deska/[id]/soubor`, který vrátí PDF jen u dokumentu, který visí, nebo je sejmutý a není označený „Po sejmutí nezveřejňovat“; jinak 404. Přímé `public/demo/deska/*.pdf` je jen implementační detail ukázky; nikde se na něj neodkazuje a zapiš do rozhodnutí, že produkční soubory patří do privátního úložiště za handler (past z promptu 01). Každá stránka má `loading.tsx` (s `aria-busy`) tam, kde čte data, a `error.tsx` s telefonem, hodinami a adresou obce.

**Endpointy** (route handlery v `app/api/...` mimo skupinu `(payload)`, nad `ZdrojDat`, odpovědi validované schématy z `typy`, absolutní URL):

| Endpoint | Chování |
| --- | --- |
| `GET /api/krize/aktivni?obec=` | `{ hlavni, dalsich }`; `Cache-Control: no-store`; neznámá obec 404 `{ chyba }`, chybějící nebo špatný dotaz 400 |
| `GET /api/obce` | veřejný seznam {slug, nazev, okres, znakUrl, castiObce[{nazev, slug}]}, `Cache-Control: public, max-age=300` |
| `GET /api/obce/<slug>/prehled` | souhrn pro úvod aplikace: krize (jedno hlášení), 5 aktualit, 5 dokumentů desky (jen visící), rozhlas |
| `POST /api/hlaseni-zavad` | nové hlášení (`obec` v těle); 201 s `{ id, cislo, sledovaciKod, stav }`; 400 s chybami po polích; rate limit v paměti (5 za minutu na IP, 429 s `Retry-After`) |

Doplňky, které potřebuje prototyp aplikace 08 a které brief u 07 výslovně nevyjmenovává (zapiš do rozhodnutí): `GET /api/hlaseni-zavad?obec=&kod=` (stav a veřejná odpověď bez kontaktu), `POST /api/krize` (vydání; role v hlavičce `X-Ukazka-Role: spravce` smí publikovat, `redaktor` vytvoří jen koncept a dostane 202), `PATCH /api/hlaseni-zavad/<id>` (stav a `verejnaOdpoved`, role `spravce` nebo `redaktor`). Hlavička role je ukázková a není zabezpečení; zapiš to v README. CORS: všechny endpointy odpovídají na `OPTIONS` a přidávají `Access-Control-Allow-Origin` jen pro přesnou hodnotu `CODEKOM_APP_ORIGIN` (s `Vary: Origin`), jiné původy hlavičku nedostanou. Vlastní route handlery musí mít přednost před catch-all Payloadu `(payload)/api/[...slug]`, který přidá prompt 01 [OVĚŘIT testem].

**Ukázka administrace `/ukazka/administrace`** podle `design/prototypy/Editor-Zaklad.dc.html`: levá navigace (Přehled, Obsah, Úřední deska, Krizová hlášení, Hlášení závad; položky Stránky a menu, Média, Vzhled, Uživatelé, Nastavení obce, Skladatel stránky, Schvalování, Podweby ukaž zamčené s větou, že nejsou součástí ukázky), neustále viditelný štítek „Ukázka, data se po restartu vrátí“ a tlačítko „Obnovit ukázku“ (potvrzení). Bez přihlášení. Obrazovky:
1. Přehled: počty (aktuality, vyvěšené dokumenty, aktivní hlášení, nová hlášení závad), odkazy na web.
2. Nová aktualita: nadpis, perex, text, popis obrázku (alt), kontrola před zveřejněním (alt vyplněn, nadpisy; osobní údaj v textu se zjistí vzory pro telefon, e-mail a rodné číslo, publikaci zablokuje, dokud text nejde opravit nebo se nahradí tlačítkem „Nahradit číslem úřadu“; AI se nevolá). Zveřejnění zapíše do úložiště a ukáže odkaz na novou aktualitu.
3. Vyvěsit na úřední desku: název, kategorie, číslo jednací, původce, vyvěšeno od, sejmout, text dokumentu (vznikne ukázkové PDF), zaškrtnuté „Po sejmutí nezveřejňovat“ jako výchozí, povinné potvrzení „Dokument neobsahuje osobní údaje“. Po vyvěšení hláška se záznamem o vyvěšení. Dokument, který už visel, nejde smazat (tlačítko chybí a funkce `smazDokument` vyhodí chybu pravidla); úprava vytvoří novou verzi. Seznam „Na desce právě visí“ s datem sejmutí.
4. Krizové hlášení: úroveň slovem (Informace obce, Výstraha, Krizová situace), titulek, text, odkaz, části obce, platnost; v ukázce je role přepínač Správce nebo Redaktor: redaktor uloží jen koncept, vydat smí správce. Po vydání se ukáže, že hlášení je vidět na webu a v `/api/krize/aktivni`, a vynucený stav banneru v ukázce se zruší. Aktivní hlášení jde ukončit (krizi i informaci), nikoli smazat.
5. Hlášení závad: seznam podle stavu, detail, změna stavu a veřejná odpověď.
Zápis jde přes `zapis.ts` (server actions), po zápisu `revalidatePath` všech veřejných cest. Formuláře: viditelné popisky, chyby u polí a shrnutí nahoře, `aria-describedby`.
</funkce>

<pravidla>
Doménová pravidla z `CLAUDE.md` platí i v prototypu a mají testy:
1. Úřední deska: zveřejněný dokument, který už visel, nejde smazat; změny jsou verze; po posledním dni přejde do archivu, nebo zmizí z webu (včetně hledání, `/api/.../prehled`, souboru a archivu), je-li označen „Po sejmutí nezveřejňovat“, což je výchozí volba. Znění § 26 správního řádu a lhůty `[OVĚŘIT]`; nic o nich netvrď ve výrazných textech.
2. Krizová hlášení: viditelné jen jedno, nejzávažnější; úroveň slovem; krizi nejde zavřít; věta o IZS.
3. Peníze: platba je jen QR na účet obce; CodeKom nic nedrží; ukázka je označena „Ukázka, neplaťte“.
4. AI: v prototypu se nevolá model. Ukázka asistenta z `asistent-ukazka.json` (pokud ji šablona nebo stránka zobrazí) má viditelné „Jsem umělá inteligence“ a citace dokumentů desky; dotazy se neukládají.
5. Úřad je fallback: blok „Vyřídíte i na úřadě“ u každé služby.
6. Údaje, které neznáš (IČO, datová schránka, účet, telefon, e-mail), nevymýšlej; v datech jsou jako zjevná ukázka (například `[IČO]`) a stránky je tak zobrazí.
7. Fotky: označení „Ilustrační fotografie vytvořená umělou inteligencí“ se zobrazuje vždy. Zda to čl. 50 odst. 4 AI Actu u realistických fotek vyžaduje, je `[OVĚŘIT]`; označujeme vždy a v rozhodnutí je to uvedeno jako opatrná volba.
8. Data a časy se zobrazují v Europe/Prague, kalendářní dny jako 12:00 UTC podle `lib/datum.ts`.
9. Přístupnost je zákonná povinnost obcí (zákon č. 99/2019 Sb., EN 301 549 V3.2.1); stavíme na WCAG 2.2 AA. O pokutách nic netvrď.
10. Cookies: jen nezbytná `ukazka`, žádná analytika ani třetí strany, za běhu žádný požadavek na Google (písma jsou self-hostovaná při buildu).
</pravidla>

<design_a_pristupnost>
- Pravidla unslop z `CLAUDE.md`: řezy nejvýš 600, žádné přechody, záře ani emoji, jedna akcentová barva, mřížka 4 px, tenké linky, bez vykřičníků, bez šipky „→“, bez řetězců „A · B“, bez nadpisů nad nadpisy ve verzálkách. Skript `pnpm unslop` (součást `pnpm lint`; pokud neexistuje, založ minimální verzi: váhy 700 a víc, `gradient`, `text-transform: uppercase`, vykřičník v textech, emoji, „→“ v TSX, CSS a JSON obsahu; prompt 01 ji rozšíří). Převedené šablony musí pravidla splňovat; odchylku od prototypu zapiš.
- Text 17 px (Lupa 20 px podle návrhu), řádkování textu 1,5 až 1,6, cíle dotyku aspoň 44 × 44 px (návrh to řeší pravidlem v `BASE_CSS`, zachovej), kontrast textu aspoň 4,5 : 1, fokus aspoň 3 : 1 a viditelný, na tmavých pásech světlý. Obsah se vejde na 375 px bez vodorovného posunu a při zoomu 200 %.
- Landmarky `header`, `nav` s popiskem, `main`, `footer`; jedno `h1`; nadpisy bez přeskoku úrovní; tabulky mají `caption`; barva nenese význam sama; `prefers-reduced-motion` respektován.
- Pruh ukázky a administrace jsou součástí prototypu, ne šablony: mají vlastní neutrální styl, a přesto splňují stejná pravidla přístupnosti.
- Texty česky, krátce, úkolově; chyby říkají, co dělat.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Žádné tajné klíče v kódu; `.env.development` obsahuje jen nesekretní ukázkové hodnoty, `.env.example` popisuje každou proměnnou.
- Veškerý vstup (formuláře, endpointy, URL parametry ukázky) validuj zod schématy; neplatné hodnoty ukázky zahoď, neplatný vstup služeb vrať jako chybu po polích. Žádné vykreslování HTML z dat; odkazy z dat jen přes `bezpecnyOdkaz`.
- Hlášení závad a rezervace obsahují osobní údaje (kontakt): drží se jen v paměti, endpointy je nevrací veřejně, nelogují se. Fotka u hlášení (z aplikace) se v prototypu neukládá, uloží se jen metadata.
- Rate limit na `POST` endpointech; velikost těla omezit (hlášení 20 kB).
- CORS jen pro původ z `CODEKOM_APP_ORIGIN`. Hlavičky: stávající plus `X-Frame-Options` nebo `frame-ancestors 'none'` (ukázka se nevkládá do rámu).
- Ukázkový režim (`X-Ukazka-Role`, administrace bez přihlášení) se zapíná jen s `NEXT_PUBLIC_UKAZKA=1`; bez něj tyto cesty vrací 404. README i administrace uvádějí, že to není produkční zabezpečení.
- Data v EU: prototyp nemá žádné externí volání, nic neopouští počítač.
</bezpecnost_a_soukromi>

<testy>
Test nepřeskakuj ani neupravuj, aby prošel.
- Vitest (jednotky): přesunutá pravidla (`datum`, `deska`, `krize`: výběr, pořadí, okna platnosti, `klicSkryti`, `bezpecnyOdkaz`) s charakterizačními testy napsanými před přesunem; `filtrujDesku` vs `deskaWhere` na hranách dne; `demo-data` (validace všech JSON, chybová hláška při porušení schématu); `ZdrojDat` demo (filtry desky, skryté po sejmutí, `krize` podle `demoTed()`); úložiště (zápisy, obnovení semínka, smazání vyvěšeného dokumentu vyhodí chybu, nové verze); IBAN z čísla účtu na známém vzoru [OVĚŘIT zdrojem ČBA]; sestavení SPD řetězce; kód závady (abeceda, délka, unikátnost); kolize rezervací; převodní skript (snapshot šablony `naves`, idempotence, chyba na neznámý odkaz); `tokeny` (shoda `cssPromenne` s prototypem, 60 kombinací kontrastu); `unslop`.
- Endpointy (Vitest nad route handlery): tvary odpovědí proti zod schématům, 400 a 404, CORS jen pro `CODEKOM_APP_ORIGIN`, rate limit, doplňky (`GET` stavu bez kontaktu, práva redaktora a správce).
- Playwright na 375 a 1280 px (server `next build` a `next start` s `NEXT_PUBLIC_UKAZKA=1`, `CODEKOM_DEMO_DNES` pevné): úvod všech 20 šablon × 3 palet bez vodorovného posunu a bez chyb v konzoli; v každé interaktivní šabloně jedna základní interakce; varianta Fotografie má popisek a alt; klíčové cesty: nahlásit závadu a dohledat ji podle kódu, zaplatit (QR a „Ukázka, neplaťte“), rezervace (kolize a čekající žádost), filtr úřední desky v URL a stránkování, sejmutý skrytý dokument vrací 404 včetně souboru, administrace vyvěsí dokument a vydá krizi a ta je vidět na webu i v `GET /api/krize/aktivni`; informace a výstraha jdou skrýt (zůstanou skryté po obnovení, po změně `updatedAt` se vrátí), krize tlačítko nemá; stav ukázky v URL a cookie; za běhu žádný požadavek na `fonts.googleapis.com` ani `fonts.gstatic.com`.
- axe (`@axe-core/playwright`, tagy WCAG 2.0 až 2.2 A a AA plus best-practice): 60 úvodů ve stavu Vypnuto; 3 šablony (naves, lupa, urad) × 3 palety × 4 stavy banneru; vnitřní stránky (deska, detail, aktualita, akce, obecní úřad, platby, nahlásit závadu, rezervace, krizová hlášení, hledání, povinné informace, prohlášení o přístupnosti) u šablon naves, lupa a urad; administrace ukázky. Nula chyb.
- Snímky: `pnpm --filter web snimky` (skript `scripts/snimky.ts` nad sestaveným serverem, stav `krize=off`, `foto=0`) uloží WebP přes `sharp` do `design/snimky/<klic>-<paleta 0–2>-1280.webp` (1280 × 900) pro všech 60 kombinací a `<klic>-0-375.webp` (375 × 800) pro 20 šablon v paletě 0, tedy 80 souborů. Test ověří počet a rozměry.
- Skript `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm e2e`, `pnpm a11y` v kořeni (Turborepo) i v `apps/web`.
</testy>

<postup>
Na začátku vypiš plán a úkoly (`docs/progress.json` se stavy) a průběžně je odškrtávej. Každý milník končí spuštěním kontrol (`pnpm typecheck && pnpm lint && pnpm test`, od M3 i `pnpm --filter web build`) a commitem česky v rozkazovacím způsobu s předepsanými řádky atribuce. Po dvou neúspěšných opravách téhož problému se zastav a problém popiš. Rozhodnutí, která jsi udělal, zapisuj průběžně do `docs/rozhodnuti.md`.
- M0 Monorepo: ověř položky z `<overit>` (verze přes `npm view`), založ kořenové soubory, převeď `apps/web` na pnpm, smaž `package-lock.json`, doplň skripty `lint`, `e2e`, `a11y`, ověř `pnpm install` a `pnpm --filter web build` bez `DATABASE_URI`. Pokud už monorepo vzniklo (prompt 06), jen zkontroluj a doplň.
- M1 Balíčky: `packages/tokeny` (skript `tokeny.py`, testy), `packages/typy` (schémata), `packages/demo-data` (import a validace JSON), charakterizační testy a přesun čistých pravidel, re-exporty v `apps/web/src/lib`.
- M2 Datová vrstva: `ZdrojDat`, `demo`, `demo-pamet`, `zapis`, `KrizovyBanner` se stavy, `proxy.ts`, `PrepinacUkazky`, `scripts/priprav-ukazku.ts` (kopie fotek, znak, PDF).
- M3 Převod a statické šablony: `do-tsx.py`, `odkazy.ts`, 10 statických šablon včetně seznamů z dat a varianty s fotografií, testy skriptu, první běh matice 10 × 3.
- M4 Interaktivní šablony: 10 klientských šablon, matice úvodů 20 × 3, základní interakce.
- M5 Vnitřní stránky: deska, archiv, detail a soubor, aktuality, akce, úřad, zastupitelstvo, životní situace, krizová hlášení, hledání, povinné informace, prohlášení, osobní údaje.
- M6 Služby a endpointy: platby s QR, hlášení závad, rezervace, `/api/krize/aktivni`, `/api/obce`, `/api/obce/<slug>/prehled`, `POST /api/hlaseni-zavad`, doplňky a CORS, testy endpointů.
- M7 Ukázka administrace: pět obrazovek, zápisy, vazba na web a API.
- M8 Dokončení: Playwright a axe podle `<testy>`, `pnpm --filter web snimky` (snímky vlož do `design/snimky`), README „Jak spustit ukázku“ (spuštění, proměnné, adresy stavů pro prezentaci, omezení paměťového úložiště, role hlavičky), zápis rozhodnutí a ověřovacího záznamu `docs/verification-log.md`.
</postup>

<hotovo_kdyz>
Všechno níže projde nebo je vidět:
1. `pnpm install && pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v kořeni bez chyby, žádný přeskočený test.
2. `pnpm --filter web build` projde bez `DATABASE_URI`; `pnpm demo` spustí web na localhostu (a aplikaci, pokud existuje `apps/mobile`).
3. Všech 20 šablon × 3 palety se vykreslí z dat; přepínač v pruhu mění šablonu, paletu, banner a obrázek; odkaz `/?sablona=lipa&paleta=1&krize=warning&foto=1` otevře přesně tento stav.
4. Banner: ve 4 stavech správně (jedno hlášení, úroveň slovem, krize nejde zavřít, ostatní jdou skrýt), `/krizova-hlaseni` a `GET /api/krize/aktivni?obec=javori-lhota` fungují.
5. Deska: filtr kategorie a hledání v URL, stránkování, prázdné stavy, archiv jen ne-skrytých, detail se záznamem o vyvěšení, sejmutý skrytý dokument vrací 404 i pro soubor, vyvěšený dokument nejde smazat.
6. Služby: platba s QR a „Ukázka, neplaťte“, nahlášení závady s číslem a sledovacím kódem a dohledáním, rezervace s kolizí a čekající žádostí, hledání bez diakritiky.
7. Ukázka administrace: aktualita, dokument na desku, krizové hlášení (jen správce publikuje) a vyřízení závady se okamžitě projeví ve všech 20 šablonách a v endpointech `prehled` a `krize/aktivni`; „Obnovit ukázku“ vrátí semínko.
8. Endpointy `GET /api/krize/aktivni`, `GET /api/obce`, `GET /api/obce/javori-lhota/prehled`, `POST /api/hlaseni-zavad` odpovídají schématům; CORS jen pro `CODEKOM_APP_ORIGIN`.
9. axe: 60 úvodů ve stavu Vypnuto, 36 běhů banneru (3 šablony × 3 palety × 4 stavy), vnitřní stránky u naves, lupa, urad a administrace: 0 chyb.
10. `pnpm --filter web snimky` vytvoří 80 souborů v `design/snimky/` (60 × 1280, 20 × 375).
11. Žádný požadavek na Google za běhu, žádná analytika, jediná cookie `ukazka`; fotky mají vždy označení umělé inteligence.
12. `docs/verification-log.md` obsahuje výsledek každé položky z `<overit>`; neověřené je v kódu označené `[OVĚŘIT]`; `docs/rozhodnuti.md` obsahuje všechna rozhodnutí z tohoto zadání.
</hotovo_kdyz>

<overit>
Zapiš zdroj, datum a výsledek každé položky do `docs/verification-log.md`. Co nejde ověřit, nech v kódu označené `[OVĚŘIT]`.

| Položka | Jak |
| --- | --- |
| TypeScript 7 a Vitest 5 jako major verze: nechat 5.9.x a 3.x | `npm view typescript version`, `npm view vitest version`, `npm view @payloadcms/next@3.92.1 peerDependencies`, vydání Next 16.4 a Payloadu 3.92; zkus build s navrženou verzí jen jako experiment, v repu zůstane 5.9.x a 3.x |
| Přesná shoda verzí `payload` a `@payloadcms/*`, kompatibilita s Next 16.4 | `npm view payload version`, `npm view @payloadcms/next@3.92.1 peerDependencies`, `pnpm why` |
| Přednost vlastních route handlerů před catch-all Payloadu | test: do dočasné fixture přidej `(payload)/api/[...slug]/route.ts` vracející jiný text, sestav aplikaci a ověř, že `/api/krize/aktivni` a `/api/obce` obslouží vlastní handlery; fixture po testu odstraň a výsledek zapiš (dokumentace Next, segmenty, přednost statických před catch-all) |
| `next build` bez `DATABASE_URI` | spusť build bez proměnné, zapiš výsledek a případné úpravy `next.config.ts` |
| Čl. 50 odst. 4 AI Actu u realistických AI fotek na obecním webu | text nařízení (EU) 2024/1689 na EUR-Lex, pokyny Komise k označování; do té doby označujeme vždy |
| `next/font/google`: self-hosting při buildu, žádný požadavek za běhu, do stránky jen písma aktivní šablony, osy proměnných písem (`opsz`) | dokumentace `next/font`, síťové požadavky v Playwrightu, výstup `.next`; zjisti také, zda build vyžaduje internet, a zapiš do README |
| Port Expo webu 8081 a CORS | dokumentace Expo (`expo start --web`) |
| Knihovna pro QR a formát SPD (verze, pole ACC, AM, CC, X-VS, MSG) a IBAN z čísla účtu | specifikace QR Platby České bankovní asociace; `npm view qrcode version` |
| Písmo s diakritikou ve vygenerovaných PDF | otevři vygenerované PDF, ověř text „Příloha“ nebo jiný řetězec s háčky a čárkami |
| CSS nesting ve výstupu buildu a podpora v cílových prohlížečích | prohlédni sestavený CSS; v případě potřeby místo nestingu předpona selektorů při převodu |
| Vyhláška 515/2020 Sb., přesné členění položek povinných informací | e-Sbírka; do ověření formulace bez citace, označeno `[OVĚŘIT]` |
</overit>

<zaver>
Na konci napiš shrnutí ve třech částech.
- Hotovo: co funguje a čím je to ověřené (příkazy a počty, například „60 úvodů a 36 běhů banneru bez chyb axe“, počet snímků, ruční průchod ukázkou).
- Zbývá: co nevzniklo nebo je omezené (paměťové úložiště, doplňkové endpointy bez skutečné autorizace, položky z `<overit>`, které zůstaly neověřené).
- Místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru: ukázkové údaje obce (IČO, datová schránka, účet, telefon, e-mail), pravidlo variabilních symbolů, znění právních textů, port aplikace, čl. 50 AI Actu.
</zaver>

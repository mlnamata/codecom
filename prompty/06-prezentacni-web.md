# Prompt: Prezentační web CodeKom

Vlož celý do Claude Code v kořeni repozitáře `/home/claude/codecom`.
Závisí na: `apps/web` (endpoint `POST /api/poptavky`, tj. webový prompt; bez něj postav jen minimální verzi podle sekce architektura), `packages/tokeny` (nepovinně), `design/prototypy` a `design/generator/palettes.py` (podklady galerie), `brand/` (logo), `docs/pravni-dokumenty.md` (D).

<kontext>
CodeKom prodává obcím web s úřední deskou, aplikaci pro občany, digitální úřad, správu budov a AI asistenta. Prezentační web (`apps/prezentace`) je to, co uvidí starosta, účetní nebo správce webu, když ho někdo doporučí nebo když si CodeKom vyhledá. Musí během pár minut odpovědět na otázky, které si starosta klade: kolik to stojí, co řekne kontrola a jak se z toho dostanu, když to nebude fungovat.

Čtenáři:
- starosta malé obce, často neuvolněný, čte po večerech na telefonu, nerozumí technice a bojí se, že rozhodne špatně,
- účetní nebo administrativní pracovnice úřadu, která web ve skutečnosti spravuje a bude podklady přeposílat radě,
- správce webu nebo externí dodavatel, který chce vidět šablony a technické záruky.

Obec nenakupuje jako firma. Rozhoduje rada nebo zastupitelstvo, potřebuje písemnou nabídku, vzorovou smlouvu a podklad pro usnesení, a vybírá se zpravidla při schvalování rozpočtu na podzim a v prosinci. Web proto není jen leták: je to sada podkladů, které starosta přepošle radě.

Přečti si před začátkem:
- `CLAUDE.md` (stack, design, pravidla domény, kontrola hotovo; neopisuj ho),
- `brand/README.md` a soubory v `brand/`,
- `docs/rozhodnuti.md`, `docs/navrh-platformy/01-navrh-platformy.md` (cílovky, ceník, rizika), `03-sablony-webu.md` (20 šablon), `04-admin-editor.md` (tři úrovně editoru),
- `docs/pravni-dokumenty.md`, hlavně A (smlouva), B (zpracování), D (zásady ochrany osobních údajů CodeKom),
- `research/poznamky/web_obce_a_prodej.md` a `research/zprava-podklady-pro-prompty.md`, sekce 6.
</kontext>

<cil>
Na konci běží `apps/prezentace` jako staticky generovaný web v češtině, nasazený na Vercelu v regionu `fra1`, s mapou stránek z této specifikace. Návštěvník si prohlédne 20 šablon na ukázkové obci Javoří Lhota včetně přepínače barevných palet, spočítá si orientační cenu, stáhne vzorovou nabídku, smlouvu a podklad pro radu a odešle poptávku, která se uloží v `apps/web` a potvrdí e-mailem. Web nepoužívá cookies ani třetí strany bez souhlasu, splňuje WCAG 2.2 AA a na mobilu dosahuje Lighthouse 95 a víc. Každé tvrzení na webu má záznam o zdroji nebo je označené k ověření a nic na webu neslibuje to, co produkt nebo rešerše nepotvrdily.
</cil>

<vychozi_stav>
- `apps/prezentace` zatím neexistuje. Založí se v monorepu (pnpm + Turborepo) podle `CLAUDE.md`. Zkontroluj, zda kořenové `pnpm-workspace.yaml` a `turbo.json` existují. Pokud ne, založ je jen v minimu potřebném pro tuto aplikaci a zapiš to do `docs/rozhodnuti.md`.
- `brand/` obsahuje jen PNG. SVG verze a favicon chybí a vyrobíš je ty.
- `design/prototypy/*.dc.html` jsou prototypy 20 šablon. `design/generator/palettes.py` obsahuje 3 palety po 12 tokenech pro každou šablonu. `design/nastroje/variants.js` ukazuje, jak prototypy vykreslit v Playwrightu (včetně `minidc.js` a fontů) a jak přepnout barevnou variantu. Použij to pro snímky galerie.
- `apps/web` má kolekce a testy, ale endpoint `POST /api/poptavky` zatím nemusí mít. Nejdřív ho dohledej.
- Ceny v `docs/navrh-platformy/01` a `04` jsou hypotézy. Texty v `docs/pravni-dokumenty.md` D jsou návrh ke kontrole advokátem a obsahují `[HRANATÉ ZÁVORKY]`.
</vychozi_stav>

<rozsah>
Postav:
1. Aplikaci `apps/prezentace` (Next.js 16, App Router, Tailwind 4, TypeScript strict).
2. Stránky podle mapy v sekci funkce, včetně právních stránek.
3. SVG verze loga a favicon sadu, OpenGraph obrázky.
4. Galerii 20 šablon se snímky z prototypů a přepínačem palet.
5. Orientační kalkulačku ceníku z datového souboru.
6. Poptávkový formulář napojený na `apps/web`, newsletter s potvrzením přihlášení.
7. Ke stažení: vzorová nabídka, vzorová smlouva (A), smlouva o zpracování (B) a vzor usnesení rady, jako přístupné PDF vygenerované z textů v repu.
8. Kontroly: Playwright, axe, Lighthouse CI, kontrola odkazů, kontrola obsahu (zakázaná tvrzení, hesla, zbylé `[DOPLNIT]`).
9. Registr tvrzení `docs/tvrzeni-prezentace.md`.

Mimo rozsah:
- vlastní CMS pro prezentaci a administrace (viz volba obsahu níže),
- skutečné reference, počty obcí, citace starostů, ceny konkurence (nic z toho nevymýšlej),
- chatbot na webu (kdyby vznikl, platí čl. 50 AI Actu; v této verzi nebude),
- samotný provoz newsletteru (odesílání kampaní), jen sběr a potvrzení přihlášení,
- úpravy `apps/web` mimo endpoint poptávek (a jen pokud chybí),
- blog, tmavý režim, angličtina a němčina (příhraniční obce řeší šablona Hranice, web CodeKom je jen česky).
</rozsah>

<architektura>
**Volba obsahu: MDX v repozitáři, ne Payload.** Důvody, které zapiš do `docs/rozhodnuti.md`:
- obsah mění zakladatel a Claude Code, ne obecní redaktoři, takže editor v prohlížeči nikdo nepotřebuje,
- každá změna textu projde gitem, kontrolou obsahu a review, což potřebujeme u tvrzení s právním dopadem,
- stránka je statická bez závislosti na databázi: výpadek `apps/web` nesmí shodit prezentaci,
- Payload by přidal další kolekce pod superadminem, migrace a práva, aniž by cokoli získal.

Výjimka: poptávky a přihlášení k newsletteru se ukládají v `apps/web`, protože jde o osobní údaje a potřebují databázi.

**Struktura**
```
apps/prezentace/
  src/app/                 stránky (App Router), sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  src/obsah/               MDX stránek a FAQ (jedna věta = jedno tvrzení, kde to jde)
  src/data/                cenik.ts, dotace.ts, sablony.ts (generovaný), moduly.ts, faq.ts
  src/komponenty/          Hlavicka, Paticka, Galerie, KalkulackaCeniku, PoptavkovyFormular, Tabulka ...
  src/lib/                 poptavka.ts (klient + zod schéma ze packages/typy, nebo lokální), seo.ts
  public/brand/            SVG a PNG loga
  public/sablony/          snímky <klic>-<paleta>.webp (1280 a 640 px)
  public/ke-stazeni/       PDF
  scripts/                 sablony-z-navrhu, snimky-sablon, logo-svg, pdf, kontrola-obsahu, kontrola-doplnit
  tests/                   Playwright, axe, odkazy
```
Soubory ve `src/data/` jsou typované a každá položka s číslem nebo právním tvrzením nese `stav: "overeno" | "hypoteza" | "neovereno"`, `zdroj` (URL nebo odkaz na soubor v repu) a `overenoDne` (ISO datum).

**Nasazení.** Vercel, `vercel.json` s `"regions": ["fra1"]`. Stránky se generují staticky (`generateStaticParams`, bez `dynamic = "force-dynamic"`). Dynamické jsou jen klientské prvky formuláře. Žádná proměnná prostředí s tajnou hodnotou v klientu. Hlavičky v `next.config.ts`: `Content-Security-Policy` (jen vlastní původ a API `apps/web`, žádné skripty třetích stran), `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` bez kamery, mikrofonu a polohy. Písma self-hosted přes `next/font/local`, nikdy z Google Fonts (přenos IP návštěvníka do USA bez souhlasu).

**Proměnné** (`.env.example` s popisem): `NEXT_PUBLIC_API_URL` (základ `apps/web`), `NEXT_PUBLIC_SITE_URL` [DOPLNIT: doména CodeKom], `NEXT_PUBLIC_DEMO_URL` (základ živého dema Javoří Lhota, prázdné = odkazy na demo se nezobrazí a zůstanou snímky), `CENIK_ZVEREJNIT` (výchozí `false`).

**Rozhraní na `apps/web`** (drž přesně):
```
POST {API}/api/poptavky
{ druh: "poptavka" | "newsletter",
  jmeno?: string, funkce?: string, obec?: string, obyvatel?: "do500" | "500-2000" | "2000-10000",
  email: string, telefon?: string, zprava?: string,
  moduly?: ("web"|"aplikace"|"urad"|"iot"|"ai")[],
  newsletter: boolean,          // výchozí false, nikdy předzaškrtnuté
  web: string,                  // honeypot, musí být prázdný
  vytvoreno: number }           // čas zobrazení formuláře, server odmítne < 3 s
→ 201 { ok: true } | 422 { chyby: { pole: zprava }[] } | 429
```
Server (`apps/web`) poptávku uloží do kolekce `poptavky` (jen superadmin, bez tenanta, bez veřejného čtení), pošle potvrzení na zadaný e-mail a upozornění zakladateli, a u newsletteru pošle potvrzovací odkaz `GET /api/poptavky/potvrdit?token=…`. Do potvrzení se adresa nepoužije k žádnému sdělení. Má rate limit, CORS jen pro původ prezentace a nepřijímá `newsletter: true` bez následného potvrzení. Pokud endpoint v `apps/web` chybí, postav jen toto: kolekci `poptavky` (pole výše, `stav`, `potvrzenoV`, `odhlasenoV`, `vytvoreno`), endpoint, novou migraci a test. E-mailovou službu skryj za rozhraní `posliEmail()` s implementací do konzole ve vývoji. Konkrétní službu nevolím: [DOPLNIT: e-mailová služba v EU].

**Měření návštěvnosti.** Ve výchozím stavu žádné. Poznámka k D: tabulka v D uvádí měření „na základě souhlasu“. Tento prompt volí přísnější variantu (bez měření, nebo bez cookies a bez ukládání čehokoli do zařízení), proto uprav v D řádek měření a zapiš to do rozhodnutí. Pokud zakladatel měření chce, doporuč nástroj bez cookies běžící na serveru v EU (kandidáti Plausible, Umami self-hosted; ověř provozovatele, umístění dat a zda nezapisuje do zařízení) a zapni ho jen přes proměnnou. Právní stanovisko, zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zákona č. 127/2005 Sb., je NEOVĚŘENO, proto cookie lišta nebude a měření bude vypnuté, dokud to advokát nepotvrdí.
</architektura>

<datovy_model>
Jen datové soubory (žádná databáze v prezentaci). Typy v `src/data/typy.ts`:

- `Modul { klic: "web"|"aplikace"|"urad"|"budovy"|"ai", nazev, jednaVeta, bodyProStarostu[] , stav }`
- `Sablona { klic, poradi (1–20), nazev, proKoho, popis, palety: { nazev, tokeny{12}, snimek1280, snimek640 }[3] }`. Klíče a pořadí: naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad. Soubor generuje `scripts/sablony-z-navrhu` z `palettes.py` a z tabulky v `docs/navrh-platformy/03-sablony-webu.md`. Ručně se needituje.
- `Cenik { urovne: { klic: "zaklad"|"pokrocily"|"advance", nazev, popis, ceny: Record<"do500"|"500-2000"|"2000-10000", Cena> }[], moduly: { klic: "urad"|"budovy", nazev, ceny: … }[], zalozeni: Cena, platba: { rocni, mesicni } }`, kde `Cena = { kcBezDph: number | null, stav, zdroj, overenoDne }`. Hodnoty z hypotéz v `docs/navrh-platformy/04-admin-editor.md` vlož se `stav: "hypoteza"`. Rozdíl mezi roční a měsíční platbou (sleva, DPH) [DOPLNIT].
- `Dotace { nazev, poskytovatel, url, prijemZadosti: { od, do } | null, stav: "otevrena"|"planovana"|"uzavrena"|"neovereno", overenoDne, poznamka }`.
- `Faq { otazka, odpoved (MDX), skupina: "nakup"|"pravo"|"provoz"|"prechod" }`.

Přístup a validace: všechny soubory se kontrolují zod schématem při buildu. Build selže, pokud položka s `stav: "overeno"` nemá `zdroj` a `overenoDne`.
</datovy_model>

<funkce>
**Mapa webu** (adresy bez diakritiky, navigace nejvýš 7 položek, patička úplná):

| Adresa | Stránka | Obsah |
|---|---|---|
| `/` | Úvod | pro koho to je, co obec získá, tři důvody (čas, právní jistota, férové podmínky), ukázka dema, ceník v kostce, jedna výzva „Napište nám“ |
| `/co-umime` | Co umíme | pět modulů (web a úřední deska, aplikace, digitální úřad, budovy, AI asistent), každý s tím, co řeší, a s tím, co nedělá |
| `/ukazky` | Ukázky | galerie 20 šablon |
| `/cenik` | Ceník | tabulka a kalkulačka |
| `/prechod` | Přechod na CodeKom | migrace ze starého webu, školení, podpora, časový plán |
| `/bezpecnost-a-pravo` | Bezpečnost a právo | data v EU, smlouva o zpracování, přístupnost, AI Act, seznam podzpracovatelů |
| `/dotace` | Dotace | přehled výzev s datem ověření |
| `/pro-koho` | Pro koho | malé obce, mikroregiony a MAS, organizace obce |
| `/o-nas` | O nás | kdo jsme, heslo, jak pracujeme |
| `/kontakt` | Kontakt a poptávka | formulář, telefon, e-mail, sídlo |
| `/ke-stazeni` | Ke stažení | nabídka, smlouva, zpracování, vzor usnesení; FAQ „Jak obec nakupuje“ |
| `/pristupnost`, `/zasady-osobnich-udaju`, `/cookies`, `/potvrzeni-prihlaseni`, `/odhlaseni` | právní a pomocné | viz níže |

**Úvod.** První obrazovka říká, pro koho web je a co obec získá, ne slogan. Hesla „Tvoříme kódy pro lidi.“ se užívá v patičce, na stránce O nás a v OpenGraph obrázcích, ne jako hlavní nadpis. Pod ním tři věty o úspoře času, právní jistotě a podmínkách, pak řádek s pěti moduly, pak dvě ukázky šablon a cena „od [DOPLNIT] Kč měsíčně bez DPH“, teprve jakmile je cena `overeno`.

**Co umíme.** Pro každý modul: komu pomáhá (starosta, účetní, občan), 3 až 5 konkrétních věcí, odkaz na živé demo, co modul nedělá. Používej jen to, co říkají `docs/navrh-platformy` a `CLAUDE.md`:
- web a úřední deska: povinně zveřejňované informace ve struktuře vyhlášky č. 515/2020 Sb., úřední deska s evidencí vyvěšení a sejmutí, přístupnost,
- aplikace: oznámení a krizová hlášení v telefonu (na webu i v aplikaci je vidět vždy jedno, nejzávažnější; nenahrazuje varovný systém IZS), účet bez hesla,
- digitální úřad: formuláře, hlášení závad, rezervace, poplatky; peníze jdou přímo na účet obce, CodeKom je nedrží,
- budovy: topení a zámky s nouzovým mechanickým otevřením, ochrana proti mrazu funguje i bez internetu; úspory energie jen jako cíl měření bez procenta, dokud nejsou vlastní naměřená data (číslo „kolem 30 %“ z odborného zdroje na web nepatří),
- AI asistent: vždy řekne, že je AI, odpovídá z dokumentů obce a cituje je, dotazy neukládá ke jménu, běží na serveru v ČR.

**Ukázky.** Mřížka 20 šablon (1 sloupec na 375 px, 2 na tabletu, 3 až 4 na desktopu), u každé snímek, název, „pro koho“ jednou větou. Detail šablony (`/ukazky/[klic]`): velký snímek, přepínač 3 palet (skupina tlačítek se `aria-pressed`, názvy palet slovy, vzorek 12 tokenů jako seznam se kontrastem), odkaz „Otevřít živé demo“ na `NEXT_PUBLIC_DEMO_URL` s parametry šablony a palety, jen pokud je proměnná vyplněná. Snímky vyrob skriptem `snimky-sablon` z prototypů (1280 × 900 a 375 × 800, WebP, pod 120 kB), nevytvářej je ručně. Alt text popisuje obsah („Úvodní stránka šablony Lípa pro obec Javoří Lhota, paleta Lipová“). Barevné akcenty z paleta jsou povolené jen uvnitř snímků a vzorků.

**Ceník.** Dvě osy: velikost obce (do 500, 500–2 000, 2 000–10 000 obyvatel) a úroveň webu, plus moduly Digitální úřad a Chytré budovy (za každou budovu). Zobrazení: tabulka s pevnými řádky, pod ní kalkulačka (velikost, úroveň, moduly, počet budov, způsob platby) s výsledkem v `aria-live="polite"`. Způsoby platby: roční licence fakturou (splatnost 30 dní, doklad do datové schránky), nebo měsíčně kartou (A, čl. 3). Pod tabulkou ukaž podmínky z A doslova a bez zkrášlení: výpověď kdykoli bez udání důvodu, výpovědní doba 3 měsíce u roční a 1 měsíc u měsíční platby, 30 dní zkušební doba s vrácením celé ceny, vrácení nevyčerpaných měsíců u roční licence, úřední deska běží i při neplacení, export dat zdarma, po skončení 30 dní jen pro čtení, cena roste nejvýš o inflaci a nejvýš jednou ročně. Dokud je `CENIK_ZVEREJNIT=false` nebo má cena stav `hypoteza`, ukáže se na produkci místo čísla věta „Cenu pošleme s nabídkou“ a v náhledu (preview) číslo se štítkem „hypotéza“.

Upozornění pro tebe: návrh 04 zmiňuje založení webu zdarma při smlouvě na 24 měsíců a pilot na 6 měsíců zdarma. Smlouva A je na dobu neurčitou s výpovědí kdykoli a zkušební dobou 30 dní, proto tyto dvě nabídky na web nedávej. Zapiš rozpor do závěru jako otázku pro zakladatele.

**Přechod na CodeKom.** Kroky se skutečným obsahem: výběr šablony a přizpůsobení znaku a fotkám (návrh uvádí do 5 pracovních dnů, zveřejni jen jako [OVĚŘIT]), převod obsahu ze starého webu, převod úřední desky tak, aby evidence vyvěšení nezanikla, přesměrování starých adres, školení správců podle zvolené úrovně editoru, podpora (lhůty z A, čl. 5), co obec musí dodat (znak, kontakty, přístupy k doméně). K tomu kontrolní seznam ke stažení. Neslibuj konkrétní čas migrace, dokud ho zakladatel nepotvrdí.

**Bezpečnost a právo.** Sekce s vlastními kotvami: data v EU (databáze Supabase ve Frankfurtu, web na Vercelu v regionu Frankfurt, AI server v ČR; podzpracovatelé z přílohy B2 včetně těch, které jsou [ověřit], a předání mimo EU jen na základě standardních smluvních doložek), smlouva o zpracování podle čl. 28 GDPR ke stažení, přístupnost (zákon č. 99/2019 Sb., stavíme podle WCAG 2.2 AA, odkaz na prohlášení), úřední deska (nesmazatelné vyvěšené dokumenty, verze), AI Act čl. 50 (asistent se představí jako AI), kybernetická bezpečnost (zákon č. 264/2025 Sb.: slíbit pouze součinnost podle A; zda je obec regulovaná, ať ověří kalkulačkou NÚKIB). Nepiš o pokutách ani sankcích, text zákona č. 99/2019 Sb. je nezmiňuje. Nepiš „certifikováno“ ani „bezpečné“, piš, co děláme.

**Dotace.** Stránka je přehled, ne slib. Úvodní odstavec říká, že dotace nezaručujeme a že pomůžeme s podklady k žádosti (cena služby [DOPLNIT]). Tabulka z `dotace.ts` zobrazuje jen položky se `stavem` a `overenoDne`, nahoře datum posledního ověření celé tabulky. Agent ověří výzvy 2026–2027 z dokumentů uvedených v sekci overit (MMR, MV, Plzeňský kraj, IROP) a zapíše jen to, co skutečně přečetl. Co nedokáže ověřit, nezobrazí; stránka pak říká „Aktuální výzvy sledujeme a pošleme je na vyžádání“ a nabízí formulář.

**Pro koho.** Tři oddíly: malá obec (do 500 a do 2 000 obyvatel), mikroregion nebo MAS (společná správa více obcí, společné zakázky; stav funkce podle návrhu 01 označ jako plánovaný, pokud ještě není), organizace obce (škola, knihovna, sportoviště jako podweb).

**O nás.** Kdo jsme (skutečné údaje, které zná zakladatel: [DOPLNIT: jména, fotografie, krátký životopis, IČO, sídlo]), jak pracujeme, heslo „Tvoříme kódy pro lidi.“ Žádné vymyšlené reference, počty obcí ani citace. Do spuštění pilotu je sekce Reference jen věta „První obce připravujeme [DOPLNIT: pilotní obce]“ a v produkčním buildu se skryje.

**Kontakt a poptávka.** Formulář: jméno, funkce, obec, počet obyvatel (výběr), e-mail, telefon (nepovinný), o co máte zájem (moduly, zaškrtávací pole nepředvyplněná), zpráva. Pod ním jedna věta, k čemu údaje použijeme, a odkaz na zásady. Zvláštní nepředzaškrtnuté pole „Chci dostávat novinky pro obce e-mailem“ a vedle něj jednou větou, že přihlášení potvrdíte odkazem. Stavy: načítání (tlačítko neaktivní, text „Odesílám“), úspěch („Poptávku jsme přijali, potvrzení jsme poslali na [e-mail]. Ozveme se do [DOPLNIT: lhůta] pracovních dnů“), chyba pole (u pole a v souhrnu nahoře, fokus na souhrn), chyba sítě (zpráva se zachová, pod ní telefon a e-mail jako druhá cesta), 429 (srozumitelný text). Vedle formuláře vždy viditelný telefon, e-mail, adresa a úřední doba [DOPLNIT], protože stejně jako u obcí platí: web není jediná cesta.

**Ke stažení a nákup obcí.** Stránka „Jak obec nakupuje“ v otázkách a odpovědích, bez právního poradenství: kdy rozhoduje starosta, kdy rada, kdy zastupitelstvo (řídí se zákonem o obcích a vnitřní směrnicí obce, odkaz na vzor směrnice MV), co je veřejná zakázka malého rozsahu a proč roční cena služby bývá pod jejím limitem (limit viz overit, na webu jen s datem ověření), že obec bez rozšířené působnosti nemusí smlouvu uveřejňovat v registru smluv podle § 3 odst. 2 písm. k) zákona č. 340/2015 Sb. (ověř a datuj), proč se nákup hodí do rozpočtu na příští rok. Ke stažení: (1) vzorová cenová nabídka, (2) vzorová smlouva (A), (3) smlouva o zpracování (B), (4) vzor usnesení rady o uzavření smlouvy, (5) kontrolní seznam přechodu. Texty vezmi z `docs/pravni-dokumenty.md` a z návrhů, doplň `[DOPLNIT]` a v hlavičce PDF uveď „Vzor, před podpisem ke kontrole“. PDF generuj skriptem `pdf` (označené, s nadpisy, jazykem `cs`, názvem dokumentu a bez obrazových stran) a ověř jej nástrojem pro kontrolu přístupnosti PDF (veraPDF nebo ekvivalent). Vedle každého PDF zobraz velikost a tlačítko; stejný obsah nabídni i jako HTML stránku.

**Obchodní sdělení a newsletter.** E-maily obcím se posílají jen podle § 7 zákona č. 480/2004 Sb.: se souhlasem, nebo stávajícím zákazníkům k obdobným službám s možností snadno odmítnout. Studené e-maily na adresy obcí z veřejných seznamů tento prompt nestaví a web je nenabízí. Zda se § 7 vztahuje na úřední adresy obcí, je [OVĚŘIT u advokáta]. Newsletter: přihlášení formulářem, potvrzení odkazem v e-mailu, odhlášení jedním klikem (odkaz v těle a hlavička `List-Unsubscribe` s `List-Unsubscribe-Post: List-Unsubscribe=One-Click`, na straně `apps/web`), stránky `/potvrzeni-prihlaseni` a `/odhlaseni` bez dalších otázek. Adresy z formuláře poptávky se do newsletteru nepřidávají bez zaškrtnutí.

**Cookies a soukromí.** Web používá jen nezbytné prostředky a nic neukládá do zařízení, takže lišta není. Stránka `/cookies` to říká jednou větou a vypisuje, co se ukládá (nic), že při odeslání formuláře se údaje předají `apps/web` v EU, a že fonty, obrázky a skripty jsou vlastní. Při změně (měření, vložené video, mapa) se lišta přidá dřív než funkce. Žádné vložené YouTube, mapy ani sociální pluginy; odkazy ven se otevírají v téže záložce a označí se slovy.

**Zásady osobních údajů.** Převezmi D jako základ, nahraď `[WEB]` a `[E-MAIL]` jen skutečnými údaji, ostatní `[DOPLNIT]` nech. Přidej účel „poptávka“ (12 měsíců od posledního kontaktu) a „newsletter“ s právním základem podle D, bez zmínky měření, dokud není zapnuté. Ke kontrole advokátem: položky, které D označuje „ověřit“.

**Prohlášení o přístupnosti.** I když to pro firmu není povinné, je to argument. Podle vzoru DIA (příloha metodického pokynu): stav souladu, známé nedostatky, náhradní cesta (telefon, e-mail), datum přípravy a přezkumu, kontakt, postup při podezření na nesoulad. Stav „úplný soulad“ napiš jen tehdy, když kontroly v sekci testy projdou a ručně proběhl průchod klávesnicí a čtečkou (VoiceOver nebo NVDA); jinak „částečný soulad“ s vypsanými výjimkami. Datum plň z buildu.

**Značka a SVG.**
- Z PNG v `brand/` vyrob SVG: `znak` (monogram CK v rámečku se seříznutými rohy vlevo nahoře a vpravo dole), `nazev` (CodeKom) a `logo` (znak, název, heslo) v černé a bílé. Postup: prahování a vektorizace (potrace nebo autotrace), vyčištění (SVGO, jedna cesta na tvar, `viewBox`, bez rastrových vložek), rámeček znaku nakresli ručně jako cestu se stejnou tloušťkou čáry jako originál. Ověř návrat do rastru: SVG vykresli na velikost PNG a porovnej s originálem (podíl odlišných pixelů pod 1 % u znaku, pod 2 % u názvu). Uložit do `brand/svg/` a zkopíruj do `apps/prezentace/public/brand/`. Do `brand/README.md` doplň, co vzniklo, a přesuň větu o chybějícím SVG do hotového.
- Font: název vypadá jako geometrický bezpatkový font typu Montserrat. [OVĚŘIT u zakladatele] přesný font a řez. Do potvrzení se text na webu (nadpisy) sází Montserratem řezů 500 a 600 s vlastním souborem pod licencí OFL a název v logu zůstává vektorový z PNG, ne přepsaný fontem. Vedle toho zkus překrytí SVG a vykresleného Montserratu a výsledek zapiš do `docs/rozhodnuti.md`. Tělo textu Inter 400 a 500. Stejné řezy nikde nepřekračují 600.
- Favicon: `icon.svg` (bílý monogram na černém čtverci; pod 24 px jen písmena CK bez rámečku, v souladu s `brand/README.md`), `favicon.ico` 16/32/48, `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`, `manifest.ts`.
- OpenGraph: `opengraph-image.tsx` 1200 × 630, černé pozadí, bílé logo s heslem, vlastní písmo načtené ze souboru. Stránky `/ukazky/[klic]` mají vlastní obrázek se snímkem šablony. Každá stránka má `title` (do 60 znaků), `description` (do 155), `canonical`, `og:locale cs_CZ`.
- Pravidla loga z `brand/README.md`: jen černá a bílá, volné místo aspoň na šířku čáry rámečku, žádné natahování, stíny ani přechody, znak aspoň 24 px na výšku.
</funkce>

<pravidla>
**Tvrdá pravidla pro texty (kontroluje `scripts/kontrola-obsahu`, build selže):**
- Heslo je přesně `Tvoříme kódy pro lidi.` včetně tečky a nikde se neupravuje (žádné „Tvoříme kód pro lidi“, žádné velká písmena, žádné přidání vykřičníku). Je to značka, tečka u hesla je výjimka z pravidla o krátkých popiscích.
- Zakázáno: vykřičník, emoji, šipka „→“ v textu a odkazech, řetězce „A · B“, věty nadpisů psané samými velkými písmeny, přívlastky „revoluční“, „inovativní“, „nejlepší“, „snadno a rychle“, „komplexní řešení“, pokuty a sankce („pokuta“, „sankce“, „penále“), „zaručujeme dotaci“, „garantujeme“, procento úspory, počet obcí nebo uživatelů bez záznamu v registru tvrzení.
- Jména konkurence se na webu nevyskytují (Munipolis, Mobilní rozhlas, Vismo, WEBHOUSE, Galileo, Antee, Obce na webu a další). Rozlišení se děje tím, co CodeKom dělá a slibuje: jeden systém místo čtyř dodavatelů, data v EU a AI server v ČR, přístupnost ve výchozím stavu, nesmazatelná evidence úřední desky, cena viditelně a férové podmínky (výpověď kdykoli, export zdarma). Žádná srovnávací tabulka s cizími produkty.
- Každé číslo, zákon nebo termín na webu má řádek v `docs/tvrzeni-prezentace.md` (tvrzení, stránka, zdroj, datum ověření, stav). Neověřené věty se na produkci nezobrazí, nebo se zobrazí s datem a odkazem na zdroj, jak určuje sekce overit.
- Zbylé `[DOPLNIT: …]` a `[OVĚŘIT]` v zobrazených textech: v náhledu (preview) se zobrazí zvýrazněně, na produkci (`VERCEL_ENV=production`) `scripts/kontrola-doplnit` selže. Hotovo tedy neznamená prázdná místa, ale to, že jsou všechna vypsaná.
- Odkazy na zákony vedou na e-Sbírku nebo zákony pro lidi a mají datum ověření. Uváděné předpisy: zákon č. 99/2019 Sb. (přístupnost), vyhláška č. 515/2020 Sb. (povinně zveřejňované informace), zákon č. 106/1999 Sb., zákon č. 134/2016 Sb. (zadávání), zákon č. 340/2015 Sb. (registr smluv), zákon č. 480/2004 Sb. § 7 (obchodní sdělení), zákon č. 127/2005 Sb. § 89 odst. 3 (cookies), čl. 28 GDPR, čl. 50 AI Actu, zákon č. 264/2025 Sb.

**Pravidla unslop** (Damir Sokolovsky, CC BY 4.0, viz `CLAUDE.md`): řezy do 600, věty velkým písmenem a bez vykřičníku, krátké popisky bez tečky, žádné přechody, záře, stíny ani emoji, mřížka po 4 px, tenké linky. Navíc pro tento web:
- Značka je černobílá, takže rozhraní má jen černou, bílou a stupně šedi (text na bílé nejméně `#595959` pro 4,5 : 1). Jediný „akcent“ je podtržení odkazů a plná černá tlačítka. Barvy mají jen snímky šablon a vzorky palet.
- Místo kartiček ze SaaS šablon: seznamy s tenkými linkami, tabulky, dvousloupcové texty, velký řádkový text. Žádné ikonky v kolečku, žádné „tři karty vedle sebe s ikonou“, žádný hrdinský obrázek s přechodem, žádná fotografie z fotobanky.
- Obrazový materiál jsou skutečné snímky šablon, schémata kreslená v SVG v kódu a text.
- Tón: věcně, česky, oslovení „vy“, krátké věty, konkrétní podstatná jména („úřední deska“, ne „digitální transformace“). Piš tak, aby věta unesla kontrolu starosty, který se zeptá „kde to je napsané“.

**Jak obce nakupují (zohledni v textech i ve struktuře):** rozhoduje starosta, rada nebo zastupitelstvo podle výše částky a vnitřní směrnice; je potřeba písemná nabídka a návrh smlouvy; rozpočet se schvaluje na konci roku, proto stránka Ceník a Ke stažení nabízejí podklady k přeposlání radě a v textu je věta o tom, že změny cen lze oznámit nejméně 2 měsíce předem (A, čl. 3). Limit veřejné zakázky malého rozsahu u služeb je z paměti 2 000 000 Kč bez DPH podle § 27 zákona č. 134/2016 Sb. a je to NEOVĚŘENO (viz overit). Jakmile je ověřen, zapiš ho s datem a použij jen ve větě „roční cena služby bývá hluboko pod limitem“, ne jako právní radu.
</pravidla>

<design_a_pristupnost>
- Layout: sloupec textu 640 px (65–75 znaků na řádek), širší prvky (tabulky, galerie) do 1 120 px, boční okraje 16 px na 375 px. Mřížka 4 px. Text 17 px, řádkování 1,55; nadpis h1 40 px, h2 28 px, h3 20 px (Montserrat 600), na 375 px h1 32 px.
- Navigace: hlavička s logem vlevo, 6 odkazů a tlačítko „Napište nám“. Na menším než 768 px tlačítko Menu (`<details>` nebo `button` s `aria-expanded`), celá navigace dosažitelná bez JavaScriptu. Odkaz „Přeskočit na obsah“ první na stránce.
- Fokus: viditelný vždy, 3 px, kontrast 3 : 1 proti okolí (na bílém černý, na černém bílý), ne se ztrácí pod sticky hlavičkou (`scroll-margin-top`).
- Cíle dotyku nejméně 44 × 44 px včetně odkazů v patičce a tabulkách. Odkazy podtržené, rozlišitelné od textu i bez barvy.
- Kontrast textu aspoň 4,5 : 1 (velký text 3 : 1), prvky rozhraní 3 : 1.
- Pohyb: žádná animace nutná k porozumění; `prefers-reduced-motion` vypíná veškeré přechody (v základu jich je minimum).
- Formuláře: viditelné popisky nad poli (ne placeholder místo popisku), `autocomplete` (`name`, `organization`, `email`, `tel`), chyby u pole a v souhrnu s `role="alert"`, povinná pole označená slovy „povinné“. Chybové texty říkají, co opravit („Zadejte e-mail ve tvaru jmeno@obec.cz“).
- Tabulky: `<caption>`, `<th scope>`, na 375 px buď vodorovné posouvání v kontejneru s popiskem, nebo přeskládání do seznamu; stránka jako celek nikdy neposouvá vodorovně.
- Galerie: tlačítka palet jsou skupina s popiskem „Barevná varianta“; po přepnutí se oznámí změna (`aria-live`). Snímky mají `width`/`height` a `loading="lazy"` kromě prvního.
- Jazyk `lang="cs"`, `<title>` a `h1` unikátní, jedna `h1` na stránku, nadpisy bez přeskakování úrovní, `<main>`, `<nav aria-label>`, `<footer>`.
- Rychlost: na mobilu Lighthouse Performance, Accessibility, Best Practices a SEO každý 95 a víc; LCP do 2,5 s, CLS do 0,05, celkový JavaScript první stránky do 100 kB gzip. Obrázky `next/image` ve WebP/AVIF, písma s `font-display: swap` a předběžným načtením jen dvou řezů.
- SEO: klíčová slova, která mají vyjít v nadpisech a textech přirozeně: „web pro obec“, „elektronická úřední deska“, „mobilní rozhlas“, „aplikace pro obec“, „přístupnost webu obce“, „povinně zveřejňované informace“. Objemy hledání jsou NEOVĚŘENO (viz overit), proto nepiš texty podle odhadu. Strukturovaná data JSON-LD: `Organization` na úvodu (jen ověřené údaje: název, logo, URL, kontakt; IČO jako [DOPLNIT]) a `Product`/`Service` na stránce Ceník bez ceny, dokud není ověřená, bez `aggregateRating` a `review` (žádné recenze neexistují). `FAQPage` na stránkách s otázkami. `sitemap.xml`, `robots.txt` (na preview `noindex`), kanonické adresy, `hreflang` nepotřeba.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Správcem údajů z formuláře je CodeKom (D). Formulář sbírá minimum a každé pole má účel. Nepřijímej rodná čísla ani citlivé údaje; do textového pole uživatele upozorni, ať je nepíše.
- Žádné skripty třetích stran, žádný reCAPTCHA ani Turnstile (přenos do třetích zemí). Ochrana proti spamu: honeypot, minimální čas vyplnění, rate limit na serveru a zod validace na serveru i v klientu.
- Odpověď serveru nesmí prozradit, zda e-mail už v databázi je. Vždy stejná odpověď.
- V klientu jen veřejné proměnné `NEXT_PUBLIC_*`. Tajné klíče a e-mailovou službu drží `apps/web`. Do repozitáře žádné klíče, `.env` v `.gitignore`.
- Odkazy ven mají `rel="noopener noreferrer"`. Content Security Policy bez `unsafe-eval`, bez `unsafe-inline` skriptů (nonce nebo hash podle Next 16, ověř v dokumentaci).
- Soubory ke stažení bez metadat o autorovi (vyčisti nástrojem PDF).
- Seznam podzpracovatelů na webu je shodný s přílohou B2. Pokud se liší, platí příloha B2 a rozdíl zapiš do závěru.
</bezpecnost_a_soukromi>

<testy>
Nástroje: Vitest (data, kontrola obsahu, kalkulačka), Playwright (viewporty 375 a 1280), `@axe-core/playwright`, Lighthouse CI (`@lhci/cli`), kontrola odkazů (vlastní skript nad `out`/`.next` nebo `lychee`).

1. **Playwright, klíčové cesty** (na 375 i 1280):
   - Poptávka: vyplnit, odeslat proti mock serveru (`page.route`), vidět potvrzení; chybná pole, nepředzaškrtnuté newsletterové pole, honeypot vyplněný = odmítnuto, výpadek sítě = zpráva zachována a viditelný telefon.
   - Ceník: změna velikosti obce a úrovně přepočítá výsledek a `aria-live` ho ohlásí; hypotetická cena se v produkčním režimu nezobrazí; podmínky z A jsou na stránce.
   - Ukázky: otevře se detail šablony, přepnutí palet změní snímek, alt text a stav `aria-pressed`; odkaz na demo se zobrazí jen s `NEXT_PUBLIC_DEMO_URL`.
   - Ke stažení: všech 5 PDF vrací 200 a `application/pdf`; navigace jen klávesnicí projde hlavičkou, formulářem a patičkou.
2. **axe:** všechny stránky ze sitemapy, tagy WCAG 2.0/2.1/2.2 A a AA a best-practice, nula chyb, plus ruční kontrola kontrastu výstupu galerie mimo snímky.
3. **Lighthouse CI:** `lighthouserc.json`, mobilní profil, 3 běhy, prahy 0,95 pro čtyři kategorie, LCP a CLS prahy podle sekce design. Spouští se na úvodu, Ceníku, Ukázkách, detailu šablony, Kontaktu.
4. **Odkazy:** všechny interní odkazy a kotvy vrací 200; externí odkazy na zákony a výzvy se kontrolují zvlášť a selhání je varování s výpisem, ne zastavení buildu (cizí servery).
5. **Obsah:** `scripts/kontrola-obsahu` (seznam zakázaných slov a znaků, přesná podoba hesla, jména konkurence, `%` bez záznamu v registru, každý řádek `overeno` v datech má zdroj a datum), `scripts/kontrola-doplnit`. Vitest testy tohoto skriptu s kladnými i zápornými příklady.
6. **Logo:** test porovnání SVG s PNG (podíl odlišných pixelů), test, že favicon soubory existují a mají správné rozměry.
7. **Příkazy z `CLAUDE.md`** (`pnpm typecheck`, `lint`, `test`, `e2e`, `a11y`) plus `pnpm lighthouse`, `pnpm odkazy`, `pnpm obsah`, spustitelné z `apps/prezentace` i přes Turborepo.
</testy>

<postup>
Na začátku napiš plán a seznam úkolů (`docs/progress-prezentace.md`), průběžně odškrtávej. Každý milník končí spuštěním kontrol a commitem česky v rozkazovacím způsobu.

1. **Základ.** Aplikace v monorepu, Tailwind 4, tokeny (černobílé), písma, hlavička, patička, layout, `vercel.json` (fra1), hlavičky zabezpečení, prázdné stránky z mapy. Kontroly: typecheck, lint, build.
2. **Značka.** SVG verze loga, favicon sada, OpenGraph, porovnání s PNG, `brand/README.md`. Kontroly: test loga.
3. **Obsah a data.** Typy a zod schémata, MDX stránky, `moduly`, `faq`, registr tvrzení, `kontrola-obsahu` a `kontrola-doplnit`. Kontroly: Vitest.
4. **Ukázky.** Skript `sablony-z-navrhu`, snímky z prototypů, galerie, detail s paletami, odkazy na demo. Kontroly: Playwright, axe.
5. **Ceník a ke stažení.** Datový soubor, tabulka, kalkulačka, PDF (nabídka, A, B, usnesení, seznam), stránka nákupu. Kontroly: Playwright, kontrola PDF.
6. **Poptávka a newsletter.** Formulář, klient, endpoint v `apps/web` (jen pokud chybí, s migrací a testem), potvrzení přihlášení, odhlášení. Kontroly: Playwright, Vitest v `apps/web`.
7. **Právo, bezpečnost, dotace, přístupnost.** Právní stránky z D, prohlášení o přístupnosti, přehled dotací z ověřených zdrojů, sekce bezpečnost. Kontroly: axe, kontrola obsahu.
8. **SEO a rychlost.** Metadata, JSON-LD, sitemap, robots, Lighthouse CI, doladění. Kontroly: `pnpm lighthouse`.
9. **Nasazení.** Náhledové nasazení na Vercel (fra1) a odkaz v závěru; produkční doménu nenasazuj, dokud zakladatel nedoplní domény. Kontroly: všechny.

Nesnaž se obejít kontrolu úpravou prahů nebo vynecháním stránky. Když Lighthouse nebo axe selže, oprav příčinu, nebo napiš, proč nejde.
</postup>

<hotovo_kdyz>
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v `apps/prezentace` projdou.
- [ ] `pnpm lighthouse`: mobil, všech pět stránek, Performance, Accessibility, Best Practices a SEO každé 95 a víc.
- [ ] `pnpm obsah` a `pnpm odkazy` projdou. `pnpm kontrola:doplnit` na produkčním buildu vypíše všechna zbylá `[DOPLNIT]` a končí chybou, v náhledu jen varováním.
- [ ] Mapa webu odpovídá sekci funkce, všech 20 šablon má 3 palety a snímky, přepínač funguje klávesnicí.
- [ ] `vercel.json` obsahuje `fra1`, hlavičky zabezpečení jsou nastavené, na webu nejsou požadavky na cizí domény (ověř v síťovém panelu Playwrightu: jen vlastní původ a `NEXT_PUBLIC_API_URL`).
- [ ] Heslo „Tvoříme kódy pro lidi.“ je na webu přesně, zbytek textů neobsahuje zakázané výrazy, jména konkurence ani procenta bez zdroje.
- [ ] SVG znak, název a logo existují v černé i bílé, shoda s PNG je doložená číslem, favicon sada a OpenGraph obrázky jsou vygenerované.
- [ ] Formulář uloží poptávku v `apps/web` a pošle potvrzení; nepředzaškrtnuté pole newsletteru; potvrzení přihlášení a odhlášení jedním klikem fungují.
- [ ] Ceník ukazuje podmínky z A doslova; hypotetické ceny se na produkci nezobrazují.
- [ ] Prohlášení o přístupnosti a zásady osobních údajů existují a odpovídají stavu webu.
- [ ] `docs/tvrzeni-prezentace.md` obsahuje každé číslo, předpis a termín z webu, `docs/rozhodnuti.md` obsahuje volbu MDX, změnu řádku měření v D a výsledek porovnání fontu.
- [ ] Nic z tohoto promptu nebylo nasazeno na produkční doménu.
</hotovo_kdyz>

<overit>
Co rešerše neověřila (NEOVĚŘENO). Ověř, nebo nech v kódu označené `[OVĚŘIT]` a v produkčním buildu nezobrazuj.

| Položka | Jak ověřit |
|---|---|
| Limit veřejné zakázky malého rozsahu u služeb (z paměti 2 000 000 Kč bez DPH podle § 27 zákona č. 134/2016 Sb.) a případná novela 2025–2026 | e-Sbírka (`e-sbirka.gov.cz`), `portal-vz.cz`, vzorová směrnice MV: `mvcr.cz/soubor/vnitrni-smernice-pro-zadavani-verejnych-zakazek-maleho-rozsahu-priklad-smernice-obce.aspx` |
| Výjimka obce z uveřejnění v registru smluv (§ 3 odst. 2 písm. k) zák. 340/2015 Sb.) | e-Sbírka, datum v registru tvrzení |
| Dotační výzvy 2026–2027 (NPO, IROP, Plzeňský kraj) | MMR factsheet `mmr.cz/getmedia/88941948-d5d9-4561-8646-9696559f9960/Factsheet-eGov.pdf.aspx`, `plzensky-kraj.cz/Framework/Document.ashx?ID=357856` a `ID=322073`, `mv.gov.cz/npo/clanek/jak-na-obecni-web.aspx` (dříve se nenačetla); zapiš jen přečtené |
| Ceny a funkce konkurence | na web nepatří; pokud je potřeba pro interní vyjednávání, ručně z veřejných smluv v registru smluv, do `docs/` s datem, ne do `apps/prezentace` |
| Objemy klíčových slov | Marketing Miner nebo Sklik; do doby ověření žádné rozhodnutí o textech podle odhadu |
| Font logo | potvrdit u zakladatele; porovnání s Montserratem (překrytí) |
| Zda § 7 zák. 480/2004 Sb. dopadá na úřední adresy obcí; zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zák. 127/2005 Sb. | advokát; do té doby bez studených e-mailů a bez měření |
| Doba přizpůsobení šablony (návrh uvádí 5 pracovních dnů), lhůta odpovědi na poptávku, doba migrace | zakladatel |
| Podzpracovatelé označení „ověřit“ v příloze B2 (Vercel region a mechanismus předání, push služby, e-mailová služba) | smlouvy a dokumentace dodavatelů; pokud neověříš, nech `[OVĚŘIT]` |
| Verze balíčků | `npm view <balíček> version` před instalací, patch verze zvedni, major neměň |
| Doporučení Content-Security-Policy pro Next 16 | dokumentace Next.js (nonce, hash) |

Doplnit musí zakladatel: domény (prezentace, demo Javoří Lhota, záložní doména obcí), IČO, sídlo, e-mail, telefon, úřední doba, jména a fotografie v O nás, e-mailová služba, pilotní obce, ceny a rozdíl mezi roční a měsíční platbou, způsob nabídky pomoci s dotacemi.
</overit>

<zaver>
Na konci napiš krátké shrnutí v tomto pořadí:
1. Co je hotové a čím je to ověřené: přesné příkazy a jejich výsledky, skóre Lighthouse čtyř kategorií, počet stránek v axe, podíl odlišných pixelů SVG proti PNG.
2. Co zbývá: milníky nebo položky, které nedošly do konce, a proč.
3. Místa `[DOPLNIT]` a `[OVĚŘIT]`: soubor a řádek, celkový počet.
4. Rozpory v podkladech, které potřebují rozhodnutí zakladatele: 24měsíční smlouva a pilot zdarma proti smlouvě na dobu neurčitou, řádek měření v D, rozdíl v přílohách B2.
5. Odkaz na náhledové nasazení.
Nepiš, že je něco hotové, co kontroly neprošly. Nic neodesílej do veřejnosti a nenasazuj na produkční doménu.
</zaver>

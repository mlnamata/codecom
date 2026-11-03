# Prompt: Prezentační web CodeKom

Vlož celý do Claude Code v kořeni repozitáře `/home/claude/codecom`.
Závisí na: `apps/web` (endpoint `POST /api/poptavky`, tj. webový prompt; bez něj postav jen minimální verzi podle sekce architektura), `packages/tokeny` (nepovinně), `design/prototypy` a `design/generator/palettes.py` (podklady galerie), `brand/` (logo), `docs/pravni-dokumenty.md` (D).

<kontext>
CodeKom prodává obcím web s úřední deskou, aplikaci pro občany, digitální úřad, správu budov a AI asistenta. Prezentační web (`apps/prezentace`) je to, co uvidí starosta, účetní nebo správce webu, když ho někdo doporučí nebo když si CodeKom vyhledá. Musí během pár minut odpovědět na otázky, které si starosta klade: kolik to stojí, co řekne kontrola a jak se z toho dostanu, když to nebude fungovat.

Čtenáři: starosta malé obce (často neuvolněný, čte po večerech na telefonu, bojí se špatného rozhodnutí), účetní nebo administrativní pracovnice, která web spravuje a podklady přeposílá radě, a správce webu nebo externí dodavatel, který chce vidět šablony a technické záruky.

Obec nenakupuje jako firma. Rozhoduje rada nebo zastupitelstvo, potřebuje písemnou nabídku, vzorovou smlouvu a podklad pro usnesení, a nákup se řeší hlavně při schvalování rozpočtu na podzim a v prosinci. Web je proto sada podkladů, které starosta přepošle radě, ne jen leták.

Přečti si před začátkem:
- `CLAUDE.md` (stack, design, pravidla domény, kontrola hotovo; neopisuj ho), `brand/README.md` a soubory v `brand/`,
- `docs/rozhodnuti.md`, `docs/navrh-platformy/01`, `03`, `04`, `docs/pravni-dokumenty.md` (A, B, D),
- `research/poznamky/web_obce_a_prodej.md` a `research/zprava-podklady-pro-prompty.md`, sekce 6.
</kontext>

<cil>
Na konci běží `apps/prezentace` jako staticky generovaný český web na Vercelu v regionu `fra1` s mapou stránek z této specifikace. Návštěvník si prohlédne 20 šablon na ukázkové obci Javoří Lhota s přepínačem palet, spočítá orientační cenu, stáhne vzorovou nabídku, smlouvu a podklad pro radu a odešle poptávku, která se uloží v `apps/web` a potvrdí e-mailem. Web nepoužívá cookies ani třetí strany, splňuje WCAG 2.2 AA a na mobilu má Lighthouse 95 a víc. Každé tvrzení má záznam o zdroji nebo je označené k ověření a nic neslibuje víc, než potvrdil produkt nebo rešerše.
</cil>

<vychozi_stav>
- `apps/prezentace` zatím neexistuje. Založí se v monorepu (pnpm + Turborepo) podle `CLAUDE.md`. Zkontroluj, zda kořenové `pnpm-workspace.yaml` a `turbo.json` existují. Pokud ne, založ je jen v minimu potřebném pro tuto aplikaci a zapiš to do `docs/rozhodnuti.md`.
- `brand/` obsahuje jen PNG. SVG verze a favicon chybí a vyrobíš je ty.
- `design/prototypy/*.dc.html` jsou prototypy 20 šablon, `design/generator/palettes.py` má 3 palety po 12 tokenech pro každou. `design/nastroje/variants.js` ukazuje, jak prototypy vykreslit v Playwrightu (`minidc.js`, `fonts.js`) a přepnout barevnou variantu. Použij to pro snímky galerie.
- `apps/web` má kolekce a testy, ale endpoint `POST /api/poptavky` zatím nemusí mít. Nejdřív ho dohledej.
- Ceny v `docs/navrh-platformy/01` a `04` jsou hypotézy. Texty v `docs/pravni-dokumenty.md` D jsou návrh ke kontrole advokátem a obsahují `[HRANATÉ ZÁVORKY]`.
</vychozi_stav>

<rozsah>
Postav: aplikaci `apps/prezentace` (Next.js 16, App Router, Tailwind 4, TypeScript strict) se stránkami z mapy webu a právními stránkami; SVG verze loga, favicon sadu a OpenGraph obrázky; galerii 20 šablon se snímky z prototypů a přepínačem palet; orientační kalkulačku ceníku; poptávkový formulář a newsletter s potvrzením přihlášení napojené na `apps/web`; ke stažení vzorovou nabídku, smlouvu A, smlouvu B a vzor usnesení rady jako přístupná PDF; kontroly (Playwright, axe, Lighthouse CI, odkazy, obsah); registr tvrzení `docs/tvrzeni-prezentace.md`.

Mimo rozsah: vlastní CMS pro prezentaci; skutečné reference, počty obcí, citace starostů a ceny konkurence (nevymýšlej); chatbot na webu (platil by čl. 50 AI Actu); odesílání newsletterových kampaní; úpravy `apps/web` mimo endpoint poptávek (a jen když chybí); blog, tmavý režim, jiné jazyky než čeština.
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
  src/app/         stránky, sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  src/obsah/       MDX stránek a FAQ
  src/data/        cenik, dotace, sablony (generovaný), moduly, faq
  src/komponenty/  Hlavicka, Paticka, Galerie, KalkulackaCeniku, PoptavkovyFormular, Tabulka
  src/lib/         poptavka.ts (klient, zod), seo.ts
  public/          brand/, sablony/ (<klic>-<paleta>.webp), ke-stazeni/
  scripts/         sablony-z-navrhu, snimky-sablon, logo-svg, pdf, kontrola-obsahu, kontrola-doplnit
  tests/           Playwright, axe, odkazy
```
**Nasazení.** Vercel, `vercel.json` s `"regions": ["fra1"]`. Stránky se generují staticky (`generateStaticParams`, bez `dynamic = "force-dynamic"`). Dynamické jsou jen klientské prvky formuláře. Žádná proměnná prostředí s tajnou hodnotou v klientu. Hlavičky v `next.config.ts`: `Content-Security-Policy` (jen vlastní původ a API `apps/web`, žádné skripty třetích stran), `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` bez kamery, mikrofonu a polohy. Písma self-hosted přes `next/font/local`, nikdy z Google Fonts (přenos IP návštěvníka do USA bez souhlasu).

**Proměnné** (`.env.example` s popisem): `NEXT_PUBLIC_API_URL` (základ `apps/web`), `NEXT_PUBLIC_SITE_URL` [DOPLNIT: doména CodeKom], `NEXT_PUBLIC_DEMO_URL` (základ dema Javoří Lhota; prázdné = žádné odkazy na demo, zůstanou snímky), `CENIK_ZVEREJNIT` (výchozí `false`).

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
Server (`apps/web`) poptávku uloží do kolekce `poptavky` (jen superadmin, bez tenanta), pošle potvrzení na zadaný e-mail a upozornění zakladateli; u newsletteru pošle potvrzovací odkaz `GET /api/poptavky/potvrdit?token=…`, do potvrzení se adresa nepoužije. Rate limit, CORS jen pro původ prezentace. Pokud endpoint v `apps/web` chybí, postav jen toto: kolekci (pole výše, `stav`, `potvrzenoV`, `odhlasenoV`), endpoint, novou migraci a test. E-mail skryj za rozhraní `posliEmail()` (ve vývoji do konzole); služba [DOPLNIT: e-mailová služba v EU].

**Měření návštěvnosti.** Ve výchozím stavu žádné. Tabulka v D uvádí měření na základě souhlasu; tento prompt volí přísněji (žádné měření, nebo měření bez cookies a bez zápisu do zařízení), proto uprav řádek v D a zapiš to do rozhodnutí. Chce-li zakladatel měření, doporuč nástroj běžící na serveru v EU (kandidáti Plausible, Umami self-hosted; ověř provozovatele, umístění dat a zda nic nezapisuje do zařízení) a zapni ho proměnnou. Zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zákona č. 127/2005 Sb., je NEOVĚŘENO, proto zůstane vypnuté, dokud to advokát nepotvrdí.
</architektura>

<datovy_model>
Jen typované datové soubory v `src/data/` (zod validace při buildu; build selže, pokud položka `stav: "overeno"` nemá `zdroj` a `overenoDne`). Položky s číslem nebo právním tvrzením mají `stav: "overeno" | "hypoteza" | "neovereno"`, `zdroj` (URL nebo soubor v repu), `overenoDne` (ISO).

- `Modul { klic: web|aplikace|urad|budovy|ai, nazev, jednaVeta, body[], stav }`
- `Sablona { klic, poradi, nazev, proKoho, popis, palety[3] { nazev, tokeny[12], snimek1280, snimek640 } }`. Klíče v pořadí: naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad. Soubor generuje `scripts/sablony-z-navrhu` z `palettes.py` a z tabulky v `03-sablony-webu.md`, ručně se needituje.
- `Cenik { urovne[zaklad|pokrocily|advance] × ceny[do500|500-2000|2000-10000], moduly[urad|budovy], zalozeni, platba }`, kde `Cena = { kcBezDph | null, stav, zdroj, overenoDne }`. Hodnoty z hypotéz v `04-admin-editor.md` vlož se `stav: "hypoteza"`. Rozdíl mezi roční a měsíční platbou [DOPLNIT].
- `Dotace { nazev, poskytovatel, url, prijemZadosti | null, stav: otevrena|planovana|uzavrena|neovereno, overenoDne, poznamka }`
- `Faq { otazka, odpoved (MDX), skupina: nakup|pravo|provoz|prechod }`
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

**Úvod.** První obrazovka říká, pro koho web je a co obec získá, ne slogan. Heslo „Tvoříme kódy pro lidi.“ patří do patičky, na O nás a do OpenGraph obrázků, ne do hlavního nadpisu. Dál tři věty (čas, právní jistota, podmínky), řádek s pěti moduly, dvě ukázky šablon a cena „od [DOPLNIT] Kč měsíčně bez DPH“, až bude `overeno`.

**Co umíme.** U každého modulu: komu pomáhá, 3 až 5 konkrétních věcí, odkaz na demo, co nedělá. Jen to, co říkají `docs/navrh-platformy` a `CLAUDE.md`:
- web a úřední deska: povinně zveřejňované informace ve struktuře vyhlášky č. 515/2020 Sb., evidence vyvěšení a sejmutí, přístupnost,
- aplikace: oznámení a krizová hlášení (vždy jedno, nejzávažnější; nenahrazuje varovný systém IZS), účet bez hesla,
- digitální úřad: formuláře, hlášení závad, rezervace, poplatky; peníze jdou přímo na účet obce,
- budovy: topení a zámky s nouzovým mechanickým otevřením, ochrana proti mrazu funguje i bez internetu; úspora energie jen jako cíl měření, bez procenta, dokud nejsou vlastní naměřená data,
- AI asistent: řekne, že je AI, odpovídá z dokumentů obce a cituje je, dotazy neukládá ke jménu, běží v ČR.

**Ukázky.** Mřížka 20 šablon (1 sloupec na 375 px, 2 na tabletu, 3 až 4 na desktopu): snímek, název, „pro koho“ jednou větou. Detail `/ukazky/[klic]`: velký snímek, přepínač 3 palet (tlačítka s `aria-pressed`, názvy slovy, seznam 12 tokenů s kontrastem), odkaz „Otevřít živé demo“ jen pokud je vyplněné `NEXT_PUBLIC_DEMO_URL`. Snímky vyrob skriptem `snimky-sablon` z prototypů (1280 × 900 a 375 × 800, WebP, do 120 kB). Alt text popisuje obsah („Úvodní stránka šablony Lípa pro obec Javoří Lhota, paleta Lipová“). Barevné akcenty paletových variant jsou povolené jen uvnitř snímků a vzorků.

**Ceník.** Dvě osy: velikost obce (do 500, 500–2 000, 2 000–10 000 obyvatel) a úroveň webu, plus moduly Digitální úřad a Chytré budovy (za budovu). Tabulka a pod ní kalkulačka (velikost, úroveň, moduly, počet budov, způsob platby) s výsledkem v `aria-live="polite"`. Platba: roční licence fakturou (splatnost 30 dní, doklad do datové schránky), nebo měsíčně kartou (A, čl. 3). Pod tabulkou podmínky z A bez zkrášlení: výpověď kdykoli bez udání důvodu, výpovědní doba 3 měsíce u roční a 1 měsíc u měsíční platby, 30 dní zkušební doba s vrácením celé ceny, vrácení nevyčerpaných měsíců u roční licence, úřední deska běží i při neplacení, export dat zdarma, po skončení 30 dní jen pro čtení, cena roste nejvýš o inflaci a jednou ročně. Při `CENIK_ZVEREJNIT=false` nebo ceně `hypoteza` ukáže produkce místo čísla „Cenu pošleme s nabídkou“ a náhled číslo se štítkem „hypotéza“.

Rozpor v podkladech: návrh 04 uvádí založení webu zdarma při smlouvě na 24 měsíců a návrh 01 pilot na 6 měsíců zdarma. Smlouva A je na dobu neurčitou s výpovědí kdykoli a 30denní zkušební dobou, proto tyto nabídky na web nedávej a rozpor uveď v závěru.

**Přechod na CodeKom.** Kroky: výběr šablony a přizpůsobení znaku a fotkám (návrh uvádí do 5 pracovních dnů, jen jako [OVĚŘIT]), převod obsahu ze starého webu, převod úřední desky tak, aby evidence vyvěšení nezanikla, přesměrování starých adres, školení podle úrovně editoru, podpora (lhůty z A, čl. 5), co obec dodá (znak, kontakty, přístup k doméně). Kontrolní seznam ke stažení. Čas migrace neslibuj, dokud ho zakladatel nepotvrdí.

**Bezpečnost a právo.** Sekce s kotvami: data v EU (databáze Supabase ve Frankfurtu, web na Vercelu ve Frankfurtu, AI server v ČR; podzpracovatelé z přílohy B2 včetně položek [ověřit]; předání mimo EU jen na standardní smluvní doložky), smlouva o zpracování podle čl. 28 GDPR ke stažení, přístupnost (zákon č. 99/2019 Sb., stavíme podle WCAG 2.2 AA), úřední deska (vyvěšené dokumenty nejdou smazat, změny jsou verze), AI Act čl. 50 (asistent se představí jako AI), kybernetická bezpečnost (zákon č. 264/2025 Sb.: slib jen součinnosti podle A; zda je obec regulovaná, ověří kalkulačkou NÚKIB). Nepiš o pokutách, text zákona č. 99/2019 Sb. je nezmiňuje. Nepiš „certifikováno“ ani „bezpečné“, piš, co děláme.

**Dotace.** Stránka je přehled, ne slib. Úvodní odstavec říká, že dotace nezaručujeme a že pomůžeme s podklady k žádosti (cena služby [DOPLNIT]). Tabulka z `dotace.ts` zobrazuje jen položky se `stavem` a `overenoDne`, nahoře datum posledního ověření celé tabulky. Agent ověří výzvy 2026–2027 z dokumentů uvedených v sekci overit (MMR, MV, Plzeňský kraj, IROP) a zapíše jen to, co skutečně přečetl. Co nedokáže ověřit, nezobrazí; stránka pak říká „Aktuální výzvy sledujeme a pošleme je na vyžádání“ a nabízí formulář.

**Pro koho.** Tři oddíly: malá obec (do 500 a do 2 000 obyvatel), mikroregion nebo MAS (společná správa více obcí; stav označ podle návrhu 01, tedy jako plánovaný, pokud ještě není), organizace obce (škola, knihovna, sportoviště jako podweb).

**O nás.** Kdo jsme ([DOPLNIT: jména, fotografie, životopis, IČO, sídlo]), jak pracujeme, heslo. Žádné vymyšlené reference, počty obcí ani citace. Do spuštění pilotu je Reference jen věta „První obce připravujeme [DOPLNIT: pilotní obce]“, na produkci skrytá.

**Kontakt a poptávka.** Formulář: jméno, funkce, obec, počet obyvatel (výběr), e-mail, telefon (nepovinný), zájem o moduly (nepředzaškrtnutá pole), zpráva. Pod ním jedna věta o účelu údajů a odkaz na zásady, a zvláštní nepředzaškrtnuté pole „Chci dostávat novinky pro obce e-mailem“ s větou, že přihlášení potvrdíte odkazem. Stavy: odesílání (tlačítko neaktivní, „Odesílám“), úspěch („Poptávku jsme přijali, potvrzení jsme poslali na [e-mail]. Ozveme se do [DOPLNIT: lhůta] pracovních dnů“), chyba pole (u pole i v souhrnu, fokus na souhrn), chyba sítě (text zůstane, pod ním telefon a e-mail), 429 (srozumitelná věta). Vedle formuláře vždy telefon, e-mail, adresa a úřední doba [DOPLNIT]: stejně jako u obcí platí, že web není jediná cesta.

**Ke stažení a nákup obcí.** Stránka „Jak obec nakupuje“ v otázkách a odpovědích, bez právního poradenství: kdo rozhoduje (starosta, rada, zastupitelstvo podle zákona o obcích a vnitřní směrnice, odkaz na vzor směrnice MV), co je veřejná zakázka malého rozsahu a že roční cena služby bývá pod jejím limitem (jen s datem ověření), že obec bez rozšířené působnosti nemusí smlouvu uveřejňovat v registru smluv (§ 3 odst. 2 písm. k) zákona č. 340/2015 Sb., ověř a datuj), proč nákup zapadá do rozpočtu na příští rok. Ke stažení: vzorová cenová nabídka, smlouva A, smlouva o zpracování B, vzor usnesení rady, kontrolní seznam přechodu. Texty z `docs/pravni-dokumenty.md`, s `[DOPLNIT]` a v hlavičce „Vzor, před podpisem ke kontrole“. PDF generuje skript `pdf` (označené, nadpisy, jazyk `cs`, název dokumentu) a ověř je veraPDF nebo ekvivalentem. U PDF velikost, tlačítko a stejný obsah jako HTML.

**Obchodní sdělení a newsletter.** E-maily obcím jen podle § 7 zákona č. 480/2004 Sb.: se souhlasem, nebo stávajícím zákazníkům k obdobným službám s možností snadno odmítnout. Studené e-maily na adresy obcí z veřejných seznamů tento prompt nestaví. Zda se § 7 vztahuje na úřední adresy obcí, je [OVĚŘIT u advokáta]. Newsletter: přihlášení formulářem, potvrzení odkazem v e-mailu, odhlášení jedním klikem (odkaz v těle a hlavičky `List-Unsubscribe` a `List-Unsubscribe-Post: List-Unsubscribe=One-Click` na straně `apps/web`), stránky `/potvrzeni-prihlaseni` a `/odhlaseni` bez dalších otázek. Adresy z poptávky se do newsletteru nepřidávají bez zaškrtnutí.

**Cookies a soukromí.** Web nic neukládá do zařízení, takže lišta není. `/cookies` to říká jednou větou, vypisuje, co se ukládá (nic), a že data z formuláře jdou do `apps/web` v EU. Žádné vložené YouTube, mapy ani sociální pluginy. Přibude-li měření, video nebo mapa, lišta se přidá dřív než funkce.

**Zásady osobních údajů.** Základ je D; `[WEB]` a `[E-MAIL]` nahraď jen skutečnými údaji, ostatní `[DOPLNIT]` nech. Přidej účely „poptávka“ (12 měsíců od posledního kontaktu) a „newsletter“, měření vynech, dokud není zapnuté. Položky, které D označuje „ověřit“, nech označené.

**Prohlášení o přístupnosti.** Pro firmu není povinné, ale je to argument. Podle vzoru DIA: stav souladu, nedostatky, náhradní cesta, datum přípravy a přezkumu, kontakt, postup při podezření na nesoulad. „Úplný soulad“ napiš jen po průchodu testů a ručním průchodu klávesnicí a čtečkou (VoiceOver nebo NVDA); jinak „částečný soulad“ s výčtem výjimek.

**Značka a SVG.**
- Z PNG v `brand/` vyrob SVG: `znak` (monogram CK v rámečku se seříznutými rohy vlevo nahoře a vpravo dole), `nazev` (CodeKom) a `logo` (znak, název, heslo) v černé a bílé. Postup: prahování a vektorizace (potrace nebo autotrace), vyčištění (SVGO, jedna cesta na tvar, `viewBox`, bez rastrových vložek), rámeček znaku nakresli ručně jako cestu se stejnou tloušťkou čáry jako originál. Ověř návrat do rastru: SVG vykresli na velikost PNG a porovnej s originálem (podíl odlišných pixelů pod 1 % u znaku, pod 2 % u názvu). Uložit do `brand/svg/` a zkopíruj do `apps/prezentace/public/brand/`. Do `brand/README.md` doplň, co vzniklo, a přesuň větu o chybějícím SVG do hotového.
- Font: název vypadá jako geometrický bezpatkový font typu Montserrat, přesný font a řez [OVĚŘIT u zakladatele]. Do potvrzení se nadpisy sází Montserratem 500 a 600 (soubor pod licencí OFL), tělo Inter 400 a 500, nikde těžší než 600. Název v logu zůstává vektorový z PNG. Zkus překrytí SVG a vykresleného Montserratu a výsledek zapiš do `docs/rozhodnuti.md`.
- Favicon: `icon.svg` (bílý monogram na černém čtverci; pod 24 px jen písmena CK bez rámečku, v souladu s `brand/README.md`), `favicon.ico` 16/32/48, `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`, `manifest.ts`.
- OpenGraph: `opengraph-image.tsx` 1200 × 630, černé pozadí, bílé logo s heslem, vlastní písmo ze souboru; `/ukazky/[klic]` má obrázek se snímkem šablony. Každá stránka má `title` (do 60 znaků), `description` (do 155), `canonical`, `og:locale cs_CZ`.
- Pravidla loga z `brand/README.md`: jen černá a bílá, volné místo aspoň na šířku čáry rámečku, žádné natahování, stíny ani přechody, znak aspoň 24 px na výšku.
</funkce>

<pravidla>
**Tvrdá pravidla pro texty (kontroluje `scripts/kontrola-obsahu`, build selže):**
- Heslo je přesně `Tvoříme kódy pro lidi.` včetně tečky a nikde se neupravuje (žádné „Tvoříme kód pro lidi“, žádné psaní velkými písmeny, žádné přidání vykřičníku). Je to značka, tečka u hesla je výjimka z pravidla o krátkých popiscích.
- Zakázáno: vykřičník, emoji, šipka „→“ v textu a odkazech, řetězce „A · B“, věty nadpisů psané samými velkými písmeny, přívlastky „revoluční“, „inovativní“, „nejlepší“, „snadno a rychle“, „komplexní řešení“, pokuty a sankce („pokuta“, „sankce“, „penále“), „zaručujeme dotaci“, „garantujeme“, procento úspory, počet obcí nebo uživatelů bez záznamu v registru tvrzení.
- Jména konkurence se na webu nevyskytují (Munipolis, Mobilní rozhlas, Vismo, WEBHOUSE, Galileo, Antee, Obce na webu a další). Rozlišení se děje tím, co CodeKom dělá a slibuje: jeden systém místo čtyř dodavatelů, data v EU a AI server v ČR, přístupnost ve výchozím stavu, nesmazatelná evidence úřední desky, cena viditelně a férové podmínky (výpověď kdykoli, export zdarma). Žádná srovnávací tabulka s cizími produkty.
- Každé číslo, zákon nebo termín na webu má řádek v `docs/tvrzeni-prezentace.md` (tvrzení, stránka, zdroj, datum ověření, stav). Neověřené věty se na produkci nezobrazí, nebo se zobrazí s datem a odkazem na zdroj, jak určuje sekce overit.
- Zbylé `[DOPLNIT: …]` a `[OVĚŘIT]` v zobrazených textech: v náhledu (preview) se zobrazí zvýrazněně, na produkci (`VERCEL_ENV=production`) `scripts/kontrola-doplnit` selže. Hotovo tedy neznamená prázdná místa, ale to, že jsou všechna vypsaná.
- Odkazy na předpisy vedou na e-Sbírku a mají datum ověření (zákony č. 99/2019, 106/1999, 134/2016, 340/2015, 480/2004 § 7, 127/2005 § 89 odst. 3, 264/2025 Sb., vyhláška č. 515/2020 Sb., čl. 28 GDPR, čl. 50 AI Actu).

**Pravidla unslop** (Damir Sokolovsky, CC BY 4.0, viz `CLAUDE.md`): řezy do 600, věty velkým písmenem a bez vykřičníku, krátké popisky bez tečky, žádné přechody, záře, stíny ani emoji, mřížka po 4 px, tenké linky. Navíc pro tento web:
- Značka je černobílá, takže rozhraní má jen černou, bílou a stupně šedi (text na bílé nejméně `#595959` pro 4,5 : 1). Jediný „akcent“ je podtržení odkazů a plná černá tlačítka. Barvy mají jen snímky šablon a vzorky palet.
- Místo kartiček ze SaaS šablon: seznamy s tenkými linkami, tabulky, dvousloupcové texty, velký řádkový text. Žádné ikonky v kolečku, žádné „tři karty vedle sebe s ikonou“, žádný hrdinský obrázek s přechodem, žádná fotografie z fotobanky.
- Obrazy jsou snímky šablon a schémata v SVG.
- Tón: věcně, oslovení „vy“, krátké věty, konkrétní podstatná jména („úřední deska“, ne „digitální transformace“). Každá věta musí unést otázku starosty „kde to je napsané“.

**Jak obce nakupují:** rada nebo zastupitelstvo podle výše částky a směrnice, písemná nabídka a návrh smlouvy, rozpočet na konci roku. Ceník a Ke stažení proto nabízejí podklady k přeposlání radě. Limit zakázky malého rozsahu u služeb je z paměti 2 000 000 Kč bez DPH podle § 27 zákona č. 134/2016 Sb., NEOVĚŘENO (viz overit); po ověření jen ve větě „roční cena služby bývá hluboko pod limitem“.
</pravidla>

<design_a_pristupnost>
- Layout: sloupec textu 640 px, širší prvky do 1 120 px, okraje 16 px na 375 px, mřížka 4 px. Text 17 px, řádkování 1,55; h1 40 px (na 375 px 32 px), h2 28 px, h3 20 px, Montserrat 600.
- Navigace: hlavička s logem vlevo, 6 odkazů a tlačítko „Napište nám“. Na menším než 768 px tlačítko Menu (`<details>` nebo `button` s `aria-expanded`), celá navigace dosažitelná bez JavaScriptu. Odkaz „Přeskočit na obsah“ první na stránce.
- Fokus: viditelný vždy, 3 px, kontrast 3 : 1 proti okolí (na bílém černý, na černém bílý), neztratí se pod sticky hlavičkou (`scroll-margin-top`).
- Cíle dotyku nejméně 44 × 44 px včetně odkazů v patičce a tabulkách. Odkazy podtržené, rozlišitelné od textu i bez barvy.
- Kontrast textu aspoň 4,5 : 1 (velký text 3 : 1), prvky rozhraní 3 : 1.
- Pohyb: žádná animace nutná k porozumění, `prefers-reduced-motion` vypíná přechody.
- Formuláře: viditelné popisky nad poli (ne placeholder místo popisku), `autocomplete` (`name`, `organization`, `email`, `tel`), chyby u pole a v souhrnu s `role="alert"`, povinná pole označená slovy „povinné“. Chybové texty říkají, co opravit („Zadejte e-mail ve tvaru jmeno@obec.cz“).
- Tabulky: `<caption>`, `<th scope>`, na 375 px vodorovné posouvání v popsaném kontejneru nebo přeskládání do seznamu; stránka nikdy neposouvá vodorovně.
- Galerie: tlačítka palet jsou skupina s popiskem „Barevná varianta“, změna se oznámí přes `aria-live`. Snímky mají `width` a `height`, `loading="lazy"` kromě prvního.
- Struktura: `lang="cs"`, unikátní `<title>` a jedna `h1`, nadpisy bez přeskakování úrovní, `<main>`, `<nav aria-label>`, `<footer>`.
- Rychlost: na mobilu Lighthouse Performance, Accessibility, Best Practices a SEO každý 95 a víc; LCP do 2,5 s, CLS do 0,05, celkový JavaScript první stránky do 100 kB gzip. Obrázky `next/image` ve WebP/AVIF, písma s `font-display: swap` a předběžným načtením jen dvou řezů.
- SEO: v nadpisech a textech přirozeně „web pro obec“, „elektronická úřední deska“, „mobilní rozhlas“, „aplikace pro obec“, „přístupnost webu obce“, „povinně zveřejňované informace“; objemy hledání jsou NEOVĚŘENO, podle odhadu nepiš. JSON-LD: `Organization` na úvodu (jen ověřené údaje, IČO [DOPLNIT]), `Service` na Ceníku bez ceny, dokud není ověřená, `FAQPage` u otázek; žádné `aggregateRating` ani `review` (recenze neexistují). `sitemap.xml`, `robots.txt` (na náhledu `noindex`), kanonické adresy.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Správcem údajů z formuláře je CodeKom (D). Formulář sbírá minimum a každé pole má účel. Nepřijímej rodná čísla ani citlivé údaje; do textového pole uživatele upozorni, ať je nepíše.
- Žádné skripty třetích stran, žádný reCAPTCHA ani Turnstile (přenos do třetích zemí). Ochrana proti spamu: honeypot, minimální čas vyplnění, rate limit na serveru a zod validace na serveru i v klientu.
- Odpověď serveru nesmí prozradit, zda e-mail už v databázi je.
- V klientu jen `NEXT_PUBLIC_*`. Tajné klíče a e-mailovou službu drží `apps/web`. `.env` v `.gitignore`.
- Odkazy ven mají `rel="noopener noreferrer"`. CSP bez `unsafe-eval` a bez `unsafe-inline` u skriptů (nonce nebo hash podle Next 16, ověř v dokumentaci).
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
2. **axe:** všechny stránky ze sitemapy, tagy WCAG 2.0, 2.1 a 2.2 A a AA a best-practice, nula chyb.
3. **Lighthouse CI:** `lighthouserc.json`, mobilní profil, 3 běhy, prahy 0,95 pro čtyři kategorie, LCP a CLS podle sekce design; úvod, Ceník, Ukázky, detail šablony, Kontakt.
4. **Odkazy:** interní odkazy a kotvy vrací 200; externí (zákony, výzvy) se kontrolují zvlášť a selhání je varování, ne pád buildu.
5. **Obsah:** `scripts/kontrola-obsahu` (zakázaná slova a znaky, přesné heslo, jména konkurence, `%` bez záznamu v registru, řádek `overeno` bez zdroje a data) a `scripts/kontrola-doplnit`, oboje s Vitest testy kladných i záporných příkladů.
6. **Logo:** test porovnání SVG s PNG (podíl odlišných pixelů), test, že favicon soubory existují a mají správné rozměry.
7. **Příkazy:** `pnpm typecheck`, `lint`, `test`, `e2e`, `a11y` plus `pnpm lighthouse`, `odkazy`, `obsah`, z `apps/prezentace` i přes Turborepo.
</testy>

<postup>
Na začátku napiš plán a seznam úkolů (`docs/progress-prezentace.md`) a průběžně odškrtávej. Každý milník končí kontrolami a commitem česky v rozkazovacím způsobu.

1. Základ: aplikace v monorepu, Tailwind 4, černobílé tokeny, písma, hlavička, patička, `vercel.json` (fra1), hlavičky zabezpečení, prázdné stránky z mapy.
2. Značka: SVG, favicon, OpenGraph, porovnání s PNG, `brand/README.md`.
3. Obsah a data: typy, zod, MDX, registr tvrzení, `kontrola-obsahu`, `kontrola-doplnit`.
4. Ukázky: generované šablony, snímky, galerie, detail s paletami.
5. Ceník a ke stažení: data, tabulka, kalkulačka, PDF, stránka nákupu.
6. Poptávka a newsletter: formulář, klient, endpoint v `apps/web` (jen když chybí, s migrací a testem), potvrzení, odhlášení.
7. Právo, bezpečnost, dotace, přístupnost: stránky z D, prohlášení, přehled dotací z ověřených zdrojů.
8. SEO a rychlost: metadata, JSON-LD, sitemap, Lighthouse CI, doladění.
9. Nasazení: náhled na Vercelu (fra1); produkční doménu nenasazuj, dokud zakladatel nedoplní domény.

Prahy ani stránky neobcházej. Když Lighthouse nebo axe selže, oprav příčinu, nebo napiš, proč to nejde.
</postup>

<hotovo_kdyz>
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v `apps/prezentace` projdou.
- [ ] `pnpm lighthouse`: mobil, všech pět stránek, Performance, Accessibility, Best Practices a SEO každé 95 a víc.
- [ ] `pnpm obsah` a `pnpm odkazy` projdou. `pnpm kontrola:doplnit` na produkčním buildu vypíše všechna zbylá `[DOPLNIT]` a končí chybou, v náhledu jen varováním.
- [ ] Mapa webu odpovídá sekci funkce, všech 20 šablon má 3 palety a snímky, přepínač jde ovládat klávesnicí.
- [ ] `vercel.json` obsahuje `fra1`, hlavičky zabezpečení jsou nastavené, Playwright neeviduje požadavky mimo vlastní původ a `NEXT_PUBLIC_API_URL`.
- [ ] Heslo „Tvoříme kódy pro lidi.“ je na webu přesně, texty neobsahují zakázané výrazy, jména konkurence ani procenta bez zdroje.
- [ ] SVG znak, název a logo existují v černé i bílé se shodou doloženou číslem, favicon sada a OpenGraph obrázky jsou vygenerované.
- [ ] Formulář uloží poptávku v `apps/web` a pošle potvrzení; pole newsletteru není předzaškrtnuté; potvrzení a odhlášení jedním klikem fungují.
- [ ] Ceník ukazuje podmínky z A doslova; hypotetické ceny se na produkci nezobrazují.
- [ ] Prohlášení o přístupnosti a zásady osobních údajů odpovídají stavu webu.
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
| Ceny a funkce konkurence | na web nepatří; pro interní účely z veřejných smluv v registru smluv, do `docs/` s datem |
| Objemy klíčových slov | Marketing Miner nebo Sklik; do doby ověření žádné rozhodnutí o textech podle odhadu |
| Font logo | potvrdit u zakladatele; porovnání s Montserratem (překrytí) |
| Zda § 7 zák. 480/2004 Sb. dopadá na úřední adresy obcí; zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zák. 127/2005 Sb. | advokát; do té doby bez studených e-mailů a bez měření |
| Doba přizpůsobení šablony (návrh uvádí 5 pracovních dnů), lhůta odpovědi na poptávku, doba migrace | zakladatel |
| Podzpracovatelé označení „ověřit“ v příloze B2 (Vercel region a mechanismus předání, push služby, e-mailová služba) | smlouvy a dokumentace dodavatelů; pokud neověříš, nech `[OVĚŘIT]` |
| Verze balíčků a CSP pro Next 16 | `npm view <balíček> version`; dokumentace Next.js (nonce, hash) |

Doplnit musí zakladatel: domény (prezentace, demo Javoří Lhota, záložní doména obcí), IČO, sídlo, kontakty, úřední dobu, jména a fotografie pro O nás, e-mailovou službu, pilotní obce, ceny a rozdíl roční a měsíční platby, nabídku pomoci s dotacemi.
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

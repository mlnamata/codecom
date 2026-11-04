# Prompt: Prezentační web CodeKom

Vlož celý do Claude Code v kořeni repozitáře `codecom`, nebo napiš: Proveď zadání v `prompty/06-prezentacni-web.md`.
Závisí na: hotových textech `obsah/prezentace/*.md`, fotkách `design/obrazky/foto/`, snímcích šablon `design/snimky/` a `brand/` (logo). Volitelně na promptech 07 a 08 (odkazy na živou ukázku webu a aplikace). Na `apps/web` nezávisí a nic v něm nemění.

<kontext>
CodeKom prodává obcím web s úřední deskou, aplikaci pro občany, digitální úřad, správu budov a AI asistenta. Prezentační web (`apps/prezentace`) je to, co uvidí starosta, účetní nebo správce webu, když ho někdo doporučí nebo když si CodeKom vyhledá. Musí během pár minut odpovědět na otázky, které si starosta klade: kolik to stojí, co řekne kontrola a jak se z toho dostanu, když to nebude fungovat.

Hlavní úkol webu: zaujmout starostu malé obce, aby chtěl web CodeKom, a pustit ho do živé ukázky Javoří Lhoty. Úvod proto staví na ukázce (snímky šablon, odkazy do dema) a na věcných důvodech: čas starosty, právní jistota úřední desky, přístupnost, data v EU, férové podmínky.

Čtenáři: starosta malé obce (často neuvolněný, čte na telefonu, bojí se špatného rozhodnutí), účetní, která web spravuje a podklady přeposílá radě, a správce webu nebo externí dodavatel.

Obec nenakupuje jako firma. Rozhoduje rada nebo zastupitelstvo, potřebuje písemnou nabídku, vzorovou smlouvu a podklad pro usnesení, a nákup se řeší hlavně při schvalování rozpočtu na podzim a v prosinci. Web je proto sada podkladů, které starosta přepošle radě, ne jen leták.

Zakladatel chce mít vše připravené předem: texty, fotky i snímky jsou v repozitáři a ty jen postavíš do webu. Nepiš marketingové texty, nevymýšlej obsah a na nic se neptej. Všechna rozhodnutí jsou v tomto promptu nebo v `docs/rozhodnuti.md`. Kde text, údaj nebo soubor chybí, nech v místě `[DOPLNIT: co]` a pokračuj.

Přečti si:
- `CLAUDE.md` (stack, design, pravidla domény, kontrola hotovo; neopisuj ho), `brand/README.md` a soubory v `brand/`,
- `obsah/prezentace/*.md` (texty webu, viz sekce funkce) a `design/obrazky/README.md` (popis fotek),
- `docs/rozhodnuti.md`, `docs/navrh-platformy/01`, `03`, `04`, `docs/pravni-dokumenty.md` (A, B, D),
- `research/poznamky/web_obce_a_prodej.md` a `research/zprava-podklady-pro-prompty.md`, sekce 6.
</kontext>

<cil>
Na konci běží `apps/prezentace` lokálně (`pnpm --filter prezentace build && pnpm --filter prezentace start`) jako staticky generovaný český web s mapou stránek z této specifikace. Nic se nenasazuje a žádná doména se nepoužívá, výstup je v repozitáři. Návštěvník si prohlédne 20 šablon na ukázkové obci Javoří Lhota s přepínačem palet, z úvodu i z ukázek se může dostat do živé ukázky (když je nastavená), zjistí orientační ceny „od“, spočítá orientační cenu, stáhne vzorovou nabídku, smlouvu a podklad pro radu a napíše CodeKom e-mailem nebo zavolá. Web nepoužívá cookies ani třetí strany, nic nesbírá, splňuje WCAG 2.2 AA a na mobilu má v lokálním Lighthouse 95 a víc. Každé tvrzení má záznam o zdroji nebo je označené k ověření a nic neslibuje víc, než potvrdil produkt nebo rešerše.
</cil>

<vychozi_stav>
- `apps/prezentace` zatím neexistuje. Založí se v monorepu (pnpm + Turborepo) podle `CLAUDE.md`. Zkontroluj, zda kořenové `pnpm-workspace.yaml` a `turbo.json` existují. Pokud ne, založ je jen v minimu potřebném pro tuto aplikaci a zapiš to do `docs/rozhodnuti.md` (prompty mají fungovat v libovolném pořadí).
- `obsah/prezentace/*.md` jsou hotové texty webu, jeden soubor na stránku. Soubory: `uvod`, `co-umime`, `ukazky`, `cenik`, `prechod`, `bezpecnost-a-pravo`, `dotace`, `pro-koho`, `o-nas`, `kontakt`, `ke-stazeni`, `faq`, `pristupnost`, `zasady-osobnich-udaju`, `cookies` a `tvrzeni`. Frontmatter má `title` (do 60 znaků), `description` (do 155) a `adresa`.
- `design/obrazky/foto/<blok>.webp` je 23 fotek vytvořených umělou inteligencí: 20 úvodů šablon (`sablona-NN-klic`, NN je pořadí šablony) a `prezentace-starosta`, `prezentace-topeni`, `prezentace-zamek`.
- `design/snimky/<klic>-<paleta 0–2>-1280.webp` jsou snímky úvodů 20 šablon ve všech třech paletách a `<klic>-0-375.webp` mobilní snímky první palety. Jsou připravené, nevyráběj je znovu.
- `brand/` obsahuje jen PNG. SVG verze a favicon chybí a vyrobíš je ty.
- `design/prototypy/*.dc.html` jsou prototypy 20 šablon, `design/generator/palettes.py` má 3 palety po 12 tokenech pro každou. Slouží k datům palet (vzorky, kontrast) a jako záloha pro přegenerování snímků, viz sekce ukázky.
- Ceny v `docs/navrh-platformy/01` a `04` jsou hypotézy a web je ukazuje jako orientační ceny „od“ (sekce ceník). Texty v `docs/pravni-dokumenty.md` D jsou návrh ke kontrole advokátem a obsahují `[HRANATÉ ZÁVORKY]`.
</vychozi_stav>

<rozsah>
Postav: aplikaci `apps/prezentace` (Next.js 16, App Router, Tailwind 4, TypeScript strict) se stránkami z mapy webu a právními stránkami; SVG verze loga, favicon sadu a OpenGraph obrázky; galerii 20 šablon se snímky z `design/snimky/` a přepínačem palet; odkazy do živé ukázky; orientační ceník s kalkulačkou; ke stažení vzorovou nabídku, smlouvu A, smlouvu B a vzor usnesení rady jako přístupná PDF; kontroly (Playwright, axe, Lighthouse CI, odkazy, obsah); registr tvrzení `docs/tvrzeni-prezentace.md`; `vercel.json` s regionem `fra1` (připravený, nenasazený); README s postupem spuštění a pozdějšího nasazení.

Mimo rozsah: vlastní CMS pro prezentaci; skutečné reference, počty obcí, citace starostů a ceny konkurence (nevymýšlej); chatbot na webu (platil by čl. 50 AI Actu); poptávkový formulář, newsletter a jakékoli ukládání údajů návštěvníků; jakékoli nasazení a nákup domény; úpravy `apps/web`; blog, tmavý režim, jiné jazyky než čeština; fotografie z fotobanky.

Později (jen poznámka, nestav): poptávkový formulář a newsletter se potvrzením přihlášení. Budou používat rozhraní `POST /api/poptavky` ze sdílených rozhraní platformy; web až do té doby plní kontakt telefon, e-mail a `mailto:`.
</rozsah>

<architektura>
**Volba obsahu: MDX v repozitáři, ne Payload.** Důvody zapiš do `docs/rozhodnuti.md`:
- obsah mění zakladatel a Claude Code, ne obecní redaktoři, takže editor v prohlížeči nikdo nepotřebuje,
- každá změna textu projde gitem, kontrolou obsahu a review, což potřebujeme u tvrzení s právním dopadem,
- stránka je statická bez závislosti na databázi,
- Payload by přidal další kolekce pod superadminem, migrace a práva, aniž by cokoli získal.

Texty se nepíšou, převezmou se z `obsah/prezentace/*.md` do `src/obsah/*.mdx` beze změny smyslu (frontmatter `title`, `description`, `adresa` se použije jako metadata a adresa stránky). Úpravy textu jsou jen technické: formátování do komponent, odkazy na vnitřní stránky, vynechání vět o funkcích mimo rozsah (formulář, newsletter), vždy zapsané do `docs/rozhodnuti.md`. Soubory v `obsah/prezentace/` neměň, píše je někdo jiný.

**Struktura**
```
apps/prezentace/
  src/app/         stránky, sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  src/obsah/       MDX stránek a FAQ (převzaté z obsah/prezentace)
  src/data/        cenik, dotace, sablony (generovaný), moduly, faq
  src/komponenty/  Hlavicka, Paticka, Galerie, KalkulackaCeniku, Tabulka, OdkazDemo, FotoAi
  src/lib/         seo.ts, demo.ts (sestavení odkazů do dema)
  public/          brand/, sablony/ (kopie z design/snimky), foto/ (kopie z design/obrazky/foto), ke-stazeni/
  scripts/         sablony-z-navrhu, snimky-sablon (jen přegenerování), logo-svg, pdf, tvrzeni-z-obsahu, kontrola-obsahu, kontrola-doplnit
  tests/           Playwright, axe, odkazy
  vercel.json      region fra1, nenasazovat
  README.md        jak spustit a jak později nasadit
```
**Nasazení.** Žádné. Připrav `vercel.json` s `"regions": ["fra1"]` (výchozí `iad1` je v USA), ale nespouštěj `vercel`, nevytvářej projekt a nepřipojuj doménu. Stránky se generují staticky (`generateStaticParams`, bez `dynamic = "force-dynamic"`), takže web funguje i jako statický export. Hlavičky v `next.config.ts`: `Content-Security-Policy` (jen vlastní původ, `connect-src 'self'`, žádné skripty třetích stran), `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` bez kamery, mikrofonu a polohy. Písma self-hosted přes `next/font/local`, nikdy z Google Fonts (přenos IP návštěvníka do USA bez souhlasu).

**Proměnné** (`.env.example` s popisem): `NEXT_PUBLIC_SITE_URL` (výchozí `http://localhost:3000`; doména CodeKom [DOPLNIT]), `NEXT_PUBLIC_DEMO_URL` (základ živé ukázky webu Javoří Lhota, např. `http://localhost:3001`; prázdné znamená žádné odkazy do dema a zůstanou jen snímky), `NEXT_PUBLIC_APP_DEMO_URL` (základ ukázky aplikace v prohlížeči; prázdné znamená žádný odkaz „Vyzkoušet aplikaci“). Žádné další proměnné nezaváděj.

**Měření návštěvnosti.** Žádné, ani bez cookies. Tabulka v D uvádí měření na základě souhlasu; tento prompt volí přísněji, proto uprav řádek v D a zapiš to do rozhodnutí. Zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zákona č. 127/2005 Sb., je NEOVĚŘENO, a měření se proto nepřidává, dokud to advokát nepotvrdí (kandidáti pak Plausible nebo Umami self-hosted na serveru v EU).
</architektura>

<datovy_model>
Jen typované datové soubory v `src/data/` (zod validace při buildu; build selže, pokud položka `stav: "overeno"` nemá `zdroj` a `overenoDne`, nebo položka `stav: "orientacni"` nemá `zdroj` a `platiKDni`). Položky s číslem nebo právním tvrzením mají `stav: "overeno" | "orientacni" | "hypoteza" | "neovereno"`, `zdroj` (URL nebo soubor v repu), `overenoDne` nebo `platiKDni` (ISO). Stav `orientacni` je nový: číslo pochází z návrhu platformy, ukazuje se vždy se štítkem a datem.

- `Modul { klic: web|aplikace|urad|iot|ai, nazev, jednaVeta, body[], stav }`
- `Sablona { klic, poradi, nazev, proKoho, popis, palety[3] { index 0–2, nazev, tokeny[12], snimek1280, snimek375 | null } }`. `proKoho` a úvod galerie jsou z `obsah/prezentace/ukazky.md`. Klíče v pořadí: naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad. Snímek `snimek1280` je `design/snimky/<klic>-<paleta>-1280.webp`, `snimek375` jen u palety 0. Soubor generuje `scripts/sablony-z-navrhu` z `palettes.py`, z tabulky v `03-sablony-webu.md`, z `ukazky.md` a ze seznamu snímků, ručně se needituje.
- `Cenik { urovne[zaklad|pokrocily|advance] × ceny[do500|500-2000|2000-10000], moduly { urad: [do500, 500-2000, 2000-10000], iot: { kcZaBudovu } }, zalozeni, platba }`, kde `Cena = { kcBezDph | null, stav, zdroj, platiKDni }`. Hodnoty viz sekce ceník, všechny `stav: "orientacni"`, `zdroj: "docs/navrh-platformy/04-admin-editor.md"` (a `01`), `platiKDni: "2026-11-04"`. Rozdíl mezi roční a měsíční platbou [DOPLNIT].
- `Dotace { nazev, poskytovatel, url, prijemZadosti | null, stav: otevrena|planovana|uzavrena|neovereno, overenoDne, poznamka }`
- `Faq { otazka, odpoved (MDX), skupina: nakup|pravo|provoz|prechod }`, převzaté z `obsah/prezentace/faq.md` a `ke-stazeni.md`.
- `Tvrzeni { tvrzeni, stranka, zdroj, datum, stav }`, převzaté z `obsah/prezentace/tvrzeni.md`.
</datovy_model>

<funkce>
**Mapa webu** (adresa je ve frontmatteru `adresa` příslušného souboru, bez diakritiky; navigace nejvýš 7 položek, patička úplná):

| Adresa | Stránka | Text z | Obsah |
|---|---|---|---|
| `/` | Úvod | `uvod.md` | pro koho to je, co obec získá, 3 až 4 šablony vedle sebe (snímky), odkazy do dema, tři důvody (čas, právní jistota, férové podmínky), ceník v kostce, jedna výzva „Napište nám“ |
| `/co-umime` | Co umíme | `co-umime.md` | pět modulů (web a úřední deska, aplikace, digitální úřad, budovy, AI asistent), každý s tím, co řeší, a s tím, co nedělá |
| `/ukazky` | Ukázky | `ukazky.md` | galerie 20 šablon |
| `/cenik` | Ceník | `cenik.md` | orientační ceny „od“, tabulka a kalkulačka |
| `/prechod` | Přechod na CodeKom | `prechod.md` | migrace ze starého webu, školení, podpora, časový plán |
| `/bezpecnost-a-pravo` | Bezpečnost a právo | `bezpecnost-a-pravo.md` | data v EU, smlouva o zpracování, přístupnost, AI Act, seznam podzpracovatelů |
| `/dotace` | Dotace | `dotace.md` | přehled výzev s datem ověření |
| `/pro-koho` | Pro koho | `pro-koho.md` | malé obce, mikroregiony a MAS, organizace obce |
| `/o-nas` | O nás | `o-nas.md` | kdo jsme, heslo, jak pracujeme |
| `/kontakt` | Kontakt | `kontakt.md` | telefon, e-mail, adresa, `mailto:` |
| `/ke-stazeni` | Ke stažení | `ke-stazeni.md`, `faq.md` | nabídka, smlouva, zpracování, vzor usnesení; FAQ „Jak obec nakupuje“ |
| `/pristupnost`, `/zasady-osobnich-udaju`, `/cookies` | právní | `pristupnost.md`, `zasady-osobnich-udaju.md`, `cookies.md` | viz níže |

**Úvod.** První obrazovka říká, pro koho web je a co obec získá, ne slogan. Heslo „Tvoříme kódy pro lidi.“ patří do patičky, na O nás a do OpenGraph obrázků, ne do hlavního nadpisu. Dál 3 až 4 snímky šablon vedle sebe (na 375 px pod sebou, první z nich je Javoří Lhota ve výchozí šabloně `naves`), odkaz „Prohlédnout živou ukázku Javoří Lhoty“ a „Vyzkoušet aplikaci“, tři věty (čas, právní jistota, podmínky), řádek s pěti moduly a cena „od 590 Kč měsíčně bez DPH“ se štítkem z ceníku. Odkazy do dema viz sekce ukázky; bez nastavených proměnných zůstanou jen snímky. Fotku `prezentace-starosta.webp` smíš použít na úvodu jako obraz, který ukazuje starostu u práce, pokud to text z `uvod.md` podporuje, vždy s poznámkou o umělé inteligenci.

**Co umíme.** U každého modulu: komu pomáhá, 3 až 5 konkrétních věcí, odkaz na demo, co nedělá. Text z `co-umime.md`; obsahově musí odpovídat tomu, co říkají `docs/navrh-platformy` a `CLAUDE.md`:
- web a úřední deska: povinně zveřejňované informace ve struktuře vyhlášky č. 515/2020 Sb., evidence vyvěšení a sejmutí, přístupnost,
- aplikace: oznámení a krizová hlášení (vždy jedno, nejzávažnější; nenahrazuje varovný systém IZS), účet bez hesla,
- digitální úřad: formuláře, hlášení závad, rezervace, poplatky; peníze jdou přímo na účet obce,
- budovy: topení a zámky s nouzovým mechanickým otevřením, ochrana proti mrazu funguje i bez internetu; úspora energie jen jako cíl měření, bez procenta, dokud nejsou vlastní naměřená data,
- AI asistent: řekne, že je AI, odpovídá z dokumentů obce a cituje je, dotazy neukládá ke jménu, běží v ČR.
Fotky `prezentace-topeni.webp` (topení) a `prezentace-zamek.webp` (zámek) patří k modulu budovy, pokud text z `co-umime.md` na ně odkazuje, jinak je dej tam, kde se o topení a zámku píše.

**Ukázky.** Mřížka 20 šablon (1 sloupec na 375 px, 2 na tabletu, 3 až 4 na desktopu): snímek z `design/snimky/`, název, „pro koho“ jednou větou z `ukazky.md`. Detail `/ukazky/[klic]`: velký snímek, přepínač 3 palet (tlačítka s `aria-pressed`, názvy slovy, seznam 12 tokenů s kontrastem; pro mobilní snímek použij `<klic>-0-375.webp`), odkaz „Prohlédnout živou ukázku“ a „Vyzkoušet aplikaci“. Alt text popisuje obsah („Úvodní stránka šablony Lípa pro obec Javoří Lhota, paleta Lipová“). Barevné akcenty paletových variant jsou povolené jen uvnitř snímků a vzorků. Fotka úvodu šablony (`sablona-NN-klic.webp`) se smí ukázat na detailu jako ilustrace úvodní fotografie, vždy s poznámkou o umělé inteligenci.

Snímky už existují, skript `snimky-sablon` je jen pro přegenerování: pokud existuje prototyp 07 (`apps/web` se skriptem `snimky`), použij `pnpm --filter web snimky` (skutečné stránky se stejnými názvy souborů), jinak skript nad `design/prototypy` podle `design/nastroje/variants.js` (`minidc.js`, `fonts.js`). Kontroluj velikost snímků (cíl do 120 kB); co ji překračuje, jen nahlas v závěru, nepřegenerovávej.

Odkazy do živé ukázky vznikají jen při vyplněném `NEXT_PUBLIC_DEMO_URL`, ve tvaru `<NEXT_PUBLIC_DEMO_URL>?sablona=<klic>&paleta=<0–2>` (například `?sablona=lipa&paleta=1`; paleta je číslo 0 až 2 podle zvolené palety v galerii). Na úvodu bez parametrů nebo s výchozí šablonou `naves`. Odkaz „Vyzkoušet aplikaci“ ukazuje na `NEXT_PUBLIC_APP_DEMO_URL` a jen při jeho vyplnění. Odkazy ven mají `rel="noopener noreferrer"`, otevírají se ve stejném okně a nenačítají v ukázce nic z cizího původu (web sám nevkládá `iframe`).

**Ceník.** Zobraz orientační ceny „od“ (měsíčně bez DPH), přesně podle návrhu `04-admin-editor.md` a `01-navrh-platformy.md`:

| Úroveň webu | do 500 obyvatel | 500–2 000 | 2 000–10 000 |
|---|---|---|---|
| Základ | od 590 Kč | od 990 Kč | od 1 690 Kč |
| Pokročilý | od 890 Kč | od 1 490 Kč | od 2 490 Kč |
| Advance | od 1 490 Kč | od 2 290 Kč | od 3 790 Kč |

Moduly navíc: Digitální úřad +600 / +1 000 / +2 000 Kč měsíčně podle velikosti obce, Chytré budovy +390 Kč měsíčně za budovu. Úroveň editoru popisují řádky z `04` (Základ: píšu obsah, Pokročilý: skládám stránky, Advance: upravuji skoro vše), mobilní aplikace pro občany je ve všech úrovních.

Povinný štítek u každé ceny, tabulky i výsledku kalkulačky: „orientační cena, přesnou pošleme v nabídce“ s datem (platí ke 4. 11. 2026). Ceny mají `stav: "orientacni"` v datech i v registru tvrzení, zdrojem je soubor návrhu. Pravidlo, že se hypotetická cena na produkci skrývá, neplatí, a proměnnou `CENIK_ZVEREJNIT` nezaváděj: místo skrytí je štítek povinný a test hlídá, že žádná cena nestojí bez něj.

Kalkulačka pod tabulkou: velikost obce, úroveň webu, Digitální úřad (ano/ne), počet budov. Výsledek je „orientačně od X Kč měsíčně bez DPH“ se stejným štítkem, v `aria-live="polite"`. Způsob platby (roční licence fakturou, splatnost 30 dní, doklad do datové schránky, nebo měsíčně kartou, A čl. 3) je jen popis pod tabulkou; rozdíl v ceně [DOPLNIT] a do kalkulačky nevstupuje. Pod tabulkou podmínky z A bez zkrášlení: výpověď kdykoli bez udání důvodu, výpovědní doba 3 měsíce u roční a 1 měsíc u měsíční platby, 30 dní zkušební doba s vrácením celé ceny, vrácení nevyčerpaných měsíců u roční licence, úřední deska běží i při neplacení, export dat zdarma, po skončení 30 dní jen pro čtení, cena roste nejvýš o inflaci a jednou ročně.

Rozpor: návrh 04 uvádí založení zdarma při smlouvě na 24 měsíců (jinak 9 900 Kč) a návrh 01 pilot na 6 měsíců zdarma, ale smlouva A je na dobu neurčitou s výpovědí kdykoli a 30denní zkušební dobou. Založení 9 900 Kč, „zdarma při 24 měsících“ ani pilot zdarma na web nedávej a rozpor uveď v závěru.

**Přechod na CodeKom.** Text z `prechod.md`. Kroky: výběr šablony a přizpůsobení znaku a fotkám (návrh uvádí do 5 pracovních dnů, jen jako [OVĚŘIT]), převod obsahu ze starého webu, převod úřední desky tak, aby evidence vyvěšení nezanikla, přesměrování starých adres, školení podle úrovně editoru, podpora (lhůty z A, čl. 5), co obec dodá (znak, kontakty, přístup k doméně). Kontrolní seznam ke stažení. Čas migrace neslibuj, dokud ho zakladatel nepotvrdí.

**Bezpečnost a právo.** Text z `bezpecnost-a-pravo.md`, sekce s kotvami: data v EU (databáze Supabase ve Frankfurtu, web na Vercelu ve Frankfurtu, AI server v ČR; podzpracovatelé z přílohy B2 včetně položek [ověřit]; předání mimo EU jen na standardní smluvní doložky), smlouva o zpracování podle čl. 28 GDPR ke stažení, přístupnost (zákon č. 99/2019 Sb., stavíme podle WCAG 2.2 AA), úřední deska (vyvěšené dokumenty nejdou smazat, změny jsou verze), AI Act čl. 50 (asistent se představí jako AI), kybernetická bezpečnost (zákon č. 264/2025 Sb.: slib jen součinnosti podle A; zda je obec regulovaná, ověří kalkulačkou NÚKIB). Nepiš o pokutách, text zákona č. 99/2019 Sb. je nezmiňuje. Nepiš „certifikováno“ ani „bezpečné“, piš, co děláme.

**Dotace.** Stránka je přehled, ne slib. Text z `dotace.md`: dotace nezaručujeme a pomůžeme s podklady k žádosti (cena služby [DOPLNIT]). Tabulka z `dotace.ts` zobrazuje jen položky se `stavem` a `overenoDne`, nahoře datum posledního ověření celé tabulky. Výzvy převezmi z `dotace.md`, pokud je obsahuje; jinak ověř výzvy 2026–2027 z dokumentů uvedených v sekci overit (MMR, MV, Plzeňský kraj, IROP) a zapiš jen to, co skutečně přečetl. Co nedokážeš ověřit, nezobrazuj; stránka pak říká, že aktuální výzvy sledujeme a pošleme je na vyžádání e-mailem (`mailto:` z kontaktu).

**Pro koho.** Text z `pro-koho.md`. Tři oddíly: malá obec (do 500 a do 2 000 obyvatel), mikroregion nebo MAS (společná správa více obcí; stav označ podle návrhu 01, tedy jako plánovaný, pokud ještě není), organizace obce (škola, knihovna, sportoviště jako podweb).

**O nás.** Text z `o-nas.md`: kdo jsme ([DOPLNIT: jména, fotografie, životopis, IČO, sídlo], co v textu chybí), jak pracujeme, heslo. Žádné vymyšlené reference, počty obcí ani citace. Do spuštění pilotu je Reference jen věta „První obce připravujeme [DOPLNIT: pilotní obce]“, zvýrazněná jako zbylé `[DOPLNIT]`.

**Kontakt.** Text z `kontakt.md`. Žádný formulář. Stránka ukazuje telefon, e-mail, adresu a úřední dobu (vše [DOPLNIT], dokud v textu nejsou) a odkaz `mailto:` s předvyplněným předmětem, například `mailto:<e-mail>?subject=Dotaz%20na%20web%20CodeKom%20pro%20obec` (e-mail [DOPLNIT]). Stejný kontakt je v patičce a v navigaci jako tlačítko „Napište nám“. Web nic neukládá a nic neodesílá, i tak platí, že web není jediná cesta: telefon je vždy vedle e-mailu.

**Ke stažení a nákup obcí.** Text z `ke-stazeni.md` a `faq.md`. Stránka „Jak obec nakupuje“ v otázkách a odpovědích, bez právního poradenství: kdo rozhoduje (starosta, rada, zastupitelstvo podle zákona o obcích a vnitřní směrnice, odkaz na vzor směrnice MV), co je veřejná zakázka malého rozsahu a že roční cena služby bývá pod jejím limitem (jen s datem ověření), zda a kdy musí obec smlouvu uveřejnit v registru smluv (zákon č. 340/2015 Sb., § 3 odst. 2 písm. k) [OVĚŘIT]; rešerše uvádí povinnost a limit 50 tis. Kč jako NEOVĚŘENO, tvrzení až po ověření a s datem), proč nákup zapadá do rozpočtu na příští rok. Ke stažení: vzorová cenová nabídka (ceny jako orientační „od“ se štítkem), smlouva A, smlouva o zpracování B, vzor usnesení rady, kontrolní seznam přechodu. Texty z `docs/pravni-dokumenty.md`, s `[DOPLNIT]` a v hlavičce „Vzor, před podpisem ke kontrole“. PDF generuje skript `pdf` (označené, nadpisy, jazyk `cs`, název dokumentu) a ověř je veraPDF nebo ekvivalentem. U PDF velikost, tlačítko a stejný obsah jako HTML.

**Obchodní sdělení.** Web sám žádné e-maily neodesílá a nesbírá adresy. E-maily obcím jen podle § 7 zákona č. 480/2004 Sb. [OVĚŘIT, rešerše tento zákon neobsahuje]: se souhlasem, nebo stávajícím zákazníkům k obdobným službám s možností snadno odmítnout. Studené e-maily na adresy obcí z veřejných seznamů tento prompt nestaví. Zda se § 7 vztahuje na úřední adresy obcí, je [OVĚŘIT u advokáta].

**Cookies a soukromí.** Web nic neukládá do zařízení, takže lišta není. `/cookies` (text z `cookies.md`) to říká jednou větou a vypisuje, co se ukládá (nic). Žádné vložené YouTube, mapy ani sociální pluginy a žádný formulář. Přibude-li měření, video, mapa nebo formulář, lišta a zásady se doplní dřív než funkce.

**Zásady osobních údajů.** Text z `zasady-osobnich-udaju.md`, doplněný o základ z D tam, kde text odkazuje. Web nic nesbírá; zásady popisují jen korespondenci, kterou návštěvník sám pošle e-mailem nebo telefonem, a technické záznamy serveru podle toho, kde web poběží [DOPLNIT]. Věty o poptávce, newsletteru a měření vynech, dokud tyto funkce nejsou. `[WEB]` a `[E-MAIL]` nahraď jen skutečnými údaji, ostatní `[DOPLNIT]` nech. Položky, které D označuje „ověřit“, nech označené.

**Prohlášení o přístupnosti.** Text z `pristupnost.md`. Pro firmu není povinné, ale je to argument. Podle vzoru DIA: stav souladu, nedostatky, náhradní cesta, datum přípravy a přezkumu, kontakt, postup při podezření na nesoulad. „Úplný soulad“ napiš jen po průchodu testů a ručním průchodu klávesnicí a čtečkou (VoiceOver nebo NVDA); jinak „částečný soulad“ s výčtem výjimek.

**Fotografie s označením.** Obrazy vytvořené umělou inteligencí (`design/obrazky/foto/`) nesou vždy viditelnou poznámku „Ilustrační fotografie vytvořená umělou inteligencí“ (v popisku `figcaption` pod obrazem, ne jen v alt textu) a alt text s popisem obsahu. Komponenta `FotoAi` tuto poznámku přidává povinně a test hlídá, že žádná fotka není bez ní. Zda to vyžaduje čl. 50 odst. 4 AI Actu, je [OVĚŘIT], označujeme vždy. Fotografie z fotobanky jsou zakázané.

**Značka a SVG.**
- Z PNG v `brand/` vyrob SVG: `znak` (monogram CK v rámečku se seříznutými rohy vlevo nahoře a vpravo dole), `nazev` (CodeKom) a `logo` (znak, název, heslo) v černé a bílé. Postup: prahování a vektorizace (potrace nebo autotrace), vyčištění (SVGO, jedna cesta na tvar, `viewBox`, bez rastrových vložek), rámeček znaku nakresli ručně jako cestu se stejnou tloušťkou čáry jako originál. Ověř návrat do rastru: SVG vykresli na velikost PNG a porovnej s originálem (podíl odlišných pixelů pod 1 % u znaku, pod 2 % u názvu). Uložit do `brand/svg/` a zkopíruj do `apps/prezentace/public/brand/`. Do `brand/README.md` doplň, co vzniklo, a přesuň větu o chybějícím SVG do hotového.
- Font: název vypadá jako geometrický bezpatkový font typu Montserrat, přesný font a řez [OVĚŘIT u zakladatele]. Do potvrzení se nadpisy sází Montserratem 500 a 600 (soubor pod licencí OFL), tělo Inter 400 a 500, nikde těžší než 600. Název v logu zůstává vektorový z PNG. Zkus překrytí SVG a vykresleného Montserratu a výsledek zapiš do `docs/rozhodnuti.md`.
- Favicon: `icon.svg` (bílý monogram na černém čtverci; pod 24 px jen písmena CK bez rámečku, v souladu s `brand/README.md`), `favicon.ico` 16/32/48, `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`, `manifest.ts`.
- OpenGraph: `opengraph-image.tsx` 1200 × 630, černé pozadí, bílé logo s heslem, vlastní písmo ze souboru; `/ukazky/[klic]` má obrázek se snímkem šablony. Každá stránka má `title` (do 60 znaků), `description` (do 155), `canonical`, `og:locale cs_CZ`.
- Dodrž pravidla loga z `brand/README.md` (černá a bílá, volné místo, bez natahování a stínů, znak aspoň 24 px).
</funkce>

<pravidla>
**Tvrdá pravidla pro texty (kontroluje `scripts/kontrola-obsahu`, build selže):**
- Heslo je přesně `Tvoříme kódy pro lidi.` včetně tečky a nikde se neupravuje (žádné „Tvoříme kód pro lidi“, žádné psaní velkými písmeny, žádné přidání vykřičníku). Tečka je výjimka z pravidla o popiscích bez tečky.
- Zakázáno: vykřičník, emoji, šipka „→“, řetězce „A · B“, nadpisy psané velkými písmeny, přívlastky „revoluční“, „inovativní“, „nejlepší“, „komplexní řešení“, slova „pokuta“, „sankce“, „penále“, „garantujeme“, „zaručujeme dotaci“, procento úspory, počet obcí nebo uživatelů bez záznamu v registru tvrzení.
- Jména konkurence se na webu nevyskytují (Munipolis, Mobilní rozhlas, Vismo, WEBHOUSE, Galileo, Antee, Obce na webu a další), ani v metadatech a klíčových slovech. Rozlišení stojí na tom, co CodeKom dělá: jeden systém místo několika dodavatelů, data v EU a AI server v ČR, přístupnost ve výchozím stavu, nesmazatelná evidence úřední desky, cena viditelně a férové podmínky (výpověď kdykoli, export zdarma).
- Každé číslo, zákon nebo termín na webu má řádek v `docs/tvrzeni-prezentace.md` (tvrzení, stránka, zdroj, datum, stav). Registr vznikne z `obsah/prezentace/tvrzeni.md` (skript `tvrzeni-z-obsahu`), doplníš do něj jen to, co v MDX přibylo (například ceny se stavem `orientacni`), a build selže, když v textu stojí číslo nebo předpis bez řádku. Věty ve stavu `neovereno` zůstanou v textu zvýrazněné jako [OVĚŘIT].
- Zbylé `[DOPLNIT: …]` a `[OVĚŘIT]` v zobrazených textech se vždy vykreslí zvýrazněně, aby je zakladatel našel. `scripts/kontrola-doplnit` je spočítá a vypíše (soubor, řádek) a končí varováním; s přepínačem `--prisne` končí chybou, ten se použije před budoucím nasazením.
- Kde v `obsah/prezentace/` text chybí, nic nevymýšlej a nech `[DOPLNIT: co]`.
- Odkazy na předpisy vedou na e-Sbírku a mají datum ověření (zákony č. 99/2019, 106/1999, 134/2016, 340/2015, 480/2004 § 7, 127/2005 § 89 odst. 3, 264/2025 Sb., vyhláška č. 515/2020 Sb., čl. 28 GDPR, čl. 50 AI Actu).

**Pravidla unslop** (Damir Sokolovsky, CC BY 4.0, viz `CLAUDE.md`): řezy do 600, věty velkým písmenem a bez vykřičníku, krátké popisky bez tečky, žádné přechody, záře, stíny ani emoji, mřížka po 4 px, tenké linky. Navíc:
- Značka je černobílá, takže rozhraní má jen černou, bílou a stupně šedi (text na bílé nejméně `#595959` pro 4,5 : 1). Jediný „akcent“ je podtržení odkazů a plná černá tlačítka. Barvy mají jen snímky šablon a vzorky palet (a fotografie).
- Místo kartiček ze SaaS šablon: seznamy s tenkými linkami, tabulky, dvousloupcové texty, velký řádkový text. Žádné ikonky v kolečku, žádné „tři karty vedle sebe s ikonou“, žádný hrdinský obrázek s přechodem.
- Obrazy jsou snímky šablon, schémata v SVG a hotové fotografie z `design/obrazky/foto/` vytvořené umělou inteligencí, vždy s poznámkou podle sekce funkce. Žádná fotografie z fotobanky.
- Tón: věcně, oslovení „vy“, krátké věty, konkrétní podstatná jména („úřední deska“, ne „digitální transformace“). Každá věta musí unést otázku starosty „kde to je napsané“.

**Jak obce nakupují:** rada nebo zastupitelstvo podle výše částky a směrnice, písemná nabídka a návrh smlouvy, rozpočet na konci roku. Ceník a Ke stažení proto nabízejí podklady k přeposlání radě. Limit zakázky malého rozsahu u služeb je z paměti 2 000 000 Kč bez DPH podle § 27 zákona č. 134/2016 Sb., NEOVĚŘENO (viz overit); po ověření jen ve větě „roční cena služby bývá hluboko pod limitem“.
</pravidla>

<design_a_pristupnost>
- Layout: sloupec textu 640 px, širší prvky do 1 120 px, okraje 16 px na 375 px, mřížka 4 px. Text 17 px, řádkování 1,55; h1 40 px (na 375 px 32 px), h2 28 px, h3 20 px, Montserrat 600.
- Navigace: logo vlevo, 6 odkazů a tlačítko „Napište nám“ (vede na Kontakt); pod 768 px tlačítko Menu (`<details>` nebo `button` s `aria-expanded`), navigace dosažitelná i bez JavaScriptu; první odkaz „Přeskočit na obsah“.
- Fokus: viditelný vždy, 3 px, kontrast 3 : 1 proti okolí (na bílém černý, na černém bílý), neztratí se pod sticky hlavičkou (`scroll-margin-top`).
- Cíle dotyku nejméně 44 × 44 px včetně odkazů v patičce a tabulkách. Odkazy podtržené, rozlišitelné od textu i bez barvy.
- Kontrast textu aspoň 4,5 : 1 (velký text 3 : 1), prvky rozhraní 3 : 1.
- Pohyb: žádná animace nutná k porozumění, `prefers-reduced-motion` vypíná přechody.
- Kalkulačka: viditelné popisky nad poli (ne placeholder), `autocomplete` kde dává smysl, povinná pole označená slovy, výsledek v `aria-live="polite"`.
- Tabulky: `<caption>`, `<th scope>`, na 375 px vodorovné posouvání v popsaném kontejneru nebo přeskládání do seznamu; stránka nikdy neposouvá vodorovně.
- Galerie: tlačítka palet jsou skupina s popiskem „Barevná varianta“, změna se oznámí přes `aria-live`. Snímky a fotky mají `width` a `height`, `loading="lazy"` kromě prvního.
- Struktura: `lang="cs"`, unikátní `<title>` a jedna `h1`, nadpisy bez přeskakování úrovní, `<main>`, `<nav aria-label>`, `<footer>`.
- Rychlost (měří se lokálně na produkčním buildu, `next start`): na mobilu Lighthouse Performance, Accessibility, Best Practices a SEO každý 95 a víc; LCP do 2,5 s, CLS do 0,05, celkový JavaScript první stránky do 100 kB gzip. Obrázky `next/image` ve WebP/AVIF, písma s `font-display: swap` a předběžným načtením jen dvou řezů.
- SEO: v nadpisech a textech přirozeně „web pro obec“, „elektronická úřední deska“, „hlášení obce do mobilu“, „aplikace pro občany obce“, „přístupnost webu obce“, „povinně zveřejňované informace“; objemy hledání jsou NEOVĚŘENO, podle odhadu nepiš. JSON-LD: `Organization` na úvodu (jen ověřené údaje, IČO [DOPLNIT]), `Service` na Ceníku s cenou jen jako orientační „od“ (`priceSpecification` s `minPrice`) a bez označení za závaznou nabídku, `FAQPage` u otázek; žádné `aggregateRating` ani `review` (recenze neexistují). `sitemap.xml`, `robots.txt`, kanonické adresy; adresa webu z `NEXT_PUBLIC_SITE_URL`.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Web nesbírá žádné údaje: žádný formulář, žádné cookies, žádné měření, žádné požadavky na cizí původ. Kontakt je telefon, e-mail a `mailto:`.
- Žádné skripty třetích stran. Žádné `iframe` s ukázkou, jen odkazy.
- V klientu jen `NEXT_PUBLIC_*`. `.env` v `.gitignore`, `.env.example` s popisem proměnných.
- Odkazy ven mají `rel="noopener noreferrer"`. CSP bez `unsafe-eval` a bez `unsafe-inline` u skriptů (nonce nebo hash podle Next 16, ověř v dokumentaci).
- Seznam podzpracovatelů na webu je shodný s přílohou B2. Pokud se liší, platí příloha B2 a rozdíl zapiš do závěru.
</bezpecnost_a_soukromi>

<testy>
Nástroje: Vitest (data, kontrola obsahu, kalkulačka), Playwright (viewporty 375 a 1280), `@axe-core/playwright`, Lighthouse CI (`@lhci/cli`, lokálně nad `next start`), kontrola odkazů (vlastní skript nad `out`/`.next` nebo `lychee`).

1. **Playwright, klíčové cesty** (375 a 1280 px):
   - Úvod: 3 až 4 snímky šablon; odkaz „Prohlédnout živou ukázku Javoří Lhoty“ a „Vyzkoušet aplikaci“ jsou jen s vyplněnými `NEXT_PUBLIC_DEMO_URL` a `NEXT_PUBLIC_APP_DEMO_URL`, jinak zůstanou snímky.
   - Ceník: každá cena je „od“ a má štítek „orientační cena, přesnou pošleme v nabídce“ s datem; změna velikosti a úrovně přepočítá výsledek („orientačně od“) a ohlásí ho `aria-live`; podmínky z A jsou na stránce; v textu není založení 9 900 Kč ani pilot zdarma.
   - Ukázky: detail šablony, přepnutí palet změní snímek, alt a `aria-pressed`; odkaz do dema má tvar `?sablona=<klic>&paleta=<0–2>` a je jen s `NEXT_PUBLIC_DEMO_URL`.
   - Kontakt: stránka nemá `<form>`, odkaz `mailto:` má předvyplněný předmět; Playwright neeviduje žádný požadavek mimo vlastní původ.
   - Fotografie: každá fotka z `design/obrazky/foto/` má viditelnou poznámku „Ilustrační fotografie vytvořená umělou inteligencí“ a alt text.
   - Ke stažení: 5 PDF vrací 200 a `application/pdf`; hlavičku a patičku lze projít jen klávesnicí.
2. **axe:** všechny stránky ze sitemapy, tagy WCAG 2.0, 2.1 a 2.2 A a AA a best-practice, nula chyb.
3. **Lighthouse CI:** `lighthouserc.json` se spuštěním `next start`, mobilní profil, 3 běhy, prahy 0,95 pro čtyři kategorie, LCP a CLS podle sekce design; úvod, Ceník, Ukázky, detail šablony, Kontakt.
4. **Odkazy:** interní odkazy a kotvy vrací 200; externí (zákony, výzvy) se kontrolují zvlášť a selhání je varování, ne pád buildu.
5. **Obsah:** `scripts/kontrola-obsahu` (zakázaná slova a znaky, přesné heslo, jména konkurence, `%` bez záznamu v registru, řádek `overeno` bez zdroje a data, řádek `orientacni` bez zdroje a data) a `scripts/kontrola-doplnit`, oboje s Vitest testy kladných i záporných příkladů. Test, že se v kódu ani v textech nevyskytuje `CENIK_ZVEREJNIT`.
6. **Logo:** test porovnání SVG s PNG (podíl odlišných pixelů), test, že favicon soubory existují a mají správné rozměry.
7. **Příkazy:** `pnpm typecheck`, `lint`, `test`, `e2e`, `a11y` plus `pnpm lighthouse`, `odkazy`, `obsah`, z `apps/prezentace` i přes Turborepo.
</testy>

<postup>
Na začátku napiš plán a seznam úkolů (`docs/progress-prezentace.md`) a průběžně odškrtávej. Každý milník končí kontrolami a commitem česky v rozkazovacím způsobu. Na nic se neptej: co chybí, je `[DOPLNIT]`, rozhodnutí zapiš do `docs/rozhodnuti.md`.

1. Základ: aplikace v monorepu, Tailwind 4, černobílé tokeny, písma, hlavička, patička, `vercel.json` (fra1, nenasazovat), hlavičky zabezpečení, prázdné stránky z mapy.
2. Značka: SVG, favicon, OpenGraph, porovnání s PNG, `brand/README.md`.
3. Obsah a data: typy, zod, převzetí `obsah/prezentace/*.md` do MDX, registr tvrzení z `tvrzeni.md`, `kontrola-obsahu`, `kontrola-doplnit`.
4. Ukázky: generovaná data šablon, kopie snímků z `design/snimky/`, galerie, detail s paletami, odkazy do dema podle proměnných, fotky s označením.
5. Ceník a ke stažení: data se stavem `orientacni`, tabulka, kalkulačka, PDF, stránka nákupu.
6. Kontakt, právo, bezpečnost, dotace, přístupnost: stránky z `obsah/prezentace`, prohlášení, zásady a cookies odpovídající stavu webu (nic se nesbírá), přehled dotací z ověřených zdrojů.
7. SEO a rychlost: metadata, JSON-LD, sitemap, Lighthouse CI lokálně, doladění.
8. Předání: README (jak web spustit lokálně včetně nastavení `NEXT_PUBLIC_DEMO_URL` a `NEXT_PUBLIC_APP_DEMO_URL`, jak spustit kontroly a jak ho později nasadit na Vercel v regionu `fra1`: proměnné, doména [DOPLNIT], `pnpm kontrola:doplnit --prisne`), závěrečné kontroly. Nic se nenasazuje.

Prahy ani stránky neobcházej. Když Lighthouse nebo axe selže, oprav příčinu, nebo napiš, proč to nejde.
</postup>

<hotovo_kdyz>
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm e2e && pnpm a11y` v `apps/prezentace` projdou.
- [ ] `pnpm lighthouse` lokálně nad produkčním buildem: mobil, všech pět stránek, Performance, Accessibility, Best Practices a SEO každé 95 a víc.
- [ ] `pnpm obsah` a `pnpm odkazy` projdou. `pnpm kontrola:doplnit` vypíše všechna zbylá `[DOPLNIT]` a `[OVĚŘIT]` (soubor, řádek, počet), s `--prisne` končí chybou.
- [ ] Mapa webu odpovídá sekci funkce, všech 20 šablon má 3 palety a snímky z `design/snimky/`, přepínač jde ovládat klávesnicí.
- [ ] Texty stránek odpovídají `obsah/prezentace/*.md` beze změny smyslu a registr `docs/tvrzeni-prezentace.md` vznikl z `tvrzeni.md`.
- [ ] Odkazy „Prohlédnout živou ukázku“ a „Vyzkoušet aplikaci“ jsou jen při vyplněných `NEXT_PUBLIC_DEMO_URL` a `NEXT_PUBLIC_APP_DEMO_URL` ve tvaru `?sablona=<klic>&paleta=<0–2>`.
- [ ] `vercel.json` obsahuje `fra1`, hlavičky zabezpečení jsou nastavené, Playwright neeviduje požadavky mimo vlastní původ.
- [ ] Heslo „Tvoříme kódy pro lidi.“ je na webu přesně, texty neobsahují zakázané výrazy, jména konkurence ani procenta bez zdroje.
- [ ] SVG znak, název a logo existují v černé i bílé se shodou doloženou číslem, favicon sada a OpenGraph obrázky jsou vygenerované.
- [ ] Ceny jsou orientační „od“ přesně podle sekce ceník, každá má štítek a datum, v registru mají `stav: "orientacni"`; ceník ukazuje podmínky z A doslova; žádný výskyt `CENIK_ZVEREJNIT`.
- [ ] Každá fotografie z umělé inteligence má viditelnou poznámku a alt text; žádná fotografie z fotobanky.
- [ ] Web nesbírá nic: žádný formulář, cookies ani měření; zásady osobních údajů, cookies a prohlášení o přístupnosti odpovídají stavu webu.
- [ ] `docs/rozhodnuti.md` obsahuje volbu MDX, změnu řádku měření v D, výsledek porovnání fontu a odsunutí formuláře a newsletteru na později.
- [ ] README popisuje spuštění a pozdější nasazení. Nic z tohoto promptu nebylo nasazeno ani odesláno.
</hotovo_kdyz>

<overit>
Co rešerše neověřila (NEOVĚŘENO). Ověř, nebo nech v kódu označené `[OVĚŘIT]` a zobrazené zvýrazněně.

| Položka | Jak ověřit |
|---|---|
| Limit veřejné zakázky malého rozsahu u služeb (z paměti 2 000 000 Kč bez DPH podle § 27 zákona č. 134/2016 Sb.) a případná novela 2025–2026 | e-Sbírka (`e-sbirka.gov.cz`), `portal-vz.cz`, vzorová směrnice MV: `mvcr.cz/soubor/vnitrni-smernice-pro-zadavani-verejnych-zakazek-maleho-rozsahu-priklad-smernice-obce.aspx` |
| Výjimka obce z uveřejnění v registru smluv (§ 3 odst. 2 písm. k) zák. 340/2015 Sb.) | e-Sbírka, datum v registru tvrzení |
| Dotační výzvy 2026–2027 (NPO, IROP, Plzeňský kraj) | MMR factsheet `mmr.cz/getmedia/88941948-d5d9-4561-8646-9696559f9960/Factsheet-eGov.pdf.aspx`, `plzensky-kraj.cz/Framework/Document.ashx?ID=357856` a `ID=322073`, `mv.gov.cz/npo/clanek/jak-na-obecni-web.aspx` (dříve se nenačetla); zapiš jen přečtené |
| Ceny a funkce konkurence | na web nepatří; pro interní účely z veřejných smluv v registru smluv, do `docs/` s datem |
| Objemy klíčových slov | Marketing Miner nebo Sklik; do doby ověření žádné rozhodnutí o textech podle odhadu |
| Font logo | potvrdit u zakladatele; porovnání s Montserratem (překrytí) |
| Zda § 7 zák. 480/2004 Sb. dopadá na úřední adresy obcí; zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zák. 127/2005 Sb. | advokát; do té doby bez studených e-mailů a bez měření |
| Zda označení fotografií vytvořených umělou inteligencí vyžaduje čl. 50 odst. 4 AI Actu | advokát; do té doby se označuje vždy |
| Doba přizpůsobení šablony (návrh uvádí 5 pracovních dnů), doba migrace | zakladatel |
| Podzpracovatelé označení „ověřit“ v příloze B2 (Vercel region a mechanismus předání, push služby, e-mailová služba) | smlouvy a dokumentace dodavatelů; pokud neověříš, nech `[OVĚŘIT]` |
| Verze balíčků a CSP pro Next 16 | `npm view <balíček> version`; dokumentace Next.js (nonce, hash) |

Doplnit musí zakladatel: domény (prezentace, demo Javoří Lhota, záložní doména obcí), IČO, sídlo, kontakty (telefon, e-mail, adresa, úřední doba), jména a fotografie pro O nás, pilotní obce, rozdíl roční a měsíční platby, cenu pomoci s dotacemi.
</overit>

<zaver>
Na konci napiš shrnutí:
1. Co je hotové a čím: příkazy a výsledky, skóre Lighthouse (lokální), počet stránek v axe, podíl odlišných pixelů SVG proti PNG.
2. Co zbývá a proč.
3. Místa `[DOPLNIT]` a `[OVĚŘIT]`: soubor, řádek, počet.
4. Rozpory v podkladech k rozhodnutí zakladatele: 24měsíční smlouva a pilot zdarma proti smlouvě na dobu neurčitou (na web nedány), řádek měření v D, odlišnosti od přílohy B2, vynechané věty o formuláři a newsletteru v převzatých textech.
5. Jak web spustit lokálně a jak ho později nasadit (odkaz na README).
Nepiš, že je něco hotové, co kontroly neprošly. Nic nenasazuj a nic neodesílej.
</zaver>

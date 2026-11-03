# Web obcí: právní a funkční požadavky, konkurence, nákup a prodej (stav 3. 11. 2026)

POZNÁMKA K SPOLEHLIVOSTI: Výzkum byl omezen nástroji. Řada webů (mv.gov.cz, munipolis.cz, vismo.cz, zakonyprolidi) se nepodařilo načíst (chyba / robots). Co je níže v "Cited Findings", bylo skutečně načteno. Věci z paměti bez ověření jsou výslovně označeny "NEOVĚŘENO" a jsou jen v Inferences/Gaps. Před zadáním do promptů je nutné ověřit v e-Sbírce (e-sbirka.gov.cz) aktuální znění.

## 1. Povinně zveřejňované informace (vyhl. 515/2020 Sb., zák. 106/1999, 250/2000, 128/2000)

### Takeaway
Vyhláška 515/2020 Sb. předepisuje pevnou strukturu (Příloha č. 1, 14 hlavních položek) a osnovu popisu úkonů (Příloha č. 2). Web CodeKom musí mít modul, který generuje sekci "Povinně zveřejňované informace" přesně v tomto pořadí a s těmito názvy. Rozpočet, výhled a závěrečný účet se ve vyhlášce objevují v položce 8 (Dokumenty); detailní lhůty zveřejnění z 250/2000 se nepodařilo ověřit.

### Cited Findings
- § 1 vyhl. 515/2020: informace se zveřejňují ve struktuře Přílohy č. 1, v daném pořadí, s uvedenými názvy a úvodním textem. § 2: osnova popisu úkonů dle Přílohy č. 2. § 3 ruší vyhl. 442/2006 Sb. a 416/2008 Sb. — [epravo.cz, vyhl. 515/2020](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515)
- Příloha č. 1 (14 položek): 1 Název; 2 Důvod a způsob založení; 3 Organizační struktura; 4 Kontaktní spojení (4.1 poštovní adresa, 4.2 adresa úřadovny pro osobní návštěvu, 4.3 úřední hodiny, 4.4 telefonní čísla, 4.5 adresa internetové stránky, 4.6 adresa podatelny, 4.7 e-mail podatelny, 4.8 datová schránka); 5 Případné platby (čísla účtů); 6 IČO; 7 DIČ; 8 Dokumenty (8.1 seznamy hlavních dokumentů, 8.2 rozpočet); 9 Žádosti o informace; 10 Příjem podání a podnětů; 11 Předpisy (11.1 hlavní, 11.2 vydané); 12 Úhrady za poskytování informací (12.1 sazebník, 12.2 rozhodnutí nadřízeného orgánu); 13 Licenční smlouvy (13.1 vzory, 13.2 výhradní licence); 14 Výroční zpráva dle zák. 106/1999 — [epravo.cz, vyhl. 515/2020](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515)
- Příloha č. 2: cca 21 polí osnovy popisu úkonu (název, případ použití, účel/výsledek, lhůty, potřebné doklady, elektronická i neelektronická podání, poplatky, opravné prostředky, FAQ, sankce, zařazení agendy, klíčová slova, platnost, zápis do základního registru/AIS) — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515)
- Zdroj uvádí podpis 7. 12. 2020, vyhlášení 11. 12. 2020 (částka 211/2020), účinnost zobrazená jako 1. 8. 2021; § 4 textu mluví o 15. dni po vyhlášení — nesoulad zdroj nevysvětluje — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515)
- Zdroj neuvádí žádné novely vyhlášky (záložka Historie nebyla načtena) — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515)
- Obce publikují roční zprávy dle 106/1999 přes portál.gov.cz (modul crvz-106), tj. existuje centrální registr/portál pro zveřejňování — např. [portal.gov.cz obec Mokré](https://portal.gov.cz/moduly/crvz-106/q43a56s-obec-mokre/2025/prioha/1733)

### Inferences
- Spec: datový model "PovinneInformace" s 14 pevnými sekcemi + podpoložkami (4.1–4.8, 8.1–8.2, 11.1–11.2, 12.1–12.2, 13.1–13.2), pořadí a názvy neměnné, uživatel může editovat jen obsah. Šablona předvyplněná z dat obce (IČO, DS, adresa z RÚIAN/ARES).
- Spec: Příloha č. 2 jako strukturovaný formulář "Popis úkonu" (21 polí) — jde o největší pracnost pro malé obce, dobrý prodejní argument (předpřipravené popisy typických úkonů: poplatek za odpad, ohlášení psa, pronájem hrobového místa, ověření podpisu atd.).
- NEOVĚŘENO (z paměti): rozpočet obce, střednědobý výhled a závěrečný účet se dle § 11 a § 17 zák. 250/2000 Sb. zveřejňují způsobem umožňujícím dálkový přístup nejpozději 15 dnů před projednáním v zastupitelstvu (návrh) a po schválení nejméně do doby schválení dalšího dokumentu (typicky rozpočet po dobu roku/období, závěrečný účet min. 15 dní před projednáním a po schválení po dobu 6 let — tato čísla neověřena). Rozpočtové opatření, schválený rozpočet a výhled též v rozpočtové skladbě. → Spec musí dát toto k ověření v e-Sbírce.
- NEOVĚŘENO: dle § 95 odst. 2 zák. 128/2000 Sb. do 15 dnů od jednání zastupitelstva se zápis zveřejní na úřední desce (v té i el.) + usnesení; zápisy se publikují bez osobních údajů nad rámec nutného. Ověřit.

### Gaps
- Aktuální znění § 11 a § 17 zák. 250/2000 (lhůty, doba zveřejnění) a § 95/§ 16 zák. 128/2000 — zakonyprolidi/e-sbírka nebyly dostupné.
- Případné novely 515/2020 po r. 2021 a vysvětlení rozporu v datu účinnosti.
- Sankce za nezveřejnění dle 106/1999 (přestupek?) neověřeno.

## 2. Elektronická úřední deska (§ 26 správního řádu, evidence, osobní údaje)

### Takeaway
Úřední deska musí být nepřetržitě veřejně přístupná a navíc způsobem umožňujícím dálkový přístup; rozhodující je prokazatelná evidence vyvěšení a sejmutí (NSS 2 As 47/2016). Přesné lhůty (15 dnů) a limity osobních údajů je třeba dohledat.

### Cited Findings
- Každý správní orgán zřizuje úřední desku, která musí být nepřetržitě přístupná veřejnosti; obsah se zveřejňuje také způsobem umožňujícím dálkový přístup (elektronická úřední deska) — [Právní prostor, Archivace elektronické úřední desky (J. Kasl, 2016)](https://www.pravniprostor.cz/clanky/spravni-pravo/archivace-elektronicke-uredni-desky)
- Písemnost doručovaná veřejnou vyhláškou se považuje za doručenou 15. dnem po vyvěšení; od té doby běží např. odvolací lhůty — [Právní prostor](https://www.pravniprostor.cz/clanky/spravni-pravo/archivace-elektronicke-uredni-desky)
- Dle rozsudku NSS č.j. 2 As 47/2016 musí úřad elektronické vyvěšení náležitě evidovat a umět prokázat jeho zákonnost; mazání dokumentů po uplynutí lhůty bez záznamu je problematické; účastník může požádat o prokázání vyvěšení — [Právní prostor](https://www.pravniprostor.cz/clanky/spravni-pravo/archivace-elektronicke-uredni-desky)
- Zdroj NEobsahuje text § 26, přesnou dobu uchování ani pravidla pro osobní údaje (stejný zdroj).
- ÚOOÚ zveřejňuje na uoou.gov.cz řadu rozhodnutí/přípisů týkajících se úředních desek (např. rozhodnutí vůči obci Husinec) — nebylo čteno do hloubky: [ÚOOÚ obec Husinec](https://uoou.gov.cz/media/poskytnute-informace/2016/16122016/sr14-09755-an-obec-husinec-rozhodnuti.pdf)

### Inferences
- Spec (evidenční minimum, odvozeno z NSS): každý záznam desky = {název, původce, datum vyvěšení, datum sejmutí (nejdříve 15. den), kdo vložil, hash souboru, verze}; audit log neměnný (append-only); po sejmutí dokument zůstává uchován interně (archiv) a nesmí se fyzicky smazat; veřejně dostupný archiv jen pokud to zákon dovoluje (osobní údaje!).
- Spec: strojově čitelný export (např. RSS/JSON) a napojení na Národní úřední desku? — NEOVĚŘENO, ověřit existenci "otevřená data úředních desek" (vyhl. o formátu otevřených dat úředních desek existuje z paměti, nepotvrzeno).
- NEOVĚŘENO (z paměti): § 26 odst. 1 SŘ — veřejná vyhláška vyvěšena po dobu 15 dnů, na elektronické desce též; § 26 odst. 2 — písemnost lze doručit též jen zveřejněním na el. desce při doručování veřejnou vyhláškou. Ověřit.
- Osobní údaje: ve výchozím stavu nutit anonymizační checklist před zveřejněním (rodná čísla, adresy fyzických osob, čísla účtů, data narození); ÚOOÚ doporučení sejmutí = přestat zveřejňovat (neověřeno).

### Gaps
- Text § 26 SŘ a § 26 odst. 2 (zveřejňování na el. desce, délka), úřední stanovisko ÚOOÚ k archivaci po sejmutí — nedohledáno (zdroje nečteny).
- Metodika MV k elektronickým úředním deskám (mvcr.cz) nenačtena (mv-113940-2-as-2020 se objevil ve výsledcích: https://mvcr.cz/soubor/mv-113940-2-as-2020.aspx, nečteno).

## 3. Přístupnost (zákon 99/2019 Sb.)

### Takeaway
Obce (územní samosprávné celky) jsou povinným subjektem. Zákon odkazuje na EN 301 549; metodický pokyn DIA požaduje EN 301 549 V3.2.1 na úrovni A–AA (tj. WCAG 2.1 A+AA). Prohlášení o přístupnosti je povinné a musí být na každé stránce odkazované. Cílit na WCAG 2.1 AA minimálně, doporučeno 2.2 AA jako rezerva.

### Cited Findings
- Povinné subjekty zahrnují stát, územní samosprávné celky, dobrovolné svazky obcí, školy aj. (§ 3) — [epravo.cz, zák. 99/2019](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- § 4: stránky musí být vnímatelné, ovladatelné, srozumitelné a stabilní (POUR). § 5–6: shoda se předpokládá při splnění harmonizovaných norem uveřejněných v Úředním věstníku EU; jinak EN 301 549 V1.1.2 (2015-04) dle textu zákona — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- § 7: nepřiměřená zátěž — subjekt posuzuje podle velikosti, povahy, zdrojů, nákladů; musí případně poskytnout náhradní řešení — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- § 8: prohlášení o přístupnosti — na každé stránce v přístupném formátu: rozsah souladu, důvody nesouladu, náhradní řešení, postup při podezření na nesoulad; lze mít na jedné stránce odkazované z ostatních — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- § 9: podnět k nápravě může podat každý. § 10–12: dozor DIA, zpráva Komisi každé 3 roky, opatření k nápravě s lhůtou max. 6 měsíců (§ 11) — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- Termíny: nové weby od 23. 9. 2019, staré od 23. 9. 2020, mobilní aplikace od 23. 6. 2021 — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- Vyloučeno: mapy (kromě náhradního řešení pro navigační mapy), archiválie, živé vysílání, přejatý obsah, který subjekt nekontroluje — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- Metodický pokyn DIA (v1.6/1.7): vyžaduje EN 301 549 V3.2.1, kap. 9, úroveň A–AA; obsahuje vzor prohlášení (Příloha 2) — [DIA metodický pokyn v1.6](https://www.dia.gov.cz/wp-content/uploads/2023/06/Metodicky_pokyn_-_pristupnost_internetovych_stranek_a_mobilnich_aplikaci_v1-6-DIA.pdf); novější verze 1.7: [DIA v1.7](https://www.dia.gov.cz/media/2134/download/Metodick%C3%BD%20pokyn%20%E2%80%93%20p%C5%99%C3%ADstupnost%20internetov%C3%BDch%20str%C3%A1nek%20a%20mobiln%C3%ADch%20aplikac%C3%AD%20v_1_7.docx) (nečteno)
- Zdroj (epravo) ukazuje text jen "od 1. 4. 2023" a NEobsahuje ustanovení o sankcích/přestupcích — [epravo.cz](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99)
- Průvodce prohlášením o přístupnosti (DIA): [DIA průvodce](https://www.dia.gov.cz/media/3013/download/Pr%C5%AFvodce%20Prohl%C3%A1%C5%A1en%C3%ADm%20o%20p%C5%99%C3%ADstupnsoti_v_1.pdf) (nečteno)

### Inferences
- Spec: CodeKom musí (a) generovat prohlášení o přístupnosti per obec z šablony DIA (pole: datum, stav souladu úplný/částečný/nesoulad, nepřístupný obsah, důvody, náhradní řešení, datum přípravy a posledního přezkumu, kontakt, postup při podezření na nesoulad / odkaz na DIA), (b) odkaz v patičce každé stránky, (c) testy v CI: axe-core + Pa11y + manuální checklist; (d) editor vynucuje alt texty, hierarchii nadpisů, kontrasty barev v 20 šablonách, PDF přístupnost varování.
- Doporučení: cíl WCAG 2.2 AA (zpětně kompatibilní s 2.1) — v rozporu s právním minimem se tak nic nekazí; EN 301 549 V3.2.1 = WCAG 2.1. NEOVĚŘENO: že by v listopadu 2026 byla nová verze EN 301 549 (v3.3.1/4.x) harmonizována v OJ EU — sledovat.
- Argument prodeje: pokuty/sankce nejsou ověřeny; riziko je spíš kontrola DIA a nápravná opatření; vyvarovat se tvrzení o pokutách v marketingu.

### Gaps
- Sankce (přestupky) — v načteném textu nejsou; NEOVĚŘENO, zda existují.
- Aktuální stav EN 301 549 / harmonizace po 2025, novela zákona (EU Evropský akt o přístupnosti nemění pro weby veřejné správy).
- Rozdíl v. 1.6 vs 1.7 metodiky a obsah vzoru prohlášení nepřečten.

## 4. Cookies a analytika (§ 89 odst. 3 zák. 127/2005)

### Takeaway
Od 1. 1. 2022 je ukládání/čtení dat v koncovém zařízení se souhlasem, s výjimkou nezbytných. Konkrétní výklad ÚOOÚ k analytice bez souhlasu se nepodařilo ověřit.

### Cited Findings
- Zákon č. 127/2005 (novela s účinností od 2022) zavádí princip opt-in pro cookies — [epravo.cz, Cookies nově jen se souhlasem](https://www.epravo.cz/top/clanky/cookies-nove-jen-se-souhlasem-poslanecka-snemovna-prijala-zprisnujici-pravidla-od-roku-2022-113207.html) (pouze název článku z výsledků, obsah nečten)
- Existují rozhodnutí/příkazy ÚOOÚ k cookies (např. [ÚOOÚ příkaz 2025](https://uoou.gov.cz/media/poskytnute-informace/2025/1292025/prikaz-cj-uoou-0248222-9.pdf)) — nečteno

### Inferences
- Spec (konzervativní): web obce používá jen nezbytné cookies (session editoru, CSRF) + analytiku bez cookies (self-hosted Plausible/Umami, bez ukládání identifikátoru do zařízení, IP anonymizovaná) → cookie banner nepotřebný pro návštěvníky. Žádné Google Fonts/YouTube/mapy z třetích zemí bez 2-click řešení. Důvod: prodejní argument "bez cookie lišty" a zjednodušení pro obec.
- NEOVĚŘENO: že měření bez zápisu do zařízení spadá mimo § 89 odst. 3 — v ČR názor ÚOOÚ k tomu nebyl ověřen; držet se "bez cookies/localStorage/fingerprintu".

### Gaps
- Přesné znění § 89 odst. 3 a výjimky; oficiální stanovisko ÚOOÚ k statistickým cookies.

## 5. gov.cz Design System (DIA)

### Takeaway
Aktivní, verzovaný (4.7.3), licence EUPL v1.2, podporuje React. Povinnost JVS od 30. 4. 2026 se podle načtené stránky týká ústřední státní správy, ne obcí; pro obce zřejmě dobrovolné.

### Cited Findings
- Verze 4.7.3, správce Digitální a informační agentura, kontakt design@dia.gov.cz — [designsystem.gov.cz](https://designsystem.gov.cz)
- Licence EUPL v1.2 — [designsystem.gov.cz](https://designsystem.gov.cz)
- Vývojářská sekce uvádí React, HTML, Angular, Vue — [designsystem.gov.cz](https://designsystem.gov.cz)
- Povinnost JVS (jednotný vizuální styl) od 30. 4. 2026 se uvádí pro orgány ústřední státní správy; obce nejsou výslovně zmíněny; stránka "Pro koho je design systém povinný" nebyla načtena — [designsystem.gov.cz](https://designsystem.gov.cz)

### Inferences
- Doporučení: použít jako základ tokenů a komponent (přístupnost), ale 20 šablon musí umožnit odlišnou identitu obce (znak, barvy) — neužívat gov.cz logo/lištu, které by mohly sugerovat státní web (NEOVĚŘENO pravidla užití znaku).
- EUPL v1.2 je copyleft (slabý, kompatibilní s řadou licencí) — pro SaaS nutné prověřit povinnosti při úpravách komponent (právník).

### Gaps
- Stránka "Pro koho je povinný", pravidla užití log/znaku, závazná podoba pro obce.

## 6. Konkurence (CZ weby obcí)

### Takeaway
Nepodařilo se načíst weby konkurentů ani ceníky (munipolis.cz chyba, vismo.cz blokuje roboty). Ceny nelze citovat. Na trhu jsou dle znalosti Vismo (WEBHOUSE), Galileo (Galileo Corporation), Munipolis, Antee (CMS pro města), Obce na webu — všechna tvrzení o nich NEOVĚŘENA.

### Cited Findings
- Žádný ověřený ceník ani popis funkcí konkurentů nebyl získán. Hledání ceny "web obce cena měsíčně" nevrátilo použitelné zdroje (mj. Inovační komise Roztoky 2023 — dokument nečten: [Roztoky komise 05/2023](https://archiv.roztoky.cz/Z%C3%A1pisy%20z%20v%C3%BDbor%C5%AF%20a%20komis%C3%AD/Komise%20pro%20digitalizaci%20a%20inovace/2023%20Komise%20pro%20digitalizaci%20a%20inovace/2023-05%20Inova%C4%8Dn%C3%AD%20komise.docx))
- Veřejné zakázky/smlouvy obcí o webu lze dohledat v registrech smluv (Slovenský crz.gov.sk výsledky jsou nerelevantní; pro ČR použít smlouvy.gov.cz / registr smluv obcí).

### Inferences
- Doporučená akce pro Claude Code/řešitele: ruční rešerše 8–10 konkurenčních webů (vismo.cz, galileo.cz, munipolis.cz, antee.cz, obcenawebu.cz, webnode obce?, ObecniWeb, Kdyne/Mobilní rozhlas "Mobilní rozhlas" (Mobile Rozhlas, hlášení občanům), Hlášení rozhlasu "mobilní rozhlas", "Munipolis app", "Moje obec"/"Chytrá obec") a export ceníků z registru smluv. Ve specifikaci uvést jako povinný kontrolní krok, ne jako fakt.
- Pravděpodobné srovnávací dimenze marketing webu: moduly, ceny ("od X Kč/měs"), reference (počet obcí), demo, přístupnost, hosting v ČR/EU, migrace dat, ukázky webů.

### Gaps
- Veškeré konkrétní ceny a funkce konkurentů; free trial; struktura jejich marketingových webů.

## 7. Jak obce nakupují (ZZVZ, rozpočet, kanály, dotace)

### Takeaway
Od 1. 1. 2026 se změnily finanční limity ZZVZ pro nadlimitní zakázky (3 491 000 Kč / 5 386 000 Kč pro služby). Limit VZMR a vnitřní směrnice obce se nepodařilo ověřit. Dotační zdroje identifikovány jen odkazy, bez ověřeného obsahu.

### Cited Findings
- Od 1. 1. 2026 nové limity EU: služby § 4 odst. 1 a)–c) 3 491 000 Kč (dříve 3 494 000); § 4 odst. 1 d)–e), odst. 2 a 5 5 386 000 Kč (dříve 5 401 000); dodávky stejně; stavební práce 134 764 000 Kč — [API agentura, nové finanční limity od 1.1.2026](https://apiagentura.gov.cz/wp-content/uploads/2025/12/nove-financni-limity-od-1.1.2026.pdf) (stránka neuvádí VZMR)
- MV poskytuje vzor vnitřní směrnice pro zadávání VZMR obce — [MV vzor směrnice](https://mvcr.cz/soubor/vnitrni-smernice-pro-zadavani-verejnych-zakazek-maleho-rozsahu-priklad-smernice-obce.aspx) (nečteno)
- Dotační zdroje, které se objevily ve vyhledávání (nečteno): Plzeňský kraj dotační dokumenty [PK 357856](https://www.plzensky-kraj.cz/Framework/Document.ashx?ID=357856), [PK 322073](https://www.plzensky-kraj.cz/Framework/Document.ashx?ID=322073); MMR Factsheet eGov [MMR](https://www.mmr.cz/getmedia/88941948-d5d9-4561-8646-9696559f9960/Factsheet-eGov.pdf.aspx?ext=.pdf); MV NPO "Jak na obecní web" (stránka se nepodařilo načíst): https://mv.gov.cz/npo/clanek/jak-na-obecni-web.aspx

### Inferences
- NEOVĚŘENO (z paměti): limit VZMR dle § 27 ZZVZ je 2 000 000 Kč bez DPH pro služby a dodávky, 6 000 000 Kč pro stavební práce; zakázky pod limitem nepodléhají zákonu, ale § 6 zásady (transparentnost, přiměřenost) platí; ruční zadání do cca 100–200 tis. Kč dle směrnice obce (různé). Typická roční cena SaaS pro obec do 2 000 obyv. (tisíce až desítky tisíc Kč) je hluboko pod limitem → rozhoduje starosta/rada obce, ne soutěž. Ověřit v e-Sbírce.
- Spec prodeje: cenu držet pod typickými limity přímého zadání (zjistit dle vzorové směrnice MV); roční fakturace; smlouva do registru smluv (zák. 340/2015 — povinnost zveřejnění; NEOVĚŘENO limit 50 tis. Kč bez DPH). Nabídka s "podkladem pro rozhodnutí rady/zastupitelstva" (šablona usnesení, cenová nabídka, DPA).
- Prodejní kanály (NEOVĚŘENO, jen logika): SMO ČR (smocr.cz), SPOV (spov.org), MAS regiony Plzeňského kraje, ISSS (Hradec Králové), Moderní obec, krajské Sdružení místních samospráv; webináře pro starosty; reference jako signál.
- Dotace 2026–2027 (NEOVĚŘENO): NPO digitalizace obecních webů MV (konec 2025/2026?), IROP, programy PK — nutno ověřit příjem žádostí; v marketingu pouze "pomůžeme s podklady", ne garantovat.

### Gaps
- Aktuální limity VZMR (§ 27 ZZVZ) a jejich případná novela 2025/2026 (epravo sb/2025/541 se objevil ve výsledcích — nečteno, nutné prověřit zda se týká ZZVZ).
- Konkrétní dotace 2026–2027 (NPO, IROP výzvy, Plzeňský kraj: programy pro obce) — dokumenty nalezeny, ne přečteny.
- Délka prodejního cyklu, rozpočtový cyklus (rozpočet na rok schvalován typicky 11–12/N-1, NEOVĚŘENO), sdružení SMO/SPOV podmínky spolupráce.

## 8. Důvěryhodnost a klíčová slova pro starosty

### Takeaway
Bez ověřených zdrojů; níže jsou pouze návrhy k validaci.

### Cited Findings
- Žádné ověřené zdroje (research tohoto bodu neproběhl).

### Inferences
- Trust signals pro marketing web: reference (jména obcí, počet), data v EU/ČR (Supabase EU region; uvést přesný region), zpracovatelská smlouva (DPA dle čl. 28 GDPR) ke stažení, prohlášení o přístupnosti vlastního webu CodeKom, exit podmínky (export všeho v otevřených formátech do 30 dnů, bez poplatku), SLA a podpora (lhůty, telefon, v češtině), cena viditelně, bez závazku/trial.
- Hledaná klíčová slova (ověřit v Marketing Miner/Sklik): "web pro obec", "webové stránky obce", "elektronická úřední deska", "úřední deska obec řešení", "přístupnost webu obce", "hlášení rozhlasu SMS", "web obce zdarma/cena", "povinné informace obec vyhláška 515/2020", "prohlášení o přístupnosti obec vzor".
- Struktura marketing webu: hero s hlavní hodnotou + cena, funkce, ukázky 20 šablon (živá demo obec), compliance sekce (515/2020, 99/2019, 106/1999), ceník, reference, FAQ pro starosty/úředníky, formulář "Chci demo" + telefon.

### Gaps
- Celý bod: žádná data o chování a hledání starostů; žádné zdroje SMO/SPOV.

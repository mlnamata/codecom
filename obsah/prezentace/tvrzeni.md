---
title: "Registr tvrzení prezentačního webu CodeKom"
description: "Každé číslo, předpis a termín z textů prezentačního webu se zdrojem, datem a stavem ověření. Interní podklad, na webu se nezobrazuje."
adresa: "/interni/tvrzeni"
---

{/* Interní soubor. Prompt 06 z něj skriptem tvrzeni-z-obsahu vytvoří docs/tvrzeni-prezentace.md. Stránka se nepublikuje. */}

# Registr tvrzení

Stavy:

- `overeno`: údaj odpovídá zdroji, který jsme k uvedenému dni přečetli (text předpisu, vzorová smlouva, záznam rozhodnutí, data ukázky).
- `orientacni`: cena z návrhu platformy. Na webu stojí vždy se štítkem „orientační cena, přesnou pošleme v nabídce“ a s datem, ke kterému platí.
- `hypoteza`: vlastnost produktu podle návrhu, která ještě není postavená nebo změřená, nebo obecná zkušenost bez zdroje. Na webu je popsaná jako to, jak CodeKom navrhujeme.
- `neovereno`: zdroj jsme nepřečetli nebo údaj chybí. V textu je označený `[OVĚŘIT]`.

Zkratky zdrojů: A, B, D = části `docs/pravni-dokumenty.md` (návrhy ke kontrole advokátem). ZPL = konsolidované znění na zakonyprolidi.cz, přečtené 4. 11. 2026; před nasazením nahradit odkazem na e-Sbírku.

## Ceny

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
| Web Základ od 590 / 990 / 1 690 Kč měsíčně bez DPH (do 500 / 500–2 000 / 2 000–10 000 obyvatel) | cenik, uvod, faq | docs/navrh-platformy/04-admin-editor.md, 01-navrh-platformy.md | 2026-11-04 | orientacni |
| Web Pokročilý od 890 / 1 490 / 2 490 Kč měsíčně bez DPH | cenik | docs/navrh-platformy/04-admin-editor.md, 01-navrh-platformy.md | 2026-11-04 | orientacni |
| Web Advance od 1 490 / 2 290 / 3 790 Kč měsíčně bez DPH | cenik | docs/navrh-platformy/04-admin-editor.md, 01-navrh-platformy.md | 2026-11-04 | orientacni |
| Digitální úřad od 600 / 1 000 / 2 000 Kč měsíčně bez DPH | cenik | docs/navrh-platformy/01-navrh-platformy.md | 2026-11-04 | orientacni |
| Chytré budovy od 390 Kč měsíčně za budovu | cenik | docs/navrh-platformy/01-navrh-platformy.md | 2026-11-04 | orientacni |
| Velikostní pásma obcí do 500, 500–2 000, 2 000–10 000 obyvatel | cenik, pro-koho, ukazky | docs/navrh-platformy/01-navrh-platformy.md | 2026-11-04 | overeno |
| Základ 3 uživatelé, Pokročilý 10, Advance neomezeně | cenik | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Pokročilý 3 podweby, Advance bez omezení | pro-koho | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Mobilní aplikace pro občany je ve všech úrovních | cenik | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| AI asistent je součástí úrovně Advance | cenik, co-umime, ukazky | docs/navrh-platformy/01-navrh-platformy.md, 04-admin-editor.md | 2026-11-04 | hypoteza |
| Změna šablony v úrovni Základ jednou ročně zdarma | ukazky | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Rozdíl mezi roční a měsíční platbou | cenik | chybí, [DOPLNIT] | – | neovereno |
| Cena SMS kreditů, cena pomoci s dotacemi | cenik, dotace | chybí, [DOPLNIT] | – | neovereno |

## Smlouva a podmínky

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
| Smlouva na dobu neurčitou, výpověď kdykoli i bez udání důvodu | cenik, faq, uvod, o-nas | A čl. 6 odst. 1 a 2 | 2026-11-04 | overeno |
| Výpovědní doba 3 měsíce u roční licence, 1 měsíc u měsíčního předplatného, od prvního dne měsíce po doručení | cenik, faq | A čl. 6 odst. 2 | 2026-11-04 | overeno |
| Zkušební doba 30 dní, při výpovědi vrácení celé ceny do 14 dní | cenik, faq, uvod | A čl. 4 | 2026-11-04 | overeno |
| U roční licence vrácení poměrné části za celé měsíce po skončení výpovědní doby; měsíční předplatné se nevrací | cenik | A čl. 6 odst. 6 | 2026-11-04 | overeno |
| Roční licence: faktura předem, splatnost 30 dní, doklad do datové schránky; měsíčně kartou, doklad e-mailem | cenik, faq | A čl. 3 odst. 2 | 2026-11-04 | overeno |
| Ceny bez DPH, DPH podle zákona, je-li poskytovatel plátcem | cenik | A čl. 3 odst. 3 | 2026-11-04 | overeno |
| Prodlení nad 30 dní po upomínce: režim jen pro čtení, deska, krizová hlášení a export fungují dál | cenik, faq, uvod | A čl. 3 odst. 5 | 2026-11-04 | overeno |
| Zvýšení ceny nejvýš jednou ročně o inflaci podle ČSÚ, oznámení 2 měsíce předem, možnost výpovědi | cenik | A čl. 3 odst. 4 | 2026-11-04 | overeno |
| Export dat zdarma, za ukončení se nic neplatí | cenik, faq, uvod, prechod, o-nas | A čl. 6 a čl. 9 odst. 1 | 2026-11-04 | overeno |
| Po skončení smlouvy 30 dní jen pro čtení | cenik, faq, prechod | A čl. 9 odst. 2 | 2026-11-04 | overeno |
| Export obsahu v JSON a CSV, soubory v původní podobě, deska se záznamy | prechod, faq | A čl. 9 odst. 1 | 2026-11-04 | overeno |
| Při přechodu k jinému dodavateli až 8 hodin práce zdarma | prechod, faq | A čl. 9 odst. 4 | 2026-11-04 | overeno |
| Obec smí po skončení dál používat texty, fotografie a strukturu webu | prechod | A čl. 7 odst. 3 | 2026-11-04 | overeno |
| Doména je vždy registrovaná na obec | prechod, faq | A čl. 7 odst. 4 | 2026-11-04 | overeno |
| Podpora e-mailem a telefonem v pracovní dny 8–16 hodin, kritické chyby nepřetržitě | prechod, faq | A čl. 5 odst. 3 | 2026-11-04 | overeno |
| Reakce a obnovení: kritická do 1 hodiny / do 8 hodin, vysoká do 4 pracovních hodin / do 2 pracovních dnů, běžná do 1 pracovního dne | prechod, faq | A čl. 5, tabulka | 2026-11-04 | overeno |
| Měsíční dostupnost nejméně 99,5 %, při nižší odpočet z ceny | prechod | A čl. 5 odst. 1 a 2 | 2026-11-04 | overeno |
| Obchodní podmínky jsou součástí smlouvy, obec podepisuje jeden dokument | ke-stazeni | A, úvod | 2026-11-04 | overeno |
| Smlouva o zpracování je příloha č. 3 smlouvy o službě | ke-stazeni | A čl. 10, čl. 12 odst. 4 | 2026-11-04 | overeno |
| Zařízení v budovách nejsou součástí měsíční ceny | co-umime, cenik | A čl. 1 odst. 4; 01-navrh-platformy.md (hardware jednorázově) | 2026-11-04 | overeno |
| Ruční zálohu budovy (klíč, topení na místě) zajišťuje obec | co-umime | A čl. 5 | 2026-11-04 | overeno |
| Krizová hlášení nenahrazují varovný systém IZS, sirény ani obecní rozhlas | co-umime, bezpecnost-a-pravo | A čl. 5; CLAUDE.md pravidlo 2 | 2026-11-04 | overeno |
| Obec odpovídá za obsah dokumentů a dodržení lhůt na desce | co-umime, bezpecnost-a-pravo | A čl. 8 odst. 4 | 2026-11-04 | overeno |
| Hlášení závady není úřední podání podle správního řádu | co-umime | E čl. 3 odst. 3 | 2026-11-04 | overeno |
| Doručení oznámení v aplikaci nejde zajistit vždy (vypnutý telefon, výpadek sítě) | co-umime | E čl. 5 odst. 1 | 2026-11-04 | overeno |

## Osobní údaje a bezpečnost

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
| U dat občanů je správcem obec, CodeKom zpracovatel podle čl. 28 GDPR; správcem jen u účtů v aplikaci a vlastního obchodu | bezpecnost-a-pravo, faq, ke-stazeni | B; docs/rozhodnuti.md 2. 11. 2026; CLAUDE.md | 2026-11-04 | overeno |
| Data v EU; Supabase v regionu AWS Frankfurt | bezpecnost-a-pravo, faq, uvod, o-nas | B příloha B2; https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq | 2026-11-02 | overeno |
| Vercel v regionu Frankfurt a mechanismus předání mimo EU | bezpecnost-a-pravo | B příloha B2 („ověřit“) | – | neovereno |
| Push služby Google a Apple: kde jsou data, předání | bezpecnost-a-pravo | B příloha B2 („ověřit“) | – | neovereno |
| E-mailová služba v EU | bezpecnost-a-pravo | B příloha B2 („[EU]“, „ověřit“) | – | neovereno |
| AI asistent běží na serveru v ČR | co-umime, bezpecnost-a-pravo, uvod, o-nas, faq | docs/rozhodnuti.md 27. 10. 2026; B příloha B3 | 2026-11-04 | hypoteza |
| Předání mimo EU jen podle kapitoly V GDPR a jen podzpracovatelům z B2 | bezpecnost-a-pravo | B čl. 2 odst. 8 | 2026-11-04 | overeno |
| Nový podzpracovatel oznámen 30 dní předem, námitka do 30 dní, možnost výpovědi | bezpecnost-a-pravo | B čl. 3 | 2026-11-04 | overeno |
| Porušení zabezpečení oznámíme do 24 hodin | bezpecnost-a-pravo | B čl. 2 odst. 4 | 2026-11-04 | overeno |
| Audit jednou ročně, po incidentu kdykoli | bezpecnost-a-pravo | B čl. 2 odst. 6 | 2026-11-04 | overeno |
| Data obce nepoužíváme pro sebe, neprodáváme, netrénujeme na nich modely AI | bezpecnost-a-pravo, co-umime | B čl. 2 odst. 7 | 2026-11-04 | overeno |
| Po skončení export 30 dní, výmaz do 60 dní, ze záloh do 90 dní, písemné potvrzení | bezpecnost-a-pravo | B čl. 5 | 2026-11-04 | overeno |
| TLS 1.2 a novější, šifrované úložiště a zálohy | bezpecnost-a-pravo | B příloha B3 | 2026-11-04 | hypoteza |
| Dvoufázové přihlášení pro správce, zámek účtu po 5 neúspěšných pokusech | bezpecnost-a-pravo | B příloha B3 | 2026-11-04 | hypoteza |
| Oddělení dat obcí na úrovni databáze | bezpecnost-a-pravo | B příloha B3 | 2026-11-04 | hypoteza |
| Zálohy denně, uchování 30 dní, zkouška obnovy jednou za čtvrtletí | bezpecnost-a-pravo | B příloha B3 | 2026-11-04 | hypoteza |
| Text dotazu AI asistenta se uchovává 30 dní | bezpecnost-a-pravo | B příloha B1 („[30]“ v hranatých závorkách) | – | neovereno |
| Pověřence pro ochranu osobních údajů CodeKom nemusí mít | zasady-osobnich-udaju | D čl. 1 („ověřit“) | – | neovereno |
| Korespondence s obcemi 12 měsíců od posledního kontaktu | zasady-osobnich-udaju | D čl. 2 | 2026-11-04 | overeno |
| Faktury 10 let podle zákona o DPH, ostatní 3 roky po skončení smlouvy; čl. 6 odst. 1 písm. b) a c) GDPR | zasady-osobnich-udaju | D čl. 2 | 2026-11-04 | overeno |
| Odpověď na žádost do jednoho měsíce; ÚOOÚ, Pplk. Sochora 27, 170 00 Praha 7 | zasady-osobnich-udaju | D čl. 4; C čl. 5 | 2026-11-04 | overeno |
| Web nic nesbírá: žádný formulář, cookies, měření ani třetí strany | cookies, zasady-osobnich-udaju, kontakt | prompty/06-prezentacni-web.md; docs/rozhodnuti.md 4. 11. 2026 | 2026-11-04 | hypoteza |
| Živá ukázka ukládá jen cookie nutnou pro zvolenou šablonu a paletu | cookies | prompty/07-prototyp-webu.md; docs/brief-prototypy.md | 2026-11-04 | hypoteza |

## Předpisy

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
| Obce jsou povinným subjektem podle zákona č. 99/2019 Sb. | bezpecnost-a-pravo, pristupnost | https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99 (research/poznamky/web_obce_a_prodej.md) | 2026-11-03 | overeno |
| Metodický pokyn DIA požaduje EN 301 549 V3.2.1, tedy WCAG 2.1 AA | bezpecnost-a-pravo, pristupnost, faq, uvod | https://www.dia.gov.cz/wp-content/uploads/2023/06/Metodicky_pokyn_-_pristupnost_internetovych_stranek_a_mobilnich_aplikaci_v1-6-DIA.pdf | 2026-11-03 | overeno |
| Weby stavíme podle WCAG 2.2 AA | uvod, co-umime, bezpecnost-a-pravo, faq, pristupnost | CLAUDE.md, prompty 01, 06, 07 | 2026-11-04 | hypoteza |
| Editor nepustí do publikace změnu, která rozbije přístupnost | uvod, co-umime, bezpecnost-a-pravo, faq | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Pro firmu CodeKom zákon č. 99/2019 Sb. povinný není | pristupnost | zákon č. 99/2019 Sb. § 3 (povinné subjekty), research | 2026-11-03 | overeno |
| Web CodeKom je v částečném souladu, úplný soulad až po testech a ručním průchodu | pristupnost | prompty/06-prezentacni-web.md (prohlášení o přístupnosti) | 2026-11-04 | hypoteza |
| Struktura povinně zveřejňovaných informací podle vyhlášky č. 515/2020 Sb. | uvod, co-umime | https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515 | 2026-11-03 | overeno |
| Čl. 50 AI Actu (nařízení 2024/1689) platí od 2. 8. 2026, uživatel musí vědět, že mluví s AI | co-umime, bezpecnost-a-pravo | https://www.mondaq.com/uk/compliance/1826042/not-delayed-not-deferred-eu-ai-act-transparency-obligations-are-now-in-force (docs/pravni-dokumenty.md, Zdroje) | 2026-11-02 | overeno |
| Zda označení AI fotografií vyžaduje čl. 50 odst. 4 AI Actu | bezpecnost-a-pravo | prompty/06-prezentacni-web.md, overit | – | neovereno |
| Zákon č. 264/2025 Sb. o kybernetické bezpečnosti platí od 1. 11. 2025 | bezpecnost-a-pravo | docs/pravni-dokumenty.md, Zdroje (článek Lupa.cz o účinnosti zákona) | 2026-11-02 | overeno |
| Regulovanost obce se ověří kalkulačkou NÚKIB; součinnost, hlášení incidentu do 24 hodin, audit | bezpecnost-a-pravo | A čl. 10 odst. 3; docs/pravni-dokumenty.md, úvod | 2026-11-04 | overeno |
| Kapitola V GDPR (předávání do třetích zemí), čl. 28 GDPR (zpracovatel) | bezpecnost-a-pravo, faq, ke-stazeni | B čl. 2 odst. 8; nařízení (EU) 2016/679 | 2026-11-04 | overeno |
| § 89 odst. 3 zákona č. 127/2005 Sb.: ukládání do zařízení jen s předchozím souhlasem, výjimka pro technicky nezbytné a výslovně vyžádanou službu | cookies | ZPL https://www.zakonyprolidi.cz/cs/2005-127, znění k 1. 11. 2026 | 2026-11-04 | overeno |
| § 41 zákona č. 128/2000 Sb.: doložka o splnění podmínek platnosti právního jednání obce | ke-stazeni | ZPL https://www.zakonyprolidi.cz/cs/2000-128, znění 1. 1. 2026 až 31. 12. 2026; A, doložka | 2026-11-04 | overeno |
| § 99 odst. 3 zákona č. 128/2000 Sb.: rada se nevolí, má-li zastupitelstvo méně než 15 členů | ke-stazeni | ZPL https://www.zakonyprolidi.cz/cs/2000-128, znění 1. 1. 2026 až 31. 12. 2026 | 2026-11-04 | overeno |
| Kdo rozhoduje: starosta, rada nebo zastupitelstvo podle výše částky a vnitřní směrnice | ke-stazeni | prompty/06-prezentacni-web.md; research/poznamky/web_obce_a_prodej.md (vzor směrnice MV, nečten) | – | hypoteza |
| § 27 zákona č. 134/2016 Sb.: zakázka malého rozsahu na služby do 3 000 000 Kč bez DPH | ke-stazeni | ZPL https://www.zakonyprolidi.cz/cs/2016-134, znění 3. 4. 2025 až 31. 12. 2026 | 2026-11-04 | overeno |
| § 6 zákona č. 134/2016 Sb.: transparentnost, přiměřenost, rovné zacházení, zákaz diskriminace | ke-stazeni | ZPL https://www.zakonyprolidi.cz/cs/2016-134 | 2026-11-04 | overeno |
| Roční cena služby je hluboko pod limitem zakázky malého rozsahu | ke-stazeni | výpočet: nejvyšší orientační cena v ceníku × 12 je řádově desítky tisíc Kč proti 3 000 000 Kč | 2026-11-04 | overeno |
| § 3 odst. 2 písm. k) zákona č. 340/2015 Sb.: výjimka pro smlouvy obce bez rozšířené působnosti | ke-stazeni | ZPL https://www.zakonyprolidi.cz/cs/2015-340, znění 1. 1. 2025 | 2026-11-04 | overeno |
| Uveřejnění smluv nad 50 000 Kč bez DPH v registru smluv u ostatních obcí | ke-stazeni | research/poznamky/web_obce_a_prodej.md (NEOVĚŘENO) | – | neovereno |
| Obec je povinný subjekt podle zákona č. 106/1999 Sb., smlouvu může poskytnout na žádost | ke-stazeni | A čl. 2 odst. 4 | 2026-11-04 | overeno |
| Rozpočet na příští rok obce připravují na podzim a schvalují v prosinci | ke-stazeni | prompty/06-prezentacni-web.md, kontext; research (rozpočtový cyklus NEOVĚŘENO) | – | hypoteza |

## Produkt a ukázka

| Tvrzení | Stránka | Zdroj | Datum | Stav |
|---|---|---|---|---|
| CodeKom je pro obce do 2 000 obyvatel | uvod, pro-koho | docs/navrh-platformy/01-navrh-platformy.md; CLAUDE.md | 2026-11-04 | overeno |
| 20 šablon, každá ve 3 barevných variantách | uvod, co-umime, ukazky, prechod | design/prototypy, design/generator/palettes.py, design/snimky | 2026-11-04 | overeno |
| Názvy šablon, „pro koho“ a názvy palet | ukazky, uvod | docs/navrh-platformy/03-sablony-webu.md; design/generator/tpls.py; palettes.py | 2026-11-04 | overeno |
| Javoří Lhota je smyšlená obec s 684 obyvateli | uvod, ukazky | docs/rozhodnuti.md 2. 11. 2026; obsah/javori-lhota/obec.json | 2026-11-04 | overeno |
| Úroveň Základ je navržená pro 1–2 hodiny týdně | uvod, pro-koho, faq | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Tři úrovně editoru: Základ, Pokročilý, Advance | co-umime, cenik | docs/navrh-platformy/04-admin-editor.md; docs/rozhodnuti.md 27. 10. 2026 | 2026-11-04 | overeno |
| Pět modulů: web a deska, aplikace, digitální úřad, budovy, AI asistent | uvod, co-umime | CLAUDE.md; docs/rozhodnuti.md 2. 11. 2026 | 2026-11-04 | overeno |
| Vyvěšený dokument nejde smazat, změny jsou verze, výchozí „Po sejmutí nezveřejňovat“ | uvod, co-umime, bezpecnost-a-pravo, faq | CLAUDE.md pravidlo 1; docs/rozhodnuti.md 2. 11. 2026; B příloha B3 | 2026-11-04 | hypoteza |
| Krizová hlášení: vždy jedno, nejzávažnější, úroveň slovem, krizi nejde zavřít; vydává jen správce | co-umime, bezpecnost-a-pravo | CLAUDE.md pravidlo 2; docs/rozhodnuti.md 2. a 4. 11. 2026 | 2026-11-04 | hypoteza |
| Účet v aplikaci e-mailem a jednorázovým kódem, bez hesla; čtení bez účtu | co-umime | prompty/06 (účet bez hesla), 08; docs/navrh-platformy/06; E čl. 2 odst. 1 | 2026-11-04 | hypoteza |
| Peníze občanů jdou přímo na účet obce | co-umime | CLAUDE.md pravidlo 3; docs/navrh-platformy/05-digitalizace-uradu.md | 2026-11-04 | overeno |
| Každá online služba má i cestu přes úřad | co-umime | CLAUDE.md pravidlo 6 | 2026-11-04 | hypoteza |
| Brána řídí topení a zámky bez internetu, protimraz nezávisí na cloudu, zámek jde otevřít klíčem | co-umime, faq | CLAUDE.md pravidlo 5; docs/navrh-platformy/06 | 2026-11-04 | hypoteza |
| Aplikace budovy v první verzi jen zobrazuje | co-umime | docs/rozhodnuti.md 4. 11. 2026 | 2026-11-04 | overeno |
| Úspora energie bez procenta, dokud nejsou vlastní data | co-umime | prompty/06-prezentacni-web.md | 2026-11-04 | overeno |
| Nenahrazuje certifikované požární a zabezpečovací systémy | co-umime | docs/navrh-platformy/01-navrh-platformy.md I3.4 | 2026-11-04 | overeno |
| Přihlášení Identitou občana se připravuje | co-umime | docs/navrh-platformy/01 U2.1 a 05 (podmínky napojení k ověření) | 2026-11-04 | hypoteza |
| Přizpůsobení šablony do 5 pracovních dnů | prechod | docs/navrh-platformy/03-sablony-webu.md (návrh, potvrdí zakladatel) | – | neovereno |
| Doba migrace | prechod | chybí, [DOPLNIT] | – | neovereno |
| Školení: Základ video kurz, Pokročilý + 1 hodina online, Advance + 2 hodiny na místě | prechod | docs/navrh-platformy/04-admin-editor.md | 2026-11-04 | hypoteza |
| Společná správa více obcí (mikroregion, MAS) se připravuje | pro-koho, ukazky | docs/navrh-platformy/01-navrh-platformy.md O5, fáze B3 | 2026-11-04 | hypoteza |
| Topení podle rozvrhu školy se připravuje | pro-koho | docs/navrh-platformy/01-navrh-platformy.md O4, fáze B2 | 2026-11-04 | hypoteza |
| Fotografie z AI mají vždy popisek „Ilustrační fotografie vytvořená umělou inteligencí“ | co-umime, ukazky, bezpecnost-a-pravo | docs/rozhodnuti.md 4. 11. 2026 | 2026-11-04 | overeno |
| Dotační výzvy 2026–2027 | dotace | žádná výzva zatím neověřená | – | neovereno |
| Reference a pilotní obce | o-nas | chybí, [DOPLNIT] | – | neovereno |
| Údaje CodeKomu: IČO, sídlo, holding, kontakty, tým | o-nas, kontakt, zasady-osobnich-udaju, pristupnost | chybí, [DOPLNIT] | – | neovereno |

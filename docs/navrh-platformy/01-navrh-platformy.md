# CodeKom – návrh platformy pro obce

2026-10-26 ·

## Shrnutí

CodeKom (pracovní název) je jeden systém, ve kterém obec spravuje web s úřední deskou, digitální úřad a komunikaci s občany a na dálku řídí své budovy – topení, zámky, energie. Pro starostu jsou hlavní argument úspory energie a konec osobního předávání klíčů od sálu; web a úřad jsou základ, bez kterého obec nepřejde.

Peníze přicházejí z měsíčního předplatného podle velikosti obce, jednorázově z hardwaru a montáže IoT a z volitelné servisní smlouvy.

V ČR je 6 305 obcí a komunikační aplikaci Munipolis používá přes polovinu z nich ([Svět Androida](https://www.svetandroida.cz/chytra-komunikace-obec-munipolis/)); Galileo Corporation dělá obecní weby a digitální úřední desky od roku 2002 ([Seznam Zprávy](https://www.seznamzpravy.cz/clanek/239262)). Vstup na trh proto navrhuji přes IoT a propojení všech částí, ne přes samotný web.

### Mateřská firma a dva projekty

Mateřská firma vlastní dva samostatné projekty s vlastní značkou, zákazníky i ceníkem: **AutoCore** pro autobazary a servisy (AutoCore – návrh platformy pro autobazary, autoservisy a B2G) a **CodeKom** pro obce. Sdílejí jen to, co zákazník nevidí.

- **H1 Struktura:** mateřská s.r.o. vlastní práva k softwaru a značkám; projekty buď jako divize (levnější start), nebo jako dceřiné s.r.o. (oddělené riziko, investor může vstoupit jen do jednoho). Rozhodnout s účetním a advokátem (Q6).
- **H2 Sdílený technický základ:** přihlašování a role, fakturace předplatného, SMS a e-mail, úložiště souborů, monitoring, design systém, hosting v EU. Data projektů jsou oddělená.
- **H3 Sdílený tým a provoz:** vývoj, zákaznická podpora, účetnictví, jedna sada směrnic pro GDPR a bezpečnost.
- **H4 Jediný styčný bod:** obecní vozy mohou objednávat opravy u servisů v AutoCore (U2.11); jinak projekty běží nezávisle.

**Jak schvalovat:** každý bod má kód, na konci je checklist; k bodu s výhradou napiš komentář. Fáze: **B1** první verze k prodeji, **B2**, **B3**.

## Cílové skupiny a role

Primární zákazník je obec do 2 000 obyvatel: má málo lidí na úřadě, několik budov a nejvíc ocení, že věci běží samy.

| Kód | Segment | Bolest dnes | Co dostane | Fáze |
|---|---|---|---|---|
| O1 | Obec do 500 obyvatel | web „od známého“, papírové žádosti, klíče od sálu předává starosta osobně | jednoduchý web, rezervace se zámkem, topení na dálku | B1 |
| O2 | Obec 500–2 000 obyvatel | web, komunikace a poplatky u různých dodavatelů, vysoké účty za energie budov | vše v jednom, měření energií | B1 |
| O3 | Město 2 000–10 000 obyvatel | desítky místností a více budov, správce budov bez přehledu | IoT celé sítě budov, weby organizací, přehledy pro radu | B2 |
| O4 | Organizace obce (ZŠ, MŠ, knihovna, sportoviště) | topí se i v prázdninách, přístupy na klíče | podweb, topení podle rozvrhu, přístupy | B2 |
| O5 | Svazky obcí a MAS | koordinace a společné nákupy | správa více obcí, společné zakázky | B3 |
| O6 | Občané | – (uživatel) | podání, platby, rezervace, novinky | B1 |

- **R1 Role:** starosta, místostarosta, administrativa úřadu, účetní, správce budov, zastupitel, ředitel školy, nájemce sálu (dočasný přístup), občan, montážník partnera (časově omezený servisní přístup).
- **R2 Model účtů:** obec = jeden zákazník, organizace obce jako podúčty se společnou správou; svazek obcí může spravovat více obcí najednou.

## Modul 1: Web obce a úřední deska

Web je vstupní produkt: každá obec ho musí mít a musí splňovat zákonné požadavky, takže je to nejsnazší první prodej.

- **W1.1 Web pro obce:** hotová struktura povinně zveřejňovaných informací, aktuality, kalendář akcí, fotogalerie, zpravodaj, kontakty úřadu; editor zvládne starosta nebo administrativa bez znalosti webů. B1
- **W1.2 Elektronická úřední deska:** vyvěšení s datem sejmutí, automatické sejmutí a archiv, záznam o vyvěšení a sejmutí, zobrazení i na venkovním infokiosku. B1
- **W1.3 Přístupnost:** WCAG 2.1 AA podle zákona 99/2019 Sb. a dokumenty v přístupných formátech ([DIA](https://www.dia.gov.cz/media/2142/download/Nej%C4%8Dast%C4%9Bj%C5%A1%C3%AD%20dotazy.pdf)); automatická kontrola kontrastu a popisků obrázků, generované prohlášení o přístupnosti. B1
- **W1.4 Rozpočet a dokumenty:** rozpočet, střednědobý výhled, závěrečný účet, vyhlášky a usnesení s fulltextovým hledáním. B1
- **W1.5 Přechod ze starého webu:** import obsahu a dokumentů z dosavadního webu, přesměrování starých adres, převzetí domény. B1
- **W1.6 Provoz:** hosting a doména v ceně, statistiky návštěvnosti bez cookies, denní zálohy. B1
- **W1.7 Weby organizací obce:** škola, MŠ, knihovna, hasiči, spolky jako podweby se společnou správou. B2

Web obce vychází z jedné z 20 šablon (20 šablon webů) a obec ho upravuje v editoru ve třech úrovních (Admin editor – 3 úrovně). Z čeho šablony vycházejí, je v záložce Průzkum webů měst.

## Modul 2: Digitální úřad a komunikace s občany

Zákon o právu na digitální služby ukládá úřadům služby poskytovat a přijímat digitálně ([MU](https://cpit.law.muni.cz/dokumenty/63191)) a hlavní tíha dopadá na samosprávy ([Kraj Vysočina](https://extranet.kr-vysocina.cz/download/odbor_informatiky/prezentace/ComDays/30-11-23/ZoPDS/20230930%20Skoleni%20ZoPDS.pdf)). Malá obec na vlastní systém nemá – to je náš prodejní argument.

- **U2.1 Online podání:** žádosti (pronájem sálu, zábor prostranství, kácení dřevin, rozkopávka), přihlášky, hlášení závad s fotkou a polohou na mapě; přihlášení identitou občana (NIA, BankID) – ověřit podmínky napojení. B1 bez identity, B2 s identitou
- **U2.2 Místní poplatky:** odpad, psi, ubytování – evidence poplatníků, QR platby, párování plateb z banky, upomínky, přehled nedoplatků. B1
- **U2.3 Rezervace obecních prostor:** sál, tělocvična, hřiště – kalendář, ceník, platba, schválení; po schválení systém sám nastaví topení a vydá časový přístup (I3.1, I3.2). B1
- **U2.4 Zastupitelstvo:** pozvánky, materiály, usnesení, zápisy, výsledky hlasování. B2
- **U2.5 Datová schránka a spisová služba:** napojení na ISDS a na stávající spisovou službu obce; vlastní spisovou službu nestavět (certifikace a regulace). B2
- **U2.6 Evidence:** smlouvy s exportem do registru smluv, majetek, hrobová místa a nájmy, psi. B2
- **U2.7 Novinky občanům:** e-mail, SMS a aplikace podle témat a částí obce; s Munipolis spíš propojit než soupeřit. B2
- **U2.8 Krizové zprávy:** vichřice, odstávka vody, povodeň – zpráva všemi kanály naráz, napojená na čidla (I3.5). B2
- **U2.9 Aplikace občana:** podání, platby, rezervace a novinky v mobilu (PWA, bez instalace z obchodu). B2
- **U2.10 Participace:** ankety, participativní rozpočet, podněty občanů s mapou. B3
- **U2.11 Vozy obce:** evidence vozů, termíny STK a pojištění, objednání opravy u servisu z AutoCore (H4). B3

Agendy, tok podání, napojení na státní systémy a postup zavedení jsou rozpracované v záložce Digitalizace úřadu.

## Modul 3: Chytré budovy a IoT

Tady se CodeKom odlišuje: platforma řídí zařízení různých výrobců přes otevřené protokoly a propojuje je s agendou úřadu – rezervace, rozvrh školy nebo provozní doba úřadu samy řídí topení a přístupy.

> (obrázek: diagram nebo graf v původním dokumentu)

- **I3.1 Vytápění:** zóny po místnostech, týdenní plány podle provozu úřadu a školy, automaticky podle rezervací (U2.3), útlum o víkendech a prázdninách, detekce otevřeného okna, protimrazová ochrana; ovládání termostatických hlavic i kotle nebo tepelného čerpadla (relé, Modbus, OpenTherm). B1
- **I3.2 Zámky a přístupy:** elektronické zámky a čtečky; přístup na čas z rezervace (PIN, QR nebo NFC v mobilu), stálé karty zaměstnanců a hasičů, okamžité zrušení, záznam vstupů; zámek funguje i bez internetu a má mechanické nouzové otevření. B1
- **I3.3 Měření energií a vody:** elektroměry, plynoměry, vodoměry, výroba FVE; spotřeba po budovách a v čase, upozornění na noční průtok vody (únik). B1
- **I3.4 Senzory a alarmy:** teplota, vlhkost, CO2 ve třídách, zaplavení, otevřené dveře; alarm správci SMS a v aplikaci. Nenahrazuje certifikované požární a zabezpečovací systémy. B2
- **I3.5 Venkovní infrastruktura:** spínání a poruchy veřejného osvětlení, hladina potoka a meteostanice s varováním občanů (U2.8), čerpací stanice a ČOV. B2–B3
- **I3.6 Otevřené standardy:** LoRaWAN, Zigbee, Wi-Fi, Modbus, KNX, BACnet, MQTT; napojení i na stávající systémy budov (např. Loxone) přes brány. B1
- **I3.7 Pravidla „když – pak“:** jednoduchý editor pro správce, např. „když je otevřené okno, vypni topení v místnosti“ nebo „když teplota v čerpací stanici klesne pod 3 °C, pošli SMS“. B2
- **I3.8 Energetický report:** měsíční přehled spotřeby a úspor po budovách pro zastupitelstvo a jako podklad k dotacím. B1

Hardware s cenami, obrazovky dashboardu, mobilní aplikace a scénáře automatizace jsou v záložce IoT dashboard a aplikace.

## Modul 4: Hardware, montáž a servis

IoT se prodává jako hotová služba na klíč: obec nechce řešit, jaké hlavice koupit – chce, aby v sále bylo v 18:00 teplo.

- **H4.1 Audit budovy před nabídkou:** prohlídka, soupis topení, dveří a měřičů, návrh zařízení a odhad úspory; podklad pro zastupitelstvo i pro dotaci. B1
- **H4.2 Katalog ověřeného hardwaru:** termostatické hlavice, řízení kotle a tepelného čerpadla, zámky a čtečky, měřiče, senzory, brány – vyzkoušené s platformou, od více výrobců. B1
- **H4.3 Vlastní brána do budovy:** místní logika (topení a zámky jedou i bez internetu), záložní LTE, vzdálené aktualizace. Zpočátku hotový hardware třetích stran. B2
- **H4.4 Partnerská síť montážníků:** elektrikáři a topenáři s odbornou způsobilostí, zaškolení na platformu, servisní přístup jen na čas zakázky. B1
- **H4.5 Servisní smlouva (SLA):** dohled nad zařízeními, hlášení vybitých baterií a výpadků, návrh: reakce na poruchu zámku do 4 hodin v pracovní dny, náhradní díly skladem. B1
- **H4.6 Obchodní model hardwaru:** (a) prodej s marží a jednorázovou montáží, nebo (b) pronájem v ceně předplatného bez vstupní investice obce. Rozhodnutí Q2. B1
- **H4.7 Bezpečnost zařízení:** oddělená síť od úřadu, žádné porty otevřené do internetu, šifrovaná komunikace, aktualizace firmwaru. B1

## Integrace a datové zdroje

U státních systémů je nejdřív potřeba ověřit podmínky napojení pro soukromého dodavatele obcí; do té doby platforma připraví podklady a úředník je odešle ručně.

| Oblast | Zdroj | Přístup | Fáze |
|---|---|---|---|
| Platby | QR platby, platební brána, banka (Fio API, PSD2) | API | B1 |
| Komunikace | SMS brána, e-mail; Munipolis | API, propojení ověřit | B1 |
| Mapy | OpenStreetMap / Mapy.com | API | B1 |
| IoT | LoRaWAN síťový server, brány Zigbee, Modbus, KNX, BACnet; MQTT | protokoly | B1 |
| Identita občana | NIA (identita občana), BankID | ověřit podmínky | B2 |
| Datové schránky | ISDS | ověřit rozhraní | B2 |
| Spisová služba | stávající systémy obcí | export / import | B2 |
| Registr smluv | ISRS | export | B2 |
| Účetnictví obce | rozpočtové účetnictví | export | B2 |
| Energie | vlastní měřiče; data z chytrých elektroměrů distributora | ověřit | B2 |
| Počasí a hladiny | meteostanice a čidla obce, ČHMÚ | ověřit | B2 |

## Technická architektura a sdílený základ

CodeKom stojí na stejném technickém základu jako AutoCore (AutoCore – návrh platformy pro autobazary, autoservisy a B2G), ale s vlastní databází a dvěma vlastními částmi: správou webů a IoT jádrem.

- **T.1 Sdílené s AutoCore:** přihlašování a role, fakturace předplatného, SMS a e-mail, úložiště souborů, monitoring, design systém; React 18 + TypeScript + Vite + Tailwind, Node.js, PostgreSQL, hosting v EU. B1
- **T.2 Weby obcí:** správa obsahu s generováním rychlých statických stránek – lepší přístupnost, výkon i odolnost proti výpadku; každá obec na vlastní doméně. B1
- **T.3 IoT jádro:** MQTT broker, časová databáze měření (např. TimescaleDB), engine pravidel a plánů, správa zařízení a firmwaru. B1
- **T.4 Spolehlivost řízení:** plány topení a přístupové klíče se ukládají i do brány v budově, aby fungovaly bez spojení s cloudem; každý příkaz má potvrzení od zařízení. B1 základ, B2 vlastní brána
- **T.5 Bezpečnost:** příkazy k zámkům jen od ověřených rolí s 2FA, auditní log každé akce, šifrování, oddělení dat obcí; dostupnost cloudu cíl 99,9 %. B1

## Ceník a financování

Ceny jsou hypotéza k ověření v rozhovorech se starosty (fáze 0); Kč bez DPH měsíčně, hardware a montáž jednorázově podle auditu (H4.1).

Ceník má dvě osy: úroveň editoru webu a moduly navíc, které jdou přikoupit ke kterékoli úrovni. Co která úroveň umí, je v záložce Admin editor – 3 úrovně.

| Položka | Co obsahuje | do 500 obyv. | 500–2 000 | 2 000–10 000 |
|---|---|---|---|---|
| Web – Základ | píšu obsah do šablony, úřední deska, aplikace pro občany, 3 uživatelé | 590 Kč | 990 Kč | 1 690 Kč |
| Web – Pokročilý | + skládání stránek, schvalování, podweby organizací, 10 uživatelů | 890 Kč | 1 490 Kč | 2 490 Kč |
| Web – Advance | + volné rozvržení, vlastní vzhled, AI asistent, neomezeně uživatelů | 1 490 Kč | 2 290 Kč | 3 790 Kč |
| + Digitální úřad | poplatky a platby, rezervace, podání, podněty, zastupitelstvo | +600 Kč | +1 000 Kč | +2 000 Kč |
| + Chytré budovy | IoT dashboard, pravidla, přístupy; za každou připojenou budovu | +390 Kč | +390 Kč | +390 Kč |

- **C9.1 Servisní smlouva** (H4.5) jako příplatek podle počtu zařízení. B1
- **C9.2 Kalkulačka návratnosti:** z auditu budovy a reálných dat z pilotů; energetický management může podle odborníků ušetřit kolem 30 % energie ([TZB-info](https://www.tzb-info.cz/5726-energeticky-management-mest-a-obci-zprava-z-konference)) – číslo ověříme vlastním měřením. B1
- **C9.3 Dotace:** pomoc s žádostí jako služba; MMR podporuje úspory energie v obcích a chystá až 150 sdílených energetických manažerů ([eStav](https://www.estav.cz/img/pageflip/inspirace-pro-spravu-mest-a-obci-2026/27/)). B1
- **C9.4 Zkušební období:** pilotní obce 6 měsíců zdarma za souhlas s referencí a sdílením naměřených úspor. B1

## Právo a bezpečnost

Nejsem právník – toto je seznam témat pro advokáta; nejcitlivější jsou zámky a data o vstupech.

- **P10.1 Přístupnost a zveřejňování:** zákon 99/2019 Sb., povinně zveřejňované informace, pravidla úřední desky a zveřejňování vyhlášek.
- **P10.2 Digitální služby:** zákon 12/2020 Sb. o právu na digitální služby; podmínky napojení na NIA a ISDS.
- **P10.3 Kybernetická bezpečnost:** zákon 264/2025 Sb. – v nižším režimu jsou obce s rozšířenou působností a organizace ÚSC, pokud poskytují regulované služby ([MV ČR](https://mv.gov.cz/npo/soubor/tab-narodni-urad-pro-kybernetickou-a-informacni-bezpecnost-2025-pdf.aspx)); platforma musí splnit požadavky na dodavatele.
- **P10.4 GDPR:** zpracovatelská smlouva s každou obcí; záznamy vstupů ze zámků, údaje poplatníků a podání jsou osobní údaje – doba uchování a přístup jen pro oprávněné role.
- **P10.5 Odpovědnost za IoT:** co když zámek nepustí nebo vypadne topení – omezení odpovědnosti, SLA a mechanické nouzové otevření ve smlouvě.
- **P10.6 Únikové cesty a požární předpisy:** elektronický zámek nesmí bránit úniku z budovy – ověřit s požárním technikem u každých dveří.
- **P10.7 Montáže:** odborná způsobilost v elektrotechnice u partnerů, revize, odpovědnost partnera ve smlouvě.
- **P10.8 Veřejné zakázky a registr smluv:** postup u zakázek malého rozsahu, zveřejnění smluv s obcí.
- **P10.9 Značka:** ochranná známka a doména pro finální název.

## Roadmapa

První verze staví na tom, co obec uvidí hned: web a sál, který se sám odemkne a vytápí. Termíny počítají se samostatným týmem 2–3 lidí; pokud tým sdílí vývoj s AutoCore, posunou se podle odpovědi na Q3.

> (obrázek: diagram nebo graf v původním dokumentu)

Brána 2 vyžaduje naměřenou úsporu energie v pilotních budovách – bez ní nemá smysl škálovat prodej IoT.

## Rizika a otevřené otázky

Největší riziko je spolehlivost: jeden zámek, který v sobotu nepustí svatebčany do sálu, stojí víc reputace než celý web.

| Riziko | Dopad | Opatření |
|---|---|---|
| Selhání zámku nebo topení | vysoký | místní logika v bráně, mechanické nouzové otevření, dohled a SLA (H4.5, T.4) |
| Dlouhý rozhodovací cyklus obcí (zastupitelstvo, zakázky) | vysoký | pilot zdarma, audit jako podklad pro zastupitelstvo, prodej přes svazky obcí a MAS |
| Silní zavedení hráči (Munipolis, Galileo) | střední | odlišit se IoT a propojením, nesoupeřit v komunikaci – integrovat |
| Kybernetická bezpečnost a zámky | vysoký | oddělená síť, 2FA, audit, externí penetrační test před spuštěním |
| Hardware váže kapitál | střední | pronájem jen u ověřených zařízení, sklad podle podepsaných zakázek |
| Napojení na státní systémy se zdrží | střední | B1 bez nich; úředník odesílá ručně |

**Otázky pro tebe** (odpověz komentářem):

- **Q1 Název:** rozhodnuto, firma i produkt se jmenují CodeKom (CodeKom s.r.o. pod holdingem).
- **Q2 Hardware:** prodávat (marže + montáž), nebo pronajímat v ceně předplatného?
- **Q3 Pořadí projektů:** který z projektů jde první, nebo oba paralelně? Podle toho upravím roadmapy obou.
- **Q4 Tým:** kdo bude projekt vyvíjet a kdo ho bude prodávat starostům?
- **Q5 Pilotní obce:** máš kontakt na 2–3 starosty, kteří by šli do pilotu?
- **Q6 Struktura firmy:** divize, nebo dceřiné s.r.o. (H1)?

**Rozhodnuto 27. 10. 2026:**

- Web nese 20 šablon a editor ve třech úrovních. Ceník má dvě osy: úroveň webu a moduly Úřad a IoT navíc.
- Mobilní aplikace je jedna (CodeKom) s rolemi občan a úřad. Občan si v ní vybere obec.
- Administrace staví na Payload CMS, veřejné weby na Astru.
- Ceny úrovní jsou hypotéza k ověření ve fázi 0.
- Brána budovy bude v B1 hotový mini PC, vlastní DPS až v B3.
- Průzkum webů pokrývá ČR a zahraničí. Prototypy jsou klikací a kód se začne psát až po schválení.

## Checklist ke schválení

Odškrtni, co platí; k bodu s výhradou napiš komentář.

- [ ] **Mateřská firma a sdílený základ** (H1–H4)
- [ ] **Cílové skupiny a role** (O1–O6, R1–R2)
- [ ] **W1 Web obce a úřední deska** (W1.1–W1.7)
- [ ] **U2 Digitální úřad a komunikace** (U2.1–U2.11)
- [ ] **I3 Chytré budovy a IoT** podle diagramu (I3.1–I3.8)
- [ ] **H4 Hardware, montáž a servis** (H4.1–H4.7)
- [ ] **Integrace** podle tabulky
- [ ] **Architektura** sdílená s AutoCore (T.1–T.5)
- [ ] **Ceník:** Web 590–1 990 Kč, Úřad 1 190–3 990 Kč, +390 Kč za budovu (C9.1–C9.4)
- [ ] **Právní body** předat advokátovi (P10.1–P10.9)
- [ ] **Roadmapa** fáze 0 → B1 → B2 → B3
- [ ] **Odpovědi na Q1–Q6**
- [ ] **20 šablon webů** podle tabulky a mapy šablon
- [ ] **Tři úrovně editoru** (matice funkcí) a ceník na dvou osách
- [ ] **Digitalizace úřadu**: agendy pro B1 a napojení
- [ ] **IoT**: sada hardwaru a scénáře automatizace
- [ ] **Prototypy** prošlé a okomentované

## Zdroje

- [Svět Androida – Munipolis v obcích](https://www.svetandroida.cz/chytra-komunikace-obec-munipolis/)
- [Seznam Zprávy – Galileo Corporation](https://www.seznamzpravy.cz/clanek/239262)
- [DIA – přístupnost webů, časté dotazy](https://www.dia.gov.cz/media/2142/download/Nej%C4%8Dast%C4%9Bj%C5%A1%C3%AD%20dotazy.pdf)
- [MU – právo na digitální služby](https://cpit.law.muni.cz/dokumenty/63191)
- [Kraj Vysočina – školení k zákonu o právu na digitální služby](https://extranet.kr-vysocina.cz/download/odbor_informatiky/prezentace/ComDays/30-11-23/ZoPDS/20230930%20Skoleni%20ZoPDS.pdf)
- [MV ČR – předpisy NÚKIB 2025](https://mv.gov.cz/npo/soubor/tab-narodni-urad-pro-kybernetickou-a-informacni-bezpecnost-2025-pdf.aspx)
- [TZB-info – energetický management měst a obcí](https://www.tzb-info.cz/5726-energeticky-management-mest-a-obci-zprava-z-konference)
- [eStav – Inspirace pro správu měst a obcí 2026](https://www.estav.cz/img/pageflip/inspirace-pro-spravu-mest-a-obci-2026/27/)

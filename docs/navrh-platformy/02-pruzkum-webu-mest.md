# Průzkum webů měst a obcí

2026-10-27

## Závěry

Nejlepší weby měst se neřídí strukturou úřadu, ale tím, co člověk potřebuje udělat. Služby, platby a hlášení ale mají roztroušené po 3–6 externích portálech. To je hlavní mezera, kterou CodeKom zaplní: jeden web, jeden účet občana, jedna správa.

Prošel jsem 17 webů statutárních měst, 4 menší oceněné obce, 7 zahraničních vzorů a 10 dodavatelů. Z toho plyne osm pravidel pro šablony a editor:

1. **Navigace podle potřeb, ne podle odborů.** „Potřebuji vyřídit“ / „Potřebuji zaplatit“ mají Brno, Olomouc, Ostrava, Zlín, Frýdek-Místek i Ústí. Na stejném principu postavila Příbram nový web (září 2026). Všech 20 šablon proto má jako první položku menu rozcestník životních situací.
1. **Lišta rychlých akcí nahoře.** Děčín, Zlín a Jablonec dávají hned pod hlavičku úřední desku, platby, objednání, hlášení závad a úřední hodiny. Šablony mají pevný blok „Rychlé akce“ se 4–6 dlaždicemi, které obec nemůže smazat, jen přeskládat.
1. **Rozdělení podle publika.** Pardubice, Ústí, Jablonec a Prostějov rozdělují obsah na Občan / Podnikatel / Turista. U obcí do 2 000 obyvatel to nedává smysl, u větších měst ano. Šablony pro města to mají, vesnické ne.
1. **Služby roztroušené po portálech.** Ostrava má zvlášť objednávkový systém, platební portál, Zelenou linku a ČistaOVA. Olomouc má aplikaci Moje Olomouc a podobně je to i jinde. CodeKom to spojí do jednoho účtu občana (přihlášení přes Identitu občana).
1. **Komunikace jinými kanály než webem.** Munipolis vkládají Karviná, Havířov i Mokrá-Horákov. Prostějov a Přerov mají audionovinky, Pardubice hlášení rozhlasu. Proto je v šablonách blok „Hlášení rozhlasu“ a předplatné zpráv (SMS, e-mail, push).
1. **Transparentnost jako standard.** Rozklikávací rozpočet má 7 ze 17 měst, Chomutov otevřená data a Havířov participativní rozpočet. V editoru Pokročilý a Advance proto bude widget rozpočtu a v Advance i participativní rozpočet.
1. **Slabiny konkurence:** husté seznamy odkazů, chybějící vyhledávání (Plzeň, Děčín, Karviná) a zastaralé weby (Opava © 2019–2022, České Budějovice © 2021, Frýdek-Místek © 2022). Šablony budou mít vyhledávání v hlavičce vždy a ne víc než 7 položek hlavního menu.
1. **Ze zahraničí:** prostý jazyk a „Leichte Sprache“ (Mnichov, Helsinky), vyhledávání s AI (Helsinky), sdílený design systém pro všechny obce (NL Design System) a jedna platforma pro většinu obcí (rakouské GEM2GO na 1 100 z 2 096 obcí). Pro CodeKom z toho plyne: stavět na design systému gov.cz (licence EUPL, balíček pro React) a každé obci dát vlastní barevné téma.

## Česká statutární města

Celý web jsem prošel u 17 z 27 měst. Praha, Liberec, Hradec Králové, Kladno, Most, Jihlava, Teplice, Mladá Boleslav a Třinec automatické čtení zakazují a Karlovy Vary se nenačetly. Tyto weby se vyplatí projít ručně.

| Město | Hlavní menu | Co převzít | Slabina | CMS / dodavatel |
|---|---|---|---|---|
| [Brno](https://www.brno.cz) | Potřebuji vyřídit, Úřad, O Brně, Aktuálně, Kontakty | první položka menu = potřeby, obsazenost přepážek živě | velké bannery, chybí hlášení závad a platby | pravděpodobně Liferay |
| [Ostrava](https://www.ostrava.cz) | O městě, Úřad, Investor, Projekty | kontaktní centrum nahoře, formulář rychlého kontaktu | služby na 4 různých portálech | Plone, OVANET |
| [Plzeň](https://www.plzen.eu) | O městě, Úřad, Doprava, Vzdělávání, Bydlení, Sociální služby, Podnikatelé | aktuality města a obvodů odděleně, „Vyřiďte si na úřadu“ | chybí vyhledávání i platby | vlastní (SITMP) |
| [Olomouc](https://www.olomouc.eu) | O městě, Samospráva, Magistrát, Úřad online, Potřebuji vyřídit, Aktuálně, Kontakty | stav žádostí online, platba poplatku za odpad, aplikace Moje Olomouc | husté seznamy odkazů | cmsOl, design BastArt |
| [České Budějovice](https://www.c-budejovice.cz) | Aktuality, Průvodce úřadem, Doprava, Průkazy, Magistrát, Mapy… | platební lišta úplně nahoře, dlaždice „Vše na jednom místě“ | 10 položek menu, © 2021 | Drupal, VOATT |
| [Ústí nad Labem](https://www.usti.cz/cz/) | Správa města, Občan, Podnikatel, O městě, Média | rozdělení podle publika, městské obvody na jednom místě | hlášení a platby jen externě | WebJET, WebActive |
| [Pardubice](https://www.pardubice.eu) | Turista, Aktuality, Občan, Podnikatel, Město, Kontakty | výběr podle publika, hlášení rozhlasu, Dej Tip | úvodní stránka má 21 bloků | Giant |
| [Zlín](https://www.zlin.eu) | O městě, Pro podnikatele, Pro občany, Kultura, Otevřená radnice | horní lišta: úřední deska, Potřebuji vyřídit, Potřebuji zaplatit | chybí rezervace a hlášení na úvodu | neuvedeno |
| [Havířov](https://www.havirov-city.cz) | Haviřov, Nabídka témat, Město a úřad, Volný čas, Kontakty | dlaždicová rychlá navigace, participativní rozpočet, Munipolis | chybí platby a hlášení | Drupal 10, QCM |
| [Opava](https://www.opava-city.cz) | Město a úřad, Nabídka témat, Portál Opavana, Kontakty | video na úvodu, strategický plán | chybí rezervace i platby, © 2019–2022 | WebJET, WebActive |
| [Frýdek-Místek](https://www.frydekmistek.cz) | O městě, Magistrát, Potřebuji vyřídit, Kontakty | jen 4 položky menu, „S čím vám pomůžeme“, 6 jazyků | © 2022 | WordPress, ImperialMedia |
| [Karviná](https://www.karvina.cz) | Město, Magistrát, Městská policie, Organizace, Potřebuji vyřídit, Děje se, Aukce, Kontakty | „Nejčastěji hledáte“, dopravní omezení | textová a hustá úvodní stránka | neuvedeno |
| [Děčín](https://www.mmdecin.cz) | Informace, Město, Úřad, Turisté, Odkazy, Kontakty, Volby | rychlé akce: hodiny, platby, objednat, deska, poruchy, uzavírky | chybí vyhledávání | Joomla (odhad) |
| [Chomutov](https://www.chomutov.cz) | jen 17 dlaždic | online úřad, otevřená data, GIS na jedné stránce | chybí klasická navigace | neuvedeno |
| [Jablonec n. N.](https://www.mestojablonec.cz) | Občan, Podnikatel, Turista, Média, Město | Úvodní blok „Rezervace termínu“, podněty „Lepší Jablonec“ | chybí platby | Giant |
| [Prostějov](https://www.prostejov.eu) | Občan, Samospráva, Podnikatel, Volný čas | audionovinky, interaktivní průvodce, požadavky nad mapou, SMS | chybí platby | Public4u, as4u |
| [Přerov](https://www.prerov.eu) | Samospráva, Magistrát, O Přerově, Turista | audionovinky, „Nové a aktualizované“, výtah z úřední desky | příliš mnoho bloků | Public4u, as4u |

## Menší obce

Naší zákazníci jsou obce do 10 000 obyvatel. Zlatý erb se od ročníku 2025 hodnotí jen u obcí bez rozšířené působnosti. Porota sleduje přístupnost, povinné informace, digitální služby a pohled občana, podnikatele i turisty ([Deník](https://zatecky.denik.cz/kraj-a-okoli/cenu-zlaty-erb-za-nejlepsi-web-obci-a-mest-ziskal-jirkov/), [Zlínský kraj](https://zlinskykraj.cz/tiskove-zpravy/kraj-ocenil-nejlepsi-obecni-webove-stranky-prvenstvi-ziskal-uhersky-ostroh)).

| Obec | Ocenění | Co má | CMS / dodavatel |
|---|---|---|---|
| [Jirkov](https://www.jirkov.cz) | Zlatý erb 2025, 1. místo | témata podle životních situací, hlášení závad, rozpočet, virtuální prohlídky; menu má jen 4 položky | šablonový systém („lego2“) |
| [Mokrá-Horákov](https://www.mokra-horakov.cz) | cena Úřad 5.0 za AI chatbota | dlaždice, Potřebuji vyřídit, hlášení rozhlasu, Munipolis | Drupal 10, Wertu |
| [Poděšín](https://www.podesin.cz) | Zlatý erb 2024, 1. místo (malé obce) | video, statistiky obce, mapa, virtuální prohlídka, mobilní rozhlas | WordPress, vlastní motiv |
| [Příbram](https://www.zpravypribram.cz/pribram-spustila-novy-mestsky-web-ma-zjednodusit-hledani-informaci/) | nový web 18. 9. 2026 | nová informační architektura bez nutnosti znát strukturu úřadu, vyhledávání napříč daty města, chatbot v příští fázi | neuvedeno |
| Uherský Ostroh, Rokytnice n. J., Nový Hrádek | Zlatý erb 2025: 2. a 3. místo, cena za povinné informace | weby automatické čtení zakazují | – |

Z toho plyne, že malá obec vyhrává přehledností a úplností, ne efekty. Šablony pro obce do 2 000 obyvatel proto mají menu nejvýš 5 položek, úřední desku na úvodní stránce a povinné informace vyplněné předem.

## Zahraniční vzory

Z ciziny přebíráme hlavně principy a obchodní model, vzhled jen částečně. Nejbližší obdobu CodeKomu už mají v Rakousku a v Bavorsku.

| Vzor | Co dělá | Co převzít |
|---|---|---|
| [Helsinky](https://www.hel.fi/en) | 7 témat v menu, vyhledávání s AI, mapa služeb, rezervace prostor, verze v prostém a znakovém jazyce | AI vyhledávání (Advance), „populární služby“ pod vyhledáváním |
| [Mnichov](https://stadt.muenchen.de) | vyhledávač služeb, Leichte Sprache, znakový jazyk, 6 jazyků, modrý akcent #005a9f | stránka v prostém jazyce jako widget, služby jako karty |
| [Vídeň](https://www.wien.gv.at) | karty s fotkou, tučným titulkem a perexem, rezervace termínů | jednotný vzhled karet zpráv |
| [GOV.UK principy](https://www.gov.uk/guidance/government-design-principles) | 11 principů: začít potřebou uživatele, dělat méně, „konzistentní, ne uniformní“ | zásady pro psaní obsahu v editoru (nápověda pro starostu) |
| [NL Design System](https://nldesignsystem.nl) | otevřené komponenty, které sdílí Amsterdam, Utrecht, Den Haag i Rotterdam; každé město má vlastní téma přes design tokeny | jedna knihovna komponent, každá obec jen vlastní tokeny barev a písma |
| [Design systém gov.cz](https://designsystem.gov.cz/zaciname/developers/react) | český státní design systém, licence EUPL 1.2, balíčky `@gov-design-system-ce/react` a web components; pro obce není povinný ([Lupa](https://www.lupa.cz/clanky/nove-weby-statu-musi-dodrzet-jednotny-design-jednotnost-neznamena-jednotvarnost-chvali-experti/)) | základ komponent formulářů a úřadu (přístupnost zdarma); vlastní vzhled šablon nad ním |
| [GEM2GO / RIS Kommunal (AT)](https://news.microsoft.com/de-at/features/die-gemeinde-der-zukunft/) | weby 1 100 z 2 096 rakouských obcí na jednom CMS, k tomu aplikace s push zprávami, formuláři a svozem odpadu; PRO tarif má asi čtvrtina obcí | přesně náš model: šablona + aplikace + vyšší tarif |
| [AKDB Bürgerservice-Portal (Bavorsko)](https://www.AKDB.de/fileadmin/akdb_neu/querschnitt/produktblaetter/akdb_buergerservice_portal.pdf) | 70+ online služeb, ePayment, přihlášení eID; přes 1 200 obcí; základní služby platí Bavorsko | při vstupu do Bavorska se napojit na AKDB, nekonkurovat mu |

## Konkurence v ČR

Žádný dodavatel nespojuje web, digitální úřad a řízení budov v jednom produktu. Každý pokrývá jen jeden nebo dva díly. Veřejné smlouvy ukazují, že provoz webu obce stojí 742–1 156 Kč měsíčně bez DPH. Náš ceník 590–1 990 Kč za web je tedy v tržním pásmu.

| Dodavatel | Co nabízí | Rozsah | Cena z veřejných smluv (bez DPH) | Naše šance |
|---|---|---|---|---|
| [Antee (IPO)](https://www.antee.cz/web-pro-obce-a-regiony) | web, úřední deska, e-podatelna, zakázky, doména a e-maily | více než 900 obcí | neuvedena | žádná aplikace ani IoT; „Úřad na dosah“ teprve zavádí |
| [Galileo Corporation](https://www.igalileo.sk/cs/) | web, digitální úřední deska (500+ realizací), aplikace V OBRAZE, SMS, spisová služba | ČR a SR, 20+ let | [Zbiroh 2017](https://www.zbiroh.cz/e_download.php?file=data%2Furedni_deska%2Fobsah807_8.pdf&original=Galileo+Corporation+s.r.o.+-+Smlouva+o+vytvo%C4%B9%E2%84%A2en%C4%82%C2%AD+a+provozu+internet.+str%C4%82%CB%87nek.pdf): 19 900 Kč za web + 8 900 Kč/rok | starší vzhled, žádné IoT |
| WEBHOUSE (vismo) | web na míru, aplikace Města a obce | velká města i MČ | [Odry 2021](https://zakazky.odry.cz/document_1380/797891c2674ffe76b9a044461469fb0a-smlouva-o-vytvoreni-a-sprave-webovych-stranek_el_podpis-pdf): 158 306 Kč za web + 13 872 Kč/rok | drahé založení; my nabídneme šablonu bez vstupní platby |
| [Wertu Studio](https://www.wertu.cz/weby-pro-mesta-a-obce/) | WordPress/Drupal, úřední deska, AI chatbot | jednotky až desítky obcí | neuvedena | AI umíme taky, k tomu úřad a IoT |
| [Obce na webu](https://obcenawebu.cz/) | web, úřední deska, aplikace, SMS, infokiosek v jedné ceně | Brno a okolí | neuvedena | nejbližší konkurent; chybí digitální úřad a IoT |
| [Munipolis](https://ekonomickydenik.cz/komunikacni-sit-propojujici-samospravy-s-obcany-munipolis-roste-ma-ji-kazde-druhe-vetsi-mesto-a-uziva-ji-uz-770-tisic-cechu/) | rozesílání zpráv (SMS, e-mail, push), hlášení závad | 2 700+ obcí, 770 000 uživatelů, tržby 45+ mil. Kč (2022) | neuvedena | nabídnout import kontaktů a přechod, nebo propojení |
| [GORDIC Portál občana](https://gordicportalobcana.cz/portal-obcana-pro-obce-a-mala-mesta/) | platby, formuláře, hlášení, napojení na GINIS | desítky samospráv, od 500 obyvatel | SaaS, cena neuvedena | jen pro obce s GINIS; my se napojíme na víc účetnictví |
| Public4u (as4u), WebJET (WebActive) | redakční systémy středních měst | Prostějov, Přerov, Ústí, Opava | neuvedena | cílí na města, ne na malé obce |
| [Platební portál MSK](https://www.novinykraje.cz/2026/09/08/zaplatit-poplatky-na-par-kliku-mozne-i-na-malych-obcich) | platby poplatků kartou, QR, Apple a Google Pay | obce v MSK do 15 000 obyvatel, od 1. 9. 2026 | zdarma (platí kraj) | v MSK platby nenabízet, napojit se na krajský portál |

## Co musí web obce splnit ze zákona

Nejsilnější prodejní argument je termín **1. 2. 2027**, kdy končí přechodné období zákona o právu na digitální služby ([ISVS](https://www.isvs.cz/obcane-uz-cekat-nechteji-pravo-na-digitalni-sluzby-musi-platit-od-roku-2027/), [Antee](https://www.antee.cz/blog/digitalizace-obci-od-roku-2027-co-musite-co-nemusite-a-proc-v-tom-ma-skoro-kazdy-zmatek)). Body označené * mám z obecné znalosti, ne z otevřeného zdroje. Ověří je advokát (P10).

| Povinnost | Předpis | Co z toho plyne pro CodeKom |
|---|---|---|
| Dodržet přístupnost WCAG 2.1 AA a zveřejnit prohlášení o přístupnosti | zákon 99/2019 Sb. | všechny šablony projdou auditem; editor hlídá kontrast a popisky obrázků a prohlášení vygeneruje |
| Úřední deska přístupná nepřetržitě a dálkově | § 26 správního řádu 500/2004 Sb.* | data vyvěšení a sejmutí, automatické sejmutí, archiv, záznam o vyvěšení; výstup ve formátu otevřených dat (OFN) jako dobrovolný bonus |
| Povinně zveřejňované informace v dané struktuře | zákon 106/1999 Sb. a vyhláška 442/2006 Sb.* | stránka „Povinné informace“ je ve všech šablonách předvyplněná a obec doplní jen údaje |
| Rozpočet, střednědobý výhled, rozpočtová opatření a závěrečný účet zveřejnit dálkově; zákon nepředepisuje formát ([MF](https://mf.gov.cz/cs/rozpoctova-politika/uzemni-rozpocty/legislativa-a-metodicka-podpora-uzemnich-rozpoctu/2023/zverejnovani-dokumentu--rozpocet-stredne-51364)) | zákon 250/2000 Sb. | sekce „Rozpočet“ s hlídáním lhůt; smlouvy o dotacích podle § 10d |
| Digitální úkony v přenesené působnosti do 1. 2. 2027; formuláře dodávají ohlašovatelé agend přes DIA; samo PDF nestačí | zákon 12/2020 Sb. | modul Úřad: rozcestník na státní služby z Katalogu služeb a vlastní formuláře pro samostatnou působnost |
| ORP v režimu nižších povinností; bezpečnostní požadavky musejí být i ve smlouvách s dodavateli ([NÚKIB](https://portal.nukib.gov.cz/storage/uploads/2026/01/05/podpurny-material-obce_v1-1_uid_695bc95eab8c0.pdf), [kybez.cz](https://kybez.cz/novy-zakon-o-kyberneticke-bezpecnosti-co-ceka-obce-s-rozsirenou-pusobnosti/)) | zákon 264/2025 Sb., vyhláška 410/2025 Sb. | připravit bezpečnostní přílohu smlouvy, 2FA, audit log a plán obnovy; pro ostatní obce „přiměřené zabezpečení“ |
| Osobní údaje na úřední desce a ve formulářích | GDPR | anonymizace před vyvěšením (návrh od AI, potvrzuje člověk), lhůty mazání |
| Obecně závazné vyhlášky vycházejí ve Sbírce právních předpisů ÚSC | zákon 35/2021 Sb.* | web vyhlášky jen odkazuje a zobrazuje, nevyhlašuje je |
| Spisová služba v elektronické podobě | zákon 499/2004 Sb.* | CodeKom ji nenahrazuje, napojí se na ni (podatelna → spis) |

## Zdroje

Weby měst a obcí jsou odkazované přímo v tabulkách (staženo 27. 10. 2026). Další zdroje:

- [Zlatý erb 2025: vítěz Jirkov (Deník, 13. 5. 2025)](https://zatecky.denik.cz/kraj-a-okoli/cenu-zlaty-erb-za-nejlepsi-web-obci-a-mest-ziskal-jirkov/)
- [Zlatý erb: absolutní vítězové 1999–2025 (19. 5. 2026)](https://www.averia.news/absolutnimi-vitezi-souteze-zlaty-erb-za-roky-1999-2025-se-staly-jihlava-a-okrisky/)
- [Zlínský kraj: krajské kolo Zlatého erbu (25. 4. 2025)](https://zlinskykraj.cz/tiskove-zpravy/kraj-ocenil-nejlepsi-obecni-webove-stranky-prvenstvi-ziskal-uhersky-ostroh)
- [Nový web Příbrami (25. 9. 2026)](https://www.zpravypribram.cz/pribram-spustila-novy-mestsky-web-ma-zjednodusit-hledani-informaci/)
- [Design systém gov.cz – React](https://designsystem.gov.cz/zaciname/developers/react)
- [Lupa: Weby státu a jednotný design](https://www.lupa.cz/clanky/nove-weby-statu-musi-dodrzet-jednotny-design-jednotnost-neznamena-jednotvarnost-chvali-experti/)
- [GOV.UK design principles](https://www.gov.uk/guidance/government-design-principles)
- [NL Design System](https://nldesignsystem.nl)
- [Microsoft: GEM2GO a obce budoucnosti](https://news.microsoft.com/de-at/features/die-gemeinde-der-zukunft/)
- [AKDB Bürgerservice-Portal](https://www.AKDB.de/fileadmin/akdb_neu/querschnitt/produktblaetter/akdb_buergerservice_portal.pdf)
- [Antee: weby pro obce](https://www.antee.cz/web-pro-obce-a-regiony), [Galileo](https://www.igalileo.sk/cs/), [Wertu](https://www.wertu.cz/weby-pro-mesta-a-obce/), [Obce na webu](https://obcenawebu.cz/)
- [Smlouva Galileo – Zbiroh (2017)](https://www.zbiroh.cz/e_download.php?file=data%2Furedni_deska%2Fobsah807_8.pdf&original=Galileo+Corporation+s.r.o.+-+Smlouva+o+vytvo%C4%B9%E2%84%A2en%C4%82%C2%AD+a+provozu+internet.+str%C4%82%CB%87nek.pdf), [Smlouva WEBHOUSE – Odry (2021)](https://zakazky.odry.cz/document_1380/797891c2674ffe76b9a044461469fb0a-smlouva-o-vytvoreni-a-sprave-webovych-stranek_el_podpis-pdf)
- [Munipolis: 770 000 uživatelů (2023)](https://ekonomickydenik.cz/komunikacni-sit-propojujici-samospravy-s-obcany-munipolis-roste-ma-ji-kazde-druhe-vetsi-mesto-a-uziva-ji-uz-770-tisic-cechu/)
- [Seznam Zprávy: digitalizace malých obcí (2023)](https://seznamzpravy.cz/clanek/ekonomika-firmy-vesnicko-ma-digitalni-nova-doba-uz-prisla-i-do-nejmensich-obci-239262)
- [GORDIC Portál občana pro obce](https://gordicportalobcana.cz/portal-obcana-pro-obce-a-mala-mesta/)
- [Platební portál MSK (8. 9. 2026)](https://www.novinykraje.cz/2026/09/08/zaplatit-poplatky-na-par-kliku-mozne-i-na-malych-obcich)
- [Antee: Digitalizace obcí od roku 2027 (19. 10. 2026)](https://www.antee.cz/blog/digitalizace-obci-od-roku-2027-co-musite-co-nemusite-a-proc-v-tom-ma-skoro-kazdy-zmatek)
- [ISVS: Právo na digitální služby od 2027](https://www.isvs.cz/obcane-uz-cekat-nechteji-pravo-na-digitalni-sluzby-musi-platit-od-roku-2027/)
- [NÚKIB: Kybernetická bezpečnost obcí (5. 1. 2026)](https://portal.nukib.gov.cz/storage/uploads/2026/01/05/podpurny-material-obce_v1-1_uid_695bc95eab8c0.pdf), [kybez.cz: ORP a nový zákon](https://kybez.cz/novy-zakon-o-kyberneticke-bezpecnosti-co-ceka-obce-s-rozsirenou-pusobnosti/)
- [MF: Zveřejňování rozpočtových dokumentů](https://mf.gov.cz/cs/rozpoctova-politika/uzemni-rozpocty/legislativa-a-metodicka-podpora-uzemnich-rozpoctu/2023/zverejnovani-dokumentu--rozpocet-stredne-51364)
- [NIA: Příručka kvalifikovaného poskytovatele](https://info.identita.gov.cz/download/SeP_PriruckaKvalifikovanehoPoskytovatele.pdf)

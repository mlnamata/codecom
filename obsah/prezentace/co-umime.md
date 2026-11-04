---
title: "Co CodeKom umí: web, úřední deska, aplikace a úřad"
description: "Pět modulů pro obec: web s elektronickou úřední deskou, aplikace pro občany, digitální úřad, chytré budovy a AI asistent. U každého píšeme i to, co nedělá."
adresa: "/co-umime"
---

{/* Odkazy: #demo = NEXT_PUBLIC_DEMO_URL, #aplikace = NEXT_PUBLIC_APP_DEMO_URL. Bez vyplněné proměnné se odkaz nezobrazí. */}

# Co CodeKom umí

CodeKom je jeden systém pro web obce, úřední desku, aplikaci pro občany, služby úřadu a obecní budovy. Obec si vybere, které moduly chce, a další může přidat později. U každého modulu píšeme, komu pomáhá, co dělá a co nedělá.

## Web a úřední deska

Pro starostu, účetní a každého, kdo web obce spravuje.

- Web podle jedné z 20 šablon, každá ve 3 barevných variantách. Obsah píšete do pevných míst šablony, rozvržení nejde rozbít.
- Povinně zveřejňované informace ve struktuře podle vyhlášky č. 515/2020 Sb.
- Elektronická úřední deska s evidencí vyvěšení a sejmutí. Dokument, který už na desce visel, nejde smazat a každá změna se uloží jako nová verze.
- Po posledním dni vyvěšení dokument přejde do archivu, nebo z webu zmizí, je-li označený „Po sejmutí nezveřejňovat“. To je výchozí volba.
- Přístupnost: web stavíme podle WCAG 2.2 AA a editor nepustí do publikace změnu, která přístupnost rozbije. Každý web má prohlášení o přístupnosti.

Editor má tři úrovně. Základ: píšete obsah. Pokročilý: skládáte stránky. Advance: upravujete skoro vše. Podrobnosti jsou v [ceníku](/cenik).

Co nedělá: nenahrazuje spisovou službu obce. Systém lhůty na desce hlídá a upozorní na ně, za obsah dokumentů a za dodržení lhůt ale odpovídá obec.

[Prohlédnout živou ukázku Javoří Lhoty](#demo)

## Aplikace pro občany

Pro občany a chalupáře, kteří chtějí vědět, co se v obci děje, a pro starostu, který potřebuje rychle předat zprávu.

- Jedna aplikace CodeKom s rolemi občan a úřad. Občan si vybere svou obec a může sledovat i další.
- Hlášení obce do mobilu: oznámení a hlášení rozhlasu napsané textem, i pro jednotlivé části obce.
- Krizová hlášení: vždy jen jedno, to nejzávažnější. Úroveň je napsaná slovem a krizovou situaci nejde v aplikaci zavřít.
- Krizové hlášení vydává jen správce obce. Redaktor může připravit koncept.
- Obsah obce a krizová hlášení si přečtete i bez účtu. Účet se zakládá e-mailem a jednorázovým kódem, bez hesla.

Co nedělá: nenahrazuje varovný systém IZS, sirény ani obecní rozhlas. Oznámení nemusí dojít, například při vypnutém telefonu nebo výpadku sítě, proto má obec vždy i jiný kanál.

[Vyzkoušet aplikaci](#aplikace)

## Digitální úřad

Pro občany, kteří chtějí věci vyřídit bez cesty na úřad, a pro úřad, který nechce přepisovat papíry.

- Místní poplatky, například za odpad a ze psů, s QR platbou.
- Rezervace sálu a dalších prostor se schválením obcí.
- Hlášení závad s fotkou a popisem místa. Občan dostane číslo a sleduje, jak se hlášení řeší.
- Formuláře a průvodce životními situacemi: co vyřídíte online, kdy musíte na úřad a co proběhne samo.
- Peníze občanů jdou přímo na účet obce. CodeKom peníze nikdy nedrží.

Každá online služba má na stránce i cestu přes úřad: telefon, úřední hodiny a adresu.

Co nedělá: nenahrazuje spisovou službu ani účetnictví obce, napojuje se na ně. Hlášení závady není úřední podání podle správního řádu. Přihlášení Identitou občana připravujeme, podmínky napojení ještě ověřujeme.

## Chytré budovy

Pro obec, která předává klíče od sálu osobně a nechce topit v prázdných budovách, a pro správce budov.

- Topení po místnostech podle týdenního plánu a podle rezervací. Sál se před akcí předtopí.
- Zámek s časově omezeným kódem pro nájemce a záznam vstupů.
- Upozornění na mráz v budově, únik vody, otevřené okno a slabou baterii.
- Přehled spotřeby elektřiny po budovách.

Brána v budově řídí topení a zámky i bez internetu. Ochrana proti mrazu nezávisí na cloudu. Zámek jde vždy otevřít klíčem.

Úsporu energie chceme měřit. Kolik obec ušetří, napíšeme až z vlastních naměřených dat z budov.

- Fotka `prezentace-topeni`. Alt text: Termostatická hlavice na radiátoru v obecním sále. Popisek: Ilustrační fotografie vytvořená umělou inteligencí.
- Fotka `prezentace-zamek`. Alt text: Vstupní dveře obecní budovy se zámkem a klávesnicí na kód. Popisek: Ilustrační fotografie vytvořená umělou inteligencí.

Co nedělá: nenahrazuje certifikované požární a zabezpečovací systémy. Zařízení do budov a jejich montáž nejsou součástí měsíční ceny. Ruční zálohu, tedy klíč a ovládání topení na místě, zajišťuje obec. Aplikace budovy v první verzi jen zobrazuje, ovládání na dálku přibude později a bude vyžadovat zvláštní oprávnění.

## AI asistent

Pro občany, kteří se ptají i mimo úřední hodiny, a pro úřad, který odpovídá pořád na stejné otázky.

- Asistent vždy řekne, že je umělá inteligence. Vyžaduje to čl. 50 nařízení o umělé inteligenci (AI Act), který platí od 2. 8. 2026.
- Odpovídá jen z dokumentů obce a u odpovědi uvede, odkud ji má.
- Dotazy neukládá k jménu ani k účtu a netrénuje se na nich.
- Běží na serveru v České republice.

Asistent je součástí úrovně Advance.

Co nedělá: není úředník. Jeho odpověď není právní rada, rozhodnutí obce ani závazný slib. Může se splést, proto u důležitých věcí odkáže na úřad.

## Co neděláme s daty obce

Dokumenty a osobní údaje obce nepoužíváme pro vlastní účely, neprodáváme je a netrénujeme na nich obecné modely umělé inteligence. Podrobnosti jsou na stránce [Bezpečnost a právo](/bezpecnost-a-pravo).

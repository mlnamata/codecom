---
title: "Bezpečnost a právo: data v EU, GDPR, přístupnost"
description: "Kde jsou data obce, kdo je správce a kdo zpracovatel, jak plníme zákon o přístupnosti a AI Act a co slibujeme podle zákona o kybernetické bezpečnosti."
adresa: "/bezpecnost-a-pravo"
---

# Bezpečnost a právo

Na této stránce píšeme, co děláme a kde je to napsané. Podrobnosti jsou ve vzorové smlouvě o poskytování služby a ve smlouvě o zpracování osobních údajů na stránce [Ke stažení](/ke-stazeni). Oba dokumenty jsou návrhy, které před podpisem s první obcí zkontroluje advokát.

{/* kotva: data-v-eu */}

## Data v EU

Data obcí ukládáme v Evropské unii.

- Databáze, přihlašování a soubory: Supabase v regionu AWS Frankfurt.
- Web a aplikace: Vercel v regionu Frankfurt [OVĚŘIT].
- AI asistent: vlastní server v České republice.

Do zemí mimo EU data předáváme jen podle kapitoly V obecného nařízení o ochraně osobních údajů (GDPR) a jen podzpracovatelům ze seznamu níže.

### Podzpracovatelé

Seznam je stejný jako v příloze B2 smlouvy o zpracování osobních údajů.

| Podzpracovatel | Co dělá | Kde jsou data | Předání mimo EU |
|---|---|---|---|
| Supabase Pte. Ltd., Singapur | databáze, přihlašování, soubory | region AWS Frankfurt | technická podpora mimo EU na základě standardních smluvních doložek |
| Vercel Inc., USA | provoz webu a aplikace | region Frankfurt [OVĚŘIT] | [OVĚŘIT: Data Privacy Framework nebo standardní smluvní doložky] |
| [DOPLNIT: poskytovatel serveru], ČR | server s AI asistentem | ČR | ne |
| Google (Firebase Cloud Messaging), Apple (Push Notification service) | doručení oznámení do telefonu | [OVĚŘIT] | [OVĚŘIT] |
| [DOPLNIT: e-mailová služba] | odesílání e-mailů | EU [OVĚŘIT] | [OVĚŘIT] |
| [DOPLNIT: SMS brána], ČR | odesílání SMS | ČR | ne |

Nového podzpracovatele oznámíme obci nejméně 30 dní předem. Obec může do 30 dní vznést námitku, a když se nedohodneme, může smlouvu vypovědět a dostane zpět poměrnou část ceny.

{/* kotva: zpracovani */}

## Smlouva o zpracování osobních údajů

U dat občanů je správcem obec a CodeKom je zpracovatel podle čl. 28 GDPR. Správcem je CodeKom jen u účtů v aplikaci a u vlastního obchodu s obcemi. Smlouva o zpracování je příloha smlouvy o službě a je [ke stažení](/ke-stazeni).

Co ve smlouvě slibujeme:

- Osobní údaje zpracováváme jen pro obec a jen v rozsahu potřebném pro službu.
- Porušení zabezpečení oznámíme obci nejpozději do 24 hodin od zjištění.
- Obec může jednou ročně provést audit, po incidentu kdykoli.
- Dokumenty a osobní údaje obce nepoužíváme pro vlastní účely, neprodáváme je a netrénujeme na nich obecné modely umělé inteligence.
- Po skončení smlouvy umožníme export dat 30 dní. Potom data smažeme do 60 dní, ze záloh do 90 dní, a výmaz písemně potvrdíme.

### Technická a organizační opatření

Podle přílohy B3 smlouvy o zpracování:

- přenos přes TLS 1.2 a novější, šifrované úložiště a zálohy,
- role správce a redaktora s nejmenšími nutnými oprávněními, dvoufázové přihlášení pro správce, zámek účtu po 5 neúspěšných pokusech,
- data každé obce jsou oddělená na úrovni databáze a přístup hlídá databáze, ne jen aplikace,
- zálohy denně, uchování 30 dní, zkouška obnovy jednou za čtvrtletí,
- historie verzí obsahu s autorem a časem změny.

{/* kotva: pristupnost */}

## Přístupnost

Obce jsou povinným subjektem podle zákona č. 99/2019 Sb., o přístupnosti internetových stránek a mobilních aplikací. Metodický pokyn Digitální a informační agentury požaduje normu EN 301 549 V3.2.1, tedy úroveň WCAG 2.1 AA.

Weby obcí stavíme podle novější WCAG 2.2 AA. Editor před publikací zkontroluje přístupnost a změnu, která ji rozbije, nepustí ven. Každý web má prohlášení o přístupnosti a odkaz na něj v patičce.

Za přístupnost obsahu, který obec vloží, například naskenovaných dokumentů, odpovídá obec. Editor na nepřístupné PDF upozorní.

{/* kotva: uredni-deska */}

## Úřední deska

- Dokument, který už na desce visel, nejde smazat. Hlídá to i databáze.
- Každá změna dokumentu se uloží jako nová verze.
- U každého dokumentu je záznam o vyvěšení a sejmutí. Obec si ho může stáhnout, když potřebuje doložit, co a kdy viselo.
- Po posledním dni dokument přejde do archivu, nebo z webu zmizí, je-li označený „Po sejmutí nezveřejňovat“. To je výchozí volba, aby dokumenty s osobními údaji po sejmutí nezůstávaly na webu.

Za obsah dokumentů a za dodržení lhůt odpovídá obec.

{/* kotva: ai-act */}

## Umělá inteligence a AI Act

Od 2. 8. 2026 platí čl. 50 nařízení o umělé inteligenci (AI Act). Kdo s AI mluví, musí vědět, že to je AI.

- AI asistent vždy řekne, že je umělá inteligence.
- Odpovídá jen z dokumentů dané obce a cituje je.
- Dotazy neukládá k jménu ani k účtu a netrénuje se na nich. Text dotazu se uchovává [OVĚŘIT: 30] dní, potom zůstanou jen anonymní statistiky.
- Model běží na serveru v České republice.

Fotografie vytvořené umělou inteligencí označujeme vždy popiskem „Ilustrační fotografie vytvořená umělou inteligencí“. Zda to vyžaduje čl. 50 odst. 4 AI Actu, ověřujeme [OVĚŘIT].

{/* kotva: kyberneticka-bezpecnost */}

## Kybernetická bezpečnost

Od 1. 11. 2025 platí zákon č. 264/2025 Sb., o kybernetické bezpečnosti. Zda je obec regulovaná, si ověří kalkulačkou Národního úřadu pro kybernetickou a informační bezpečnost (NÚKIB).

Je-li obec regulovaná, poskytneme jí podle smlouvy součinnost: informace o bezpečnostních opatřeních, hlášení incidentu do 24 hodin a možnost auditu. Podrobnosti strany uvedou v příloze smlouvy.

{/* kotva: krizova-hlaseni */}

## Krizová hlášení

Krizová hlášení v aplikaci a na webu jsou doplňkový kanál obce. Nenahrazují varovný systém IZS, sirény ani obecní rozhlas a obec má vždy záložní kanál. Krizové hlášení vydává jen správce obce.

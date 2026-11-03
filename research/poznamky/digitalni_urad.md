# Digitální úřad obce (modul CodeKom) – právní a integrační požadavky, stav k 3. 11. 2026

Pozn.: výzkum byl omezen počtem volání nástrojů; řada primárních zdrojů (e-Sbírka, ceníky bran) se nepodařilo načíst. Položky bez zdroje jsou záměrně jen v sekcích Inferences/Gaps a jsou označeny "NEOVĚŘENO".

## 1. Zákon č. 12/2020 Sb. o právu na digitální služby (ZoPDS)

### Takeaway
Samosprávné služby obcí (poplatky, pronájem sálu, hlášení závad) obec poskytovat digitálně NEMUSÍ (§ 14 odst. 3 = právo, ne povinnost); povinnost "digital-first" dopadá hlavně na přenesenou působnost od 1. 2. 2025. CodeKom tedy staví na dobrovolné nabídce obce, ale musí být v souladu s pravidly pro samoobslužné portály (ISVS, NIA, grafický manuál).

### Cited Findings
- § 3 odst. 1: uživatel má právo na digitální služby, OVM (vč. obcí v přenesené působnosti) je musí poskytovat. § 2 odst. 2–3: digitální služba = úkon OVM uvedený v Katalogu služeb v elektronické podobě. — [Školení ZoPDS, Kraj Vysočina (30. 11. 2023)](https://extranet.kr-vysocina.cz/download/odbor_informatiky/prezentace/ComDays/30-11-23/ZoPDS/20230930%20Skoleni%20ZoPDS.pdf)
- § 4 odst. 1 a–e: kanály digitálního úkonu = datová schránka, kontaktní místo, e-mail s elektronickým podpisem, ISVS s elektronickou identifikací. — tamtéž
- § 4 odst. 3: OVM zveřejňují elektronické formuláře prostřednictvím Agentury (DIA); po eID přihlášení se předvyplňují z registrů. Pokud formulář není zveřejněn, může uživatel podat digitální úkon v jakémkoli formátu povoleném archivním/spisovým právem a je zproštěn povinností dle § 7 (údaje) a § 9 (dokazování). — tamtéž
- § 7, § 9 odst. 2: OVM nesmí požadovat údaje, ke kterým má přístup (zásada "jednou a dost"). — tamtéž
- § 14 odst. 1: fyzickou nepodnikající osobu nelze nutit k digitálním úkonům → musí zůstat papír/asistence. — tamtéž
- § 14 odst. 3: územní samosprávný celek v samostatné působnosti má PRÁVO, ne povinnost poskytovat digitální služby. — tamtéž
- Datum: zákon účinný od 1. 2. 2020; 1. 2. 2025 = konec 5leté lhůty, kdy mají být všechny katalogizované úkony digitální (kde to povaha nevylučuje). — tamtéž
- Katalog služeb: obce mají používat jako primární zdroj informací o službách; možný federovaný katalog (přenesená z centrálního + lokální detaily; samostatná působnost a soukromoprávní služby z obce). — tamtéž
- Samoobslužný portál obce s předvyplněnými formuláři musí: být registrován jako ISVS, být spravován OVM, být součástí federace NIA, dodržet grafický manuál, podporovat kanály z § 4. — tamtéž
- Poplatky podle 565/1990 jsou zvláštní případ: obec musí digitální službu zajistit sama (nespadá do centrálních služeb). — tamtéž
- Metodika evidence služeb (DIA): [PMA3 MV20002](https://dia.gov.cz/media/416/download/PMA3_MV20002_metodika-pro-evidenci-sluzeb_A4.pdf) (nečteno do hloubky, jen nalezeno).

### Inferences
- Pro pilotní obce <2 000 obyv. je modul CodeKom nabídkou nad rámec zákonné povinnosti (samostatná působnost); prodejní argument = soulad s katalogem služeb/NIA, ne "musíte".
- Pokud CodeKom nabídne portál s předvyplněním z NIA, formálně jde o ISVS obce → registrace ISVS a grafický manuál DIA; bez NIA (anonymní formuláře, e-mail/DS) se těmto požadavkům lze vyhnout.
- Provozovatelem/žadatelem u NIA musí být obec (OVM), CodeKom jen jako dodavatel (viz sekce 3).

### Gaps
- Stav implementace v malých obcích (statistiky, 2025–2026) – nenalezeno. Zdroj k dohledání: dia.gov.cz, ČSÚ/ISVS, Svaz měst a obcí.
- Aktuální konsolidované znění ZoPDS k 11/2026 (novely po 2025) – nenačteno e-Sbírka.
- Konkrétní povinnost "přihlášení k obci" – prezentace žádnou neuvádí.

## 2. Kdy podání obci vyžaduje identifikaci / podpis; které formuláře mohou být anonymní

### Takeaway
Podání ve správním řízení (§ 37 odst. 4 SŘ) potřebuje identifikaci/podpis (DS, UEP, nebo následné potvrzení), ale neformální podněty (hlášení závad) a rezervace mimo správní řízení mohou být bez ověření; poplatková agenda (ohlášení poplatku) je daňově-správní a vyžaduje identifikovatelného poplatníka.

### Cited Findings
- Podání z datové schránky má dle § 18 odst. 2 zákona 300/2008 Sb. účinky písemného podepsaného podání (DS identifikuje odesílatele); kvalifikovaný podpis není vyžadován. — [epravo.cz, k problematice absence el. podpisu](https://www.epravo.cz/top/clanky/k-problematice-absence-elektronickeho-podpisu-podani-a-jeho-priloh-99574.html)
- Při použití cizí DS je třeba podpis (uznávaný el. podpis) přílohy. — tamtéž
- § 37 odst. 2 SŘ: podání musí obsahovat označení orgánu, náležitosti a podpis podatele (u písemného). — tamtéž
- Pokud formulář OVM není zveřejněn, lze podat digitální úkon v jakémkoli formátu (§ 4 odst. 3 ZoPDS). — [Školení ZoPDS](https://extranet.kr-vysocina.cz/download/odbor_informatiky/prezentace/ComDays/30-11-23/ZoPDS/20230930%20Skoleni%20ZoPDS.pdf)
- Metodika MV pro vyřizování e-podání a pokyn k § 37 odst. 4 SŘ (potvrzení/doplnění podání do 5 dnů): [MV – 121/2012 potvrzení nebo doplnění podání](https://mv.gov.cz/soubor/121-2012-potvrzeni-nebo-doplneni-podani-ucineneho-podle-37-odst-4-spravniho-radu.aspx) (nedočteno).

### Inferences (NEOVĚŘENO právně, k ověření právníkem)
- Anonymně: hlášení závad (podnět, ne podání ve správním řízení), dotaz, rezervace sálu bez právního účinku (identifikace stačí jméno+e-mail/telefon, ale pronájem je soukromoprávní smlouva).
- Ověřená identita (NIA nebo DS nebo UEP) vhodná pro: ohlášení poplatku za odpad (§ 14 zák. 565/1990 + OZV), poplatek ze psa (ohlášení držitele), povolení záboru veřejného prostranství (správní řízení/ohlášení dle OZV). Alternativa: formulář bez ověření + dodatečné potvrzení podepsaným podáním do 5 dnů (§ 37 odst. 4 SŘ) – obec rozhodne.
- Doporučení pro spec: každý formulář má v konfiguraci pole `identification_level` = none | email_verified | nia | ds_or_uep a příznak "typ podání" (podnět / správní podání / soukromoprávní).

### Gaps
- Přesná úprava podání poplatkových ohlášení (daňový řád jako subsidiární dle § 15? zák. 565/1990 – § 11 odst. 1 odkaz na daňový řád) nebyla ověřena; k ověření v e-Sbírce.
- Nelze potvrdit text § 37 odst. 4 SŘ ze zdroje (článek jej neřeší).

## 3. Integrace s NIA (Identita občana) pro web obce / poskytovatele

### Takeaway
NIA se připojuje jako "poskytovatel služby (SeP)"; OVM se registruje sám přes datovou schránku. Protokoly: SAML 2 (eIDAS), OpenID Connect, WS-Federation. Soukromoprávní subjekt může jen pokud má zákonnou povinnost ověřovat identitu → CodeKom jako takový NEMŮŽE, žadatelem musí být obec.

### Cited Findings
- Registrace SeP na identita.gov.cz: přihlášení přes ISDS (datová schránka OVM), zadání IČO, popisu, právního základu pro ověření, URL přihlášení (HTTPS 443), ACS URL, logout URL, šifrovací certifikát (v produkci povinný), logo ≥65×65 px, kontakty. — [SeP příručka kvalifikovaného poskytovatele](https://info.identita.gov.cz/download/SeP_PriruckaKvalifikovanehoPoskytovatele.pdf)
- Protokoly: WS-Federation, SAML 2/eIDAS, OpenID Connect (client_id, redirect_uri; LoA přes scope/acr). Endpointy: tnia.identita.gov.cz (test), nia.identita.gov.cz (produkce). — tamtéž
- Atributy: příjmení, jméno, datum a místo narození, adresa, PersonIdentifier, e-mail, telefon, věk, isAgeOver, RÚIAN adresa, doklady; uživatel schvaluje každý atribut; žádat jen minimum. — tamtéž
- Soukromé subjekty: žádost datovou zprávou na DS DIA (předmět "Žádost o připojení k testovacímu/produkčnímu prostředí NIA"); do produkce jen subjekty s právní povinností ověřovat identitu. — tamtéž
- Poskytovatelé ve stejné skupině vydávání (BSI) dostávají stejný pseudonym občana. — tamtéž
- Příručka neuvádí náklady ani lhůty vyřízení. — tamtéž
- Samoobslužný portál s předvyplněním musí být ISVS a součástí federace NIA (viz sekce 1).
- Gordic Portál občana (GINIS) již NIA integruje v transakční části. — [Gordic eGC SaaS nabídka](https://www.dia.gov.cz/wp-content/uploads/2023/03/eGc-Nabidka_cloud_computingu-SaaS_c_1-2020_spol_Gordic_-_20210723.pdf)

### Inferences
- Architektura: obec = SeP/OVM (jedna registrace na obec, vlastní IČO a DS OVM), CodeKom implementuje OIDC klienta; pro multi-tenant potřeba vlastní konfigurace/redirect URI/šifrovací certifikát PER obec (nebo vlastní doména obce). Tajemství držet v Supabase Vault / KMS.
- Pseudonym PersonIdentifier je klíč občanského účtu; neukládat víc atributů než nutné (GDPR minimalizace).
- Cena za NIA nezjištěna, u OVM pravděpodobně bez poplatku (NEOVĚŘENO).
- Pro Expo mobil: NIA podporuje mobilní aplikace s heslem ≥17 znaků (viz příručka) – řešit přes systémový prohlížeč/PKCE.

### Gaps
- Náklady, doba schválení, přesné podmínky OIDC (PKCE, client auth) – příručka je neobsahuje; dohledat info.identitaobcana.cz / "Čistý test".
- Zda může komerční dodavatel vystupovat jako "zprostředkovatel/agent" za OVM – nepotvrzeno.

## 4. Datové schránky (ISDS) API

### Takeaway
ISDS má SOAP web services (dm_operations, dm_info, db_access); aplikace třetí strany (spisovka, ERP) je smí používat s přihlášením systémovým certifikátem/basic auth; schránku obce ale drží obec – CodeKom smí jednat jen jako pověřená osoba / v rámci schváleného přístupu.

### Cited Findings
- WS: dm_operations (CreateMessage, MessageDownload, ...), dm_info (GetListOfReceivedMessages, GetDeliveryInfo, MarkMessageAsDownloaded, ...), db_access. — [Provozní řád ISDS (2012)](https://testrs.gov.cz/smlouva/soubor/37256/Provozni_rad_ISDS.pdf)
- Endpointy: ws1.mojedatovaschranka.cz/DS/* (basic), ws1c.mojedatovaschranka.cz/cert/DS/* (systémový certifikát), /certds/ (uživatelský cert + basic), /hspis/ (hostovaná spisovka, ID schránky jako login). — tamtéž
- Limity: celková velikost příloh 10 MB, max 50 příjemců; zprávy uchovány 90 dní po přihlášení oprávněné osoby. — tamtéž
- Pověřená osoba: § 8 odst. 6–7 zákona 300/2008 – oprávněná osoba může pověřit další osoby s právy čtení, vytváření/odesílání, přehled doručenek. — tamtéž
- Rozhraní pro "poskytovatele internetových služeb" jen s povolením provozovatele (MV). — tamtéž
- Pro aplikace třetích stran se doporučuje basic autentizace se systémovým certifikátem. — tamtéž
- Každé volání dm_info/dm_operations kromě CreateMessage... způsobí přihlášení do schránky a doručení fikcí (§ 17 odst. 3) – pozor na automatizaci. — tamtéž
- Podání z DS = účinky podepsaného písemného (viz sekce 2).

### Inferences
- Dokument je z 2012 – aktuální technické přílohy (Technical Annex, nové WS, tzv. "ISDS REST"? ) NEOVĚŘENO.
- Doporučená varianta MVP: CodeKom NEČTE DS obce; místo toho odesílá podání do e-podatelny (e-mail/API spisovky) a spisovka obce má vlastní ISDS integraci (viz sekce 5). Odeslání odpovědi občanovi přes DS = fáze 2 s pověřenou osobou/systémovým certifikátem obce.
- Knihovny (nezjištěno v tomto výzkumu): zkontrolovat Node/TS SOAP (soap/strong-soap) generované z WSDL; hotová knihovna např. isds (Python, CZ.NIC "libisds") – NEOVĚŘENO.

### Gaps
- Aktuální technická specifikace (WSDL verze, Technical Annex 2), podmínky pro SaaS poskytovatele, ceny – nenačteno.
- Zda a jak lze získat "povolení" pro třetí stranu (mojedatovaschranka.cz).

## 5. Spisová služba v malých obcích, NSESSS, předání podání

### Takeaway
Dominují produkty Gordic GINIS (Express pro <5 000 obyv.), a další (VERA, Triada, Alis, Munis – NEOVĚŘENO v tomto běhu). Spisovky musí splňovat NSESSS a mít atest; předání podání je realisticky přes e-podatelnu (e-mail / DS) nebo API produktu.

### Cited Findings
- GINIS Express pro malé organizace (do 5 tis. obyv.); GINIS zahrnuje spisovou službu, podatelnu, spisovnu, el. úřední desku, Portál občana s formuláři a el. platbami, modul pohledávek napojený na banky a Českou poštu, rozhraní XRG pro výměnu dat s třetími systémy, správu datových schránek. — [Gordic eGC SaaS nabídka](https://www.dia.gov.cz/wp-content/uploads/2023/03/eGc-Nabidka_cloud_computingu-SaaS_c_1-2020_spol_Gordic_-_20210723.pdf)
- Elektronické spisové služby musí mít atest (shoda s NSESSS): [Lupa.cz – atest spisových služeb](https://www.lupa.cz/pr-clanky/revoluce-ve-sprave-dokumentu-elektronicke-spisove-sluzby-musi-mit-atest/) (nedočteno do hloubky).
- Zdroje k NSESSS: mvcr.cz (spisová služba) – odkaz ve výsledcích vyhledávání, nenačteno.

### Inferences
- Pro MVP: "adaptér spisovky" jako plugin: (a) e-mail do podatelny s PDF/A + strojově čitelné XML/JSON příloha, (b) ISDS odeslání do DS obce, (c) později API konkrétních systémů (GINIS XRG, další). Datový model podání uložit i jako PDF/A s metadaty (NSESSS vyžaduje metadata, ověřit).
- Malé obce často nemají plnou spisovku nebo používají sdílenou (např. přes ORP/mikroregion) – nutné zjistit v pilotu.

### Gaps
- Tržní podíl VERA/Triada/Alis/Munis, jejich API a ceny – nenalezeno. Aktuální znění NSESSS (Věstník MV 2025 č. 10 se zmiňuje jako výsledek vyhledávání, nečteno).

## 6. Platby: brány, QR platba, VS, párování, PSD2

### Takeaway
QR platba (SPD) je nejlevnější a nejjednodušší cesta pro prostředky přímo na účet obce (VS per plátce, párování z bankovního výpisu); karetní/bankovní brány přidat jako volitelné s účtem obce jako merchant. Platforma, která jen předává příkaz bráně/bance, nejspíš nevyžaduje licenci, ale nutno ověřit.

### Cited Findings
- SPD v1.2 (ČBA, účinný od 1. 1. 2022): hlavička `SPD*1.0*`, povinné ACC (IBAN, max 46 zn., volitelně +BIC), AM (max 10 zn., 2 des. místa), CC (CZK), X-VS/X-SS/X-KS (max 10 číslic), MSG (max 60), RN (max 35), DT (YYYYMMDD), PT (IP = okamžitá platba), RF, CRC32; hodnoty nesmí obsahovat `*` (kódovat %2A); doporučená korekce chyb QR úroveň M; alfanumerický režim zmenší kód. — [Standard QR platba v1.2 (qr-platba.cz)](https://qr-platba.cz/wp-content/uploads/1645-standard-qr-v1-2-cerven-2021.pdf)
- Příklad: `SPD*1.0*ACC:CZ3301000000000002970297*AM:555.55*CC:CZK*MSG:PRISPEVEK NA NADACI*` — tamtéž
- Comgate (ceník z článku 23. 1. 2024, nutno ověřit aktuální): Easy karta 0,9 % + 1 Kč, bankovní převod 0,9 % + 1 Kč, měsíční poplatek zdarma nebo 100 Kč, zřízení zdarma, výplata na účet zdarma, refund 2 Kč; notifikace karta ~30 min, převod ~2 dny. — [Banky.cz recenze Comgate](https://www.banky.cz/clanky/recenze-platebni-brany-comgate-jak-funguje-a-jake-jsou-jeji-vyhody-a-nevyhody/)
- PISP (nepřímé dání platebního příkazu) definováno v § 2 odst. 1 písm. k) zákona 370/2017 Sb.; licence ČNB (platební instituce kapitál 20 000–125 000 EUR dle služeb; řízení 5–10 měsíců). Článek z 2. 3. 2018. — [epravo.cz PSD2](https://epravo.cz/top/clanky/psd2-a-nova-platebni-sluzba-neprime-udeleni-platebniho-prikazu-107127.html)
- Gordic Portál občana nabízí online platby a napojení pohledávek na banky. — [Gordic eGC](https://www.dia.gov.cz/wp-content/uploads/2023/03/eGc-Nabidka_cloud_computingu-SaaS_c_1-2020_spol_Gordic_-_20210723.pdf)

### Inferences
- Model "obec je merchant": každá obec uzavře smlouvu s bránou (Comgate/GP webpay/GoPay) na svůj účet a CodeKom používá její API klíče (ukládat šifrovaně per tenant) → CodeKom nikdy nedrží peníze; to také minimalizuje PSD2 riziko (CodeKom ani neiniciuje platbu z účtu plátce, jen přesměruje). Právní stanovisko doporučeno.
- VS generovat per plátce a typ poplatku (≤10 číslic; unikátní v rámci obce); QR kód + IBAN obce; párování: bankovní API (např. FIO API token read-only, ČSOB/KB/Air Bank – NEOVĚŘENO) nebo import GPC/ABO/CAMT.053; webhook brány pro karty.
- Uvedený ceník Comgate je z roku 2024 – cena obce se může lišit; sazby GP webpay, GoPay, ČSOB, KB, Stripe nenalezeny.
- Pozor: u poplatků dle 565/1990 je příjem v rozpočtu obce, označení platby (VS, SS) typicky dle rozpočtové skladby a OZV; konzultovat s ekonomkou obce.

### Gaps
- Ceníky GP webpay, GoPay, ČSOB Platební brána, KB Smartpay, Stripe (CZ), poplatky za QR/IP – nenalezeno.
- Bankovní API pro párování a jejich podmínky; formáty GPC/ABO – nenačteno.
- Stanovisko ČNB k platformám/technickým poskytovatelům (výjimka technical service provider § 3? zák. 370/2017) – nepotvrzeno; nutná právní konzultace.

## 7. Místní poplatky (zákon č. 565/1990 Sb.) a struktura OZV

### Takeaway
Maxima dle znění platného od 1. 1. 2025 (verze 25 na zakonyprolidi): pes 1 500 Kč/rok, veřejné prostranství 10 Kč/m²/den, odpad max 1 200 Kč/osoba/rok (obecní systém) – nutno ověřit změny platné k 2026.

### Cited Findings
- Pes (§ 2): držitel psa staršího 3 měsíců; max 1 500 Kč/rok; 65+ max 200 Kč; za druhého a dalšího psa +50 %; osvobození (nevidomí, ZTP, ZTP/P, útulky...). Poměrná část podle započatých měsíců. — [zakonyprolidi 565/1990](https://www.zakonyprolidi.cz/cs/1990-565)
- Veřejné prostranství (§ 4): max 10 Kč za m²/den; až 10× u prodejních a reklamních zařízení, lunaparků; možný paušál týdenní/měsíční/roční; osvobození u charitativních akcí. — tamtéž
- Komunální odpad (§§ 10d–10r; § 10b zrušen): obec smí zavést jen jeden z poplatků: (a) poplatek za obecní systém odpadového hospodářství (§§ 10e–10h) max 1 200 Kč/rok, poplatník fyz. osoba přihlášená v obci nebo vlastník nemovitosti bez přihlášených; sleva 1/12 za měsíc; (b) poplatek za odkládání z nemovité věci (§§ 10i–10n): max 6 Kč/kg nebo 1 Kč/l. — tamtéž
- Správce = obecní úřad (§ 15); ohlášení: lhůta dle OZV, změny do 15 dnů (§ 14a); splatnost dle OZV (§ 14); u poplatků vyměřených rozhodnutím 30 dnů (§ 11b); zvýšení za pozdní úhradu až dvojnásobek (§ 11c). — tamtéž
- Znění k 1. 1. 2025 (verze 25); přechodná ustanovení po zákon 252/2023 Sb. — tamtéž
- OZV obcí jsou dohledatelné v Sbírce právních předpisů územních samosprávných celků: [sbirkapp.gov.cz](https://sbirkapp.gov.cz/) (příklady vyhledány, obsah nečten).

### Inferences
- Datový model per obec (tenant): konfigurace sazeb, splatnosti, osvobození, období, lhůty ohlášení – nikdy hardcode sazby; verzování platností OZV.
- Odpad: výpočet dle přihlášených osob (nutná synchronizace s evidencí obyvatel – CodeKom k ní nemá přístup; vstup = ruční/CSV od obce).

### Gaps
- Změny platné k 11/2026 (novely po 1. 1. 2025) – nezjištěno.
- Typická struktura OZV (čl. 1–x) – ze zdroje neověřeno; standardně: předmět, poplatník, ohlašovací povinnost, sazba, splatnost, osvobození/úlevy, účinnost, zrušení předchozí OZV (NEOVĚŘENO).

## 8. Konkurence pro malé obce a ceny

### Takeaway
Etablovaní dodavatelé (Gordic GINIS Express + Portál občana) pokrývají spisovku, portál, platby i NIA; ceny nezjištěny.

### Cited Findings
- Gordic GINIS Express / Standard, Portál občana (formuláře, platby), cloud SaaS nabídka platná do 31. 12. 2023 (cena v samostatném ceníku gordic.cz/pdf/cenik_egovernment_cloud.pdf, nenačteno). — [Gordic eGC](https://www.dia.gov.cz/wp-content/uploads/2023/03/eGc-Nabidka_cloud_computingu-SaaS_c_1-2020_spol_Gordic_-_20210723.pdf)

### Inferences
- Pozice CodeKom: lehký, moderní UX (web + mobil + občanský účet), integrace do stávající spisovky místo její náhrady.

### Gaps
- Ceny a funkce konkurentů (Gordic, Triada, Alis/ Munis, "Mobilní rozhlas", "Hlášení rozhlasu", "Obec Online", "Vision/Webnode obce" apod.) – nenalezeno; nutné další kolo výzkumu.

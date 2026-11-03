# Digitalizace úřadu

## Co obec musí a co občané chtějí

Do **1. 2. 2027** musí obec umožnit online úkony v přenesené působnosti, pro které ohlašovatel agendy (ministerstvo) připravil digitální službu. U samostatné působnosti to zákon nevyžaduje, ale právě tam občané s úřadem jednají nejčastěji: platí poplatky, rezervují sál a hlásí závady. Modul Úřad proto dělá dvě věci:

- **Rozcestník na státní služby** pro přenesenou působnost (trvalý pobyt, stavební řízení, volby, Czech POINT). Obec je nemusí programovat. Potřebuje jen, aby je občan na webu našel ve své životní situaci a věděl, co bude dál.
- **Vlastní digitální služby** pro samostatnou působnost a pro správu místních poplatků. Od přihlášení přes Identitu občana po vyřízení a odpověď, ne jen PDF ke stažení.

Právní rozbor s odkazy je v záložce Průzkum webů měst.

## Agendy obce

Typická obec do 2 000 obyvatel má asi 20 agend, ve kterých jedná s občany. První verze (B1) pokrývá ty, které občan použije nejčastěji a které nejvíc zatěžují úřad: poplatky, rezervace, hlášení a obecná podání. Fáze odpovídají roadmapě na hlavní záložce.

| Agenda | Působnost | Dnes | Digitálně v CodeKomu | Napojení | Fáze |
|---|---|---|---|---|---|
| Poplatek za odpad | správa v přenesené | hotově na úřadě, převodem s VS | účet domácnosti, předpis, platba kartou, QR, Apple a Google Pay, potvrzení, upomínka, ohlášení změn | platební brána, banka, účetnictví, RÚIAN | B1 |
| Poplatek ze psů | správa v přenesené | papírové přihlášení psa | přihlášení a odhlášení psa, číslo čipu, platba | platební brána, účetnictví | B1 |
| Rezervace prostor | samostatná | telefon a sešit | kalendář sálu a hřiště, schválení, platba a kauce, PIN do budovy a předtopení | platby, IoT | B1 |
| Hlášení závad a podnětů | samostatná | telefon, e-mail | fotka a poloha, stav řešení, odpověď občanovi, mapa řešených závad | – | B1 |
| Obecné podání (e-podatelna) | obě | e-mail, datová schránka | formulář s přílohami, ověření Identitou občana, potvrzení o doručení | NIA, spisová služba, ISDS | B1 |
| Žádost o informace (106/1999) | samostatná | e-mail, dopis | formulář, hlídání lhůty 15 dní, výroční zpráva se vygeneruje | spisová služba | B1 |
| Objednání na úřad | – | telefon | výběr termínu (Czech POINT, ověření, starosta), připomínka den předem | kalendář | B1 |
| Zastupitelstvo | samostatná | papírová pozvánka, zápis v PDF | pozvánka, materiály, usnesení a zápisy s anonymizací, hledání v usneseních | úřední deska | B1 |
| Hlášení rozhlasu a krizové zprávy | samostatná | amplióny, Munipolis | push, SMS a e-mail cílené podle ulice nebo části obce, audio verze | RÚIAN, SMS brána | B1 |
| Rozcestník státních služeb | přenesená | odkazy bez kontextu | životní situace s odkazem na státní službu a popisem dalšího postupu | Katalog služeb DIA, Portál občana | B1 |
| Svoz odpadu | samostatná | leták na rok | kalendář podle adresy, připomínka večer před svozem, otevírací doba sběrného dvora | RÚIAN | B2 |
| Poplatek z pobytu | správa v přenesené | papírové přiznání | ohlášení ubytovatele, čtvrtletní přiznání online, platba | platby, účetnictví | B2 |
| Hrobová místa | samostatná | kartotéka | mapa hřbitova, smlouvy, platby nájmu, upozornění na konec nájmu | platby | B2 |
| Zábor veřejného prostranství | samostatná | žádost na papíře | žádost s mapou, výpočet poplatku, platba | platby | B2 |
| Dotace spolkům | samostatná | žádosti e-mailem | výzva, žádost online, hodnocení, smlouva, vyúčtování, zveřejnění smlouvy podle § 10d | účetnictví, registr smluv | B2 |
| Kácení dřevin | přenesená | papírová žádost | státní formulář, pokud existuje, jinak vlastní s mapou a fotkou | Katalog služeb DIA | B2 |
| Volby | přenesená | informace na desce | informace, žádost o voličský průkaz s ověřením, umístění volební místnosti | NIA | B2 |
| Ankety a participativní rozpočet | samostatná | – | návrhy občanů, hlasování jednou na ověřeného občana, výsledky | NIA | B2 |
| Naplněnost kontejnerů | samostatná | – | čidla v kontejnerech, svoz jen při zaplnění | IoT | B3 |

## Tok podání

> (obrázek: diagram nebo graf v původním dokumentu)

Občan nikdy nemusí na úřad a referent nemusí přepisovat údaje z papíru do spisové služby. Dokud nebude spisová služba napojená (B2), dostane podatelna podání e-mailem jako PDF s přílohami a krok 5 udělá ručně.

## Napojení na státní a obecní systémy

CodeKom nenahrazuje spisovou službu ani účetnictví, napojuje se na ně. Peníze občanů jdou přímo na účet obce, nikdy přes nás. Nepotřebujeme tak licenci platební instituce a obec nenese riziko naší firmy.

| Systém | K čemu | Jak | Co musí udělat obec | Fáze |
|---|---|---|---|---|
| [Identita občana (NIA)](https://info.identita.gov.cz/download/SeP_PriruckaKvalifikovanehoPoskytovatele.pdf) | přihlášení občana bankovní identitou nebo eOP | OpenID Connect, úroveň ověření „substantial“ pro podání | zaregistrovat se jako poskytovatel služby přes datovou schránku; konfiguraci připravíme | B1 |
| Platební brána (GP webpay, ComGate nebo GoPay) | karta, Apple a Google Pay | REST API, potvrzení platby notifikací | uzavřít smlouvu s bránou na svůj účet | B1 |
| Banka obce | párování převodů a QR plateb podle VS | API banky nebo import výpisu (ABO, CSV) | povolit přístup k výpisům jen pro čtení | B1 |
| Ekonomický systém (KEO4, GINIS, VERA, Munis, Triada) | předpisy poplatků, zaplacené platby, rozpočet | B1 export a import CSV, B2 API dodavatele | říct, jaký systém používá | B1 / B2 |
| Spisová služba | předání podání k evidenci a číslo jednací zpět | API dodavatele; do napojení přeposlání do e-podatelny | – | B2 |
| Datové schránky (ISDS) | odpověď občanovi do jeho schránky, příjem podání | webové služby ISDS se systémovým účtem | založit systémový účet pro aplikaci | B2 |
| RÚIAN (ČÚZK) | adresy, části obce, ulice pro cílení zpráv a svozový kalendář | otevřená data, aktualizace jednou za měsíc | nic | B1 |
| Katalog služeb a Portál občana (DIA) | odkazy na státní digitální služby v životních situacích | veřejné údaje katalogu | nic | B1 |
| SMS brána | SMS zprávy | API (např. GoSMS, SMSbrana) | koupit kredit | B1 |
| Munipolis | přechod obcí, které ho dnes mají | import kontaktů občanů se souhlasem | vyexportovat kontakty | B1 |
| Registr smluv | automatický seznam smluv obce na webu | otevřená data registru smluv | nic | B2 |
| Platební portál MSK | platby v obcích Moravskoslezského kraje místo vlastní brány | odkaz nebo API kraje (ověřit) | zaregistrovat se u kraje | B2 |
| Czech POINT | ověřené výpisy | nejde napojit, jen objednání termínu | – | B1 |

## Zavedení v obci krok za krokem

Od podpisu ke spuštění to trvá 4–6 týdnů. Na straně obce to zabere asi 8 hodin práce, většinou na registrace, které za ni udělat nemůžeme.

1. **Úvodní schůzka, 1 hodina online.** Projdeme kontrolní seznam agend, systémů (účetnictví, spisová služba, banka) a toho, co obec dnes vybírá hotově.
1. **Smlouvy.** Smlouva o službě, zpracovatelská smlouva podle GDPR a bezpečnostní příloha podle zákona o kybernetické bezpečnosti.
1. **Registrace na straně obce, asi 2 hodiny s naším návodem.** Poskytovatel služby v NIA, smlouva s platební bránou, přístup k výpisům banky a systémový účet do datové schránky.
1. **Import dat.** Poplatníci a předpisy z účetnictví nebo z Excelu, adresy z RÚIAN, svozový plán, pronajímatelné prostory s ceníkem, kontakty z Munipolisu.
1. **Formuláře.** Z knihovny 20 hotových formulářů obec vybere ty, které chce. Upravuje jen texty a ceny.
1. **Školení a zkušební provoz.** Dvě hodiny školení, pak dva týdny testování se zastupiteli jako prvními uživateli.
1. **Spuštění a oznámení občanům.** Dodáme leták do schránek s QR kódem na aplikaci, článek do zpravodaje a hlášení rozhlasu.
1. **Vyhodnocení po 30 dnech.** Kolik plateb a podání přišlo online, kolik občanů má aplikaci a co zlepšit.

Metriky úspěchu prvního roku: aspoň 40 % poplatků za odpad zaplacených online a aplikace v aspoň 25 % domácností. Jsou to návrhy cílů, ne změřené hodnoty.

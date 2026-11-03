# ThemeForest – co jsem viděl (dema autorů, 2. 11. 2026)

| Šablona (autor) | Demo | Co si bereme |
|---|---|---|
| TownPress (LSVRthemes, 3,4K prodejů) | preview.lsvr.sk/townpress | panorama obce za celou stránkou; 3 sloupce: levé menu + počasí, střed uvítání + „Choose your interest“ rozcestník + zprávy, vpravo oznámení + akce; tmavá patička se 4 sloupci (akce, formuláře, kontakt) |
| Pressville (LSVRthemes, 1,6K) | preview.lsvr.sk/pressville | znak + serifový název obce přes fotku; barevná lišta s přepínačem jazyků; „Latest news“ s velkou obrysovou ikonou + karusel; plovoucí bílá karta se 4 sloupci odkazů přes fotopás; „Events“ s velkým bledým slovem za kartami |
| Wordbench (LSVRthemes) | preview.lsvr.sk/wordbench | horní lišta (úřední hodiny, telefon, e-mail, jazyky); split hero fotka vlevo + tmavý panel s „Hello! Welcome to…“ ve dvou řezech; korálová karta „Hledáte něco?“ přes spodní hranu hero + 6sloupcový rozcestník s ikonami |
| Town Hall (cmsmasters) | town-hall.cmsmasters.studio | Municipal portal: „Live City Feed“ ticker + dnešní datum, vsazená tmavá hlavička, CTA „Report an issue“, 3 info karty na spodku hero (počasí, oznámení, hodiny), mřížka odborů v tmavých dlaždicích; City Mayor: krémový split hero s portrétem starosty, čísla na tmavém pásu, zprávy přes hranu pásu, barevné dlaždice projektů |
| Administration (axiomthemes) | administration.axiomthemes.com | obří display titulek „Community First“ přes panorama; tmavý pás s číslovanými službami 01/02 a náhledy; silueta města jako předěl; krémová masonry mřížka zpráv; varianta 2: dvoubarevný titulek „Your gateway to city services“ + koláž + korálová karta s číslem |
| CityGov (AncoraThemes) | s3 screenshoty | editoriální: velká věta regular řezem, odsazená koláž se zaoblenými rohy, mini bloky „Visit us / Contact us“, obří bledý obrysový nápis pod hero, prohlášení s malými ikonami přímo v textu, šachovnice textových a obrazových karet |
| CityGov (Dannci) | s3 cover | tmavé hero s horami a jezerem, titulek vlevo, 3 teplé dlaždice přes spodní hranu (Odbory a hodiny / Doprava a parkování / Volná místa); varianta Downtown: úzký obří titulek + kruhové razítko |
| EGovt (ovatheme) | s3 preview | „Welcome to the Local Government Portal“ přes fotku budovy, ikonové dlaždice služeb přes hranu, tmavý pás čísel 62K / 4.8K / 32 % |
| Civica (AwaikenThemes) | s3 preview | tmavý luxusní vzhled, vínová, „Working for a smarter and better city“ |
| Gimont, eGovenz | s3 preview | generické (stock lidé, dekorativní tvary) – vynecháno jako příklad toho, čemu se vyhnout |

Nedostupné: themeforest.net (Cloudflare ověření), egovt.ovathemewp.com (Cloudflare blok). Flowbite a Lapa Ninja se nenačetly jako text.

# Zdroje ze zadání
- USWDS Site alert: nahoře přes celou šířku, info / emergency / slim, nikdy víc bannerů naráz (víc zpráv = seznam v jednom), aria-label/labelledby kvůli landmarkům, role="alert" jen pro urgentní změny během návštěvy, nepřehánět červenou.
- GOV.UK Notification banner: jen jeden na stránku, před h1, role="region" + aria-labelledby na titulek, success varianta role="alert", nepoužívat pro chyby formuláře.
- USWDS Banner: „oficiální web“ identifikátor nad hlavičkou, rozbalovací „Jak to poznám“.
- gov.cz: komponenty Infobar (nad/pod navigací, zavíratelný, jedno sdělení, max. 2), Banner, Message, Toast; barvy primary #00469B, secondary #FAB413, success #2E7D32, warning #CA8504, error #D70C0F; šablona Povinně zveřejňované informace.
- CivicTheme alert: typy information / warning / error / success, světlé a tmavé téma, titulek vlevo + text vpravo, zavření si pamatuje id.
- BetterLocalGov: úkoly slovesem (Podat / Nahlásit / Zaplatit / Objednat / Najít), tematické rozcestníky, každá služba odpovídá na Co to je, Kdo, Co potřebuji, Kolik, Jak online, Jinak; A–Z služeb a vyhledávání; vlastník a datum aktualizace na každé stránce.
- Highschool template (Next.js): shadcn/ui komponenty, App Router.
- shadcn blocks: dashboard-01 s datovou tabulkou = základ adminu úřední desky.

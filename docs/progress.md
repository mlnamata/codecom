# Rozpracovaná práce

Přehled pro instance Claude, které pracují na repozitáři současně (pravidla v `CLAUDE.md`, oddíl Práce více agentů najednou). Každý agent tu drží svůj řádek aktuální a mění ho ve stejném commitu jako práci.

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Konfigurace šablony v liště (barvy, písmo), jen fotky, štítek AI, glass šablony | `apps/web/src/ukazka`, `apps/web/src/sablony` | hotovo | hlavní session |
| Skleněné šablony 21 Canopus, 22 Achernar a 23 Bellatrix | `apps/web/src/sablony/{sklo,noc,aurora}`, `packages/tokeny` | hotovo | fork session skleněných šablon; [DOPLNIT] snímky a generátor |
| Nový vzhled administrace, vícedílný skladatel šablon a blog | `apps/web/src/app/ukazka/**`, `admin.css` | hotovo | hlavní session |
| Integrovaná pošta, ISDS a propojení s Microsoft Office | `apps/web/src/app/ukazka/administrace/posta/**` | hotovo | hlavní session |
| Aplikace a IoT | repozitář `mlnamata/codecom_app` | předáno jiné session | zadání v `codecom_app/docs/zadani` |
| Firemní landing na codekom.vercel.app | repozitář `mlnamata/codekom_web` | čeká na zakladatele | Vercel projekt napojit na `codekom_web` |

## Hotovo

- Kompletní kancelářské pracoviště obecního úřadu (All-in-One Municipal OS): do administrace přibyly 4 nové provázané moduly, díky nimž úředníci ani starosta nemusí opouštět aplikaci do cizích programů (kromě Microsoft Word a Excel):
  1. **Poplatky, pokladna a dlužníci** (`/ukazka/administrace/poplatky`): evidence plátců za odpad, psy, stočné a hrobová místa, rozesílání QR upomínek neplatičům, integrovaná obecní pokladna (vystavování příjmových a výdajových dokladů PPD/VPD na přepážce), generování platebních výměrů pro MS Word a export do MS Excel.
  2. **Smlouvy, došlé faktury, rozpočet a Registr smluv** (`/ukazka/administrace/smlouvy`): evidence smluv s doložkou dle § 41 zákona o obcích a šablonou pro MS Word, publikace do Registru smluv MVČR (ISRS) na 1 kliknutí, kniha došlých faktur s elektronickou schvalovací košilkou příkazce operace, hromadný příkaz do banky a přehled čerpání rozpočtu obce.
  3. **Obecní rozhlas, SMS brána, zpravodaj a ankety** (`/ukazka/administrace/rozhlas`): multikanálová rozesílka z jednoho okna (bezdrátový rozhlas, SMS brána, e-mail, web), automatický generátor rukopisu tištěného Obecního zpravodaje pro MS Word a správa obecních anket a participativního rozpočtu.
  4. **Přepážka, ověřovací kniha (vidimace/legalizace), revize a jubilea SPOZ** (`/ukazka/administrace/prepazka`): zápis ověření podpisů a kopií listin s automatickým výpočtem správního poplatku a doložkou do MS Word, centrální lhůtník technických revizí obecních budov (škola, kotelna, komíny, hřiště, AED) a generátor blahopřání starostky k životním jubileím občanů.

- Integrovaný obecní e-mail, datová schránka ISDS a pracoviště úřadu s podporou Microsoft Office: do menu administrace přibyl samostatný modul „Obecní e-mail a pošta“ (`/ukazka/administrace/posta`). Úředníci tak nemusí opouštět aplikaci ani chodit do externích webmailů či na portál datových schránek. Zahrnuje přepínač schránek úřadu (`podatelna@`, `starosta@`, `ucetni@` i státní `ISDS`), složky (doručené, e-podatelna, ISDS zprávy, odeslané, archiv), předpřipravené úřední šablony odpovědí, bleskové akce 1 kliknutím (vyvěšení přílohy na elektronickou úřední desku, založení závady pro technické služby), generátor úředního rozhodnutí s hlavičkou obce, číslem jednacím a spisovou značkou připraveného pro aplikaci Microsoft Word a přímý export podacího deníku do formátu pro Microsoft Excel. Splňuje 100% WCAG AA kontrast i unslop pravidla.

- Profesionální administrace, vícedílný skladatel šablon a blog: kompletní redesign administrace v moderním SaaS stylu (břidlicová paleta, čistá typografie, ikony u všech sekcí, 4 KPI karty v jedné řadě bez zalamování, moderní akční dlaždice); podpora vícedílných šablon webu v widgetovém skladateli s rozdělením do layoutových zón (horní Hero pás, hlavní sloupec obsahu, boční panel / sidebar, spodní servisní pás chytré obce a zápatí) s dvousloupcovým živým náhledem pro desktop, tablet i mobil a přepínačem dalších částí webu (úřední deska, blog, kontakty a úřad, chytrá obec); plnohodnotná správa blogu a zpráv s rubrikami a blokovým editorem.

- Moduly chytré obce a komunity: 5 velkých modulů na veřejném webu i v administraci Javoří Lhoty (1. Senzorika, IoT a živá data: LoRaWAN, stav Javornického potoka s automatickým varováním, GPS trasy komunální techniky, parkování, EV dobíjení a digitální odjezdová tabule; 2. Komunita a lokální ekonomika: obecní půjčovna nářadí, sousedský bazar a darovna, spolujízda do Klatov a burza dobrovolnictví; 3. Pokročilá správa majetku a energetiky: startovací byty s pořadníkem, parcely k prodeji, komunitní FVE s bateriovým úložištěm a digitální hřbitov s virtuální svíčkou; 4. Bezpečnost a krizové situace: registr nalezených zvířat a věcí s mapou a útulkem, interaktivní mapa AED defibrilátorů a veřejné webkamery dle GDPR; 5. Zákulisní portály a gamifikace: zastupitelský extranet s neveřejnými podklady a diskuzí, systém občanských kreditů a odměn, vývojářský API portál s webhooky).

- Záhlavní menu: lišta ukázky (nové ikony, kompaktní tmavý vzhled, elegantní přepínač palet bez bílého bliknutí), administrace a správa (znak obce, nový přepínač úrovní, tlačítko Zobrazit web s ikonou, animovaná rozbalovací navigace na telefonu s indikátorem stránky), šablony obcí (interaktivní stavy odkazů na desktopu, přehledné a kontrastní rozbalovací karty mobilního menu).

- Lišta ukázky: tmavá, sbalitelná na telefonu, tlačítko „Zpět na web CodeKom“ (`NEXT_PUBLIC_CODEKOM_URL`). Administrace: sbalitelná navigace na telefonu, tabulky už nepřetékají stránku.

- Firemní web přesunutý do `mlnamata/codekom_web` a smazaný odsud (`apps/prezentace`, `obsah/prezentace`, `docs/tvrzeni-prezentace.md`).

- Prezentační web: karusel šablon, úpravy pro telefony, produkční adresy (`main`, 4. 11. 2026).
- Šablony obce: čitelné záhlaví nad fotkou (Náves, Hřeben).

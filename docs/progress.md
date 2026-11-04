# Rozpracovaná práce

Přehled pro instance Claude, které pracují na repozitáři současně (pravidla v `CLAUDE.md`, oddíl Práce více agentů najednou). Každý agent tu drží svůj řádek aktuální a mění ho ve stejném commitu jako práci.

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Konfigurace šablony v liště (barvy, písmo), jen fotky, štítek AI, glass šablony | `apps/web/src/ukazka`, `apps/web/src/sablony` | rozpracováno | hlavní session |
| Nový vzhled administrace | `apps/web/src/app/ukazka/**`, `admin.css` | rozpracováno | hlavní session |
| Aplikace a IoT | repozitář `mlnamata/codecom_app` | předáno jiné session | zadání v `codecom_app/docs/zadani` |
| Firemní landing na codekom.vercel.app | repozitář `mlnamata/codekom_web` | čeká na zakladatele | Vercel projekt napojit na `codekom_web` |

## Hotovo

- Moduly chytré obce a komunity: 5 velkých modulů na veřejném webu i v administraci Javoří Lhoty (1. Senzorika, IoT a živá data: LoRaWAN, stav Javornického potoka s automatickým varováním, GPS trasy komunální techniky, parkování, EV dobíjení a digitální odjezdová tabule; 2. Komunita a lokální ekonomika: obecní půjčovna nářadí, sousedský bazar a darovna, spolujízda do Klatov a burza dobrovolnictví; 3. Pokročilá správa majetku a energetiky: startovací byty s pořadníkem, parcely k prodeji, komunitní FVE s bateriovým úložištěm a digitální hřbitov s virtuální svíčkou; 4. Bezpečnost a krizové situace: registr nalezených zvířat a věcí s mapou a útulkem, interaktivní mapa AED defibrilátorů a veřejné webkamery dle GDPR; 5. Zákulisní portály a gamifikace: zastupitelský extranet s neveřejnými podklady a diskuzí, systém občanských kreditů a odměn, vývojářský API portál s webhooky).

- Záhlavní menu: lišta ukázky (nové ikony, kompaktní tmavý vzhled, elegantní přepínač palet bez bílého bliknutí), administrace a správa (znak obce, nový přepínač úrovní, tlačítko Zobrazit web s ikonou, animovaná rozbalovací navigace na telefonu s indikátorem stránky), šablony obcí (interaktivní stavy odkazů na desktopu, přehledné a kontrastní rozbalovací karty mobilního menu).

- Lišta ukázky: tmavá, sbalitelná na telefonu, tlačítko „Zpět na web CodeKom“ (`NEXT_PUBLIC_CODEKOM_URL`). Administrace: sbalitelná navigace na telefonu, tabulky už nepřetékají stránku.

- Firemní web přesunutý do `mlnamata/codekom_web` a smazaný odsud (`apps/prezentace`, `obsah/prezentace`, `docs/tvrzeni-prezentace.md`).

- Prezentační web: karusel šablon, úpravy pro telefony, produkční adresy (`main`, 4. 11. 2026).
- Šablony obce: čitelné záhlaví nad fotkou (Náves, Hřeben).

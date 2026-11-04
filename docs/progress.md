# Rozpracovaná práce

Přehled pro instance Claude, které pracují na repozitáři současně (pravidla v `CLAUDE.md`, oddíl Práce více agentů najednou). Každý agent tu drží svůj řádek aktuální a mění ho ve stejném commitu jako práci.

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Konfigurace šablony v liště (barvy, písmo), jen fotky, štítek AI, glass šablony | `apps/web/src/ukazka`, `apps/web/src/sablony` | rozpracováno | hlavní session |
| Nový vzhled administrace | `apps/web/src/app/ukazka/**`, `admin.css` | rozpracováno | hlavní session |
| Aplikace a IoT | repozitář `mlnamata/codecom_app` | předáno jiné session | zadání v `codecom_app/docs/zadani` |
| Firemní landing na codekom.vercel.app | repozitář `mlnamata/codekom_web` | čeká na zakladatele | Vercel projekt napojit na `codekom_web` |

## Hotovo

- Lišta ukázky: tmavá, sbalitelná na telefonu, tlačítko „Zpět na web CodeKom“ (`NEXT_PUBLIC_CODEKOM_URL`). Administrace: sbalitelná navigace na telefonu, tabulky už nepřetékají stránku.

- Firemní web přesunutý do `mlnamata/codekom_web` a smazaný odsud (`apps/prezentace`, `obsah/prezentace`, `docs/tvrzeni-prezentace.md`).

- Prezentační web: karusel šablon, úpravy pro telefony, produkční adresy (`main`, 4. 11. 2026).
- Šablony obce: čitelné záhlaví nad fotkou (Náves, Hřeben).

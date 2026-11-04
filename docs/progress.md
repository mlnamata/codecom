# Rozpracovaná práce

Přehled pro instance Claude, které pracují na repozitáři současně (pravidla v `CLAUDE.md`, oddíl Práce více agentů najednou). Každý agent tu drží svůj řádek aktuální a mění ho ve stejném commitu jako práci.

| Úkol | Oblast souborů | Stav | Poznámka |
| --- | --- | --- | --- |
| Lišta „Ukázka CodeKom“ (nastavení ukázky webu obce) | komponenta lišty v `apps/web/src` | rozpracováno | přehlednější, na telefonu sbalitelná |
| Ukázka administrace a interní správy | `apps/web/src/app/ukazka/**`, `admin.css` | rozpracováno | podle `design/prototypy/Editor-*.dc.html` |
| Aplikace a IoT | repozitář `mlnamata/codecom_app` | předáno jiné session | zadání v `codecom_app/docs/zadani` |
| Firemní landing na codekom.vercel.app | repozitář `mlnamata/codekom_web` | čeká na zakladatele | Vercel projekt napojit na `codekom_web` |

## Hotovo

- Firemní web přesunutý do `mlnamata/codekom_web` a smazaný odsud (`apps/prezentace`, `obsah/prezentace`, `docs/tvrzeni-prezentace.md`).

- Prezentační web: karusel šablon, úpravy pro telefony, produkční adresy (`main`, 4. 11. 2026).
- Šablony obce: čitelné záhlaví nad fotkou (Náves, Hřeben).

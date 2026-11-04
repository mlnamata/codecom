# Záznam ověření (prompt 07)

Položky z části `<overit>` zadání. Datum ověření: 4. 11. 2026.

| Položka | Zdroj a postup | Výsledek |
| --- | --- | --- |
| TypeScript a Vitest jako major verze | `npm view typescript version` (7.0.2), `npm view vitest version` (5.1.0) | V repu TypeScript 5.9.3 a Vitest 3.2.7. Build s TS 7 a Vitestem 5 zkoušen nebyl. |
| Shoda verzí Payloadu, kompatibilita s Next 16.4 | `npm view payload version` (3.92.1), `npm view @payloadcms/next@3.92.1 peerDependencies` (next `>=16.3.3 <17`) | Všechny `@payloadcms/*` a `payload` jsou 3.92.1, Next 16.4.5 je v povoleném rozsahu. |
| Přednost vlastních route handlerů před catch-all Payloadu | Statické segmenty mají v App Routeru přednost před catch-all `[...slug]` (dokumentace Next) | [OVĚŘIT] Test s dočasnou fixture `(payload)/api/[...slug]` neproběhl, skupina `(payload)` zatím neexistuje. Ověří prompt 01. |
| `next build` bez `DATABASE_URI` | `pnpm --filter codekom-web build` bez proměnné | Projde. `withPayload` se zapíná jen s `CODEKOM_ZDROJ=payload`. |
| Čl. 50 odst. 4 AI Actu u AI fotek | EUR-Lex, nařízení (EU) 2024/1689 | [OVĚŘIT] Neověřeno. Fotky se označují vždy. |
| `next/font/google` bez požadavku za běhu | Playwright sleduje požadavky na `fonts.googleapis.com` a `fonts.gstatic.com` u všech 60 úvodů | Za běhu žádný požadavek. Build internet potřebuje. U Atkinson Hyperlegible Next a Big Shoulders Next nevygeneruje náhradní metriky písma (varování buildu). |
| Port Expo webu 8081 a CORS | Dokumentace Expo | [OVĚŘIT] Port je výchozí hodnota v `CODEKOM_APP_ORIGIN`, CORS je testovaný jednotkovými testy. |
| QR Platba (SPD) a IBAN | Specifikace QR Platby ČBA, vzor IBAN `19-2000145399/0800` = `CZ6508000000192000145399` | Pole ACC, AM, CC, X-VS, MSG; IBAN s kontrolou modulo 11 a mod 97, jednotkový test. Verze specifikace [OVĚŘIT]. `qrcode` 1.5.4. |
| Diakritika v PDF | `pypdf` extrakce textu z `public/demo/deska/uzavirka-mostu.pdf` | Text obsahuje „Javoří“, „Číslo jednací“, „Původce“, „Vyvěšeno“ správně. |
| CSS nesting | Skript předponuje selektory místo nestingu | Nesting se nepoužívá. |
| Vyhláška 515/2020 Sb., členění položek | e-Sbírka | [OVĚŘIT] Stránka má 14 položek bez citace znění. |

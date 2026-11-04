# Prezentační web CodeKom

Web pro starosty a účetní: úvod, galerie 20 šablon s barevnými variantami, tři úrovně editoru, ceník s kalkulačkou a texty z `obsah/prezentace`. Nic nesbírá: žádný formulář, cookies ani měření.

## Spuštění

Z kořene repozitáře:

```bash
pnpm install
```

```bash
pnpm --filter prezentace dev
```

Web běží na http://localhost:3000. Odkazy do živé ukázky vedou na `NEXT_PUBLIC_DEMO_URL` (v `.env.development` je http://localhost:3100), takže vedle spusťte i ukázku webu obce:

```bash
pnpm --filter codekom-web dev --port 3100
```

Před `dev` a `build` se do `public/` zkopírují snímky šablon (`design/snimky`), fotky (`design/obrazky/foto`) a logo (`brand/`).

## Cesta návštěvníka

1. Úvod `/`: co obec získá, 4 snímky šablon, tři úrovně, důvody, moduly.
2. Šablony `/ukazky` a detail `/ukazky/<klic>`: přepínač 3 palet, odkaz do živé ukázky.
3. Úrovně `/urovne` a `/urovne/<zaklad|pokrocily|advance>`: matice funkcí, role, bloky a odkaz do ukázky administrace dané úrovně.
4. Ceník `/cenik` s kalkulačkou, Ke stažení, Kontakt.

## Kontroly

```bash
pnpm --filter prezentace typecheck
```

```bash
pnpm --filter prezentace lint
```

```bash
pnpm --filter prezentace test
```

```bash
pnpm --filter prezentace build
```

```bash
pnpm --filter prezentace e2e
```

```bash
pnpm --filter prezentace a11y
```

```bash
pnpm --filter prezentace obsah
```

```bash
pnpm --filter prezentace lighthouse
```

Kontrola odkazů potřebuje běžící `next start` na portu 3300 (`ODKAZY_URL` změní adresu):

```bash
pnpm --filter prezentace odkazy
```

## Generované soubory

| Příkaz | Co vyrobí |
| --- | --- |
| `pnpm logo` | `brand/svg/*.svg`, porovnání s PNG, favicony |
| `pnpm pdf` | 5 PDF v `public/ke-stazeni` a `src/data/ke-stazeni.json` |
| `pnpm obsah` | `docs/tvrzeni-prezentace.md`, kontrola textů, výpis `[DOPLNIT]` |

## Nasazení (později)

`vercel.json` má region `fra1`. Nic se zatím nenasazuje. Před nasazením nastavte `NEXT_PUBLIC_SITE_URL` (doména [DOPLNIT]), `NEXT_PUBLIC_DEMO_URL` a `NEXT_PUBLIC_APP_DEMO_URL` a spusťte `node scripts/kontrola-doplnit.mjs --prisne`, který skončí chybou, dokud zbývá nějaké `[DOPLNIT]`.

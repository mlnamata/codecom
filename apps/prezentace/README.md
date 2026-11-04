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

## Nasazení (později)

`vercel.json` má region `fra1`. Nic se zatím nenasazuje. Doména: [DOPLNIT].

## Co zbývá z promptu 06

SVG logo a favicon sada, OpenGraph obrázky, PDF ke stažení, registr tvrzení a kontroly obsahu, Playwright, axe a Lighthouse testy.

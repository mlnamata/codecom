# Značka CodeKom

Logo dodal zakladatel 3. 11. 2026. Značka je monogram **CK** v rámečku se seříznutými rohy (vlevo nahoře a vpravo dole), k ní patří název **CodeKom** a heslo „Tvoříme kódy pro lidi.“

| Soubor | Co to je | Kde použít |
| --- | --- | --- |
| `codekom-logo-cerne-pozadi.png` | značka, název a heslo pod sebou na černé | úvodní snímky, sociální sítě, tisk na tmavém |
| `codekom-znacka-cerne-pozadi.png` | jen monogram CK na černé | ikona aplikace, avatar |
| `codekom-znacka-bila-pruhledna.png` | bílý monogram, průhledné pozadí | tmavé pozadí webu a aplikace |
| `codekom-znacka-cerna-pruhledna.png` | černý monogram, průhledné pozadí | světlé pozadí webu a dokumentů |
| `codekom-nazev-cerne-pozadi.png` | jen název na černé | patičky, náhledy |
| `codekom-nazev-bily-pruhledny.png` | bílý název, průhledné pozadí | hlavička na tmavém |
| `codekom-nazev-cerny-pruhledny.png` | černý název, průhledné pozadí | hlavička na světlém, smlouvy a faktury |

## Pravidla

- Barvy značky jsou jen černá `#000000` a bílá `#FFFFFF`. Barevné akcenty patří produktu a šablonám obcí, ne logu.
- Kolem loga nech volné místo aspoň na šířku jedné čáry rámečku.
- Monogram nepoužívej menší než 24 px na výšku. Pod 24 px použij jen písmena bez rámečku, nebo favicon z monogramu na černém čtverci.
- Logo nenatahuj, neotáčej, nepřidávej stíny ani přechody.
- Na webech obcí je logo CodeKom jen v patičce („Provozuje CodeKom“). Hlavní značkou webu je vždy znak a název obce.

## SVG

V `svg/` jsou vektorové verze `znak`, `nazev` a `logo` v černé a bílé (`-cerne.svg`, `-bile.svg`). Vznikly 4. 11. 2026 vektorizací PNG (potrace, skript `apps/prezentace/scripts/logo-svg.mjs`): jedna cesta na soubor, `viewBox`, bez rastrových vložek. Shoda s PNG po návratu do rastru je v `svg/porovnani.txt` (znak 0,23 %, název 0,72 %, logo 0,26 % odlišných pixelů). Rámeček znaku je vektorizovaný z PNG, ne kreslený ručně.

Favicony prezentačního webu vyrábí `apps/prezentace/scripts/favicon.mjs`: bílý monogram na černém čtverci, ve velikosti 16 px jen písmena CK.

## Chybí
- Písmo názvu vypadá jako geometrický bezpatkový font typu Montserrat. Přesný font a řez je potřeba potvrdit.

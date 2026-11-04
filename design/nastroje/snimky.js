// Usage: node snimky.js <outdir>  (pak převod do WebP, viz design/snimky/README.md)
// Snímky úvodů šablon z prototypů: <klic>-<paleta>-1280.png (3 palety) a <klic>-0-375.png, krizový banner vypnutý, panel palet skrytý.
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const N = __dirname;
const PROJ = path.join(__dirname, '..', 'prototypy');
const MINI = fs.readFileSync(path.join(N, 'minidc.js'), 'utf8');
const installFonts = require('./fonts.js');
const KLICE = { 'Main': 'naves', 'S02-Zvonice': 'zvonice', 'S03-Studanka': 'studanka', 'S04-Lipa': 'lipa', 'S05-Majka': 'majka', 'S06-Hnizdo': 'hnizdo', 'S07-Hranice': 'hranice', 'S08-Vinice': 'vinice', 'S09-Hreben': 'hreben', 'S10-Rynek': 'rynek', 'S11-Radnice': 'radnice', 'S12-Kolonada': 'kolonada', 'S13-Mlyn': 'mlyn', 'S14-Hraz': 'hraz', 'S15-Lupa': 'lupa', 'S16-Kompas': 'kompas', 'S17-Magistrat': 'magistrat', 'S18-Zpravodaj': 'zpravodaj', 'S19-Mikroregion': 'mikroregion', 'S20-Urad': 'urad' };
const out = process.argv[2];
(async () => {
  const b = await chromium.launch();
  for (const [soubor, klic] of Object.entries(KLICE)) {
    let html = fs.readFileSync(path.join(PROJ, soubor + '.dc.html'), 'utf8');
    const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    html = html.replace('<script src="./support.js"></script>', '').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
    for (const [w, h, palety] of [[1280, 900, [0, 1, 2]], [375, 800, [0]]]) {
      const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      await installFonts(p);
      await p.setContent(html, { waitUntil: 'domcontentloaded' });
      await p.addScriptTag({ content: MINI });
      await p.evaluate((c) => window.__miniDC(c), m[1]);
      await p.evaluate(() => { const k = [...document.querySelectorAll('.spec button')].find((x) => x.textContent.trim() === 'Vypnuto'); if (k) k.click(); });
      for (const v of palety) {
        await p.evaluate((v) => { const g = [...document.querySelectorAll('.spec [aria-label="Barevná varianta"] button')]; if (g[v]) g[v].click(); }, v);
        await p.waitForTimeout(200);
        await p.evaluate(() => { const s = document.querySelector('.spec'); if (s) s.style.display = 'none'; window.scrollTo(0, 0); });
        await p.evaluate(() => document.fonts.ready);
        await p.waitForTimeout(150);
        await p.screenshot({ path: path.join(out, `${klic}-${v}-${w}.png`) });
        await p.evaluate(() => { const s = document.querySelector('.spec'); if (s) s.style.display = ''; });
      }
      await p.close();
    }
    console.log('ok', klic);
  }
  await b.close();
})();

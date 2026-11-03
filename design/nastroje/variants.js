// Usage: node variants.js <outdir> <file.dc.html>...
// For each template: switch to each of the 3 colour variants (and the crisis alert on the last one),
// run axe at 1280 and 375, report violations and horizontal overflow, save 1280 screenshots.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PROJ = path.join(__dirname, '..', 'prototypy');
const AXE = fs.readFileSync(path.join(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
const MINI = fs.readFileSync(path.join(__dirname, 'minidc.js'), 'utf8');
const installFonts = require('./fonts.js');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  let bad = 0;
  for (const f of process.argv.slice(3)) {
    let html = fs.readFileSync(path.join(PROJ, f), 'utf8');
    const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    html = html.replace('<script src="./support.js"></script>', '').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
    for (const w of [1280, 375]) {
      const p = await b.newPage({ viewport: { width: w, height: 900 } });
      await installFonts(p);
      await p.setContent(html, { waitUntil: 'domcontentloaded' });
      await p.addScriptTag({ content: MINI });
      await p.evaluate((c) => window.__miniDC(c), m[1]);
      await p.addScriptTag({ content: AXE });
      for (let v = 0; v < 3; v++) {
        await p.evaluate((v) => { const g = [...document.querySelectorAll('.spec [aria-label="Barevná varianta"] button, .spec button')].filter((x) => x.closest('[role=group]') && x.closest('[role=group]').getAttribute('aria-label') === 'Barevná varianta'); (g[v] || {}).click && g[v].click(); }, v);
        if (v === 2) await p.evaluate(() => { const k = [...document.querySelectorAll('.spec button')].find((x) => x.textContent.trim() === 'Krize'); if (k) k.click(); });
        await p.waitForTimeout(150);
        const name = await p.evaluate(() => { const x = [...document.querySelectorAll('.spec button[aria-pressed="true"]')].map((b) => b.textContent.trim()); return x.join('+'); });
        const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        const r = await p.evaluate(async () => { const r = await axe.run(document.querySelector('.site') || document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }); return r.violations.map((v) => v.id + ' x' + v.nodes.length + ' ' + v.nodes.slice(0, 2).map((n) => (n.any[0] && n.any[0].message ? n.any[0].message.slice(0, 110) + ' @ ' : '') + n.target.join(' ').slice(0, 70)).join(' || ')); });
        if (r.length || overflow > 0) { bad++; console.log(f, w, name, 'overflow=' + overflow); r.forEach((x) => console.log('   ' + x)); }
        if (w === 1280) await p.screenshot({ path: path.join(out, f.replace('.dc.html', '') + '-v' + v + '.png'), fullPage: false, clip: { x: 0, y: 0, width: 1280, height: 1500 } }).catch(() => p.screenshot({ path: path.join(out, f.replace('.dc.html', '') + '-v' + v + '.png') }));
      }
      await p.close();
    }
  }
  await b.close();
  console.log('done, problem states:', bad);
})();

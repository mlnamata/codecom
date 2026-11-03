// Usage: node review.js <outdir> <file.dc.html>...   Renders at 375/768/1440, screenshots, runs axe (WCAG 2.1 AA).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PROJ = path.join(__dirname, '..', 'prototypy');
const AXE = fs.readFileSync(path.join(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
const MINI = fs.readFileSync(path.join(__dirname, 'minidc.js'), 'utf8');
const installFonts = require('./fonts.js');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const widths = (process.env.W || '375,768,1440').split(',').map(Number);
  const b = await chromium.launch();
  const report = {};
  for (const f of process.argv.slice(3)) {
    let html = fs.readFileSync(path.join(PROJ, f), 'utf8');
    const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    const code = m ? m[1] : 'class Component extends DCLogic { renderVals(){return {};} }';
    html = html.replace('<script src="./support.js"></script>', '').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
    report[f] = {};
    for (const w of widths) {
      const p = await b.newPage({ viewport: { width: w, height: 900 } });
      await installFonts(p);
      await p.setContent(html, { waitUntil: 'domcontentloaded' });
      await p.addScriptTag({ content: MINI });
      await p.evaluate((c) => window.__miniDC(c), code);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(400);
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      await p.screenshot({ path: path.join(out, f.replace('.dc.html', '') + '-' + w + '.png'), fullPage: true });
      const res = { overflow };
      if (w === widths[0] || w === 1440) {
        await p.addScriptTag({ content: AXE });
        const r = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }); return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 3).map((n) => (n.any[0] && n.any[0].message ? n.any[0].message.slice(0, 140) + ' | ' : '') + n.target.join(' ').slice(0, 90)) })); });
        res.axe = r;
      }
      report[f][w] = res;
      await p.close();
    }
  }
  await b.close();
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 1));
  for (const [f, ws] of Object.entries(report)) {
    const lines = [];
    for (const [w, r] of Object.entries(ws)) {
      if (r.overflow > 1) lines.push(`  ${w}px: horizontal overflow ${r.overflow}px`);
      (r.axe || []).forEach((v) => lines.push(`  ${w}px axe ${v.id} (${v.impact}) x${v.n}: ${v.ex.join(' || ')}`));
    }
    console.log(f + (lines.length ? '\n' + lines.join('\n') : ' clean'));
  }
})();

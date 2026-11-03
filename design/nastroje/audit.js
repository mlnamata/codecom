// Usage: node audit.js <outdir> <file.dc.html>...  Runs ux-ui-audit probes (core, heuristics, perception, focus) at 375 and 1280.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PROJ = path.join(__dirname, '..', 'prototypy');
const SK = '/root/.claude/plugins/synced/e8a902ed-14ea-439b-9d8b-a9ffa7fcdf4e_05adc19c-8283-4c7b-99d9-a67c4b013265/0d07a0ac-4262-4453-bbc9-01ee3cc8d90f/scripts/';
const P = (n) => fs.readFileSync(SK + n, 'utf8');
const MINI = fs.readFileSync(path.join(__dirname, 'minidc.js'), 'utf8');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const f of process.argv.slice(3)) {
    let html = fs.readFileSync(path.join(PROJ, f), 'utf8');
    const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    const code = m ? m[1] : 'class Component extends DCLogic { renderVals(){return {};} }';
    html = html.replace('<script src="./support.js"></script>', '').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
    const res = {};
    for (const w of [375, 1280]) {
      const p = await b.newPage({ viewport: { width: w, height: 900 } });
      await p.setContent(html, { waitUntil: 'domcontentloaded' });
      await p.addScriptTag({ content: MINI });
      await p.evaluate((c) => window.__miniDC(c), code);
      await p.waitForTimeout(250);
      const r = {};
      for (const n of ['probe-core.js', 'probe-heuristics.js', 'probe-perception.js']) {
        try { r[n] = JSON.parse(await p.evaluate(P(n))); } catch (e) { r[n] = { error: String(e).slice(0, 200) }; }
      }
      try { r.vl = JSON.parse(await p.evaluate(fs.readFileSync(path.join(__dirname, 'vlcheck.js'), 'utf8'))); } catch (e) { r.vl = { error: String(e).slice(0, 200) }; }
      await p.screenshot({ path: path.join(out, f.replace('.dc.html', '') + '-' + w + '.png'), fullPage: true });
      const focus = []; let first = null;
      for (let i = 0; i < 150; i++) {
        await p.keyboard.press('Tab');
        const sig = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return ''; const r = a.getBoundingClientRect(); return a.tagName + '|' + (a.textContent || a.id || '').trim().slice(0, 20) + '|' + Math.round(r.top + scrollY) + '|' + Math.round(r.left); });
        if (!sig) continue; if (sig === first) break; if (!first) first = sig;
        try { const j = JSON.parse(await p.evaluate(P('probe-focus.js'))); if (j.verdict && !j.verdict.contrastPasses) focus.push({ el: sig, ratio: j.verdict.contrastRatio, color: j.indicator.outlineColor, bg: j.indicator.backgroundBehind }); } catch (e) { focus.push({ el: sig, error: String(e).slice(0, 80) }); }
      }
      r.focus = focus;
      res[w] = r;
      await p.close();
    }
    fs.writeFileSync(path.join(out, f.replace('.dc.html', '.json')), JSON.stringify(res, null, 1));
    process.stdout.write(f + ' done\n');
  }
  await b.close();
})();

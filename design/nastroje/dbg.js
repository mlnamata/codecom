const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const f = process.argv[2]; const w = +process.argv[3]; const js = process.argv[4];
  let html = fs.readFileSync(path.join(__dirname, '../prototypy', f), 'utf8');
  const m = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/); const code = m ? m[1] : 'class Component extends DCLogic { renderVals(){return {};} }';
  html = html.replace('<script src="./support.js"></script>', '').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/, '');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.setContent(html); await p.addScriptTag({ content: fs.readFileSync(path.join(__dirname, 'minidc.js'), 'utf8') }); await p.evaluate((c) => window.__miniDC(c), code);
  console.log(await p.evaluate(js)); await b.close();
})();

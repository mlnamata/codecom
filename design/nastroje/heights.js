const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const PROJ=path.join(__dirname,'..','prototypy'); const MINI=fs.readFileSync(path.join(__dirname,'minidc.js'),'utf8'); const installFonts=require('./fonts.js');
(async()=>{ const b=await chromium.launch(); const out={};
for (const f of process.argv.slice(2)) { let html=fs.readFileSync(path.join(PROJ,f),'utf8'); const m=html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/); html=html.replace('<script src="./support.js"></script>','').replace(/<script type="text\/x-dc"[\s\S]*?<\/script>/,'');
 const p=await b.newPage({viewport:{width:1280,height:900}}); await installFonts(p); await p.setContent(html); await p.addScriptTag({content:MINI}); await p.evaluate(c=>window.__miniDC(c), m[1]); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
 out[f]=await p.evaluate(()=>document.documentElement.scrollHeight); await p.close(); }
console.log(JSON.stringify(out)); await b.close(); })();

const fs = require('fs'); const path = require('path');
const FS = path.join(__dirname, 'node_modules', '@fontsource');
let cache = null;
function css() {
  if (cache) return cache;
  let out = '';
  for (const pkg of fs.readdirSync(FS)) {
    for (const f of fs.readdirSync(path.join(FS, pkg))) {
      if (/^\d{3}(-italic)?\.css$/.test(f)) out += fs.readFileSync(path.join(FS, pkg, f), 'utf8').replace(/url\(\.\/files\//g, `url(https://fonts.local/${pkg}/files/`);
    }
  }
  return (cache = out);
}
module.exports = async function installFonts(page) {
  await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/css', body: css() }));
  await page.route('https://fonts.local/**', (r) => {
    const rel = new URL(r.request().url()).pathname.slice(1);
    const p = path.join(FS, rel);
    if (!fs.existsSync(p)) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ status: 200, contentType: p.endsWith('woff2') ? 'font/woff2' : 'font/woff', body: fs.readFileSync(p) });
  });
};

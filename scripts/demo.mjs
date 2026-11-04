#!/usr/bin/env node
/** `pnpm demo`: spustí web ukázky a aplikaci (apps/mobile), pokud existuje, a vypíše adresy. */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const procesy = []
const spust = (nazev, args) => {
  const p = spawn('pnpm', args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' })
  p.on('exit', (kod) => {
    console.log(`[demo] ${nazev} skončil (${kod ?? 'signál'})`)
    for (const q of procesy) q.kill()
    process.exit(kod ?? 0)
  })
  procesy.push(p)
}

spust('web', ['--filter', 'codekom-web', 'dev'])
console.log('[demo] web: http://localhost:3000')
console.log('[demo] ukázka administrace: http://localhost:3000/ukazka/administrace')
if (existsSync(join(ROOT, 'apps', 'mobile', 'package.json'))) {
  spust('aplikace', ['--filter', './apps/mobile', 'start', '--web', '--port', '8081'])
  console.log('[demo] aplikace: http://localhost:8081')
}

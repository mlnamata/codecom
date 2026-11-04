import { beforeEach, describe, expect, it } from 'vitest'
import { ChybaOdpoved, KrizeAktivniOdpoved, KrizoveHlaseni, ObceSeznamOdpoved, PrehledOdpoved, StavZavadyOdpoved, ZavadaOdpoved } from '@codekom/typy'
import { GET as hlaseniGet, POST as hlaseniPost } from '@/app/api/hlaseni-zavad/route'
import { PATCH as hlaseniPatch } from '@/app/api/hlaseni-zavad/[id]/route'
import { GET as krizeGet, OPTIONS as krizeOptions } from '@/app/api/krize/aktivni/route'
import { POST as krizePost } from '@/app/api/krize/route'
import { GET as obceGet } from '@/app/api/obce/route'
import { GET as prehledGet } from '@/app/api/obce/[slug]/prehled/route'
import { obnovUkazku } from '@/lib/data/zapis'
import { vynulujLimity } from '@/lib/omezeni'

const B = 'http://localhost:3000'
const APP = 'http://localhost:8081'

const req = (cesta: string, init: RequestInit & { ip?: string } = {}) => {
  const h = new Headers(init.headers)
  h.set('x-forwarded-for', init.ip ?? '10.0.0.1')
  return new Request(`${B}${cesta}`, { ...init, headers: h })
}
const post = (cesta: string, telo: unknown, hlavicky: Record<string, string> = {}, ip?: string) =>
  req(cesta, { method: 'POST', body: JSON.stringify(telo), headers: { 'Content-Type': 'application/json', ...hlavicky }, ip })

beforeEach(() => {
  obnovUkazku()
  vynulujLimity()
})

describe('GET /api/krize/aktivni', () => {
  it('vrací jedno hlášení podle schématu a no-store', async () => {
    const r = await krizeGet(req('/api/krize/aktivni?obec=javori-lhota'))
    expect(r.status).toBe(200)
    expect(r.headers.get('cache-control')).toBe('no-store')
    const data = KrizeAktivniOdpoved.parse(await r.json())
    expect(data.hlavni?.uroven).toBe('emergency')
    expect(data.hlavni?.urovenNazev).toBe('Krizová situace')
    expect(data.dalsich).toBe(2)
    expect(data.hlavni?.odkazUrl).toBe(`${B}/aktuality/pitna-voda-cisterny`)
  })

  it('400 bez obce, 404 neznámá obec', async () => {
    const r400 = await krizeGet(req('/api/krize/aktivni'))
    expect(r400.status).toBe(400)
    ChybaOdpoved.parse(await r400.json())
    expect((await krizeGet(req('/api/krize/aktivni?obec=neexistuje'))).status).toBe(404)
  })

  it('CORS jen pro CODEKOM_APP_ORIGIN', async () => {
    const ok = await krizeGet(req('/api/krize/aktivni?obec=javori-lhota', { headers: { Origin: APP } }))
    expect(ok.headers.get('access-control-allow-origin')).toBe(APP)
    expect(ok.headers.get('vary')).toBe('Origin')
    const cizi = await krizeGet(req('/api/krize/aktivni?obec=javori-lhota', { headers: { Origin: 'https://zlo.example' } }))
    expect(cizi.headers.get('access-control-allow-origin')).toBeNull()
    const pre = krizeOptions(req('/api/krize/aktivni', { method: 'OPTIONS', headers: { Origin: APP } }))
    expect(pre.status).toBe(204)
    expect(pre.headers.get('access-control-allow-methods')).toContain('POST')
  })
})

describe('GET /api/obce a /prehled', () => {
  it('seznam obcí s absolutní adresou znaku a cache 300 s', async () => {
    const r = await obceGet(req('/api/obce'))
    expect(r.headers.get('cache-control')).toBe('public, max-age=300')
    const data = ObceSeznamOdpoved.parse(await r.json())
    expect(data.obce[0]?.znakUrl).toBe(`${B}/demo/znak.svg`)
  })

  it('přehled: 5 aktualit, jen visící dokumenty', async () => {
    const r = await prehledGet(req('/api/obce/javori-lhota/prehled'), { params: Promise.resolve({ slug: 'javori-lhota' }) })
    const data = PrehledOdpoved.parse(await r.json())
    expect(data.aktuality).toHaveLength(5)
    expect(data.deska.length).toBeLessThanOrEqual(5)
    expect(data.deska.every((d) => d.vyvesenoOd <= '2026-11-04' && (d.vyvesenoDo === null || d.vyvesenoDo >= '2026-11-04'))).toBe(true)
    expect((await prehledGet(req('/api/obce/x/prehled'), { params: Promise.resolve({ slug: 'x' }) })).status).toBe(404)
  })
})

describe('hlášení závad', () => {
  const platne = { obec: 'javori-lhota', kategorie: 'vymol', popis: 'Velký výmol před školou.', misto: 'Lipová 3', kontakt: { email: 'jan@example.cz' } }

  it('POST 201, potom GET stavu bez kontaktu', async () => {
    const r = await hlaseniPost(post('/api/hlaseni-zavad', platne))
    expect(r.status).toBe(201)
    const nove = ZavadaOdpoved.parse(await r.json())
    const g = await hlaseniGet(req(`/api/hlaseni-zavad?obec=javori-lhota&kod=${nove.sledovaciKod}`))
    const text = await g.text()
    expect(text).not.toContain('jan@example.cz')
    expect(text).not.toContain('kontakt')
    StavZavadyOdpoved.parse(JSON.parse(text))
  })

  it('400 s chybami po polích', async () => {
    const r = await hlaseniPost(post('/api/hlaseni-zavad', { obec: 'javori-lhota', kategorie: '', popis: 'x', misto: '' }))
    expect(r.status).toBe(400)
    const data = ChybaOdpoved.parse(await r.json())
    expect(Object.keys(data.pole ?? {})).toEqual(expect.arrayContaining(['kategorie', 'popis', 'misto']))
  })

  it('413 při příliš velkém těle', async () => {
    const r = await hlaseniPost(post('/api/hlaseni-zavad', { ...platne, popis: 'x'.repeat(25_000) }))
    expect(r.status).toBe(413)
  })

  it('rate limit 5 za minutu na IP, potom 429 s Retry-After', async () => {
    for (let i = 0; i < 5; i++) expect((await hlaseniPost(post('/api/hlaseni-zavad', platne, {}, '10.9.9.9'))).status).toBe(201)
    const r = await hlaseniPost(post('/api/hlaseni-zavad', platne, {}, '10.9.9.9'))
    expect(r.status).toBe(429)
    expect(Number(r.headers.get('retry-after'))).toBeGreaterThan(0)
  })

  it('PATCH jen s rolí správce nebo redaktor', async () => {
    const telo = JSON.stringify({ stav: 'v_reseni', verejnaOdpoved: 'Opravíme v pátek.' })
    const bez = await hlaseniPatch(req('/api/hlaseni-zavad/hz-2026-0047', { method: 'PATCH', body: telo }), { params: Promise.resolve({ id: 'hz-2026-0047' }) })
    expect(bez.status).toBe(403)
    const s = await hlaseniPatch(req('/api/hlaseni-zavad/hz-2026-0047', { method: 'PATCH', body: telo, headers: { 'X-Ukazka-Role': 'redaktor' } }), {
      params: Promise.resolve({ id: 'hz-2026-0047' }),
    })
    expect(s.status).toBe(200)
    expect(ZavadaOdpoved.parse(await s.json()).stav).toBe('v_reseni')
  })
})

describe('POST /api/krize', () => {
  const telo = { obec: 'javori-lhota', uroven: 'warning', titulek: 'náledí na silnicích', text: 'Ráno hrozí náledí, jezděte opatrně.' }

  it('správce publikuje (201) a hlášení je v /api/krize/aktivni pořadí podle závažnosti', async () => {
    const r = await krizePost(post('/api/krize', { ...telo, uroven: 'emergency' }, { 'X-Ukazka-Role': 'spravce' }))
    expect(r.status).toBe(201)
    const h = KrizoveHlaseni.parse(await r.json())
    const a = KrizeAktivniOdpoved.parse(await (await krizeGet(req('/api/krize/aktivni?obec=javori-lhota'))).json())
    expect(a.hlavni?.id).toBe(h.id)
    expect(a.dalsich).toBe(3)
  })

  it('redaktor uloží koncept (202), na webu se neprojeví', async () => {
    const r = await krizePost(post('/api/krize', { ...telo, uroven: 'emergency' }, { 'X-Ukazka-Role': 'redaktor' }))
    expect(r.status).toBe(202)
    const a = KrizeAktivniOdpoved.parse(await (await krizeGet(req('/api/krize/aktivni?obec=javori-lhota'))).json())
    expect(a.hlavni?.id).toBe('nepijte-vodu')
  })

  it('bez role 403', async () => {
    expect((await krizePost(post('/api/krize', telo))).status).toBe(403)
  })
})

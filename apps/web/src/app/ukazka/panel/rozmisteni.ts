/**
 * Rozmístění objektů na schematické mapě ukázkové obce Javoří Lhota (viewBox 1000 × 600).
 * Obec je smyšlená, proto mapa není geografická. V ostrém provozu se body berou z GPS
 * v datech obce a mapa se kreslí bez dlaždic třetích stran (§ 89 zákona č. 127/2005 Sb.).
 */
export const ROZMISTENI: Record<string, { x: number; y: number }> = {
  // budovy
  urad: { x: 470, y: 270 },
  sokolovna: { x: 660, y: 250 },
  skolka: { x: 360, y: 190 },
  hasicarna: { x: 290, y: 330 },
  knihovna: { x: 560, y: 380 },
  // zámky (u vchodu budovy)
  'urad-zamek': { x: 500, y: 300 },
  'sokol-zamek': { x: 690, y: 282 },
  // kamery
  'kamera-naves': { x: 430, y: 235 },
  'kamera-potok': { x: 735, y: 420 },
  // čidla
  ovzdusi: { x: 395, y: 265 },
  potok: { x: 770, y: 455 },
  vozovka: { x: 860, y: 140 },
  puda: { x: 175, y: 470 },
  // zastávky
  'Javoří Lhota, náves': { x: 520, y: 330 },
  'Javoří Lhota, žel. zastávka': { x: 880, y: 525 },
}

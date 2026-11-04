import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE_UKAZKY, HLAVICKA_UKAZKY, PARAMETRY, sloucit } from './ukazka/stav'
import { COOKIE_UROVNE, jeUroven } from './ukazka/uroven'

/**
 * Jen pro ukázku: přečte sablona, paleta, krize a foto z URL, zvaliduje je, uloží do
 * nezbytné cookie `ukazka` a předá efektivní stav hlavičkou požadavku.
 * Bez NEXT_PUBLIC_UKAZKA=1 vrací ukázková administrace 404.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const ukazka = process.env.NEXT_PUBLIC_UKAZKA === '1'

  if (!ukazka && pathname.startsWith('/ukazka')) {
    return new NextResponse('Nenalezeno', { status: 404 })
  }

  // Ukázka administrace: ?uroven=zaklad|pokrocily|advance uloží volbu a adresu vyčistí.
  const uroven = searchParams.get('uroven')
  if (pathname.startsWith('/ukazka/administrace') && jeUroven(uroven)) {
    const cil = request.nextUrl.clone()
    cil.searchParams.delete('uroven')
    const presmerovani = NextResponse.redirect(cil, 303)
    presmerovani.cookies.set(COOKIE_UROVNE, uroven, { path: '/ukazka', httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', maxAge: 60 * 60 * 24 * 30 })
    return presmerovani
  }

  const cookie = request.cookies.get(COOKIE_UKAZKY)?.value
  const stav = sloucit(searchParams, cookie)
  const hodnota = JSON.stringify(stav)

  const hlavicky = new Headers(request.headers)
  hlavicky.set(HLAVICKA_UKAZKY, hodnota)
  const response = NextResponse.next({ request: { headers: hlavicky } })

  if (PARAMETRY.some((k) => searchParams.has(k)) && hodnota !== cookie) {
    response.cookies.set(COOKIE_UKAZKY, hodnota, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
      maxAge: 60 * 60 * 24 * 30,
    })
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next|demo|favicon\\.ico|robots\\.txt).*)'],
}

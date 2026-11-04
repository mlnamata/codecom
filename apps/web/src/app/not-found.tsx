import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Stránka nenalezena' }

export default function Nenalezeno() {
  return (
    <main id="obsah" style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Stránka nenalezena</h1>
      <p>Stránka na této adrese neexistuje, nebo už není zveřejněná.</p>
      <p>
        <a href="/">Pokračovat na úvod</a>
      </p>
    </main>
  )
}

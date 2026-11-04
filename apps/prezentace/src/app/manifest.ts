import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodeKom',
    short_name: 'CodeKom',
    description: 'Web, úřední deska a aplikace pro obce do 2 000 obyvatel.',
    lang: 'cs',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}

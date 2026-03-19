import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Pensieve',
    short_name: 'Pensieve',
    description:
      'Security & pentesting reference — cheatsheets, methodology, and tools by Alpastx',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#a855f7',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png'
      }
    ]
  }
}

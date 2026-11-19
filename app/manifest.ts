import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MARKASTOPUP - Top Up Game Termurah',
    short_name: 'MARKASTOPUP',
    description: 'Top up game & voucher terlaris, murah, aman, legal 100%.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/icon.svg', // Ini ngambil dari file icon.svg yang kita bikin kemarin
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
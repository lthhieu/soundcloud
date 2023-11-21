import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SoundCloud with lthhieu',
        short_name: 'SoundCloud with lthhieu',
        description: 'Build by NextJs 13 with Material UI',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            }
        ],
        orientation: 'portrait',
        related_applications: [
            {
                platform: 'wabapp',
                url: `${process.env.NEXTAUTH_URL}/manifest.json`
            }
        ],
        scope: '/'
    }
}
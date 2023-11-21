import AppBottom from '@/components/bottom/app.bottom'
import AppHeader from '@/components/header/app.header'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Discover songs in SoundCloud',
  description: 'Discover the top streamed music and songs online on SoundCloud',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'Ly Tran Hoang Hieu',
    url: `${process.env.NEXTAUTH_URL}`,
    description: 'Build NextJs13 app with Material UI to clone SoundCLoud',
    inLanguage: 'vi'
  }

  return (<>
    <AppHeader />
    {children}
    <AppBottom />
    <Script
      strategy="lazyOnload"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  </>
  );
}

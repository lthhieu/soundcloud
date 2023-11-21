import AppBottom from '@/components/bottom/app.bottom'
import AppHeader from '@/components/header/app.header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discover songs in SoundCloud',
  description: 'Discover the top streamed music and songs online on SoundCloud',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <AppHeader />
    {children}
    <AppBottom />
  </>
  );
}

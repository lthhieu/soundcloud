import AppBottom from '@/components/bottom/app.bottom'
import AppHeader from '@/components/header/app.header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <AppHeader />
    {children}
    <AppBottom />
  </>
  );
}

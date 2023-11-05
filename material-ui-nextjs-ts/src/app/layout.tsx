import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import AppBottom from '@/components/bottom/app.bottom';
import AppHeader from '@/components/header/app.header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppBottom />
        </ThemeRegistry>
      </body>
    </html>
  );
}

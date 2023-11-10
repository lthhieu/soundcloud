import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import AppBottom from '@/components/bottom/app.bottom';
import AppHeader from '@/components/header/app.header';
import AuthProvider from '@/lib/auth.provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <AppHeader />
            {children}
            <AppBottom />
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

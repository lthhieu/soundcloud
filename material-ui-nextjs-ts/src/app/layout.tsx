import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AuthProvider from '@/lib/auth.provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0 }}>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

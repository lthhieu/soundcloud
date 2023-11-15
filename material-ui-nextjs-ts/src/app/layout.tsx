import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AuthProvider from '@/lib/auth.provider'
import { ToastProvider } from '@/utils/use-toast-mui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0 }}>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

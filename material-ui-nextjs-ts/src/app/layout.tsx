import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import AuthProvider from '@/lib/auth.provider'
import { TrackContextProvider } from '@/lib/context.provider';
import NProgressBarProvider from '@/lib/nprogress.bar.provider';
import { ToastProvider } from '@/utils/use-toast-mui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0, backgroundColor: '#fff' }}>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <NProgressBarProvider>
              <ToastProvider>
                <TrackContextProvider>
                  {children}
                </TrackContextProvider>
              </ToastProvider>
            </NProgressBarProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

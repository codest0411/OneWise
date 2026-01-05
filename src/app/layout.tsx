import './globals.css'
import { AuthProvider } from '../hooks/useAuth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-900 text-white min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

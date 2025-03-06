import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata = {
  title: 'WoM Offer Studio',
  description: '专业留学咨询服务',
  icons: {
    icon: [
      {
        url: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

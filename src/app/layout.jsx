import './globals.css'

export const metadata = {
  metadataBase: new URL('https://codeasystem.com'),
  title: { default: 'CodeASystem', template: '%s | CodeASystem' },
  description: 'CodeASystem builds practical AI products, backend systems and custom software around the work that matters.',
  icons: {
    icon: [{ url: '/favicon/favicon.ico' }, { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
}

export default function RootLayout({ children }) {
  return <html lang="en"><head><meta name="theme-color" content="#101010" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" /></head><body>{children}</body></html>
}

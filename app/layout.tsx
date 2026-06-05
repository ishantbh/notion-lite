import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme/theme-provider'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Notion Lite',
  description: 'A simple, lightweight, and fast Notion-like note-taking app.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full antialiased font-sans',
        inter.variable,
        geistMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

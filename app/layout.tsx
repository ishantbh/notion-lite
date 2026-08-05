import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import QueryClientProvider from '@/providers/query-client-provider'
import { ThemeProvider } from '@/providers/theme/theme-provider'
import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Notion Lite',
    default: 'Notion Lite',
  },
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
          <TooltipProvider>
            <main className='flex grow'>
              <QueryClientProvider>{children}</QueryClientProvider>
            </main>
          </TooltipProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

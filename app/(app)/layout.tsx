import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import QueryClientProvider from '@/providers/query-client-provider'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className='w-full flex flex-col grow'>
          <SidebarTrigger />

          {children}
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

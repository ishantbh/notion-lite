import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className='w-full flex flex-col grow'>
        <SidebarTrigger />

        {children}
      </div>
    </SidebarProvider>
  )
}

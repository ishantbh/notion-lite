import { AppSidebarFooter } from '@/components/app-sidebar/app-sidebar-footer'
import { AppSidebarHeader } from '@/components/app-sidebar/app-sidebar-header'
import { Sidebar } from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />

      <AppSidebarFooter />
    </Sidebar>
  )
}

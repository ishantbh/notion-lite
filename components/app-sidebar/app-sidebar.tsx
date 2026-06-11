'use client'

import { AppSidebarFooter } from '@/components/app-sidebar/app-sidebar-footer'
import { AppSidebarHeader } from '@/components/app-sidebar/app-sidebar-header'
import { AppSidebarNav } from '@/components/app-sidebar/app-sidebar-nav'
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar'

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>
        <AppSidebarNav />
      </SidebarContent>
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}

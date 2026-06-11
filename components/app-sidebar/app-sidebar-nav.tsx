import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Heart, NotebookTextIcon, Settings, Trash } from 'lucide-react'
import Link from 'next/link'

export function AppSidebarNav() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive asChild>
            <Link href='/dashboard'>
              <NotebookTextIcon />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href='/favorites'>
              <Heart />
              <span>Favorites</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href='/settings'>
              <Settings />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className='text-red-300 hover:text-red-300'
            asChild
          >
            <Link href='/trash'>
              <Trash />
              <span>Trash</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

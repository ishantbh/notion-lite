'use client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  NotebookTextIcon,
  SettingsIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: NotebookTextIcon },
  { title: 'Starred', href: '/starred', icon: StarIcon },
  { title: 'Settings', href: '/settings', icon: SettingsIcon },
  { title: 'Trash', href: '/trash', icon: Trash2Icon, destructive: true },
]

export function AppSidebarNav() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {sidebarNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn({
                  'data-active:text-destructive hover:text-destructive active:text-destructive data-active:bg-destructive/10 hover:bg-destructive/10 active:bg-destructive/10':
                    item.destructive,
                })}
              >
                <Link
                  href={item.href}
                  className={cn({ 'text-destructive': item.destructive })}
                >
                  <Icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

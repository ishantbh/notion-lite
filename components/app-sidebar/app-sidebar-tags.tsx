'use client'

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useTags } from '@/features/notes/hooks/use-tags'
import { HashIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function AppSidebarTags() {
  const { data, isLoading, isError } = useTags()

  const tags = data?.tags ?? []

  if (isError) {
    toast.error('Failed to load tags')
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <SidebarGroupAction>
        <PlusIcon className='size-4' />
        <span className='sr-only'>Add Tag</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <SidebarMenuItem key={i}>
                <div className='h-8 px-2 flex items-center justify-center'>
                  <Skeleton className='w-full h-4' />
                </div>
              </SidebarMenuItem>
            ))
          : tags.map((tag) => (
              <SidebarMenuItem key={tag.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/tags/${tag.id}`}>
                    <HashIcon className='text-muted-foreground' />
                    <span>{tag.name}</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuBadge className='text-muted-foreground'>
                  {tag.notesCount}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

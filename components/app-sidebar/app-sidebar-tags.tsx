'use client'

import { AppSidebarTagActions } from '@/components/app-sidebar/app-sidebar-tag-actions'
import { Badge } from '@/components/ui/badge'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateEditTagDialog } from '@/features/tags/components/create-edit-tag-dialog'
import { useTags } from '@/features/tags/hooks/use-tags'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'
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
      <CreateEditTagDialog>
        <SidebarGroupAction>
          <PlusIcon className='size-4' />
          <span className='sr-only'>Add Tag</span>
        </SidebarGroupAction>
      </CreateEditTagDialog>
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
                    <Badge variant='outline' className='text-muted-foreground'>
                      {tag.notesCount}
                    </Badge>
                    <span>{tag.name}</span>
                  </Link>
                </SidebarMenuButton>

                <AppSidebarTagActions tagId={tag.id}>
                  <SidebarMenuAction className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                    <MoreHorizontalIcon />
                    <span className='sr-only'>Actions</span>
                  </SidebarMenuAction>
                </AppSidebarTagActions>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

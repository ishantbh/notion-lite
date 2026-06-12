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
import type { GetTagsResponse, TagListItem } from '@/features/notes/types'
import { HashIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function AppSidebarTags() {
  const [tags, setTags] = useState<TagListItem[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags')
        const data: GetTagsResponse = await res.json()
        setTags(data.tags)
      } catch (err) {
        toast.error('Error fetching tags')
      }
    }

    fetchTags()
  }, [])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <SidebarGroupAction>
        <PlusIcon className='size-4' />
        <span className='sr-only'>Add Tag</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {tags.map((tag) => (
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

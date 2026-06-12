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
import { Tag } from '@/db/types'
import { HashIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function AppSidebarTags() {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags')
        const data = await res.json()
        setTags(data['tags'] as Tag[])
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
              <Link href='/'>
                <HashIcon className='text-muted-foreground' />
                <span>{tag.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

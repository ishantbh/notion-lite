'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/components/ui/sidebar'
import { CreateEditTagDialog } from '@/features/tags/components/create-edit-tag-dialog'
import { TagDeleteConfirmationDialog } from '@/features/tags/components/tag-delete-confirmation-dialog'
import { TagListItem } from '@/features/tags/types'
import { PencilIcon, TrashIcon } from 'lucide-react'

type Props = {
  children: React.ReactNode
  tag: TagListItem
}

export function AppSidebarTagActions({ children, tag }: Props) {
  const { isMobile } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        side={isMobile ? 'bottom' : 'right'}
        align={isMobile ? 'end' : 'start'}
        className='min-w-56 rounded-lg'
      >
        <CreateEditTagDialog tag={tag}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilIcon />
            <span>Edit</span>
          </DropdownMenuItem>
        </CreateEditTagDialog>
        <TagDeleteConfirmationDialog tagId={tag.id}>
          <DropdownMenuItem
            variant='destructive'
            onSelect={(e) => e.preventDefault()}
          >
            <TrashIcon />
            <span>Move to trash</span>
          </DropdownMenuItem>
        </TagDeleteConfirmationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

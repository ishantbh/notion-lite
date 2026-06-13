'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/components/ui/sidebar'
import { TagDeleteConfirmationDialog } from '@/features/tags/components/tag-delete-confirmation-dialog'
import { PencilIcon, TrashIcon } from 'lucide-react'

type Props = {
  children: React.ReactNode
  tagId: string
}

export function AppSidebarTagActions({ children, tagId }: Props) {
  const { isMobile } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        side={isMobile ? 'bottom' : 'right'}
        align={isMobile ? 'end' : 'start'}
        className='min-w-56 rounded-lg'
      >
        <DropdownMenuItem>
          <PencilIcon />
          <span>Edit</span>
        </DropdownMenuItem>
        <TagDeleteConfirmationDialog tagId={tagId}>
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

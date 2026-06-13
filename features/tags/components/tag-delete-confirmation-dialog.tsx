'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useDeleteTag } from '@/features/tags/hooks/use-delete-tag'
import { Loader2Icon, Trash2Icon } from 'lucide-react'

type Props = {
  children: React.ReactNode
  tagId: string
}

export function TagDeleteConfirmationDialog({ children, tagId }: Props) {
  const { mutate: deleteTag, isPending } = useDeleteTag()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the tag
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>No, cancel</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            onClick={() => deleteTag(tagId)}
          >
            {isPending && <Loader2Icon className='size-4 animate-spin' />}
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

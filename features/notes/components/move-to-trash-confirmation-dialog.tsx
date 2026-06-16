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
import { Button } from '@/components/ui/button'
import { softDeleteNote } from '@/features/notes/server/soft-delete-note'
import { Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type Props = {
  noteId: string
}

export function MoveToTrashConfirmationDialog({ noteId }: Props) {
  async function handleSoftDelete() {
    const res = await softDeleteNote({ noteId, isDeleted: true })

    if (res?.error) {
      toast.error(res.error)
      return
    }

    toast.success('Note moved to trash')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          title='Move to trash'
          className='flex items-center gap-2'
        >
          <Trash2Icon />
          <span className='sr-only sm:not-sr-only'>Move to trash</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You can restore this note from the <Link href='/trash'>trash</Link>{' '}
            at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={handleSoftDelete}>
            Move to trash
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

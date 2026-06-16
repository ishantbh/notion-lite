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
import { HistoryIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

type Props = {
  noteId: string
}

export function RestoreDeletedNoteConfirmationDialog({ noteId }: Props) {
  async function handleRestoreDeletedNote() {
    const res = await softDeleteNote({ noteId, isDeleted: false })

    if (res?.error) {
      toast.error(res.error)
      return
    }

    toast.success('Note restored from trash')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          title='Restore'
          className='flex items-center gap-2'
        >
          <HistoryIcon />
          <span className='sr-only sm:not-sr-only'>Restore</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'>
            <HistoryIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are restoring this note from the{' '}
            <Link href='/trash'>trash</Link>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRestoreDeletedNote}>
            Restore
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Note } from '@/db/types'
import { CreateEditNoteForm } from '@/features/notes/components/create-edit-note-form'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  note: Note
}

export function EditNoteDialog({ note }: Props) {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          title='Edit'
          className='flex items-center gap-2'
        >
          <PencilIcon />
          <span className='sr-only sm:not-sr-only'>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>Update the note</DialogDescription>
        </DialogHeader>

        <CreateEditNoteForm note={note} close={close} />
      </DialogContent>
    </Dialog>
  )
}

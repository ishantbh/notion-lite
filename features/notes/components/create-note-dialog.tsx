'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreateEditNoteForm } from '@/features/notes/components/create-edit-note-form'
import { VariantProps } from 'class-variance-authority'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function CreateNoteDialog({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Props) {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className} {...props}>
          <PlusIcon />
          <span>New Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>Create a new note</DialogDescription>
        </DialogHeader>

        <CreateEditNoteForm close={close} />
      </DialogContent>
    </Dialog>
  )
}

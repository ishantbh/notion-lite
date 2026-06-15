'use client'

import { Button } from '@/components/ui/button'

type Props = {
  noteId: string
}

export function RestoreDeletedNoteButton({ noteId }: Props) {
  function handleRestoreDeletedNote() {
    // TODO: Restore deleted note
  }

  return (
    <Button variant='outline' onClick={handleRestoreDeletedNote}>
      Restore
    </Button>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { updateNoteStarred } from '@/features/notes/server/update-note-starred'
import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { startTransition, useOptimistic } from 'react'
import { toast } from 'sonner'

type Props = {
  isStarred: boolean
  noteId: string
  size?: 'default' | 'lg'
}

export function NotesItemStarButton({
  noteId,
  isStarred,
  size = 'default',
}: Props) {
  const [optimisticStarred, setOptimisticStarred] = useOptimistic(isStarred)

  async function handleToggle() {
    const next = !optimisticStarred

    startTransition(async () => {
      setOptimisticStarred(next)

      const res = await updateNoteStarred({ noteId, isStarred: next })

      if (res?.error) {
        toast.error(res.error)
        setOptimisticStarred(!next)
      }
    })
  }

  return (
    <Button
      variant='ghost'
      size={size === 'lg' ? 'icon-lg' : 'icon'}
      onClick={handleToggle}
    >
      <StarIcon
        className={cn(
          { 'size-5': size === 'lg' },
          { 'fill-current': optimisticStarred },
        )}
      />
    </Button>
  )
}

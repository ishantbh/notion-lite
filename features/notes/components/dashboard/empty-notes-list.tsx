import { CreateNoteButton } from '@/features/notes/components/dashboard/create-note-button'
import { FolderOpenIcon } from 'lucide-react'

export function EmptyNotesList({ query }: { query?: string }) {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 grow opacity-80'>
      <FolderOpenIcon className='size-16 text-muted-foreground' />

      <h2 className='text-xl sm:text-2xl mb-2 font-medium text-muted-foreground'>
        {query ? (
          <span>No notes found matching "{query}"</span>
        ) : (
          <span>Create your first note</span>
        )}
      </h2>

      {!query && <CreateNoteButton variant='outline' size='lg' />}
    </div>
  )
}

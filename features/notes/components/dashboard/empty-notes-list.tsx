import { Button } from '@/components/ui/button'
import { FolderOpenIcon, PlusIcon } from 'lucide-react'

export function EmptyNotesList() {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 grow opacity-80'>
      <FolderOpenIcon className='size-16 text-muted-foreground' />

      <h2 className='text-xl sm:text-2xl mb-2 font-medium text-muted-foreground'>
        Create your first note
      </h2>

      <Button variant='outline' size='lg'>
        <PlusIcon />
        <span>New Note</span>
      </Button>
    </div>
  )
}

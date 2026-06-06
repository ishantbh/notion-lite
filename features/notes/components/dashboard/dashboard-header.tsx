import { Button } from '@/components/ui/button'
import { CreateNoteDialog } from '@/features/notes/components/create-note-dialog'
import { PlusIcon } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className='flex items-center gap-4 justify-between'>
      <div className='space-y-1'>
        <h1 className='text-xl sm:text-2xl font-semibold'>Your Notes</h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          View and manage your notes
        </p>
      </div>

      <CreateNoteDialog />
    </div>
  )
}

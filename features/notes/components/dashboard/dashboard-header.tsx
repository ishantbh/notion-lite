import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { NotesSearch } from '@/features/notes/components/dashboard/notes-search'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
  return (
    <header className='w-full border-b'>
      <div className='w-full max-w-7xl mx-auto flex h-16 shrink-0 items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator
          orientation='vertical'
          className='mr-1 data-vertical:h-4 data-vertical:self-auto'
        />

        <div className='flex items-center justify-between gap-8 w-full'>
          <h1 className='text-lg font-semibold'>Notes</h1>

          <div className='flex items-center gap-2'>
            <NotesSearch />

            <Button
              size='icon'
              title='Create new note'
              className='sm:w-auto sm:px-4 sm:gap-1'
              asChild
            >
              <Link href='/notes/create'>
                <PlusIcon />
                <span className='hidden sm:inline'>New Note</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

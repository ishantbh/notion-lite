import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
  return (
    <HeaderWithSidebar title='Notes'>
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
    </HeaderWithSidebar>
  )
}

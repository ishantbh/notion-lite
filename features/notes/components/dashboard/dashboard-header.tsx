import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
  return (
    <div className='flex items-center gap-4 justify-between'>
      <div className='space-y-1'>
        <h1 className='text-xl sm:text-2xl font-semibold'>Your Notes</h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          View and manage your notes
        </p>
      </div>

      <Button asChild>
        <Link href='/notes/create'>
          <PlusIcon />
          <span>New Note</span>
        </Link>
      </Button>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PencilIcon, Trash2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col'>
      <div className='flex items-start gap-4 justify-between'>
        <div className='space-y-1 w-full max-w-45'>
          <Skeleton className='h-7 w-full sm:h-8' />

          <div className='flex items-center gap-2 w-full'>
            <p className='text-sm'>By</p>
            <Skeleton className='h-5 grow' />
          </div>

          <div className='flex items-center gap-2 w-full'>
            <p className='text-sm text-muted-foreground'>Created:</p>
            <Skeleton className='h-5 grow' />
          </div>

          <div className='flex items-center gap-2 w-full'>
            <p className='text-sm text-muted-foreground'>Last updated:</p>
            <Skeleton className='h-5 grow' />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            title='Edit'
            disabled={true}
            className='flex items-center gap-2'
          >
            <PencilIcon />
            <span className='sr-only sm:not-sr-only'>Edit</span>
          </Button>

          <Button
            variant='destructive'
            title='Delete'
            disabled={true}
            className='flex items-center gap-2'
          >
            <Trash2Icon />
            <span className='sr-only sm:not-sr-only'>Delete</span>
          </Button>
        </div>
      </div>

      <Skeleton className='mt-6 w-full h-50' />
    </div>
  )
}

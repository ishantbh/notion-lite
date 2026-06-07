import { Button } from '@/components/ui/button'
import { FrownIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='grow flex flex-col items-center justify-center gap-2 text-muted-foreground'>
      <FrownIcon className='size-12' />
      <h1 className='text-2xl sm:text-3xl font-semibold'>Not Found</h1>
      <p>Could not find requested resource</p>
      <Button variant='outline' size='lg' className='mt-2' asChild>
        <Link href='/'>
          <HomeIcon className='size-4' />
          <span>Return Home</span>
        </Link>
      </Button>
    </div>
  )
}

import { LoaderIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center grow'>
      <LoaderIcon className='size-12 animate-spin text-muted-foreground' />
    </div>
  )
}

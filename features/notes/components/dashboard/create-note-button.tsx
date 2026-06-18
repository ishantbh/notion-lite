import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function CreateNoteButton({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Props) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      {...props}
      asChild
    >
      <Link href='/notes/create' className='flex items-center gap-2'>
        <PlusIcon />
        <span>New Note</span>
      </Link>
    </Button>
  )
}

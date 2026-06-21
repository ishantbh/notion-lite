import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { NotesSearch } from '@/features/notes/components/dashboard/notes-search'

type Props = {
  title: string
  showSearch?: boolean
  children?: React.ReactNode
}

export function HeaderWithSidebar({
  title,
  children,
  showSearch = true,
}: Props) {
  return (
    <header className='w-full border-b'>
      <div className='w-full max-w-7xl mx-auto flex h-16 shrink-0 items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />

        <Separator
          orientation='vertical'
          className='mr-1 data-vertical:h-6 data-vertical:self-auto'
        />

        <div className='flex items-center justify-between gap-8 w-full'>
          <h1 className='text-lg font-semibold'>{title}</h1>

          <div className='flex items-center gap-2'>
            {showSearch && <NotesSearch />}

            {children}
          </div>
        </div>
      </div>
    </header>
  )
}

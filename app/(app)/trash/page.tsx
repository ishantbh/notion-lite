import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
import { DeletedNotesList } from '@/features/notes/components/trash/deleted-notes-list'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page(props: {
  searchParams?: Promise<{ page?: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  const { id: userId } = session.user

  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  if (currentPage <= 0) {
    redirect('/trash')
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold'>Trash</h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            View and manage your deleted notes
          </p>
        </div>
      </div>

      <Suspense fallback={<NotesListSkeleton />}>
        <DeletedNotesList userId={userId} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}

import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
import { DeletedNotesList } from '@/features/notes/components/trash/deleted-notes-list'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}

export default async function Page(props: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  const { id: userId } = session.user

  const searchParams = await props.searchParams
  const query = searchParams?.query?.trim()
  const currentPage = Number(searchParams?.page) || 1

  if (currentPage <= 0) {
    redirect('/trash')
  }

  return (
    <div className='flex flex-col grow'>
      <HeaderWithSidebar title='Trash' />

      <main className='w-full max-w-7xl mx-auto px-4 flex flex-col grow'>
        <Suspense fallback={<NotesListSkeleton />}>
          <DeletedNotesList
            userId={userId}
            query={query}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  )
}

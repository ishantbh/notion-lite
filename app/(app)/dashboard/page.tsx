import { DashboardHeader } from '@/features/notes/components/dashboard/dashboard-header'
import { NotesList } from '@/features/notes/components/dashboard/notes-list'
import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
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
    redirect('/dashboard')
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
      <DashboardHeader />

      <Suspense fallback={<NotesListSkeleton />}>
        <NotesList userId={userId} query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}

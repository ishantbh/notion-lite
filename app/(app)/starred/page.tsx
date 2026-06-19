import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
import { StarredNotesList } from '@/features/notes/components/starred-notes-list'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  const { id: userId } = session.user

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold'>
            Your Starred Notes
          </h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            View and manage your starred notes
          </p>
        </div>
      </div>

      <Suspense fallback={<NotesListSkeleton />}>
        <StarredNotesList userId={userId} />
      </Suspense>
    </div>
  )
}

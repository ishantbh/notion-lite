import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
import { NotesListByTag } from '@/features/notes/components/notes-list-by-tag'
import { getUserTagById } from '@/features/tags/data/get-user-tag-by-id'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ tagId: string }>
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

  const { tagId } = await props.params

  const tag = await getUserTagById({ tagId, userId })

  if (!tag) {
    notFound()
  }

  const searchParams = await props.searchParams
  const query = searchParams?.query?.trim()
  const currentPage = Number(searchParams?.page) || 1

  if (currentPage <= 0) {
    redirect(`/tags/${tagId}`)
  }

  return (
    <div className='flex flex-col grow'>
      <HeaderWithSidebar title={tag.name} />

      <main className='w-full max-w-7xl mx-auto px-4 flex flex-col grow'>
        <Suspense fallback={<NotesListSkeleton />}>
          <NotesListByTag
            userId={userId}
            tagId={tagId}
            query={query}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  )
}

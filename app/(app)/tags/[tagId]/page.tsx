import { db } from '@/db'
import { tags } from '@/db/schema'
import { NotesListSkeleton } from '@/features/notes/components/dashboard/skeletons/notes-list-skeleton'
import { NotesListByTag } from '@/features/notes/components/notes-list-by-tag'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
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

  const tag = await db.query.tags.findFirst({
    where: and(eq(tags.id, tagId), eq(tags.userId, userId)),
  })

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
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold'>{tag.name}</h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            View and manage your notes for tag &quot;{tag.name}&quot;
          </p>
        </div>
      </div>

      <Suspense fallback={<NotesListSkeleton />}>
        <NotesListByTag
          userId={userId}
          tagId={tag.id}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  )
}

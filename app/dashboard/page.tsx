import { db } from '@/db'
import { notes } from '@/db/schema'
import type { Note } from '@/db/types'
import { DashboardHeader } from '@/features/notes/components/dashboard/dashboard-header'
import { NotesList } from '@/features/notes/components/dashboard/notes-list'
import { auth } from '@/lib/auth'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  const { id: userId } = session.user

  const userNotes: Note[] = await db.query.notes.findMany({
    where: eq(notes.userId, userId),
    orderBy: desc(notes.updatedAt),
  })

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col'>
      <DashboardHeader />

      <NotesList notes={userNotes} />
    </div>
  )
}

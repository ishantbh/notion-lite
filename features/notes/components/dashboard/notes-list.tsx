import { db } from '@/db'
import { notes } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq } from 'drizzle-orm'
import { NotesItem } from './notes-item'
import { redirect } from 'next/navigation'

type Props = {
  userId: string
  currentPage: number
}

export async function NotesList({ userId, currentPage }: Props) {
  const [userNotesWithTagIds, [{ total }]] = await Promise.all([
    db.query.notes.findMany({
      with: {
        noteTags: {
          with: {
            tag: true,
          },
        },
      },
      where: and(eq(notes.userId, userId), eq(notes.isDeleted, false)),
      orderBy: desc(notes.updatedAt),
      limit: NOTES_PER_PAGE,
      offset: (currentPage - 1) * NOTES_PER_PAGE,
    }),
    db
      .select({ total: count() })
      .from(notes)
      .where(and(eq(notes.userId, userId), eq(notes.isDeleted, false))),
  ])

  const totalPages = Math.ceil(total / NOTES_PER_PAGE)

  if (totalPages === 0) {
    return <EmptyNotesList />
  }

  if (currentPage > totalPages) {
    redirect(`/dashboard?page=${totalPages}`)
  }

  return (
    <div className='flex flex-col gap-4 grow justify-between'>
      <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {userNotesWithTagIds.map((note) => (
          <NotesItem key={note.id} note={note} />
        ))}
      </ul>

      <NotesPagination totalPages={totalPages} />
    </div>
  )
}

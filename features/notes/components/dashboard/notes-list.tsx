import { db } from '@/db'
import { notes } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq, ilike, or } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { NotesItem } from './notes-item'

type Props = {
  userId: string
  query?: string
  currentPage: number
}

export async function NotesList({ userId, currentPage, query }: Props) {
  const whereClause = and(
    eq(notes.userId, userId),
    eq(notes.isDeleted, false),
    query?.trim()
      ? or(
          ilike(notes.title, `%${query}%`),
          ilike(notes.contentText, `%${query}%`),
        )
      : undefined,
  )

  const [userNotesWithTagIds, [{ total }]] = await Promise.all([
    db.query.notes.findMany({
      with: {
        noteTags: {
          with: {
            tag: true,
          },
        },
      },
      where: whereClause,
      orderBy: desc(notes.updatedAt),
      limit: NOTES_PER_PAGE,
      offset: (currentPage - 1) * NOTES_PER_PAGE,
    }),
    db.select({ total: count() }).from(notes).where(whereClause),
  ])

  const totalPages = Math.ceil(total / NOTES_PER_PAGE)

  if (totalPages > 0 && currentPage > totalPages) {
    redirect(`/dashboard?page=${totalPages}`)
  }

  return (
    <div className='flex flex-col gap-8 grow mt-8'>
      {userNotesWithTagIds.length ? (
        <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {userNotesWithTagIds.map((note) => (
            <NotesItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <EmptyNotesList query={query} />
      )}

      {totalPages > 0 && <NotesPagination totalPages={totalPages} />}
    </div>
  )
}

import { db } from '@/db'
import { notes, noteTags } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq, exists, ilike, or } from 'drizzle-orm'
import { redirect } from 'next/navigation'

type Props = {
  userId: string
  tagId: string
  query?: string
  currentPage: number
}

export async function NotesListByTag({
  userId,
  tagId,
  query,
  currentPage,
}: Props) {
  const whereClause = and(
    eq(notes.userId, userId),
    exists(
      db
        .select()
        .from(noteTags)
        .where(and(eq(noteTags.noteId, notes.id), eq(noteTags.tagId, tagId))),
    ),
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
    redirect(`/tags/${tagId}?page=${totalPages}`)
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

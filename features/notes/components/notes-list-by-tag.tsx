import { db } from '@/db'
import { notes, noteTags } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq, exists } from 'drizzle-orm'

type Props = {
  userId: string
  tagId: string
  currentPage: number
}

export async function NotesListByTag({ userId, tagId, currentPage }: Props) {
  const whereClause = and(
    eq(notes.userId, userId),
    exists(
      db
        .select()
        .from(noteTags)
        .where(and(eq(noteTags.noteId, notes.id), eq(noteTags.tagId, tagId))),
    ),
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

  if (totalPages === 0) {
    return <EmptyNotesList />
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

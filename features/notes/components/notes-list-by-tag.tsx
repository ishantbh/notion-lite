import { db } from '@/db'
import { notes, noteTags } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { and, desc, eq, exists } from 'drizzle-orm'

type Props = {
  userId: string
  tagId: string
}

export async function NotesListByTag({ userId, tagId }: Props) {
  const userNotesWithTagIds = await db.query.notes.findMany({
    with: {
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(
      eq(notes.userId, userId),
      exists(
        db
          .select()
          .from(noteTags)
          .where(and(eq(noteTags.noteId, notes.id), eq(noteTags.tagId, tagId))),
      ),
    ),
    orderBy: desc(notes.updatedAt),
  })

  if (userNotesWithTagIds.length === 0) {
    return <EmptyNotesList />
  }

  return (
    <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {userNotesWithTagIds.map((note) => (
        <NotesItem key={note.id} note={note} />
      ))}
    </ul>
  )
}

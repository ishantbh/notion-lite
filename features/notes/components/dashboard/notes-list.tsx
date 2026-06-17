import { db } from '@/db'
import { notes } from '@/db/schema'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { and, desc, eq } from 'drizzle-orm'
import { NotesItem } from './notes-item'

type Props = {
  userId: string
}

export async function NotesList({ userId }: Props) {
  const userNotesWithTagIds = await db.query.notes.findMany({
    with: {
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(eq(notes.userId, userId), eq(notes.isDeleted, false)),
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

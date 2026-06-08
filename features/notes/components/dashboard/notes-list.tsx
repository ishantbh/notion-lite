import { db } from '@/db'
import { notes } from '@/db/schema'
import { Note } from '@/db/types'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { desc, eq } from 'drizzle-orm'
import { NotesItem } from './notes-item'

type Props = {
  userId: string
}

export async function NotesList({ userId }: Props) {
  const userNotes: Note[] = await db.query.notes.findMany({
    where: eq(notes.userId, userId),
    orderBy: desc(notes.updatedAt),
  })

  if (userNotes.length === 0) {
    return <EmptyNotesList />
  }

  return (
    <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {userNotes.map((note) => (
        <NotesItem key={note.id} note={note} />
      ))}
    </ul>
  )
}

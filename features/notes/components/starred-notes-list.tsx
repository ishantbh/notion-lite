import { db } from '@/db'
import { notes } from '@/db/schema'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { and, desc, eq } from 'drizzle-orm'
import { FolderOpenIcon } from 'lucide-react'

type Props = {
  userId: string
}

export async function StarredNotesList({ userId }: Props) {
  const userStarredNotes = await db.query.notes.findMany({
    with: {
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
    where: and(
      eq(notes.userId, userId),
      eq(notes.isDeleted, false),
      eq(notes.isStarred, true),
    ),
    orderBy: desc(notes.updatedAt),
  })

  if (userStarredNotes.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center text-center gap-4 grow opacity-80'>
        <FolderOpenIcon className='size-16 text-muted-foreground' />

        <h2 className='text-xl sm:text-2xl mb-2 font-medium text-muted-foreground'>
          You don't have any starred notes yet
        </h2>
      </div>
    )
  }

  return (
    <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {userStarredNotes.map((note) => (
        <NotesItem key={note.id} note={note} />
      ))}
    </ul>
  )
}

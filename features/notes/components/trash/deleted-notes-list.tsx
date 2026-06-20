import { db } from '@/db'
import { notes } from '@/db/schema'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq } from 'drizzle-orm'
import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'

type Props = {
  userId: string
  currentPage: number
}

export async function DeletedNotesList({ userId, currentPage }: Props) {
  const [deletedNotes, [{ total }]] = await Promise.all([
    db.query.notes.findMany({
      with: {
        noteTags: {
          with: {
            tag: true,
          },
        },
      },
      where: and(eq(notes.userId, userId), eq(notes.isDeleted, true)),
      orderBy: desc(notes.updatedAt),
      limit: NOTES_PER_PAGE,
      offset: (currentPage - 1) * NOTES_PER_PAGE,
    }),
    db
      .select({ total: count() })
      .from(notes)
      .where(and(eq(notes.userId, userId), eq(notes.isDeleted, true))),
  ])

  const totalPages = Math.ceil(total / NOTES_PER_PAGE)

  if (totalPages === 0) {
    return (
      <div className='flex flex-col items-center justify-center text-center gap-4 grow opacity-80'>
        <Trash2Icon className='size-16 text-muted-foreground' />

        <h2 className='text-xl sm:text-2xl mb-2 font-medium text-muted-foreground'>
          No deleted notes
        </h2>
      </div>
    )
  }

  if (currentPage > totalPages) {
    redirect(`/trash?page=${totalPages}`)
  }

  return (
    <div className='flex flex-col gap-4 grow justify-between'>
      <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {deletedNotes.map((note) => (
          <NotesItem key={note.id} note={note} />
        ))}
      </ul>

      <NotesPagination totalPages={totalPages} />
    </div>
  )
}

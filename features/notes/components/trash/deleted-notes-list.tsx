import { db } from '@/db'
import { notes } from '@/db/schema'
import { NotesItem } from '@/features/notes/components/dashboard/notes-item'
import { NotesPagination } from '@/features/notes/components/dashboard/notes-pagination'
import { NotesSearch } from '@/features/notes/components/dashboard/notes-search'
import { NOTES_PER_PAGE } from '@/lib/utils'
import { and, count, desc, eq, ilike, or } from 'drizzle-orm'
import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'

type Props = {
  userId: string
  query?: string
  currentPage: number
}

export async function DeletedNotesList({ userId, currentPage, query }: Props) {
  const whereClause = and(
    eq(notes.userId, userId),
    eq(notes.isDeleted, true),
    query?.trim()
      ? or(ilike(notes.title, `%${query}%`), ilike(notes.content, `%${query}%`))
      : undefined,
  )

  const [deletedNotes, [{ total }]] = await Promise.all([
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
    redirect(`/trash?page=${totalPages}`)
  }

  return (
    <div className='flex flex-col gap-8 grow mt-8'>
      <NotesSearch count={total} />

      {deletedNotes.length ? (
        <ul className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {deletedNotes.map((note) => (
            <NotesItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <div className='flex flex-col items-center justify-center text-center gap-4 grow opacity-80'>
          <Trash2Icon className='size-16 text-muted-foreground' />

          <h2 className='text-xl sm:text-2xl mb-2 font-medium text-muted-foreground'>
            {query ? (
              <span>No deleted notes found matching "{query}"</span>
            ) : (
              <span>No deleted notes</span>
            )}
          </h2>
        </div>
      )}

      {totalPages > 0 && (
        <div className='mt-auto'>
          <NotesPagination totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

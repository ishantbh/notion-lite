import { Badge } from '@/components/ui/badge'
import { db } from '@/db'
import { notes } from '@/db/schema'
import { EditNoteDialog } from '@/features/notes/components/edit-note-dialog'
import { MoveToTrashConfirmationDialog } from '@/features/notes/components/move-to-trash-confirmation-dialog'
import { NoteDeleteConfirmationDialog } from '@/features/notes/components/note-delete-confirmation-dialog'
import { RestoreDeletedNoteConfirmationDialog } from '@/features/notes/components/restore-deleted-note-confirmation-dialog'
import { auth } from '@/lib/auth'
import { formatDate } from 'date-fns'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { id: userId } = session.user

  const { noteId } = await params

  const note = await db.query.notes.findFirst({
    where: and(eq(notes.id, noteId), eq(notes.userId, userId)),
    with: {
      user: {
        columns: {
          name: true,
        },
      },
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
  })

  if (!note) {
    notFound()
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col'>
      <div className='flex items-start gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold flex items-center gap-2'>
            <span>{note.title}</span>
            {note.isDeleted && <Badge variant='destructive'>Deleted</Badge>}
          </h1>
          <p className='text-sm'>By {note.user.name}</p>
          <p className='text-sm text-muted-foreground'>
            Created:{' '}
            <span className='font-semibold'>
              {formatDate(note.updatedAt, 'dd MMM yyyy')}
            </span>
          </p>
          <p className='text-sm text-muted-foreground'>
            Last updated:{' '}
            <span className='font-semibold'>
              {formatDate(note.updatedAt, 'dd MMM yyyy')}
            </span>
          </p>
          <div className='flex flex-wrap items-center gap-2 mt-2'>
            {note.noteTags.map(({ tag }) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
        </div>

        {note.isDeleted ? (
          <div className='flex items-center gap-2'>
            <RestoreDeletedNoteConfirmationDialog noteId={note.id} />
            <NoteDeleteConfirmationDialog noteId={note.id} />
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <EditNoteDialog note={note} />
            <MoveToTrashConfirmationDialog noteId={note.id} />
          </div>
        )}
      </div>

      <div className='mt-6 text-lg'>
        {note.content ? (
          <p>{note.content}</p>
        ) : (
          <p className='italic text-muted-foreground'>No content</p>
        )}
      </div>
    </div>
  )
}

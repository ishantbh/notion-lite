import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { notes } from '@/db/schema'
import { NoteDeleteConfirmationDialog } from '@/features/notes/components/note-delete-confirmation-dialog'
import { auth } from '@/lib/auth'
import { formatDate } from 'date-fns'
import { and, eq } from 'drizzle-orm'
import { PencilIcon, Trash2Icon } from 'lucide-react'
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
    },
  })

  if (!note) {
    notFound()
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col'>
      <div className='flex items-start gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold'>{note.title}</h1>
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
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            title='Edit'
            className='flex items-center gap-2'
          >
            <PencilIcon />
            <span className='sr-only sm:not-sr-only'>Edit</span>
          </Button>

          <NoteDeleteConfirmationDialog noteId={note.id} />
        </div>
      </div>

      <div className='mt-6 text-lg'>
        <p>{note.content}</p>
      </div>
    </div>
  )
}

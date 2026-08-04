import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoveToTrashConfirmationDialog } from '@/features/notes/components/move-to-trash-confirmation-dialog'
import { NoteDeleteConfirmationDialog } from '@/features/notes/components/note-delete-confirmation-dialog'
import { NotesItemStarButton } from '@/features/notes/components/notes-item-star-button'
import { RestoreDeletedNoteConfirmationDialog } from '@/features/notes/components/restore-deleted-note-confirmation-dialog'
import { getNoteByIdWithUserNameAndTags } from '@/features/notes/data/get-note-by-id-with-user-name-and-tags'
import { extensions } from '@/features/notes/utils'
import { auth } from '@/lib/auth'
import { renderToReactElement } from '@tiptap/static-renderer'
import { formatDate } from 'date-fns'
import { PencilIcon } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
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

  const note = await getNoteByIdWithUserNameAndTags({ noteId, userId })

  if (!note) {
    notFound()
  }

  return (
    <div className='flex flex-col grow'>
      <HeaderWithSidebar title='Note Details' showSearch={false} />

      <main className='w-full max-w-4xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col'>
        <div className='flex items-start gap-4 justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl sm:text-2xl font-semibold flex items-center gap-2'>
                <span>{note.title}</span>
                {note.isDeleted && <Badge variant='destructive'>Deleted</Badge>}
              </h1>

              <NotesItemStarButton
                noteId={note.id}
                isStarred={note.isStarred}
                size='lg'
              />
            </div>
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
              <Button
                variant='outline'
                title='Edit'
                className='flex items-center gap-2'
                asChild
              >
                <Link href={`/notes/${note.id}/edit`}>
                  <PencilIcon />
                  <span className='sr-only sm:not-sr-only'>Edit</span>
                </Link>
              </Button>

              <MoveToTrashConfirmationDialog noteId={note.id} />
            </div>
          )}
        </div>

        <div className='mt-6 text-lg prose dark:prose-invert'>
          {note.content ? (
            // <p>{note.contentText}</p>
            renderToReactElement({
              content: note.content,
              extensions: extensions,
            })
          ) : (
            <p className='italic text-muted-foreground'>No content</p>
          )}
        </div>
      </main>
    </div>
  )
}

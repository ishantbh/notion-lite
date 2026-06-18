import { CreateEditNoteForm } from '@/features/notes/components/create-edit-note-form'
import { getNoteByIdWithUserNameAndTags } from '@/features/notes/data/get-note-by-id-with-user-name-and-tags'
import { auth } from '@/lib/auth'
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
    return redirect('/login')
  }

  const { id: userId } = session.user

  const { noteId } = await params

  const note = await getNoteByIdWithUserNameAndTags({ noteId, userId })

  if (!note) {
    notFound()
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='space-y-1'>
          <h1 className='text-xl sm:text-2xl font-semibold'>Edit Note</h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            Edit your existing note
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <CreateEditNoteForm note={note} />
      </div>
    </div>
  )
}

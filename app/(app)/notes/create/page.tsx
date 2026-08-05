import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { CreateEditNoteForm } from '@/features/notes/components/create-edit-note-form'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'New note',
}

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  return (
    <div className='flex flex-col grow'>
      <HeaderWithSidebar title='Create Note' showSearch={false} />

      <main className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col grow'>
        <div className='flex items-center gap-4 justify-between'>
          <div className='space-y-1'>
            <h1 className='text-xl sm:text-2xl font-semibold'>Create Note</h1>
            <p className='text-sm sm:text-base text-muted-foreground'>
              Create a new note
            </p>
          </div>
        </div>

        <div className='mt-6'>
          <CreateEditNoteForm />
        </div>
      </main>
    </div>
  )
}

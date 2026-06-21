import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/login')
  }

  return (
    <div className='flex flex-col grow'>
      <HeaderWithSidebar title='Settings' showSearch={false} />

      <main className='w-full max-w-7xl mx-auto px-4 flex flex-col grow'></main>
    </div>
  )
}

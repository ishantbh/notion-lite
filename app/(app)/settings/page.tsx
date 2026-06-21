import { HeaderWithSidebar } from '@/components/header-with-sidebar'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'
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

      <main className='w-full max-w-3xl mx-auto px-4 flex flex-col grow'>
        <div className='flex flex-col w-full mt-8'>
          <div className='flex items-center justify-between gap-4 w-full px-4'>
            <h2 className='text-lg font-semibold'>Theme</h2>
            <ThemeToggle />
          </div>

          <Separator className='my-4' />
        </div>
      </main>
    </div>
  )
}

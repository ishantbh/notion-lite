import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { LogOutIcon } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAuthenticated = !!session

  return (
    <header className='border-b'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between gap-4'>
          <Link href='/' className='block text-lg sm:text-xl font-semibold'>
            Notion Lite
          </Link>

          <nav>
            <ul className='flex items-center gap-2'>
              {isAuthenticated ? (
                <>
                  <li>
                    <Button variant='link' asChild>
                      <Link href='/dashboard'>Dashboard</Link>
                    </Button>
                  </li>

                  <li>
                    <ThemeToggle />
                  </li>

                  <li>
                    <Button variant='destructive' size='icon'>
                      <LogOutIcon className='size-4' />
                      <span className='sr-only'>Logout</span>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button asChild>
                      <Link href='/login'>Login</Link>
                    </Button>
                  </li>

                  <li className='hidden sm:block'>
                    <Button variant='secondary' asChild>
                      <Link href='/sign-up'>Sign Up</Link>
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

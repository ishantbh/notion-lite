'use client'

import { LogoutButton } from '@/components/logout-button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/auth-client'
import Link from 'next/link'

export function Header() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <header className='border-b'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between gap-4'>
          <Link href='/' className='block text-lg sm:text-xl font-semibold'>
            Notion Lite
          </Link>

          <nav>
            <ul className='flex items-center gap-2'>
              {!isPending &&
                (session ? (
                  <>
                    <li>
                      <Button variant='link' asChild>
                        <Link href='/dashboard'>Dashboard</Link>
                      </Button>
                    </li>

                    <li>
                      <LogoutButton />
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
                ))}

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { auth } from '@/lib/auth'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Reset Password',
}

type Props = {
  searchParams: Promise<{ token: string }>
}

export default async function Page({ searchParams }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/dashboard')
  }

  const { token } = await searchParams

  if (!token) {
    redirect('/login')
  }

  return (
    <div className='flex flex-col items-center justify-center w-full grow p-4 sm:px-6 lg:px-8'>
      <Link href='/' className='text-xl sm:text-2xl font-semibold mb-6'>
        Notion Lite
      </Link>

      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Reset Password</CardTitle>
            <CardDescription>Enter new password</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

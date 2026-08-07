import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center w-full grow p-4 sm:px-6 lg:px-8'>
      <Link href='/' className='text-xl sm:text-2xl font-semibold mb-6'>
        Notion Lite
      </Link>

      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Forgot Password</CardTitle>
            <CardDescription>
              Enter the email associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

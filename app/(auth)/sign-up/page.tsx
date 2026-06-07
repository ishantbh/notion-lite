import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { SignUpForm } from '@/features/auth/components/sign-up-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div className='flex items-center justify-center w-full grow p-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Hey There!</CardTitle>
            <CardDescription>
              Enter your name, email, and password to sign up.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

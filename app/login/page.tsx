import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { LoginForm } from '@/features/auth/components/login-form'

export default function Page() {
  return (
    <div className='flex items-center justify-center w-full grow p-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Welcome back</CardTitle>
            <CardDescription>
              Enter your email and password to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

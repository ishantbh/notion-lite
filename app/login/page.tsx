import { LoginForm } from '@/features/auth/login-form'

export default function Page() {
  return (
    <div className='flex items-center justify-center w-full grow p-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}

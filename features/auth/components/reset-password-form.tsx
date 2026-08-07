'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '../schemas/reset-password-schema'
import { authClient } from '@/lib/auth/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  token: string
}

export function ResetPasswordForm({ token }: Props) {
  const router = useRouter()

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: ResetPasswordSchema) {
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success('Password reset successfully')
          router.push('/login')
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input
                {...field}
                id='password'
                type='password'
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='confirmPassword'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='confirm-password'>
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id='confirm-password'
                type='password'
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className='size-4 animate-spin' />}
            <span>Reset Password</span>
          </Button>

          <FieldDescription className='text-center'>
            Go back to <Link href='/login'>Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

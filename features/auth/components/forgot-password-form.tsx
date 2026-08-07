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
import { authClient } from '@/lib/auth/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const forgotPasswordFormSchema = z.object({
  email: z.email(),
})

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: '/reset-password',
      },
      {
        onSuccess: () => {
          toast.success('Password reset email sent successfully')
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
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                {...field}
                id='email'
                type='email'
                aria-invalid={fieldState.invalid}
                placeholder='m@example.com'
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

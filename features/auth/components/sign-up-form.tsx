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
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  signUpSchema,
  type SignUpSchema,
} from '@/features/auth/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { authClient } from '@/lib/auth/auth-client'
import { toast } from 'sonner'

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: SignUpSchema) {
    await authClient.signUp.email(
      {
        ...values,
        callbackURL: '/dashboard',
      },
      {
        onSuccess: () => {
          toast.success('Sign up successful')
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
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                {...field}
                id='name'
                aria-invalid={fieldState.invalid}
                placeholder='John Doe'
                disabled={isSubmitting}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className='size-4 animate-spin' />}
            <span>Sign Up</span>
          </Button>
          <FieldDescription className='text-center'>
            Already have an account? <Link href='/login'>Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

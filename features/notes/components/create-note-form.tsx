'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  type CreateNoteSchema,
  createNoteSchema,
} from '@/features/notes/schemas/create-note-schema'
import { createNote } from '@/features/notes/server/create-note'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  close: () => void
}

export function CreateNoteForm({ close }: Props) {
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
      content: undefined,
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: CreateNoteSchema) {
    const res = await createNote(data)

    if (res?.error) {
      toast.error(res.error)
      return
    }

    toast.success('Note created successfully')

    close()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='title'>Title</FieldLabel>
              <Input
                {...field}
                id='title'
                aria-invalid={fieldState.invalid}
                placeholder='My Awesome Note'
                disabled={isSubmitting}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='content'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='content'>Content</FieldLabel>
              <Textarea
                {...field}
                id='content'
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className='size-4 animate-spin' />}
            <span>Save</span>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

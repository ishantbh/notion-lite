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
import { Note } from '@/db/types'
import { RichTextEditor } from '@/features/notes/components/rich-text-editor'
import {
  type CreateEditNoteSchema,
  createEditNoteSchema,
} from '@/features/notes/schemas/create-edit-note-schema'
import { createNote } from '@/features/notes/server/create-note'
import { updateNote } from '@/features/notes/server/update-note'
import { TagPicker } from '@/features/tags/components/tag-picker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  note?: Note & { noteTags: { tagId: string }[] }
}

export function CreateEditNoteForm({ note }: Props) {
  const form = useForm<CreateEditNoteSchema>({
    resolver: zodResolver(createEditNoteSchema),
    defaultValues: {
      title: note?.title ?? '',
      content: note?.content ?? undefined,
      tags: note?.noteTags.map((tag) => tag.tagId) ?? [],
    },
  })

  const router = useRouter()

  const queryClient = useQueryClient()

  const { isSubmitting } = form.formState

  async function onSubmit(data: CreateEditNoteSchema) {
    if (note) {
      // Update note
      const res = await updateNote(note.id, data)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success('Note updated successfully')
      router.replace(`/notes/${res.noteId}`)
    } else {
      // Create new note
      const res = await createNote(data)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      queryClient.invalidateQueries({ queryKey: ['tags'] })
      toast.success('Note created successfully')
      router.replace(`/notes/${res.noteId}`)
    }
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
          name='tags'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='tags'>Tags</FieldLabel>
              <TagPicker {...field} id='tags' disabled={isSubmitting} />
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
              <RichTextEditor />
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

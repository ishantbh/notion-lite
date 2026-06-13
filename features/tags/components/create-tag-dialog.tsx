'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCreateTag } from '@/features/tags/hooks/use-create-tag'
import {
  createTagSchema,
  type CreateTagSchema,
} from '@/features/tags/schemas/create-tag-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  children: React.ReactNode
}

export function CreateTagDialog({ children }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: '',
    },
  })

  const { mutate: createTag, isPending } = useCreateTag()

  function onSubmit(data: CreateTagSchema) {
    createTag(data, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
          <DialogDescription>Create a new tag</DialogDescription>
        </DialogHeader>

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
                    placeholder='Work'
                    disabled={isPending}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation='horizontal'>
              <Button
                type='button'
                variant='outline'
                onClick={() => form.reset()}
              >
                Reset
              </Button>

              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2Icon className='size-4 animate-spin' />}
                <span>Save</span>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

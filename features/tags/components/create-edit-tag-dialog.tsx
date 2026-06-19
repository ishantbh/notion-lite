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
import { useUpdateTag } from '@/features/tags/hooks/use-update-tag'
import {
  createEditTagSchema,
  type CreateEditTagSchema,
} from '@/features/tags/schemas/create-edit-tag-schema'
import { TagListItem } from '@/features/tags/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  children: React.ReactNode
  tag?: TagListItem
}

export function CreateEditTagDialog({ children, tag }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateEditTagSchema>({
    resolver: zodResolver(createEditTagSchema),
    defaultValues: {
      name: tag?.name ?? '',
    },
  })

  const { mutateAsync: createTag, isPending: isCreatePending } = useCreateTag()
  const { mutateAsync: updateTag, isPending: isUpdatePending } = useUpdateTag()

  const isPending = isCreatePending || isUpdatePending

  async function onSubmit(data: CreateEditTagSchema) {
    try {
      if (tag) {
        await updateTag({ ...data, tagId: tag.id })
        toast.success('Tag updated successfully')
      } else {
        await createTag(data)
        toast.success('Tag created successfully')
      }

      setOpen(false)
      form.reset()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    }
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

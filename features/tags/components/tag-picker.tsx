import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateTag } from '@/features/tags/hooks/use-create-tag'
import { useTags } from '@/features/tags/hooks/use-tags'
import type { CreateEditTagSchema } from '@/features/tags/schemas/create-edit-tag-schema'
import type { TagListItem, TagPickerItem } from '@/features/tags/types'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  id: string
  disabled?: boolean
  name: string
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange: (value: string[]) => void
  ref: React.ForwardedRef<HTMLInputElement>
  value: string[]
}

export function TagPicker({
  id,
  disabled,
  name,
  onBlur,
  onChange,
  ref,
  value,
}: Props) {
  const anchor = useComboboxAnchor()

  const [query, setQuery] = useState('')

  const { data, isLoading } = useTags()
  const createTagMutation = useCreateTag()

  if (isLoading) {
    return <Skeleton className='w-full h-8' />
  }

  function tagExists(name: string) {
    return tags.some(
      (t) => t.name.trim().toLowerCase() === name.trim().toLowerCase(),
    )
  }

  function getTagsForView(): TagPickerItem[] {
    if (!trimmed || tagExists(trimmed)) return tags

    return [
      ...tags,
      {
        creatable: trimmed,
        id: `create:${lowered}`,
        name: `Create "${trimmed}"`,
      },
    ]
  }

  async function handleValueChange(selectedTags: TagPickerItem[]) {
    const next = selectedTags
      .filter((tag) => !tag.creatable)
      .map((tag) => tag.id)

    const creatableSelection = selectedTags.find((tag) => tag.creatable)

    if (creatableSelection?.creatable) {
      const newTagData: CreateEditTagSchema = {
        name: creatableSelection.creatable,
      }

      try {
        const newTagId = await createTagMutation.mutateAsync(newTagData)
        onChange([...next, newTagId])
        setQuery('')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error creating tag')
      }

      return
    }

    onChange(next)

    setQuery('')
  }

  const tags: TagPickerItem[] = data?.tags ?? []
  const tagsMap = new Map(tags.map((tag) => [tag.id, tag]))

  const trimmed = query.trim()
  const lowered = trimmed.toLowerCase()

  const tagsForView = getTagsForView()

  const selected = value
    .map((id) => tagsMap.get(id))
    .filter((tag) => tag !== undefined)

  return (
    <Combobox
      items={tagsForView}
      multiple
      value={selected}
      onValueChange={handleValueChange}
      inputValue={query}
      onInputValueChange={setQuery}
      autoHighlight
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(selectedTags: TagListItem[]) => (
            <React.Fragment>
              {selectedTags.map((tag) => (
                <ComboboxChip key={tag.id} aria-label={tag.name}>
                  {tag.name}
                </ComboboxChip>
              ))}

              <ComboboxChipsInput
                id={id}
                disabled={disabled}
                onBlur={onBlur}
                name={name}
                ref={ref}
                placeholder='Add tags'
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No matching tags found.</ComboboxEmpty>

        <ComboboxList>
          {(tag: TagPickerItem) => (
            <ComboboxItem key={tag.id} value={tag}>
              {tag.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

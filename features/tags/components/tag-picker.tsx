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
import { useTags } from '@/features/tags/hooks/use-tags'
import type { TagListItem } from '@/features/tags/types'
import React, { useState } from 'react'

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

  if (isLoading) {
    return <Skeleton className='w-full h-8' />
  }

  const tags = data?.tags ?? []

  const tagsMap = new Map(tags.map((tag) => [tag.id, tag]))

  const selected = value
    .map((id) => tagsMap.get(id))
    .filter((tag) => tag !== undefined)

  return (
    <Combobox
      items={tags}
      multiple
      value={selected}
      onValueChange={(next) => {
        onChange(next.map((tag) => tag.id))
      }}
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
          {(tag: TagListItem) => (
            <ComboboxItem key={tag.id} value={tag}>
              {tag.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

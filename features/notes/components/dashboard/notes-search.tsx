'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export function NotesSearch({ count }: { count?: number }) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <InputGroup className='w-full mx-auto border border-border'>
      <InputGroupInput
        defaultValue={searchParams.get('query')?.toString()}
        placeholder='Search...'
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        className='text-sm'
      />
      <InputGroupAddon>
        <SearchIcon className='size-4' />
      </InputGroupAddon>
      {count !== undefined && (
        <InputGroupAddon align='inline-end' className='text-sm'>
          {count} {count === 1 ? 'result' : 'results'}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

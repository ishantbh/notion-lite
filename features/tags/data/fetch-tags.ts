import type { GetTagsResponse } from '@/features/notes/types'

export async function fetchTags(): Promise<GetTagsResponse> {
  const res = await fetch('/api/tags')

  if (!res.ok) {
    throw new Error('Failed to fetch tags')
  }

  return res.json()
}

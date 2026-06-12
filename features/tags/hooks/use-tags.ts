import { fetchTags } from '@/features/tags/data/fetch-tags'
import { useQuery } from '@tanstack/react-query'

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  })
}

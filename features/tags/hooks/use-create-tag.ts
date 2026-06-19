import { createTag } from '@/features/tags/server/create-tag'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

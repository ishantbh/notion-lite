import { updateTag } from '@/features/tags/server/update-tag'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTag,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

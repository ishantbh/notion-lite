import { updateTag } from '@/features/tags/server/update-tag'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTag,
    onSuccess: async () => {
      toast.success('Tag updated successfully')

      await queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

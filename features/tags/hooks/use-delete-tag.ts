import { deleteTag } from '@/features/tags/server/delete-tag'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: async () => {
      toast.success('Tag deleted successfully')

      await queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

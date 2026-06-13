import z from 'zod'

export const createEditTagSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type CreateEditTagSchema = z.infer<typeof createEditTagSchema>

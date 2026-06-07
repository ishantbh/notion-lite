import z from 'zod'

export const createEditNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
})

export type CreateEditNoteSchema = z.infer<typeof createEditNoteSchema>

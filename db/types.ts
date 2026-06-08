import { notes, tags } from '@/db/schema'

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert

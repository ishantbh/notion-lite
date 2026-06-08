import { notes } from '@/db/schema/note'
import { tags } from '@/db/schema/tag'
import { relations } from 'drizzle-orm'
import { index, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

export const NoteTags = pgTable(
  'note_tags',
  {
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({
      columns: [table.noteId, table.tagId],
    }),
    index('note_tags_tagId_idx').on(table.tagId),
  ],
)

export const noteTagsRelations = relations(NoteTags, ({ one }) => ({
  note: one(notes, {
    fields: [NoteTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [NoteTags.tagId],
    references: [tags.id],
  }),
}))

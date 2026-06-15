import { user } from '@/db/schema/auth'
import { noteTags } from '@/db/schema/note-tag'
import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const notes = pgTable(
  'notes',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    title: varchar({ length: 255 }).notNull(),
    content: text('content'),
    isDeleted: boolean('is_deleted').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('notes_userId_updatedAt_idx').on(table.userId, table.updatedAt),
    index('notes_deleted_idx').on(table.isDeleted),
  ],
)

export const notesRelations = relations(notes, ({ one, many }) => ({
  user: one(user, {
    fields: [notes.userId],
    references: [user.id],
  }),

  noteTags: many(noteTags),
}))

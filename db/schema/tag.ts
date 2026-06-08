import { user } from '@/db/schema/auth'
import { relations } from 'drizzle-orm'
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const tags = pgTable(
  'tags',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: varchar({ length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('tags_userId_idx').on(table.userId)],
)

export const tagsRelations = relations(tags, ({ one }) => ({
  user: one(user, {
    fields: [tags.userId],
    references: [user.id],
  }),
}))

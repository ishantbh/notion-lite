import { db } from '@/db'
import { noteTags, tags } from '@/db/schema'
import { count, eq } from 'drizzle-orm'

export async function getTagsWithCounts(userId: string) {
  return db
    .select({
      id: tags.id,
      name: tags.name,
      notesCount: count(noteTags.noteId),
    })
    .from(tags)
    .leftJoin(noteTags, eq(tags.id, noteTags.tagId))
    .where(eq(tags.userId, userId))
    .groupBy(tags.id, tags.name)
    .orderBy(tags.name)
}

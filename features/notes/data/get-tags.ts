import { db } from '@/db'
import { tags } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getTags(userId: string) {
  return db.query.tags.findMany({
    where: eq(tags.userId, userId),
  })
}

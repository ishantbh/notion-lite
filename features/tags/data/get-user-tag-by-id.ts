import { db } from '@/db'
import { tags } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUserTagById = cache(async function ({
  tagId,
  userId,
}: {
  tagId: string
  userId: string
}) {
  return await db.query.tags.findFirst({
    where: and(eq(tags.id, tagId), eq(tags.userId, userId)),
  })
})

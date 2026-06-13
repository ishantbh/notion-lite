'use server'

import { db } from '@/db'
import { tags } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function deleteTag(tagId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const { id: userId } = session.user

  await db.delete(tags).where(and(eq(tags.id, tagId), eq(tags.userId, userId)))
}

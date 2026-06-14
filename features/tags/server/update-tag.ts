'use server'

import { db } from '@/db'
import { tags } from '@/db/schema'
import {
  createEditTagSchema,
  type CreateEditTagSchema,
} from '@/features/tags/schemas/create-edit-tag-schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function updateTag(data: CreateEditTagSchema & { tagId: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const { id: userId } = session.user

  const existing = await db.query.tags.findFirst({
    where: and(eq(tags.id, data.tagId), eq(tags.userId, userId)),
  })

  if (!existing) {
    throw new Error('Tag not found')
  }

  const parsed = createEditTagSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error('Invalid data')
  }

  const { name } = parsed.data

  await db
    .update(tags)
    .set({ name })
    .where(and(eq(tags.id, data.tagId), eq(tags.userId, userId)))
}

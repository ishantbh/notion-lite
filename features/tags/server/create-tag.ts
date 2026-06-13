'use server'

import { db } from '@/db'
import { tags } from '@/db/schema'
import {
  createTagSchema,
  type CreateTagSchema,
} from '@/features/tags/schemas/create-tag-schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function createTag(data: CreateTagSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const { id: userId } = session.user

  const parsed = createTagSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error('Invalid data')
  }

  const { name } = parsed.data

  await db.insert(tags).values({ name, userId })
}

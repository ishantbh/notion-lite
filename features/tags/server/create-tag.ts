'use server'

import { db } from '@/db'
import { tags } from '@/db/schema'
import {
  createEditTagSchema,
  type CreateEditTagSchema,
} from '@/features/tags/schemas/create-edit-tag-schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function createTag(data: CreateEditTagSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const { id: userId } = session.user

  const parsed = createEditTagSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error('Invalid data')
  }

  const { name } = parsed.data

  await db.insert(tags).values({ name, userId })
}

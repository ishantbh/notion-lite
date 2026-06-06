'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'
import {
  createNoteSchema,
  type CreateNoteSchema,
} from '@/features/notes/schemas/create-note-schema'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function createNote(data: CreateNoteSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const { id: userId } = session.user

  const parsed = createNoteSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid inputs' }
  }

  const { title, content } = parsed.data

  await db.insert(notes).values({ userId, title, content })

  revalidatePath('/dashboard')
}

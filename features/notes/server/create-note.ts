'use server'

import { db } from '@/db'
import { notes, noteTags } from '@/db/schema'
import {
  createEditNoteSchema,
  type CreateEditNoteSchema,
} from '@/features/notes/schemas/create-edit-note-schema'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function createNote(data: CreateEditNoteSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const { id: userId } = session.user

  const parsed = createEditNoteSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid inputs' }
  }

  const { title, content, tags } = parsed.data

  const [insertedNote] = await db
    .insert(notes)
    .values({ userId, title, content })
    .returning({
      id: notes.id,
    })

  if (tags.length) {
    await db
      .insert(noteTags)
      .values(tags.map((tag) => ({ noteId: insertedNote.id, tagId: tag })))
  }

  revalidatePath('/dashboard')
}

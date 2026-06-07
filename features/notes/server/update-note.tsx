'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'
import {
  createEditNoteSchema,
  type CreateEditNoteSchema,
} from '@/features/notes/schemas/create-edit-note-schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function updateNote(noteId: string, data: CreateEditNoteSchema) {
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

  const { title, content } = parsed.data

  await db
    .update(notes)
    .set({ userId, title, content })
    .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))

  revalidatePath(`/notes/${noteId}`)
}

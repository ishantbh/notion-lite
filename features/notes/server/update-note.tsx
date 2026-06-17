'use server'

import { db } from '@/db'
import { notes, noteTags } from '@/db/schema'
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

  const { title, content, tags } = parsed.data

  await Promise.all([
    db
      .update(notes)
      .set({ title, content })
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning({
        id: notes.id,
      }),

    db.delete(noteTags).where(eq(noteTags.noteId, noteId)),
  ])

  if (tags.length) {
    await db
      .insert(noteTags)
      .values(tags.map((tag) => ({ noteId, tagId: tag })))
  }

  revalidatePath(`/notes/${noteId}`)
}

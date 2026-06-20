'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function updateNoteStarred({
  noteId,
  isStarred,
}: {
  noteId: string
  isStarred: boolean
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const { id: userId } = session.user

  await db
    .update(notes)
    .set({ isStarred })
    .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))

  revalidatePath('/dashboard')
  revalidatePath(`/notes/${noteId}`)
}

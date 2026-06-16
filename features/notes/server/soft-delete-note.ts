'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function softDeleteNote({
  noteId,
  isDeleted,
}: {
  noteId: string
  isDeleted: boolean
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
    .set({ isDeleted })
    .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))

  revalidatePath(`/notes/${noteId}`)
}

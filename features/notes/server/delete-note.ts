'use server'

import { db } from '@/db'
import { notes } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteNote(noteId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return { error: 'Unauthorized' }
  }

  const { id: userId } = session.user

  await db
    .delete(notes)
    .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))

  redirect('/dashboard')
}

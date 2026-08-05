import { db } from '@/db'
import { notes } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { cache } from 'react'

export const getNoteByIdWithUserNameAndTags = cache(async function ({
  noteId,
  userId,
}: {
  noteId: string
  userId: string
}) {
  return db.query.notes.findFirst({
    where: and(eq(notes.id, noteId), eq(notes.userId, userId)),
    with: {
      user: {
        columns: {
          name: true,
        },
      },
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
  })
})

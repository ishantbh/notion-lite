import { db } from '@/db'
import { notes } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { noteId } = await params

  const note = await db.query.notes.findFirst({
    where: eq(notes.id, noteId),
  })

  if (!note) {
    notFound()
  }

  return <div>{note.title}</div>
}

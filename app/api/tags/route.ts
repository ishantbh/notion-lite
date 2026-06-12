import { db } from '@/db'
import { tags } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userTags = await db.query.tags.findMany({
    where: eq(tags.userId, session.user.id),
  })

  return Response.json({ tags: userTags })
}

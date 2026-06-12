import { getTags } from '@/features/notes/data/get-tags'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userTags = await getTags(session.user.id)

  return Response.json({ tags: userTags })
}

import { getTagsWithCounts } from '@/features/notes/data/get-tags-with-counts'
import type { GetTagsResponse } from '@/features/notes/types'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userTags = await getTagsWithCounts(session.user.id)

  return Response.json({ tags: userTags } satisfies GetTagsResponse)
}

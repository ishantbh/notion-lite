import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Note } from '@/db/types'
import { formatDate } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  note: Note
}

export function NotesItem({ note }: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Button variant='link' className='p-0 text-base' asChild>
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </Button>
            {note.isDeleted && <Badge variant='destructive'>Deleted</Badge>}
          </CardTitle>
          <CardDescription className='text-sm opacity-80'>
            Last updated {formatDate(note.updatedAt)}
          </CardDescription>
          <CardAction>
            <Button variant='ghost' size='icon' asChild>
              <Link href={`/notes/${note.id}`}>
                <ExternalLinkIcon />
                <span className='sr-only'>Open</span>
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='text-muted-foreground line-clamp-2'>
          {note.content || (
            <span className='opacity-80 italic'>No content</span>
          )}
        </CardContent>
      </Card>
    </li>
  )
}

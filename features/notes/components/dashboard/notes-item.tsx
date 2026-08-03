import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Note, Tag } from '@/db/types'
import { NotesItemStarButton } from '@/features/notes/components/notes-item-star-button'
import { formatDate } from '@/lib/utils'
import { ExternalLinkIcon, StarIcon, StarOffIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  note: Note & { noteTags: { tag: Tag }[] }
}

export function NotesItem({ note }: Props) {
  return (
    <li>
      <Card className='h-full'>
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
            <NotesItemStarButton noteId={note.id} isStarred={note.isStarred} />

            <Button variant='ghost' size='icon' asChild>
              <Link href={`/notes/${note.id}`}>
                <ExternalLinkIcon />
                <span className='sr-only'>Open</span>
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='text-muted-foreground line-clamp-2'>
          {note.contentText || (
            <span className='opacity-80 italic'>No content</span>
          )}
        </CardContent>

        {note.noteTags.length > 0 && (
          <CardFooter>
            <div className='flex flex-wrap items-center gap-2'>
              {note.noteTags.map(({ tag }) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </li>
  )
}

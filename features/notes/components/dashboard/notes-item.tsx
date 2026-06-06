import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Note } from '@/db/types'
import { formatDate } from '@/lib/utils'

type Props = {
  note: Note
}

export function NotesItem({ note }: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription className='text-sm opacity-80'>
            Last updated {formatDate(note.updatedAt)}
          </CardDescription>
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

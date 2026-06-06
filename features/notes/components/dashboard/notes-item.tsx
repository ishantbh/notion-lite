import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Note } from '@/db/types'

type Props = {
  note: Note
}

export function NotesItem({ note }: Props) {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {note.updatedAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className='text-muted-foreground line-clamp-2'>
          {note.content}
        </CardContent>
      </Card>
    </li>
  )
}

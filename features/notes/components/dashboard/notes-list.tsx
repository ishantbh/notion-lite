import { Note } from '@/db/types'
import { EmptyNotesList } from '@/features/notes/components/dashboard/empty-notes-list'
import { NotesItem } from './notes-item'

type Props = {
  notes: Note[]
}

export function NotesList({ notes }: Props) {
  if (notes.length === 0) {
    return <EmptyNotesList />
  }

  return (
    <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {notes.map((note) => (
        <NotesItem key={note.id} note={note} />
      ))}
    </ul>
  )
}

import { NotesItemSkeleton } from './notes-item-skeleton'

export function NotesListSkeleton() {
  return (
    <ul className='mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 4 }, (_, i) => (
        <NotesItemSkeleton key={i} />
      ))}
    </ul>
  )
}

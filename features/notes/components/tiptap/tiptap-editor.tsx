'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Skeleton } from '@/components/ui/skeleton'

export default function TiptapEditor({
  value,
  onChange,
  disabled = false,
}: {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value ?? '',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getText())
    },
  })

  if (!editor) return <Skeleton className='w-full h-16' />

  return <EditorContent editor={editor} />
}

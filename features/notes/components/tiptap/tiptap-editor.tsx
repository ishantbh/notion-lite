'use client'

import { EditorContent, useEditor } from '@tiptap/react'

import { extensions } from '../../utils'
import { Skeleton } from '@/components/ui/skeleton'
import { MenuBar } from './menu-bar'

type TiptapEditorProps = {
  value?: any
  onChange: (value: any) => void
  disabled?: boolean
}

export default function TiptapEditor({
  value,
  onChange,
  disabled = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions,
    content: value ?? '',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  if (!editor) return <Skeleton className='w-full h-16' />

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

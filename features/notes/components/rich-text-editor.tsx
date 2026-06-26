'use client'

import { cn } from '@/lib/utils'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer'
import { RichTextExtension } from '@lexical/rich-text'
import { defineExtension } from 'lexical'

const extension = defineExtension({
  dependencies: [RichTextExtension],
  name: 'notes-editor',
  namespace: 'notes-editor',
})

type Props = {
  disabled?: boolean
}

export function RichTextEditor({ disabled = false }: Props) {
  return (
    <LexicalExtensionComposer extension={extension} contentEditable={null}>
      <div
        className={cn(
          'flex w-full flex-col overflow-hidden rounded-2xl border border-transparent focus-within:border-ring aria-invalid:border-destructive focus-within:ring-3 focus-within:ring-ring/30 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 bg-input/50 transition-[color,box-shadow] duration-200',
          { 'opacity-50': disabled },
        )}
      >
        <div className='relative'>
          <ContentEditable
            contentEditable={!disabled}
            className={cn(
              'h-55 overflow-y-auto px-2.5 py-2 text-base leading-relaxed text-wrap outline-none',
              { 'cursor-not-allowed': disabled },
            )}
            aria-label='Rich text editor'
            aria-placeholder='Enter some text...'
            placeholder={
              <div className='pointer-events-none absolute top-2 left-2.5 text-muted-foreground select-none'>
                Enter some text...
              </div>
            }
          />
        </div>
      </div>
    </LexicalExtensionComposer>
  )
}

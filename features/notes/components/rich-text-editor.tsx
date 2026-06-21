'use client'

import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer'
import { RichTextExtension } from '@lexical/rich-text'
import { defineExtension } from 'lexical'

const extension = defineExtension({
  dependencies: [RichTextExtension],
  name: 'notes-editor',
  namespace: 'notes-editor',
})

export function RichTextEditor() {
  return (
    <LexicalExtensionComposer extension={extension} contentEditable={null}>
      <div className='flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-black/10 dark:border-white/10 dark:bg-stone-800'>
        <div className='relative'>
          <ContentEditable
            className='h-55 overflow-y-auto p-4 text-base leading-relaxed text-wrap outline-none'
            aria-label='Rich text editor'
            aria-placeholder='Enter some text...'
            placeholder={
              <div className='pointer-events-none absolute top-4 left-4 text-zinc-400 select-none'>
                Enter some text...
              </div>
            }
          />
        </div>
      </div>
    </LexicalExtensionComposer>
  )
}

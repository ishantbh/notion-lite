'use client'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import {
  BoldIcon,
  Code2Icon,
  CodeSquareIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  TextIcon,
  UndoIcon,
  XIcon,
} from 'lucide-react'
import { menuBarStateSelector } from './menu-bar-state'

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle bold'
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
        disabled={!editorState.canBold}
      >
        <BoldIcon />
        <span>Bold</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle italic'
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
        disabled={!editorState.canItalic}
      >
        <ItalicIcon />
        <span>Italic</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle strike'
        pressed={editorState.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
        disabled={!editorState.canStrike}
      >
        <StrikethroughIcon />
        <span>Strike</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle code'
        pressed={editorState.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
        disabled={!editorState.canCode}
      >
        <Code2Icon />
        <span>Code</span>
      </Toggle>

      <Button
        type='button'
        variant='outline'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <XIcon />
        <span>Clear marks</span>
      </Button>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle paragraph'
        pressed={editorState.isParagraph}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <TextIcon />
        <span>Paragraph</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 1'
        pressed={editorState.isHeading1}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading1Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 2'
        pressed={editorState.isHeading2}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading2Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 3'
        pressed={editorState.isHeading3}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading3Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 4'
        pressed={editorState.isHeading4}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading4Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 5'
        pressed={editorState.isHeading5}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading5Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle heading 6'
        pressed={editorState.isHeading6}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <Heading6Icon className='size-5' />
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle bullet list'
        pressed={editorState.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <ListIcon />
        <span>Bullet list</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle ordered list'
        pressed={editorState.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <ListOrderedIcon />
        <span>Ordered list</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle code block'
        pressed={editorState.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <CodeSquareIcon />
        <span>Code block</span>
      </Toggle>

      <Toggle
        type='button'
        variant='outline'
        aria-label='Toggle blockquote'
        pressed={editorState.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className='aria-pressed:bg-primary aria-pressed:text-primary-foreground'
      >
        <QuoteIcon />
        <span>Blockquote</span>
      </Toggle>

      <Button
        type='button'
        variant='outline'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <span>Horizontal rule</span>
      </Button>

      <Button
        type='button'
        variant='outline'
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <span>Hard break</span>
      </Button>

      <Button
        type='button'
        variant='outline'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <UndoIcon />
        <span>Undo</span>
      </Button>

      <Button
        type='button'
        variant='outline'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <RedoIcon />
        <span>Redo</span>
      </Button>
    </div>
  )
}

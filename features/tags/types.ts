import { Tag } from '@/db/types'

export type TagItem = Pick<Tag, 'id' | 'name'>

export type TagListItem = TagItem & {
  notesCount: number
}

export type GetTagsResponse = {
  tags: TagListItem[]
}

export type TagPickerItem = TagItem & { creatable?: string }

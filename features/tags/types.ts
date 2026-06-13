export type TagListItem = {
  id: string
  name: string
  notesCount: number
}

export type GetTagsResponse = {
  tags: TagListItem[]
}

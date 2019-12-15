export interface Article {
  path: string
  number: number
  date: string
  title: string
  tags: Tag[]
  artists: Artist[]
  soundcloud: string
  tracklist: Track[]
  categories: Category[]
  content: Markdown
}

export type Artist = string
export type Tag = string
export type Category = string
export type Markdown = string

export type Track = {
  artists: Artist[]
  name: string
  mashup: Track[]
}

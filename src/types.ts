export interface Article {
  slug: string;
  path: string;
  number: string;
  date: string;
  title: string;
  tags: Tag[];
  artists: Artist[];
  soundcloud: string;
  tracklist: Track[];
  categories: Category[];
  content: Markdown;
  image: string;
}

export type Artist = string
export type Tag = string
export type Category = string
export type Markdown = string

export type Track = {
  artists: Artist[];
  name: string;
  mashup: Track[];
}

export interface NewsItem {
  author: string | null
  title: string
  description: string
  url: string
  source: string
  image: string | null
  publishDate: string
}

export interface NewsResponse {
  news: NewsItem[]
}
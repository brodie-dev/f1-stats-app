export interface NewsItem {
  author: string | null
  title: string
  description: string
  url: string
  source: string
  image: string
  publishDate: string
}

export interface NewsResponse {
  news: NewsItem[]
}
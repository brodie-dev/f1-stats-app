import { useQuery } from "@tanstack/react-query"
import { NewsResponse } from "../../models/News"

export const useNewsQuery = () => {
  const newsQuery = useQuery<NewsResponse>({
    queryKey: ['news'],
    queryFn: () => {
      const endpoint = 'http://localhost:3000/v1/news'

      return fetch(endpoint).then(res => res.json())
    }
  })

 return newsQuery
}
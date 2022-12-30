import { useQuery } from "@tanstack/react-query"
import { SeasonsResponse } from "../../models/Seasons"

const HOUR_24 = 1000 * 60 * 60 * 24

export const useSeasonsQuery = () => {
  const standingsQuery = useQuery<SeasonsResponse>({
    cacheTime: HOUR_24,
    queryKey: ['seasons'],
    queryFn: () => {
      const endpoint = 'http://localhost:3000/v1/seasons'

      return fetch(endpoint).then(res => res.json())
    }
  })

 return standingsQuery
}
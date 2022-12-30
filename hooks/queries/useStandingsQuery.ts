import { useQuery } from "@tanstack/react-query"
import { DriverStandingResponse } from "../../models/Standings"

export const useStandingsQuery = (season?: number) => {
  const standingsQuery = useQuery<DriverStandingResponse>({
    queryKey: [`standings-${season || "current"}`], 
    queryFn: () => {
    const endpoint = season 
      ? `http://localhost:3000/v1/standings/season/${season}`
      : 'http://localhost:3000/v1/standings/current'


   return fetch(endpoint).then(res => res.json())
  }
 })

 return standingsQuery
}
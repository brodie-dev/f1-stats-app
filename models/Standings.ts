export interface DriverStanding {
  position: number
  points: number
  wins: number
  driver: {
    id: string
    code: string
    url: string
    number: number
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: string
  }
  constructor: {
    id: string
    url: string
    name: string
    nationality: string
  }
}

export interface DriverStandingResponse {
  season: string
  round: number
  standings: DriverStanding[]
}
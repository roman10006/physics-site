export type NewsCategory = 'all' | 'world' | 'russia' | 'olympiads' | 'events' | 'scientific'
export type SortOrder = 'newest' | 'oldest'

export interface NewsItem {
  id: number
  title: string
  date: string
  image: string
  images?: string[]
  shortDescription: string
  fullDescription: string
  source: string
  category: NewsCategory
  city?: string
  region?: string
}

export interface TodayEvent {
  id: number
  month: number
  day: number
  year: number
  title: string
  shortDescription: string
  fullDescription: string
  image?: string
}

export interface Olympiad {
  id: number
  title: string
  subjects: string[]
  level: string
  gradesMin: number
  gradesMax: number
  season: string
  format: string
  status: string
  registrationOpen: boolean
  hasFutureEvents: boolean
  rsoSh: boolean
  nextAction: string
  checked: string
  image?: string
  site?: string
  description?: string
  locationsNote?: string
  schedule?: { stage: string; dates: string; note?: string }[]
  keyDates?: { date: string; label: string }[]
  universities?: number
}
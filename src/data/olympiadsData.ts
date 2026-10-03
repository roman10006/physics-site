import type { Olympiad } from '../types'

export const olympiadsData: Olympiad[] = [
  // ВСТАВЬТЕ СЮДА ВЕСЬ МАССИВ olympiadsData ИЗ ВАШЕГО ИСХОДНОГО ФАЙЛА App.tsx
  // (Объекты с id от 1 до 4)
]

export const olympiadPlural = (n: number) => {
  const m = n % 100
  if (m >= 11 && m <= 14) return 'олимпиад'
  const d = n % 10
  if (d === 1) return 'олимпиада'
  if (d >= 2 && d <= 4) return 'олимпиады'
  return 'олимпиад'
}

export const subjectIcons: Record<string, string> = {
  физика: '⚛️',
  математика: '📐',
  информатика: '💻',
  технология: '🛠️',
  мультипредметная: '🎯',
}

export const getNextDate = (o: Olympiad): string | null => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates = (o.keyDates || []).map(d => d.date).sort()
  const future = dates.filter(d => new Date(`${d}T00:00:00`) >= today)
  if (future.length > 0) return future[0]
  return dates.length > 0 ? dates[0] : null
}
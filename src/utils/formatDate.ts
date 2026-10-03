export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr.replace(' ', 'T'))
  const datePart = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  if (dateStr.includes(':')) {
    const timePart = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    return `${datePart} в ${timePart}`
  }
  return datePart
}
import type { ReactNode } from 'react'

export const renderTextWithLinks = (text: string): ReactNode[] | string => {
  const parts = text.split(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)
  if (parts.length === 1) return text
  
  const out: ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i])
    if (parts[i + 1] && parts[i + 2]) {
      out.push(
        <a key={`l${i}`} className="inline-link" href={parts[i + 2]} target="_blank" rel="noopener noreferrer">
          {parts[i + 1]}
        </a>
      )
    }
  }
  return out
}
import type { ReactNode } from 'react'
import type { NewsItem } from '../types'
import { renderTextWithLinks } from './renderTextWithLinks'

export const renderBody = (news: NewsItem): ReactNode[] => {
  const images = news.images && news.images.length > 0 ? news.images : news.image ? [news.image] : []
  const parts = news.fullDescription.split(/\[ФОТО(?::([^\]]*))?\]/g)
  const out: ReactNode[] = []
  let img = 0

  for (let i = 0; i < parts.length; i += 2) {
    const text = parts[i] ?? ''
    const caption = parts[i + 1] as string | undefined

    text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean)
      .forEach((para, j) => out.push(<p key={`p${i}-${j}`}>{renderTextWithLinks(para)}</p>))

    if (i + 1 < parts.length) {
      const src = images[img]
      if (src) {
        out.push(
          <figure key={`img${img}`} className="news-figure">
            <img
              src={src}
              alt={caption || news.title}
              onError={(e) => { e.currentTarget.parentElement!.style.display = 'none' }}
            />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        )
      }
      img++
    }
  }
  return out
}
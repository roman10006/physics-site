import { Link } from 'react-router-dom'
import type { NewsItem } from '../types'
import { formatDate } from '../utils/formatDate'

interface NewsCardProps {
  news: NewsItem
  isPast?: boolean
}

export const NewsCard = ({ news, isPast = false }: NewsCardProps) => {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'olympiads': return ''
      case 'events': return ''
      case 'scientific': return ''
      default: return '📰'
    }
  }

  return (
    <Link 
      to={`/news/${news.id}`} 
      className={`news-card ${isPast ? 'news-card-past' : ''}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="news-card-image" style={{ position: 'relative' }}>
        <div className="news-image-placeholder">
          {getCategoryEmoji(news.category)}
        </div>
        {(news.images?.[1] || news.image) && (
          <img
            src={news.images?.[1] || news.image}
            alt={news.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        {isPast && <div className="past-event-badge">✓ Завершено</div>}
      </div>
      
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-date">{formatDate(news.date)}</span>
          {(news.city || news.region) && (
            <span className="news-location">📍 {news.city || news.region}</span>
          )}
        </div>
        <h2 className="news-card-title">{news.title}</h2>
        <p className="news-card-description">{news.shortDescription}</p>
        <div className="news-card-footer">
          <span className="read-more-btn">Читать дальше →</span>
        </div>
      </div>
    </Link>
  )
}
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { newsData } from '../data/newsData'
import { formatDate } from '../utils/formatDate'
import { renderBody } from '../utils/renderBody'

export const NewsDetailPage = () => {
  const { param } = useParams<{ param: string }>()
  const navigate = useNavigate()
  const news = newsData.find(n => n.id === Number(param))
  
  useEffect(() => {
    if (news) document.title = `${news.title} — Физикум`
    else document.title = 'Новость не найдена — Физикум'
  }, [news])
  
  if (!news) {
    return (
      <main className="page">
        <div className="empty-state">
          <div className="empty-emoji">😕</div>
          <h2>Новость не найдена</h2>
          <p>Возможно, она была удалена или адрес был неверным.</p>
          <button className="btn btn-primary" onClick={() => navigate('/news')}>
            Перейти к списку новостей
          </button>
        </div>
      </main>
    )
  }
  
  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад к списку</button>
      <article className="news-detail">
        <div className="news-detail-header">
          <span className="news-date-large">{formatDate(news.date)}</span>
          {(news.city || news.region) && (
            <span className="news-location">📍 {news.city || news.region}</span>
          )}
        </div>
        <h1 className="news-detail-title">{news.title}</h1>
        <div className="news-detail-body">{renderBody(news)}</div>
        {news.source && (
          <div className="news-detail-source">
            <strong>Источник:</strong>{' '}
            {news.source.startsWith('http') ? (
              <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a>
            ) : (
              news.source
            )}
          </div>
        )}
      </article>
    </main>
  )
}
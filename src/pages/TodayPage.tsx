import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodayEvents } from '../data/todayEventsData'

export const TodayPage = () => {
  const navigate = useNavigate()
  const events = getTodayEvents()
  const dateLabel = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  useEffect(() => { document.title = `В этот день — ${dateLabel} — Физикум` }, [dateLabel])
  
  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate('/')}>← На главную</button>
      <h1 className="page-title">
        В этот день — <span className="gradient-text">{dateLabel}</span>
      </h1>
      <p className="page-subtitle">Исторические события науки и физики, произошедшие в этот день</p>
      {events.length === 0 ? (
        <div className="news-empty">
          <div className="news-empty-emoji">📅</div>
          <h3>Пока нет событий для этой даты</h3>
          <p>База рубрики «В этот день» пополняется — скоро здесь появится запись!</p>
        </div>
      ) : (
        <div className="today-page-list">
          {events.map(ev => (
            <article key={ev.id} className="today-page-card">
              <div className="today-page-year">{ev.year}</div>
              <div className="today-page-content">
                <h2>{ev.title}</h2>
                {ev.image && (
                  <img
                    className="today-page-img"
                    src={ev.image}
                    alt={ev.title}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <p>{ev.fullDescription}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodayEvents } from '../data/todayEventsData'

export const TodayWidget = () => {
  const navigate = useNavigate()
  const events = getTodayEvents()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (events.length < 2 || paused) return
    const t = setInterval(() => setIndex(i => (i + 1) % events.length), 7000)
    return () => clearInterval(t)
  }, [events.length, paused])

  if (events.length === 0) return null

  const event = events[index % events.length]
  const dateLabel = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

  return (
    <div
      className="today-widget"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="today-widget-header">
        <span className="today-widget-icon">📅</span>
        <div>
          <h3 className="today-widget-title">В этот день</h3>
          <span className="today-widget-date">{dateLabel}</span>
        </div>
      </div>
      <div className="today-widget-body" key={event.id}>
        {event.image && (
          <img
            className="today-widget-img"
            src={event.image}
            alt={event.title}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div className="today-widget-year">{event.year}</div>
        <h4 className="today-widget-event-title">{event.title}</h4>
        <p className="today-widget-desc">{event.shortDescription}</p>
        <button className="today-widget-more" onClick={() => navigate('/today')}>
          Читать дальше →
        </button>
      </div>
      {events.length > 1 && (
        <div className="today-widget-nav">
          <button className="today-widget-arrow" onClick={() => setIndex(i => (i - 1 + events.length) % events.length)}>‹</button>
          <div className="today-widget-dots">
            {events.map((_, i) => (
              <button
                key={i}
                className={`today-dot ${i === index % events.length ? 'today-dot-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Событие ${i + 1}`}
              />
            ))}
          </div>
          <button className="today-widget-arrow" onClick={() => setIndex(i => (i + 1) % events.length)}>›</button>
        </div>
      )}
    </div>
  )
}
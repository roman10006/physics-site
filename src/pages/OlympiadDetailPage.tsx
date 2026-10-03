import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { olympiadsData, subjectIcons } from '../data/olympiadsData'
import { formatDate } from '../utils/formatDate'

export const OlympiadDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const olympiad = olympiadsData.find(o => o.id === Number(id))
  const [calendarOpen, setCalendarOpen] = useState(false)
  
  useEffect(() => {
    if (olympiad) document.title = `${olympiad.title} — Олимпиады — Физикум`
  }, [olympiad])
  
  if (!olympiad) {
    return (
      <main className="page">
        <div className="empty-state">
          <div className="empty-emoji">🎓</div>
          <h2>Олимпиада не найдена</h2>
          <p>Возможно, она была удалена или адрес неверный.</p>
          <button className="btn btn-primary" onClick={() => navigate('/olympiads')}>Все олимпиады</button>
        </div>
      </main>
    )
  }
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  const calendarItems = olympiad.keyDates && olympiad.keyDates.length > 0
    ? olympiad.keyDates.map(d => ({ date: d.date, label: d.label }))
    : (olympiad.schedule || []).map(s => ({ date: '', label: `${s.stage} — ${s.dates}` }))
  
  return (
    <main className="page olympiads-page">
      <button className="back-button" onClick={() => navigate('/olympiads')}>← Все олимпиады</button>
      <div className="olympiad-detail-hero">
        <div className="olympiad-detail-photo">
          {olympiad.image ? (
            <img src={olympiad.image} alt={olympiad.title} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          ) : (
            <span className="olympiad-detail-photo-emoji">{subjectIcons[olympiad.subjects[0]] || '🎓'}</span>
          )}
        </div>
        <div className="olympiad-detail-content">
          <div className="olympiad-status-row">
            <span className="olympiad-status">{olympiad.status} · {olympiad.season}</span>
            <span className="olympiad-chip olympiad-chip-level">
              {olympiad.level === 'Отсутствует' ? 'Без уровня' : `Уровень ${olympiad.level}`}
            </span>
            <span className="olympiad-chip">{olympiad.format}</span>
          </div>
          <h1 className="olympiad-detail-title">{olympiad.title}</h1>
          <div className="olympiad-chips">
            {olympiad.subjects.slice(0, 8).map(s => (
              <span key={s} className="olympiad-chip">{s}</span>
            ))}
            {olympiad.subjects.length > 8 && (
              <span className="olympiad-chip olympiad-chip-more">+{olympiad.subjects.length - 8}</span>
            )}
          </div>
          <div className="olympiad-detail-stats">
            <span><strong>{olympiad.subjects.length}</strong> предметов</span>
            <span><strong>{olympiad.schedule?.length ?? 0}</strong> этапов</span>
            <span><strong>{olympiad.universities ?? '—'}</strong> вузов с льготами</span>
          </div>
          <div className="olympiad-detail-actions">
            {olympiad.site && (
              <a className="btn btn-primary" href={olympiad.site} target="_blank" rel="noopener noreferrer">
                🌐 Официальный сайт
              </a>
            )}
            <button className="btn btn-ghost" onClick={() => setCalendarOpen(true)}>📅 Календарь</button>
          </div>
        </div>
      </div>
      <div className="olympiad-sections-nav">
        <button onClick={() => scrollToSection('olymp-about')}>Об олимпиаде</button>
        <button onClick={() => scrollToSection('olymp-schedule')}>Расписание</button>
        <button onClick={() => scrollToSection('olymp-subjects')}>Предметы</button>
        <button onClick={() => scrollToSection('olymp-places')}>Места проведения</button>
      </div>
      <section className="olympiad-section" id="olymp-about">
        <h2>Об олимпиаде</h2>
        {olympiad.description ? (
          olympiad.description.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>Подробное описание появится позже.</p>
        )}
      </section>
      <section className="olympiad-section" id="olymp-schedule">
        <h2>Расписание</h2>
        {olympiad.schedule && olympiad.schedule.length > 0 ? (
          <div className="olympiad-schedule-table">
            <div className="olympiad-schedule-head">
              <span>Этап</span>
              <span>Сроки</span>
              <span>Примечание</span>
            </div>
            {olympiad.schedule.map((s, i) => (
              <div className="olympiad-schedule-row" key={i}>
                <span className="schedule-stage">{s.stage}</span>
                <span className="schedule-dates">{s.dates}</span>
                <span className="schedule-note">{s.note || '—'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>Опубликованного расписания для этого сезона пока нет.</p>
        )}
      </section>
      <section className="olympiad-section" id="olymp-subjects">
        <h2>Предметы</h2>
        <div className="olympiad-chips olympiad-chips-big">
          {olympiad.subjects.map(s => (
            <span key={s} className="olympiad-chip">{s}</span>
          ))}
        </div>
      </section>
      <section className="olympiad-section" id="olymp-places">
        <h2>Места проведения</h2>
        <p>{olympiad.locationsNote || 'Места проведения будут объявлены позже.'}</p>
        {olympiad.site && (
          <p>
            <a className="inline-link" href={olympiad.site} target="_blank" rel="noopener noreferrer">
              {olympiad.site}
            </a>
          </p>
        )}
      </section>
      {calendarOpen && (
        <div className="modal-overlay" onClick={() => setCalendarOpen(false)}>
          <div className="modal-content olympiads-calendar-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCalendarOpen(false)}></button>
            <div className="modal-emoji">📅</div>
            <h2 className="modal-title">Календарь олимпиады</h2>
            <p className="modal-subtext">{olympiad.title}</p>
            <div className="calendar-list">
              {calendarItems.length === 0 ? (
                <p className="calendar-empty">Пока нет дат — расписание ожидается!</p>
              ) : (
                calendarItems.map((d, i) => (
                  <div key={i} className="calendar-item">
                    {d.date && <span className="calendar-date">{formatDate(d.date)}</span>}
                    <div>
                      <div className="calendar-label">{d.label}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="btn btn-primary btn-large" onClick={() => setCalendarOpen(false)}>Понятно!</button>
          </div>
        </div>
      )}
    </main>
  )
}
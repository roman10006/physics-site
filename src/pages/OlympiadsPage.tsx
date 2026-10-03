import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Olympiad } from '../types'
import { olympiadsData, olympiadPlural, subjectIcons, getNextDate } from '../data/olympiadsData'
import { formatDate } from '../utils/formatDate'

export const OlympiadsPage = () => {
  const navigate = useNavigate()
  const [nameQuery, setNameQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [level, setLevel] = useState('all')
  const [grade, setGrade] = useState('all')
  const [season, setSeason] = useState('all')
  const [format, setFormat] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [onlyRegOpen, setOnlyRegOpen] = useState(false)
  const [onlyFuture, setOnlyFuture] = useState(false)
  const [onlyRsoSh, setOnlyRsoSh] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  
  useEffect(() => { document.title = 'Олимпиады школьников — Физикум' }, [])
  
  const subjects = Array.from(new Set(olympiadsData.flatMap(o => o.subjects))).sort((a, b) => a.localeCompare(b, 'ru'))
  const seasons = Array.from(new Set(olympiadsData.map(o => o.season)))
  
  const suggestions = showSuggest
    ? olympiadsData
        .filter(o => o.title.toLowerCase().includes(nameQuery.trim().toLowerCase()))
        .slice(0, 6)
    : []
  
  const resetFilters = () => {
    setNameQuery('')
    setSubject('all')
    setLevel('all')
    setGrade('all')
    setSeason('all')
    setFormat('all')
    setSortBy('date')
    setOnlyRegOpen(false)
    setOnlyFuture(false)
    setOnlyRsoSh(false)
  }
  
  const filtered = olympiadsData
    .filter(o => {
      if (nameQuery.trim() && !o.title.toLowerCase().includes(nameQuery.trim().toLowerCase())) return false
      if (subject !== 'all' && !o.subjects.includes(subject)) return false
      if (level !== 'all' && o.level !== level) return false
      if (grade !== 'all') {
        const g = Number(grade)
        if (g < o.gradesMin || g > o.gradesMax) return false
      }
      if (season !== 'all' && o.season !== season) return false
      if (format !== 'all' && o.format !== format) return false
      if (onlyRegOpen && !o.registrationOpen) return false
      if (onlyFuture && !o.hasFutureEvents) return false
      if (onlyRsoSh && !o.rsoSh) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        const da = getNextDate(a)
        const db = getNextDate(b)
        if (!da && !db) return a.title.localeCompare(b.title, 'ru')
        if (!da) return 1
        if (!db) return -1
        return da.localeCompare(db)
      }
      if (sortBy === 'level') return a.level.localeCompare(b.level)
      return a.title.localeCompare(b.title, 'ru')
    })
  
  const calendarDates = olympiadsData
    .flatMap(o => (o.keyDates || []).map(d => ({ ...d, title: o.title })))
    .sort((a, b) => a.date.localeCompare(b.date))
  
  const scrollToResults = () => {
    document.getElementById('olympiads-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  
  return (
    <main className="page olympiads-page">
      <div className="olympiads-breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <span>Олимпиады</span>
      </div>
      <div className="olympiads-header">
        <div>
          <h1 className="olympiads-title">Олимпиады школьников</h1>
          <p className="olympiads-subtitle">Профили, уровни, актуальные сроки и льготы университетов в одном каталоге</p>
        </div>
        <div className="olympiads-header-right">
          <div className="olympiads-count-badge">
            <span>🎓</span>
            <strong>{filtered.length}</strong>
            <span>{olympiadPlural(filtered.length)}</span>
          </div>
          <button className="btn btn-primary" onClick={() => setCalendarOpen(true)}>
            📅 Календарь
          </button>
        </div>
      </div>
      <div className="olympiads-filters">
        <div className="olympiads-filters-row">
          <div className="olympiads-filter olympiads-filter-wide">
            <label>Название</label>
            <div className="olympiads-suggest-wrap">
              <input
                className="olympiads-input"
                placeholder="Например, Высшая проба"
                value={nameQuery}
                onChange={e => setNameQuery(e.target.value)}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
              />
              {suggestions.length > 0 && (
                <div className="olympiads-suggest">
                  {suggestions.map(o => (
                    <button
                      key={o.id}
                      className="olympiads-suggest-item"
                      onMouseDown={() => {
                        setNameQuery(o.title)
                        setShowSuggest(false)
                      }}
                    >
                      {o.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="olympiads-filter">
            <label>Предмет</label>
            <select className="olympiads-select" value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="all">Все предметы</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="olympiads-filter">
            <label>Уровень</label>
            <select className="olympiads-select" value={level} onChange={e => setLevel(e.target.value)}>
              <option value="all">Все уровни</option>
              <option value="I">Уровень I</option>
              <option value="II">Уровень II</option>
              <option value="III">Уровень III</option>
            </select>
          </div>
          <div className="olympiads-filter">
            <label>Класс</label>
            <select className="olympiads-select" value={grade} onChange={e => setGrade(e.target.value)}>
              <option value="all">1-11</option>
              {[5, 6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>{g} класс</option>)}
            </select>
          </div>
          <div className="olympiads-filter">
            <label>Сезон</label>
            <select className="olympiads-select" value={season} onChange={e => setSeason(e.target.value)}>
              <option value="all">Все сезоны</option>
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="olympiads-filters-row">
          <div className="olympiads-filter">
            <label>Формат</label>
            <select className="olympiads-select" value={format} onChange={e => setFormat(e.target.value)}>
              <option value="all">Все</option>
              <option value="Очно">Очно</option>
              <option value="Онлайн">Онлайн</option>
              <option value="Гибрид">Гибрид</option>
            </select>
          </div>
          <div className="olympiads-filter">
            <label>Сортировка</label>
            <select className="olympiads-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date">По ближайшей дате</option>
              <option value="name">По названию</option>
              <option value="level">По уровню</option>
            </select>
          </div>
          <label className="olympiads-checkbox">
            <input type="checkbox" checked={onlyRegOpen} onChange={e => setOnlyRegOpen(e.target.checked)} />
            Регистрация открыта
          </label>
          <label className="olympiads-checkbox">
            <input type="checkbox" checked={onlyFuture} onChange={e => setOnlyFuture(e.target.checked)} />
            Есть будущие события
          </label>
          <label className="olympiads-checkbox">
            <input type="checkbox" checked={onlyRsoSh} onChange={e => setOnlyRsoSh(e.target.checked)} />
            Входит в перечень РСОШ
          </label>
          <button className="btn btn-primary olympiads-search-btn" onClick={scrollToResults}>Найти</button>
          <button className="olympiads-reset-btn" onClick={resetFilters}>Сбросить</button>
        </div>
      </div>
      <div className="olympiads-grid" id="olympiads-results">
        {filtered.length === 0 ? (
          <div className="news-empty olympiads-empty">
            <div className="news-empty-emoji">🎓</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуй изменить фильтры — или подожди: база олимпиад скоро пополнится!</p>
          </div>
        ) : (
          filtered.map(o => (
            <article key={o.id} className="olympiad-card" onClick={() => navigate(`/olympiads/${o.id}`)}>
              <h3 className="olympiad-title">{o.title}</h3>
              <div className="olympiad-status-row">
                <span className="olympiad-status">{o.status} · {o.season}</span>
                <span className="olympiad-chip olympiad-chip-level">
                  {o.level === 'Отсутствует' ? 'Без уровня' : `Уровень ${o.level}`}
                </span>
              </div>
              <div className="olympiad-chips">
                {o.subjects.slice(0, 3).map(s => (
                  <span key={s} className="olympiad-chip">{s}</span>
                ))}
                {o.subjects.length > 3 && (
                  <span className="olympiad-chip olympiad-chip-more">+{o.subjects.length - 3}</span>
                )}
              </div>
              <div className="olympiad-next">
                <span className="olympiad-next-label">Ближайшее действие</span>
                <span className="olympiad-next-value">{o.nextAction}</span>
              </div>
              <div className="olympiad-footer">
                <div className="olympiad-footer-stat">
                  <span className="olympiad-footer-value">{o.gradesMin}–{o.gradesMax}</span>
                  <span className="olympiad-footer-label">классы</span>
                </div>
                <div className="olympiad-footer-divider" />
                <div className="olympiad-footer-stat">
                  <span className="olympiad-footer-value">{o.universities ?? '—'}</span>
                  <span className="olympiad-footer-label">вузов с льготами</span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      {calendarOpen && (
        <div className="modal-overlay" onClick={() => setCalendarOpen(false)}>
          <div className="modal-content olympiads-calendar-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCalendarOpen(false)}>✕</button>
            <div className="modal-emoji"></div>
            <h2 className="modal-title">Календарь олимпиад</h2>
            <p className="modal-subtext">Ближайшие ключевые даты из базы олимпиад</p>
            <div className="calendar-list">
              {calendarDates.length === 0 ? (
                <p className="calendar-empty">Пока нет дат — база олимпиад пополняется!</p>
              ) : (
                calendarDates.map((d, i) => (
                  <div key={i} className="calendar-item">
                    <span className="calendar-date">{formatDate(d.date)}</span>
                    <div>
                      <div className="calendar-label">{d.label}</div>
                      <div className="calendar-title">{d.title}</div>
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
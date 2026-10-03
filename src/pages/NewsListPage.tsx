import { useState, useEffect, Fragment } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import type { NewsCategory, SortOrder, NewsItem } from '../types'
import { newsData } from '../data/newsData'
import { regions, sortedRegions } from '../data/regions'
import { formatDate } from '../utils/formatDate'
import { NewsCard } from '../components/NewsCard'

interface NewsListPageProps {
  openModal: (t: string) => void
}

const categoryNames: Record<NewsCategory, string> = {
  all: 'Все новости',
  world: 'В мире',
  russia: 'В России',
  olympiads: 'Олимпиады',
  events: 'События',
  scientific: 'Научные работы',
}

const newsButtons: { icon: string; label: string; category: NewsCategory }[] = [
  { icon: '🌍', label: 'Новости в мире', category: 'world' },
  { icon: '🇷', label: 'Новости в России', category: 'russia' },
  { icon: '', label: 'Ближайшие олимпиады', category: 'olympiads' },
  { icon: '📅', label: 'Ближайшие события', category: 'events' },
  { icon: '🔬', label: 'Научные работы', category: 'scientific' },
]

export const NewsListPage = ({ openModal }: NewsListPageProps) => {
  const { param } = useParams<{ param: string }>()
  const navigate = useNavigate()
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [selectedRegion, setSelectedRegion] = useState<string>('Без региона')
  const [showPastEvents, setShowPastEvents] = useState(false)
  
  const validCategories: NewsCategory[] = ['world', 'russia', 'olympiads', 'events', 'scientific']
  const newsFilter: NewsCategory =
    param && validCategories.includes(param as NewsCategory)
      ? (param as NewsCategory)
      : 'all'
  
  useEffect(() => {
    document.title = newsFilter === 'all'
      ? 'Новости физики — Физикум'
      : `${categoryNames[newsFilter]} — Новости — Физикум`
  }, [newsFilter])
  
  const toggleFilter = (cat: NewsCategory) => {
    if (newsFilter === cat) navigate('/news')
    else navigate(`/news/${cat}`)
  }
  
  const getFilteredNews = () => {
    let filtered = newsData
    if (newsFilter === 'all') {
      filtered = filtered.filter(n => n.category === 'world' || n.category === 'russia')
    } else {
      filtered = filtered.filter(n => n.category === newsFilter)
    }
    const byDate = (a: NewsItem, b: NewsItem) =>
      sortOrder === 'newest'
        ? new Date(b.date.replace(' ', 'T')).getTime() - new Date(a.date.replace(' ', 'T')).getTime()
        : new Date(a.date.replace(' ', 'T')).getTime() - new Date(b.date.replace(' ', 'T')).getTime()
    if (newsFilter === 'events' && selectedRegion !== 'Без региона') {
      const regionEvents = filtered.filter(n => n.region === selectedRegion).sort(byDate)
      const otherEvents = filtered.filter(n => n.region !== selectedRegion).sort(byDate)
      return [...regionEvents, ...otherEvents]
    }
    const sorted = [...filtered].sort(byDate)
    return sorted
  }
  
  const splitEvents = () => {
    const all = getFilteredNews()
    if (newsFilter !== 'events') return { upcoming: all, past: [] }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const upcoming: NewsItem[] = []
    const past: NewsItem[] = []
    all.forEach(n => {
      const eventDate = new Date(n.date.replace(' ', 'T'))
      eventDate.setHours(0, 0, 0, 0)
      if (eventDate >= today) upcoming.push(n)
      else past.push(n)
    })
    return { upcoming, past }
  }
  
  const filteredNews = getFilteredNews()
  const isEventsMode = newsFilter === 'events'
  const regionEventsCount = isEventsMode && selectedRegion !== 'Без региона'
    ? filteredNews.filter(n => n.region === selectedRegion).length
    : -1
  
  return (
    <main className="page">
      <h1 className="page-title">
        {newsFilter === 'olympiads' ? (
          <>Олимпиады <span className="gradient-text">по физике</span></>
        ) : newsFilter === 'events' ? (
          <>События <span className="gradient-text">в мире физики</span></>
        ) : newsFilter === 'scientific' ? (
          <>Научные <span className="gradient-text">работы</span></>
        ) : (
          <>Новости <span className="gradient-text">физики</span></>
        )}
      </h1>
      <p className="page-subtitle">
        {newsFilter === 'olympiads'
          ? 'Ближайшие олимпиады и турниры для школьников 7-11 классов'
          : newsFilter === 'events'
          ? 'Выставки, фестивали науки и интересные встречи'
          : newsFilter === 'scientific'
          ? 'Исследовательские работы школьников и студентов'
          : 'Самое интересное из мира науки'}
      </p>
      <div className="write-news-row">
        <button className="write-news-btn" onClick={() => openModal('Написать новость')}>
          <span>✍️</span>Написать новость
        </button>
      </div>
      <div className="news-toolbar">
        <div className="news-buttons">
          {newsButtons.map(btn => (
            <button
              key={btn.label}
              className={`mini-btn ${newsFilter === btn.category ? 'mini-btn-active' : ''}`}
              onClick={() => toggleFilter(btn.category)}
            >
              <span>{btn.icon}</span>{btn.label}
            </button>
          ))}
        </div>
        <button
          className="sort-btn"
          onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          title={sortOrder === 'newest' ? 'Сначала новые' : 'Сначала старые'}
        >
          {sortOrder === 'newest' ? 'Сначала новые' : 'Сначала старые'}
          <span className="sort-arrow">{sortOrder === 'newest' ? '↓' : '↑'}</span>
        </button>
      </div>
      {isEventsMode && (
        <div className="region-selector">
          <label className="region-label">📍 Пожалуйста, выберите свой регион:</label>
          <select className="region-select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="Без региона">Без региона — показать все события</option>
            {sortedRegions.map(region => <option key={region} value={region}>{region}</option>)}
            <option value="__no_list">Нет в списке</option>
          </select>
        </div>
      )}
      <div className="news-list">
        {newsFilter === 'scientific' ? (
          <div className="scientific-empty">
            <div className="scientific-emoji">🔬</div>
            <h2>Научных работ пока нет</h2>
            <p>Но скоро они появятся! Здесь будут публиковаться исследовательские работы школьников и студентов по физике.</p>
            <button className="btn btn-primary" onClick={() => openModal('Добавить научную работу')}>
              Добавить свою работу
            </button>
          </div>
        ) : (() => {
          const { upcoming, past } = splitEvents()
          const hasOnlyPast = upcoming.length === 0 && past.length > 0
          if (upcoming.length === 0 && past.length === 0) {
            return (
              <div className="news-empty">
                <div className="news-empty-emoji">📭</div>
                <h3>Новостей пока нет</h3>
                <p>В категории «{categoryNames[newsFilter]}» новостей ещё нет.</p>
              </div>
            )
          }
          return (
            <>
              {regionEventsCount === 0 && (
                <div className="region-empty-banner">
                  <span className="region-empty-icon">🗺️</span>
                  <p><strong>В вашем регионе событий нет.</strong></p>
                  <p>Ниже показаны события из других регионов:</p>
                </div>
              )}
              {hasOnlyPast && (
                <div className="region-empty-banner">
                  <span className="region-empty-icon">📅</span>
                  <p><strong>Все события уже завершились.</strong></p>
                  <p>Ниже — архив прошедших мероприятий.</p>
                </div>
              )}
              {upcoming.map((news, index) => (
                <Fragment key={news.id}>
                  {regionEventsCount > 0 && index === regionEventsCount && (
                    <div className="region-separator">
                      <span>В вашем регионе больше нет событий — далее другие регионы</span>
                    </div>
                  )}
                  <NewsCard news={news} isPast={false} />
                </Fragment>
              ))}
              {newsFilter === 'events' && past.length > 0 && (
                <button
                  className="past-events-toggle"
                  onClick={() => setShowPastEvents(!showPastEvents)}
                >
                  <span className="past-events-toggle-text">
                    {showPastEvents ? 'Скрыть' : 'Показать'} прошедшие события
                  </span>
                  <span className="past-events-toggle-count">{past.length}</span>
                  <span className={`past-events-toggle-arrow ${showPastEvents ? 'up' : ''}`}>
                    {showPastEvents ? '↑' : '↓'}
                  </span>
                </button>
              )}
              {newsFilter === 'events' && showPastEvents && (
                <div className="past-events-wrapper">
                  <div className="past-events-label">Архив событий</div>
                  {past.map(news => (
                    <NewsCard key={news.id} news={news} isPast={true} />
                  ))}
                </div>
              )}
            </>
          )
        })()}
      </div>
    </main>
  )
}
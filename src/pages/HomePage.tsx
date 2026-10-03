import { useEffect, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { TodayWidget } from '../components/TodayWidget'
import { getTodayEvents } from '../data/todayEventsData'

interface HomePageProps {
  openModal: (t: string) => void
  openSocial: (p: 'max' | 'tg') => void
}

export const HomePage = ({ openModal, openSocial }: HomePageProps) => {
  useEffect(() => { document.title = 'Физикум — сайт про физику для школьников' }, [])
  
  const cards = [
    { id: 'materials', icon: '📚', title: 'Материалы', description: 'Теория, подготовка к ОГЭ/ЕГЭ, учебные материалы', color: '#4F7DF5', link: '/materials' },
    { id: 'news', icon: '📰', title: 'Новости', description: 'Олимпиады, турниры и события в мире физики', color: '#10B981', link: '/news' },
    { id: 'olympiads', icon: '', title: 'Олимпиады', description: 'Всероссийские и международные олимпиады по физике', color: '#F59E0B', link: '/olympiads' },
    { id: 'services', icon: '💼', title: 'Услуги', description: 'Репетиторы и другие услуги для подготовки', color: '#EC4899', link: '/services' },
    { id: 'trainer', icon: '🎯', title: 'Тренажёр', description: 'Решай задачи и прокачивай навыки физика', color: '#8B5CF6', action: () => openModal('Тренажёр') },
    { id: 'forum', icon: '💬', title: 'Форум', description: 'Общение с единомышленниками и экспертами', color: '#64748B', action: () => openModal('Форум') },
  ]
  
  const hasToday = getTodayEvents().length > 0
  
  return (
    <div className={hasToday ? 'home-layout home-layout-with-sidebar' : 'home-layout'}>
      <main className="hero">
        {/* Баннер обратной связи */}
        <div className="feedback-banner">
          <span className="feedback-icon">💡</span>
          <p>Заметили ошибку на сайте — пожалуйста, напишите!</p>
          <Link to="/contacts" className="btn btn-primary btn-small">Написать</Link>
        </div>
        <div className="hero-badge"><span className="badge-dot" />Скоро открытие</div>
        <h1 className="hero-title">Физика — <span className="gradient-text">это круто</span></h1>
        <p className="hero-subtitle">
          Материалы, новости, форум и репетиторы для школьников 7-11 классов.<br />
          Место, где физика становится интересной.
        </p>
        <div className="bento-grid">
          {cards.map(card => {
            const Inner = (
              <>
                <div className="bento-icon">{card.icon}</div>
                <h3 className="bento-title">{card.title}</h3>
                <p className="bento-desc">{card.description}</p>
                <div className="bento-arrow">→</div>
              </>
            )
            if (card.link) {
              return (
                <Link
                  key={card.id}
                  to={card.link}
                  className="bento-card"
                  style={{ '--accent': card.color, textDecoration: 'none' } as CSSProperties}
                >
                  {Inner}
                </Link>
              )
            }
            return (
              <button
                key={card.id}
                className="bento-card"
                style={{ '--accent': card.color } as CSSProperties}
                onClick={card.action}
              >
                {Inner}
              </button>
            )
          })}
        </div>
        {/* МЫ В СОЦСЕТЯХ */}
        <div className="social-section">
          <h3 className="social-section-title">Мы в соцсетях</h3>
          <div className="social-buttons">
            <button className="social-btn social-max" onClick={() => openSocial('max')}>
              <span>💬</span> Физикум в MAX
            </button>
            <button className="social-btn social-tg" onClick={() => openSocial('tg')}>
              <span>✈️</span> Физикум в Телеграм
            </button>
          </div>
        </div>
      </main>
      {/* РУБРИКА "В ЭТОТ ДЕНЬ" — справа */}
      {hasToday && (
        <aside className="today-sidebar">
          <TodayWidget />
        </aside>
      )}
    </div>
  )
}
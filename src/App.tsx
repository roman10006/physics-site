import { useState, useEffect } from 'react'
import './App.css'

type Page = 'home' | 'news' | 'tutors'

function App() {
  // === СОСТОЯНИЯ ===
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'light' // теперь светлая по умолчанию!
  })
  const [page, setPage] = useState<Page>('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem('cookieAccepted') === 'true'
  })
  const [contactOpen, setContactOpen] = useState(false)
  const [stars, setStars] = useState<{x: number; y: number; size: number; delay: number}[]>([])

  // === ЭФФЕКТЫ ===
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const newStars = Array.from({length: 50}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])

  // При смене страницы — скролл наверх
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  // === ФУНКЦИИ ===
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const openModal = (type: string) => {
    setModalType(type)
    setModalOpen(true)
  }

  const acceptCookies = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookieAccepted', 'true')
  }

  const goHome = () => {
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setPage('home')
    }
  }

  // === ДАННЫЕ ===

  // Навигация в шапке
  const navItems = [
    { label: 'Главная', active: page === 'home', action: goHome },
    { label: 'Материалы', active: false, action: () => openModal('Материалы') },
    { label: 'Новости', active: page === 'news', action: () => setPage('news') },
    { label: 'Форум', active: false, action: () => openModal('Форум') },
    { label: 'Репетиторы', active: page === 'tutors', action: () => setPage('tutors') },
  ]

  // Карточки на главном экране
  const cards = [
    {
      id: 'materials',
      icon: '📚',
      title: 'Материалы',
      description: 'Теория и задачи по всем темам 7-11 классов',
      color: '#4F7DF5',
      action: () => openModal('Материалы'),
    },
    {
      id: 'news',
      icon: '📰',
      title: 'Новости',
      description: 'Олимпиады, турниры и события в мире физики',
      color: '#10B981',
      action: () => setPage('news'),
    },
    {
      id: 'forum',
      icon: '💬',
      title: 'Форум',
      description: 'Общение с единомышленниками и экспертами',
      color: '#EC4899',
      action: () => openModal('Форум'),
    },
    {
      id: 'tutors',
      icon: '👨‍🏫',
      title: 'Репетиторы',
      description: 'Найди своего учителя для подготовки',
      color: '#F59E0B',
      action: () => setPage('tutors'),
    },
  ]

  // Фиолетовые мини-кнопки на странице новостей
  const newsButtons = [
    { icon: '🌍', label: 'Новости в мире' },
    { icon: '🇷🇺', label: 'Новости в России' },
    { icon: '🏆', label: 'Ближайшие олимпиады' },
    { icon: '📅', label: 'Ближайшие события' },
    { icon: '✍️', label: 'Написать новость' },
  ]

  const footerLinks = [
    { label: 'О проекте', id: 'about' },
    { label: 'Помощь', id: 'help' },
    { label: 'Контакты', id: 'contacts' },
    { label: 'Условия использования', id: 'terms' },
  ]

  return (
    <div className="app">
      {/* ЗВЁЗДЫ НА ФОНЕ */}
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ГРАДИЕНТНЫЕ ПЯТНА */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ========== ШАПКА (всегда сверху) ========== */}
      <header className="header">
        <div className="header-left">
          <button className="logo logo-button" onClick={goHome}>
            <span className="logo-icon">⚛️</span>
            <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
          </button>
        </div>

        {/* Навигация в линию */}
        <nav className="header-center">
          {navItems.map(item => (
            <button
              key={item.label}
              className={item.active ? 'nav-link nav-active' : 'nav-link'}
              onClick={item.action}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-right">
          {/* Поиск по сайту */}
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Поиск по сайту..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') openModal('Поиск')
              }}
            />
          </div>

          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Сменить тему"
          >
            <span className="theme-icon">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
          </button>
          
          <button 
            className="btn btn-ghost"
            onClick={() => openModal('Вход')}
          >
            Вход
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => openModal('Регистрация')}
          >
            Регистрация
          </button>
        </div>
      </header>

      {/* ========== ГЛАВНАЯ СТРАНИЦА ========== */}
      {page === 'home' && (
        <main className="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            Скоро открытие
          </div>
          
          <h1 className="hero-title">
            Физика — <span className="gradient-text">это круто</span>
          </h1>
          
          <p className="hero-subtitle">
            Материалы, новости, форум и репетиторы для школьников 7-11 классов.
            <br />
            Место, где физика становится интересной.
          </p>

          <div className="bento-grid">
            {cards.map(card => (
              <button
                key={card.id}
                className="bento-card"
                style={{ '--accent': card.color } as React.CSSProperties}
                onClick={card.action}
              >
                <div className="bento-icon">{card.icon}</div>
                <h3 className="bento-title">{card.title}</h3>
                <p className="bento-desc">{card.description}</p>
                <div className="bento-arrow">→</div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* ========== СТРАНИЦА НОВОСТЕЙ ========== */}
      {page === 'news' && (
        <main className="page">
          <h1 className="page-title">
            Новости <span className="gradient-text">физики</span>
          </h1>
          <p className="page-subtitle">Самое интересное из мира науки</p>

          {/* Главное событие недели */}
          <article className="main-event-card">
            <div className="event-badge">🔥 Главное событие недели</div>
            <h2>Метеорный поток Персеиды — 2026</h2>
            <p>
              В середине августа небо подарило всем любителям физики и астрономии 
              своё главное шоу года — метеорный поток Персеиды. До 100 «падающих звёзд» 
              в час! Это отличная возможность вспомнить, почему метеоры светятся, 
              и загадать желание по законам физики. ✨
            </p>
            <div className="event-meta">
              <span>📅 19 августа 2026</span>
              <span>👁 1 240 просмотров</span>
              <span>💬 37 обсуждений</span>
            </div>
          </article>

          {/* 5 фиолетовых мини-кнопок */}
          <div className="news-buttons">
            {newsButtons.map(btn => (
              <button
                key={btn.label}
                className="mini-btn"
                onClick={() => openModal(btn.label)}
              >
                <span>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </main>
      )}

      {/* ========== СТРАНИЦА РЕПЕТИТОРОВ ========== */}
      {page === 'tutors' && (
        <main className="page">
          <div className="empty-state">
            <div className="empty-emoji">🧑‍🏫</div>
            <h2>Пока что репетиторов нет</h2>
            <p>
              Но совсем скоро здесь появятся лучшие преподаватели физики! 
              Хочешь стать первым репетитором Физикума? Напиши нам.
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => openModal('Стать репетитором')}
            >
              Стать репетитором
            </button>
          </div>
        </main>
      )}

      {/* БЕГУЩАЯ СТРОКА НА ВЕСЬ ЭКРАН */}
      <div className="ticker">
        <div className="ticker-content">
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять».</span>
          <span>⚛️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.»</span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь.</span>
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять».</span>
          <span>⚛️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.»</span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь.</span>
        </div>
      </div>

      {/* ========== ПОДВАЛ ========== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">⚛️</span>
                <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
              </div>
              <p className="footer-description">
                Сайт про физику для школьников. 
                Учимся, обсуждаем и влюбляемся в науку вместе.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Проект</h4>
                {footerLinks.map(link => (
                  <button 
                    key={link.id}
                    className="footer-link"
                    onClick={() => link.id === 'contacts' ? setContactOpen(true) : openModal(link.label)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              
              <div className="footer-column">
                <h4>Документы</h4>
                <button 
                  className="footer-link footer-link-soon"
                  onClick={() => openModal('Пользовательское соглашение')}
                >
                  Пользовательское соглашение <span className="soon-badge">soon</span>
                </button>
                <button 
                  className="footer-link footer-link-soon"
                  onClick={() => openModal('Политика конфиденциальности')}
                >
                  Политика конфиденциальности <span className="soon-badge">soon</span>
                </button>
                <button 
                  className="footer-link footer-link-soon"
                  onClick={() => openModal('Согласие на обработку ПД')}
                >
                  Согласие на обработку ПД <span className="soon-badge">soon</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Физикум. Все права защищены.</p>
            <p className="footer-made">
              Сделано с ❤️ для любителей физики
            </p>
          </div>
        </div>
      </footer>

      {/* ========== COOKIE-УВЕДОМЛЕНИЕ ========== */}
      {!cookieAccepted && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <div className="cookie-icon">🍪</div>
            <div className="cookie-text">
              <strong>Мы используем cookie</strong>
              <p>
                Мы используем cookie и сервисы статистики для улучшения работы сайта. 
                Продолжая пользоваться сайтом, вы соглашаетесь с этим.
              </p>
            </div>
            <div className="cookie-actions">
              <button 
                className="btn btn-ghost btn-small"
                onClick={() => openModal('Условия использования')}
              >
                Подробнее
              </button>
              <button 
                className="btn btn-primary btn-small"
                onClick={acceptCookies}
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== МОДАЛКА ========== */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            
            <div className="modal-emoji">🥺</div>
            <h2 className="modal-title">Пока что нету :(</h2>
            <p className="modal-text">
              Раздел <span className="highlight">«{modalType}»</span> появится, 
              когда я заработаю <span className="highlight">500 рублей</span> на VPS-сервер.
            </p>
            <p className="modal-subtext">
              Но ты можешь помочь — расскажи про сайт друзьям!
            </p>
            
            <div className="modal-goal">
              <div className="goal-bar">
                <div className="goal-fill" style={{width: '30%'}} />
              </div>
              <div className="goal-text">
                <span>150 ₽ собрано</span>
                <span>из 500 ₽</span>
              </div>
            </div>

                        <button 
              className="btn btn-primary btn-large"
              onClick={() => setModalOpen(false)}
            >
              Понял, жду запуска!
            </button>
          </div>
        </div>
      )}

      {/* ========== МОДАЛКА КОНТАКТОВ ========== */}
      {contactOpen && (
        <div className="modal-overlay" onClick={() => setContactOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setContactOpen(false)}
            >
              ✕
            </button>
            
            <div className="modal-emoji">📨</div>
            <h2 className="modal-title">Контакты</h2>
            <p className="modal-text">
              Можете написать в Telegram:
            </p>
            
            <a 
              className="telegram-link" 
              href="https://t.me/Fababab" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              ✈️ @Fababab
            </a>
            
            <p className="modal-subtext">
              Вопросы, идеи и предложения — пиши, отвечу всем!
            </p>
            
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setContactOpen(false)}
            >
              Понятно!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
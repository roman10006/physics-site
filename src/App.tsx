import { useState, useEffect, useRef } from 'react'
import './App.css'

type Message = { author: string; text: string; time: string; own?: boolean }

function App() {
  // === СОСТОЯНИЯ ===
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [newsOpen, setNewsOpen] = useState(false)
  const [forumOpen, setForumOpen] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem('cookieAccepted') === 'true'
  })
  const [stars, setStars] = useState<{x: number; y: number; size: number; delay: number}[]>([])

  // Сообщения форума (хранятся в браузере)
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('forumMessages')
      if (saved) return JSON.parse(saved)
    } catch {}
    return [
      { author: 'Эйнштейн', text: 'Привет, коллеги! Воображение важнее знания 😄', time: '12:01' },
      { author: 'Кюри', text: 'Кто-нибудь объяснял радиоактивность девятиклассникам? Поделитесь подходом!', time: '12:05' },
      { author: 'Фейнман', text: 'Если не можешь объяснить просто — ты сам не понял. Погнали обсуждать!', time: '12:07' },
    ]
  })

  const forumBottomRef = useRef<HTMLDivElement>(null)

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

  // Автопрокрутка чата вниз
  useEffect(() => {
    forumBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, forumOpen])

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Клик по карточкам-разделам
  const handleCardClick = (id: string, title: string) => {
    if (id === 'news') {
      setNewsOpen(true)          // Новости → мини-кнопки
    } else if (id === 'forum') {
      setForumOpen(true)         // Форум → чат
    } else if (id === 'tutors') {
      openModal('Репетиторы')    // Репетиторы → "пока нет"
    } else {
      openModal(title)           // Остальные → стандартная модалка
    }
  }

  // Клик по мини-кнопке новостей
  const handleNewsClick = (label: string) => {
    setNewsOpen(false)
    openModal(label)
  }

  // Отправка сообщения в чат
  const sendMessage = () => {
    const text = messageInput.trim()
    if (!text) return
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    const next = [...messages, { author: 'Ты', text, time, own: true }]
    setMessages(next)
    localStorage.setItem('forumMessages', JSON.stringify(next))
    setMessageInput('')
  }

  // === ДАННЫЕ ===
  const cards = [
    { id: 'materials', icon: '📚', title: 'Материалы', description: 'Теория и задачи по всем темам 7-11 классов', color: '#4F7DF5' },
    { id: 'news', icon: '📰', title: 'Новости', description: 'Олимпиады, турниры и события в мире физики', color: '#10B981' },
    { id: 'forum', icon: '💬', title: 'Форум', description: 'Общение с единомышленниками и экспертами', color: '#EC4899' },
    { id: 'tutors', icon: '👨‍', title: 'Репетиторы', description: 'Найди своего учителя для подготовки', color: '#F59E0B' },
  ]

  const newsItems = [
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

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ========== ШАПКА ========== */}
      <header className="header">
        <div className="header-left">
          <button className="logo logo-button" onClick={goHome}>
            <span className="logo-icon">⚛️</span>
            <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
          </button>
        </div>

        <nav className="header-center">
          <button className="nav-link nav-active" onClick={goHome}>
            Главная
          </button>
        </nav>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
            <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <button className="btn btn-ghost" onClick={() => openModal('Вход')}>Вход</button>
          <button className="btn btn-primary" onClick={() => openModal('Регистрация')}>Регистрация</button>
        </div>
      </header>

      {/* ========== ГЛАВНЫЙ ЭКРАН ========== */}
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
              onClick={() => handleCardClick(card.id, card.title)}
            >
              <div className="bento-icon">{card.icon}</div>
              <h3 className="bento-title">{card.title}</h3>
              <p className="bento-desc">{card.description}</p>
              <div className="bento-arrow">→</div>
            </button>
          ))}
        </div>
      </main>

      {/* БЕГУЩАЯ СТРОКА */}
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
                  <button key={link.id} className="footer-link" onClick={() => openModal(link.label)}>
                    {link.label}
                  </button>
                ))}
              </div>
              
              <div className="footer-column">
                <h4>Документы</h4>
                <button className="footer-link footer-link-soon" onClick={() => openModal('Пользовательское соглашение')}>
                  Пользовательское соглашение <span className="soon-badge">soon</span>
                </button>
                <button className="footer-link footer-link-soon" onClick={() => openModal('Политика конфиденциальности')}>
                  Политика конфиденциальности <span className="soon-badge">soon</span>
                </button>
                <button className="footer-link footer-link-soon" onClick={() => openModal('Согласие на обработку ПД')}>
                  Согласие на обработку ПД <span className="soon-badge">soon</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Физикум. Все права защищены.</p>
            <p className="footer-made">Сделано с ❤️ для любителей физики</p>
          </div>
        </div>
      </footer>

      {/* ========== COOKIE ========== */}
      {!cookieAccepted && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <div className="cookie-icon">🍪</div>
            <div className="cookie-text">
              <strong>Мы используем cookie</strong>
              <p>Мы используем cookie и сервисы статистики для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</p>
            </div>
            <div className="cookie-actions">
              <button className="btn btn-ghost btn-small" onClick={() => openModal('Условия использования')}>Подробнее</button>
              <button className="btn btn-primary btn-small" onClick={acceptCookies}>Принять</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== ПАНЕЛЬ НОВОСТЕЙ (5 мини-кнопок) ========== */}
      {newsOpen && (
        <div className="modal-overlay" onClick={() => setNewsOpen(false)}>
          <div className="modal-content news-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setNewsOpen(false)}>✕</button>
            <div className="modal-emoji">📰</div>
            <h2 className="modal-title">Новости</h2>
            <p className="modal-subtext">Выбери раздел</p>
            <div className="news-buttons">
              {newsItems.map(item => (
                <button
                  key={item.label}
                  className="news-mini-btn"
                  onClick={() => handleNewsClick(item.label)}
                >
                  <span className="news-mini-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== ФОРУМ-ЧАТ ========== */}
      {forumOpen && (
        <div className="forum-overlay" onClick={() => setForumOpen(false)}>
          <div className="forum-panel" onClick={(e) => e.stopPropagation()}>
            <div className="forum-header">
              <span>💬 Форум</span>
              <button className="modal-close" onClick={() => setForumOpen(false)}>✕</button>
            </div>
            <div className="forum-note">
              Демо-режим: сообщения пока сохраняются только в твоём браузере. Общий чат для всех появится после запуска VPS!
            </div>
            <div className="forum-messages">
              {messages.map((m, i) => (
                <div key={i} className={`forum-message ${m.own ? 'own' : ''}`}>
                  <div className="forum-message-author">
                    {m.author} <span className="forum-time">{m.time}</span>
                  </div>
                  <div className="forum-message-text">{m.text}</div>
                </div>
              ))}
              <div ref={forumBottomRef} />
            </div>
            <div className="forum-input-row">
              <input
                className="forum-input"
                placeholder="Напиши сообщение..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="btn btn-primary" onClick={sendMessage}>Отправить</button>
            </div>
          </div>
        </div>
      )}

      {/* ========== МОДАЛКА ========== */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            
            {modalType === 'Репетиторы' ? (
              <>
                <div className="modal-emoji">🧑‍🏫</div>
                <h2 className="modal-title">Пока что репетиторов нет</h2>
                <p className="modal-text">
                  Но совсем скоро здесь появятся первые преподаватели!
                </p>
                <p className="modal-subtext">Хочешь стать репетитором? Расскажи о себе друзьям-учителям!</p>
                <button className="btn btn-primary btn-large" onClick={() => setModalOpen(false)}>
                  Понял!
                </button>
              </>
            ) : (
              <>
                <div className="modal-emoji">🥺</div>
                <h2 className="modal-title">Пока что нету :(</h2>
                <p className="modal-text">
                  Раздел <span className="highlight">«{modalType}»</span> появится, 
                  когда я заработаю <span className="highlight">500 рублей</span> на VPS-сервер.
                </p>
                <p className="modal-subtext">Но ты можешь помочь — расскажи про сайт друзьям!</p>
                
                <div className="modal-goal">
                  <div className="goal-bar">
                    <div className="goal-fill" style={{width: '30%'}} />
                  </div>
                  <div className="goal-text">
                    <span>150 ₽ собрано</span>
                    <span>из 500 ₽</span>
                  </div>
                </div>

                <button className="btn btn-primary btn-large" onClick={() => setModalOpen(false)}>
                  Понял, жду запуска!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
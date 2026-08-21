import { useState, useEffect } from 'react'
import './App.css'

type Page = 'home' | 'news' | 'tutors'
type NewsCategory = 'all' | 'world' | 'russia' | 'olympiads' | 'events' | 'scientific'
type SortOrder = 'newest' | 'oldest'

// Список регионов России
const regions = [
  'Без региона',
  'Республика Адыгея',
  'Республика Башкортостан',
  'Республика Бурятия',
  'Республика Алтай',
  'Республика Дагестан',
  'Республика Ингушетия',
  'Кабардино-Балкарская Республика',
  'Республика Калмыкия',
  'Карачаево-Черкесская Республика',
  'Республика Карелия',
  'Республика Коми',
  'Республика Марий Эл',
  'Республика Мордовия',
  'Республика Саха (Якутия)',
  'Республика Северная Осетия - Алания',
  'Республика Татарстан',
  'Республика Тыва',
  'Удмуртская Республика',
  'Республика Хакасия',
  'Чеченская Республика',
  'Чувашская Республика - Чувашия',
  'Алтайский край',
  'Краснодарский край',
  'Красноярский край',
  'Приморский край',
  'Ставропольский край',
  'Хабаровский край',
  'Амурская область',
  'Архангельская область',
  'Астраханская область',
  'Белгородская область',
  'Брянская область',
  'Владимирская область',
  'Волгоградская область',
  'Вологодская область',
  'Воронежская область',
  'Ивановская область',
  'Иркутская область',
  'Калининградская область',
  'Калужская область',
  'Камчатский край',
  'Кемеровская область',
  'Кировская область',
  'Костромская область',
  'Курганская область',
  'Курская область',
  'Ленинградская область',
  'Липецкая область',
  'Магаданская область',
  'Московская область',
  'Мурманская область',
  'Нижегородская область',
  'Новгородская область',
  'Новосибирская область',
  'Омская область',
  'Оренбургская область',
  'Орловская область',
  'Пензенская область',
  'Пермский край',
  'Псковская область',
  'Ростовская область',
  'Рязанская область',
  'Самарская область',
  'Саратовская область',
  'Сахалинская область',
  'Свердловская область',
  'Смоленская область',
  'Тамбовская область',
  'Тверская область',
  'Томская область',
  'Тульская область',
  'Тюменская область',
  'Ульяновская область',
  'Челябинская область',
  'Забайкальский край',
  'Ярославская область',
  'г. Москва',
  'г. Санкт-Петербург',
  'Еврейская автономная область',
  'Ненецкий автономный округ',
  'Ханты-Мансийский АО - Югра',
  'Чукотский автономный округ',
  'Ямало-Ненецкий автономный округ',
  'Республика Крым',
  'г. Севастополь',
  'Запорожская область',
  'Донецкая Народная Республика',
  'Луганская Народная Республика',
  'Херсонская область',
]

interface NewsItem {
  id: number
  title: string
  date: string
  image: string
  shortDescription: string
  fullDescription: string
  source: string
  category: NewsCategory
  city?: string
  region?: string
}

// БАЗА НОВОСТЕЙ — сюда будем добавлять твои новости
const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Пример новости: Россияне создали новый сверхпроводник',
    date: '2026-08-21',
    image: '/images/example.jpg',
    shortDescription: 'Учёные из МГУ разработали материал, работающий при температуре выше −50°C...',
    fullDescription: 'Это подробное описание новости. Здесь будет полный текст, который раскроется при нажатии кнопки "Читать дальше". Пример новости для демонстрации функционала.',
    source: 'ТАСС',
    category: 'russia',
  },
  {
    id: 2,
    title: 'Пример: Нобелевская премия 2026 за квантовые вычисления',
    date: '2026-08-20',
    image: '/images/example.jpg',
    shortDescription: 'Нобелевская премия по физике 2026 года вручена за прорыв в квантовых технологиях...',
    fullDescription: 'Полное описание новости о Нобелевской премии. Будет заменено на реальные данные.',
    source: 'Nature',
    category: 'world',
  },
  {
    id: 3,
    title: 'Всероссийская олимпиада по физике 2026',
    date: '2026-08-15',
    image: '/images/example.jpg',
    shortDescription: 'Объявлены даты проведения регионального этапа ВсОШ по физике...',
    fullDescription: 'Подробности о предстоящей олимпиаде и как к ней готовиться.',
    source: 'Минобрнауки',
    category: 'olympiads',
  },
]

function App() {
  // === СОСТОЯНИЯ ===
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'light'
  })
  const [page, setPage] = useState<Page>('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem('cookieAccepted') === 'true'
  })
  const [stars, setStars] = useState<{x: number; y: number; size: number; delay: number}[]>([])
  
  // Состояния для новостей
  const [newsFilter, setNewsFilter] = useState<NewsCategory>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string>('Без региона')

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
    setSelectedNews(null)
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setPage('home')
    }
  }

 const getFilteredNews = () => {
  let filtered = newsData
  if (newsFilter !== 'all') {
    filtered = filtered.filter(n => n.category === newsFilter)
  }
  
  // Если выбраны "События" и выбран регион — сначала события региона, потом остальные
  if (newsFilter === 'events' && selectedRegion !== 'Без региона') {
    const regionEvents = filtered.filter(n => n.region === selectedRegion)
    const otherEvents = filtered.filter(n => n.region !== selectedRegion)
    filtered = [...regionEvents, ...otherEvents]
  }
  
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
  return sorted
}

  // === ДАННЫЕ ===
  const navItems = [
    { label: 'Главная', active: page === 'home', action: goHome },
    { label: 'Материалы', active: false, action: () => openModal('Материалы') },
    { label: 'Новости', active: page === 'news', action: () => { setPage('news'); setNewsFilter('all'); setSelectedNews(null) } },
    { label: 'Форум', active: false, action: () => openModal('Форум') },
    { label: 'Репетиторы', active: page === 'tutors', action: () => setPage('tutors') },
  ]

  const cards = [
    { id: 'materials', icon: '📚', title: 'Материалы', description: 'Теория и задачи по всем темам 7-11 классов', color: '#4F7DF5', action: () => openModal('Материалы') },
    { id: 'news', icon: '📰', title: 'Новости', description: 'Олимпиады, турниры и события в мире физики', color: '#10B981', action: () => { setPage('news'); setNewsFilter('all'); setSelectedNews(null) } },
    { id: 'forum', icon: '💬', title: 'Форум', description: 'Общение с единомышленниками и экспертами', color: '#EC4899', action: () => openModal('Форум') },
    { id: 'tutors', icon: '👨‍🏫', title: 'Репетиторы', description: 'Найди своего учителя для подготовки', color: '#F59E0B', action: () => setPage('tutors') },
  ]

const newsButtons: { icon: string; label: string; category: NewsCategory }[] = [
  { icon: '🌍', label: 'Новости в мире', category: 'world' },
  { icon: '🇷🇺', label: 'Новости в России', category: 'russia' },
  { icon: '🏆', label: 'Ближайшие олимпиады', category: 'olympiads' },
  { icon: '📅', label: 'Ближайшие события', category: 'events' },
  { icon: '🔬', label: 'Научные работы', category: 'scientific' },
]

  const footerLinks = [
    { label: 'О проекте', id: 'about' },
    { label: 'Помощь', id: 'help' },
    { label: 'Контакты', id: 'contacts' },
  ]

  // Форматирование даты
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  // Категории с названиями
  const categoryNames: Record<NewsCategory, string> = {
    all: 'Все новости',
    world: 'В мире',
    russia: 'В России',
    olympiads: 'Олимпиады',
    events: 'События',
    scientific: 'Научные работы',
  }

  return (
    <div className="app">
      <div className="stars">
        {stars.map((star, i) => (
          <div key={i} className="star" style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, animationDelay: `${star.delay}s` }} />
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
          {navItems.map(item => (
            <button key={item.label} className={item.active ? 'nav-link nav-active' : 'nav-link'} onClick={item.action}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Поиск по сайту..." onKeyDown={(e) => { if (e.key === 'Enter') openModal('Поиск') }} />
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
            <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          
          <button className="btn btn-ghost" onClick={() => openModal('Вход')}>Вход</button>
          <button className="btn btn-primary" onClick={() => openModal('Регистрация')}>Регистрация</button>
        </div>
      </header>

      {/* ========== ГЛАВНАЯ ========== */}
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
              <button key={card.id} className="bento-card" style={{ '--accent': card.color } as React.CSSProperties} onClick={card.action}>
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
      {page === 'news' && !selectedNews && (
        <main className="page">
          <div className="news-header-row">
            <h1 className="page-title">
              Новости <span className="gradient-text">физики</span>
            </h1>

            <button
              className="write-news-btn"
              onClick={() => openModal('Написать новость')}
            >
              <span>✍️</span>
              Написать новость
            </button>
          </div>

          <p className="page-subtitle">Самое интересное из мира науки</p>

          {/* Фильтры + сортировка */}
          <div className="news-toolbar">
            <div className="news-buttons">
              {newsButtons.map(btn => (
                <button
                  key={btn.label}
                  className={`mini-btn ${newsFilter === btn.category ? 'mini-btn-active' : ''}`}
                >
                  <span>{btn.icon}</span>
                  {btn.label}
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

          {/* Выбор региона для "Событий" */}
          {newsFilter === 'events' && (
            <div className="region-selector">
              <label className="region-label">📍 Пожалуйста, выберите свой регион:</label>
              <select
                className="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="Без региона">Без региона (показать все)</option>
                {regions.slice(1).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
                <option value="__no_list">Нет в списке</option>
              </select>
            </div>
          )}

          {/* Список новостей */}
          <div className="news-list">
            {newsFilter === 'scientific' ? (
              /* === НАУЧНЫЕ РАБОТЫ: ЗАГЛУШКА === */
              <div className="scientific-empty">
                <div className="scientific-emoji">🔬</div>
                <h2>Научных работ пока нет</h2>
                <p>
                  Но скоро они появятся! Здесь будут публиковаться исследовательские
                  работы школьников и студентов по физике.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => openModal('Добавить научную работу')}
                >
                  Добавить свою работу
                </button>
              </div>
            ) : getFilteredNews().length === 0 ? (
              <div className="news-empty">
                <div className="news-empty-emoji">📭</div>
                <h3>Новостей пока нет</h3>
                <p>В категории «{categoryNames[newsFilter]}» новостей ещё нет.</p>
              </div>
            ) : (
              <>
                {/* Баннер, если в выбранном регионе событий нет */}
                {newsFilter === 'events' &&
                  selectedRegion !== 'Без региона' &&
                  selectedRegion !== '__no_list' &&
                  getFilteredNews().filter(n => n.region === selectedRegion).length === 0 && (
                    <div className="region-empty-banner">
                      <span className="region-empty-icon">🗺️</span>
                      <p><strong>В вашем регионе событий нет.</strong></p>
                      <p>Ниже показаны события из других регионов:</p>
                    </div>
                  )}

                {getFilteredNews().map((news, index) => {
                  const isEventsWithRegion =
                    newsFilter === 'events' &&
                    selectedRegion !== 'Без региона' &&
                    selectedRegion !== '__no_list'
                  const regionCount = isEventsWithRegion
                    ? getFilteredNews().filter(n => n.region === selectedRegion).length
                    : 0
                  const showSeparator =
                    isEventsWithRegion && regionCount > 0 && index === regionCount

                  return (
                    <div key={news.id}>
                      {showSeparator && (
                        <div className="region-separator">
                          <span>📍 Другие регионы</span>
                        </div>
                      )}

                      <article className="news-card">
                        <div className="news-card-image">
                          {news.image ? (
                            <img src={news.image} alt={news.title} className="news-img" />
                          ) : (
                            <div className="news-image-placeholder">📰</div>
                          )}
                        </div>
                        <div className="news-card-content">
                          <div className="news-card-meta">
                            <span className="news-date">{formatDate(news.date)}</span>
                            {news.city && news.region && (
                              <span className="news-location">
                                📍 {news.city}, {news.region}
                              </span>
                            )}
                          </div>
                          <h2 className="news-card-title">{news.title}</h2>
                          <p className="news-card-description">{news.shortDescription}</p>
                          <div className="news-card-footer">
                            <button
                              className="read-more-btn"
                              onClick={() => setSelectedNews(news)}
                            >
                              Читать дальше →
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </main>
      )}

      {/* ========== ПРОСМОТР ОТДЕЛЬНОЙ НОВОСТИ ========== */}
      {page === 'news' && selectedNews && (
        <main className="page">
          <button
            className="back-button"
            onClick={() => setSelectedNews(null)}
          >
            ← Назад к списку
          </button>

          <article className="news-detail">
            <div className="news-detail-image">
              {selectedNews.image ? (
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="news-img large"
                />
              ) : (
                <div className="news-image-placeholder large">📰</div>
              )}
            </div>

            <div className="news-detail-header">
              <span className="news-date">{formatDate(selectedNews.date)}</span>
              {selectedNews.city && selectedNews.region && (
                <span className="news-location">
                  📍 {selectedNews.city}, {selectedNews.region}
                </span>
              )}
            </div>

            <h1 className="news-detail-title">{selectedNews.title}</h1>

            <div className="news-detail-body">
              <p>{selectedNews.fullDescription}</p>
            </div>

            <div className="news-detail-source">
              <strong>Источник:</strong> {selectedNews.source}
            </div>
          </article>
        </main>
      )}

      {/* ========== СТРАНИЦА РЕПЕТИТОРОВ ========== */}
      {page === 'tutors' && (
        <main className="page">
          <div className="empty-state">
            <div className="empty-emoji">🧑‍🏫</div>
            <h2>Пока что репетиторов нет</h2>
            <p>Но совсем скоро здесь появятся лучшие преподаватели физики! Хочешь стать первым репетитором Физикума? Напиши нам.</p>
            <button className="btn btn-primary btn-large" onClick={() => openModal('Стать репетитором')}>
              Стать репетитором
            </button>
          </div>
        </main>
      )}

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
                Сайт про физику для школьников. Учимся, обсуждаем и влюбляемся в науку вместе.
              </p>
              
              <div className="social-buttons">
                <a className="social-btn social-max" href="https://max.ru/join/u4jqdt9YuI7pJVBLpfm5P5V6VoQN8jDro6VdT_T_tsc" target="_blank" rel="noopener noreferrer">
                  <span>💬</span> Физикум в MAX
                </a>
                <a className="social-btn social-tg" href="https://t.me/physicym" target="_blank" rel="noopener noreferrer">
                  <span>✈️</span> Физикум в Телеграмме
                </a>
              </div>
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

      {/* ========== МОДАЛКА ========== */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            
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
          </div>
        </div>
      )}
    </div>
  )
}

export default App
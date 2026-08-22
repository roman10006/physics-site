import { useState, useEffect, Fragment, type CSSProperties, type ReactNode } from 'react'
import './App.css'

// ============================================
// ТИПЫ
// ============================================
type Page = 'home' | 'news' | 'tutors'
type NewsCategory = 'all' | 'world' | 'russia' | 'olympiads' | 'events' | 'scientific'
type SortOrder = 'newest' | 'oldest'

// ============================================
// СПИСОК РЕГИОНОВ РОССИИ (89 субъектов)
// В выпадающем списке сортируются по алфавиту (от «а» до «я»)
// ============================================
const regions = [
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
  'Республика Татарстан (Татарстан)',
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

// Регионы по алфавиту (от «а» до «я»)
const sortedRegions = [...regions].sort((a, b) => a.localeCompare(b, 'ru'))

// ============================================
// БАЗА НОВОСТЕЙ
// Сюда будем добавлять твои реальные новости.
// Формат: название, дата (ГГГГ-ММ-ДД), фото (/images/файл.jpg),
// краткое описание, подробное описание, источник, категория.
// Для событий ОБЯЗАТЕЛЬНО: city (город) и region (регион из списка выше).
// ============================================
const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Управляемый квантовый мир',
    date: '2026-08-22 16:50',
    image: '/images/RAN.jpg',
    images: ['/images/RAN.jpg', '/images/RAN-2.jpg'],
    shortDescription: 'Физики из Австралии, России и Великобритании создали искусственный двумерный электростатический кристалл',
    fullDescription: `Физики из Австралии, России и Великобритании создали искусственный двумерный электростатический кристалл, электронные свойства которого можно непрерывно менять электрическим напряжением и магнитным полем. Результаты опубликованы в авторитетном международном журнале Nature Physics.

Настраиваемый искусственный кристалл сформирован внутри знакомой полупроводниковой структуры — слоя арсенида галлия в арсениде алюминия-галлия. Для этого учёные наложили на двумерный электронный газ (тончайший электронный слой) периодический электростатический рельеф. Меняя напряжения на двух затворах, исследователи смогли в одном и том же чипе перестраивать электронный спектр от «графеноподобного» к «кагоме-подобному», то есть получать разные типы энергетических зон без замены самого образца.

«Главное достижение состоит в том, что в одном и том же полупроводниковом устройстве можно электрически перестраивать искусственный кристалл и переходить от графеноподобных электронных состояний к кагоме-подобной плоской зоне, где на первый план выходят взаимодействия между электронами. Это уже не просто наблюдение отдельных минизон, а управляемая платформа для исследования коллективных квантовых состояний», — пояснил один из авторов работы, старший научный сотрудник Института физики полупроводников им. А.В. Ржанова СО РАН кандидат физико-математических наук Виталий Ткаченко.

[ФОТО]

В кагоме-подобной электронной системе главную роль играет кагоме-решётка. В такой решётке электроны могут почти «застывать» в так называемой плоской энергетической зоне, и тогда на первый план выходят взаимодействия между электронами, их коллективное поведение. Именно при определённом заполнении электронами плоской зоны исследователи обнаружили новое коллективное состояние электронов — коррелированный изолятор, свойства которого не удавалось объяснить существующими моделями.

Созданная платформа позволяет моделировать квантовые системы, которые трудно или невозможно воспроизвести в природных материалах. Свойства нового искусственного кристалла можно не только спроектировать заранее, но и перестраивать непосредственно в процессе эксперимента.

Исследование объединило изготовление и измерение образцов, одночастичное численное моделирование и многочастичную теорию. Образцы и транспортные измерения были сделаны в Университете Нового Южного Уэльса; полупроводниковые многослойные структуры арсенида галлия–алюминия галлия арсенида предоставила Кавендишская лаборатория. Сотрудники ИФП СО РАН кандидаты физико-математических наук Ольга и Виталий Ткаченко сопровождали эксперимент численными расчётами, оптимизировали дизайн трёхмерной полупроводниковой структуры. Многочастичную модель коррелированного состояния развили Олег Сушков и Зеб Крикс из Университета Нового Южного Уэльса.

[ФОТО: Изображение схемы устройства, сгенерированное нейросетью]

«Есть и другие способы создания искусственных кристаллических решёток. Например, их можно „собирать" из атомно-тонких полупроводниковых слоёв, просто накладывая друг на друга как листы бумаги, но с небольшим поворотом. Из-за этого поворота образуется так называемый муаровый узор, как при наложении тюлевых занавесок — он и создает искусственную решётку. Другие исследователи берут за основу двумерный электронный газ, как в обсуждаемой работе, и с помощью травления создают в нём упорядоченно расположенные ямки нанометровых размеров.

Смысл этого направления исследований — усилить энергию взаимодействия электронов друг с другом по сравнению с их кинетической энергией, чтобы создать условия для изучения эффектов коллективного поведения электронов.

Обсуждаемая работа выгодно отличается большей управляемостью искусственного двумерного кристалла с помощью изменения напряжений, прикладываемых к двум металлическим затворам. Этого удалось достичь, объединив усилия по разработке дизайна структур с помощью компьютерного моделирования (ИФП СО РАН), созданию двумерного электронного газа высочайшего качества (Кавендишская лаборатория, Кембридж) и изготовлению образцов искусственного кристалла (Университет Нового Южного Уэльса)», — комментирует коллега авторов статьи, старший научный сотрудник ИФП СО РАН кандидат физико-математических наук Алексей Ненашев, специалист в области моделирования квантовых явлений в низкоразмерных материалах. Результаты опубликованы в статье Correlated insulator in the kagome flat band of a two-dimensional electrostatic crystal (D.Q. Wang, Z. Krix, O.A. Tkachenko, V.A. Tkachenko, C. Chen, I. Farrer, D.A. Ritchie, O.P. Sushkov, A.R. Hamilton, O. Klochan).`,
    source: 'https://new.ras.ru/press-center/upravlyaemyy-kvantovyy-mir-fiziki-sozdali-perestraivaemyy-dvumernyy-elektrostaticheskiy-kristall/',
    category: 'russia',
  },
]

// Тип новости (объявлен после newsData не может быть — объявляем здесь)
interface NewsItem {
  id: number
  title: string
  date: string
  image: string
  images?: string[]
  shortDescription: string
  fullDescription: string
  source: string
  category: NewsCategory
  city?: string
  region?: string
}

// Рендер подробного описания: абзацы + фото в местах [ФОТО] и [ФОТО: подпись]
const renderBody = (news: NewsItem) => {
  const images = news.images && news.images.length > 0 ? news.images : news.image ? [news.image] : []
  const parts = news.fullDescription.split(/\[ФОТО(?::([^\]]*))?\]/g)
  const out: ReactNode[] = []
  let img = 0

  for (let i = 0; i < parts.length; i += 2) {
    const text = parts[i] ?? ''
    const caption = parts[i + 1] as string | undefined

    text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean)
      .forEach((para, j) => out.push(<p key={`p${i}-${j}`}>{para}</p>))

    // Если после этого куска текста был маркер [ФОТО] — вставляем картинку
    if (i + 1 < parts.length) {
      const src = images[img]
      if (src) {
        out.push(
          <figure key={`img${img}`} className="news-figure">
            <img
              src={src}
              alt={caption || news.title}
              onError={(e) => { e.currentTarget.parentElement!.style.display = 'none' }}
            />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        )
      }
      img++
    }
  }
  return out
}

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

  // Состояния новостей
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

  // Скролл наверх при смене страницы или открытии новости
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page, selectedNews])

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

  // Открытие страницы новостей (сброс фильтров)
  const openNews = () => {
    setPage('news')
    setNewsFilter('all')
    setSelectedNews(null)
    setSelectedRegion('Без региона')
  }

  // Переключение фильтра: повторный клик = сброс на "все"
  const toggleFilter = (category: NewsCategory) => {
    setNewsFilter(prev => (prev === category ? 'all' : category))
  }

  // Фильтрация + сортировка + логика регионов для событий
  const getFilteredNews = () => {
    let filtered = newsData
    if (newsFilter !== 'all') {
      filtered = filtered.filter(n => n.category === newsFilter)
    }

    const byDate = (a: NewsItem, b: NewsItem) =>
      sortOrder === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()

    // Для событий: сначала события выбранного региона, потом остальные
    if (newsFilter === 'events' && selectedRegion !== 'Без региона') {
      const regionEvents = filtered.filter(n => n.region === selectedRegion).sort(byDate)
      const otherEvents = filtered.filter(n => n.region !== selectedRegion).sort(byDate)
      return [...regionEvents, ...otherEvents]
    }

    return [...filtered].sort(byDate)
  }

  // Форматирование даты по-русски
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  // === ДАННЫЕ ИНТЕРФЕЙСА ===
  const navItems = [
    { label: 'Главная', active: page === 'home', action: goHome },
    { label: 'Материалы', active: false, action: () => openModal('Материалы') },
    { label: 'Новости', active: page === 'news', action: openNews },
    { label: 'Форум', active: false, action: () => openModal('Форум') },
    { label: 'Репетиторы', active: page === 'tutors', action: () => setPage('tutors') },
  ]

  const cards = [
    { id: 'materials', icon: '📚', title: 'Материалы', description: 'Теория и задачи по всем темам 7-11 классов', color: '#4F7DF5', action: () => openModal('Материалы') },
    { id: 'news', icon: '📰', title: 'Новости', description: 'Олимпиады, турниры и события в мире физики', color: '#10B981', action: openNews },
    { id: 'forum', icon: '💬', title: 'Форум', description: 'Общение с единомышленниками и экспертами', color: '#EC4899', action: () => openModal('Форум') },
    { id: 'tutors', icon: '👨‍🏫', title: 'Репетиторы', description: 'Найди своего учителя для подготовки', color: '#F59E0B', action: () => setPage('tutors') },
  ]

  // 5 мини-кнопок фильтров (кнопки "Все" НЕТ — сброс повторным кликом)
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

  const categoryNames: Record<NewsCategory, string> = {
    all: 'Все новости',
    world: 'В мире',
    russia: 'В России',
    olympiads: 'Олимпиады',
    events: 'События',
    scientific: 'Научные работы',
  }

  // Для логики разделителей в событиях
  const filteredNews = getFilteredNews()
  const isEventsMode = newsFilter === 'events'
  const regionEventsCount =
    isEventsMode && selectedRegion !== 'Без региона'
      ? filteredNews.filter(n => n.region === selectedRegion).length
      : -1

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

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
            <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          <button className="btn btn-ghost" onClick={() => openModal('Вход')}>Вход</button>
          <button className="btn btn-primary" onClick={() => openModal('Регистрация')}>Регистрация</button>
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
                style={{ '--accent': card.color } as CSSProperties}
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

      {/* ========== СТРАНИЦА НОВОСТЕЙ (список) ========== */}
      {page === 'news' && !selectedNews && (
        <main className="page">
          <div className="news-header-row">
            <h1 className="page-title">
              Новости <span className="gradient-text">физики</span>
            </h1>

            {/* Кнопка "Написать новость" — отличается от остальных */}
            <button className="write-news-btn" onClick={() => openModal('Написать новость')}>
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
                  onClick={() => toggleFilter(btn.category)}
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

          {/* Выбор региона — только для "Событий" */}
          {isEventsMode && (
            <div className="region-selector">
              <label className="region-label">📍 Пожалуйста, выберите свой регион:</label>
              <select
                className="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="Без региона">Без региона — показать все события</option>
                {sortedRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
                <option value="__no_list">Нет в списке</option>
              </select>
            </div>
          )}

          {/* Список новостей */}
          <div className="news-list">
            {newsFilter === 'scientific' ? (
              /* --- НАУЧНЫЕ РАБОТЫ: ЗАГЛУШКА --- */
              <div className="scientific-empty">
                <div className="scientific-emoji">🔬</div>
                <h2>Научных работ пока нет</h2>
                <p>
                  Но скоро они появятся! Здесь будут публиковаться исследовательские
                  работы школьников и студентов по физике.
                </p>
                <button className="btn btn-primary" onClick={() => openModal('Добавить научную работу')}>
                  Добавить свою работу
                </button>
              </div>
            ) : filteredNews.length === 0 ? (
              /* --- ПУСТО --- */
              <div className="news-empty">
                <div className="news-empty-emoji">📭</div>
                <h3>Новостей пока нет</h3>
                <p>В категории «{categoryNames[newsFilter]}» новостей ещё нет.</p>
              </div>
            ) : (
              /* --- СПИСОК НОВОСТЕЙ --- */
              <>
                {/* Баннер, если в выбранном регионе событий нет */}
                {regionEventsCount === 0 && (
                  <div className="region-empty-banner">
                    <span className="region-empty-icon">🗺️</span>
                    <p><strong>В вашем регионе событий нет.</strong></p>
                    <p>Ниже показаны события из других регионов:</p>
                  </div>
                )}

                {filteredNews.map((news, index) => (
                  <Fragment key={news.id}>
                    {/* Разделитель: события региона закончились */}
                    {regionEventsCount > 0 && index === regionEventsCount && (
                      <div className="region-separator">
                        <span>В вашем регионе больше нет событий — далее другие регионы</span>
                      </div>
                    )}

                    <article className="news-card">
                      <div className="news-card-image" style={{ position: 'relative' }}>
                        <div className="news-image-placeholder">📰</div>
                        {/* Показываем второе фото если есть, иначе первое */}
                        {(news.images?.[1] || news.image) && (
                          <img
                            src={news.images?.[1] || news.image}
                            alt={news.title}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        )}
                      </div>
                      <div className="news-card-content">
                        <div className="news-card-meta">
                          <span className="news-date">{formatDate(news.date)}</span>
                          {news.city && news.region && (
                            <span className="news-location">📍 {news.city}, {news.region}</span>
                          )}
                        </div>
                        <h2 className="news-card-title">{news.title}</h2>
                        <p className="news-card-description">{news.shortDescription}</p>
                        <div className="news-card-footer">
                          <button className="read-more-btn" onClick={() => setSelectedNews(news)}>
                            Читать дальше →
                          </button>
                        </div>
                      </div>
                    </article>
                  </Fragment>
                ))}
              </>
            )}
          </div>
        </main>
      )}

      {/* ========== ПРОСМОТР ОТДЕЛЬНОЙ НОВОСТИ ========== */}
      {page === 'news' && selectedNews && (
        <main className="page">
          <button className="back-button" onClick={() => setSelectedNews(null)}>
            ← Назад к списку
          </button>

          <article className="news-detail">
            {/* Без фото сверху — только дата и место */}
            <div className="news-detail-header">
              <span className="news-date-large">{formatDate(selectedNews.date)}</span>
              {selectedNews.city && selectedNews.region && (
                <span className="news-location">📍 {selectedNews.city}, {selectedNews.region}</span>
              )}
            </div>

            <h1 className="news-detail-title">{selectedNews.title}</h1>

            <div className="news-detail-body">
              {renderBody(selectedNews)}
            </div>

            <div className="news-detail-source">
              <strong>Источник:</strong>{' '}
              {selectedNews.source.startsWith('http') ? (
                <a href={selectedNews.source} target="_blank" rel="noopener noreferrer">
                  {selectedNews.source}
                </a>
              ) : (
                selectedNews.source
              )}
            </div>
          </article>
        </main>
      )}

      {/* ========== СТРАНИЦА РЕПЕТИТОРОВ ========== */}
      {page === 'tutors' && (
        <main className="page">
          <div className="empty-state">
            <div className="empty-emoji">🧑🏫</div>
            <h2>Пока что репетиторов нет</h2>
            <p>
              Но совсем скоро здесь появятся лучшие преподаватели физики!
              Хочешь стать первым репетитором Физикума? Напиши нам.
            </p>
            <button className="btn btn-primary btn-large" onClick={() => openModal('Стать репетитором')}>
              Стать репетитором
            </button>
          </div>
        </main>
      )}

      {/* ========== БЕГУЩАЯ СТРОКА ========== */}
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

              <div className="social-buttons">
                <a
                  className="social-btn social-max"
                  href="https://max.ru/join/u4jqdt9YuI7pJVBLpfm5P5V6VoQN8jDro6VdT_T_tsc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💬</span> Физикум в MAX
                </a>
                <a
                  className="social-btn social-tg"
                  href="https://t.me/physicym"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
              <button className="btn btn-ghost btn-small" onClick={() => openModal('Политика конфиденциальности')}>
                Подробнее
              </button>
              <button className="btn btn-primary btn-small" onClick={acceptCookies}>
                Принять
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== МОДАЛКА "ПОКА ЧТО НЕТУ" ========== */}
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
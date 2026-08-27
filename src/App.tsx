import { useState, useEffect, Fragment, type CSSProperties, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import './App.css'

// ============================================
// ТИПЫ
// ============================================
type NewsCategory = 'all' | 'world' | 'russia' | 'olympiads' | 'events' | 'scientific'
type SortOrder = 'newest' | 'oldest'

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

[ФОТО: Изображение схемы устройства, сгенерированное нейросетью Creen AI]

«Есть и другие способы создания искусственных кристаллических решёток. Например, их можно „собирать" из атомно-тонких полупроводниковых слоёв, просто накладывая друг на друга как листы бумаги, но с небольшим поворотом. Из-за этого поворота образуется так называемый муаровый узор, как при наложении тюлевых занавесок — он и создает искусственную решётку. Другие исследователи берут за основу двумерный электронный газ, как в обсуждаемой работе, и с помощью травления создают в нём упорядоченно расположенные ямки нанометровых размеров.

Смысл этого направления исследований — усилить энергию взаимодействия электронов друг с другом по сравнению с их кинетической энергией, чтобы создать условия для изучения эффектов коллективного поведения электронов.

Обсуждаемая работа выгодно отличается большей управляемостью искусственного двумерного кристалла с помощью изменения напряжений, прикладываемых к двум металлическим затворам. Этого удалось достичь, объединив усилия по разработке дизайна структур с помощью компьютерного моделирования (ИФП СО РАН), созданию двумерного электронного газа высочайшего качества (Кавендишская лаборатория, Кембридж) и изготовлению образцов искусственного кристалла (Университет Нового Южного Уэльса)», — комментирует коллега авторов статьи, старший научный сотрудник ИФП СО РАН кандидат физико-математических наук Алексей Ненашев, специалист в области моделирования квантовых явлений в низкоразмерных материалах. Результаты опубликованы в статье Correlated insulator in the kagome flat band of a two-dimensional electrostatic crystal (D.Q. Wang, Z. Krix, O.A. Tkachenko, V.A. Tkachenko, C. Chen, I. Farrer, D.A. Ritchie, O.P. Sushkov, A.R. Hamilton, O. Klochan).`,
    source: 'https://new.ras.ru/press-center/upravlyaemyy-kvantovyy-mir-fiziki-sozdali-perestraivaemyy-dvumernyy-elektrostaticheskiy-kristall/',
    category: 'russia',
  },
]

// ============================================
// РЕНДЕР ТЕКСТА С ФОТО ([ФОТО] и [ФОТО: подпись])
// ============================================
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

// ============================================
// ОБЩИЕ ДАННЫЕ ИНТЕРФЕЙСА
// ============================================
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
  { icon: '🏆', label: 'Ближайшие олимпиады', category: 'olympiads' },
  { icon: '📅', label: 'Ближайшие события', category: 'events' },
  { icon: '🔬', label: 'Научные работы', category: 'scientific' },
]


const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ============================================
// МОДАЛКА "ПОКА ЧТО НЕТУ"
// ============================================
const Modal = ({ open, type, onClose }: { open: boolean; type: string; onClose: () => void }) => {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-emoji">🥺</div>
        <h2 className="modal-title">Пока что нету :(</h2>
        <p className="modal-text">
          Раздел <span className="highlight">«{type}»</span> появится,
          когда я заработаю <span className="highlight">500 рублей</span> на VPS-сервер.
        </p>
        <p className="modal-subtext">Но ты можешь помочь — расскажи про сайт друзьям!</p>
        <div className="modal-goal">
          <div className="goal-bar"><div className="goal-fill" style={{width: '30%'}} /></div>
          <div className="goal-text"><span>150 ₽ собрано</span><span>из 500 ₽</span></div>
        </div>
        <button className="btn btn-primary btn-large" onClick={onClose}>Понял, жду запуска!</button>
      </div>
    </div>
  )
}

// ============================================
// COOKIE-БАННЕР
// ============================================
const CookieBanner = ({ open, onAccept, onMore }: { open: boolean; onAccept: () => void; onMore: () => void }) => {
  if (!open) return null
  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <strong>Мы используем cookie</strong>
          <p>Мы используем cookie и сервисы статистики для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-ghost btn-small" onClick={onMore}>Подробнее</button>
          <button className="btn btn-primary btn-small" onClick={onAccept}>Принять</button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// ШАПКА
// ============================================
const Header = ({
  theme, toggleTheme, openModal, currentPath
}: {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  openModal: (t: string) => void
  currentPath: string
}) => {
  const isActive = (path: string) =>
    currentPath === path || (path === '/news' && currentPath.startsWith('/news'))

  return (
    <header className="header">
      <div className="header-left">
        <Link className="logo logo-button" to="/">
          <span className="logo-icon">⚛️</span>
          <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
        </Link>
      </div>

      <nav className="header-center">
        <Link className={`nav-link ${isActive('/') ? 'nav-active' : ''}`} to="/">Главная</Link>
        <button className="nav-link" onClick={() => openModal('Материалы')}>Материалы</button>
        <Link className={`nav-link ${isActive('/news') ? 'nav-active' : ''}`} to="/news">Новости</Link>
        <button className="nav-link" onClick={() => openModal('Форум')}>Форум</button>
        <Link className={`nav-link ${isActive('/services') ? 'nav-active' : ''}`} to="/services">Услуги</Link>
      </nav>

      <div className="header-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Поиск по сайту..."
            onKeyDown={(e) => { if (e.key === 'Enter') openModal('Поиск') }}
          />
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
        <button className="btn btn-ghost" onClick={() => openModal('Вход')}>Вход</button>
        <button className="btn btn-primary" onClick={() => openModal('Регистрация')}>Регистрация</button>
      </div>
    </header>
  )
}

// ============================================
// ГЛАВНАЯ СТРАНИЦА
// ============================================
const HomePage = ({ openModal, openSocial, openSecret }: { openModal: (t: string) => void; openSocial: (p: 'max' | 'tg') => void; openSecret: () => void }) => {
  useEffect(() => { document.title = 'Физикум — сайт про физику для школьников' }, [])

  const cards = [
    { id: 'materials', icon: '📚', title: 'Материалы', description: 'Теория и задачи по всем темам 7-11 классов', color: '#4F7DF5', action: () => openModal('Материалы') },
    { id: 'news', icon: '📰', title: 'Новости', description: 'Олимпиады, турниры и события в мире физики', color: '#10B981', link: '/news' },
    { id: 'forum', icon: '💬', title: 'Форум', description: 'Общение с единомышленниками и экспертами', color: '#EC4899', action: () => openModal('Форум') },
    { id: 'trainer', icon: '🎯', title: 'Тренажёр', description: 'Решай задачи и прокачивай навыки физика', color: '#8B5CF6', action: () => openModal('Тренажёр') },
    { id: 'services', icon: '💼', title: 'Услуги', description: 'Репетиторы и другие услуги для подготовки', color: '#F59E0B', link: '/services' },
    { id: 'secret', icon: '🔮', title: '?', description: 'Секретный раздел — скоро раскроем', color: '#64748B', action: openSecret, secret: true },
  ]

  return (
    <main className="hero">
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
              <h3 className={`bento-title ${card.secret ? 'bento-title-secret' : ''}`}>{card.title}</h3>
              <p className="bento-desc">{card.description}</p>
              <div className="bento-arrow">→</div>
            </>
          )

          if (card.link) {
            return (
              <Link
                key={card.id}
                to={card.link}
                className={`bento-card ${card.secret ? 'bento-card-secret' : ''}`}
                style={{ '--accent': card.color, textDecoration: 'none' } as CSSProperties}
              >
                {Inner}
              </Link>
            )
          }

          return (
            <button
              key={card.id}
              className={`bento-card ${card.secret ? 'bento-card-secret' : ''}`}
              style={{ '--accent': card.color } as CSSProperties}
              onClick={card.action}
            >
              {Inner}
            </button>
          )
        })}
      </div>

      {/* МЫ В СОЦСЕТЯХ — видное место на главной */}
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
  )
}

// ============================================
// СПИСОК НОВОСТЕЙ
// ============================================
const NewsListPage = ({ openModal }: { openModal: (t: string) => void }) => {
  const [newsFilter, setNewsFilter] = useState<NewsCategory>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [selectedRegion, setSelectedRegion] = useState<string>('Без региона')

  useEffect(() => { document.title = 'Новости физики — Физикум' }, [])

  const toggleFilter = (category: NewsCategory) => {
    setNewsFilter(prev => (prev === category ? 'all' : category))
  }

  const getFilteredNews = () => {
    let filtered = newsData
    if (newsFilter !== 'all') filtered = filtered.filter(n => n.category === newsFilter)

    const byDate = (a: NewsItem, b: NewsItem) =>
      sortOrder === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()

    if (newsFilter === 'events' && selectedRegion !== 'Без региона') {
      const regionEvents = filtered.filter(n => n.region === selectedRegion).sort(byDate)
      const otherEvents = filtered.filter(n => n.region !== selectedRegion).sort(byDate)
      return [...regionEvents, ...otherEvents]
    }

    return [...filtered].sort(byDate)
  }

  const filteredNews = getFilteredNews()
  const isEventsMode = newsFilter === 'events'
  const regionEventsCount = isEventsMode && selectedRegion !== 'Без региона'
    ? filteredNews.filter(n => n.region === selectedRegion).length
    : -1

  return (
    <main className="page">
      <div className="news-header-row">
        <h1 className="page-title">Новости <span className="gradient-text">физики</span></h1>
        <button className="write-news-btn" onClick={() => openModal('Написать новость')}>
          <span>✍️</span>Написать новость
        </button>
      </div>

      <p className="page-subtitle">Самое интересное из мира науки</p>

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
        ) : filteredNews.length === 0 ? (
          <div className="news-empty">
            <div className="news-empty-emoji">📭</div>
            <h3>Новостей пока нет</h3>
            <p>В категории «{categoryNames[newsFilter]}» новостей ещё нет.</p>
          </div>
        ) : (
          <>
            {regionEventsCount === 0 && (
              <div className="region-empty-banner">
                <span className="region-empty-icon">🗺️</span>
                <p><strong>В вашем регионе событий нет.</strong></p>
                <p>Ниже показаны события из других регионов:</p>
              </div>
            )}

            {filteredNews.map((news, index) => (
              <Fragment key={news.id}>
                {regionEventsCount > 0 && index === regionEventsCount && (
                  <div className="region-separator">
                    <span>В вашем регионе больше нет событий — далее другие регионы</span>
                  </div>
                )}

                <Link to={`/news/${news.id}`} className="news-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="news-card-image" style={{ position: 'relative' }}>
                    <div className="news-image-placeholder">📰</div>
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
                      <span className="read-more-btn">Читать дальше →</span>
                    </div>
                  </div>
                </Link>
              </Fragment>
            ))}
          </>
        )}
      </div>
    </main>
  )
}

// ============================================
// ОТДЕЛЬНАЯ НОВОСТЬ
// ============================================
const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const news = newsData.find(n => n.id === Number(id))

  useEffect(() => {
    if (news) document.title = `${news.title} — Физикум`
    else document.title = 'Новость не найдена — Физикум'
  }, [news])

  if (!news) {
    return (
      <main className="page">
        <div className="empty-state">
          <div className="empty-emoji">😕</div>
          <h2>Новость не найдена</h2>
          <p>Возможно, она была удалена или адрес был неверным.</p>
          <button className="btn btn-primary" onClick={() => navigate('/news')}>
            Перейти к списку новостей
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate('/news')}>← Назад к списку</button>

      <article className="news-detail">
        <div className="news-detail-header">
          <span className="news-date-large">{formatDate(news.date)}</span>
          {news.city && news.region && (
            <span className="news-location">📍 {news.city}, {news.region}</span>
          )}
        </div>

        <h1 className="news-detail-title">{news.title}</h1>

        <div className="news-detail-body">{renderBody(news)}</div>

        <div className="news-detail-source">
          <strong>Источник:</strong>{' '}
          {news.source.startsWith('http') ? (
            <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a>
          ) : (
            news.source
          )}
        </div>
      </article>
    </main>
  )
}

// ============================================
// РЕПЕТИТОРЫ
// ============================================
// ============================================
// УСЛУГИ (репетиторы и т.д.)
// ============================================
const ServicesPage = ({ openModal }: { openModal: (t: string) => void }) => {
  useEffect(() => { document.title = 'Услуги — Физикум' }, [])
  return (
    <main className="page">
      <div className="empty-state">
        <div className="empty-emoji">💼</div>
        <h2>Услуги скоро появятся</h2>
        <p>
          Здесь будут репетиторы, подготовка к олимпиадам и другие услуги.
          Хочешь стать нашим первым репетитором? Напиши нам!
        </p>
        <button className="btn btn-primary btn-large" onClick={() => openModal('Стать репетитором')}>
          Стать репетитором
        </button>
      </div>
    </main>
  )
}

// ============================================
// КОНТАКТЫ
// ============================================
const ContactsPage = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  useEffect(() => { document.title = 'Контакты — Физикум' }, [])

  const copyUsername = async () => {
    try {
      await navigator.clipboard.writeText('@Fababab')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = '@Fababab'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

      <h1 className="page-title">Контакты</h1>
      <p className="page-subtitle">Мы всегда на связи!</p>

      <div className="contacts-grid">
        {/* Телеграм */}
        <div className="contact-card">
          <div className="contact-icon">✈️</div>
          <h3>Написать в Телеграм</h3>
          <p className="contact-desc">Самый быстрый способ связаться</p>
          <button className="contact-username" onClick={copyUsername}>
            @Fababab
            <span className={`social-copy-icon ${copied ? 'copied' : ''}`}>
              {copied ? '✓ Скопировано!' : '📋'}
            </span>
          </button>
          <a
            className="btn btn-primary"
            href="https://t.me/Fababab"
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать
          </a>
        </div>

        {/* Почта для информации и помощи */}
        <div className="contact-card contact-card-soon">
          <div className="contact-icon">📮</div>
          <h3>Для информации и помощи</h3>
          <p className="contact-desc">Вопросы по сайту и материалам</p>
          <div className="contact-soon-badge">Почта появится скоро</div>
        </div>

        {/* Почта для сотрудничества */}
        <div className="contact-card contact-card-soon">
          <div className="contact-icon">🤝</div>
          <h3>Для сотрудничества</h3>
          <p className="contact-desc">Репетиторам, партнёрам и СМИ</p>
          <div className="contact-soon-badge">Почта появится скоро</div>
        </div>
      </div>
    </main>
  )
}

// ============================================
// ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
// ============================================
const PrivacyPolicyPage = () => {
  const navigate = useNavigate()
  useEffect(() => { document.title = 'Политика конфиденциальности — Физикум' }, [])

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

      <article className="legal-document">
        <h1>Политика конфиденциальности</h1>
        <p className="legal-meta">Редакция от 26 августа 2026 года</p>

        <section>
          <h2>1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки и защиты персональных данных пользователей сайта <strong>fizikum.ru</strong> (далее — Сайт).</p>
          <p>Используя Сайт, вы выражаете согласие с условиями настоящей Политики. В случае несогласия — пожалуйста, прекратите использование Сайта.</p>
        </section>

        <section>
          <h2>2. Оператор персональных данных</h2>
          <p>Оператором является владелец сайта Физикум. Связаться с оператором можно по электронной почте: <a href="mailto:info@fizikum.ru">info@fizikum.ru</a>.</p>
        </section>

        <section>
          <h2>3. Какие данные мы собираем</h2>
          <p>Мы можем собирать следующие категории данных:</p>
          <ul>
            <li><strong>При регистрации:</strong> адрес электронной почты, имя (никнейм), пароль (в зашифрованном виде)</li>
            <li><strong>Автоматически:</strong> IP-адрес, данные о браузере и устройстве, cookies, информация о посещениях</li>
            <li><strong>При взаимодействии:</strong> тексты новостей, комментариев, сообщений на форуме</li>
          </ul>
        </section>

        <section>
          <h2>4. Цели обработки данных</h2>
          <p>Персональные данные обрабатываются в следующих целях:</p>
          <ul>
            <li>Идентификация пользователя при входе в личный кабинет</li>
            <li>Предоставление доступа к функциям Сайта (публикация новостей, комментарии, поиск репетиторов)</li>
            <li>Связь с пользователем (уведомления, восстановление пароля)</li>
            <li>Улучшение работы Сайта на основе аналитики</li>
            <li>Обеспечение безопасности и предотвращение мошенничества</li>
          </ul>
        </section>

        <section>
          <h2>5. Файлы cookies</h2>
          <p>Сайт использует следующие типы cookies:</p>
          <ul>
            <li><strong>Технические:</strong> для сохранения выбранной темы оформления и согласия на использование cookies</li>
            <li><strong>Функциональные:</strong> для авторизации и поддержания сессии пользователя</li>
            <li><strong>Аналитические:</strong> для сбора статистики посещений (Яндекс.Метрика)</li>
          </ul>
          <p>Пользователь может отключить cookies в настройках браузера, однако это может ограничить функциональность Сайта.</p>
        </section>

        <section>
          <h2>6. Срок хранения данных</h2>
          <p>Персональные данные хранятся в течение всего периода использования аккаунта. После удаления аккаунта данные уничтожаются в течение 30 дней, за исключением случаев, предусмотренных законодательством РФ.</p>
        </section>

        <section>
          <h2>7. Права пользователя</h2>
          <p>В соответствии с 152-ФЗ «О персональных данных» вы имеете право:</p>
          <ul>
            <li>Получить информацию о своих персональных данных</li>
            <li>Требовать их уточнения, блокирования или удаления</li>
            <li>Отозвать согласие на обработку данных</li>
            <li>Обжаловать действия оператора в Роскомнадзор</li>
          </ul>
        </section>

        <section>
          <h2>8. Защита данных</h2>
          <p>Мы применяем организационные и технические меры для защиты данных: шифрование паролей (bcrypt), HTTPS-соединение, защита от SQL-инъекций и XSS-атак, регулярное резервное копирование.</p>
        </section>

        <section>
          <h2>9. Передача данных третьим лицам</h2>
          <p>Мы не передаём ваши персональные данные третьим лицам, за исключением случаев:</p>
          <ul>
            <li>По запросу уполномоченных государственных органов в установленном законом порядке</li>
            <li>Для обеспечения работы сервисов (хостинг, почтовые сервисы) — при наличии соглашения о конфиденциальности</li>
          </ul>
        </section>

        <section>
          <h2>10. Изменение Политики</h2>
          <p>Оператор вправе изменять настоящую Политику. Новая редакция вступает в силу с момента публикации на Сайте.</p>
        </section>

        <div className="legal-footer">
          <button className="btn btn-primary" onClick={() => window.print()}>🖨 Распечатать</button>
        </div>
      </article>
    </main>
  )
}

// ============================================
// ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
// ============================================
const TermsPage = () => {
  const navigate = useNavigate()
  useEffect(() => { document.title = 'Пользовательское соглашение — Физикум' }, [])

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

      <article className="legal-document">
        <h1>Пользовательское соглашение</h1>
        <p className="legal-meta">Редакция от 26 августа 2026 года</p>

        <section>
          <h2>1. Общие положения</h2>
          <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между администрацией сайта <strong>fizikum.ru</strong> (далее — Администрация) и пользователем сети Интернет (далее — Пользователь), возникающие при использовании Сайта.</p>
          <p>Использование Сайта означает безоговорочное принятие Пользователем условий настоящего Соглашения.</p>
        </section>

        <section>
          <h2>2. Предмет Соглашения</h2>
          <p>Администрация предоставляет Пользователю право на безвозмездной основе использовать функционал Сайта, включающий:</p>
          <ul>
            <li>Просмотр образовательных материалов по физике для 7–11 классов</li>
            <li>Чтение и публикацию новостей из мира физики</li>
            <li>Участие в обсуждениях на форуме</li>
            <li>Поиск репетиторов и размещение анкет репетиторов</li>
            <li>Публикацию научных работ и анекдотов</li>
          </ul>
        </section>

        <section>
          <h2>3. Регистрация и аккаунт</h2>
          <p>Для доступа к ряду функций Пользователь обязан пройти регистрацию, предоставив достоверные данные. Пользователь несёт ответственность за сохранность своих учётных данных и все действия, совершённые от его имени.</p>
          <p>Один человек может иметь только один аккаунт. Передача аккаунта третьим лицам запрещена.</p>
        </section>

        <section>
          <h2>4. Права и обязанности Пользователя</h2>
          <p><strong>Пользователь имеет право:</strong></p>
          <ul>
            <li>Использовать все функции Сайта в соответствии с их назначением</li>
            <li>Публиковать собственные материалы при условии соблюдения законодательства РФ</li>
            <li>Удалить свой аккаунт в любое время</li>
          </ul>
          <p><strong>Пользователь обязуется не:</strong></p>
          <ul>
            <li>Публиковать материалы, нарушающие законодательство РФ (экстремизм, порнография, пропаганда наркотиков и т.д.)</li>
            <li>Распространять спам, рекламу без согласования с Администрацией</li>
            <li>Оскорблять других пользователей, разжигать ненависть</li>
            <li>Публиковать заведомо ложную информацию</li>
            <li>Пытаться получить несанкционированный доступ к Сайту</li>
            <li>Нарушать авторские права третьих лиц</li>
          </ul>
        </section>

        <section>
          <h2>5. Права и обязанности Администрации</h2>
          <p>Администрация имеет право:</p>
          <ul>
            <li>Удалять любой контент, нарушающий настоящее Соглашение</li>
            <li>Блокировать аккаунты нарушителей без предупреждения</li>
            <li>Изменять функционал Сайта и условия Соглашения</li>
            <li>Прекратить работу Сайта с предварительным уведомлением</li>
          </ul>
        </section>

        <section>
          <h2>6. Интеллектуальная собственность</h2>
          <p>Все материалы Сайта (логотип, дизайн, тексты, графика) являются объектами авторского права. Использование материалов без письменного согласия Администрации запрещено.</p>
          <p>Публикуя материалы на Сайте, Пользователь предоставляет Администрации неисключительную лицензию на их использование в рамках Сайта.</p>
        </section>

        <section>
          <h2>7. Ответственность</h2>
          <p>Администрация не несёт ответственности за:</p>
          <ul>
            <li>Содержание материалов, опубликованных Пользователями</li>
            <li>Ущерб, возникший в результате использования или невозможности использования Сайта</li>
            <li>Действия третьих лиц (репетиторов, партнёров)</li>
          </ul>
        </section>

        <section>
          <h2>8. Разрешение споров</h2>
          <p>Все споры решаются путём переговоров. При невозможности достижения согласия — в судебном порядке в соответствии с законодательством РФ.</p>
        </section>

        <section>
          <h2>9. Контактная информация</h2>
          <p>По всем вопросам, связанным с использованием Сайта, обращайтесь: <a href="mailto:info@fizikum.ru">info@fizikum.ru</a>.</p>
        </section>

        <div className="legal-footer">
          <button className="btn btn-primary" onClick={() => window.print()}>🖨 Распечатать</button>
        </div>
      </article>
    </main>
  )
}

// ============================================
// СОГЛАСИЕ НА ОБРАБОТКУ ПД
// ============================================
const ConsentPage = () => {
  const navigate = useNavigate()
  useEffect(() => { document.title = 'Согласие на обработку ПД — Физикум' }, [])

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

      <article className="legal-document">
        <h1>Согласие на обработку персональных данных</h1>
        <p className="legal-meta">В соответствии со статьёй 9 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</p>

        <section>
          <h2>1. Субъект персональных данных</h2>
          <p>Я, субъект персональных данных, в соответствии с Федеральным законом от 27 июля 2006 г. № 152-ФЗ «О персональных данных», свободно, своей волей и в своём интересе даю согласие оператору — сайту <strong>fizikum.ru</strong> (далее — Оператор) — на обработку моих персональных данных.</p>
        </section>

        <section>
          <h2>2. Перечень персональных данных</h2>
          <p>На обработку передаются следующие персональные данные:</p>
          <ul>
            <li>Фамилия, имя (или псевдоним)</li>
            <li>Адрес электронной почты</li>
            <li>Дата рождения (при указании)</li>
            <li>Регион проживания (при указании)</li>
            <li>IP-адрес и данные о посещениях сайта</li>
            <li>Файлы cookies</li>
          </ul>
        </section>

        <section>
          <h2>3. Цели обработки</h2>
          <p>Персональные данные обрабатываются в целях:</p>
          <ul>
            <li>Предоставления доступа к функциям Сайта</li>
            <li>Идентификации при входе в личный кабинет</li>
            <li>Направления уведомлений, связанных с использованием Сайта</li>
            <li>Улучшения качества работы Сайта</li>
            <li>Соблюдения требований законодательства РФ</li>
          </ul>
        </section>

        <section>
          <h2>4. Перечень действий с данными</h2>
          <p>С моими персональными данными Оператор вправе совершать следующие действия:</p>
          <ul>
            <li>Сбор, запись, систематизация, накопление</li>
            <li>Хранение, уточнение (обновление, изменение)</li>
            <li>Извлечение, использование, передача</li>
            <li>Обезличивание, блокирование, удаление, уничтожение</li>
          </ul>
          <p>Обработка осуществляется как с использованием средств автоматизации, так и без их использования.</p>
        </section>

        <section>
          <h2>5. Срок действия согласия</h2>
          <p>Настоящее согласие действует в течение всего периода использования Сайта и 30 дней после удаления аккаунта. Согласие может быть отозвано путём направления письменного заявления на адрес <a href="mailto:info@fizikum.ru">info@fizikum.ru</a>.</p>
        </section>

        <section>
          <h2>6. Порядок отзыва согласия</h2>
          <p>Субъект персональных данных вправе отозвать настоящее согласие, направив письменное заявление Оператору. В случае отзыва согласия Оператор вправе продолжить обработку данных в случаях, предусмотренных пунктами 2–11 части 1 статьи 6 Федерального закона № 152-ФЗ.</p>
        </section>

        <section>
          <h2>7. Подтверждение</h2>
          <p>Регистрируясь на Сайте, я подтверждаю, что:</p>
          <ul>
            <li>Ознакомлен(а) с настоящей формой согласия полностью</li>
            <li>Понимаю значение используемых терминов</li>
            <li>Даю согласие свободно, своей волей и в своём интересе</li>
            <li>Ознакомлен(а) с Политикой конфиденциальности Оператора</li>
          </ul>
        </section>

        <div className="legal-footer">
          <button className="btn btn-primary" onClick={() => window.print()}>🖨 Распечатать</button>
        </div>
      </article>
    </main>
  )
}

// ============================================
// О ПРОЕКТЕ
// ============================================
const AboutPage = () => {
  const navigate = useNavigate()
  useEffect(() => { document.title = 'О проекте — Физикум' }, [])

  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

      <div className="about-document">
        <div className="about-hero">
          <div className="about-badge">🚀 Проект запущен 16 августа 2026 года</div>
          <h1>О проекте <span className="gradient-text">Физикум</span></h1>
          <p className="about-lead">
            Физикум — сайт про физику для школьников 7–11 классов.
            Место, где сложное становится простым, а скучное — интересным.
          </p>
        </div>

        <section className="about-section">
          <h2>💡 Зачем нужен Физикум</h2>
          <p>
            Физику часто считают сложной и скучной: формулы, законы, абстрактные задачи.
            Но на самом деле физика — это всё вокруг: от северного сияния и ракет до
            смартфона в твоём кармане. Физикум создан, чтобы показать эту красоту.
          </p>
          <p>
            Мы хотим, чтобы у каждого школьника было место, где можно понятно разобрать
            тему, узнать свежие новости науки, найти друзей-единомышленников и встретить
            наставника, который поможет дотянуться до мечты — олимпиаде, вузу, профессии
            будущего.
          </p>
        </section>

        <section className="about-section">
          <h2>🛠 Как создавался проект</h2>
          <p>
            Всё началось 16 августа 2026 года с простой идеи: сделать сайт про физику,
            который хочется открывать. Проект создавался с нуля — без готовых
            конструкторов: собственный дизайн, собственный код, собственные тексты.
          </p>
          <p>
            Физикум растёт шаг за шагом: сначала появились новости с фильтрами по
            регионам, затем страницы услуг и контактов, юридические документы.
            Впереди — большие разделы с теорией, форум и сообщество. Проект развивается
            на энтузиазме и при поддержке читателей — возможно, и твоей тоже!
          </p>
        </section>

        <section className="about-section">
          <h2>🎯 Задачи проекта</h2>
          <ul className="about-list">
            <li>Объяснять физику просто и понятно — на языке школьника, а не учебника</li>
            <li>Объединять школьников, которым интересна наука</li>
            <li>Рассказывать об олимпиадах, турнирах и событиях — в том числе в своём регионе</li>
            <li>Помогать находить репетиторов и наставников</li>
            <li>Публиковать новости науки так, чтобы было интересно даже новичку</li>
            <li>Поддерживать юных авторов: новости, научные работы и даже анекдоты про физику</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>✅ Что уже работает</h2>
          <ul className="about-list">
            <li>📰 Новости физики: в мире, в России, олимпиады и события по регионам</li>
            <li>💼 Услуги: репетиторы и подготовка (раздел развивается)</li>
            <li>📇 Контакты и связь с командой проекта</li>
            <li>📄 Юридические документы: политика, соглашение, согласие на обработку ПД</li>
            <li>🌙 Тёмная и светлая темы, удобная мобильная версия</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>🔭 Планы на будущее</h2>
          <ul className="about-list">
            <li>📚 Материалы и задачи по всем темам 7–11 классов</li>
            <li>💬 Форум и сообщество любителей физики</li>
            <li>✍️ Регистрация, личные кабинеты и возможность писать новости</li>
            <li>🔬 Публикация научных работ школьников и студентов</li>
            <li>🤝 Каталог репетиторов с отзывами</li>
          </ul>
        </section>

        <section className="about-quote">
          «Физика — это не скучные формулы, а способ понять, как устроена Вселенная»
        </section>
      </div>
    </main>
  )
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
// ============================================
const AppContent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'light'
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem('cookieAccepted') === 'true'
  })
  const [stars, setStars] = useState<{x: number; y: number; size: number; delay: number}[]>([])
  const [socialModal, setSocialModal] = useState<'max' | 'tg' | null>(null)
  const [socialCopied, setSocialCopied] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const newStars = Array.from({length: 50}, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1, delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])

  // Скролл наверх при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const openModal = (type: string) => { setModalType(type); setModalOpen(true) }
  const acceptCookies = () => { setCookieAccepted(true); localStorage.setItem('cookieAccepted', 'true') }
  const socialLinks = {
    max: { url: 'https://max.ru/join/u4jqdt9YuI7pJVBLpfm5P5V6VoQN8jDro6VdT_T_tsc', name: 'Физикум в MAX', icon: '💬' },
    tg: { url: 'https://t.me/physicym', name: 'Физикум в Телеграм', icon: '✈️' },
  }

  const openSocial = (platform: 'max' | 'tg') => {
    setSocialCopied(false)
    setSocialModal(platform)
  }

  const copySocialLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setSocialCopied(true)
    setTimeout(() => setSocialCopied(false), 2000)
  }
  return (
    <div className="app">
      {/* ЗВЁЗДЫ НА ФОНЕ */}
      <div className="stars">
        {stars.map((star, i) => (
          <div key={i} className="star" style={{
            left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }} />
        ))}
      </div>

      {/* ГРАДИЕНТНЫЕ ПЯТНА */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        openModal={openModal}
        currentPath={location.pathname}
      />

      <Routes>
        <Route path="/" element={<HomePage openModal={openModal} openSocial={openSocial} openSecret={() => setSecretOpen(true)} />} />
        <Route path="/news" element={<NewsListPage openModal={openModal} />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/services" element={<ServicesPage openModal={openModal} />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="*" element={
          <main className="page">
            <div className="empty-state">
              <div className="empty-emoji">🔭</div>
              <h2>Страница не найдена</h2>
              <p>Возможно, она находится в другой вселенной.</p>
              <Link to="/" className="btn btn-primary">На главную</Link>
            </div>
          </main>
        } />
      </Routes>

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

      {/* ПОДВАЛ */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">⚛️</span>
                <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
              </div>
              <p className="footer-description">Сайт про физику для школьников. Учимся, обсуждаем и влюбляемся в науку вместе.</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Проект</h4>
                <Link className="footer-link" to="/about">О проекте</Link>
                <Link className="footer-link" to="/contacts">Контакты</Link>
              </div>
              <div className="footer-column">
                <h4>Документы</h4>
                <Link className="footer-link" to="/terms">Пользовательское соглашение</Link>
                <Link className="footer-link" to="/privacy">Политика конфиденциальности</Link>
                <Link className="footer-link" to="/consent">Согласие на обработку ПД</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Физикум. Все права защищены.</p>
            <p className="footer-made">Сделано с ❤️ для любителей физики</p>
          </div>
        </div>
      </footer>

      <CookieBanner
        open={!cookieAccepted}
        onAccept={acceptCookies}
        onMore={() => navigate('/privacy')}
      />

      {/* СЕКРЕТНАЯ МОДАЛКА */}
      {secretOpen && (
        <div className="modal-overlay" onClick={() => setSecretOpen(false)}>
          <div className="modal-content secret-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSecretOpen(false)}>✕</button>
            <div className="secret-emoji">🔮</div>
            <h2 className="modal-title">Тсс… это секрет!</h2>
            <p className="modal-text">
              Здесь появится <span className="highlight">что-то особенное</span> —
              совсем скоро. Следи за обновлениями и будь первым, кто узнает!
            </p>
            <p className="modal-subtext">Рассказывай друзьям про Физикум — чем больше нас, тем скорее откроем секрет ✨</p>
            <button className="btn btn-primary btn-large" onClick={() => setSecretOpen(false)}>
              Понял, буду ждать!
            </button>
          </div>
        </div>
      )}

      {/* МАЛЕНЬКОЕ ОКНО СОЦСЕТЕЙ */}
      {socialModal && (
        <div className="modal-overlay" onClick={() => setSocialModal(null)}>
          <div className="social-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSocialModal(null)}>✕</button>
            <div className="social-modal-icon">{socialLinks[socialModal].icon}</div>
            <h3 className="social-modal-title">{socialLinks[socialModal].name}</h3>
            <p className="social-modal-hint">Нажми на ссылку, чтобы скопировать её:</p>
            <button
              className="social-link-box"
              onClick={() => copySocialLink(socialLinks[socialModal].url)}
            >
              {socialLinks[socialModal].url}
              <span className={`social-copy-icon ${socialCopied ? 'copied' : ''}`}>
                {socialCopied ? '✓ Скопировано!' : '📋'}
              </span>
            </button>
            <a
              className="btn btn-primary btn-large"
              href={socialLinks[socialModal].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Перейти на канал
            </a>
          </div>
        </div>
      )}
      <Modal open={modalOpen} type={modalType} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
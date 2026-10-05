import { useState, useEffect, type KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { NewsItem } from '../types'
import { newsData } from '../data/newsData'

interface HeaderProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  openModal: (t: string) => void
}

export const Header = ({ theme, toggleTheme, openModal }: HeaderProps) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInfo, setSearchInfo] = useState<{ query: string; count: number; current: number } | null>(null)
  const [newsMatches, setNewsMatches] = useState<NewsItem[]>([])

  const isActive = (path: string) =>
    location.pathname === path || (path === '/news' && location.pathname.startsWith('/news'))

  // Сброс поиска при переходе на другую страницу
  useEffect(() => {
    setSearchInfo(null)
    setNewsMatches([])
    window.getSelection()?.removeAllRanges()
  }, [location.pathname])

  const countMatchesOnPage = (q: string) => {
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const matches = document.body.innerText.match(new RegExp(escaped, 'gi'))
    return matches ? matches.length : 0
  }

  const startSearch = (q: string) => {
    const count = countMatchesOnPage(q)
    if (count > 0) {
      ;(window as any).find?.(q)
      setSearchInfo({ query: q, count, current: 1 })
    } else {
      setSearchInfo({ query: q, count: 0, current: 0 })
    }
    const lower = q.toLowerCase()
    setNewsMatches(
      newsData.filter(n =>
        n.title.toLowerCase().includes(lower) ||
        n.shortDescription.toLowerCase().includes(lower)
      )
    )
  }

  const findNext = () => {
    if (!searchInfo || searchInfo.count === 0) return
    ;(window as any).find?.(searchInfo.query)
    setSearchInfo({ ...searchInfo, current: (searchInfo.current % searchInfo.count) + 1 })
  }

  const findPrev = () => {
    if (!searchInfo || searchInfo.count === 0) return
    ;(window as any).find?.(searchInfo.query, false, true)
    setSearchInfo({ ...searchInfo, current: ((searchInfo.current - 2 + searchInfo.count) % searchInfo.count) + 1 })
  }

  const closeSearch = () => {
    setSearchInfo(null)
    setNewsMatches([])
    setSearchQuery('')
    window.getSelection()?.removeAllRanges()
  }

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = searchQuery.trim()
      if (!q) return
      if (searchInfo && searchInfo.query === q && searchInfo.count > 0) findNext()
      else startSearch(q)
    }
    if (e.key === 'Escape') closeSearch()
  }

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
        <Link className={`nav-link ${isActive('/materials') ? 'nav-active' : ''}`} to="/materials">Материалы</Link>
        <Link className={`nav-link ${isActive('/olympiads') ? 'nav-active' : ''}`} to="/olympiads">Олимпиады</Link>
        <button className="nav-link" onClick={() => openModal('Тренажёр')}>Тренажёр</button>
        <Link className={`nav-link ${isActive('/news') ? 'nav-active' : ''}`} to="/news">Новости</Link>
        <Link className={`nav-link ${isActive('/services') ? 'nav-active' : ''}`} to="/services">Услуги</Link>
        <button className="nav-link" onClick={() => openModal('Форум')}>Форум</button>
      </nav>
      <div className="header-right">
        <div className="search-wrapper">
          <div className="search-box">
            <span className="search-icon"></span>
            <input
              className="search-input"
              placeholder="Поиск по сайту..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          {searchInfo && (
            <div className="search-panel">
              <div className="search-panel-row">
                <span className="search-counter">
                  {searchInfo.count > 0 ? `${searchInfo.current} из ${searchInfo.count}` : 'На странице не найдено'}
                </span>
                <div className="search-panel-buttons">
                  <button className="search-panel-btn" onClick={findPrev} title="Предыдущее совпадение">↑</button>
                  <button className="search-panel-btn" onClick={findNext} title="Следующее совпадение">↓</button>
                  <button className="search-panel-btn" onClick={closeSearch} title="Закрыть поиск">✕</button>
                </div>
              </div>
              {newsMatches.length > 0 && (
                <div className="search-news-results">
                  <span className="search-news-label">📰 Найдено в новостях:</span>
                  {newsMatches.slice(0, 3).map(n => (
                    <Link key={n.id} to={`/news/${n.id}`} className="search-news-link" onClick={closeSearch}>
                      {n.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
          <span className="theme-icon">{theme === 'dark' ? '☀️' : ''}</span>
        </button>
        <button className="btn btn-ghost" onClick={() => openModal('Вход')}>Вход</button>
        <button className="btn btn-primary" onClick={() => openModal('Регистрация')}>Регистрация</button>
      </div>
    </header>
  )
}
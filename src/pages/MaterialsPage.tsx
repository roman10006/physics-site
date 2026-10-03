import { useState, useEffect, type CSSProperties } from 'react'

interface MaterialsPageProps {
  openModal: (t: string) => void
}

export const MaterialsPage = ({ openModal }: MaterialsPageProps) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => { document.title = 'Материалы по физике — Физикум' }, [])
  
  const grades = [
    { value: 'all', label: 'Все классы' },
    { value: '7', label: '7 класс' },
    { value: '8', label: '8 класс' },
    { value: '9', label: '9 класс' },
    { value: '10', label: '10 класс' },
    { value: '11', label: '11 класс' },
  ]
  
  const materialsCards = [
    { id: 'theory', icon: '', title: 'Теория', description: 'Простые объяснения тем школьной программы', color: '#4F7DF5' },
    { id: 'textbooks', icon: '📖', title: 'Учебники', description: 'Электронные учебники и справочники', color: '#10B981' },
    { id: 'video', icon: '🎥', title: 'Видеоуроки', description: 'Видео с опытами и объяснениями', color: '#EC4899' },
    { id: 'problems', icon: '🧩', title: 'Задачи', description: 'Задачи с решениями и подсказками', color: '#F59E0B' },
  ]
  
  return (
    <main className="page">
      <h1 className="page-title">Материалы <span className="gradient-text">по физике</span></h1>
      <p className="page-subtitle">Теория, учебники, видеоуроки и задачи для школьников 7-11 классов</p>
      <div className="materials-search-box">
        <span className="materials-search-icon"></span>
        <input
          className="materials-search-input"
          placeholder="Найти тему, например: Кинематика, Закон Ома..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              openModal('Поиск материалов')
            }
          }}
        />
      </div>
      <div className="materials-grade-selector">
        <label className="materials-grade-label">📚 Выбери свой класс (по желанию):</label>
        <select className="materials-grade-select" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
          {grades.map(g => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
      </div>
      <div className="materials-grid">
        {materialsCards.map(card => (
          <button
            key={card.id}
            className="materials-card"
            style={{ '--accent': card.color } as CSSProperties}
            onClick={() => openModal(card.title)}
          >
            <div className="materials-card-icon">{card.icon}</div>
            <h3 className="materials-card-title">{card.title}</h3>
            <p className="materials-card-desc">{card.description}</p>
            <div className="materials-card-arrow">→</div>
          </button>
        ))}
      </div>
    </main>
  )
}
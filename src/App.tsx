import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Состояние для модалки "скоро будет"
  const [modalOpen, setModalOpen] = useState(false)
  
  // Состояние для звёзд на фоне (анимация)
  const [stars, setStars] = useState<{x: number; y: number; size: number; delay: number}[]>([])

  // Генерируем звёзды при загрузке страницы
  useEffect(() => {
    const newStars = Array.from({length: 50}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])

  // Массив с нашими 4 кнопками
  const cards = [
    {
      id: 'theory',
      icon: '📚',
      title: 'Теория',
      description: 'Простые объяснения тем 7-11 классов',
      color: '#4F7DF5',
      size: 'large',
    },
    {
      id: 'anekdoty',
      icon: '😂',
      title: 'Анекдоты',
      description: 'Шутки про физику, которые заставят улыбнуться',
      color: '#F59E0B',
      size: 'small',
    },
    {
      id: 'events',
      icon: '🏆',
      title: 'События',
      description: 'Олимпиады, турниры и конференции',
      color: '#10B981',
      size: 'small',
    },
    {
      id: 'forum',
      icon: '💬',
      title: 'Форум',
      description: 'Общайся с другими любителями физики',
      color: '#EC4899',
      size: 'large',
    },
  ]

  return (
    <div className="app">
      {/* Анимированные звёзды на фоне */}
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

      {/* Декоративные градиентные пятна */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ШАПКА САЙТА */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⚛️</span>
          <span className="logo-text">Физик<span className="logo-accent">ум</span></span>
        </div>
        
        <div className="header-buttons">
          <button 
            className="btn btn-ghost"
            onClick={() => setModalOpen(true)}
          >
            Войти
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Регистрация
          </button>
        </div>
      </header>

      {/* ГЕРОЙ-СЕКЦИЯ */}
      <main className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Скоро открытие
        </div>
        
        <h1 className="hero-title">
          Физика — <span className="gradient-text">это круто</span>
        </h1>
        
        <p className="hero-subtitle">
          Теория, анекдоты, олимпиады и сообщество для школьников 7-11 классов.
          <br />
          Место, где физика становится интересной.
        </p>

        {/* BENTO-СЕТКА С КНОПКАМИ */}
        <div className="bento-grid">
          {cards.map(card => (
            <button
              key={card.id}
              className={`bento-card bento-${card.size}`}
              style={{ '--accent': card.color } as React.CSSProperties}
              onClick={() => setModalOpen(true)}
            >
              <div className="bento-icon">{card.icon}</div>
              <h3 className="bento-title">{card.title}</h3>
              <p className="bento-desc">{card.description}</p>
              <div className="bento-arrow">→</div>
            </button>
          ))}
        </div>
      </main>

      {/* БЕГУЩАЯ СТРОКА С ШУТКОЙ */}
      <div className="ticker">
        <div className="ticker-content">
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять». </span>
          <span>⚛️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.» </span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь. — Значит, чтобы больше знать, надо меньше знать. </span>
          {/* Дублируем для плавного эффекта */}
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять». </span>
          <span>⚛️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.» </span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь. — Значит, чтобы больше знать, надо меньше знать. </span>
        </div>
      </div>

      {/* МОДАЛКА "СКОРО БУДЕТ" */}
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
              Мне нужно заработать <span className="highlight">500 рублей</span> на VPS-сервер,
              чтобы эта функция заработала.
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
    </div>
  )
}

export default App
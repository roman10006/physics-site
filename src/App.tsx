import './App.css'

function App() {
  return (
    <div className="container">
      <div className="content">
        <div className="icon">⚛️</div>
        <h1>Сайт по физике для школьников</h1>
        <div className="coming-soon">
          <h2>Скоро всё будет!</h2>
          <p>Теория, анекдоты, репетиторы, олимпиады и форум</p>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Теория</h3>
            <p>Материалы 7-11 класс</p>
          </div>
          <div className="feature">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Репетиторы</h3>
            <p>Найди своего учителя</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <h3>Олимпиады</h3>
            <p>События и конкурсы</p>
          </div>
        </div>
        <div className="footer">
          <p>© 2026 Physics Site | Работаем над запуском 🚀</p>
        </div>
      </div>
    </div>
  )
}

export default App
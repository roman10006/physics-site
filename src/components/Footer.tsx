import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
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
  )
}
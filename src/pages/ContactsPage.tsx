import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ContactsPage = () => {
  const navigate = useNavigate()
  const [copiedType, setCopiedType] = useState<'tg' | 'support' | 'business' | null>(null)
  useEffect(() => { document.title = 'Контакты — Физикум' }, [])
  
  const copyText = async (text: string, type: 'tg' | 'support' | 'business') => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }
  
  return (
    <main className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1 className="page-title">Контакты</h1>
      <p className="page-subtitle">Всегда на связи!</p>
      <div className="contacts-grid">
        <div className="contact-card">
          <div className="contact-icon">✈️</div>
          <h3>Написать в Телеграм</h3>
          <p className="contact-desc">Самый быстрый способ связаться</p>
          <button className="contact-username" onClick={() => copyText('@Fababab', 'tg')}>
            @Fababab
            <span className={`social-copy-icon ${copiedType === 'tg' ? 'copied' : ''}`}>
              {copiedType === 'tg' ? '✓ Скопировано!' : ''}
            </span>
          </button>
          <a className="btn btn-primary" href="https://t.me/Fababab" target="_blank" rel="noopener noreferrer">
            Написать
          </a>
        </div>
        <div className="contact-card">
          <div className="contact-icon">📮</div>
          <h3>Для информации и помощи</h3>
          <p className="contact-desc">Вопросы по сайту и материалам</p>
          <button className="contact-username" onClick={() => copyText('support@fizikum.ru', 'support')}>
            support@fizikum.ru
            <span className={`social-copy-icon ${copiedType === 'support' ? 'copied' : ''}`}>
              {copiedType === 'support' ? '✓ Скопировано!' : '📋'}
            </span>
          </button>
          <a className="btn btn-primary" href="mailto:support@fizikum.ru">Написать</a>
        </div>
        <div className="contact-card">
          <div className="contact-icon">🤝</div>
          <h3>Для сотрудничества</h3>
          <p className="contact-desc">Репетиторам, партнёрам и СМИ</p>
          <button className="contact-username" onClick={() => copyText('business@fizikum.ru', 'business')}>
            business@fizikum.ru
            <span className={`social-copy-icon ${copiedType === 'business' ? 'copied' : ''}`}>
              {copiedType === 'business' ? '✓ Скопировано!' : '📋'}
            </span>
          </button>
          <a className="btn btn-primary" href="mailto:business@fizikum.ru">Написать</a>
        </div>
      </div>
    </main>
  )
}
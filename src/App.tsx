import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Modal } from './components/Modal'
import { CookieBanner } from './components/CookieBanner'

import { HomePage } from './pages/HomePage'
import { NewsDispatcher } from './pages/NewsDispatcher'
import { MaterialsPage } from './pages/MaterialsPage'
import { OlympiadsPage } from './pages/OlympiadsPage'
import { OlympiadDetailPage } from './pages/OlympiadDetailPage'
import { ServicesPage } from './pages/ServicesPage'
import { ContactsPage } from './pages/ContactsPage'
import { TodayPage } from './pages/TodayPage'
import { AboutPage } from './pages/AboutPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsPage } from './pages/TermsPage'
import { ConsentPage } from './pages/ConsentPage'

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
// Свечение вокруг курсора мыши
useEffect(() => {
  const glow = document.getElementById('cursorGlow')
  if (!glow) return
  
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let animationId: number
  
  const handleMouseMove = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
  }
  
  // Плавное следование за курсором (интерполяция)
  const animate = () => {
    currentX += (targetX - currentX) * 0.15
    currentY += (targetY - currentY) * 0.15
    glow.style.left = `${currentX}px`
    glow.style.top = `${currentY}px`
    animationId = requestAnimationFrame(animate)
  }
  
  window.addEventListener('mousemove', handleMouseMove)
  animationId = requestAnimationFrame(animate)
  
  // Скрываем свечение, когда курсор уходит со страницы
  const handleMouseLeave = () => { glow.style.opacity = '0' }
  const handleMouseEnter = () => { glow.style.opacity = '1' }
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseenter', handleMouseEnter)
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mouseenter', handleMouseEnter)
    cancelAnimationFrame(animationId)
  }
}, [])
  
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
  }, [location.pathname])
  
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const openModal = (type: string) => {
    setModalType(type)
    setModalOpen(true)
  }
  const acceptCookies = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookieAccepted', 'true')
  }
  
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
      <div className="cursor-glow" id="cursorGlow" />
      <Header theme={theme} toggleTheme={toggleTheme} openModal={openModal} />
      
      <Routes>
        <Route path="/" element={<HomePage openModal={openModal} openSocial={openSocial} />} />
        <Route path="/news" element={<NewsDispatcher openModal={openModal} />} />
        <Route path="/news/:param" element={<NewsDispatcher openModal={openModal} />} />
        <Route path="/materials" element={<MaterialsPage openModal={openModal} />} />
        <Route path="/olympiads" element={<OlympiadsPage />} />
        <Route path="/olympiads/:id" element={<OlympiadDetailPage />} />
        <Route path="/services" element={<ServicesPage openModal={openModal} />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/today" element={<TodayPage />} />
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
      
      <div className="ticker">
        <div className="ticker-content">
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять».</span>
          <span>️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.»</span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь.</span>
          <span>😂 Штирлиц стрелял вслепую. Слепая упала и зашептала «два-девять».</span>
          <span>⚛️ У Эйнштейна спросили: «Почему вы не пользуетесь мылом?» — «А зачем? У меня уже есть теория относительности.»</span>
          <span>🔬 Чем больше знаешь, тем больше не знаешь.</span>
        </div>
      </div>
      
      <Footer />
      
      <CookieBanner
        open={!cookieAccepted}
        onAccept={acceptCookies}
        onMore={() => navigate('/privacy')}
      />
      
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
interface CookieBannerProps {
  open: boolean
  onAccept: () => void
  onMore: () => void
}

export const CookieBanner = ({ open, onAccept, onMore }: CookieBannerProps) => {
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
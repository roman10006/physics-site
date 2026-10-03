interface ModalProps {
  open: boolean
  type: string
  onClose: () => void
}

export const Modal = ({ open, type, onClose }: ModalProps) => {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-emoji">🥺</div>
        <h2 className="modal-title">Пока что нету :(</h2>
        <p className="modal-text">
          Раздел <span className="highlight">«{type}»</span> появится, когда я куплю VPS-сервер.
        </p>
        <p className="modal-subtext">Но ты можешь помочь — расскажи про сайт друзьям!</p>
        <button className="btn btn-primary btn-large" onClick={onClose}>Понял, жду запуска!</button>
      </div>
    </div>
  )
}
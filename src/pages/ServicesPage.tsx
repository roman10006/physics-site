import { useEffect } from 'react'

interface ServicesPageProps {
  openModal: (t: string) => void
}

export const ServicesPage = ({ openModal }: ServicesPageProps) => {
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
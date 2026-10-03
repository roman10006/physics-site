import { useParams } from 'react-router-dom'
import { NewsDetailPage } from './NewsDetailPage'
import { NewsListPage } from './NewsListPage'

interface NewsDispatcherProps {
  openModal: (t: string) => void
}

export const NewsDispatcher = ({ openModal }: NewsDispatcherProps) => {
  const { param } = useParams<{ param: string }>()
  if (param && /^\d+$/.test(param)) {
    return <NewsDetailPage />
  }
  return <NewsListPage openModal={openModal} />
}
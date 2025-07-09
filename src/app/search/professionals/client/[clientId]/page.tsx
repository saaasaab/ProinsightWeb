import ClientIntroCard from '@/components/ClientIntroCard'
import '@/styles/components/_ProfessionalPage.scss'

interface ClientPageProps {
  params: {
    clientId: string
  }
}

export default function ClientPage({ params }: ClientPageProps) {
  return (
    <div className="client-page">
      <div className="client-header">
        <h1>Client Profile</h1>
        <p>Client ID: {params.clientId}</p>
      </div>
      
      <div className="client-content">
        <ClientIntroCard clientId={params.clientId} />
      </div>
    </div>
  )
} 
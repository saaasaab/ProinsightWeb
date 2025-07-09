import ProfessionalCarousel from '@/components/ProfessionalCarousel'
import '@/styles/components/_ProfessionalPage.scss'

interface ProfessionalPageProps {
  params: {
    id: string
  }
}

export default function ProfessionalPage({ params }: ProfessionalPageProps) {
  return (
    <div className="professional-page">
      <div className="professional-header">
        <h1>Professionals at Location</h1>
        <p>Pin ID: {params.id}</p>
      </div>
      
      <div className="professional-content">
        <ProfessionalCarousel pinId={params.id} />
      </div>
    </div>
  )
} 
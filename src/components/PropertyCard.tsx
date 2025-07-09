import Link from 'next/link'
import '@/styles/components/_PropertyCard.scss'

interface PropertyCardProps {
  id: string
  title: string
  value: string
  income: string
  type: string
}

export default function PropertyCard({ id, title, value, income, type }: PropertyCardProps) {
  return (
    <div className="property-card">
      <div className="property-header">
        <h3>{title}</h3>
        <span className="property-type">{type}</span>
      </div>
      
      <div className="property-stats">
        <div className="stat-item">
          <label>Current Value</label>
          <span className="stat-value">{value}</span>
        </div>
        
        <div className="stat-item">
          <label>Annual Income</label>
          <span className="stat-value">{income}</span>
        </div>
      </div>
      
      <div className="property-actions">
        <Link href={`/deep-dive/property/${id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  )
} 
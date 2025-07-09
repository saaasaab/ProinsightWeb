import PropertyCard from '@/components/PropertyCard'
import '@/styles/components/_DeepDive.scss'

export default function DeepDivePage() {
  return (
    <div className="deep-dive-page">
      <div className="deep-dive-header">
        <h1>Deep Dive Portfolio</h1>
        <p>Detailed property analysis and insights</p>
      </div>
      
      <div className="portfolio-grid">
        <PropertyCard 
          id="1"
          title="Downtown Office Complex"
          value="$2.5M"
          income="$180K/year"
          type="Commercial"
        />
        <PropertyCard 
          id="2"
          title="Residential Portfolio"
          value="$1.8M"
          income="$120K/year"
          type="Residential"
        />
        <PropertyCard 
          id="3"
          title="Industrial Warehouse"
          value="$3.2M"
          income="$250K/year"
          type="Industrial"
        />
      </div>
    </div>
  )
} 
import '@/styles/components/_DeepDive.scss'

interface PropertyPageProps {
  params: {
    propertyId: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return (
    <div className="property-page">
      <div className="property-header">
        <h1>Property Details</h1>
        <p>Property ID: {params.propertyId}</p>
      </div>
      
      <div className="property-content">
        <div className="property-info">
          <div className="info-section">
            <h2>Property Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Property Type:</label>
                <span>Commercial Office</span>
              </div>
              <div className="info-item">
                <label>Address:</label>
                <span>123 Main Street, Downtown</span>
              </div>
              <div className="info-item">
                <label>Square Footage:</label>
                <span>25,000 sq ft</span>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h2>Financial Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Current Value:</label>
                <span>$2,500,000</span>
              </div>
              <div className="info-item">
                <label>Annual Income:</label>
                <span>$180,000</span>
              </div>
              <div className="info-item">
                <label>ROI:</label>
                <span>7.2%</span>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h2>Owner Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Owner:</label>
                <span>ABC Properties LLC</span>
              </div>
              <div className="info-item">
                <label>Contact:</label>
                <span>contact@abcproperties.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
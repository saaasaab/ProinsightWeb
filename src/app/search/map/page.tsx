import '@/styles/components/_SearchPage.scss'

export default function MapPage() {
  return (
    <div className="map-page">
      <div className="map-header">
        <h1>Interactive Map</h1>
        <div className="map-controls">
          <button className="control-btn">Layers</button>
          <button className="control-btn">Filters</button>
          <button className="control-btn">Export</button>
        </div>
      </div>
      
      <div className="map-container">
        <div className="map-view">
          {/* Map component will be rendered here */}
          <div className="map-placeholder">
            Interactive Map View
          </div>
        </div>
        
        <div className="map-sidebar">
          <div className="map-info">
            <h3>Map Information</h3>
            <p>Select properties to view detailed information</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
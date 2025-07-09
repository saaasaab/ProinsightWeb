'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/styles/components/_MapPreview.scss'

export default function MapPreview() {
  const [selectedPin, setSelectedPin] = useState<string | null>(null)

  const mockPins = [
    { id: '1', x: 20, y: 30, type: 'commercial' },
    { id: '2', x: 60, y: 40, type: 'residential' },
    { id: '3', x: 80, y: 70, type: 'industrial' },
  ]

  return (
    <div className="map-preview">
      <div className="map-header">
        <h3>Property Map</h3>
        <Link href="/search/map" className="fullscreen-link">
          Fullscreen View
        </Link>
      </div>
      
      <div className="map-container">
        <div className="map-view">
          {/* Mock map with pins */}
          <div className="map-background">
            {mockPins.map(pin => (
              <div
                key={pin.id}
                className={`map-pin ${pin.type} ${selectedPin === pin.id ? 'selected' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onClick={() => setSelectedPin(pin.id)}
              >
                <div className="pin-marker"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="map-controls">
          <button className="control-btn">Zoom In</button>
          <button className="control-btn">Zoom Out</button>
          <button className="control-btn">Reset View</button>
        </div>
      </div>
      
      {selectedPin && (
        <div className="pin-info">
          <h4>Property {selectedPin}</h4>
          <p>Click to view details</p>
          <Link href={`/search/professionals/${selectedPin}`} className="view-btn">
            View Professionals
          </Link>
        </div>
      )}
    </div>
  )
} 
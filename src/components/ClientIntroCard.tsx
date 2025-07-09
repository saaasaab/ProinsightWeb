'use client'

import { useState } from 'react'
import '@/styles/components/_ClientIntroCard.scss'

interface ClientIntroCardProps {
  clientId: string
}

export default function ClientIntroCard({ clientId }: ClientIntroCardProps) {
  const [showIntro, setShowIntro] = useState(false)

  const mockClient = {
    id: clientId,
    name: 'John Smith',
    company: 'Smith Investments LLC',
    title: 'Managing Partner',
    email: 'john.smith@smithinvestments.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced real estate investor with over 15 years in commercial property management and development.',
    interests: ['Commercial Real Estate', 'Property Development', 'Investment Analysis'],
    portfolio: {
      properties: 25,
      totalValue: '$15.2M',
      avgROI: '8.3%'
    }
  }

  return (
    <div className="client-intro-card">
      <div className="client-header">
        <div className="client-avatar">
          <div className="avatar-placeholder">{mockClient.name.split(' ').map(n => n[0]).join('')}</div>
        </div>
        
        <div className="client-info">
          <h2>{mockClient.name}</h2>
          <p className="client-title">{mockClient.title}</p>
          <p className="client-company">{mockClient.company}</p>
        </div>
      </div>
      
      <div className="client-details">
        <div className="contact-info">
          <div className="contact-item">
            <label>Email:</label>
            <a href={`mailto:${mockClient.email}`}>{mockClient.email}</a>
          </div>
          <div className="contact-item">
            <label>Phone:</label>
            <a href={`tel:${mockClient.phone}`}>{mockClient.phone}</a>
          </div>
        </div>
        
        <div className="client-bio">
          <h3>About</h3>
          <p>{mockClient.bio}</p>
        </div>
        
        <div className="client-interests">
          <h3>Areas of Interest</h3>
          <div className="interest-tags">
            {mockClient.interests.map(interest => (
              <span key={interest} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="client-portfolio">
          <h3>Portfolio Overview</h3>
          <div className="portfolio-stats">
            <div className="portfolio-stat">
              <span className="stat-number">{mockClient.portfolio.properties}</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-number">{mockClient.portfolio.totalValue}</span>
              <span className="stat-label">Total Value</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-number">{mockClient.portfolio.avgROI}</span>
              <span className="stat-label">Avg ROI</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="client-actions">
        <button 
          className="intro-btn"
          onClick={() => setShowIntro(!showIntro)}
        >
          {showIntro ? 'Hide' : 'Show'} Introduction
        </button>
        
        {showIntro && (
          <div className="intro-form">
            <h3>Send Introduction</h3>
            <form className="intro-form-content">
              <div className="form-group">
                <label>Your Message:</label>
                <textarea 
                  placeholder="Introduce yourself and explain your interest..."
                  rows={4}
                />
              </div>
              <button type="submit" className="send-intro-btn">
                Send Introduction
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
} 
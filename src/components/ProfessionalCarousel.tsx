'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/styles/components/_ProfessionalCarousel.scss'

interface ProfessionalCarouselProps {
  pinId: string
}

interface Professional {
  id: string
  name: string
  title: string
  company: string
  rating: number
  specialties: string[]
  avatar: string
}

export default function ProfessionalCarousel({ pinId }: ProfessionalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mockProfessionals: Professional[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Commercial Real Estate Agent',
      company: 'Johnson Properties',
      rating: 4.8,
      specialties: ['Commercial', 'Investment', 'Leasing'],
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Property Manager',
      company: 'Chen Management Group',
      rating: 4.6,
      specialties: ['Property Management', 'Tenant Relations'],
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Real Estate Attorney',
      company: 'Rodriguez Law',
      rating: 4.9,
      specialties: ['Legal', 'Contracts', 'Due Diligence'],
      avatar: 'ER'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockProfessionals.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockProfessionals.length) % mockProfessionals.length)
  }

  return (
    <div className="professional-carousel">
      <div className="carousel-header">
        <h3>Professionals at Location {pinId}</h3>
        <div className="carousel-controls">
          <button onClick={prevSlide} className="carousel-btn">‹</button>
          <span className="carousel-indicator">
            {currentIndex + 1} / {mockProfessionals.length}
          </span>
          <button onClick={nextSlide} className="carousel-btn">›</button>
        </div>
      </div>
      
      <div className="carousel-container">
        <div className="carousel-track">
          {mockProfessionals.map((professional, index) => (
            <div
              key={professional.id}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="professional-card">
                <div className="professional-avatar">
                  <div className="avatar-placeholder">{professional.avatar}</div>
                </div>
                
                <div className="professional-info">
                  <h4>{professional.name}</h4>
                  <p className="professional-title">{professional.title}</p>
                  <p className="professional-company">{professional.company}</p>
                  
                  <div className="professional-rating">
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-number">{professional.rating}</span>
                  </div>
                  
                  <div className="professional-specialties">
                    {professional.specialties.map(specialty => (
                      <span key={specialty} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/search/professionals/client/${professional.id}`}
                    className="contact-btn"
                  >
                    Contact Professional
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
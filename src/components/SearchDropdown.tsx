'use client'

import { useState } from 'react'
import '@/styles/components/_SearchDropdown.scss'

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: '',
    location: '',
    priceRange: '',
    size: ''
  })

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed Use']
  const locations = ['Downtown', 'Suburban', 'Rural', 'Waterfront']
  const priceRanges = ['Under $500K', '$500K - $1M', '$1M - $2M', '$2M+']
  const sizes = ['Under 1K sq ft', '1K - 5K sq ft', '5K - 10K sq ft', '10K+ sq ft']

  return (
    <div className="search-dropdown">
      <div className="search-header">
        <h3>Search Filters</h3>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>
      
      {isOpen && (
        <div className="search-filters">
          <div className="filter-group">
            <label>Property Type</label>
            <select 
              value={selectedFilters.propertyType}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                propertyType: e.target.value
              })}
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Location</label>
            <select 
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                location: e.target.value
              })}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range</label>
            <select 
              value={selectedFilters.priceRange}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                priceRange: e.target.value
              })}
            >
              <option value="">All Prices</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Size</label>
            <select 
              value={selectedFilters.size}
              onChange={(e) => setSelectedFilters({
                ...selectedFilters,
                size: e.target.value
              })}
            >
              <option value="">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <button className="search-btn">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
} 
"use client"

import '@/styles/components/_SearchPage.scss'
import { FiMenu, FiBell, FiFilter, FiSearch, FiX, FiStar, FiCheck, FiInfo } from 'react-icons/fi'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Select from 'react-select'
import Link from 'next/link'

const PROFESSIONS = [
  'Real Estate Agent',
  'Broker',
  'Appraiser',
  'Inspector',
  'Property Manager',
  'Mortgage Lender',
  'Title Officer',
  'Escrow Officer',
  'Attorney',
  'Contractor',
  'Home Stager',
  'Photographer',
  'Insurance Agent',
]

const professionOptions = PROFESSIONS.map(p => ({ value: p, label: p }))

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="info-tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      <FiInfo className="filter-block-info" />
      {show && <span className="info-tooltip">{text}</span>}
    </span>
  )
}

export default function SearchPage() {
  const { theme } = useTheme()

  // Recent searches state
  const [recentSearches, setRecentSearches] = useState([
    'Clackamas County, OR',
    'Charles Billings',
    'Elmer Fudge',
    'Lord Helmet',
    'Texas County, AK',
    'Real Estate Agents',
  ])
  const removeSearch = (item: string) => setRecentSearches(recentSearches.filter(s => s !== item))
  const clearAllSearches = () => setRecentSearches([])

  // Profession filter state
  const [selectedProfession, setSelectedProfession] = useState<{ value: string; label: string } | null>(null)

  // Search bar state
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={`search-page ${theme}-theme`}>
      {/* Subtitle/Stats */}
      <div className="search-stats-bar">
        <span>Over <b>10,000</b> Curated Professionals</span>
      </div>

      <main className="search-main-content">
        {/* Filter by profession */}
        <div className="filter-block">
          <div className="filter-block-header">
            <span className="filter-block-label">Filter by profession</span>
            <InfoTooltip text="Select a profession to filter the results. Only one can be selected at a time." />
          </div>
          <div className="filter-block-dropdown">
            <FiFilter className="filter-block-icon" />
            <div className="filter-block-select">
              <Select
                classNamePrefix="gold-select"
                options={professionOptions}
                value={selectedProfession}
                onChange={option => setSelectedProfession(option)}
                placeholder="No Filters Applied"
                isClearable
                menuPlacement="auto"
                menuPosition="fixed"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    minHeight: 'unset',
                  }),
                  valueContainer: base => ({ ...base, padding: 0 }),
                  input: base => ({ ...base, color: '#bfa046', fontWeight: 500, fontSize: '1rem' }),
                  placeholder: base => ({ ...base, color: '#bfa046', fontWeight: 500, fontSize: '1rem' }),
                  singleValue: base => ({ ...base, color: '#bfa046', fontWeight: 500, fontSize: '1rem' }),
                  dropdownIndicator: base => ({ ...base, display: 'none' }),
                  indicatorSeparator: base => ({ ...base, display: 'none' }),
                  menu: base => ({ ...base, background: '#181818', color: '#bfa046', fontSize: '1rem', border: '1px solid #bfa046', borderRadius: 8, zIndex: 20 }),
                  option: (base, state) => ({
                    ...base,
                    background: state.isSelected ? '#bfa046' : state.isFocused ? '#222' : 'transparent',
                    color: state.isSelected ? '#181818' : '#bfa046',
                    fontWeight: state.isSelected ? 700 : 500,
                    cursor: 'pointer',
                  }),
                  clearIndicator: base => ({ ...base, color: '#bfa046' }),
                }}
                onMenuClose={() => {}}
                onMenuOpen={() => {}}
                onBlur={() => {}}
                theme={selectTheme => ({
                  ...selectTheme,
                  borderRadius: 8,
                  colors: {
                    ...selectTheme.colors,
                    primary25: '#222',
                    primary: '#bfa046',
                    neutral0: '#181818',
                    neutral80: '#bfa046',
                  },
                })}
              />
            </div>
          </div>
          <div className="filter-block-underline" />
        </div>

        {/* Search Bar */}
        <div className="search-block">
          <div className="search-block-header">
            <span className="search-block-label">Search professional, city, or county</span>
            <InfoTooltip text="Type a name, city, or county to search for professionals." />
          </div>
          <div className="search-block-row">
            <FiSearch className="search-block-icon" />
            <input
              className="search-block-input"
              type="text"
              placeholder="Search for who you’re looking for..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          <div className="search-block-underline" />
        </div>

        {/* Map Section */}
        <Link href="/search/map" className="search-map-section-link">
          <div className="search-map-section" tabIndex={0} role="button">
            <div className="search-block-header">
              <span className="search-block-label">
                <FiSearch className="search-block-icon" style={{ marginRight: '0.5rem' }} />
                Find professionals on the map
              </span>
            </div>
            <div className="search-map-preview">
              {/* Replace with real map component */}
              <img src="/globe.svg" alt="US Map" className="map-img" />
            </div>
          </div>
        </Link>

        {/* Recent Searches */}
        <div className="recent-searches-section">
          <div className="recent-searches-header">
            <span>Recent Searches</span>
            <button className="clear-all-btn" onClick={clearAllSearches}>Clear All</button>
          </div>
          <ul className="recent-searches-list">
            {recentSearches.length === 0 && (
              <li className="recent-search-item" style={{ color: '#888' }}>No recent searches</li>
            )}
            {recentSearches.map((item) => (
              <li key={item} className="recent-search-item">
                <button className="recent-search-link yellow">{item}</button>
                <div className="recent-search-icons">
                  <button className="icon-btn" aria-label="Remove" onClick={() => removeSearch(item)}><FiX /></button>
                  <button className="icon-btn" aria-label="Favorite"><FiStar /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
} 
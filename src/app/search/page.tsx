"use client"

import { FiMenu, FiBell, FiFilter, FiSearch, FiX, FiStar, FiCheck, FiInfo } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import statesData from '@/data/statesnames.json'
import countiesData from '@/data/counties.json'
import citiesData from '@/data/cities.json'
import professionsData from '@/data/professions.json'
import professionCategoriesData from '@/data/professioncategories.json'
const DynamicMap = dynamic(() => import('@/components/MapComponent'), { ssr: false })
const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })


import 'leaflet/dist/leaflet.css'
import '@/styles/components/_SearchPage.scss'

// Create a map of category codes to category names for easy lookup
const categoryMap = professionCategoriesData.reduce((acc, category) => {
  acc[category.categorycode] = category.categoryname
  return acc
}, {} as Record<string, string>)

// State code to file name mapping
const stateToFileName: Record<string, string> = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'NewHampshire',
  'NJ': 'NewJersey',
  'NM': 'NewMexico',
  'NY': 'NewYork',
  'NC': 'NorthCarolina',
  'ND': 'NorthDakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'RhodeIsland',
  'SC': 'SouthCarolina',
  'SD': 'SouthDakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'WestVirginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming',
  'DC': 'DistrictOfColumbia'
}

// Transform professions data for easier searching
const professionsList = professionsData.map(profession => ({
  value: profession.profession,
  label: profession.profession,
  type: 'profession',
  professionCode: profession.professioncode,
  categoryCode: profession.categorycode,
  categoryName: categoryMap[profession.categorycode] || 'Unknown',
  minimumTransactions: profession.minimumtransactions,
  isRole: profession.isrole || false
}))

const professionOptions = professionsList.map(p => ({ value: p.value, label: p.label }))

// Transform states data for easier searching
const statesList = statesData.map(state => {
  const [abbreviation, name] = Object.entries(state)[0]
  return { value: name, label: name, type: 'state', abbreviation }
})

// Transform counties data for easier searching
const countiesList = countiesData.flatMap(stateData =>
  stateData.counties.map(county => ({
    value: `${county.name} County, ${stateData.state}`,
    label: `${county.name} County, ${stateData.state}`,
    type: 'county',
    state: stateData.state,
    stateName: stateData.statename,
    countyName: county.name,
    population: county.population
  }))
)

// Transform cities data for easier searching
const citiesList = (citiesData as any[]).flatMap((stateData: any) => {
  if (!stateData.cities) return []

  return Object.entries(stateData.cities).map(([cityCode, cityData]: [string, any]) => ({
    value: `${cityData.city}, ${stateData.state || cityCode.split('-')[0]}`,
    label: `${cityData.city}, ${stateData.state || cityCode.split('-')[0]}`,
    type: 'city',
    cityName: cityData.city,
    state: stateData.state || cityCode.split('-')[0],
    countyCode: cityData.countycode,
    zipCodes: cityData.zips || []
  }))
})

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
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{ value: string; label: string; type: string;[key: string]: any }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{ value: string; label: string; type: string;[key: string]: any }>>([])
  const [displayedResults, setDisplayedResults] = useState<Array<{ value: string; label: string; type: string;[key: string]: any }>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [peopleData, setPeopleData] = useState<any[]>([])
  const [showPeopleResults, setShowPeopleResults] = useState(false)

  // Search functionality
  const handleSearchChange = (value: string) => {
    setSearchValue(value)

    if (value.trim().length < 2) {
      setSearchSuggestions([])
      setShowSuggestions(false)
      setSearchResults([])
      setDisplayedResults([])
      setCurrentPage(1)
      setHasMoreResults(false)
      return
    }

    const searchTerm = value.toLowerCase()
    const suggestions = []

    // Search states
    const stateMatches = statesList.filter(state =>
      state.label.toLowerCase().includes(searchTerm) ||
      state.abbreviation.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    // Search counties
    const countyMatches = countiesList.filter(county =>
      county.label.toLowerCase().includes(searchTerm) ||
      county.countyName.toLowerCase().includes(searchTerm) ||
      county.stateName.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    // Search cities
    const cityMatches = citiesList.filter(city =>
      city.label.toLowerCase().includes(searchTerm) ||
      city.cityName.toLowerCase().includes(searchTerm) ||
      city.state.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    // Search professions
    const professionMatches = professionsList.filter(profession =>
      profession.label.toLowerCase().includes(searchTerm) ||
      profession.categoryName.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    suggestions.push(...stateMatches, ...countyMatches, ...cityMatches, ...professionMatches)

    setSearchSuggestions(suggestions)
    setShowSuggestions(suggestions.length > 0)

    // Update search results for the right panel
    const allResults = []

    // Add more comprehensive results for the right panel
    const allStateMatches = statesList.filter(state =>
      state.label.toLowerCase().includes(searchTerm) ||
      state.abbreviation.toLowerCase().includes(searchTerm)
    )

    const allCountyMatches = countiesList.filter(county =>
      county.label.toLowerCase().includes(searchTerm) ||
      county.countyName.toLowerCase().includes(searchTerm) ||
      county.stateName.toLowerCase().includes(searchTerm)
    )

    const allCityMatches = citiesList.filter(city =>
      city.label.toLowerCase().includes(searchTerm) ||
      city.cityName.toLowerCase().includes(searchTerm) ||
      city.state.toLowerCase().includes(searchTerm)
    )

    const allProfessionMatches = professionsList.filter(profession =>
      profession.label.toLowerCase().includes(searchTerm) ||
      profession.categoryName.toLowerCase().includes(searchTerm)
    )

    allResults.push(...allStateMatches, ...allCountyMatches, ...allCityMatches, ...allProfessionMatches)
    setSearchResults(allResults)

    // Reset pagination and load first batch
    setCurrentPage(1)
    const firstBatch = allResults.slice(0, 100)

    setDisplayedResults(firstBatch)
    setHasMoreResults(allResults.length > 100)
  }

  // Load more results function
  const loadMoreResults = () => {
    if (isLoadingMore || !hasMoreResults) return

    setIsLoadingMore(true)

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = (nextPage - 1) * 100
      const endIndex = startIndex + 100
      const newBatch = searchResults.slice(startIndex, endIndex)

      setDisplayedResults(prev => [...prev, ...newBatch])
      setCurrentPage(nextPage)
      setHasMoreResults(endIndex < searchResults.length)
      setIsLoadingMore(false)
    }, 300)
  }

  // Infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight


    // Load more when user scrolls to 80% of the content
    if (scrollPercentage > 0.8 && hasMoreResults && !isLoadingMore) {
      loadMoreResults()
    }
  }

  const handleSuggestionClick = (suggestion: { value: string; label: string; type: string }) => {
    setSearchValue(suggestion.label)
    setShowSuggestions(false)

    // Add to recent searches if not already there
    if (!recentSearches.includes(suggestion.label)) {
      setRecentSearches(prev => [suggestion.label, ...prev.slice(0, 5)])
    }
  }

  // Handle search result click
  const handleResultClick = async (result: { value: string; label: string; type: string;[key: string]: any }) => {
    try {
      let peopleData: any[] = []

      if (result.type === 'state') {
        // Load state JSON file
        const stateCode = result.abbreviation
        const fileName = `${stateToFileName[stateCode]}.json`

        // Import the JSON file
        const jsonData = await import(`@/data/people/icons/profession-realtor/${fileName}`)

        // JSON data is already parsed
        peopleData = jsonData.default || jsonData

      } else if (result.type === 'county') {
        // Load state JSON and filter by county
        const stateCode = result.state
        const countyName = result.countyName
        const fileName = `${stateToFileName[stateCode]}.json`

        // Create county code: state abbreviation + county name (no spaces)
        const countyCode = `${stateCode}-${countyName.replace(/\s+/g, '').toLowerCase()}`

        const jsonData = await import(`@/data/people/icons/profession-realtor/${fileName}`)

        // Find all cities in this county
        const citiesInCounty = Object.entries(citiesList).filter(([cityCode, cityData]) => {
          return cityData.countyCode === countyCode
        }).map(([_cityCode, cityData]) => cityData.cityName)

        console.log('Cities in county:', citiesInCounty)

        // Filter professionals by cities in this county
        const allPeople = jsonData.default || jsonData
        peopleData = allPeople.filter((person: any) =>
          person.city && citiesInCounty.includes(person.city)
        )

      } else if (result.type === 'city') {
        // Load state JSON and filter by city
        const stateCode = result.state
        const cityName = result.cityName
        const fileName = `${stateToFileName[stateCode]}.json`

        const jsonData = await import(`@/data/people/icons/profession-realtor/${fileName}`)

        // Filter by city
        const allPeople = jsonData.default || jsonData
        peopleData = allPeople.filter((person: any) =>
          person.city && person.city.toLowerCase().includes(cityName.toLowerCase())
        )
      }

      console.log(`Found ${peopleData.length} people for ${result.label}:`, peopleData)

      // Set the people data and show results
      setPeopleData(peopleData)
      setShowPeopleResults(true)

    } catch (error) {
      console.error('Error loading people data:', error)
      setPeopleData([])
      setShowPeopleResults(true)
    }
  }

  // Handle search result click
  return (
    <div className={`search-page ${theme}-theme`}>
      {/* Subtitle/Stats */}
      <div className="search-stats-bar">
        <span>Over <b>10,000</b> Curated Professionals</span>
      </div>

      <main className="search-main-content">
        <div className="search-container">
          <div className="search-left-panel">
           

            {/* Filter by profession */}
            <div className="filter-block">
              <div className="filter-block-header">
                <span className="filter-block-label">Filter by profession</span>
                <InfoTooltip text="Select a profession to filter the results. Only one can be selected at a time." />
              </div>
              <div className="filter-block-dropdown">
                <FiFilter className="filter-block-icon" />
                <div className="filter-block-select">
                  <DynamicSelect
                    classNamePrefix="gold-select"
                    options={professionOptions}
                    value={selectedProfession}
                    onChange={(option) => setSelectedProfession(option as { value: string; label: string } | null)}
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
                    onMenuClose={() => { }}
                    onMenuOpen={() => { }}
                    onBlur={() => { }}
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

            {/* Map Section */}
            <Link href="/search/map" className="search-map-section-link">
              <div className="search-map-section" tabIndex={0} role="button">
                <div className="search-block-header">
                  <span className="search-block-label">
                    Find professionals on the map
                  </span>
                  <InfoTooltip text="Click the map to view professionals in that area." />
                </div>
                <div className="search-map-preview">
                  {/* <DynamicMap /> */}
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
          </div>

          {/* Search Results Panel */}
          <div className="search-right-panel">
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
                  onChange={e => handleSearchChange(e.target.value)}
                  onFocus={() => searchValue.trim().length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
              </div>
              <div className="search-block-underline" />

              {/* Search Suggestions */}
              {/* {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.type}-${index}`}
                      className="search-suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                      type="button"
                    >
                      <div className="suggestion-content">
                        <span className="suggestion-label">{suggestion.label}</span>
                        <span className="suggestion-type">{suggestion.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )} */}
            </div>
            
            <div className="search-results-header">
              <div className="search-results-title-section">
                <span className="search-results-title">Search Results</span>
                {showPeopleResults && (
                  <button
                    className="back-to-search-btn"
                    onClick={() => {
                      setShowPeopleResults(false)
                      setPeopleData([])
                    }}
                  >
                    Back to Search
                  </button>
                )}
              </div>
              {searchValue.trim().length >= 2 && !showPeopleResults && (
                <span className="search-results-count">
                  Showing {displayedResults.length} of {searchResults.length} results for "{searchValue}"
                </span>
              )}
              {showPeopleResults && (
                <span className="search-results-count">
                  {peopleData.length > 0 ? `${peopleData.length} professionals found` : 'No professionals found in this area'}
                </span>
              )}
            </div>

            <div className="search-results-content" onScroll={handleScroll}>
              {showPeopleResults ? (
                // Show people results
                <div className="people-results">
                  {peopleData.length === 0 ? (
                    <div className="no-professionals-message">
                      <h3>No Professionals Found</h3>
                      <p>There are currently no professionals in this area. Try searching for a different location or profession.</p>
                      <button
                        className="back-to-search-btn"
                        onClick={() => {
                          setShowPeopleResults(false)
                          setPeopleData([])
                        }}
                      >
                        Back to Search
                      </button>
                    </div>
                  ) : (

                    <div className="professionals-grid">
                      {peopleData.map((person, index) => (
                        <div key={person.uuid || index} className="professional-card">
                          <div className="professional-avatar">
                            {person.avatar ? (
                              <img src={person.avatar} alt={`${person.firstname} ${person.lastname}`} />
                            ) : (
                              <div className="avatar-placeholder">
                                {person.firstname?.[0]}{person.lastname?.[0]}
                              </div>
                            )}
                          </div>
                          <div className="professional-info">
                            <h4>{person.firstname} {person.lastname}</h4>
                            <p className="professional-brokerage">{person.brokerage}</p>
                            <p className="professional-location">{person.city}, {person.state}</p>
                            {person.sales && (
                              <p className="professional-sales">Sales: {person.sales}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Show regular search results
                <>
                  {searchValue.trim().length < 2 ? (
                    <div className="search-results-empty">
                      <p>Start typing to see search results</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="search-results-empty">
                      <p>No results found for "{searchValue}"</p>
                    </div>
                  ) : (
                    <div className="search-results-list">
                      {displayedResults.map((result, index) => (
                        <div
                          key={`${result.type}-${index}`}
                          className="search-result-item"
                          onClick={() => handleResultClick(result)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="result-content">
                            <span className="result-label">{result.label}</span>
                            <span className="result-type">{result.type}</span>
                          </div>
                          {result.population && (
                            <span className="result-population">
                              Population: {result.population.toLocaleString()}
                            </span>
                          )}
                          {result.zipCodes && result.zipCodes.length > 0 && (
                            <span className="result-zipcodes">
                              ZIP Codes: {result.zipCodes.slice(0, 3).join(', ')}
                              {result.zipCodes.length > 3 && ` (+${result.zipCodes.length - 3} more)`}
                            </span>
                          )}
                          {result.categoryName && result.type === 'profession' && (
                            <span className="result-category">
                              Category: {result.categoryName}
                              {result.minimumTransactions > 0 && ` • Min Transactions: ${result.minimumTransactions}`}
                              {result.isRole && ` • Role`}
                            </span>
                          )}
                        </div>
                      ))}

                      {/* Loading indicator for infinite scroll */}
                      {isLoadingMore && (
                        <div className="loading-indicator">
                          <div className="loading-spinner"></div>
                          <span>Loading more results...</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 
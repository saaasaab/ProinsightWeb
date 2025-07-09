export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  title?: string
  bio?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Property {
  id: string
  title: string
  address: string
  propertyType: 'residential' | 'commercial' | 'industrial' | 'mixed'
  squareFootage: number
  currentValue: number
  annualIncome: number
  roi: number
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface Professional {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  rating: number
  specialties: string[]
  bio: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface SearchFilters {
  propertyType?: string
  location?: string
  priceRange?: string
  size?: string
  roi?: string
}

export interface MapPin {
  id: string
  latitude: number
  longitude: number
  propertyId?: string
  professionalId?: string
  type: 'property' | 'professional'
} 
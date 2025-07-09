export interface User {
  email: string
  invitationId: string
  invitedById: string
  membershipLevel: number
  lastAcceptedEulaDate: string // ISO date string
  lastRegistrationSubmissionDate: string // ISO date string
  registrationStage: number
  id: string
  avatar: string | null
  business: string
  cityCode: string
  countyCode: string
  firstName: string
  lastName: string
  lat: number
  lon: number
  license: string
  networkId: string
  phone: string
  professionCode: string
  sales: number
  state: string
  summary: string | null
  video: string | null
  websites: string[]
  zip: string
  alias: string
  lastModifiedDate: string // ISO date string
  _ts: number // epoch timestamp
}


// {
//   "partition": "016",
//   "b2cid": "10eb958b-aedb-4950-99be-a8c193a85e21",
//   "invitationid": "ef4fa1c4-7725-450f-bcda-d3bc346e53bd",
//   "invitedbyid": "c44a3d00-af71-43f2-9f79-73f5701cf7c3",
//   "stripepublicid": "b3b0b891-0cb1-4860-8355-627b402dfdbf",
//   "stripecustomerid": "cus_NomlsO6FxZ1XZH",
//   "stripecurrentperiodend": "2023-06-02T02:45:55Z",
//   "stripeinquirydate": "2023-05-02T02:46:00.1797223Z",
//   "stripeactivesubscription": true,
//   "membershipLevel": 3,
//   "lastacceptedeuladate": "2023-04-29T22:24:31.8859806Z",
//   "lastregistrationsubmissiondate": "2023-04-29T22:24:31.936057Z",
//   "redeemid": "ce502c54-a503-4444-932a-b08f00cf80ef",
//   "registrationstage": 5,
//   "id": "b29622c5-490b-47fe-887f-29f274ad4653",
//   "avatar": "https://proinsightblobwestus.blob.core.windows.net/avatars/b29622c5-490b-47fe-887f-29f274ad4653",
//   "business": "ProInsight",
//   "citycode": "OR-hoodriver",
//   "countycode": "OR-hoodriver",
//   "email": "don@proinsight.com",
//   "firstname": "Super Don",
//   "lastname": "Yoakum",
//   "lat": 0,
//   "license": null,
//   "lon": 0,
//   "networkid": "dcd19f85-e9ee-4662-85b5-4eaf70ea7fe6",
//   "phone": "5038122631",
//   "prepopulated": false,
//   "professioncode": "profession-coach",
//   "sales": 5,
//   "state": "OR",
//   "summary": null,
//   "video": "https://www.youtube.com/watch?v=dcIHFTSDzXc",
//   "websites": [
//       "https://www.facebook.com/RecruitingGuru",
//       "https://twitter.com/DonYoakum",
//       "https://www.linkedin.com/in/don-yoakum-39a33a28"
//   ],
//   "zip": "97031",
//   "_rid": "+xUwAPJgdY5pPwAAAAAAAA==",
//   "_self": "dbs/+xUwAA==/colls/+xUwAPJgdY4=/docs/+xUwAPJgdY5pPwAAAAAAAA==/",
//   "_etag": "\"09006ca0-0000-0700-0000-670c43270000\"",
//   "_attachments": "attachments/",
//   "_ts": 1728856871
// }


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
# ProInsight Web

A professional insights and property analysis platform built with Next.js, TypeScript, and SCSS.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Global layout with MainNav
│   ├── page.tsx                 # Homepage
│   ├── search/                  # Search functionality
│   │   ├── layout.tsx           # Search layout
│   │   ├── page.tsx             # Search page with filters
│   │   ├── map/                 # Fullscreen map view
│   │   │   └── page.tsx
│   │   └── professionals/       # Professional management
│   │       ├── [id]/            # Professional carousel by pin
│   │       │   └── page.tsx
│   │       └── client/          # Client profiles
│   │           ├── [clientId]/
│   │           │   └── page.tsx
│   ├── deep-dive/               # Property analysis
│   │   ├── page.tsx             # Portfolio overview
│   │   └── property/            # Property details
│   │       ├── [propertyId]/
│   │       │   └── page.tsx
│   └── profile/                 # User profiles
│       ├── page.tsx             # Profile view
│       └── edit/                # Profile editing
│           └── page.tsx
├── components/                   # Reusable components
│   ├── MainNav.tsx             # Navigation component
│   ├── SearchDropdown.tsx      # Search filters
│   ├── MapPreview.tsx          # Interactive map
│   ├── ProfessionalCarousel.tsx # Professional display
│   ├── ClientIntroCard.tsx     # Client information
│   ├── PropertyCard.tsx        # Property display
│   └── ProfileForm.tsx         # Profile editing form
├── lib/                         # Utility libraries
│   ├── supabase.ts             # Supabase client
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
└── styles/                      # SCSS styling
    ├── globals.scss            # Global styles and variables
    └── components/             # Component-specific styles
        ├── _MainNav.scss
        ├── _MapPreview.scss
        ├── _SearchDropdown.scss
        ├── _PropertyCard.scss
        ├── _ProfessionalCarousel.scss
        ├── _ProfileForm.scss
        ├── _ClientIntroCard.scss
        ├── _HomePage.scss
        ├── _SearchPage.scss
        ├── _DeepDive.scss
        ├── _Profile.scss
        └── _ProfessionalPage.scss
```

## Features

- **Search & Discovery**: Interactive map with property and professional search
- **Professional Network**: Connect with real estate professionals
- **Property Analysis**: Deep dive into property details and analytics
- **User Profiles**: Manage personal and professional information
- **Responsive Design**: Mobile-first approach with modern UI/UX

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: SCSS with CSS Modules
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Custom components with modern design
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd proinsight-web
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Styling Guidelines

- Uses SCSS with CSS custom properties for theming
- Component-specific styles in `src/styles/components/`
- Global styles and variables in `src/styles/globals.scss`
- No BEM naming conventions - use semantic class names
- Responsive design with mobile-first approach

### Component Structure

Each component follows a consistent pattern:
- TypeScript interfaces for props
- Client-side interactivity with `'use client'` directive
- SCSS modules for styling
- Responsive design considerations

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

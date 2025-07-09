import Link from 'next/link'
import '@/styles/components/_HomePage.scss'

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="hero">
        <h1>Welcome to ProInsight</h1>
        <p>Professional insights and property analysis platform</p>
      </div>
      
      <div className="navigation-grid">
        <Link href="/search" className="nav-card">
          <h2>Search</h2>
          <p>Find professionals and properties</p>
        </Link>
        
        <Link href="/deep-dive" className="nav-card">
          <h2>Deep Dive</h2>
          <p>Detailed property analysis</p>
        </Link>
        
        <Link href="/profile" className="nav-card">
          <h2>Profile</h2>
          <p>Manage your account</p>
        </Link>
      </div>
    </div>
  )
}

"use client"
import Link from 'next/link'
import '@/styles/components/_MainNav.scss'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'

export default function MainNav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`main-nav ${theme}-theme`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link href="/" className="brand-link">
            ProInsight
          </Link>
        </div>
        <div className="nav-links">
          <Link href="/search" className="nav-link">
            Search
          </Link>
          <Link href="/deep-dive" className="nav-link">
            Deep Dive
          </Link>
          <Link href="/profile" className="nav-link">
            Profile
          </Link>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button className="nav-btn">Sign In</button>
        </div>
      </div>
    </nav>
  )
} 
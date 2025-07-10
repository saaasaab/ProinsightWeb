import React from 'react'
import '@/styles/components/_Footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ProInsight</h3>
          <p>Professional insights and property analysis</p>
        </div>
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/eula">EULA</a></li>
            <li><a href="/gdpr">GDPR</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <div className="address-info">
            <div className="address">
              <strong>Physical Address:</strong>
              <p>120 Country Club Drive #63<br />Incline Village, NV 89451</p>
            </div>
            <div className="address">
              <strong>Mailing Address:</strong>
              <p>774 Mays Blvd. Ste 10, PMB 458<br />Incline Village, NV 89451</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©2024 ProInsight™</p>
      </div>
    </footer>
  )
}

export default Footer 
import '@/styles/components/_Profile.scss'

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <div className="avatar-placeholder">JD</div>
          </div>
          
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>john.doe@example.com</p>
            <p>Professional Investor</p>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Properties</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$4.2M</span>
              <span className="stat-label">Portfolio Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8.5%</span>
              <span className="stat-label">Avg ROI</span>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <a href="/profile/edit" className="edit-btn">
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  )
} 
import '@/styles/components/_Profile.scss'
import { FiEdit, FiMail, FiMessageSquare } from 'react-icons/fi';

export default function ProfilePage() {
  return (
    <div className="professional-page">
      <div className="professional-content">
        {/* Profile Info Section */}
        <section className="profile-section">
          <div className="profile-header-redesign">
            <div className="profile-header-img-row-rect">
              <div className="profile-avatar-img-rect profile-avatar-placeholder-rect" aria-label="JD">JD</div>
            </div>
            <div className="profile-header-info">
              <div className="profile-header-name-row">
                <span className="profile-header-name-redesign">John Doe</span>
              </div>
              <div className="profile-header-org-row">
                <span className="profile-header-org-redesign">john.doe@example.com</span>
              </div>
              <div className="profile-header-role-clients-row">
                <span className="profile-header-role-redesign">Professional Investor</span>
                <span className="profile-header-clients-redesign">12 Properties</span>
              </div>
              <div className="profile-header-role-clients-row">
                <span className="profile-header-role-redesign">$4.2M Portfolio</span>
                <span className="profile-header-clients-redesign">8.5% Avg ROI</span>
              </div>
              <a href="/profile/edit" className="profile-intro-btn-redesign profile-edit-btn">
                <FiEdit className="profile-edit-btn-icon" /> Edit Profile
              </a>
            </div>
          </div>
        </section>

        {/* Invite a Friend Section */}
        <section className="profile-section">
          <div className="profile-section-header">
            <h2>Invite Professionals or Property Owner</h2>
          </div>
          <div className="profile-section-content profile-invite-content">
            <div className="profile-invite-qr">
              <img src="/qr-placeholder.png" alt="QR Code" />
            </div>
            <div className="profile-invite-how">How to send this invitation?</div>
            <div className="profile-invite-actions">
              <a className="online-link-row profile-invite-btn" href="mailto:?subject=Join%20ProInsight&body=Check%20out%20this%20profile!">
                <FiMail className="profile-invite-btn-icon" /> Email
              </a>
              <a className="online-link-row profile-invite-btn" href="sms:?body=Check%20out%20this%20profile!">
                <FiMessageSquare className="profile-invite-btn-icon" /> Text
              </a>
            </div>
          </div>
        </section>

        {/* Subscription Info Section */}
        <section className="profile-section">
          <div className="profile-section-header">
            <h2>Subscription</h2>
          </div>
          <div className="profile-section-content profile-subscription-content">
            <div className="profile-subscription-visible">
              <span role="img" aria-label="visible">👁️</span> Your profile is visible to others
            </div>
            <div className="profile-subscription-title">
              Asset &amp; Home Professionals (not Realtor or Lenders)
            </div>
            <div className="profile-subscription-price">$597.00</div>
            <div className="profile-subscription-paid">
              <span role="img" aria-label="paid">🟢</span> Paid till 6/17/2026 10:10:57 PM
            </div>
            <div className="profile-subscription-desc">
              You have subscribed to "Asset &amp; Home Professionals (not Realtor or Lenders)" at $597.00 for one year. It grants you priority in your profession and your ZIP Code in the ICPI network. This is a renewable subscription, which will renew automatically on 2026-06-17, and every year thereafter. The current subscription was charged to your ProInsight account.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 
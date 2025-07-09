import ProfileForm from '@/components/ProfileForm'
import '@/styles/components/_Profile.scss'

export default function EditProfilePage() {
  return (
    <div className="edit-profile-page">
      <div className="edit-profile-header">
        <h1>Edit Profile</h1>
      </div>
      
      <div className="edit-profile-content">
        <ProfileForm />
      </div>
    </div>
  )
} 
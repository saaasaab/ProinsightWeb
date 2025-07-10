import React from 'react';
import BaseSection from './BaseSection';
import { FiCheckCircle } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';

interface ProfileHeaderProps {
  avatar: string;
  firstname: string;
  lastname: string;
  brokerage: string;
  role: string;
  clientCount: number;
}

const DEFAULT_AVATAR = '';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  firstname,
  lastname,
  brokerage,
  role,
  clientCount,
}) => {
  const initials = `${firstname?.[0] || ''}${lastname?.[0] || ''}`.toUpperCase();
  return (
    <BaseSection title="">
      <div className="profile-header-main profile-header-redesign">
        <div className="profile-header-img-row-rect">
          {avatar ? (
            <img
              src={avatar}
              alt={`${firstname} ${lastname}`}
              className="profile-avatar-img-rect"
            />
          ) : (
            <div className="profile-avatar-img-rect profile-avatar-placeholder-rect" aria-label={initials}>
              {initials}
            </div>
          )}
        </div>
        <div className="profile-header-info">
          <div className="profile-header-name-row">
            <span className="profile-header-name-redesign">{firstname} {lastname}</span>
            <FiCheckCircle className="profile-header-verified" />
          </div>
          <div className="profile-header-org-row">
            <FaBuilding className="profile-header-org-icon" />
            <span className="profile-header-org-redesign">{brokerage}</span>
          </div>
          <div className="profile-header-role-clients-row">
            <span className="profile-header-role-redesign">{role}</span>
            <span className="profile-header-clients-redesign">{clientCount} Clients</span>
          </div>
          <button className="profile-intro-btn-redesign">
            Make an Introduction
          </button>
        </div>
      </div>
    </BaseSection>
  );
};

export default ProfileHeader; 
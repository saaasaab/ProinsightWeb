import React from 'react';
import BaseSection from './BaseSection';

interface InvitedBySectionProps {
  inviterAvatar: string;
  inviterName: string;
  inviterSubtitle: string;
  onClick?: () => void;
}

const InvitedBySection: React.FC<InvitedBySectionProps> = ({ inviterAvatar, inviterName, inviterSubtitle, onClick }) => {
  return (
    <BaseSection title="Invited By…">
      <div
        className="invited-by-card"
        style={onClick ? { cursor: 'pointer' } : undefined}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        aria-label={onClick ? `View profile for ${inviterName}` : undefined}
      >
        <img
          src={inviterAvatar}
          alt={inviterName}
          className="invited-by-avatar"
        />
        <div className="invited-by-info">
          <div className="invited-by-name">{inviterName}</div>
          <div className="invited-by-subtitle">{inviterSubtitle}</div>
        </div>
        <span className="invited-by-arrow">→</span>
      </div>
    </BaseSection>
  );
};

export default InvitedBySection; 
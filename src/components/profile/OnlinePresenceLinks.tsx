import React from 'react';
import BaseSection from './BaseSection';

interface OnlineLink {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

interface OnlinePresenceLinksProps {
  links: OnlineLink[];
}

const OnlinePresenceLinks: React.FC<OnlinePresenceLinksProps> = ({ links }) => {
  return (
    <BaseSection title="Online Presence">
      <div className="online-links-list">
        {links.map((link, idx) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`online-link-row${idx === links.length - 1 ? ' last' : ''}`}
          >
            {link.icon && <span className="online-link-icon">{link.icon}</span>}
            <span className="online-link-label">{link.label}</span>
            <span className="online-link-arrow">→</span>
          </a>
        ))}
      </div>
    </BaseSection>
  );
};

export default OnlinePresenceLinks; 
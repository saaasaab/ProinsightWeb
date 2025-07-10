import React from 'react';

interface BaseSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BaseSection: React.FC<BaseSectionProps> = ({ title, children, className }) => {
  return (
    <section className={`profile-section${className ? ' ' + className : ''}`}>
      <div className="profile-section-header">
        <h2>{title}</h2>
      </div>
      <div className="profile-section-content">
        {children}
      </div>
    </section>
  );
};

export default BaseSection; 
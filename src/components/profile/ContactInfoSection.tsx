import React from 'react';
import BaseSection from './BaseSection';

interface ContactInfoSectionProps {
  license: string;
  email: string;
  phone: string;
  textPhone?: string;
}

const LICENSE_LOOKUP_URL = 'https://www2.dre.ca.gov/PublicASP/pplinfo.asp'; // Example for CA, adjust as needed

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ license, email, phone, textPhone }) => {
  return (
    <BaseSection title="Contact">
      <ul className="contact-info-list">
        <li className="contact-info-item">
          <span className="contact-info-icon">🪪</span>
          <a
            href={`${LICENSE_LOOKUP_URL}?License_id=${encodeURIComponent(license.replace(/[^\d]/g, ''))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            License: {license}
          </a>
        </li>
        <li className="contact-info-item">
          <span className="contact-info-icon">✉️</span>
          <a href={`mailto:${email}`} className="contact-info-link">{email}</a>
        </li>
        <li className="contact-info-item">
          <span className="contact-info-icon">📞</span>
          <a href={`tel:${phone}`} className="contact-info-link">{phone}</a>
        </li>
        {textPhone && (
          <li className="contact-info-item">
            <span className="contact-info-icon">💬</span>
            <a href={`tel:${textPhone}`} className="contact-info-link">{textPhone} (TEXT)</a>
          </li>
        )}
      </ul>
    </BaseSection>
  );
};

export default ContactInfoSection; 
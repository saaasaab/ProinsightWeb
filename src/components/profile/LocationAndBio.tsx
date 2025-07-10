import React from 'react';
import BaseSection from './BaseSection';

interface LocationAndBioProps {
  city: string;
  county: string;
  state: string;
  zip: string;
  bio: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  clientCount?: number;
}

const LocationAndBio: React.FC<LocationAndBioProps> = ({ city, county, state, zip, bio, firstname, lastname, role, clientCount }) => {
  const locationString = `${city}${county ? ", " + county : ""}, ${state} ${zip}`;
  const mapsQuery = encodeURIComponent(locationString);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  let displayBio = bio && bio.trim();
  if (!displayBio) {
    const name = [firstname, lastname].filter(Boolean).join(' ');
    const roleText = role || 'real estate professional';
    const cityText = city ? `from ${city}` : '';
    const stateText = state ? `, ${state}` : '';
    const clientsText = clientCount ? `with ${clientCount} annual clients` : '';
    displayBio = `${name} is a ${roleText} ${cityText}${stateText} ${clientsText}`.replace(/  +/g, ' ').trim();
  }

  return (
    <BaseSection title="Location & Bio">
      <a
        className="profile-location-row profile-location-link"
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open ${locationString} in Google Maps`}
      >
        <span className="profile-location-label">{locationString}</span>
        <span className="profile-location-arrow">→</span>
      </a>
      <div className="profile-bio">{displayBio}</div>
    </BaseSection>
  );
};

export default LocationAndBio; 
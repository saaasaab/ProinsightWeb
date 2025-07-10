"use client";
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LocationAndBio from '@/components/profile/LocationAndBio';
import InvitedBySection from '@/components/profile/InvitedBySection';
import OnlinePresenceLinks from '@/components/profile/OnlinePresenceLinks';
import ContactInfoSection from '@/components/profile/ContactInfoSection';
import { stateToFileName } from '@/utils/utils';
import '@/styles/components/_Profile.scss';

export default function ProfessionalPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const state = searchParams.get('state');
  const [profile, setProfile] = useState<any | null>(null);
  const [referrer, setReferrer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!state) {
        setError('No state provided.');
        setLoading(false);
        return;
      }
      const fileName = stateToFileName[state as keyof typeof stateToFileName];
      if (!fileName) {
        setError('Invalid state.');
        setLoading(false);
        return;
      }
      try {
        const file = await import(`@/data/people/icons/profession-realtor/${fileName}.json`);
        const people = file.default || file;
        const found = people.find((p: any) => p.uuid === id);
        if (!found) {
          setError('Professional not found.');
        } else {
          setProfile(found);
          // Pick a random referrer (not the current profile)
          const others = people.filter((p: any) => p.uuid !== id);
          if (others.length > 0) {
            const randomRef = others[Math.floor(Math.random() * others.length)];
            setReferrer(randomRef);
          } else {
            setReferrer(null);
          }
        }
      } catch (e) {
        setError('Could not load profile data.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [id, state]);

  if (loading) {
    return <div className="professional-page"><div className="professional-content">Loading...</div></div>;
  }
  if (error || !profile) {
    return <div className="professional-page"><div className="professional-content">{error || 'Profile not found.'}</div></div>;
  }

  // Map the profile data to the expected props for the components
  return (
    <div className="professional-page" style={{ background: '#181818', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="professional-content" style={{ maxWidth: 400, margin: '0 auto' }}>
        <ProfileHeader
          avatar={profile.avatar}
          firstname={profile.firstname}
          lastname={profile.lastname}
          brokerage={profile.brokerage}
          role={profile.role || 'Real Estate Agent'}
          clientCount={profile.sales ? parseInt(profile.sales) : 0}
        />
        <LocationAndBio
          city={profile.city}
          county={profile.county}
          state={profile.state}
          zip={profile.zip}
          bio={profile.bio}
          firstname={profile.firstname}
          lastname={profile.lastname}
          role={profile.role || 'Real Estate Agent'}
          clientCount={profile.sales ? parseInt(profile.sales) : 0}
        />
        <InvitedBySection
          inviterAvatar={referrer?.avatar || profile.avatar}
          inviterName={referrer ? `${referrer.firstname} ${referrer.lastname}` : `${profile.firstname} ${profile.lastname}`}
          inviterSubtitle={referrer?.brokerage || profile.brokerage}
          onClick={referrer ? () => router.push(`/search/professionals/${referrer.uuid}?state=${state}`) : undefined}
        />
        <OnlinePresenceLinks
          links={
            Array.isArray(profile.websites) && profile.websites.length > 0
              ? profile.websites.map((url: string) => ({ label: url, url }))
              : [
                  { label: 'Facebook', url: 'https://facebook.com/' },
                  { label: 'LinkedIn', url: 'https://linkedin.com/' },
                  { label: 'Instagram', url: 'https://instagram.com/' },
                  { label: 'Personal Website', url: 'https://yourwebsite.com/' },
                ]
          }
        />
        <ContactInfoSection
          license={profile.license}
          email={profile.email}
          phone={profile.phone}
          textPhone={profile.phone}
        />
      </div>
    </div>
  );
} 
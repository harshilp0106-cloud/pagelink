import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import type { Profile, PageLink, SocialLink } from '@/src/types/index';
import { storage } from '@/src/lib/storage';
import { Navbar, type TabKey } from '@/src/components/Navbar';
import { PhonePreview } from '@/src/components/PhonePreview';
import { LinkWorkspace } from '@/src/components/editor/LinkWorkspace';
import { AppearanceWorkspace } from '@/src/components/appearance/AppearanceWorkspace';
import { AnalyticsDashboard } from '@/src/components/analytics/AnalyticsDashboard';
import { AudienceAndRevenue } from '@/src/components/monetization/AudienceAndRevenue';
import { CustomDomainsWorkspace } from '@/src/components/domains/CustomDomainsWorkspace';
import { BillingWorkspace } from '@/src/components/billing/BillingWorkspace';
import { ShareModal } from '@/src/components/ShareModal';
import { UpgradeModal } from '@/src/components/UpgradeModal';
import { PublicPageView } from '@/src/components/PublicPageView';
import { SignupPage } from '@/src/components/auth/SignupPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('editor');
  const [profile, setProfile] = useState<Profile>(() => storage.getProfile());
  const [links, setLinks] = useState<PageLink[]>(() => storage.getLinks());
  const [socials, setSocials] = useState<SocialLink[]>(() => storage.getSocials());

  // Authentication required: no automatic stored session on main page
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);
  const [isSignupView, setIsSignupView] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signup' | 'login'>('login');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  useEffect(() => {
    const handleProfileUpdate = () => setProfile(storage.getProfile());
    const handleLinksUpdate = () => setLinks(storage.getLinks());
    const handleSocialsUpdate = () => setSocials(storage.getSocials());

    window.addEventListener('pagelink_profile_updated', handleProfileUpdate);
    window.addEventListener('pagelink_links_updated', handleLinksUpdate);
    window.addEventListener('pagelink_socials_updated', handleSocialsUpdate);

    return () => {
      window.removeEventListener('pagelink_profile_updated', handleProfileUpdate);
      window.removeEventListener('pagelink_links_updated', handleLinksUpdate);
      window.removeEventListener('pagelink_socials_updated', handleSocialsUpdate);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPublicView(false);
    setAuthInitialMode('login');
    setIsSignupView(true);
  };

  const handleOpenSignup = () => {
    setAuthInitialMode('signup');
    setIsSignupView(true);
  };

  // Auth flow (Sign Up or Log In)
  if (!isLoggedIn || isSignupView) {
    return (
      <SignupPage
        initialMode={authInitialMode}
        onSignupComplete={(newProfile, newLinks) => {
          setProfile(newProfile);
          setLinks(newLinks);
          setIsLoggedIn(true);
          setIsSignupView(false);
          // Direct landing on preview right after signup!
          setIsPublicView(true);
        }}
        onLoginSuccess={(loggedInProfile) => {
          setProfile(loggedInProfile);
          setLinks(storage.getLinks());
          setIsLoggedIn(true);
          setIsSignupView(false);
        }}
        onCancel={isLoggedIn ? () => setIsSignupView(false) : undefined}
      />
    );
  }

  // Full-screen public bio preview
  if (isPublicView) {
    return (
      <PublicPageView
        profile={profile}
        links={links}
        socials={socials}
        onBackToDashboard={() => setIsPublicView(false)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onLogout={handleLogout}
      />
    );
  }

  const showPhoneSideBySide = currentTab === 'editor' || currentTab === 'appearance';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top SaaS Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        profile={profile}
        onOpenShareModal={() => setIsShareOpen(true)}
        onOpenUpgradeModal={() => setIsUpgradeOpen(true)}
        onOpenLivePage={() => setIsPublicView(true)}
        onOpenSignup={handleOpenSignup}
        onLogout={handleLogout}
      />

      {/* Main Workspace Body */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {showPhoneSideBySide ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left Column: Editor or Appearance workspace */}
            <div className="lg:col-span-7">
              {currentTab === 'editor' && (
                <LinkWorkspace
                  profile={profile}
                  links={links}
                  socials={socials}
                  onLinksChange={setLinks}
                  onSocialsChange={setSocials}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}
              {currentTab === 'appearance' && (
                <AppearanceWorkspace
                  profile={profile}
                  onProfileChange={setProfile}
                  onOpenUpgrade={() => setIsUpgradeOpen(true)}
                />
              )}
            </div>

            {/* Right Column: Live Interactive Phone Canvas Preview */}
            <div className="hidden lg:block lg:col-span-5 sticky top-24">
              <PhonePreview
                profile={profile}
                links={links}
                socials={socials}
                onOpenLivePage={() => setIsPublicView(true)}
                onOpenUpgrade={() => setIsUpgradeOpen(true)}
              />
            </div>
          </div>
        ) : (
          /* Full-width Workspace for Analytics, Revenue & Audience, Domains, and Billing */
          <div className="w-full">
            {currentTab === 'analytics' && (
              <AnalyticsDashboard
                profile={profile}
                links={links}
                onOpenUpgrade={() => setIsUpgradeOpen(true)}
              />
            )}
            {currentTab === 'monetization' && (
              <AudienceAndRevenue
                profile={profile}
                onOpenUpgrade={() => setIsUpgradeOpen(true)}
              />
            )}
            {currentTab === 'seo' && (
              <CustomDomainsWorkspace
                profile={profile}
                onProfileChange={setProfile}
                onOpenUpgrade={() => setIsUpgradeOpen(true)}
              />
            )}
            {currentTab === 'billing' && (
              <BillingWorkspace
                profile={profile}
                onProfileChange={setProfile}
              />
            )}
          </div>
        )}
      </main>

      {/* Main Page Footer with Support Email */}
      <footer className="mt-auto border-t border-slate-200/90 bg-white py-4 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 tracking-tight">PageLink</span>
            <span className="text-slate-300">•</span>
            <span>Creator Link-in-Bio &amp; Monetization Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:help@pagelink.in"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1 font-semibold text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 transition-colors shadow-2xs"
              title="Send email to PageLink Support"
            >
              <Mail className="size-3.5 text-indigo-600" />
              <span>Support: help@pagelink.in</span>
            </a>

            <span className="hidden sm:inline text-slate-300">•</span>

            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Support Online 24/7
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal
        profile={profile}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <UpgradeModal
        profile={profile}
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onProfileUpdated={setProfile}
      />
    </div>
  );
}

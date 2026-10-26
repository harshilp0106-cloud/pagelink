import React, { useEffect } from 'react';
import { ArrowLeft, Edit3, Share2, Sparkles, CheckCircle2, LogOut } from 'lucide-react';
import type { Profile, PageLink, SocialLink } from '@/src/types/index';
import { CreatorPage } from '@/src/components/CreatorPage';
import { storage } from '@/src/lib/storage';

interface PublicPageViewProps {
  profile: Profile;
  links: PageLink[];
  socials: SocialLink[];
  onBackToDashboard: () => void;
  onOpenShare: () => void;
  onOpenUpgrade: () => void;
  onLogout?: () => void;
}

export function PublicPageView({
  profile,
  links,
  socials,
  onBackToDashboard,
  onOpenShare,
  onOpenUpgrade,
  onLogout,
}: PublicPageViewProps) {
  useEffect(() => {
    // Record page view on load
    storage.incrementPageView();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-900">
      {/* Floating Creator Top Bar (Simulating logged-in creator viewing their live site) */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-2.5 text-white backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Dashboard
          </button>
          <span className="hidden sm:inline text-xs text-white/50">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/90">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-300">https://{profile.custom_domain || `pagelink.to/@${profile.handle}`}</span>
            <span className="rounded bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 text-[10px] font-bold">Custom Domain</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-white/20 transition-colors"
          >
            <Share2 className="size-3.5" /> Share & QR
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <Edit3 className="size-3.5" /> Edit Links
          </button>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
              title="Log out of account"
            >
              <LogOut className="size-3.5" /> Log Out
            </button>
          )}
        </div>
      </div>

      {/* Actual Live Bio Page */}
      <div className="min-h-[calc(100vh-45px)] w-full flex justify-center">
        <CreatorPage
          profile={profile}
          links={links}
          socials={socials}
          mode="live"
          onOpenUpgrade={onOpenUpgrade}
        />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Smartphone, Monitor, Maximize2, ExternalLink, Wifi, Battery, Sparkles } from 'lucide-react';
import type { Profile, PageLink, SocialLink } from '@/src/types/index';
import { CreatorPage } from '@/src/components/CreatorPage';

interface PhonePreviewProps {
  profile: Profile;
  links: PageLink[];
  socials: SocialLink[];
  onOpenLivePage: () => void;
  onOpenUpgrade?: () => void;
}

export function PhonePreview({
  profile,
  links,
  socials,
  onOpenLivePage,
  onOpenUpgrade,
}: PhonePreviewProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="flex flex-col items-center">
      {/* Device Toolbar */}
      <div className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">
        <button
          type="button"
          onClick={() => setDeviceMode('mobile')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            deviceMode === 'mobile'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="size-3.5" /> Mobile
        </button>
        <button
          type="button"
          onClick={() => setDeviceMode('desktop')}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            deviceMode === 'desktop'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Monitor className="size-3.5" /> Desktop
        </button>
        <div className="h-4 w-px bg-slate-200" />
        <button
          type="button"
          onClick={onOpenLivePage}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          title="Open Live Public View"
        >
          <ExternalLink className="size-3.5" />
          <span className="hidden sm:inline">Live URL</span>
        </button>
      </div>

      {/* Frame Container */}
      {deviceMode === 'mobile' ? (
        <div className="relative mx-auto flex w-[360px] max-w-full flex-col overflow-hidden rounded-[44px] border-[10px] border-slate-900 bg-slate-900 shadow-2xl ring-1 ring-slate-800">
          {/* Status Bar & Dynamic Island */}
          <div className="relative z-20 flex h-11 w-full items-center justify-between px-6 pt-1 text-xs font-medium text-white select-none">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black shadow-inner" />
            <div className="flex items-center gap-1.5">
              <Wifi className="size-3.5" />
              <Battery className="size-3.5" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="h-[640px] w-full overflow-y-auto rounded-b-[34px] bg-white">
            <CreatorPage
              profile={profile}
              links={links}
              socials={socials}
              mode="preview"
              onOpenUpgrade={onOpenUpgrade}
            />
          </div>

          {/* Home Indicator Bar */}
          <div className="relative z-20 flex h-4 w-full items-center justify-center pb-1">
            <div className="h-1 w-28 rounded-full bg-white/30" />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-rose-400" />
              <div className="size-3 rounded-full bg-amber-400" />
              <div className="size-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs">
              <span className="text-slate-400">https://</span>
              <span className="font-semibold text-slate-800">{profile.custom_domain || `pagelink.to/@${profile.handle}`}</span>
            </div>
            <button
              type="button"
              onClick={onOpenLivePage}
              className="text-slate-400 hover:text-slate-700"
            >
              <Maximize2 className="size-3.5" />
            </button>
          </div>

          {/* Desktop Content */}
          <div className="h-[580px] w-full overflow-y-auto">
            <CreatorPage
              profile={profile}
              links={links}
              socials={socials}
              mode="preview"
              onOpenUpgrade={onOpenUpgrade}
            />
          </div>
        </div>
      )}

      {/* Quick live URL hint */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          Live at:{' '}
          <button
            onClick={onOpenLivePage}
            className="font-medium text-slate-800 underline hover:text-indigo-600"
          >
            pagelink.to/@{profile.handle}
          </button>
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Type,
  Layout,
  Sliders,
  Check,
  Shield,
  Upload,
  Image as ImageIcon,
  Lock,
} from 'lucide-react';
import type { Profile, FontKey, RadiusKey, ButtonStyle } from '@/src/types/index';
import { storage } from '@/src/lib/storage';
import { PRESETS, FONTS, RADII, BUTTON_STYLES, resolveTheme } from '@/src/lib/theme';

interface AppearanceWorkspaceProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
  onOpenUpgrade: () => void;
}

export function AppearanceWorkspace({
  profile,
  onProfileChange,
  onOpenUpgrade,
}: AppearanceWorkspaceProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const AVATAR_PRESETS = [
    { label: 'Monstilo (Photographer)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
    { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
    { label: 'Digital Nomad', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80' },
    { label: 'Minimalist Icon', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80' },
  ];

  const BANNER_PRESETS = [
    { label: 'Tokyo Neon Night', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Moody Mountain Fog', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Sunset Ocean Wave', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Abstract Pastel Mesh', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80' },
  ];

  const updateProfile = (updates: Partial<Profile>) => {
    const updated = { ...profile, ...updates };
    onProfileChange(updated);
    storage.saveProfile(updated);
  };

  const updateTheme = (themeUpdates: Partial<Profile['theme']>) => {
    const updatedTheme = { ...profile.theme, ...themeUpdates };
    updateProfile({ theme: updatedTheme });
  };

  const currentTheme = resolveTheme(profile.theme);
  const categories = ['All', 'Dark', 'Modern', 'Vibrant', 'Earthy', 'Pastel'];

  const filteredPresets = Object.entries(PRESETS).filter(([_, preset]) => {
    if (categoryFilter === 'All') return true;
    return preset.category === categoryFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header Settings: Avatar, Banner, Name, Bio */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Profile & Identity</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Avatar section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Avatar Photo</label>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt=""
                className="size-14 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
              />
              <input
                type="text"
                placeholder="Avatar image URL"
                value={profile.avatar_url}
                onChange={(e) => updateProfile({ avatar_url: e.target.value })}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>
            {/* Quick avatar choices */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {AVATAR_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateProfile({ avatar_url: p.url })}
                  className="rounded-full ring-2 ring-transparent hover:ring-indigo-500"
                >
                  <img src={p.url} alt={p.label} className="size-7 rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Banner section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Cover Banner</label>
              {profile.banner_url && (
                <button
                  type="button"
                  onClick={() => updateProfile({ banner_url: null })}
                  className="text-[11px] text-rose-500 hover:underline"
                >
                  Remove banner
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Banner image URL (optional)"
              value={profile.banner_url || ''}
              onChange={(e) => updateProfile({ banner_url: e.target.value || null })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none mb-2"
            />
            {/* Quick banner choices */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {BANNER_PRESETS.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateProfile({ banner_url: b.url })}
                  className="shrink-0 overflow-hidden rounded-md border border-slate-200 hover:border-indigo-500"
                >
                  <img src={b.url} alt={b.label} className="h-6 w-12 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Display Name</label>
            <input
              type="text"
              value={profile.display_name}
              onChange={(e) => updateProfile({ display_name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Handle Slug</label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
              <span className="text-xs text-slate-400">pagelink.to/@</span>
              <input
                type="text"
                value={profile.handle}
                onChange={(e) =>
                  updateProfile({
                    handle: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
                  })
                }
                className="flex-1 bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">Bio Description</label>
          <textarea
            rows={2}
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            placeholder="Tell your audience who you are and what you do..."
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Theme Presets Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Aesthetic Theme Presets</h2>
            <p className="text-xs text-slate-500">
              Curated creator palettes matching top influencers and aesthetic trends.
            </p>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-3 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filteredPresets.map(([key, preset]) => {
            const isSelected = profile.theme.preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => updateTheme({ preset: key })}
                className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border p-3 text-center transition-all ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Visual Swatch Mockup */}
                <div
                  className="relative flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-xl p-2 shadow-inner"
                  style={{ background: preset.background }}
                >
                  <div
                    className="size-5 rounded-full shadow-2xs"
                    style={{ background: preset.accent }}
                  />
                  <div
                    className="h-2 w-14 rounded-full"
                    style={{ background: preset.text, opacity: 0.8 }}
                  />
                  <div
                    className="flex h-5 w-full items-center justify-center rounded-md text-[9px] font-bold shadow-2xs"
                    style={{
                      background: preset.card,
                      color: preset.cardText,
                      border: preset.button === 'outline' ? `1px solid ${preset.text}` : undefined,
                    }}
                  >
                    Link Card
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-800 truncate">{preset.label}</span>
                  {isSelected && <Check className="size-3.5 text-indigo-600 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep Custom Styling Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Custom Typography & Button Styles</h2>
          </div>
          {profile.subscription_tier === 'free' && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
              <Lock className="size-3" /> Pro Feature
            </span>
          )}
        </div>

        <div className="space-y-4">
          {/* Font Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Typography Font</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.entries(FONTS) as [FontKey, { label: string; stack: string }][]).map(
                ([fontKey, info]) => {
                  const isSelected = (profile.theme.font || currentTheme.font) === fontKey;
                  return (
                    <button
                      key={fontKey}
                      type="button"
                      onClick={() => updateTheme({ font: fontKey })}
                      className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="text-sm font-semibold text-slate-900"
                        style={{ fontFamily: info.stack }}
                      >
                        Aa
                      </span>
                      <span className="text-[11px] text-slate-600">{info.label}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Button Style */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Button Fill Style</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(Object.entries(BUTTON_STYLES) as [ButtonStyle, { label: string; description: string }][]).map(
                ([btnKey, info]) => {
                  const isSelected = (profile.theme.button || currentTheme.button) === btnKey;
                  return (
                    <button
                      key={btnKey}
                      type="button"
                      onClick={() => updateTheme({ button: btnKey })}
                      className={`flex flex-col items-center rounded-xl border p-2 text-center transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-800">{info.label}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{btnKey}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Corner Radius */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Corner Radius</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(RADII) as [RadiusKey, { label: string; value: string }][]).map(
                ([radKey, info]) => {
                  const isSelected = (profile.theme.radius || currentTheme.radius) === radKey;
                  return (
                    <button
                      key={radKey}
                      type="button"
                      onClick={() => updateTheme({ radius: radKey })}
                      className={`rounded-xl border py-2 text-center text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 text-indigo-700 ring-1 ring-indigo-500'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {info.label}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SaaS Feature: Remove Branding Watermark */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 shrink-0">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Remove Pagelink Branding</h3>
                <span className="rounded-md bg-indigo-100 px-1.5 py-0.2 text-[10px] font-bold text-indigo-700 uppercase">
                  All-Access ($4.99/mo)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Hide the "Created with Pagelink" footer watermark badge on your public bio page.
              </p>
            </div>
          </div>

          <div>
            {profile.subscription_tier === 'free' ? (
              <button
                type="button"
                onClick={onOpenUpgrade}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-95"
              >
                <Lock className="size-3" /> Upgrade
              </button>
            ) : (
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={profile.remove_branding}
                  onChange={(e) => updateProfile({ remove_branding: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-indigo-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

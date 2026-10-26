import React, { useState } from 'react';
import {
  Link2,
  Palette,
  BarChart3,
  Users,
  Globe,
  CreditCard,
  Share2,
  ExternalLink,
  Sparkles,
  ChevronDown,
  Plus,
  Check,
  Shield,
  Zap,
  Search,
  UserPlus,
  LogOut,
  Mail,
} from 'lucide-react';
import type { Profile, SubscriptionTier } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

export type TabKey = 'editor' | 'appearance' | 'analytics' | 'monetization' | 'seo' | 'billing';

interface NavbarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  profile: Profile;
  onOpenShareModal: () => void;
  onOpenUpgradeModal: () => void;
  onOpenLivePage: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

export function Navbar({
  currentTab,
  onSelectTab,
  profile,
  onOpenShareModal,
  onOpenUpgradeModal,
  onOpenLivePage,
  onOpenSignup,
  onLogout,
}: NavbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profilesList = storage.getProfilesList();

  const navItems: Array<{ id: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'editor', label: 'Links', icon: Link2 },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'monetization', label: 'Audience & Tips', icon: Users },
    { id: 'seo', label: 'Domain & SEO', icon: Globe },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  const handleSwitchProfile = (p: { id: string; handle: string; display_name: string; tier: SubscriptionTier }) => {
    const updated = {
      ...profile,
      id: p.id,
      handle: p.handle,
      display_name: p.display_name.replace(' (Main)', ''),
      subscription_tier: p.tier,
    };
    storage.saveProfile(updated);
    setProfileDropdownOpen(false);
  };

  const getTierBadge = (tier: SubscriptionTier) => {
    if (tier === 'free') {
      return {
        label: 'Free Trial',
        color: 'bg-slate-100 text-slate-700 border border-slate-200',
      };
    }
    return {
      label: 'All-Access ($4.99/mo)',
      color: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs',
    };
  };

  const tierBadge = getTierBadge(profile.subscription_tier);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top Banner for Free trial users */}
      {profile.subscription_tier === 'free' && (
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-1.5 text-xs font-medium text-white">
          <div className="flex items-center gap-2">
            <Zap className="size-3.5 fill-current text-yellow-300" />
            <span>
              Unlock Tip Jars, Email Leads, Storefront &amp; 0% Fees with <strong>Pagelink All-Access for only $4.99/Month</strong>.
            </span>
          </div>
          <button
            onClick={onOpenUpgradeModal}
            className="flex items-center gap-1 rounded bg-white px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 shadow-2xs hover:bg-slate-100"
          >
            Get All-Access ($4.99/mo) <Sparkles className="size-3" />
          </button>
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Profile Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  PageLink
                </span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  v2.0
                </span>
              </div>
            </div>
          </div>

          <div className="hidden h-5 w-px bg-slate-200 sm:block" />

          {/* Profile Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt=""
                className="size-5 rounded-full object-cover"
              />
              <span className="max-w-[120px] truncate">@{profile.handle}</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5 z-50">
                <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Profile
                </div>
                {profilesList.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSwitchProfile(p)}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-900"
                  >
                    <div className="truncate">
                      <div className="font-semibold">{p.display_name}</div>
                      <div className="text-[11px] text-slate-400">@{p.handle}</div>
                    </div>
                    {p.handle === profile.handle && <Check className="size-4 text-indigo-600" />}
                  </button>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenSignup();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  <UserPlus className="size-3.5" />
                  <span>Create / Sign Up New Bio</span>
                </button>
                <div className="my-1 border-t border-slate-100" />
                <a
                  href="mailto:help@pagelink.in"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors"
                  title="Contact PageLink Support"
                >
                  <Mail className="size-3.5 text-indigo-600" />
                  <span>Support: help@pagelink.in</span>
                </a>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  <span>Log Out (@{profile.handle})</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan badge */}
          <button
            onClick={() => onSelectTab('billing')}
            className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-transform hover:scale-105 ${tierBadge.color}`}
          >
            <Shield className="size-3" />
            <span>{tierBadge.label}</span>
          </button>

          {/* Share Modal Trigger */}
          <button
            type="button"
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900"
            title="Share & QR Code"
          >
            <Share2 className="size-3.5 text-slate-500" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* View Live URL */}
          <button
            type="button"
            onClick={onOpenLivePage}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900"
            title="Open Live Public Bio"
          >
            <ExternalLink className="size-3.5 text-slate-500" />
            <span className="hidden sm:inline">Preview Live</span>
          </button>

          {/* Support Email Link */}
          <a
            href="mailto:help@pagelink.in"
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600"
            title="Contact Support: help@pagelink.in"
          >
            <Mail className="size-3.5 text-indigo-600" />
            <span>help@pagelink.in</span>
          </a>

          {/* Sign Up CTA */}
          <button
            type="button"
            onClick={onOpenSignup}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 px-2.5 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs transition-colors hover:bg-indigo-100"
            title="Create New Creator Account"
          >
            <UserPlus className="size-3.5 text-indigo-600" />
            <span>Sign Up</span>
          </button>

          {/* Upgrade / Plan CTA */}
          <button
            type="button"
            onClick={profile.subscription_tier === 'free' ? onOpenUpgradeModal : () => onSelectTab('billing')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
              profile.subscription_tier === 'free'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/20 hover:opacity-95 active:scale-95'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100'
            }`}
          >
            <Sparkles className="size-3.5 text-indigo-500" />
            <span>{profile.subscription_tier === 'free' ? 'Get All-Access ($4.99/mo)' : 'All-Access ($4.99/mo)'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Tabs Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-200 bg-slate-50 px-2 py-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

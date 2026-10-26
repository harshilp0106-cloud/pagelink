import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Check,
  X,
  CreditCard,
  Shield,
  Zap,
} from 'lucide-react';
import type { Profile, BillingCycle } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

interface UpgradeModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: (profile: Profile) => void;
}

export function UpgradeModal({
  profile,
  isOpen,
  onClose,
  onProfileUpdated,
}: UpgradeModalProps) {
  const [cycle, setCycle] = useState<BillingCycle>(profile.billing_cycle || 'monthly');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirmUpgrade = () => {
    setProcessing(true);
    setTimeout(() => {
      storage.updateSubscription('pro', cycle);
      const updated = storage.getProfile();
      onProfileUpdated(updated);
      setProcessing(false);
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      } catch {}
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-5" />
        </button>

        <div className="text-center mb-5">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 mb-3">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Pagelink All-Access</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Only one plan. Everything included with zero feature gating.
          </p>

          {/* Cycle switch */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setCycle('monthly')}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                cycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly ($4.99/mo)
            </button>
            <button
              type="button"
              onClick={() => setCycle('yearly')}
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                cycle === 'yearly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <span>Yearly ($49.99/yr)</span>
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-black text-emerald-700">
                SAVE $10
              </span>
            </button>
          </div>
        </div>

        {/* The One Plan Details Card */}
        <div className="rounded-2xl border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/40 to-white p-5 mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Creator All-Access
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-slate-900">
                  {cycle === 'monthly' ? '$4.99' : '$49.99'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {cycle === 'monthly' ? '/ month' : '/ year'}
                </span>
              </div>
            </div>
            <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-extrabold uppercase text-white shadow-2xs">
              All Included
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Unlimited Links & Embeds
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Verified Creator Checkmark Badge
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Tip Jar (0% Platform Fee)
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Email Newsletter Leads + CSV
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Digital Product Storefront
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Remove Pagelink Branding
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> 22+ Themes & Custom CSS
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 shrink-0 stroke-[2.5]" /> Full Traffic Analytics & SEO
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          disabled={processing}
          onClick={handleConfirmUpgrade}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 active:scale-98 transition-all disabled:opacity-50"
        >
          <CreditCard className="size-4" />
          {processing
            ? 'Activating Subscription...'
            : `Get Pagelink All-Access for ${cycle === 'monthly' ? '$4.99/Month' : '$49.99/Year'}`}
        </button>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          30-day money-back guarantee • Cancel anytime with one click
        </p>
      </div>
    </div>
  );
}

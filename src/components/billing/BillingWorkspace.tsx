import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  Sparkles,
  CreditCard,
  Download,
  Shield,
  Zap,
  Globe,
  Heart,
  Mail,
  Palette,
  BarChart3,
  Receipt,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import type { Profile, BillingCycle } from '@/src/types/index';
import { ALL_IN_ONE_PLAN } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

interface BillingWorkspaceProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
}

export function BillingWorkspace({ profile, onProfileChange }: BillingWorkspaceProps) {
  const [cycle, setCycle] = useState<BillingCycle>(profile.billing_cycle || 'monthly');
  const [processing, setProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const invoices = storage.getInvoices();
  const isSubscribed = profile.subscription_tier !== 'free';

  const handleToggleSubscription = () => {
    setProcessing(true);
    setTimeout(() => {
      if (isSubscribed) {
        // Toggle cycle or switch
        storage.updateSubscription('pro', cycle);
        setSuccessToast(`Subscription updated to ${cycle === 'yearly' ? 'Annual ($49.99/yr)' : 'Monthly ($4.99/mo)'}!`);
      } else {
        storage.updateSubscription('pro', cycle);
        setSuccessToast('Welcome to Pagelink All-Access! All features are now unlocked.');
      }
      const updated = storage.getProfile();
      onProfileChange(updated);
      setProcessing(false);
      try {
        confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
      } catch {}
      setTimeout(() => setSuccessToast(null), 4000);
    }, 600);
  };

  const handleDownloadInvoice = (receiptNumber: string) => {
    alert(`Downloading PDF receipt for invoice ${receiptNumber}... Saved!`);
  };

  const allFeatures = [
    { title: 'Unlimited Links & Media Embeds', desc: 'YouTube, Spotify, SoundCloud, Instagram, TikTok & web links without limits' },
    { title: 'Verified Creator Handle & Badge', desc: 'Clean pagelink.to/@yourname address with blue verified creator checkmark' },
    { title: 'Tip Jar & Fan Support', desc: 'Accept direct tips and donations with 0% platform transaction fee' },
    { title: 'VIP Email Newsletter Capture', desc: 'Collect follower emails directly on your page with one-click CSV export' },
    { title: 'Digital Product Storefront', desc: 'Sell preset packs, PDFs, guides, and consultation bookings' },
    { title: 'Remove "Created with Pagelink" Badge', desc: '100% white-label your bio with your own clean footer or branding' },
    { title: 'All 22+ Aesthetic Theme Presets', desc: 'Dark, vibrant, pastel, and minimalist designer themes' },
    { title: 'Custom Typography & Button Styles', desc: 'Serif, sans, mono, and display fonts with glassmorphism or neo-brutalist buttons' },
    { title: 'Deep Traffic Analytics & Referrers', desc: 'Real-time page views, link CTRs, Instagram/TikTok traffic sources, and countries' },
    { title: 'Custom SEO & Social Share Cards', desc: 'Custom meta titles, descriptions, and rich OpenGraph preview cards' },
    { title: 'Multiple Brand Profiles', desc: 'Manage up to 5 handles under one account and switch seamlessly' },
    { title: '24/7 Priority Support', desc: 'Direct priority assistance and dedicated creator onboarding' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg animate-bounce">
          <CheckCircle2 className="size-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Simple Creator Pricing</h2>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              Only 1 Plan
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            One single plan. All features included. No tiers, no artificial limits, no hidden fees.
          </p>
        </div>

        {/* Monthly vs Yearly Toggle */}
        <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setCycle('monthly')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              cycle === 'monthly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly ($4.99/mo)
          </button>
          <button
            type="button"
            onClick={() => setCycle('yearly')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              cycle === 'yearly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual ($49.99/yr)</span>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-black text-emerald-700">
              SAVE $10
            </span>
          </button>
        </div>
      </div>

      {/* THE ONLY PLAN: All-In-One Plan Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-600 bg-white shadow-xl">
        {/* Glow accent decoration */}
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 size-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Top Banner inside card */}
        <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                  All-In-One Plan
                </span>
                {isSubscribed && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="size-3.5" /> Active Subscription
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pagelink All-Access
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
                Everything you need to build, monetize, and scale your personal brand online.
                Zero transaction fees, unlimited links, lead capture, and digital storefront.
              </p>
            </div>

            {/* Price Badge */}
            <div className="flex flex-col sm:items-end bg-white/80 backdrop-blur-xs rounded-2xl border border-indigo-200/60 p-4 shadow-sm shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {cycle === 'monthly' ? '$4.99' : '$49.99'}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {cycle === 'monthly' ? '/ month' : '/ year'}
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-600 mt-0.5">
                {cycle === 'monthly' ? 'Billed monthly • Cancel anytime' : 'Billed annually ($4.16/mo)'}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Checklist Body */}
        <div className="p-6 sm:p-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Everything Included in Your Plan:
          </h4>

          <div className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {allFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{feat.title}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <Shield className="size-4 text-emerald-600" />
              <span>30-Day Money-Back Guarantee • Instant Setup • No Contract</span>
            </div>

            <button
              type="button"
              disabled={processing}
              onClick={handleToggleSubscription}
              className={`flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 ${
                isSubscribed && profile.billing_cycle === cycle
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 hover:opacity-95'
              }`}
            >
              <CreditCard className="size-4" />
              {processing
                ? 'Processing...'
                : isSubscribed && profile.billing_cycle === cycle
                ? 'Manage Active Subscription ($4.99/mo)'
                : isSubscribed
                ? `Switch to ${cycle === 'yearly' ? 'Annual ($49.99/yr)' : 'Monthly ($4.99/mo)'}`
                : `Subscribe to All-Access — ${cycle === 'monthly' ? '$4.99/Month' : '$49.99/Year'}`}
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Status & Billing Details Card */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Subscription Status</h3>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              Active
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Current Plan</span>
              <strong className="text-slate-900">Pagelink All-Access ($4.99/Month)</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Billing Interval</span>
              <strong className="text-slate-900 capitalize">{profile.billing_cycle || 'monthly'}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Next Renewal Date</span>
              <strong className="text-slate-900">November 25, 2026</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Platform Fee on Tips & Sales</span>
              <strong className="text-emerald-600">0% (100% Creator Payout)</strong>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Payment Method</h3>
            <span className="text-xs text-slate-400">Encrypted via Stripe</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 mb-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
              VISA
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900">Visa ending in 4242</div>
              <div className="text-[11px] text-slate-400">Expires 12/28 • Default payment card</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            Need to update your card or view tax details? Receipts are automatically emailed upon renewal.
          </p>
        </div>
      </div>

      {/* Invoices & Billing History */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="size-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Billing History & Invoices</h3>
          </div>
          <span className="text-xs text-slate-400">Automatic PDF receipts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Plan Description</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-medium text-slate-900">{inv.date}</td>
                  <td className="py-3 px-3">{inv.planName}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">${inv.amount.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(inv.receiptNumber)}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      <Download className="size-3" /> Receipt ({inv.receiptNumber})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Heart,
  DollarSign,
  Download,
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  ShoppingBag,
  CreditCard,
  Building,
  ArrowRight,
  ExternalLink,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
} from 'lucide-react';
import type { Profile, SubscriberLead, TipDonation, ProductOrder, PayoutSettings } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

interface AudienceAndRevenueProps {
  profile: Profile;
  onOpenUpgrade: () => void;
}

type MonetizationTab = 'overview' | 'products' | 'tips' | 'payouts' | 'subscribers';

export function AudienceAndRevenue({ profile, onOpenUpgrade }: AudienceAndRevenueProps) {
  const [activeTab, setActiveTab] = useState<MonetizationTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  const [subscribers, setSubscribers] = useState<SubscriberLead[]>(() => storage.getSubscribers());
  const [tips, setTips] = useState<TipDonation[]>(() => storage.getTips());
  const [orders, setOrders] = useState<ProductOrder[]>(() => storage.getProductOrders());
  const [payoutSettings, setPayoutSettings] = useState<PayoutSettings>(() => storage.getPayoutSettings());

  // Tip simulation modal
  const [simulatingTip, setSimulatingTip] = useState(false);
  const [simName, setSimName] = useState('Sarah Jenkins');
  const [simAmount, setSimAmount] = useState('25');
  const [simMessage, setSimMessage] = useState('Loving the photo presets! Thanks for sharing your creative journey.');

  // Product sale simulation modal
  const [simulatingSale, setSimulatingSale] = useState(false);
  const [simCustomerName, setSimCustomerName] = useState('Marcus Vance');
  const [simCustomerEmail, setSimCustomerEmail] = useState('marcus.v@creative.studio');
  const [simProductTitle, setSimProductTitle] = useState('Tokyo Noir 2026 Preset Pack (14 Presets)');
  const [simProductPrice, setSimProductPrice] = useState('29');
  const [simPaymentMethod, setSimPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'paypal'>('apple_pay');

  // Instant Payout state
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);

  useEffect(() => {
    const handleTipsUpdate = () => setTips(storage.getTips());
    const handleOrdersUpdate = () => setOrders(storage.getProductOrders());
    const handleSubscribersUpdate = () => setSubscribers(storage.getSubscribers());
    const handlePayoutUpdate = () => setPayoutSettings(storage.getPayoutSettings());

    window.addEventListener('pagelink_tips_updated', handleTipsUpdate);
    window.addEventListener('pagelink_orders_updated', handleOrdersUpdate);
    window.addEventListener('pagelink_subscribers_updated', handleSubscribersUpdate);
    window.addEventListener('pagelink_payout_settings_updated', handlePayoutUpdate);

    return () => {
      window.removeEventListener('pagelink_tips_updated', handleTipsUpdate);
      window.removeEventListener('pagelink_orders_updated', handleOrdersUpdate);
      window.removeEventListener('pagelink_subscribers_updated', handleSubscribersUpdate);
      window.removeEventListener('pagelink_payout_settings_updated', handlePayoutUpdate);
    };
  }, []);

  // Financial calculations
  const totalTipRevenue = tips.reduce((acc, t) => acc + t.amount, 0);
  const totalProductRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const totalCombinedRevenue = totalTipRevenue + totalProductRevenue;
  const avgTip = tips.length > 0 ? (totalTipRevenue / tips.length).toFixed(1) : '0';
  const avgOrder = orders.length > 0 ? (totalProductRevenue / orders.length).toFixed(1) : '0';

  const handleSimulateTip = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(simAmount) || 20;
    storage.addTip(simName, amt, simMessage);
    setTips(storage.getTips());
    setSimulatingTip(false);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  const handleSimulateProductSale = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(simProductPrice) || 29;
    storage.addProductOrder(
      'link_3',
      simProductTitle,
      simCustomerName,
      simCustomerEmail,
      price,
      simPaymentMethod
    );
    setOrders(storage.getProductOrders());
    setSimulatingSale(false);
    try {
      confetti({ particleCount: 80, spread: 85, origin: { y: 0.55 } });
    } catch {}
  };

  const handleRequestInstantPayout = () => {
    if (totalCombinedRevenue <= 0) return;
    setIsProcessingPayout(true);
    setTimeout(() => {
      const res = storage.triggerInstantPayout(totalCombinedRevenue);
      setIsProcessingPayout(false);
      setPayoutSuccessMsg(res.message);
      try {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 } });
      } catch {}
      setTimeout(() => setPayoutSuccessMsg(null), 6000);
    }, 700);
  };

  const handleSavePayoutSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storage.savePayoutSettings(payoutSettings);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    } catch {}
  };

  const handleExportOrdersCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Product', 'Amount (USD)', 'Payment Method', 'Status', 'Date'];
    const rows = orders.map((o) => [
      o.id,
      o.customer_name,
      o.customer_email,
      o.product_title,
      `$${o.amount.toFixed(2)}`,
      o.payment_method,
      o.status,
      o.created_at,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => `"${e.join('","')}"`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pagelink_orders_${profile.handle}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSubscribersCSV = () => {
    const headers = ['Email', 'Subscribed At', 'Source Link / Block', 'Handle'];
    const rows = subscribers.map((s) => [s.email, s.created_at, s.source_link_title || 'Direct', s.handle]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => `"${e.join('","')}"`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pagelink_subscribers_${profile.handle}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEmails = () => {
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.source_link_title && s.source_link_title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Monetization, Orders &amp; Payouts
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              <ShieldCheck className="size-3.5" /> 0% Platform Fee
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Collect credit card, Apple Pay, Google Pay, and PayPal payments for digital downloads and tip jars with automated bank payouts.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs">
          <button
            type="button"
            onClick={() => { setActiveTab('overview'); setSearchQuery(''); }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Wallet className="size-3.5" />
            <span>Overview (${totalCombinedRevenue})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="size-3.5" />
            <span>Product Sales ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('tips'); setSearchQuery(''); }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'tips'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Heart className="size-3.5 text-rose-500" />
            <span>Tip Jar ({tips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('payouts'); setSearchQuery(''); }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'payouts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="size-3.5" />
            <span>Payout Settings</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('subscribers'); setSearchQuery(''); }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'subscribers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="size-3.5" />
            <span>Email Leads ({subscribers.length})</span>
          </button>
        </div>
      </div>

      {/* Payout Notification banner if triggered */}
      {payoutSuccessMsg && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Check className="size-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-xs font-bold">{payoutSuccessMsg}</p>
              <p className="text-[11px] text-emerald-700">ACH transfer initiated • Arriving in 1-2 business days</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPayoutSuccessMsg(null)}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TAB 1: OVERVIEW & EXECUTIVE METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Net Revenue
              </span>
              <div className="mt-1 text-3xl font-black text-slate-900">
                ${totalCombinedRevenue.toFixed(2)}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <ShieldCheck className="size-4" /> 100% Creator Payout • 0% Fee
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Digital Product Sales
              </span>
              <div className="mt-1 text-3xl font-black text-indigo-600">
                ${totalProductRevenue.toFixed(2)}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {orders.length} digital download orders fulfilled
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tip Jar Fan Support
              </span>
              <div className="mt-1 text-3xl font-black text-rose-500">
                ${totalTipRevenue.toFixed(2)}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {tips.length} fans sent voluntary coffee tips
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ready for Payout
                </span>
                <div className="mt-1 text-2xl font-black text-emerald-600">
                  ${totalCombinedRevenue.toFixed(2)}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Deposit to: {payoutSettings.bank_name || 'Chase Bank'} (••{payoutSettings.bank_account_last4 || '4821'})
                </p>
              </div>
              <button
                type="button"
                onClick={handleRequestInstantPayout}
                disabled={isProcessingPayout || totalCombinedRevenue <= 0}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all active:scale-98 disabled:opacity-50"
              >
                {isProcessingPayout ? 'Transferring...' : 'Request Instant Payout'}
              </button>
            </div>
          </div>

          {/* Quick Explainer Card: How creator payments work */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-600" />
              How Creators Collect Payments on Pagelink
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 max-w-3xl">
              Pagelink connects directly to your verified payment gateway. When a visitor sends a tip or buys a digital product from your bio link, the funds transfer seamlessly to your account without third-party delay.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold mb-3">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Fan or Customer Pays</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Visitors click <strong>Buy Now</strong> or <strong>Send Tip</strong> on your bio link and pay using Credit Card, Apple Pay, Google Pay, or PayPal.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="flex size-8 items-center justify-center rounded-xl bg-purple-100 text-purple-600 font-bold mb-3">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Instant Delivery &amp; Recording</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  The digital file download is automatically unlocked on-screen and emailed to the buyer. You see the order details and customer email in your dashboard.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold mb-3">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">Direct Bank Payout</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your funds are deposited automatically to your connected bank account or PayPal on your schedule (instant, daily, or weekly).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL PRODUCT SALES */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Digital Product Orders</h3>
              <p className="text-xs text-slate-500">
                All sales of your preset packs, eBooks, templates, and courses sold via bio cards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSimulatingSale(true)}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
              >
                <PlusCircle className="size-3.5" /> Simulate Test Purchase
              </button>
              <button
                type="button"
                onClick={handleExportOrdersCSV}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
              >
                <Download className="size-3.5" /> Export Orders CSV
              </button>
            </div>
          </div>

          {/* Orders search & table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="mb-4 max-w-sm relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders by customer or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Payment Gateway</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3 text-right">Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{ord.customer_name}</div>
                        <div className="text-[11px] text-slate-400">{ord.customer_email}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {ord.product_title}
                      </td>
                      <td className="py-3 px-3 font-black text-emerald-600">
                        ${ord.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        <span className="capitalize rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          {ord.payment_method.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {new Date(ord.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          Instant Download Sent
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No orders match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TIP JAR FEED & SIMULATION */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Tips Received
              </span>
              <div className="mt-1 text-2xl font-black text-emerald-600">
                ${totalTipRevenue.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500">0% Pagelink fee • 100% directly to you</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average Tip Amount
              </span>
              <div className="mt-1 text-2xl font-black text-slate-900">${avgTip}</div>
              <span className="text-[11px] text-slate-500">{tips.length} total supporter donations</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Test Tip Jar Block
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Simulate a fan sending a coffee tip</p>
              </div>
              <button
                type="button"
                onClick={() => setSimulatingTip(true)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-800 hover:bg-rose-100"
              >
                <PlusCircle className="size-3.5" /> Test Tip Simulation
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Live Fan Feed &amp; Messages</h3>
            <div className="space-y-3">
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-xs">
                      {tip.donor_name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{tip.donor_name}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(tip.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {tip.message && (
                        <p className="mt-1 text-xs text-slate-600 italic">"{tip.message}"</p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
                    +${tip.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAYOUT SETTINGS & GATEWAYS */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <form onSubmit={handleSavePayoutSettings} className="space-y-6">
            {/* Payout Gateway Selection */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Connected Payout Gateways</h3>
                  <p className="text-xs text-slate-500">
                    Select where Pagelink deposits your product sales and tip earnings.
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="size-3.5" /> Payouts Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stripe Connect Card */}
                <div
                  onClick={() => setPayoutSettings({ ...payoutSettings, payout_method: 'stripe' })}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    payoutSettings.payout_method === 'stripe'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xs">
                      S
                    </div>
                    {payoutSettings.stripe_connected && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                        Connected
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Stripe Connect</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Direct deposits to your bank account via Visa, Mastercard, Apple Pay &amp; Google Pay.
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">
                    ID: {payoutSettings.stripe_account_id}
                  </div>
                </div>

                {/* PayPal Business Card */}
                <div
                  onClick={() => setPayoutSettings({ ...payoutSettings, payout_method: 'paypal' })}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    payoutSettings.payout_method === 'paypal'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xs">
                      P
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      Linked
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">PayPal / Venmo</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Direct instant payouts to your PayPal wallet or connected debit card.
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-400 truncate">
                    {payoutSettings.paypal_email}
                  </div>
                </div>

                {/* Direct Bank Account Card */}
                <div
                  onClick={() => setPayoutSettings({ ...payoutSettings, payout_method: 'bank' })}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    payoutSettings.payout_method === 'bank'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-xs">
                      <Building className="size-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Direct Bank Deposit (ACH)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Standard ACH or SEPA electronic transfer straight into your checking account.
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">
                    •••• {payoutSettings.bank_account_last4 || '4821'}
                  </div>
                </div>
              </div>

              {/* Bank & Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bank Name / Institution
                  </label>
                  <input
                    type="text"
                    value={payoutSettings.bank_name || ''}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, bank_name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Chase Bank, Wells Fargo, Revolut"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PayPal Payout Email
                  </label>
                  <input
                    type="email"
                    value={payoutSettings.paypal_email || ''}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, paypal_email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                    placeholder="payouts@yourdomain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payout Schedule
                  </label>
                  <select
                    value={payoutSettings.payout_schedule}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, payout_schedule: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="instant">Instant (Every sale/tip deposits immediately)</option>
                    <option value="daily">Daily Batch (Every 24 hours)</option>
                    <option value="weekly">Weekly (Every Monday morning)</option>
                    <option value="monthly">Monthly (1st of each month)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payout Currency
                  </label>
                  <select
                    value={payoutSettings.payout_currency}
                    onChange={(e) => setPayoutSettings({ ...payoutSettings, payout_currency: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                    <option value="AUD">AUD ($) - Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-all"
                >
                  Save Payout Preferences
                </button>
              </div>
            </div>
          </form>

          {/* FAQ section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="size-4 text-indigo-600" />
              Frequently Asked Questions for Creators
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="rounded-xl bg-slate-50 p-3.5">
                <p className="font-bold text-slate-900 mb-0.5">Does Pagelink take any percentage fee from my sales or tips?</p>
                <p>No. On the Pagelink All-Access Pro and Business tiers, Pagelink charges <strong>0% platform commission</strong>. Standard payment processing fees (e.g. Stripe's 2.9% + 30¢) are deducted directly by the processor.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5">
                <p className="font-bold text-slate-900 mb-0.5">Can I also link external checkouts like Gumroad, Shopify, or Stan Store?</p>
                <p>Yes! In the <strong>Links</strong> tab, you can add a standard Link Block or Digital Product Block pointing to any external store (Gumroad, Lemon Squeezy, Shopify, Etsy, Amazon, or Teachable), or sell directly via Pagelink's native 1-click checkout.</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5">
                <p className="font-bold text-slate-900 mb-0.5">How are files delivered to my customers?</p>
                <p>When a buyer checks out on your bio page, the download link unlocks immediately on screen and an automated email receipt with the download URL is sent to the email they entered at checkout.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SUBSCRIBERS / EMAIL LEADS */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Subscribers
              </span>
              <div className="mt-1 text-2xl font-black text-slate-900">
                {(subscribers.length + 14200).toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">
                +{subscribers.length} captured directly via Bio Link
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Audience Value
              </span>
              <div className="mt-1 text-2xl font-black text-indigo-600">$2.40 / lead</div>
              <span className="text-[11px] text-slate-500">Industry standard creative audience</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sync Status
              </span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <ShieldCheck className="size-4 text-emerald-500" /> Ready for Export
              </div>
              <span className="text-[11px] text-slate-500">100% GDPR &amp; CAN-SPAM compliant</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subscribers by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmails}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {copiedAll ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 text-slate-500" /> Copy All
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleExportSubscribersCSV}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                >
                  <Download className="size-3.5" /> Download CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Subscriber Email</th>
                    <th className="py-2.5 px-3">Source Block</th>
                    <th className="py-2.5 px-3">Date Joined</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">{sub.email}</td>
                      <td className="py-3 px-3 text-slate-500">
                        {sub.source_link_title || 'Bio Lead Capture'}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredSubscribers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        No subscribers matched your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tip Simulation Modal */}
      {simulatingTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSimulateTip}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="size-4 text-rose-500 fill-rose-500" /> Simulate Supporter Tip
              </h3>
              <button
                type="button"
                onClick={() => setSimulatingTip(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Supporter Name</label>
              <input
                type="text"
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tip Amount ($ USD)
              </label>
              <input
                type="number"
                value={simAmount}
                onChange={(e) => setSimAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Supporter Message</label>
              <textarea
                rows={2}
                value={simMessage}
                onChange={(e) => setSimMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSimulatingTip(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700"
              >
                Receive Simulated Tip
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Sale Simulation Modal */}
      {simulatingSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleSimulateProductSale}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="size-4 text-indigo-600" /> Simulate Product Purchase
              </h3>
              <button
                type="button"
                onClick={() => setSimulatingSale(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={simCustomerName}
                onChange={(e) => setSimCustomerName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Email</label>
              <input
                type="email"
                value={simCustomerEmail}
                onChange={(e) => setSimCustomerEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Price ($)</label>
                <input
                  type="number"
                  value={simProductPrice}
                  onChange={(e) => setSimProductPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={simPaymentMethod}
                  onChange={(e) => setSimPaymentMethod(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                >
                  <option value="apple_pay">Apple Pay</option>
                  <option value="google_pay">Google Pay</option>
                  <option value="card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSimulatingSale(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Process Test Sale
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

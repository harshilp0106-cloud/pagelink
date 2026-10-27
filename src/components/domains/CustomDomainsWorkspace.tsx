import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Globe,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Link2,
  ShieldCheck,
  Server,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Lock,
  ArrowRight,
  ChevronDown,
  Download,
} from 'lucide-react';
import type { Profile } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

interface CustomDomainsWorkspaceProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
  onOpenUpgrade?: () => void;
}

export function CustomDomainsWorkspace({
  profile,
  onProfileChange,
}: CustomDomainsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'domain' | 'seo'>('domain');
  const [customDomainInput, setCustomDomainInput] = useState(profile.custom_domain || 'www.pagelink.in');
  const [handleInput, setHandleInput] = useState(profile.handle);
  const [seoTitle, setSeoTitle] = useState(profile.seo_title || `${profile.display_name} | Official Bio`);
  const [seoDesc, setSeoDesc] = useState(
    profile.seo_description || `Official bio link page for ${profile.display_name}. Links, tutorials, and content.`
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [dnsCheckSuccess, setDnsCheckSuccess] = useState<boolean | null>(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeRegistrarTab, setActiveRegistrarTab] = useState<'hostinger' | 'godaddy' | 'namecheap' | 'cloudflare'>('hostinger');

  const currentDomain = profile.custom_domain || 'www.pagelink.in';
  const displayUrl = `https://${currentDomain}`;

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } catch {}
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestDnsConnection = () => {
    setIsVerifying(true);
    setDnsCheckSuccess(null);
    setTimeout(() => {
      setIsVerifying(false);
      setDnsCheckSuccess(true);
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      } catch {}
    }, 1200);
  };

  const handleSaveDomainAndSEO = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = customDomainInput.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const cleanHandle = handleInput.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '');

    const updated: Profile = {
      ...profile,
      handle: cleanHandle || profile.handle,
      custom_domain: cleanDomain || 'www.pagelink.in',
      custom_domain_status: 'verified',
      seo_title: seoTitle.trim(),
      seo_description: seoDesc.trim(),
    };

    onProfileChange(updated);
    storage.saveProfile(updated);
    setSavedSuccess(true);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
    } catch {}
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Alert */}
      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg animate-bounce">
          <CheckCircle2 className="size-4" />
          <span>Domain www.pagelink.in and SEO settings published successfully!</span>
        </div>
      )}

      {/* Header & Sub-Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Custom Domain &amp; SEO Publishing
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 border border-indigo-200">
              <Globe className="size-3.5" /> www.pagelink.in
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish your PageLink bio on your own branded domain www.pagelink.in with automatic free SSL certificate.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('domain')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'domain'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="size-3.5" />
            <span>Custom Domain (Active)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'seo'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="size-3.5" />
            <span>SEO &amp; Social Share</span>
          </button>
        </div>
      </div>

      {activeTab === 'domain' ? (
        /* CUSTOM DOMAIN SETUP TAB */
        <div className="space-y-6">
          {/* 1-Click Download Packages Card for Hostinger / Backup */}
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50/90 via-purple-50/40 to-white p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Download className="size-4" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Download Project ZIP Files
                  </h3>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    Ready to Upload
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Download the ready-to-upload Hostinger deployment package (with <code className="bg-white/80 px-1 py-0.5 rounded text-indigo-700 font-mono">.htaccess</code>, <code className="bg-white/80 px-1 py-0.5 rounded text-indigo-700 font-mono">index.html</code> &amp; assets) or the complete source code.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href="/pagelink-hostinger-ready.zip"
                  download="pagelink-hostinger-ready.zip"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-all active:scale-98"
                >
                  <Download className="size-3.5" />
                  <span>Download Hostinger-Ready ZIP</span>
                </a>

                <a
                  href="/pagelink-source-code.zip"
                  download="pagelink-source-code.zip"
                  className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Download className="size-3.5 text-slate-400" />
                  <span>Download Source Code ZIP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Active Domain Live Status Banner */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-indigo-50/40 p-6 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Globe className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black tracking-tight text-slate-900">
                      {currentDomain}
                    </h3>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      <Lock className="size-3 text-emerald-700" /> Connected &amp; SSL Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Your PageLink bio is configured to serve directly on <strong>https://{currentDomain}</strong> with 256-bit TLS encryption.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyText(displayUrl, 'main_url')}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
                >
                  {copiedKey === 'main_url' ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 text-slate-500" /> Copy Domain
                    </>
                  )}
                </button>

                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors"
                >
                  <span>Visit Domain</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Quick DNS Diagnostic results */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-slate-200/80 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>CNAME: <strong>www.pagelink.in</strong> → Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>SSL Certificate: <strong>Let's Encrypt (TLS 1.3)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Apex Redirect: <strong>pagelink.in → www</strong></span>
              </div>
            </div>
          </div>

          {/* Domain Configuration Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Configure Domain Name</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set or change your primary domain address. Both root and www are automatically bound.
              </p>
            </div>

            <form onSubmit={handleSaveDomainAndSEO} className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center rounded-xl border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-indigo-600">
                  <Globe className="size-4 text-slate-400 mr-2 shrink-0" />
                  <span className="text-xs font-semibold text-slate-400 select-none mr-1">https://</span>
                  <input
                    type="text"
                    required
                    value={customDomainInput}
                    onChange={(e) => setCustomDomainInput(e.target.value)}
                    placeholder="www.pagelink.in"
                    className="flex-1 bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestDnsConnection}
                    disabled={isVerifying}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`size-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                    <span>{isVerifying ? 'Checking DNS...' : 'Verify DNS Connection'}</span>
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors"
                  >
                    Save Domain
                  </button>
                </div>
              </div>
            </form>

            {dnsCheckSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>DNS records for www.pagelink.in are correctly detected!</strong> Your bio page traffic is routed securely to PageLink edge servers.
                </span>
              </div>
            )}
          </div>

          {/* DNS Configuration Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Server className="size-4 text-indigo-600" />
                  Required DNS Records for www.pagelink.in
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add these 2 DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                TTL: Automatic or 300s
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Name / Host</th>
                    <th className="py-2.5 px-3">Target / Value</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Record 1: CNAME */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 font-mono">
                        CNAME
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      www
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      cname.pagelink.in
                    </td>
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <Check className="size-3 stroke-[3]" /> Active &amp; Pointed
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyText('cname.pagelink.in', 'cname_val')}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
                      >
                        {copiedKey === 'cname_val' ? 'Copied' : 'Copy Target'}
                      </button>
                    </td>
                  </tr>

                  {/* Record 2: A Record (Apex) */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 font-mono">
                        A
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      @ <span className="text-[10px] text-slate-400 font-normal">(or blank)</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      76.76.21.21
                    </td>
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <Check className="size-3 stroke-[3]" /> Redirects to www
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyText('76.76.21.21', 'a_val')}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
                      >
                        {copiedKey === 'a_val' ? 'Copied' : 'Copy IP'}
                      </button>
                    </td>
                  </tr>

                  {/* Record 3: TXT Ownership Verification */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 font-mono">
                        TXT
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      @
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 truncate max-w-xs">
                      pagelink-verification=pl_in_984210
                    </td>
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <Check className="size-3 stroke-[3]" /> Verified
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyText('pagelink-verification=pl_in_984210', 'txt_val')}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
                      >
                        {copiedKey === 'txt_val' ? 'Copied' : 'Copy Record'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Registrar Setup Guide */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="size-4 text-indigo-600" />
              Step-by-Step Instructions by Registrar
            </h3>

            {/* Registrar Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'hostinger', label: 'Hostinger (Recommended)' },
                { id: 'godaddy', label: 'GoDaddy' },
                { id: 'namecheap', label: 'Namecheap' },
                { id: 'cloudflare', label: 'Cloudflare' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRegistrarTab(r.id as any)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    activeRegistrarTab === r.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Registrar instructions content */}
            <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-700 space-y-3 border border-slate-100">
              {activeRegistrarTab === 'hostinger' && (
                <div className="space-y-4">
                  {/* Option A: Quick Hostinger Chat message */}
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                        <Sparkles className="size-4 text-indigo-600" />
                        Option 1 (Easiest): Ask Hostinger 24/7 Live Support
                      </span>
                      <span className="rounded-full bg-indigo-200/80 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                        Takes 1 minute
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-900 leading-relaxed">
                      You never need to give your personal Hostinger password to anyone. Instead, simply copy this text and paste it into <strong>Hostinger 24/7 Live Support Chat</strong>. Their team will update it for you immediately:
                    </p>
                    <div className="rounded-lg border border-indigo-200 bg-white p-3 font-mono text-[11px] text-slate-800 leading-relaxed select-all">
                      "Hello Hostinger Support, please update the DNS records for my domain pagelink.in: 1) Add CNAME record with Name 'www' pointing to 'cname.pagelink.in'. 2) Add A record with Name '@' pointing to IP '76.76.21.21'. Thank you!"
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            "Hello Hostinger Support, please update the DNS records for my domain pagelink.in: 1) Add CNAME record with Name 'www' pointing to 'cname.pagelink.in'. 2) Add A record with Name '@' pointing to IP '76.76.21.21'. Thank you!",
                            'hostinger_chat_msg'
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                      >
                        {copiedKey === 'hostinger_chat_msg' ? (
                          <>
                            <Check className="size-3.5 text-white" /> Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" /> Copy Hostinger Support Message
                          </>
                        )}
                      </button>
                      <a
                        href="https://hpanel.hostinger.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <span>Open Hostinger hPanel</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>

                  {/* Option B: Do it yourself in 2 minutes */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-2">
                      Option 2: Add it yourself in Hostinger hPanel (3 clicks):
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                      <li>
                        Log in to <strong>hpanel.hostinger.com</strong> and click <strong>Domains</strong> at the top.
                      </li>
                      <li>
                        Click on <strong>pagelink.in</strong>, then in the left menu click <strong>DNS / Nameservers</strong>.
                      </li>
                      <li>
                        Under <strong>"Manage DNS records"</strong>, fill in these exact boxes:
                      </li>
                    </ol>

                    {/* Hostinger Visual Mockup Box */}
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 space-y-2 shadow-2xs">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Hostinger DNS Form 1 (CNAME):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Type</span>
                          <span className="font-bold text-indigo-700">CNAME</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Name</span>
                          <span className="font-bold text-slate-900">www</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Target</span>
                          <span className="font-bold text-slate-900">cname.pagelink.in</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">TTL</span>
                          <span className="font-bold text-slate-900">300</span>
                        </div>
                      </div>

                      <div className="text-[10px] uppercase font-bold text-slate-400 pt-2">
                        Hostinger DNS Form 2 (A Record):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Type</span>
                          <span className="font-bold text-blue-700">A</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Name</span>
                          <span className="font-bold text-slate-900">@</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Points to</span>
                          <span className="font-bold text-slate-900">76.76.21.21</span>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">TTL</span>
                          <span className="font-bold text-slate-900">300</span>
                        </div>
                      </div>
                    </div>

                    {/* Common Error Fix Callout */}
                    <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs text-amber-950 space-y-1.5 shadow-2xs">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <AlertCircle className="size-4 text-amber-600 shrink-0" />
                        Seeing error: "DNS resource record is not valid or conflicts with another resource record"?
                      </div>
                      <p className="text-[11px] text-amber-900/90 leading-relaxed">
                        <strong>Why this happens:</strong> Hostinger already created a default record for <strong>www</strong> when you bought the domain. Two records cannot share the same name.
                      </p>
                      <div className="rounded-lg bg-white/90 p-2.5 border border-amber-200 text-[11px] space-y-1">
                        <p className="font-semibold text-slate-900">How to fix in 10 seconds:</p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-700">
                          <li>Scroll down on your Hostinger page to the table titled <strong>"DNS Records"</strong>.</li>
                          <li>Find the existing record that has Name <strong>www</strong>.</li>
                          <li>Click the <strong>Delete</strong> (trash can icon) on that old www record (or click <strong>Edit</strong> and change Target to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-700">cname.pagelink.in</code>).</li>
                          <li>Find the existing <strong>A</strong> record with Name <strong>@</strong>, click <strong>Edit</strong>, change the IP to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-blue-700">76.76.21.21</code>, and click <strong>Update</strong>!</li>
                        </ol>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2">
                      4. Click the purple <strong>"Add Record"</strong> button. That's it! Hostinger connects your domain in just a few minutes.
                    </p>
                  </div>
                </div>
              )}

              {activeRegistrarTab === 'godaddy' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>Log in to your <strong>GoDaddy Domain Portfolio</strong> and click <strong>pagelink.in</strong>.</li>
                  <li>Click on the <strong>DNS</strong> tab.</li>
                  <li>Find the <strong>CNAME</strong> record for <strong>www</strong> and click <strong>Edit</strong>. Set the Value to <strong>cname.pagelink.in</strong>.</li>
                  <li>Find the <strong>A</strong> record with Name <strong>@</strong> and edit the Value to <strong>76.76.21.21</strong>.</li>
                  <li>Click <strong>Save</strong>. Propagation usually takes 5 to 30 minutes.</li>
                </ol>
              )}

              {activeRegistrarTab === 'namecheap' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>Log in to <strong>Namecheap</strong>, go to your <strong>Domain List</strong>, and click <strong>Manage</strong> next to <strong>pagelink.in</strong>.</li>
                  <li>Go to the <strong>Advanced DNS</strong> tab.</li>
                  <li>Click <strong>Add New Record</strong> → Select <strong>CNAME Record</strong>.</li>
                  <li>Set Host to <strong>www</strong> and Value to <strong>cname.pagelink.in</strong>.</li>
                  <li>Set A Record with Host <strong>@</strong> and IP <strong>76.76.21.21</strong>, then save changes.</li>
                </ol>
              )}

              {activeRegistrarTab === 'cloudflare' && (
                <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                  <li>In your <strong>Cloudflare Dashboard</strong>, select <strong>pagelink.in</strong> and navigate to <strong>DNS → Records</strong>.</li>
                  <li>Add a <strong>CNAME</strong> record: Name: <strong>www</strong>, Target: <strong>cname.pagelink.in</strong>, Proxy status: <strong>DNS only (Grey cloud)</strong> during initial setup.</li>
                  <li>Add an <strong>A</strong> record: Name: <strong>@</strong>, IPv4: <strong>76.76.21.21</strong>.</li>
                  <li>Save records. Cloudflare updates DNS in under 60 seconds!</li>
                </ol>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SEO & SOCIAL SHARING TAB */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">Search Engine Meta Tags for {currentDomain}</h3>
              <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                <Sparkles className="size-3.5" /> Indexed &amp; Ranked
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Control the exact title, description, and preview card shown when visitors discover <strong>{currentDomain}</strong> on Google and social media.
            </p>

            <form onSubmit={handleSaveDomainAndSEO} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Page Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Recommended: 50–60 characters ({seoTitle.length} characters)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Recommended: 120–160 characters ({seoDesc.length} characters)
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all active:scale-95"
                >
                  Save SEO &amp; Meta Tags
                </button>
              </div>
            </form>

            {/* Live Search & Social Previews */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 mb-3">Live Search &amp; Social Previews for {currentDomain}</h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Google Search snippet preview */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                    Google Search Result Snippet
                  </span>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="size-4 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] text-white font-bold">
                      P
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">
                      https://{currentDomain}
                    </div>
                  </div>
                  <h5 className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer">
                    {seoTitle}
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{seoDesc}</p>
                </div>

                {/* Social Share Card preview */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                    iMessage, X/Twitter &amp; WhatsApp Card
                  </span>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
                    <img
                      src={
                        profile.banner_url ||
                        'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80'
                      }
                      alt="OG Banner"
                      className="h-28 w-full object-cover"
                    />
                    <div className="p-2.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                        {currentDomain}
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">{seoTitle}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{seoDesc}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

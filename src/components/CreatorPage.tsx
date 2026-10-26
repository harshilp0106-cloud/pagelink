import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  Sparkles,
  Heart,
  Mail,
  ExternalLink,
  Play,
  ShoppingBag,
  ArrowUpRight,
  CreditCard,
  Lock,
  X,
  ShieldCheck,
  Download,
} from 'lucide-react';
import type { Profile, PageLink, SocialLink } from '@/src/types/index';
import { themeStyle, cardStyle } from '@/src/lib/theme';
import { SocialIcon, isIconKey, type IconKey } from '@/src/lib/social-icons';
import { iconForUrl, playerSrc } from '@/src/lib/links';
import { storage } from '@/src/lib/storage';

interface CreatorPageProps {
  profile: Profile;
  links: PageLink[];
  socials: SocialLink[];
  mode?: 'live' | 'preview';
  onLinkClick?: (link: PageLink) => void;
  onOpenUpgrade?: () => void;
}

export function CreatorPage({
  profile,
  links,
  socials,
  mode = 'live',
  onLinkClick,
  onOpenUpgrade,
}: CreatorPageProps) {
  const visibleLinks = links.filter((l) => l.is_visible);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  // Tip jar state
  const [selectedTipAmount, setSelectedTipAmount] = useState<number>(5);
  const [customTip, setCustomTip] = useState<string>('');
  const [tipperName, setTipperName] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [tipSubmitted, setTipSubmitted] = useState(false);
  const [sendingTip, setSendingTip] = useState(false);

  // Digital product state
  const [boughtProduct, setBoughtProduct] = useState<string | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<PageLink | null>(null);
  const [buyerName, setBuyerName] = useState('Sarah Jenkins');
  const [buyerEmail, setBuyerEmail] = useState('sarah.j@studio.com');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'paypal'>('apple_pay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [lastPurchasedTitle, setLastPurchasedTitle] = useState<string>('');

  const handleSubscribe = (e: React.FormEvent, sourceTitle?: string) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) return;
    setSubscribing(true);
    setTimeout(() => {
      storage.addSubscriber(subscriberEmail, sourceTitle || 'Newsletter Block');
      setSubscribed(true);
      setSubscribing(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }, 400);
  };

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customTip ? parseFloat(customTip) : selectedTipAmount;
    if (!amount || isNaN(amount) || amount <= 0) return;
    setSendingTip(true);
    setTimeout(() => {
      storage.addTip(tipperName, amount, tipMessage);
      setSendingTip(false);
      setTipSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }, 450);
  };

  const handleOpenCheckout = (link: PageLink) => {
    setCheckoutProduct(link);
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutProduct) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      storage.addProductOrder(
        checkoutProduct.id,
        checkoutProduct.title,
        buyerName,
        buyerEmail,
        checkoutProduct.price || 19,
        paymentMethod
      );
      setLastPurchasedTitle(checkoutProduct.title);
      setBoughtProduct(checkoutProduct.id);
      storage.incrementLinkClick(checkoutProduct.id);
      setIsProcessingPayment(false);
      setCheckoutProduct(null);
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {}
      setTimeout(() => {
        setBoughtProduct(null);
      }, 5000);
    }, 550);
  };

  const handleRowClick = (link: PageLink) => {
    storage.incrementLinkClick(link.id);
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  const showBranding = !profile.remove_branding || profile.subscription_tier === 'free';

  return (
    <div
      className="creator-page relative flex min-h-full w-full flex-col items-center transition-colors duration-300"
      style={themeStyle(profile.theme)}
    >
      {/* Banner Image */}
      {profile.banner_url && (
        <div className="w-full max-w-lg px-4 pt-4 sm:px-5 sm:pt-6">
          <img
            src={profile.banner_url}
            alt="Profile Banner"
            className="aspect-[2.3/1] w-full rounded-2xl object-cover shadow-sm transition-transform duration-300"
          />
        </div>
      )}

      {/* Profile Header */}
      <div
        className={`flex w-full max-w-lg flex-col items-center gap-5 px-4 pb-12 sm:px-5 ${
          profile.banner_url ? '-mt-12 pt-0' : 'pt-8'
        }`}
      >
        <header className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-3">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name || profile.handle}
                className="size-24 rounded-full object-cover shadow-md"
                style={{
                  boxShadow: '0 0 0 4px var(--page-bg)',
                  borderColor: 'var(--accent)',
                }}
              />
            ) : (
              <div
                className="flex size-24 items-center justify-center rounded-full text-2xl font-bold shadow-md"
                style={{
                  background: 'var(--card-bg)',
                  color: 'var(--card-fg)',
                  boxShadow: '0 0 0 4px var(--page-bg)',
                }}
              >
                {(profile.display_name || profile.handle).slice(0, 1).toUpperCase()}
              </div>
            )}
            {profile.subscription_tier !== 'free' && (
              <div
                className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm"
                style={{ boxShadow: '0 0 0 2px var(--page-bg)' }}
                title="Verified SaaS Creator"
              >
                <Check className="size-3.5 stroke-[3]" />
              </div>
            )}
          </div>

          {/* Name & Handle */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {profile.display_name || profile.handle}
              </h1>
            </div>
            <p className="text-sm font-medium opacity-70">@{profile.handle}</p>
          </div>

          {/* Bio text */}
          {profile.bio && (
            <p className="mt-2.5 max-w-md text-sm leading-relaxed opacity-85 whitespace-pre-line">
              {profile.bio}
            </p>
          )}

          {/* Social Icons row */}
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => {
                const key: IconKey = isIconKey(social.platform)
                  ? (social.platform as IconKey)
                  : iconForUrl(social.url);
                return (
                  <li key={social.id}>
                    {mode === 'live' ? (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="flex size-9 items-center justify-center rounded-full bg-current/10 opacity-80 transition-all hover:scale-110 hover:opacity-100"
                      >
                        <SocialIcon name={key} className="size-5" />
                      </a>
                    ) : (
                      <span className="flex size-9 items-center justify-center rounded-full bg-current/10 opacity-80">
                        <SocialIcon name={key} className="size-5" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </header>

        {/* Links & Blocks List */}
        <div className="flex w-full flex-col gap-3.5">
          {visibleLinks.map((link) => {
            // Header Block
            if (link.kind === 'header') {
              return (
                <div key={link.id} className="pt-3 pb-1 text-center">
                  <span className="text-xs font-bold tracking-wider uppercase opacity-65">
                    {link.title}
                  </span>
                </div>
              );
            }

            // Embedded Media Block
            if (link.kind === 'embed' && link.embed_mode === 'player' && link.platform) {
              const src = playerSrc(link.platform, link.external_id ?? '');
              const isSpotify = link.platform === 'spotify';
              return (
                <div key={link.id} className="flex flex-col gap-1.5 overflow-hidden rounded-xl">
                  {src ? (
                    <div
                      className="overflow-hidden shadow-md"
                      style={{ borderRadius: 'var(--card-radius)', background: 'var(--card-bg)' }}
                    >
                      <iframe
                        src={src}
                        title={link.title || link.platform}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="w-full border-0"
                        style={{ height: isSpotify ? 152 : 200 }}
                      />
                    </div>
                  ) : null}
                  {link.title && (
                    <p className="px-1 text-center text-xs font-medium opacity-70">{link.title}</p>
                  )}
                </div>
              );
            }

            // Digital Product Block (SaaS feature)
            if (link.kind === 'product') {
              return (
                <div
                  key={link.id}
                  className="flex flex-col gap-3 p-4 transition-all"
                  style={cardStyle(profile.theme)}
                >
                  <div className="flex items-start gap-3">
                    {link.thumbnail_url ? (
                      <img
                        src={link.thumbnail_url}
                        alt=""
                        className="size-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                        <ShoppingBag className="size-6" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold">{link.title}</span>
                        {link.price && (
                          <span className="shrink-0 rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-600">
                            ${link.price}
                          </span>
                        )}
                      </div>
                      {link.description && (
                        <p className="mt-1 text-xs opacity-75 line-clamp-2">{link.description}</p>
                      )}
                    </div>
                  </div>

                  {boughtProduct === link.id ? (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/20 py-2.5 text-xs font-bold text-emerald-600">
                      <Check className="size-4" /> Download Link Unlocked & Sent!
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenCheckout(link)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold shadow-sm transition-transform active:scale-95"
                      style={{
                        background: 'var(--accent)',
                        color: '#ffffff',
                      }}
                    >
                      <ShoppingBag className="size-3.5" /> Buy Now (${link.price || 19})
                    </button>
                  )}
                </div>
              );
            }

            // Tip Jar Block (SaaS feature)
            if (link.kind === 'tip_jar') {
              return (
                <div
                  key={link.id}
                  className="flex flex-col gap-3 p-4 text-left transition-all"
                  style={cardStyle(profile.theme)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                      <Heart className="size-5 fill-amber-500" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{link.title}</h3>
                      {link.description && (
                        <p className="text-xs opacity-75">{link.description}</p>
                      )}
                    </div>
                  </div>

                  {tipSubmitted ? (
                    <div className="flex flex-col items-center gap-1.5 rounded-lg bg-emerald-500/15 py-3 text-center text-xs font-medium text-emerald-600">
                      <Check className="size-5" />
                      <span>Thank you so much for your generosity! ❤️</span>
                      <button
                        type="button"
                        onClick={() => setTipSubmitted(false)}
                        className="mt-1 text-[11px] underline opacity-80"
                      >
                        Send another tip
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendTip} className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        {[3, 5, 10, 25].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedTipAmount(amt);
                              setCustomTip('');
                            }}
                            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                              selectedTipAmount === amt && !customTip
                                ? 'bg-current text-white shadow-sm ring-2 ring-current/20'
                                : 'bg-current/10 opacity-80 hover:opacity-100'
                            }`}
                            style={
                              selectedTipAmount === amt && !customTip
                                ? { background: 'var(--accent)', color: '#ffffff' }
                                : {}
                            }
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Your name (optional)"
                          value={tipperName}
                          onChange={(e) => setTipperName(e.target.value)}
                          className="flex-1 rounded-lg border border-current/20 bg-current/5 px-2.5 py-1.5 text-xs placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-current"
                        />
                        <input
                          type="number"
                          placeholder="Custom $"
                          value={customTip}
                          onChange={(e) => {
                            setCustomTip(e.target.value);
                            setSelectedTipAmount(0);
                          }}
                          className="w-20 rounded-lg border border-current/20 bg-current/5 px-2.5 py-1.5 text-xs placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-current"
                          min="1"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Say something nice..."
                        value={tipMessage}
                        onChange={(e) => setTipMessage(e.target.value)}
                        className="w-full rounded-lg border border-current/20 bg-current/5 px-2.5 py-1.5 text-xs placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-current"
                      />

                      <button
                        type="submit"
                        disabled={sendingTip}
                        className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold shadow-sm transition-transform active:scale-98 disabled:opacity-50"
                        style={{
                          background: 'var(--accent)',
                          color: '#ffffff',
                        }}
                      >
                        <Heart className="size-3.5 fill-current" />
                        {sendingTip
                          ? 'Processing...'
                          : `Send $${customTip || selectedTipAmount} Tip`}
                      </button>
                    </form>
                  )}
                </div>
              );
            }

            // Newsletter / Email Lead Block (SaaS feature)
            if (link.kind === 'newsletter') {
              return (
                <div
                  key={link.id}
                  className="flex flex-col gap-3 p-4 text-left transition-all"
                  style={cardStyle(profile.theme)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{link.title}</h3>
                      {link.description && (
                        <p className="text-xs opacity-75">{link.description}</p>
                      )}
                    </div>
                  </div>

                  {subscribed ? (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/15 py-2.5 text-xs font-semibold text-emerald-600">
                      <Check className="size-4" /> You are on the VIP list!
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => handleSubscribe(e, link.title)}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={subscriberEmail}
                        onChange={(e) => setSubscriberEmail(e.target.value)}
                        className="flex-1 rounded-lg border border-current/20 bg-current/5 px-3 py-2 text-xs placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-current"
                      />
                      <button
                        type="submit"
                        disabled={subscribing}
                        className="rounded-lg px-4 py-2 text-xs font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-50"
                        style={{
                          background: 'var(--accent)',
                          color: '#ffffff',
                        }}
                      >
                        {subscribing ? 'Joining...' : 'Subscribe'}
                      </button>
                    </form>
                  )}
                </div>
              );
            }

            // Standard Clickable Link
            const icon: IconKey = isIconKey(link.icon)
              ? (link.icon as IconKey)
              : link.platform && isIconKey(link.platform)
              ? (link.platform as IconKey)
              : iconForUrl(link.url ?? '');

            const cardClasses = `group relative flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${
              link.animation === 'glow' ? 'ring-2 ring-indigo-400/50' : ''
            } ${link.animation === 'pulse' ? 'animate-pulse' : ''}`;

            const cardContent = (
              <>
                {link.thumbnail_url ? (
                  <img
                    src={link.thumbnail_url}
                    alt=""
                    className="size-11 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-current/10">
                    <SocialIcon name={icon} className="size-5" />
                  </span>
                )}
                <span className="min-w-0 flex-1 text-center text-sm font-semibold tracking-tight">
                  {link.title}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-end opacity-40 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </span>
              </>
            );

            if (mode === 'preview') {
              return (
                <div
                  key={link.id}
                  className={cardClasses}
                  style={cardStyle(profile.theme)}
                  onClick={() => handleRowClick(link)}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={link.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
                style={cardStyle(profile.theme)}
                onClick={() => handleRowClick(link)}
              >
                {cardContent}
              </a>
            );
          })}
        </div>

        {visibleLinks.length === 0 && (
          <div className="py-8 text-center text-sm opacity-60">
            No links published yet. Add links from the editor!
          </div>
        )}

        {/* Footer Branding Badge */}
        {showBranding ? (
          <div className="pt-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenUpgrade) onOpenUpgrade();
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-current/10 px-3 py-1 text-[11px] font-medium opacity-70 transition-all hover:opacity-100"
            >
              <Sparkles className="size-3 text-amber-500" />
              <span>Created with Pagelink</span>
            </a>
          </div>
        ) : (
          <div className="pt-4 text-[11px] opacity-40">Verified Creator Page</div>
        )}

        {/* Digital Product Checkout Modal */}
        {checkoutProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs text-slate-900">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Lock className="size-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Secure Instant Checkout</h3>
                    <p className="text-[10px] text-slate-400">256-bit encrypted • 0% creator cut</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutProduct(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Product summary card */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 border border-slate-100">
                {checkoutProduct.thumbnail_url ? (
                  <img
                    src={checkoutProduct.thumbnail_url}
                    alt=""
                    className="size-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xs">
                    <ShoppingBag className="size-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {checkoutProduct.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">Instant digital download file</p>
                </div>
                <span className="text-sm font-black text-emerald-600">
                  ${checkoutProduct.price || 19}
                </span>
              </div>

              <form onSubmit={handleConfirmCheckout} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email for Download & Receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'apple_pay', label: 'Apple Pay' },
                      { id: 'google_pay', label: 'Google Pay' },
                      { id: 'card', label: 'Credit Card' },
                      { id: 'paypal', label: 'PayPal' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-semibold transition-all ${
                          paymentMethod === m.id
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="size-3" />
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      'Processing Payment...'
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        <span>Pay ${checkoutProduct.price || 19} &amp; Unlock Download</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                    <ShieldCheck className="size-3 text-emerald-500" />
                    <span>Payout routed directly to creator's verified account</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

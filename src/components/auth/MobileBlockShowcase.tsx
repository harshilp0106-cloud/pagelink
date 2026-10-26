import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  Sparkles,
  Check,
  Heart,
  Mail,
  ShoppingBag,
  ArrowUpRight,
  Wifi,
  Battery,
  Link2,
  Heading,
  PlaySquare,
  Music,
  Share2,
  Palette,
  Layers,
} from 'lucide-react';
import type { Profile, PageLink, SocialLink } from '@/src/types/index';
import { PRESETS, themeStyle, cardStyle } from '@/src/lib/theme';
import { SocialIcon, type IconKey, isIconKey } from '@/src/lib/social-icons';
import { playerSrc, iconForUrl } from '@/src/lib/links';
import { storage } from '@/src/lib/storage';

interface MobileBlockShowcaseProps {
  currentDisplayName?: string;
  currentHandle?: string;
  authMode?: 'login' | 'signup';
}

type BlockFilterType = 'all' | 'link' | 'embed' | 'product' | 'tip_jar' | 'newsletter' | 'header' | 'socials';

export function MobileBlockShowcase({
  currentDisplayName,
  currentHandle,
  authMode = 'login',
}: MobileBlockShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<BlockFilterType>('all');
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>('midnight');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Interactive block states
  const [boughtProduct, setBoughtProduct] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [selectedTipAmount, setSelectedTipAmount] = useState<number>(5);
  const [customTip, setCustomTip] = useState<string>('');
  const [tipperName, setTipperName] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [tipSubmitted, setTipSubmitted] = useState(false);
  const [sendingTip, setSendingTip] = useState(false);

  // Retrieve base profile or fall back to default Monstilo data
  const baseProfile = storage.getProfile();
  const themePreset = PRESETS[selectedThemeKey] || PRESETS.midnight;

  const displayProfile: Profile = {
    ...baseProfile,
    display_name: (currentDisplayName?.trim() || baseProfile.display_name || 'Monstilo'),
    handle: (currentHandle?.trim() || baseProfile.handle || 'monstilo'),
    theme: {
      ...baseProfile.theme,
      preset: selectedThemeKey,
      font: themePreset.font,
      radius: themePreset.radius,
      button: themePreset.button,
    },
  };

  // Curated demo socials with Pitchbrand defaults
  const demoSocials: SocialLink[] = [
    { id: 's_ig', profile_id: displayProfile.id, platform: 'instagram', url: 'https://instagram.com/Pitchbrand.in_', position: 0 },
    { id: 's_yt', profile_id: displayProfile.id, platform: 'youtube', url: 'https://youtube.com/@@PitchBrand.in_yt', position: 1 },
    { id: 's_tk', profile_id: displayProfile.id, platform: 'tiktok', url: 'https://tiktok.com/@Pitchbrand.in', position: 2 },
    { id: 's_x',  profile_id: displayProfile.id, platform: 'x', url: 'https://x.com/Pitchbrand.in', position: 3 },
    { id: 's_sp', profile_id: displayProfile.id, platform: 'spotify', url: 'https://open.spotify.com/artist/Pitchbrand.in', position: 4 },
  ];

  // Comprehensive suite of all 7 block kinds
  const showcaseLinks: PageLink[] = [
    {
      id: 'demo_header_1',
      profile_id: displayProfile.id,
      kind: 'header',
      title: 'FEATURED DROP & MEDIA',
      url: null,
      icon: null,
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 0,
      is_visible: true,
      clicks: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_embed_video',
      profile_id: displayProfile.id,
      kind: 'embed',
      title: 'Tokyo After Dark: 35mm Street Documentary',
      url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      icon: 'youtube',
      platform: 'youtube',
      external_id: 'kJQP7kiw5Fk',
      thumbnail_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
      embed_mode: 'player',
      position: 1,
      is_visible: true,
      clicks: 1420,
      animation: 'glow',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_product_1',
      profile_id: displayProfile.id,
      kind: 'product',
      title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
      url: 'https://pagelink.to',
      icon: 'website',
      platform: null,
      external_id: null,
      thumbnail_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&auto=format&fit=crop&q=80',
      embed_mode: 'card',
      position: 2,
      is_visible: true,
      clicks: 860,
      price: 29,
      description: 'Instant .DNG & .XMP download for Lightroom Mobile and Desktop. Moody cinematic film tones.',
      animation: 'pulse',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_tip_jar',
      profile_id: displayProfile.id,
      kind: 'tip_jar',
      title: 'Support Independent Street Expeditions ☕',
      url: null,
      icon: null,
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 3,
      is_visible: true,
      clicks: 340,
      description: 'Buy me a matcha or coffee! 100% goes directly to 35mm film stock, gallery prints, and travel.',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_newsletter',
      profile_id: displayProfile.id,
      kind: 'newsletter',
      title: 'Join 14,200+ Photographers on Substack',
      url: null,
      icon: 'email',
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 4,
      is_visible: true,
      clicks: 980,
      description: 'Weekly behind-the-scenes, secret photo locations, lighting breakdowns & free preset giveaways.',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_header_2',
      profile_id: displayProfile.id,
      kind: 'header',
      title: 'AUDIO & WORKSHOPS',
      url: null,
      icon: null,
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 5,
      is_visible: true,
      clicks: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_embed_audio',
      profile_id: displayProfile.id,
      kind: 'embed',
      title: 'Night Shift Radio: Ambient Lo-Fi Beats',
      url: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
      icon: 'spotify',
      platform: 'spotify',
      external_id: 'track/4cOdK2wGLETKBW3PvgPWqT',
      thumbnail_url: null,
      embed_mode: 'player',
      position: 6,
      is_visible: true,
      clicks: 654,
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_link_1',
      profile_id: displayProfile.id,
      kind: 'link',
      title: 'Book a 1-on-1 Portfolio & Career Mentorship',
      url: 'https://cal.com/monstilo',
      icon: 'website',
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 7,
      is_visible: true,
      clicks: 412,
      animation: 'glow',
      created_at: new Date().toISOString(),
    },
    {
      id: 'demo_link_2',
      profile_id: displayProfile.id,
      kind: 'link',
      title: 'My 2026 Camera Bag & Lens Breakdown',
      url: 'https://kit.co/monstilo/street-photography-bag',
      icon: 'website',
      platform: null,
      external_id: null,
      thumbnail_url: null,
      embed_mode: 'card',
      position: 8,
      is_visible: true,
      clicks: 720,
      created_at: new Date().toISOString(),
    },
  ];

  const handleBuyDemoProduct = () => {
    setBoughtProduct(true);
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
    setTimeout(() => setBoughtProduct(false), 4000);
  };

  const handleSendDemoTip = (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTip(true);
    setTimeout(() => {
      setSendingTip(false);
      setTipSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {}
    }, 350);
  };

  const handleSubscribeDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) return;
    setSubscribed(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
      });
    } catch {}
  };

  // Filter links based on user-selected filter button
  const displayedLinks = showcaseLinks.filter((link) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'socials') return false; // Handled in social strip
    return link.kind === activeFilter;
  });

  const shouldShowSocials = activeFilter === 'all' || activeFilter === 'socials';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Showcase Headline & Capabilities Banner */}
      <div className="w-full mb-5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-2">
          <Sparkles className="size-3.5 text-indigo-400" />
          <span>Interactive Mobile Preview · All Blocks Enabled</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          What you can add in Pagelink Web
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
          Every block below is available in your web dashboard. Test interactive buttons, media players, and forms live.
        </p>

        {/* Quick Block Filter Selector */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 max-w-xl mx-auto">
          {[
            { id: 'all', label: 'All 7 Blocks', icon: Layers },
            { id: 'product', label: 'Sell Product', icon: ShoppingBag },
            { id: 'tip_jar', label: 'Tip Jar', icon: Heart },
            { id: 'embed', label: 'Video & Audio', icon: PlaySquare },
            { id: 'newsletter', label: 'Email Leads', icon: Mail },
            { id: 'link', label: 'Web Links', icon: Link2 },
            { id: 'header', label: 'Titles', icon: Heading },
            { id: 'socials', label: 'Socials', icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as BlockFilterType)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="size-3 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme quick previewer */}
        <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-500">
            <Palette className="size-3" /> Theme:
          </span>
          {['midnight', 'sand', 'forest', 'grape', 'ocean'].map((tKey) => (
            <button
              key={tKey}
              type="button"
              onClick={() => setSelectedThemeKey(tKey)}
              className={`capitalize px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                selectedThemeKey === tKey
                  ? 'bg-slate-700 text-white ring-1 ring-slate-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tKey}
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Smartphone Mockup */}
      <div className="relative mx-auto flex w-[340px] sm:w-[364px] max-w-full flex-col overflow-hidden rounded-[46px] border-[10px] border-slate-900 bg-slate-900 shadow-2xl ring-1 ring-slate-800/80">
        {/* Status Bar & Dynamic Island */}
        <div className="relative z-20 flex h-11 w-full items-center justify-between px-6 pt-1 text-xs font-semibold text-white select-none bg-slate-950/70 backdrop-blur-md">
          <span className="text-[11px] font-bold tracking-tight">9:41</span>
          {/* Dynamic Island Pill */}
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black shadow-inner flex items-center justify-end px-2.5">
            <div className="size-2.5 rounded-full bg-slate-900/90 border border-slate-800 ring-1 ring-blue-500/20" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Wifi className="size-3.5" />
            <Battery className="size-3.5" />
          </div>
        </div>

        {/* Phone Screen Scrollable Area */}
        <div
          ref={scrollContainerRef}
          className="h-[620px] w-full overflow-y-auto rounded-b-[36px] transition-colors duration-300 relative"
          style={themeStyle(displayProfile.theme)}
        >
          {/* Banner Photo */}
          {displayProfile.banner_url && (
            <div className="w-full px-3.5 pt-3.5">
              <img
                src={displayProfile.banner_url}
                alt="Banner"
                className="aspect-[2.3/1] w-full rounded-xl object-cover shadow-xs"
              />
            </div>
          )}

          {/* Profile Header */}
          <div className={`flex w-full flex-col items-center px-4 pb-8 ${displayProfile.banner_url ? '-mt-10 pt-0' : 'pt-6'}`}>
            <header className="flex flex-col items-center text-center w-full">
              {/* Avatar with Verified Badge */}
              <div className="relative mb-2.5">
                {displayProfile.avatar_url ? (
                  <img
                    src={displayProfile.avatar_url}
                    alt={displayProfile.display_name}
                    className="size-20 rounded-full object-cover shadow-md"
                    style={{
                      boxShadow: '0 0 0 3px var(--page-bg)',
                    }}
                  />
                ) : (
                  <div
                    className="flex size-20 items-center justify-center rounded-full text-xl font-bold shadow-md"
                    style={{
                      background: 'var(--card-bg)',
                      color: 'var(--card-fg)',
                      boxShadow: '0 0 0 3px var(--page-bg)',
                    }}
                  >
                    {displayProfile.display_name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                {/* Verified Creator Badge */}
                <div
                  className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm"
                  style={{ boxShadow: '0 0 0 2px var(--page-bg)' }}
                  title="Verified Pagelink Creator"
                >
                  <Check className="size-3 stroke-[3]" />
                </div>
              </div>

              {/* Creator Name & Handle */}
              <h1 className="text-lg font-bold tracking-tight">
                {displayProfile.display_name}
              </h1>
              <p className="text-xs font-semibold opacity-70">
                @{displayProfile.handle}
              </p>

              {/* Bio */}
              <p className="mt-2 text-xs leading-relaxed opacity-85 max-w-xs whitespace-pre-line text-center">
                {displayProfile.bio}
              </p>

              {/* BLOCK: Social Links Strip */}
              {shouldShowSocials && (
                <div className="mt-3.5 w-full flex flex-col items-center">
                  <div className="mb-1.5 flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-indigo-300/80 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                    <Share2 className="size-2.5" /> Block: Social Strip
                  </div>
                  <ul className="flex flex-wrap items-center justify-center gap-2">
                    {demoSocials.map((social) => {
                      const key: IconKey = isIconKey(social.platform)
                        ? (social.platform as IconKey)
                        : iconForUrl(social.url);
                      return (
                        <li key={social.id}>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.platform}
                            className="flex size-8 items-center justify-center rounded-full bg-current/10 opacity-80 hover:opacity-100 hover:scale-105 transition-all shadow-xs"
                          >
                            <SocialIcon name={key} className="size-4" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </header>

            {/* Blocks List */}
            <div className="mt-4 flex w-full flex-col gap-3">
              {displayedLinks.map((link) => {
                // BLOCK: Section Header
                if (link.kind === 'header') {
                  return (
                    <div key={link.id} className="pt-2 text-center">
                      <div className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 bg-black/20 px-2 py-0.5 rounded border border-white/10 mb-1">
                        <Heading className="size-2.5" /> Block: Section Title
                      </div>
                      <div className="text-xs font-bold tracking-wider uppercase opacity-75">
                        {link.title}
                      </div>
                    </div>
                  );
                }

                // BLOCK: Embedded Media (YouTube or Spotify)
                if (link.kind === 'embed' && link.platform) {
                  const src = playerSrc(link.platform, link.external_id ?? '');
                  const isSpotify = link.platform === 'spotify';
                  return (
                    <div key={link.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between px-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-rose-300/90 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">
                          {isSpotify ? <Music className="size-2.5" /> : <PlaySquare className="size-2.5" />}
                          Block: {isSpotify ? 'Audio Embed' : 'Video Embed'}
                        </span>
                        <span className="text-[10px] opacity-60 font-medium">Interactive Player</span>
                      </div>
                      <div
                        className="overflow-hidden shadow-md"
                        style={{ borderRadius: 'var(--card-radius)', background: 'var(--card-bg)' }}
                      >
                        {src ? (
                          <iframe
                            src={src}
                            title={link.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                            className="w-full border-0"
                            style={{ height: isSpotify ? 140 : 180 }}
                          />
                        ) : (
                          <div className="flex h-36 items-center justify-center bg-black/20 text-xs">
                            Media preview unavailable
                          </div>
                        )}
                      </div>
                      {link.title && (
                        <p className="px-1 text-center text-[11px] font-medium opacity-70">
                          {link.title}
                        </p>
                      )}
                    </div>
                  );
                }

                // BLOCK: Digital Product / Sell Online
                if (link.kind === 'product') {
                  return (
                    <div key={link.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between px-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-emerald-300/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                          <ShoppingBag className="size-2.5" /> Block: Sell Digital Product
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400">0% Platform Fee</span>
                      </div>
                      <div
                        className="flex flex-col gap-2.5 p-3.5 transition-all shadow-sm"
                        style={cardStyle(displayProfile.theme)}
                      >
                        <div className="flex items-start gap-2.5">
                          {link.thumbnail_url && (
                            <img
                              src={link.thumbnail_url}
                              alt=""
                              className="size-14 shrink-0 rounded-lg object-cover"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="truncate text-xs font-bold">{link.title}</span>
                              <span className="shrink-0 rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-black text-emerald-400">
                                ${link.price}
                              </span>
                            </div>
                            {link.description && (
                              <p className="mt-1 text-[11px] opacity-75 line-clamp-2">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {boughtProduct ? (
                          <div className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/20 py-2 text-xs font-bold text-emerald-400 animate-fadeIn">
                            <Check className="size-4" /> Download Link Unlocked &amp; Sent!
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleBuyDemoProduct}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold shadow-sm transition-transform active:scale-95"
                            style={{
                              background: 'var(--accent)',
                              color: '#ffffff',
                            }}
                          >
                            <ShoppingBag className="size-3.5" /> Buy Now (${link.price})
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                // BLOCK: Creator Tip Jar / Donations
                if (link.kind === 'tip_jar') {
                  return (
                    <div key={link.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between px-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-amber-300/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                          <Heart className="size-2.5 fill-amber-400" /> Block: Tip Jar / Monetization
                        </span>
                        <span className="text-[10px] font-bold text-amber-300">Direct Support</span>
                      </div>
                      <div
                        className="flex flex-col gap-2.5 p-3.5 text-left transition-all shadow-sm"
                        style={cardStyle(displayProfile.theme)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                            <Heart className="size-4 fill-amber-400" />
                          </span>
                          <div>
                            <h3 className="text-xs font-bold leading-tight">{link.title}</h3>
                            {link.description && (
                              <p className="text-[10px] opacity-75 mt-0.5">{link.description}</p>
                            )}
                          </div>
                        </div>

                        {tipSubmitted ? (
                          <div className="flex flex-col items-center gap-1 rounded-lg bg-emerald-500/15 py-2.5 text-center text-xs font-semibold text-emerald-400">
                            <Check className="size-4" />
                            <span>Thank you so much for the tip! ❤️</span>
                            <button
                              type="button"
                              onClick={() => setTipSubmitted(false)}
                              className="text-[10px] underline opacity-80 mt-0.5"
                            >
                              Send another tip
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleSendDemoTip} className="flex flex-col gap-2">
                            <div className="flex items-center gap-1.5">
                              {[3, 5, 10, 25].map((amt) => (
                                <button
                                  key={amt}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTipAmount(amt);
                                    setCustomTip('');
                                  }}
                                  className={`flex-1 rounded-lg py-1 text-xs font-bold transition-all ${
                                    selectedTipAmount === amt && !customTip
                                      ? 'bg-current text-white shadow-xs'
                                      : 'bg-current/10 opacity-75 hover:opacity-100'
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

                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                placeholder="Your name (optional)"
                                value={tipperName}
                                onChange={(e) => setTipperName(e.target.value)}
                                className="flex-1 rounded-lg border border-current/20 bg-current/5 px-2 py-1 text-[11px] placeholder:opacity-50 focus:outline-none"
                              />
                              <input
                                type="number"
                                placeholder="Custom $"
                                value={customTip}
                                onChange={(e) => {
                                  setCustomTip(e.target.value);
                                  setSelectedTipAmount(0);
                                }}
                                className="w-16 rounded-lg border border-current/20 bg-current/5 px-2 py-1 text-[11px] placeholder:opacity-50 focus:outline-none"
                                min="1"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={sendingTip}
                              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold shadow-sm transition-transform active:scale-98 disabled:opacity-50"
                              style={{
                                background: 'var(--accent)',
                                color: '#ffffff',
                              }}
                            >
                              <Heart className="size-3 fill-current" />
                              {sendingTip ? 'Sending...' : `Send $${customTip || selectedTipAmount} Tip`}
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                }

                // BLOCK: Newsletter / Email Leads Capture
                if (link.kind === 'newsletter') {
                  return (
                    <div key={link.id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between px-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-purple-300/90 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                          <Mail className="size-2.5" /> Block: Email Leads Capture
                        </span>
                        <span className="text-[10px] opacity-60 font-medium">Export CSV Anytime</span>
                      </div>
                      <div
                        className="flex flex-col gap-2 p-3.5 text-left transition-all shadow-sm"
                        style={cardStyle(displayProfile.theme)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                            <Mail className="size-4" />
                          </span>
                          <div>
                            <h3 className="text-xs font-bold leading-tight">{link.title}</h3>
                            {link.description && (
                              <p className="text-[10px] opacity-75 mt-0.5">{link.description}</p>
                            )}
                          </div>
                        </div>

                        {subscribed ? (
                          <div className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/20 py-2 text-xs font-bold text-emerald-400">
                            <Check className="size-4" /> Subscribed to VIP newsletter!
                          </div>
                        ) : (
                          <form onSubmit={handleSubscribeDemo} className="flex gap-1.5">
                            <input
                              type="email"
                              required
                              placeholder="Enter your email"
                              value={subscriberEmail}
                              onChange={(e) => setSubscriberEmail(e.target.value)}
                              className="flex-1 rounded-lg border border-current/20 bg-current/5 px-2 py-1.5 text-[11px] placeholder:opacity-50 focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95"
                              style={{
                                background: 'var(--accent)',
                                color: '#ffffff',
                              }}
                            >
                              Join
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  );
                }

                // BLOCK: Standard Web Link
                const icon: IconKey = isIconKey(link.icon)
                  ? (link.icon as IconKey)
                  : iconForUrl(link.url ?? '');

                return (
                  <div key={link.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between px-1">
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-indigo-300/90 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                        <Link2 className="size-2.5" /> Block: Standard Web Link
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">
                        {link.clicks} clicks
                      </span>
                    </div>
                    <div
                      className={`group relative flex items-center gap-2.5 px-3 py-2.5 text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-xs ${
                        link.animation === 'glow' ? 'ring-2 ring-indigo-400/50' : ''
                      }`}
                      style={cardStyle(displayProfile.theme)}
                      onClick={() => {
                        try {
                          confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                        } catch {}
                      }}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-current/10">
                        <SocialIcon name={icon} className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1 text-center text-xs font-bold tracking-tight truncate">
                        {link.title}
                      </span>
                      <span className="flex size-7 shrink-0 items-center justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom branding */}
            <div className="mt-8 text-center text-[10px] opacity-50 select-none">
              Powered by <span className="font-bold">Pagelink</span>
            </div>
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="relative z-20 flex h-5 w-full items-center justify-center pb-1 bg-slate-950/80 backdrop-blur-md">
          <div className="h-1 w-28 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Feature summary pills below the phone */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 text-center max-w-sm">
        <span className="flex items-center gap-1">
          <Check className="size-3.5 text-emerald-400" /> Unlimited links
        </span>
        <span className="flex items-center gap-1">
          <Check className="size-3.5 text-emerald-400" /> Real-time click analytics
        </span>
        <span className="flex items-center gap-1">
          <Check className="size-3.5 text-emerald-400" /> 0% transaction commission
        </span>
      </div>
    </div>
  );
}

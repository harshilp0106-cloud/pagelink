import type {
  Profile,
  PageLink,
  SocialLink,
  DailyTraffic,
  SubscriberLead,
  TipDonation,
  InvoiceItem,
  SubscriptionTier,
  BillingCycle,
  ProductOrder,
  PayoutSettings,
} from '@/src/types/index';

const STORAGE_KEYS = {
  PROFILE: 'pagelink_saas_profile',
  PROFILES_LIST: 'pagelink_saas_profiles_list',
  LINKS: 'pagelink_saas_links',
  SOCIALS: 'pagelink_saas_socials',
  TRAFFIC: 'pagelink_saas_traffic',
  SUBSCRIBERS: 'pagelink_saas_subscribers',
  TIPS: 'pagelink_saas_tips',
  INVOICES: 'pagelink_saas_invoices',
  ORDERS: 'pagelink_saas_orders',
  PAYOUT_SETTINGS: 'pagelink_saas_payout_settings',
};

const INITIAL_PROFILE: Profile = {
  id: 'prof_monstilo',
  handle: 'monstilo',
  display_name: 'Monstilo',
  bio: 'Creative Director & Street Photographer 📸\nCapturing raw moments across Tokyo, Berlin & NYC.\nDownload my 2026 Lightroom presets below!',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  banner_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
  theme: {
    preset: 'midnight',
    button: 'soft',
    radius: 'soft',
    font: 'sans',
  },
  is_published: true,
  subscription_tier: 'pro',
  billing_cycle: 'yearly',
  remove_branding: true,
  seo_title: 'Monstilo | Creative Director & Photographer Bio',
  seo_description: 'Official Pagelink page of Monstilo. Street photography, preset packs, YouTube documentary, and creative direction.',
  custom_domain: 'www.pagelink.in',
  custom_domain_status: 'verified',
  created_at: '2026-08-15T10:00:00Z',
  updated_at: '2026-10-25T14:30:00Z',
};

const INITIAL_PROFILES_LIST: Array<{ id: string; handle: string; display_name: string; tier: SubscriptionTier }> = [
  { id: 'prof_monstilo', handle: 'monstilo', display_name: 'Monstilo (Main)', tier: 'pro' },
  { id: 'prof_streetstyle', handle: 'tokyostreet', display_name: 'Tokyo Street Archive', tier: 'business' },
  { id: 'prof_agency', handle: 'monstilostudios', display_name: 'Monstilo Creative Agency', tier: 'business' },
];

const INITIAL_LINKS: PageLink[] = [
  {
    id: 'link_1',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-01T12:00:00Z',
  },
  {
    id: 'link_2',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-01T12:05:00Z',
  },
  {
    id: 'link_3',
    profile_id: 'prof_monstilo',
    kind: 'product',
    title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
    url: 'https://gumroad.com/l/tokyonoir',
    icon: 'website',
    platform: null,
    external_id: null,
    thumbnail_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&auto=format&fit=crop&q=80',
    embed_mode: 'card',
    position: 2,
    is_visible: true,
    clicks: 860,
    price: 29,
    description: 'Instant .DNG & .XMP download for Lightroom Mobile and Desktop. Moody cinematic tones.',
    animation: 'pulse',
    created_at: '2026-09-02T10:00:00Z',
  },
  {
    id: 'link_4',
    profile_id: 'prof_monstilo',
    kind: 'tip_jar',
    title: 'Support My Independent Street Expeditions ☕',
    url: null,
    icon: null,
    platform: null,
    external_id: null,
    thumbnail_url: null,
    embed_mode: 'card',
    position: 3,
    is_visible: true,
    clicks: 340,
    description: 'Buy me a matcha or coffee! 100% goes towards film stock, travel, and public gallery prints.',
    created_at: '2026-09-03T11:00:00Z',
  },
  {
    id: 'link_5',
    profile_id: 'prof_monstilo',
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
    description: 'Weekly behind-the-scenes, secret photo spots, lighting setups & free preset giveaways.',
    created_at: '2026-09-04T09:00:00Z',
  },
  {
    id: 'link_6',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-05T08:00:00Z',
  },
  {
    id: 'link_7',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-06T14:00:00Z',
  },
  {
    id: 'link_8',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-07T16:00:00Z',
  },
  {
    id: 'link_9',
    profile_id: 'prof_monstilo',
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
    created_at: '2026-09-08T18:00:00Z',
  },
];

export const DEFAULT_SOCIAL_LINKS: Record<string, string> = {
  instagram: 'https://instagram.com/Pitchbrand.in_',
  youtube: 'https://youtube.com/@@PitchBrand.in_yt',
  tiktok: 'https://tiktok.com/@Pitchbrand.in',
  x: 'https://x.com/Pitchbrand.in',
  spotify: 'https://open.spotify.com/artist/Pitchbrand.in',
};

const INITIAL_SOCIALS: SocialLink[] = [
  { id: 'soc_1', profile_id: 'prof_monstilo', platform: 'instagram', url: 'https://instagram.com/Pitchbrand.in_', position: 0 },
  { id: 'soc_2', profile_id: 'prof_monstilo', platform: 'youtube', url: 'https://youtube.com/@@PitchBrand.in_yt', position: 1 },
  { id: 'soc_3', profile_id: 'prof_monstilo', platform: 'tiktok', url: 'https://tiktok.com/@Pitchbrand.in', position: 2 },
  { id: 'soc_4', profile_id: 'prof_monstilo', platform: 'x', url: 'https://x.com/Pitchbrand.in', position: 3 },
  { id: 'soc_5', profile_id: 'prof_monstilo', platform: 'spotify', url: 'https://open.spotify.com/artist/Pitchbrand.in', position: 4 },
];

function generateInitialTraffic(): DailyTraffic[] {
  const result: DailyTraffic[] = [];
  const now = new Date(2026, 9, 25);
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = d.toISOString().split('T')[0];
    // Realistic curve with weekend peaks
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const baseViews = isWeekend ? 950 : 680;
    const noise = Math.floor(Math.sin(i * 0.7) * 160 + (i % 5) * 40);
    const views = Math.max(380, baseViews + noise);
    const clicks = Math.round(views * (0.38 + ((i % 4) * 0.04)));
    const revenue = Math.round(clicks * 0.18 * 10);
    result.push({
      day: dayStr,
      views,
      clicks,
      revenue,
    });
  }
  return result;
}

const INITIAL_SUBSCRIBERS: SubscriberLead[] = [
  { id: 'sub_1', email: 'elena.rostova@gmail.com', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-25T15:22:00Z' },
  { id: 'sub_2', email: 'marcus.vance@studioeight.de', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-25T11:40:00Z' },
  { id: 'sub_3', email: 'chloe.dupont@pariscreative.fr', handle: 'monstilo', source_link_title: 'Tokyo Noir 2026 Preset Pack', created_at: '2026-10-24T20:15:00Z' },
  { id: 'sub_4', email: 'hiroshi.tanaka@tokyovision.jp', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-24T14:05:00Z' },
  { id: 'sub_5', email: 'sarah.k@vancouvervisuals.ca', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-23T18:30:00Z' },
  { id: 'sub_6', email: 'liam.o.connor@dublindesign.ie', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-22T09:12:00Z' },
  { id: 'sub_7', email: 'devon.miles@brooklynarts.com', handle: 'monstilo', source_link_title: 'Tokyo Noir 2026 Preset Pack', created_at: '2026-10-21T16:45:00Z' },
  { id: 'sub_8', email: 'anita.sharma@mumbaicreatives.in', handle: 'monstilo', source_link_title: 'Join 14,200+ Photographers on Substack', created_at: '2026-10-20T12:20:00Z' },
];

const INITIAL_TIPS: TipDonation[] = [
  { id: 'tip_1', handle: 'monstilo', donor_name: 'Mateo G.', amount: 25, message: 'Your Tokyo video inspired me to finally buy a Ricoh GR III! Keep shooting!', created_at: '2026-10-25T16:10:00Z' },
  { id: 'tip_2', handle: 'monstilo', donor_name: 'Jessica W.', amount: 15, message: 'Thanks for the Lightroom tips, the neon glow tutorial changed my color grading entirely.', created_at: '2026-10-24T22:30:00Z' },
  { id: 'tip_3', handle: 'monstilo', donor_name: 'Kenji S.', amount: 50, message: 'Huge fan from Shibuya. Have a delicious ramen on me during your next photo walk.', created_at: '2026-10-23T14:15:00Z' },
  { id: 'tip_4', handle: 'monstilo', donor_name: 'Anonymous Supporter', amount: 10, message: 'Love the creative direction.', created_at: '2026-10-22T08:00:00Z' },
  { id: 'tip_5', handle: 'monstilo', donor_name: 'Hannah & Paul', amount: 35, message: 'Best street photography channel on the web!', created_at: '2026-10-20T19:45:00Z' },
];

const INITIAL_INVOICES: InvoiceItem[] = [
  { id: 'inv_2026_01', date: '2026-10-01', amount: 4.99, planName: 'Pagelink All-Access (Monthly Plan)', status: 'paid', receiptNumber: 'PL-984210' },
  { id: 'inv_2026_02', date: '2026-09-01', amount: 4.99, planName: 'Pagelink All-Access (Monthly Plan)', status: 'paid', receiptNumber: 'PL-451209' },
];

const INITIAL_ORDERS: ProductOrder[] = [
  {
    id: 'ord_101',
    link_id: 'link_3',
    product_title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
    customer_name: 'Daniel Hayes',
    customer_email: 'daniel.hayes@photo.io',
    amount: 29,
    payment_method: 'apple_pay',
    status: 'completed',
    created_at: '2026-10-25T14:10:00Z',
  },
  {
    id: 'ord_102',
    link_id: 'link_3',
    product_title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
    customer_name: 'Sophia Lindqvist',
    customer_email: 'sophia.l@nordicvisuals.se',
    amount: 29,
    payment_method: 'card',
    status: 'completed',
    created_at: '2026-10-24T18:45:00Z',
  },
  {
    id: 'ord_103',
    link_id: 'link_3',
    product_title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
    customer_name: 'Lucas Rossi',
    customer_email: 'lucas.rossi@milano.it',
    amount: 29,
    payment_method: 'google_pay',
    status: 'completed',
    created_at: '2026-10-23T09:20:00Z',
  },
  {
    id: 'ord_104',
    link_id: 'link_3',
    product_title: 'Tokyo Noir 2026 Preset Pack (14 Presets)',
    customer_name: 'Yuki Takahashi',
    customer_email: 'yuki.t@tokyoart.jp',
    amount: 29,
    payment_method: 'paypal',
    status: 'completed',
    created_at: '2026-10-21T11:05:00Z',
  },
];

const INITIAL_PAYOUT_SETTINGS: PayoutSettings = {
  payout_method: 'stripe',
  stripe_connected: true,
  stripe_account_id: 'acct_1PagelinkMonstilo99x',
  paypal_email: 'payouts@monstilo.studio',
  bank_name: 'Chase Premier Creator Checking',
  bank_account_last4: '4821',
  payout_currency: 'USD',
  payout_schedule: 'weekly',
  auto_payout: true,
  minimum_threshold: 25,
  last_payout_date: '2026-10-20',
  last_payout_amount: 340.00,
};

export const storage = {
  getProfile(): Profile {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    try {
      const parsed: Profile = JSON.parse(raw);
      if (
        parsed.display_name === 'Alex Rivera' ||
        parsed.id === 'prof_alexrivera' ||
        parsed.handle === 'alexrivera' ||
        parsed.seo_title?.includes('Alex Rivera') ||
        parsed.seo_description?.includes('Alex Rivera')
      ) {
        if (parsed.display_name === 'Alex Rivera') parsed.display_name = 'Monstilo';
        if (parsed.handle === 'alexrivera') parsed.handle = 'monstilo';
        if (parsed.id === 'prof_alexrivera') parsed.id = 'prof_monstilo';
        if (parsed.seo_title?.includes('Alex Rivera')) {
          parsed.seo_title = parsed.seo_title.replace(/Alex Rivera/g, 'Monstilo');
        }
        if (parsed.seo_description?.includes('Alex Rivera')) {
          parsed.seo_description = parsed.seo_description.replace(/Alex Rivera/g, 'Monstilo');
        }
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed));
      }
      if (parsed.custom_domain === undefined) {
        parsed.custom_domain = 'www.pagelink.in';
        parsed.custom_domain_status = 'verified';
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return INITIAL_PROFILE;
    }
  },

  saveProfile(profile: Profile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    window.dispatchEvent(new Event('pagelink_profile_updated'));
  },

  getProfilesList(): Array<{ id: string; handle: string; display_name: string; tier: SubscriptionTier }> {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES_LIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILES_LIST, JSON.stringify(INITIAL_PROFILES_LIST));
      return INITIAL_PROFILES_LIST;
    }
    try {
      const parsed = JSON.parse(raw);
      let updated = false;
      const list = parsed.map((p: { id: string; handle: string; display_name: string; tier: SubscriptionTier }) => {
        if (p.display_name?.includes('Alex Rivera') || p.handle === 'alexrivera' || p.id === 'prof_alexrivera') {
          updated = true;
          return {
            ...p,
            id: p.id === 'prof_alexrivera' ? 'prof_monstilo' : p.id,
            handle: p.handle === 'alexrivera' ? 'monstilo' : p.handle,
            display_name: p.display_name.replace(/Alex Rivera/g, 'Monstilo'),
          };
        }
        return p;
      });
      if (updated) {
        localStorage.setItem(STORAGE_KEYS.PROFILES_LIST, JSON.stringify(list));
      }
      return list;
    } catch {
      return INITIAL_PROFILES_LIST;
    }
  },

  saveProfilesList(list: Array<{ id: string; handle: string; display_name: string; tier: SubscriptionTier }>): void {
    localStorage.setItem(STORAGE_KEYS.PROFILES_LIST, JSON.stringify(list));
  },

  getLinks(): PageLink[] {
    const raw = localStorage.getItem(STORAGE_KEYS.LINKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(INITIAL_LINKS));
      return INITIAL_LINKS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_LINKS;
    }
  },

  saveLinks(links: PageLink[]): void {
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
    window.dispatchEvent(new Event('pagelink_links_updated'));
  },

  incrementLinkClick(linkId: string): void {
    const links = this.getLinks();
    const updated = links.map((l) => (l.id === linkId ? { ...l, clicks: l.clicks + 1 } : l));
    this.saveLinks(updated);

    // Also bump today's analytics clicks
    const traffic = this.getTraffic();
    if (traffic.length > 0) {
      const today = traffic[traffic.length - 1];
      today.clicks += 1;
      this.saveTraffic(traffic);
    }
  },

  incrementPageView(): void {
    const traffic = this.getTraffic();
    if (traffic.length > 0) {
      const today = traffic[traffic.length - 1];
      today.views += 1;
      this.saveTraffic(traffic);
    }
  },

  getSocials(): SocialLink[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SOCIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(INITIAL_SOCIALS));
      return INITIAL_SOCIALS;
    }
    try {
      const parsed: SocialLink[] = JSON.parse(raw);
      let updated = false;

      // Migrate existing links if they contain older placeholders
      const updatedList = parsed.map((item) => {
        if (
          item.platform === 'instagram' &&
          (item.url.includes('monstilo') || item.url.includes('alexrivera') || !item.url)
        ) {
          updated = true;
          return { ...item, url: DEFAULT_SOCIAL_LINKS.instagram };
        }
        if (
          item.platform === 'youtube' &&
          (item.url.includes('monstilo') || item.url.includes('alexrivera') || !item.url)
        ) {
          updated = true;
          return { ...item, url: DEFAULT_SOCIAL_LINKS.youtube };
        }
        if (
          item.platform === 'tiktok' &&
          (item.url.includes('monstilo') || item.url.includes('alexrivera') || !item.url)
        ) {
          updated = true;
          return { ...item, url: DEFAULT_SOCIAL_LINKS.tiktok };
        }
        if (
          item.platform === 'x' &&
          (item.url.includes('monstilo') || item.url.includes('alexrivera') || !item.url)
        ) {
          updated = true;
          return { ...item, url: DEFAULT_SOCIAL_LINKS.x };
        }
        if (
          item.platform === 'spotify' &&
          (item.url.includes('monstilo') || item.url.includes('alexrivera') || !item.url)
        ) {
          updated = true;
          return { ...item, url: DEFAULT_SOCIAL_LINKS.spotify };
        }
        return item;
      });

      // Ensure all 5 core platforms exist in the default list
      const platformsPresent = new Set(updatedList.map((s) => s.platform));
      const defaultPlatforms = ['instagram', 'youtube', 'tiktok', 'x', 'spotify'] as const;
      let pos = updatedList.length;
      defaultPlatforms.forEach((p) => {
        if (!platformsPresent.has(p)) {
          updated = true;
          updatedList.push({
            id: `soc_${p}_${Date.now()}`,
            profile_id: 'prof_monstilo',
            platform: p,
            url: DEFAULT_SOCIAL_LINKS[p],
            position: pos++,
          });
        }
      });

      if (updated) {
        localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(updatedList));
        return updatedList;
      }
      return parsed;
    } catch {
      localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(INITIAL_SOCIALS));
      return INITIAL_SOCIALS;
    }
  },

  saveSocials(socials: SocialLink[]): void {
    localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socials));
    window.dispatchEvent(new Event('pagelink_socials_updated'));
  },

  getTraffic(): DailyTraffic[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TRAFFIC);
    if (!raw) {
      const generated = generateInitialTraffic();
      localStorage.setItem(STORAGE_KEYS.TRAFFIC, JSON.stringify(generated));
      return generated;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return generateInitialTraffic();
    }
  },

  saveTraffic(traffic: DailyTraffic[]): void {
    localStorage.setItem(STORAGE_KEYS.TRAFFIC, JSON.stringify(traffic));
    window.dispatchEvent(new Event('pagelink_traffic_updated'));
  },

  getSubscribers(): SubscriberLead[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(INITIAL_SUBSCRIBERS));
      return INITIAL_SUBSCRIBERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SUBSCRIBERS;
    }
  },

  addSubscriber(email: string, source_link_title?: string): boolean {
    const subs = this.getSubscribers();
    if (subs.some((s) => s.email.toLowerCase() === email.toLowerCase().trim())) {
      return false; // already subscribed
    }
    const profile = this.getProfile();
    const newSub: SubscriberLead = {
      id: `sub_${Date.now()}`,
      email: email.trim(),
      handle: profile.handle,
      source_link_title,
      created_at: new Date().toISOString(),
    };
    subs.unshift(newSub);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));
    window.dispatchEvent(new Event('pagelink_subscribers_updated'));
    return true;
  },

  getTips(): TipDonation[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TIPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(INITIAL_TIPS));
      return INITIAL_TIPS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_TIPS;
    }
  },

  addTip(donor_name: string, amount: number, message: string): void {
    const tips = this.getTips();
    const profile = this.getProfile();
    const newTip: TipDonation = {
      id: `tip_${Date.now()}`,
      handle: profile.handle,
      donor_name: donor_name.trim() || 'Anonymous Supporter',
      amount,
      message: message.trim(),
      created_at: new Date().toISOString(),
    };
    tips.unshift(newTip);
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));

    // Update today's revenue
    const traffic = this.getTraffic();
    if (traffic.length > 0) {
      const today = traffic[traffic.length - 1];
      today.revenue += amount;
      this.saveTraffic(traffic);
    }

    window.dispatchEvent(new Event('pagelink_tips_updated'));
  },

  getInvoices(): InvoiceItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(INITIAL_INVOICES));
      return INITIAL_INVOICES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_INVOICES;
    }
  },

  updateSubscription(tier: SubscriptionTier, cycle: BillingCycle): void {
    const profile = this.getProfile();
    profile.subscription_tier = tier;
    profile.billing_cycle = cycle;
    if (tier === 'free') {
      profile.remove_branding = false;
    }
    this.saveProfile(profile);

    // Record invoice if upgrading
    if (tier !== 'free') {
      const amount = cycle === 'yearly' ? 49.99 : 4.99;
      const invoices = this.getInvoices();
      const planTitle = cycle === 'yearly' ? 'Pagelink All-Access (Annual Plan)' : 'Pagelink All-Access (Monthly Plan)';
      invoices.unshift({
        id: `inv_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        planName: planTitle,
        status: 'paid',
        receiptNumber: `PL-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    }
  },

  getProductOrders(): ProductOrder[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ORDERS;
    }
  },

  addProductOrder(
    link_id: string,
    product_title: string,
    customer_name: string,
    customer_email: string,
    amount: number,
    payment_method: 'card' | 'apple_pay' | 'google_pay' | 'paypal' = 'card'
  ): ProductOrder {
    const orders = this.getProductOrders();
    const newOrder: ProductOrder = {
      id: `ord_${Date.now()}`,
      link_id,
      product_title,
      customer_name: customer_name.trim() || 'Valued Customer',
      customer_email: customer_email.trim(),
      amount,
      payment_method,
      status: 'completed',
      created_at: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Also update traffic revenue
    const traffic = this.getTraffic();
    if (traffic.length > 0) {
      const today = traffic[traffic.length - 1];
      today.revenue += amount;
      this.saveTraffic(traffic);
    }

    window.dispatchEvent(new Event('pagelink_orders_updated'));
    return newOrder;
  },

  getPayoutSettings(): PayoutSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.PAYOUT_SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PAYOUT_SETTINGS, JSON.stringify(INITIAL_PAYOUT_SETTINGS));
      return INITIAL_PAYOUT_SETTINGS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PAYOUT_SETTINGS;
    }
  },

  savePayoutSettings(settings: PayoutSettings): void {
    localStorage.setItem(STORAGE_KEYS.PAYOUT_SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new Event('pagelink_payout_settings_updated'));
  },

  triggerInstantPayout(amount: number): { success: boolean; amount: number; message: string } {
    const settings = this.getPayoutSettings();
    settings.last_payout_date = new Date().toISOString().split('T')[0];
    settings.last_payout_amount = amount;
    this.savePayoutSettings(settings);
    return {
      success: true,
      amount,
      message: `Successfully transferred $${amount.toFixed(2)} to ${
        settings.payout_method === 'stripe'
          ? 'connected Stripe bank account (ending in ' + (settings.bank_account_last4 || '4821') + ')'
          : settings.payout_method === 'paypal'
          ? 'PayPal (' + (settings.paypal_email || 'payouts@monstilo.studio') + ')'
          : 'direct bank transfer'
      }!`,
    };
  },
};


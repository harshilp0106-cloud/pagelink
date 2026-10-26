export type SubscriptionTier = 'free' | 'pro' | 'business';
export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeatureLimits {
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxLinks: number | 'unlimited';
  customThemes: boolean;
  removeBranding: boolean;
  tipJar: boolean;
  emailLeads: boolean;
  digitalProducts: boolean;
  analyticsDays: number; // 7 for free, 365 for pro
  teamMembers: number;
  prioritySupport: boolean;
}

export const ALL_IN_ONE_PLAN: PlanFeatureLimits = {
  name: 'Pagelink All-Access',
  badge: 'All Features Included',
  monthlyPrice: 4.99,
  yearlyPrice: 49.99,
  maxLinks: 'unlimited',
  customThemes: true,
  removeBranding: true,
  tipJar: true,
  emailLeads: true,
  digitalProducts: true,
  analyticsDays: 365,
  teamMembers: 5,
  prioritySupport: true,
};

export const PLAN_CONFIGS: Record<SubscriptionTier, PlanFeatureLimits> = {
  free: {
    name: 'Free Starter (Trial)',
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxLinks: 5,
    customThemes: false,
    removeBranding: false,
    tipJar: false,
    emailLeads: false,
    digitalProducts: false,
    analyticsDays: 7,
    teamMembers: 1,
    prioritySupport: false,
  },
  pro: ALL_IN_ONE_PLAN,
  business: ALL_IN_ONE_PLAN,
};

export type FontKey = 'sans' | 'serif' | 'mono' | 'display';
export type RadiusKey = 'sharp' | 'soft' | 'round';
export type ButtonStyle = 'fill' | 'soft' | 'outline' | 'glass' | 'brutalist';

export interface ThemeConfig {
  preset: string;
  background?: string;
  text?: string;
  card?: string;
  cardText?: string;
  accent?: string;
  font?: FontKey;
  radius?: RadiusKey;
  button?: ButtonStyle;
}

export interface Profile {
  id: string;
  handle: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  banner_url: string | null;
  theme: ThemeConfig;
  is_published: boolean;
  subscription_tier: SubscriptionTier;
  billing_cycle: BillingCycle;
  remove_branding: boolean;
  seo_title: string;
  seo_description: string;
  custom_domain?: string | null;
  custom_domain_status?: 'verified' | 'pending' | 'unconfigured';
  created_at: string;
  updated_at: string;
}

export type LinkKind = 'link' | 'header' | 'embed' | 'tip_jar' | 'newsletter' | 'product';
export type EmbedMode = 'card' | 'player';

export interface PageLink {
  id: string;
  profile_id: string;
  kind: LinkKind;
  title: string;
  url: string | null;
  icon: string | null;
  platform: string | null;
  external_id: string | null;
  thumbnail_url: string | null;
  embed_mode: EmbedMode;
  position: number;
  is_visible: boolean;
  clicks: number;
  price?: number;
  description?: string;
  animation?: 'none' | 'pulse' | 'glow' | 'bounce';
  created_at: string;
}

export interface SocialLink {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  position: number;
}

export interface DailyTraffic {
  day: string;
  views: number;
  clicks: number;
  revenue: number;
}

export interface SubscriberLead {
  id: string;
  email: string;
  handle: string;
  source_link_title?: string;
  created_at: string;
}

export interface TipDonation {
  id: string;
  handle: string;
  donor_name: string;
  amount: number;
  message: string;
  created_at: string;
}

export interface InvoiceItem {
  id: string;
  date: string;
  amount: number;
  planName: string;
  status: 'paid' | 'pending';
  receiptNumber: string;
}

export interface ProductOrder {
  id: string;
  link_id: string;
  product_title: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  payment_method: 'card' | 'apple_pay' | 'google_pay' | 'paypal';
  status: 'completed' | 'refunded';
  created_at: string;
}

export interface PayoutSettings {
  payout_method: 'stripe' | 'paypal' | 'bank';
  stripe_connected: boolean;
  stripe_account_id?: string;
  paypal_email?: string;
  bank_name?: string;
  bank_account_last4?: string;
  payout_currency: string;
  payout_schedule: 'instant' | 'daily' | 'weekly' | 'monthly';
  auto_payout: boolean;
  minimum_threshold: number;
  last_payout_date?: string;
  last_payout_amount?: number;
}


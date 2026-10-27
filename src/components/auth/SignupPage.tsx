import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Camera,
  Music,
  Dumbbell,
  Laptop,
  Palette,
  Briefcase,
  User,
  Mail,
  Lock,
  ArrowLeft,
  LogIn,
  UserPlus,
  KeyRound,
  CheckCircle2,
  RotateCcw,
  Search,
  X,
  Shirt,
  HeartPulse,
  Utensils,
  Plane,
  Gamepad2,
  TrendingUp,
  BarChart2,
  GraduationCap,
  Award,
  Coffee,
  Baby,
  Smile,
  Home,
  Building2,
  Car,
  Tv,
  Laugh,
  PenTool,
  FlaskConical,
  Leaf,
  Dog,
  BookOpen,
  Newspaper,
  Sun,
  CalendarHeart,
  Gem,
  ShoppingBag,
  Tag,
  Store,
  Factory,
  UserCheck,
  MapPin,
  Languages,
  Video,
  Share2,
  Compass,
  Tractor,
  Puzzle,
  LayoutGrid,
} from 'lucide-react';
import type { Profile, PageLink } from '@/src/types/index';
import { storage } from '@/src/lib/storage';
import { MobileBlockShowcase } from './MobileBlockShowcase';

interface SignupPageProps {
  initialMode?: 'signup' | 'login' | 'forgot_password';
  onSignupComplete: (newProfile: Profile, newLinks: PageLink[]) => void;
  onLoginSuccess?: (profile: Profile) => void;
  onCancel?: () => void;
}

export interface NicheCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  preset: string;
  sampleLink: string;
}

export const NICHES: NicheCategory[] = [
  { id: 'fashion-apparel', label: 'Fashion & Apparel', icon: Shirt, preset: 'sand', sampleLink: 'Shop My Latest Outfit & Capsule Wardrobe' },
  { id: 'beauty-personal-care', label: 'Beauty & Personal Care', icon: Sparkles, preset: 'sunset', sampleLink: 'My Daily Skincare & Makeup Routine' },
  { id: 'fitness-sports', label: 'Fitness & Sports', icon: Dumbbell, preset: 'forest', sampleLink: 'Join My 30-Day Training Challenge' },
  { id: 'health-wellness', label: 'Health & Wellness', icon: HeartPulse, preset: 'forest', sampleLink: 'Daily Holistic Wellness & Mindfulness Guide' },
  { id: 'food-beverages', label: 'Food & Beverages', icon: Utensils, preset: 'sunset', sampleLink: 'Browse Delicious Recipes & Food Recommendations' },
  { id: 'travel-tourism', label: 'Travel & Tourism', icon: Plane, preset: 'ocean', sampleLink: 'Ultimate Travel Itinerary & Packing List' },
  { id: 'technology-gadgets', label: 'Technology & Gadgets', icon: Laptop, preset: 'mono', sampleLink: 'Top Tech Gear & Workspace Desk Setup' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, preset: 'neon', sampleLink: 'Watch Live Stream & Join Discord' },
  { id: 'business-entrepreneurship', label: 'Business & Entrepreneurship', icon: Briefcase, preset: 'midnight', sampleLink: 'Scale Your Startup: Read My Playbook' },
  { id: 'finance-investing', label: 'Finance & Investing', icon: TrendingUp, preset: 'ocean', sampleLink: 'Smart Investing & Portfolio Strategies' },
  { id: 'marketing-sales', label: 'Marketing & Sales', icon: BarChart2, preset: 'midnight', sampleLink: 'Growth Marketing Toolkit & Case Studies' },
  { id: 'education-learning', label: 'Education & Learning', icon: GraduationCap, preset: 'ocean', sampleLink: 'Access Free Masterclasses & Study Guides' },
  { id: 'career-professional-development', label: 'Career & Professional Development', icon: Award, preset: 'midnight', sampleLink: 'Resume Templates & Mentorship Booking' },
  { id: 'lifestyle', label: 'Lifestyle', icon: Coffee, preset: 'sand', sampleLink: 'Daily Vlogs, Routine & Favorite Picks' },
  { id: 'parenting-family', label: 'Parenting & Family', icon: Baby, preset: 'sunset', sampleLink: 'Parenting Hacks & Family Activity Guides' },
  { id: 'kids-childrens-content', label: "Kids & Children's Content", icon: Smile, preset: 'sunset', sampleLink: 'Fun Learning Games & Bedtime Stories' },
  { id: 'home-interior-design', label: 'Home & Interior Design', icon: Home, preset: 'sand', sampleLink: 'Interior Decor Inspiration & Furniture Links' },
  { id: 'real-estate-property', label: 'Real Estate & Property', icon: Building2, preset: 'midnight', sampleLink: 'Exclusive Property Tours & Real Estate Deals' },
  { id: 'automotive-mobility', label: 'Automotive & Mobility', icon: Car, preset: 'mono', sampleLink: 'Car Reviews, Garage Builds & Mods' },
  { id: 'entertainment-pop-culture', label: 'Entertainment & Pop Culture', icon: Tv, preset: 'grape', sampleLink: 'Movie Reviews, Pop Culture Podcasts & Drops' },
  { id: 'comedy-humor', label: 'Comedy & Humor', icon: Laugh, preset: 'sunset', sampleLink: 'Watch My Comedy Sketches & Standup Dates' },
  { id: 'music-performing-arts', label: 'Music & Performing Arts', icon: Music, preset: 'grape', sampleLink: 'Listen to New Single on Spotify & Apple Music' },
  { id: 'art-creativity', label: 'Art & Creativity', icon: Palette, preset: 'grape', sampleLink: 'Original Art Prints & Exhibition Details' },
  { id: 'photography-videography', label: 'Photography & Videography', icon: Camera, preset: 'midnight', sampleLink: 'View 2026 Photography Portfolio & Presets' },
  { id: 'design-creative-services', label: 'Design & Creative Services', icon: PenTool, preset: 'sand', sampleLink: 'Download Figma UI Kits & Request Design' },
  { id: 'science-nature', label: 'Science & Nature', icon: FlaskConical, preset: 'forest', sampleLink: 'Fascinating Science Explanations & Articles' },
  { id: 'environment-sustainability', label: 'Environment & Sustainability', icon: Leaf, preset: 'forest', sampleLink: 'Zero Waste Guide & Eco-Friendly Brands' },
  { id: 'pets-animals', label: 'Pets & Animals', icon: Dog, preset: 'sunset', sampleLink: 'Pet Care Tips, Training & Favorite Chews' },
  { id: 'books-literature', label: 'Books & Literature', icon: BookOpen, preset: 'sand', sampleLink: 'My Top Book Recommendations & Reading Club' },
  { id: 'news-politics', label: 'News & Politics', icon: Newspaper, preset: 'mono', sampleLink: 'Weekly In-Depth Analysis Newsletter' },
  { id: 'religion-spirituality', label: 'Religion & Spirituality', icon: Sun, preset: 'sand', sampleLink: 'Daily Reflections, Prayers & Sermons' },
  { id: 'weddings-events', label: 'Weddings & Events', icon: CalendarHeart, preset: 'sunset', sampleLink: 'Wedding Planning Checklist & Vendor Guides' },
  { id: 'luxury-premium-lifestyle', label: 'Luxury & Premium Lifestyle', icon: Gem, preset: 'midnight', sampleLink: 'Luxury Travel, Watches & High Fashion' },
  { id: 'shopping-product-reviews', label: 'Shopping & Product Reviews', icon: ShoppingBag, preset: 'ocean', sampleLink: 'Tested & Approved Product Reviews' },
  { id: 'deals-coupons', label: 'Deals & Coupons', icon: Tag, preset: 'sunset', sampleLink: 'Exclusive Promo Codes & Today’s Best Deals' },
  { id: 'ecommerce-d2c', label: 'E-commerce & D2C', icon: Store, preset: 'ocean', sampleLink: 'Official Online Store & New Product Drops' },
  { id: 'b2b-industry', label: 'B2B & Industry', icon: Factory, preset: 'mono', sampleLink: 'Enterprise Solutions & Industry Whitepapers' },
  { id: 'professional-expert-creators', label: 'Professional & Expert Creators', icon: UserCheck, preset: 'midnight', sampleLink: 'Book a Strategy Call & Advisory Services' },
  { id: 'local-community-creators', label: 'Local & Community Creators', icon: MapPin, preset: 'forest', sampleLink: 'Local Events, Community News & Meetups' },
  { id: 'regional-language-creators', label: 'Regional & Language Creators', icon: Languages, preset: 'ocean', sampleLink: 'Multilingual Content, Culture & Community' },
  { id: 'ugc-brand-content-creators', label: 'UGC & Brand Content Creators', icon: Video, preset: 'grape', sampleLink: 'View UGC Media Kit & Portfolio for Brands' },
  { id: 'social-media-creator-education', label: 'Social Media & Creator Education', icon: Share2, preset: 'midnight', sampleLink: 'Creator Growth Playbook & Monetization Course' },
  { id: 'travel-hospitality-dining', label: 'Travel, Hospitality & Dining', icon: Compass, preset: 'ocean', sampleLink: 'Best Boutique Hotels & Dining Experiences' },
  { id: 'agriculture-rural-life', label: 'Agriculture & Rural Life', icon: Tractor, preset: 'forest', sampleLink: 'Farm Life, Sustainable Ag & Homesteading' },
  { id: 'fashion-beauty-wellness-commerce', label: 'Fashion, Beauty & Wellness Commerce', icon: Sparkles, preset: 'sunset', sampleLink: 'Shop Curated Beauty, Wellness & Style Collections' },
  { id: 'hobbies-collecting', label: 'Hobbies & Collecting', icon: Puzzle, preset: 'grape', sampleLink: 'Collectibles, Trading Cards & Hobby Showcase' },
  { id: 'other-multi-niche', label: 'Other & Multi-Niche', icon: LayoutGrid, preset: 'midnight', sampleLink: 'Explore All My Projects, Links & Socials' },
];

export function SignupPage({
  initialMode = 'signup',
  onSignupComplete,
  onLoginSuccess,
  onCancel,
}: SignupPageProps) {
  const [authMode, setAuthMode] = useState<'signup' | 'login' | 'forgot_password'>(initialMode);

  // Signup fields
  const [handle, setHandle] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('fashion-apparel');
  const [categorySearch, setCategorySearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login fields - strictly empty, user must enter credentials
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot Password fields
  const [resetEmail, setResetEmail] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState<string | null>(null);

  const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const isHandleAvailable = cleanHandle.length >= 3;

  const filteredNiches = NICHES.filter((n) =>
    n.label.toLowerCase().includes(categorySearch.toLowerCase().trim())
  );
  const selectedNicheConfig = NICHES.find((n) => n.id === selectedNiche) || NICHES[0];

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanHandle || !displayName || !email) return;

    setIsSubmitting(true);
    const nicheConfig = NICHES.find((n) => n.id === selectedNiche) || NICHES[0];

    setTimeout(() => {
      const newProfileId = `prof_${cleanHandle}_${Date.now()}`;
      const newProfile: Profile = {
        id: newProfileId,
        handle: cleanHandle,
        display_name: displayName.trim(),
        bio: `Hey, I'm ${displayName.trim()}! Welcome to my official bio page. Check out my work and exclusive links below 👇`,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        banner_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80',
        theme: {
          preset: nicheConfig.preset,
          button: 'soft',
          radius: 'soft',
          font: 'sans',
        },
        is_published: true,
        subscription_tier: 'pro',
        billing_cycle: 'monthly',
        remove_branding: true,
        seo_title: `${displayName.trim()} | Official Bio Link`,
        seo_description: `Official Pagelink page for ${displayName.trim()}. Connect, support, and explore content.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const starterLinks: PageLink[] = [
        {
          id: `link_header_${Date.now()}`,
          profile_id: newProfileId,
          kind: 'header',
          title: 'FEATURED LINKS',
          url: null,
          icon: null,
          platform: null,
          external_id: null,
          thumbnail_url: null,
          embed_mode: 'card',
          position: 0,
          is_visible: true,
          clicks: 14,
          created_at: new Date().toISOString(),
        },
        {
          id: `link_main_${Date.now()}`,
          profile_id: newProfileId,
          kind: 'link',
          title: nicheConfig.sampleLink,
          url: 'https://pagelink.to',
          icon: 'website',
          platform: null,
          external_id: null,
          thumbnail_url: null,
          embed_mode: 'card',
          position: 1,
          is_visible: true,
          clicks: 32,
          animation: 'glow',
          created_at: new Date().toISOString(),
        },
        {
          id: `link_tip_${Date.now()}`,
          profile_id: newProfileId,
          kind: 'tip_jar',
          title: 'Support My Creative Work ☕',
          url: null,
          icon: null,
          platform: null,
          external_id: null,
          thumbnail_url: null,
          embed_mode: 'card',
          position: 2,
          is_visible: true,
          clicks: 9,
          description: 'Buy me a coffee or matcha to support independent creation!',
          created_at: new Date().toISOString(),
        },
        {
          id: `link_sub_${Date.now()}`,
          profile_id: newProfileId,
          kind: 'newsletter',
          title: 'Join My VIP Inner Circle',
          url: null,
          icon: 'email',
          platform: null,
          external_id: null,
          thumbnail_url: null,
          embed_mode: 'card',
          position: 3,
          is_visible: true,
          clicks: 18,
          description: 'Get weekly updates, behind-the-scenes drops, and exclusive freebies.',
          created_at: new Date().toISOString(),
        },
      ];

      storage.saveProfile(newProfile);
      storage.saveLinks(starterLinks);

      const list = storage.getProfilesList();
      list.unshift({
        id: newProfileId,
        handle: cleanHandle,
        display_name: displayName.trim(),
        tier: 'pro',
      });
      storage.saveProfilesList(list);

      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {}

      // DIRECT LAND ON PREVIEW
      onSignupComplete(newProfile, starterLinks);
    }, 700);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email address and password to sign in.');
      return;
    }
    if (!loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      const currentProfile = storage.getProfile();
      if (onLoginSuccess) {
        onLoginSuccess(currentProfile);
      }
    }, 600);
  };

  const handleSendResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setResetError('Please enter a valid email address.');
      return;
    }
    setIsSendingReset(true);
    setTimeout(() => {
      setIsSendingReset(false);
      setResetStep('verify');
      setResetCode('849201'); // Auto-provision verification code for demo / testing ease
    }, 700);
  };

  const handleConfirmResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    if (!resetCode.trim()) {
      setResetError('Please enter the 6-digit verification code.');
      return;
    }
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please verify both fields.');
      return;
    }
    setIsResettingPassword(true);
    setTimeout(() => {
      setIsResettingPassword(false);
      try {
        confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
      } catch {}
      setPasswordResetSuccess('Your password has been reset! Please sign in with your new password.');
      setLoginEmail(resetEmail);
      setLoginPassword('');
      setAuthMode('login');
      setResetStep('request');
      setResetEmail('');
      setNewPassword('');
      setConfirmPassword('');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Background radial gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 size-96 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-purple-600/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl xl:max-w-7xl">
        {/* Top bar with back or mode switch */}
        <div className="mb-6 flex items-center justify-between">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-4" /> Return to Bio
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">PageLink</span>
            </div>
          )}

          {/* Switcher Tab */}
          <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/80 p-1">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                authMode === 'login'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="size-3.5" /> Log In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="size-3.5" /> Sign Up
            </button>
          </div>
        </div>

        {/* Auth Box Container */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
            {authMode === 'signup' ? (
              /* SIGN UP FORM */
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/20">
                    <Sparkles className="size-5" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Claim your Pagelink
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Build your single link in bio in 30 seconds. Direct instant landing on your live preview.
                </p>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  {/* Step 1: Claim Handle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                       1. Claim Your Handle
                    </label>
                    <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                      <span className="text-xs font-medium text-slate-400 select-none">
                        pagelink.to/@
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="yourname"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none ml-1 placeholder:text-slate-600"
                      />
                      {isHandleAvailable && (
                        <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 shrink-0">
                          <Check className="size-3" /> Available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Display Name & Email */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Display Name
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2">
                        <User className="size-3.5 text-slate-500 mr-2 shrink-0" />
                        <input
                          type="text"
                          required
                          placeholder="Monstilo"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-600 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Email
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2">
                        <Mail className="size-3.5 text-slate-500 mr-2 shrink-0" />
                        <input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-600 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2">
                      <Lock className="size-3.5 text-slate-500 mr-2 shrink-0" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-slate-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Step 3: Creator Niche Listview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        3. Creator Category
                      </label>
                      <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                        {filteredNiches.length} {filteredNiches.length === 1 ? 'Category' : 'Categories'}
                      </span>
                    </div>

                    {/* Search / Filter Input */}
                    <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                      <Search className="size-3.5 text-slate-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search categories (e.g. Fashion, Gaming, Tech)..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
                      />
                      {categorySearch && (
                        <button
                          type="button"
                          onClick={() => setCategorySearch('')}
                          className="text-slate-400 hover:text-white p-0.5"
                          title="Clear search"
                        >
                          <X className="size-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Listview Container */}
                    <div
                      className="max-h-56 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/70 p-1.5 space-y-1 divide-y divide-slate-800/50 shadow-inner scrollbar-thin scrollbar-thumb-slate-700"
                      role="listbox"
                      aria-label="Creator categories"
                    >
                      {filteredNiches.map((n) => {
                        const Icon = n.icon;
                        const isSelected = selectedNiche === n.id;
                        return (
                          <button
                            key={n.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => setSelectedNiche(n.id)}
                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-all ${
                              isSelected
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/60 shadow-xs'
                                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-slate-800/90 text-slate-400'
                                }`}
                              >
                                <Icon className="size-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold truncate leading-tight text-slate-100">
                                  {n.label}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                  Starter: <span className="text-slate-300 italic">{n.sampleLink}</span>
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center pl-2">
                              {isSelected ? (
                                <span className="flex size-4 items-center justify-center rounded-full bg-indigo-500 text-white">
                                  <Check className="size-2.5 stroke-[3]" />
                                </span>
                              ) : (
                                <span className="size-3.5 rounded-full border border-slate-700" />
                              )}
                            </div>
                          </button>
                        );
                      })}

                      {filteredNiches.length === 0 && (
                        <div className="py-6 text-center text-xs text-slate-400 space-y-1.5">
                          <p>No categories match "{categorySearch}"</p>
                          <button
                            type="button"
                            onClick={() => setCategorySearch('')}
                            className="text-[11px] font-semibold text-indigo-400 hover:underline"
                          >
                            Reset search filter
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Selected Badge Indicator */}
                    <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-2.5 py-1.5 border border-slate-800 text-[11px]">
                      <span className="text-slate-400">Selected Niche:</span>
                      <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                        {(() => {
                          const CurrentIcon = selectedNicheConfig.icon;
                          return <CurrentIcon className="size-3 text-indigo-400" />;
                        })()}
                        {selectedNicheConfig.label}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !cleanHandle || !displayName || !email}
                    className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:opacity-95 active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Building Your Bio...'
                    ) : (
                      <>
                        <span>Create Account &amp; Land on Preview</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : authMode === 'forgot_password' ? (
              /* FORGOT PASSWORD FORM */
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                    <KeyRound className="size-5" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Reset Password
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  {resetStep === 'request'
                    ? 'Enter your registered email address to receive a secure password reset verification code.'
                    : `We sent a 6-digit verification code to ${resetEmail}. Enter it below along with your new password.`}
                </p>

                {resetStep === 'request' ? (
                  <form onSubmit={handleSendResetCode} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Registered Email Address
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                        <Mail className="size-4 text-slate-500 mr-2.5 shrink-0" />
                        <input
                          type="email"
                          required
                          placeholder="you@domain.com"
                          value={resetEmail}
                          onChange={(e) => {
                            setResetEmail(e.target.value);
                            if (resetError) setResetError(null);
                          }}
                          className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {resetError && (
                      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300">
                        {resetError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSendingReset || !resetEmail}
                      className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-all active:scale-98 disabled:opacity-50"
                    >
                      {isSendingReset ? 'Sending Verification Code...' : 'Send Password Reset Code'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setResetError(null);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="size-3.5" /> Back to Sign In
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleConfirmResetPassword} className="space-y-4">
                    {/* Demo Verification Helper Banner */}
                    <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-xs text-indigo-300 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-indigo-200">Verification Code: </span>
                        <span className="font-mono bg-indigo-950/80 px-2 py-0.5 rounded text-white font-bold tracking-widest">
                          {resetCode || '849201'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResetCode('849201')}
                        className="text-[11px] font-bold text-indigo-400 underline hover:text-indigo-200"
                      >
                        Auto-fill
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        6-Digit Verification Code
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                        <KeyRound className="size-4 text-slate-500 mr-2.5 shrink-0" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="849201"
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value.trim())}
                          className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 font-mono tracking-widest focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        New Password
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                        <Lock className="size-4 text-slate-500 mr-2.5 shrink-0" />
                        <input
                          type="password"
                          required
                          placeholder="Minimum 6 characters"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (resetError) setResetError(null);
                          }}
                          className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                        <Lock className="size-4 text-slate-500 mr-2.5 shrink-0" />
                        <input
                          type="password"
                          required
                          placeholder="Re-enter your new password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (resetError) setResetError(null);
                          }}
                          className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {resetError && (
                      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300">
                        {resetError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isResettingPassword || !resetCode || !newPassword || !confirmPassword}
                      className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all active:scale-98 disabled:opacity-50"
                    >
                      {isResettingPassword ? 'Updating Password...' : 'Save New Password & Sign In'}
                    </button>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setResetStep('request')}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <RotateCcw className="size-3" /> Resend Code
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setResetError(null);
                        }}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        Cancel &amp; Log In
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* LOG IN FORM */
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                    <LogIn className="size-5" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Sign In to PageLink
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Enter your email and password to access your creator dashboard.
                </p>

                {passwordResetSuccess && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                    <span>{passwordResetSuccess}</span>
                  </div>
                )}

                {/* Standard credentials form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                      <Mail className="size-4 text-slate-500 mr-2.5 shrink-0" />
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          if (loginError) setLoginError(null);
                          if (passwordResetSuccess) setPasswordResetSuccess(null);
                        }}
                        className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(loginEmail);
                          setResetStep('request');
                          setResetError(null);
                          setPasswordResetSuccess(null);
                          setAuthMode('forgot_password');
                        }}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 focus-within:border-indigo-500">
                      <Lock className="size-4 text-slate-500 mr-2.5 shrink-0" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (loginError) setLoginError(null);
                        }}
                        className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn || !loginEmail || !loginPassword}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isLoggingIn ? 'Signing in...' : 'Sign In to Dashboard'}
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="size-3.5 text-emerald-500" /> Secure SSL Authentication
              </span>
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                  setResetError(null);
                  setPasswordResetSuccess(null);
                }}
                className="text-indigo-400 hover:underline font-semibold"
              >
                {authMode === 'signup' ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>

          {/* Right Column: Mobile Screen with All Blocks Showcase */}
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 bg-gradient-to-b from-slate-900/40 via-slate-950/70 to-slate-950 flex flex-col items-center justify-center">
            <MobileBlockShowcase
              currentDisplayName={displayName}
              currentHandle={cleanHandle}
              authMode={authMode === 'signup' ? 'signup' : 'login'}
            />
          </div>
        </div>

        {/* Support Help Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <span>Need help? Contact support: </span>
          <a
            href="mailto:help@pagelink.in"
            className="font-semibold text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-1"
          >
            <Mail className="size-3" />
            <span>help@pagelink.in</span>
          </a>
        </div>
      </div>
    </div>
  );
}

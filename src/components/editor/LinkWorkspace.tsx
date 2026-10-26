import React, { useState } from 'react';
import {
  Plus,
  Link2,
  Heading,
  PlaySquare,
  Heart,
  Mail,
  ShoppingBag,
  Eye,
  EyeOff,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  GripVertical,
  Check,
  Music,
  Share2,
} from 'lucide-react';
import type { Profile, PageLink, SocialLink, LinkKind } from '@/src/types/index';
import { storage, DEFAULT_SOCIAL_LINKS } from '@/src/lib/storage';
import { normaliseUrl, titleFromUrl, detectEmbed, iconForUrl, SOCIAL_PLATFORMS } from '@/src/lib/links';
import { SocialIcon, type IconKey, isIconKey } from '@/src/lib/social-icons';

interface LinkWorkspaceProps {
  profile: Profile;
  links: PageLink[];
  socials: SocialLink[];
  onLinksChange: (links: PageLink[]) => void;
  onSocialsChange: (socials: SocialLink[]) => void;
  onOpenUpgrade: () => void;
}

export function LinkWorkspace({
  profile,
  links,
  socials,
  onLinksChange,
  onSocialsChange,
  onOpenUpgrade,
}: LinkWorkspaceProps) {
  const [addingKind, setAddingKind] = useState<LinkKind | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('19');
  const [newDescription, setNewDescription] = useState('');

  // Social modal state
  const [editingSocials, setEditingSocials] = useState(false);
  const [socialInputs, setSocialInputs] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = { ...DEFAULT_SOCIAL_LINKS };
    socials.forEach((s) => {
      if (s.url) {
        map[s.platform] = s.url;
      }
    });
    return map;
  });

  const handleOpenEditSocials = () => {
    const map: Record<string, string> = { ...DEFAULT_SOCIAL_LINKS };
    socials.forEach((s) => {
      if (s.url) {
        map[s.platform] = s.url;
      }
    });
    setSocialInputs(map);
    setEditingSocials(true);
  };

  const handleResetToDefaults = () => {
    setSocialInputs({ ...DEFAULT_SOCIAL_LINKS });
  };

  const handleAddBlock = (kind: LinkKind) => {
    // Check if free user is exceeding plan limits or trying to use locked pro blocks
    if (profile.subscription_tier === 'free') {
      if (['tip_jar', 'newsletter', 'product'].includes(kind)) {
        onOpenUpgrade();
        return;
      }
      if (links.length >= 5) {
        onOpenUpgrade();
        return;
      }
    }
    setAddingKind(kind);
    setNewUrl('');
    setNewTitle('');
    setNewPrice('19');
    setNewDescription('');
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingKind) return;

    let title = newTitle.trim();
    const url = normaliseUrl(newUrl);

    if (!title) {
      if (url) {
        title = titleFromUrl(url);
      } else if (addingKind === 'header') {
        title = 'NEW SECTION';
      } else if (addingKind === 'tip_jar') {
        title = 'Support My Creative Work ☕';
      } else if (addingKind === 'newsletter') {
        title = 'Join My VIP Newsletter';
      } else if (addingKind === 'product') {
        title = 'Digital Download';
      }
    }

    const embed = url ? detectEmbed(url) : null;

    const newLink: PageLink = {
      id: `link_${Date.now()}`,
      profile_id: profile.id,
      kind: addingKind,
      title,
      url,
      icon: url ? iconForUrl(url) : null,
      platform: embed?.platform ?? null,
      external_id: embed?.externalId ?? null,
      thumbnail_url: embed?.thumbnail ?? null,
      embed_mode: embed ? 'player' : 'card',
      position: links.length,
      is_visible: true,
      clicks: 0,
      price: addingKind === 'product' ? parseFloat(newPrice) || 19 : undefined,
      description: newDescription.trim() || undefined,
      animation: 'none',
      created_at: new Date().toISOString(),
    };

    const updated = [newLink, ...links];
    onLinksChange(updated);
    storage.saveLinks(updated);
    setAddingKind(null);
  };

  const handleToggleVisible = (id: string) => {
    const updated = links.map((l) => (l.id === id ? { ...l, is_visible: !l.is_visible } : l));
    onLinksChange(updated);
    storage.saveLinks(updated);
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter((l) => l.id !== id);
    onLinksChange(updated);
    storage.saveLinks(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) return;
    const reordered = [...links];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onLinksChange(reordered);
    storage.saveLinks(reordered);
  };

  const handleUpdateLink = (id: string, updates: Partial<PageLink>) => {
    const updated = links.map((l) => (l.id === id ? { ...l, ...updates } : l));
    onLinksChange(updated);
    storage.saveLinks(updated);
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SocialLink[] = [];
    let pos = 0;
    Object.entries(socialInputs).forEach(([platform, url]) => {
      if (url.trim()) {
        updated.push({
          id: `soc_${platform}_${Date.now()}`,
          profile_id: profile.id,
          platform,
          url: url.trim(),
          position: pos++,
        });
      }
    });
    onSocialsChange(updated);
    storage.saveSocials(updated);
    setEditingSocials(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Add Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900">Add Blocks & Monetization</h2>
          {profile.subscription_tier === 'free' && (
            <span className="text-xs text-slate-500 font-medium">
              Free plan: {links.length} / 5 links
            </span>
          )}
        </div>

        {/* Buttons grid for block types */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          <button
            type="button"
            onClick={() => handleAddBlock('link')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <Link2 className="size-4" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Web Link</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBlock('header')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <Heading className="size-4" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Section Title</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBlock('embed')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
              <PlaySquare className="size-4" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Media Embed</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBlock('tip_jar')}
            className="relative flex flex-col items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/40 p-3 text-center transition-all hover:border-amber-400 hover:bg-amber-50"
          >
            <span className="absolute -top-1.5 -right-1.5 rounded-md bg-amber-500 px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-white shadow-2xs">
              $4.99/mo
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <Heart className="size-4" />
            </div>
            <span className="text-xs font-semibold text-amber-950">Tip Jar</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBlock('newsletter')}
            className="relative flex flex-col items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/40 p-3 text-center transition-all hover:border-purple-400 hover:bg-purple-50"
          >
            <span className="absolute -top-1.5 -right-1.5 rounded-md bg-purple-600 px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-white shadow-2xs">
              $4.99/mo
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <Mail className="size-4" />
            </div>
            <span className="text-xs font-semibold text-purple-950">Email Leads</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddBlock('product')}
            className="relative flex flex-col items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50"
          >
            <span className="absolute -top-1.5 -right-1.5 rounded-md bg-emerald-600 px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-white shadow-2xs">
              $4.99/mo
            </span>
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <ShoppingBag className="size-4" />
            </div>
            <span className="text-xs font-semibold text-emerald-950">Sell Product</span>
          </button>
        </div>

        {/* Social Icons row trigger */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="size-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">
              Social Links Strip ({socials.length} connected)
            </span>
          </div>
          <button
            type="button"
            onClick={handleOpenEditSocials}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Edit Socials
          </button>
        </div>
      </div>

      {/* Add Block Form Drawer */}
      {addingKind && (
        <form
          onSubmit={handleCreateBlock}
          className="rounded-2xl border-2 border-indigo-500 bg-white p-5 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-bold uppercase text-indigo-700">
                New {addingKind.replace('_', ' ')}
              </span>
              <h3 className="text-sm font-bold text-slate-900">Configure Block</h3>
            </div>
            <button
              type="button"
              onClick={() => setAddingKind(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3">
            {addingKind !== 'header' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {addingKind === 'embed'
                    ? 'YouTube, Spotify, or Instagram Link'
                    : addingKind === 'product'
                    ? 'Product Download / Checkout URL'
                    : 'Destination URL'}
                </label>
                <input
                  type="text"
                  required={addingKind === 'link' || addingKind === 'embed'}
                  placeholder={
                    addingKind === 'embed'
                      ? 'https://www.youtube.com/watch?v=... or Spotify link'
                      : 'https://...'
                  }
                  value={newUrl}
                  onChange={(e) => {
                    setNewUrl(e.target.value);
                    if (!newTitle && e.target.value) {
                      setNewTitle(titleFromUrl(e.target.value));
                    }
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {addingKind === 'header' ? 'Section Heading Title' : 'Display Title'}
              </label>
              <input
                type="text"
                required
                placeholder={
                  addingKind === 'header'
                    ? 'e.g. WORKSHOPS & TUTORIALS'
                    : 'e.g. My 2026 Photography Presets'
                }
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {addingKind === 'product' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  placeholder="29"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            {(addingKind === 'product' || addingKind === 'tip_jar' || addingKind === 'newsletter') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="Tell your followers what they get or why they should support..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAddingKind(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Add to Bio
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Social Links Modal */}
      {editingSocials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Manage Social Links Strip</h3>
              <button
                onClick={() => setEditingSocials(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enter your profile URLs. Icons will automatically show on your bio page in the top row.
            </p>

            <form onSubmit={handleSaveSocials} className="space-y-3">
              {Object.entries(SOCIAL_PLATFORMS).map(([key, config]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <SocialIcon name={key as IconKey} className="size-4" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={config.hint}
                      value={socialInputs[key] || ''}
                      onChange={(e) =>
                        setSocialInputs({ ...socialInputs, [key]: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Reset to Pitchbrand defaults
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSocials(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Save Socials
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List of Current Links */}
      <div className="flex flex-col gap-3">
        {links.map((link, idx) => (
          <div
            key={link.id}
            className={`flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-xs transition-all ${
              !link.is_visible ? 'opacity-60 border-slate-200 bg-slate-50/50' : 'border-slate-200'
            }`}
          >
            {/* Top row: reorder, kind badge, clicks, controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Up/Down buttons */}
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20"
                    title="Move up"
                  >
                    <ChevronUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === links.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20"
                    title="Move down"
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                </div>

                {/* Badge of link kind */}
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    link.kind === 'header'
                      ? 'bg-slate-100 text-slate-700'
                      : link.kind === 'embed'
                      ? 'bg-rose-50 text-rose-700'
                      : link.kind === 'tip_jar'
                      ? 'bg-amber-50 text-amber-800'
                      : link.kind === 'newsletter'
                      ? 'bg-purple-50 text-purple-700'
                      : link.kind === 'product'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-indigo-50 text-indigo-700'
                  }`}
                >
                  {link.kind.replace('_', ' ')}
                </span>

                {link.kind !== 'header' && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {link.clicks} clicks
                  </span>
                )}
              </div>

              {/* Action toggles: visibility, animation, delete */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVisible(link.id)}
                  className={`rounded-lg p-1.5 transition-colors ${
                    link.is_visible
                      ? 'text-indigo-600 hover:bg-indigo-50'
                      : 'text-slate-400 hover:bg-slate-100'
                  }`}
                  title={link.is_visible ? 'Hide link from bio' : 'Show link on bio'}
                >
                  {link.is_visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteLink(link.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  title="Delete block"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Editing fields */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Title
                </label>
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {link.kind !== 'header' && link.kind !== 'tip_jar' && link.kind !== 'newsletter' && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    URL
                  </label>
                  <input
                    type="text"
                    value={link.url ?? ''}
                    onChange={(e) => {
                      const newUrlVal = e.target.value;
                      const embed = detectEmbed(newUrlVal);
                      handleUpdateLink(link.id, {
                        url: newUrlVal,
                        platform: embed?.platform ?? link.platform,
                        external_id: embed?.externalId ?? link.external_id,
                        thumbnail_url: embed?.thumbnail ?? link.thumbnail_url,
                      });
                    }}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Description or extra configuration */}
            {(link.kind === 'product' || link.kind === 'tip_jar' || link.kind === 'newsletter') && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Description / CTA copy
                </label>
                <input
                  type="text"
                  value={link.description ?? ''}
                  onChange={(e) => handleUpdateLink(link.id, { description: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {/* Animation effect option */}
            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <span className="text-[11px]">Attention Animation:</span>
              <div className="flex items-center gap-1.5">
                {(['none', 'pulse', 'glow'] as const).map((anim) => (
                  <button
                    key={anim}
                    type="button"
                    onClick={() => handleUpdateLink(link.id, { animation: anim })}
                    className={`rounded px-2 py-0.5 text-[11px] font-medium capitalize ${
                      link.animation === anim
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {anim}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

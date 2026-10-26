import type { EmbedMode } from '@/src/types/index';
import type { IconKey } from '@/src/lib/social-icons';

export function normaliseUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return null;
  }
  if (parsed.protocol === 'mailto:' || parsed.protocol === 'tel:') return parsed.href;
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  if (!parsed.hostname.includes('.')) return null;
  parsed.protocol = 'https:';
  return parsed.href;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

export const SOCIAL_PLATFORMS: Record<string, { label: string; hint: string }> = {
  instagram: { label: 'Instagram', hint: 'instagram.com/yourhandle' },
  youtube: { label: 'YouTube', hint: 'youtube.com/@yourchannel' },
  tiktok: { label: 'TikTok', hint: 'tiktok.com/@yourhandle' },
  x: { label: 'X (Twitter)', hint: 'x.com/yourhandle' },
  spotify: { label: 'Spotify', hint: 'open.spotify.com/artist/...' },
  linkedin: { label: 'LinkedIn', hint: 'linkedin.com/in/yourname' },
  github: { label: 'GitHub', hint: 'github.com/yourname' },
  discord: { label: 'Discord', hint: 'discord.gg/yourserver' },
  twitch: { label: 'Twitch', hint: 'twitch.tv/yourchannel' },
  whatsapp: { label: 'WhatsApp', hint: 'wa.me/1234567890' },
  email: { label: 'Email', hint: 'you@domain.com' },
  website: { label: 'Website', hint: 'yourportfolio.com' },
};

const HOST_ICONS: Array<[RegExp, IconKey]> = [
  [/(^|\.)instagram\.com$/, 'instagram'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'],
  [/(^|\.)tiktok\.com$/, 'tiktok'],
  [/(^|\.)(twitter\.com|x\.com)$/, 'x'],
  [/(^|\.)(facebook\.com|fb\.com)$/, 'facebook'],
  [/(^|\.)linkedin\.com$/, 'linkedin'],
  [/(^|\.)spotify\.com$/, 'spotify'],
  [/(^|\.)pinterest\.(com|[a-z]{2})$/, 'pinterest'],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, 'whatsapp'],
  [/(^|\.)github\.com$/, 'github'],
  [/(^|\.)(discord\.gg|discord\.com)$/, 'discord'],
  [/(^|\.)twitch\.tv$/, 'twitch'],
];

export function iconForUrl(url: string): IconKey {
  if (url.startsWith('mailto:')) return 'email';
  const host = hostOf(url);
  for (const [pattern, icon] of HOST_ICONS) {
    if (pattern.test(host)) return icon;
  }
  return 'website';
}

export interface EmbedInfo {
  platform: 'youtube' | 'spotify' | 'instagram';
  externalId: string;
  mode: EmbedMode;
  thumbnail: string | null;
}

export function detectEmbed(url: string): EmbedInfo | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
  const parts = parsed.pathname.split('/').filter(Boolean);

  // YouTube detection
  if (host === 'youtu.be' && parts[0]) {
    return youtube(parts[0]);
  }
  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
    const v = parsed.searchParams.get('v');
    if (v) return youtube(v);
    if ((parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') && parts[1]) {
      return youtube(parts[1]);
    }
  }

  // Spotify detection
  if (host === 'open.spotify.com') {
    const kind = parts[0];
    const allowed = ['track', 'album', 'playlist', 'episode', 'show', 'artist'];
    if (kind && allowed.includes(kind) && parts[1]) {
      return {
        platform: 'spotify',
        externalId: `${kind}/${parts[1]}`,
        mode: 'player',
        thumbnail: null,
      };
    }
  }

  // Instagram detection
  if (host === 'instagram.com') {
    const kind = parts[0];
    if ((kind === 'p' || kind === 'reel' || kind === 'reels' || kind === 'tv') && parts[1]) {
      return {
        platform: 'instagram',
        externalId: `${kind === 'reels' ? 'reel' : kind}/${parts[1]}`,
        mode: 'card',
        thumbnail: null,
      };
    }
  }

  return null;
}

function youtube(id: string): EmbedInfo | null {
  if (!/^[\w-]{6,20}$/.test(id)) return null;
  return {
    platform: 'youtube',
    externalId: id,
    mode: 'player',
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

export function playerSrc(platform: string, externalId: string): string | null {
  if (platform === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(externalId)}`;
  }
  if (platform === 'spotify') {
    const [kind, id] = externalId.split('/');
    if (!kind || !id) return null;
    return `https://open.spotify.com/embed/${encodeURIComponent(kind)}/${encodeURIComponent(id)}`;
  }
  return null;
}

export function titleFromUrl(url: string): string {
  if (url.startsWith('mailto:')) return 'Email Me';
  if (url.startsWith('tel:')) return 'Call Me';
  const host = hostOf(url);
  if (!host) return 'My Link';
  const label = host.split('.')[0];
  return label.charAt(0).toUpperCase() + label.slice(1);
}

import type { CSSProperties } from 'react';
import type { ThemeConfig, FontKey, RadiusKey, ButtonStyle } from '@/src/types/index';

export interface Preset {
  label: string;
  category: 'Modern' | 'Dark' | 'Vibrant' | 'Earthy' | 'Pastel';
  background: string;
  text: string;
  card: string;
  cardText: string;
  accent: string;
  font: FontKey;
  radius: RadiusKey;
  button: ButtonStyle;
}

export const FONTS: Record<FontKey, { label: string; stack: string }> = {
  sans: {
    label: 'Modern Sans',
    stack: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  serif: {
    label: 'Editorial Serif',
    stack: "'Playfair Display', Georgia, Cambria, serif",
  },
  mono: {
    label: 'Technical Mono',
    stack: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
  },
  display: {
    label: 'Expressive Display',
    stack: "'Syne', -apple-system, BlinkMacSystemFont, sans-serif",
  },
};

export const RADII: Record<RadiusKey, { label: string; value: string }> = {
  sharp: { label: 'Sharp (0px)', value: '0px' },
  soft: { label: 'Soft (14px)', value: '14px' },
  round: { label: 'Pill (9999px)', value: '9999px' },
};

export const BUTTON_STYLES: Record<ButtonStyle, { label: string; description: string }> = {
  fill: { label: 'Solid Fill', description: 'Clean solid card with subtle contrast' },
  soft: { label: 'Soft Elevated', description: 'Gentle card with subtle ambient shadow' },
  outline: { label: 'Minimal Outline', description: 'Transparent with crisp 1.5px border' },
  glass: { label: 'Glassmorphism', description: 'Translucent frosted glass with blurred backdrop' },
  brutalist: { label: 'Neo-Brutalist', description: 'Bold black border with hard drop-shadow' },
};

export const PRESETS: Record<string, Preset> = {
  midnight: {
    label: 'Midnight Indigo',
    category: 'Dark',
    background: 'linear-gradient(180deg, #0b0f19 0%, #111827 100%)',
    text: '#f8fafc',
    card: '#1e293b',
    cardText: '#f8fafc',
    accent: '#6366f1',
    font: 'sans',
    radius: 'soft',
    button: 'soft',
  },
  sunset: {
    label: 'Sunset Glow',
    category: 'Vibrant',
    background: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 100%)',
    text: '#261208',
    card: '#ffffff',
    cardText: '#261208',
    accent: '#e64c3c',
    font: 'display',
    radius: 'round',
    button: 'soft',
  },
  mint: {
    label: 'Fresh Mint',
    category: 'Pastel',
    background: 'linear-gradient(180deg, #e7fbf3 0%, #cfeee6 100%)',
    text: '#123a30',
    card: '#ffffff',
    cardText: '#123a30',
    accent: '#10b981',
    font: 'sans',
    radius: 'soft',
    button: 'soft',
  },
  blush: {
    label: 'Blush Velvet',
    category: 'Pastel',
    background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
    text: '#4a1d31',
    card: '#ffffff',
    cardText: '#4a1d31',
    accent: '#ec4899',
    font: 'display',
    radius: 'round',
    button: 'soft',
  },
  mono: {
    label: 'Mono Minimalist',
    category: 'Modern',
    background: '#ffffff',
    text: '#09090b',
    card: '#09090b',
    cardText: '#ffffff',
    accent: '#18181b',
    font: 'mono',
    radius: 'sharp',
    button: 'fill',
  },
  noir: {
    label: 'Deep Noir',
    category: 'Dark',
    background: '#09090b',
    text: '#f4f4f5',
    card: '#18181b',
    cardText: '#f4f4f5',
    accent: '#a1a1aa',
    font: 'mono',
    radius: 'sharp',
    button: 'outline',
  },
  forest: {
    label: 'Emerald Forest',
    category: 'Earthy',
    background: 'linear-gradient(180deg, #064e3b 0%, #022c22 100%)',
    text: '#ecfdf5',
    card: '#065f46',
    cardText: '#ecfdf5',
    accent: '#34d399',
    font: 'serif',
    radius: 'soft',
    button: 'soft',
  },
  grape: {
    label: 'Cyber Violet',
    category: 'Vibrant',
    background: 'linear-gradient(180deg, #311042 0%, #4c1d95 100%)',
    text: '#f3e8ff',
    card: '#581c87',
    cardText: '#faf5ff',
    accent: '#c084fc',
    font: 'display',
    radius: 'round',
    button: 'fill',
  },
  ocean: {
    label: 'Pacific Ocean',
    category: 'Modern',
    background: 'linear-gradient(180deg, #0f172a 0%, #0369a1 100%)',
    text: '#f0f9ff',
    card: '#0284c7',
    cardText: '#f8fafc',
    accent: '#38bdf8',
    font: 'sans',
    radius: 'soft',
    button: 'fill',
  },
  sand: {
    label: 'Sahara Sand',
    category: 'Earthy',
    background: '#fef3c7',
    text: '#451a03',
    card: '#fffbeb',
    cardText: '#451a03',
    accent: '#b45309',
    font: 'serif',
    radius: 'soft',
    button: 'soft',
  },
  citrus: {
    label: 'Solar Citrus',
    category: 'Vibrant',
    background: 'linear-gradient(180deg, #fef08a 0%, #f59e0b 100%)',
    text: '#451a03',
    card: '#ffffff',
    cardText: '#451a03',
    accent: '#d97706',
    font: 'display',
    radius: 'round',
    button: 'soft',
  },
  sky: {
    label: 'Nordic Sky',
    category: 'Pastel',
    background: 'linear-gradient(180deg, #f0f9ff 0%, #bae6fd 100%)',
    text: '#0c4a6e',
    card: '#ffffff',
    cardText: '#0c4a6e',
    accent: '#0284c7',
    font: 'sans',
    radius: 'round',
    button: 'soft',
  },
  clay: {
    label: 'Terracotta Clay',
    category: 'Earthy',
    background: 'linear-gradient(180deg, #7c2d12 0%, #9a3412 100%)',
    text: '#ffedd5',
    card: '#fed7aa',
    cardText: '#7c2d12',
    accent: '#ea580c',
    font: 'serif',
    radius: 'soft',
    button: 'fill',
  },
  coral: {
    label: 'Electric Coral',
    category: 'Vibrant',
    background: 'linear-gradient(180deg, #fb7185 0%, #f43f5e 100%)',
    text: '#ffffff',
    card: '#ffffff',
    cardText: '#881337',
    accent: '#e11d48',
    font: 'sans',
    radius: 'round',
    button: 'soft',
  },
  lime: {
    label: 'Neon Lime',
    category: 'Vibrant',
    background: 'linear-gradient(180deg, #a3e635 0%, #65a30d 100%)',
    text: '#1a2e05',
    card: '#1a2e05',
    cardText: '#ecfccb',
    accent: '#84cc16',
    font: 'display',
    radius: 'soft',
    button: 'fill',
  },
  steel: {
    label: 'Industrial Steel',
    category: 'Modern',
    background: '#1e293b',
    text: '#f1f5f9',
    card: '#334155',
    cardText: '#f8fafc',
    accent: '#94a3b8',
    font: 'mono',
    radius: 'sharp',
    button: 'fill',
  },
  cream: {
    label: 'Luxury Cream',
    category: 'Earthy',
    background: '#fffdfa',
    text: '#292524',
    card: '#292524',
    cardText: '#fffdfa',
    accent: '#78716c',
    font: 'serif',
    radius: 'round',
    button: 'fill',
  },
  violet: {
    label: 'Lavender Mist',
    category: 'Pastel',
    background: 'linear-gradient(180deg, #f5f3ff 0%, #ddd6fe 100%)',
    text: '#4c1d95',
    card: '#6d28d9',
    cardText: '#f5f3ff',
    accent: '#7c3aed',
    font: 'sans',
    radius: 'soft',
    button: 'fill',
  },
  ember: {
    label: 'Dark Ember',
    category: 'Dark',
    background: 'linear-gradient(180deg, #18110e 0%, #291811 100%)',
    text: '#ffedd5',
    card: '#431407',
    cardText: '#ffedd5',
    accent: '#f97316',
    font: 'display',
    radius: 'soft',
    button: 'outline',
  },
  ice: {
    label: 'Arctic Ice',
    category: 'Modern',
    background: '#f8fafc',
    text: '#0f172a',
    card: '#ffffff',
    cardText: '#0f172a',
    accent: '#0ea5e9',
    font: 'sans',
    radius: 'sharp',
    button: 'outline',
  },
  bronze: {
    label: 'Heritage Bronze',
    category: 'Earthy',
    background: 'linear-gradient(180deg, #231d16 0%, #3e3224 100%)',
    text: '#fef3c7',
    card: '#78350f',
    cardText: '#fef3c7',
    accent: '#d97706',
    font: 'serif',
    radius: 'round',
    button: 'fill',
  },
};

export const DEFAULT_PRESET = 'midnight';

export function resolveTheme(theme: ThemeConfig): Preset {
  const base = PRESETS[theme.preset] ?? PRESETS[DEFAULT_PRESET];
  return {
    ...base,
    background: theme.background ?? base.background,
    text: theme.text ?? base.text,
    card: theme.card ?? base.card,
    cardText: theme.cardText ?? base.cardText,
    accent: theme.accent ?? base.accent,
    font: theme.font ?? base.font,
    radius: theme.radius ?? base.radius,
    button: theme.button ?? base.button,
  };
}

export function themeStyle(theme: ThemeConfig): CSSProperties {
  const t = resolveTheme(theme);
  return {
    '--page-bg': t.background,
    '--page-fg': t.text,
    '--card-bg': t.card,
    '--card-fg': t.cardText,
    '--accent': t.accent,
    '--card-radius': RADII[t.radius]?.value ?? '14px',
    '--page-font': FONTS[t.font]?.stack ?? FONTS.sans.stack,
    background: t.background,
    color: t.text,
    fontFamily: FONTS[t.font]?.stack ?? FONTS.sans.stack,
  } as CSSProperties;
}

export function cardStyle(theme: ThemeConfig): CSSProperties {
  const t = resolveTheme(theme);
  const radius = RADII[t.radius]?.value ?? '14px';
  const font = FONTS[t.font]?.stack ?? FONTS.sans.stack;

  const base: CSSProperties = {
    borderRadius: radius,
    fontFamily: font,
    transition: 'all 0.2s ease',
  };

  switch (t.button) {
    case 'outline':
      return {
        ...base,
        background: 'transparent',
        color: 'var(--page-fg)',
        border: '1.5px solid var(--page-fg)',
      };
    case 'soft':
      return {
        ...base,
        background: 'var(--card-bg)',
        color: 'var(--card-fg)',
        boxShadow: '0 8px 24px -10px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      };
    case 'glass':
      return {
        ...base,
        background: 'rgba(255, 255, 255, 0.12)',
        color: 'var(--page-fg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      };
    case 'brutalist':
      return {
        ...base,
        background: 'var(--card-bg)',
        color: 'var(--card-fg)',
        border: '2.5px solid #000000',
        boxShadow: '4px 4px 0px 0px #000000',
      };
    case 'fill':
    default:
      return {
        ...base,
        background: 'var(--card-bg)',
        color: 'var(--card-fg)',
        border: '1px solid transparent',
      };
  }
}

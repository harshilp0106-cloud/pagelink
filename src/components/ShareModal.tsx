import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import type { Profile } from '@/src/types/index';
import { SocialIcon } from '@/src/lib/social-icons';

interface ShareModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ profile, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bioUrl = profile.custom_domain
    ? `https://${profile.custom_domain}`
    : `https://pagelink.to/@${profile.handle}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(bioUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed', err));
    }
  }, [isOpen, bioUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `pagelink_qr_${profile.handle}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3">
            <Share2 className="size-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Share Your Bio Link</h3>
          <p className="text-xs text-slate-500 mt-0.5 mb-4">
            Print this QR code on business cards or share across social media.
          </p>

          {/* QR Code Card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-inner mb-4">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="size-48 rounded-xl object-contain shadow-xs bg-white p-2" />
            ) : (
              <div className="size-48 flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
            <button
              type="button"
              onClick={handleDownloadQR}
              className="mt-3 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Download className="size-3.5" /> Download QR Code PNG
            </button>
          </div>

          {/* Link URL Copy Bar */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 mb-4">
            <input
              type="text"
              readOnly
              value={bioUrl}
              className="flex-1 bg-transparent px-2 text-xs font-semibold text-slate-700 focus:outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 active:scale-95 transition-all"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center justify-center gap-2 w-full pt-2 border-t border-slate-100">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out my bio link: ${bioUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              title="Share on WhatsApp"
            >
              <SocialIcon name="whatsapp" className="size-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my bio link: ${bioUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
              title="Share on X"
            >
              <SocialIcon name="x" className="size-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(bioUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              title="Share on LinkedIn"
            >
              <SocialIcon name="linkedin" className="size-4" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(`${profile.display_name} - Bio Link`)}&body=${encodeURIComponent(`Check out my bio page: ${bioUrl}`)}`}
              className="flex size-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
              title="Share via Email"
            >
              <SocialIcon name="email" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

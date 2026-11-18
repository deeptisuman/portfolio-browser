import React, { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  Clock,
  Coffee,
  Copy,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Globe,
  GraduationCap,
  Images,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Palette,
  Phone,
  Printer,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  CERTIFICATIONS,
  EXPERIENCE_TAB_DATA,
  FULL_SKILLS_GROUPS,
  FUN_FACTS_TAB_DATA,
  HEALTHSYNC_ARTBOARDS,
  HEALTHSYNC_LOGO_SRC,
  PROFILE,
  PROJECTS,
  SKILLS_TAB_DATA,
  TRIPEZZA_SCREENS,
} from '../data/portfolioData';
import { DeeptiAvatar, ProjectVisualCard } from './ProjectVisuals';

/* ============================================================================
   1. ABOUT POPUP (560px wide, gradient banner, overlapping avatar, 3 tabs)
   ============================================================================ */
interface AboutPopupProps {
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function AboutPopup({ onClose, onOpenResume, onOpenContact }: AboutPopupProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'funfacts'>('skills');

  const quickChips = [
    { icon: MapPin, text: PROFILE.location },
    { icon: Clock, text: PROFILE.timezoneAndReply },
    { icon: GraduationCap, text: PROFILE.educationShort },
    { icon: Award, text: PROFILE.quickStatsChip },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: PROFILE.linkedin, icon: Linkedin },
    { label: 'GitHub', href: PROFILE.github, icon: Github },
    { label: 'Email', href: `mailto:${PROFILE.email}`, icon: Mail },
    { label: 'Phone', href: `tel:${PROFILE.phone.replace(/\s+/g, '')}`, icon: Phone },
  ];

  const funIcons = {
    award: Award,
    mic: Mic,
    sparkles: Sparkles,
    globe: Globe,
    art: Palette,
    coffee: Coffee,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.18 }}
      className="w-[min(92vw,560px)] max-h-[88vh] overflow-y-auto hide-scrollbar bg-white rounded-[20px] shadow-[0_8px_40px_0_rgba(0,0,0,0.22),0_2px_8px_0_rgba(0,0,0,0.04)] border border-[#dadce0]"
    >
      {/* Top 120px gradient banner */}
      <div
        className="relative h-[120px] w-full"
        style={{
          background:
            'linear-gradient(180deg, #4285f4 0%, rgba(66, 133, 244, 0.25) 65%, rgba(95, 99, 104, 0.1) 100%)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close About popup"
          className="absolute right-[14px] top-[14px] w-[30px] h-[30px] rounded-full bg-white/90 hover:bg-white text-[#202124] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Overlapping 88x88 avatar */}
        <div className="absolute left-[28px] -bottom-[36px] w-[88px] h-[88px] rounded-full bg-white p-1 border border-[#dadce0] shadow-xs">
          <DeeptiAvatar size={78} />
        </div>
      </div>

      {/* Body */}
      <div className="px-[28px] pt-[48px] pb-[28px]">
        {/* Name row + Available badge */}
        <div className="flex items-start justify-between gap-3 pb-1">
          <div>
            <h2 className="text-[20px] font-bold text-[#202124] tracking-[-0.02em]">
              {PROFILE.name}
            </h2>
            <p className="text-[13px] text-[#5f6368] mt-0.5">
              {PROFILE.subHeadline} · {PROFILE.location}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#34a853] text-[11px] font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" aria-hidden="true" />
            {PROFILE.availability}
          </span>
        </div>

        {/* Bio */}
        <p className="text-[14px] leading-[1.7] text-[#3c4043] mt-3">{PROFILE.shortBio}</p>

        {/* Quick fact chips */}
        <div className="flex flex-wrap gap-2 py-4 border-b border-[#dadce0]">
          {quickChips.map((chip) => {
            const Icon = chip.icon;
            return (
              <span
                key={chip.text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[12px] text-[#3c4043]"
              >
                <Icon className="w-3 h-3 text-[#5f6368] shrink-0" />
                <span>{chip.text}</span>
              </span>
            );
          })}
        </div>

        {/* Interactive Tabs */}
        <div className="mt-4">
          <div className="flex items-center border-b border-[#dadce0] gap-1">
            {[
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'funfacts', label: 'Fun facts' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'skills' | 'experience' | 'funfacts')}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#4285f4] border-[#4285f4]'
                      : 'text-[#5f6368] border-transparent hover:text-[#202124]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 min-h-[245px]">
            {activeTab === 'skills' && (
              <div className="space-y-3.5">
                {SKILLS_TAB_DATA.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[13px] font-semibold text-[#202124]">
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-[#5f6368] ml-2">{skill.tools}</span>
                      </div>
                      <span className="text-[12px] font-mono text-[#5f6368] tabular-nums shrink-0">
                        {skill.percent}%
                      </span>
                    </div>
                    <div className="w-full h-[5px] rounded-full bg-[#dadce0]/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percent}%` }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="divide-y divide-[#dadce0]">
                {EXPERIENCE_TAB_DATA.map((item) => (
                  <div key={item.role} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-[13px] font-semibold text-[#202124]">{item.role}</div>
                      <span className="text-[11px] text-[#5f6368] shrink-0">{item.type}</span>
                    </div>
                    <div className="text-[12px] text-[#5f6368] mt-0.5">{item.orgAndDates}</div>
                    <p className="text-[12px] leading-[1.5] text-[#3c4043] mt-1">{item.impact}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'funfacts' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FUN_FACTS_TAB_DATA.map((fact) => {
                  const Icon = funIcons[fact.iconKey];
                  return (
                    <div
                      key={fact.title}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] bg-[#f8f9fa] border border-[#dadce0]"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#dadce0] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#4285f4]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-[#202124] truncate">
                          {fact.title}
                        </div>
                        <div className="text-[11px] text-[#5f6368] truncate">{fact.subtitle}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer: Socials + Resume/Hire Me */}
        <div className="mt-5 pt-4 border-t border-[#dadce0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-[36px] h-[36px] rounded-full border border-[#dadce0] hover:bg-[#f8f9fa] flex items-center justify-center text-[#3c4043] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="px-4 py-2 rounded-[8px] border border-[#dadce0] text-[13px] font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors cursor-pointer whitespace-nowrap"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="px-4 py-2 rounded-[8px] bg-[#4285f4] hover:bg-[#1a73e8] text-[13px] font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Hire me
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   2. CONTACT MODAL (380px wide, Say hello 👋, Form + Direct Email copy)
   ============================================================================ */
export function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 550);
  }

  function handleCopyEmail() {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${name || 'Visitor'}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.16 }}
      className="w-[min(92vw,380px)] bg-white rounded-[16px] p-[28px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-[#dadce0]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold text-[#202124]">Say hello 👋</h2>
          <p className="text-[13px] text-[#5f6368] mt-1 leading-relaxed">
            Open to AI Product Manager &amp; AI Product Engineer roles. Let’s chat.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact modal"
          className="p-1 rounded-full text-[#5f6368] hover:bg-[#f8f9fa] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Direct email copy bar */}
      <div className="mt-3 flex items-center justify-between gap-2 px-3 py-2 rounded-[8px] bg-[#f8f9fa] border border-[#dadce0] text-[12px]">
        <span className="text-[#3c4043] truncate font-mono">{PROFILE.email}</span>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-1 text-[#4285f4] hover:text-[#1a73e8] font-medium shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {status === 'success' ? (
        <div className="mt-5 p-4 rounded-[12px] bg-[#e6f4ea] border border-[#34a853]/30 text-[#202124]">
          <div className="text-[14px] font-semibold text-[#006621]">Thank you, {name}!</div>
          <p className="text-[12px] text-[#3c4043] mt-1 leading-relaxed">
            Your note is ready. Click below to open your email client directly to send it to Deepti,
            or copy her email above.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#4285f4] hover:bg-[#1a73e8] text-white text-[12px] font-medium"
            >
              <Send className="w-3.5 h-3.5" />
              Open in Email App
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-[8px] border border-[#dadce0] bg-white text-[12px] text-[#5f6368] hover:text-[#202124] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="pt-4 space-y-2.5">
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              className="w-full h-[40px] px-[14px] py-[10px] rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] placeholder:text-[#999999] outline-none focus:border-[#4285f4] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              className="w-full h-[40px] px-[14px] py-[10px] rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] placeholder:text-[#999999] outline-none focus:border-[#4285f4] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              What are you working on?
            </label>
            <textarea
              id="contact-message"
              placeholder="What are you working on?"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              className="w-full min-h-[90px] px-[14px] py-[10px] rounded-[8px] border border-[#dadce0] text-[14px] text-[#202124] placeholder:text-[#999999] outline-none focus:border-[#4285f4] resize-y transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="text-[12px] font-semibold text-[#ff2244]">
              Please fill in your name, email, and message.
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-[35px] px-4 rounded-[8px] border border-[#dadce0] text-[13px] font-medium text-[#5f6368] hover:bg-[#f8f9fa] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="min-w-[140px] h-[35px] px-5 rounded-[8px] bg-[#4285f4] hover:bg-[#1a73e8] text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                'Send message'
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

/* ============================================================================
   3. IMAGE GALLERY POPUP (438px wide x 540px tall scrollable masonry grid)
   ============================================================================ */
export function GalleryPopup({
  onClose,
  onOpenProject,
}: {
  onClose: () => void;
  onOpenProject: (slug: string) => void;
}) {
  const featuredTripezzaIds = [
    'home-dashboard',
    'flight-results',
    'compliance-supervisor',
    'chronicler-trip-journal',
  ];
  const tripezzaTiles = TRIPEZZA_SCREENS.filter((s) =>
    featuredTripezzaIds.includes(s.id)
  );
  const healthSyncMainBoard = HEALTHSYNC_ARTBOARDS[0];

  const remainingTiles = [
    { slug: 'stipens', variant: 0, title: 'Stipens — India AA Architecture', heightClass: 'h-[180px] col-span-2' },
    { slug: 'ats-resume-tailor', variant: 0, title: 'ATS Claude Optimizer', heightClass: 'h-[154px]' },
    { slug: 'design-visuals', variant: 0, title: 'TEDxLPU & GDSC Visuals', heightClass: 'h-[154px]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.16 }}
      className="w-[min(92vw,438px)] h-[min(82vh,540px)] bg-white rounded-[24px] shadow-[0_8px_40px_0_rgba(0,0,0,0.22)] border border-[#dadce0] overflow-y-auto hide-scrollbar p-4"
    >
      {/* Sticky top pill */}
      <div className="sticky top-0 z-10 flex items-center justify-between pb-3 pointer-events-none">
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#202124] text-white text-[12px] font-medium shadow-md hover:bg-[#3c4043] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Close Gallery</span>
        </button>
        <span className="pointer-events-auto px-3 py-1 rounded-full bg-white/90 border border-[#dadce0] text-[11px] font-medium text-[#5f6368] shadow-xs">
          Product &amp; UI Artifacts
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenProject('tripezza');
          }}
          className="group relative rounded-[22px] overflow-hidden border border-[#dadce0] text-left cursor-pointer h-[190px] col-span-2"
        >
          <ProjectVisualCard slug="tripezza" variant={0} />
          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
            <span className="text-[11px] font-medium text-white truncate">
              Tripezza — 9-Agent LangGraph
            </span>
            <ExternalLink className="w-3 h-3 text-white shrink-0" />
          </div>
        </button>

        {/* Real Tripezza Mobile UI Screens */}
        {tripezzaTiles.map((screen) => (
          <button
            key={screen.id}
            type="button"
            onClick={() => {
              onClose();
              onOpenProject('tripezza');
            }}
            className="group relative rounded-[22px] overflow-hidden border border-[#dadce0] bg-[#0b1220] text-left cursor-pointer h-[220px]"
          >
            <img
              src={screen.src}
              alt={screen.title}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <span className="text-[11px] font-medium text-white truncate">
                Tripezza · {screen.title}
              </span>
              <ExternalLink className="w-3 h-3 text-white shrink-0" />
            </div>
          </button>
        ))}

        {/* Real HealthSync 7-Screen Suite */}
        {healthSyncMainBoard && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenProject('healthsync');
            }}
            className="group relative rounded-[22px] overflow-hidden border border-[#dadce0] bg-[#383838] text-left cursor-pointer h-[200px] col-span-2"
          >
            <img
              src={healthSyncMainBoard.src}
              alt={healthSyncMainBoard.title}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <span className="text-[11px] font-medium text-white truncate">
                HealthSync — 7-Screen Care &amp; Telehealth UI
              </span>
              <ExternalLink className="w-3 h-3 text-white shrink-0" />
            </div>
          </button>
        )}

        {/* Row: UplyFox + HealthSync Brand Identity */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenProject('uplyfox');
          }}
          className="group relative rounded-[22px] overflow-hidden border border-[#dadce0] text-left cursor-pointer h-[160px]"
        >
          <ProjectVisualCard slug="uplyfox" variant={0} />
          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
            <span className="text-[11px] font-medium text-white truncate">
              UplyFox — Chrome MV3 Copilot
            </span>
            <ExternalLink className="w-3 h-3 text-white shrink-0" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenProject('healthsync');
          }}
          className="group relative rounded-[22px] overflow-hidden border border-[#1565C0]/30 bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] flex items-center justify-center p-4 cursor-pointer h-[160px]"
        >
          <img
            src={HEALTHSYNC_LOGO_SRC}
            alt="HealthSync Brand Mark"
            loading="lazy"
            className="h-[88px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
            <span className="text-[11px] font-medium text-white truncate">
              HealthSync — Brand &amp; 17 UI Screens
            </span>
            <ExternalLink className="w-3 h-3 text-white shrink-0" />
          </div>
        </button>

        {remainingTiles.map((tile) => (
          <button
            key={tile.slug}
            type="button"
            onClick={() => {
              onClose();
              onOpenProject(tile.slug);
            }}
            className={`group relative rounded-[22px] overflow-hidden border border-[#dadce0] text-left cursor-pointer ${tile.heightClass}`}
          >
            <ProjectVisualCard slug={tile.slug} variant={tile.variant} />
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <span className="text-[11px] font-medium text-white truncate">{tile.title}</span>
              <ExternalLink className="w-3 h-3 text-white shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================================================
   4. WAFFLE / CONNECT APPS POPUP (280px wide, 3x3 grid, top-right anchored)
   ============================================================================ */
interface WafflePopupProps {
  onClose: () => void;
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
}

export function WafflePopup({ onClose, onNavigate, onOpenPopup }: WafflePopupProps) {
  const apps = [
    {
      label: 'LinkedIn',
      color: '#0077B5',
      bg: '#E8F4FA',
      icon: Linkedin,
      href: PROFILE.linkedin,
    },
    {
      label: 'GitHub',
      color: '#202124',
      bg: '#F1F3F4',
      icon: Github,
      href: PROFILE.github,
    },
    {
      label: 'Email',
      color: '#EA4335',
      bg: '#FCE8E6',
      icon: Mail,
      href: `mailto:${PROFILE.email}`,
    },
    {
      label: 'Work',
      color: '#4285F4',
      bg: '#E8F0FE',
      icon: FolderKanban,
      onClick: () => {
        onClose();
        onNavigate('/work');
      },
    },
    {
      label: 'About',
      color: '#FBBC05',
      bg: '#FEF3E2',
      icon: User,
      onClick: () => {
        onClose();
        onOpenPopup('about');
      },
    },
    {
      label: 'Resume',
      color: '#34A853',
      bg: '#E6F4EA',
      icon: FileText,
      onClick: () => {
        onClose();
        onOpenPopup('resume');
      },
    },
    {
      label: 'Gallery',
      color: '#8B5CF6',
      bg: '#F3E8FF',
      icon: Images,
      onClick: () => {
        onClose();
        onOpenPopup('gallery');
      },
    },
    {
      label: 'Contact',
      color: '#1A73E8',
      bg: '#E8F0FE',
      icon: Send,
      onClick: () => {
        onClose();
        onOpenPopup('contact');
      },
    },
    {
      label: 'Call',
      color: '#006621',
      bg: '#E6F4EA',
      icon: Phone,
      href: `tel:${PROFILE.phone.replace(/\s+/g, '')}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.14 }}
      className="fixed top-[72px] right-4 sm:right-[76px] z-50 w-[min(85vw,280px)] bg-white rounded-[16px] p-4 shadow-[0_2px_10px_0_rgba(0,0,0,0.18)] border border-[#dadce0]"
    >
      <div className="text-center text-[12px] font-medium text-[#5f6368] pb-3">Find me on</div>
      <div className="grid grid-cols-3 gap-1">
        {apps.map((app) => {
          const Icon = app.icon;
          const inner = (
            <>
              <div
                className="w-[44px] h-[44px] rounded-[12px] border border-[#dadce0]/70 flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ backgroundColor: app.bg }}
              >
                <Icon className="w-[20px] h-[20px]" style={{ color: app.color }} />
              </div>
              <span className="text-[11px] text-[#3c4043] truncate max-w-full">{app.label}</span>
            </>
          );

          if (app.href) {
            return (
              <a
                key={app.label}
                href={app.href}
                target={app.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                onClick={onClose}
                className="group flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-[12px] hover:bg-[#f8f9fa] transition-colors"
              >
                {inner}
              </a>
            );
          }

          return (
            <button
              key={app.label}
              type="button"
              onClick={app.onClick}
              className="group flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-[12px] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
            >
              {inner}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================================
   5. PROFILE POPUP (300px wide, anchored top-right)
   ============================================================================ */
interface ProfilePopupProps {
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function ProfilePopup({ onClose, onOpenResume, onOpenContact }: ProfilePopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.14 }}
      className="fixed top-[72px] right-4 sm:right-[30px] z-50 w-[min(86vw,300px)] bg-white rounded-[16px] p-5 shadow-[0_2px_10px_0_rgba(0,0,0,0.18)] border border-[#dadce0] flex flex-col items-center text-center"
    >
      <div className="pb-3">
        <DeeptiAvatar size={72} />
      </div>
      <div className="text-[16px] font-semibold text-[#202124]">{PROFILE.name}</div>
      <div className="text-[12px] text-[#5f6368] mt-0.5">{PROFILE.subHeadline}</div>
      <a
        href={`mailto:${PROFILE.email}`}
        className="text-[12px] text-[#4285f4] hover:underline mt-2 mb-3.5 font-mono"
      >
        {PROFILE.email}
      </a>

      <div className="w-full h-[1px] bg-[#dadce0]" />

      <div className="w-full pt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenResume();
          }}
          className="flex-1 py-2 px-3 rounded-[8px] border border-[#dadce0] text-[13px] font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors cursor-pointer whitespace-nowrap"
        >
          Resume
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="flex-1 py-2 px-3 rounded-[8px] bg-[#4285f4] hover:bg-[#1a73e8] text-[13px] font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          Hire me
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================================
   6. RESUME MODAL (Interactive, Printable CV for Deepti Suman)
   ============================================================================ */
export function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: 0.16 }}
      className="print-only-sheet w-[min(94vw,760px)] max-h-[88vh] overflow-y-auto bg-white rounded-[20px] shadow-[0_8px_40px_0_rgba(0,0,0,0.22)] border border-[#dadce0] p-6 sm:p-8 text-[#202124]"
    >
      {/* Top Action Bar */}
      <div className="no-print flex items-center justify-between pb-4 mb-5 border-b border-[#dadce0]">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#5f6368]">
          <FileText className="w-4 h-4 text-[#4285f4]" />
          <span>Resume_DeeptiSuman.pdf · 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#4285f4] hover:bg-[#1a73e8] text-white text-[12px] font-medium cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            className="w-8 h-8 rounded-full hover:bg-[#f8f9fa] flex items-center justify-center text-[#5f6368] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resume Header */}
      <div className="border-b border-[#dadce0] pb-4">
        <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#202124]">{PROFILE.name}</h2>
        <div className="text-[14px] font-medium text-[#4285f4] mt-0.5">{PROFILE.subHeadline}</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#5f6368] mt-2">
          <span>{PROFILE.location}</span>
          <span>·</span>
          <span>{PROFILE.phone}</span>
          <span>·</span>
          <span>{PROFILE.email}</span>
          <span>·</span>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-[#1a0dab] hover:underline">
            linkedin.com/in/deepti-suman
          </a>
          <span>·</span>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-[#1a0dab] hover:underline">
            github.com/deeptisuman
          </a>
        </div>
      </div>

      {/* Summary */}
      <section className="mt-4">
        <h3 className="text-[13px] font-bold text-[#202124] mb-1.5 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#4285f4]" />
          Summary
        </h3>
        <p className="text-[13px] leading-[1.6] text-[#3c4043]">
          AI Product Engineer building AI-powered web products and browser applications with React,
          Next.js, TypeScript, Python, and LLMs. Experienced in LLM orchestration, RAG, structured
          outputs, and human-in-the-loop systems, combining hands-on engineering with product
          thinking and user-centric problem solving.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-5">
        <h3 className="text-[13px] font-bold text-[#202124] mb-2 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-[#4285f4]" />
          Experience &amp; Leadership
        </h3>
        <div className="space-y-3">
          {EXPERIENCE_TAB_DATA.filter((e) => e.type !== 'Education').map((exp) => (
            <div key={exp.role}>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[13px] font-semibold text-[#202124]">{exp.role}</span>
                <span className="text-[12px] text-[#5f6368]">{exp.orgAndDates}</span>
              </div>
              <p className="text-[12px] text-[#3c4043] leading-[1.55] mt-0.5">{exp.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mt-5">
        <h3 className="text-[13px] font-bold text-[#202124] mb-2 flex items-center gap-1.5">
          <FolderKanban className="w-3.5 h-3.5 text-[#4285f4]" />
          Key AI &amp; Product Projects
        </h3>
        <div className="space-y-2.5">
          {PROJECTS.slice(0, 5).map((p) => (
            <div key={p.slug}>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-[13px] font-semibold text-[#202124]">{p.title}</span>
                <span className="text-[11px] font-mono text-[#5f6368]">{p.timelineOrScope}</span>
              </div>
              <p className="text-[12px] text-[#3c4043] leading-[1.5] mt-0.5">{p.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-[13px] font-bold text-[#202124] mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#4285f4]" />
            Education
          </h3>
          <div className="space-y-2 text-[12px]">
            <div>
              <div className="font-semibold text-[#202124]">
                Product Management with Generative &amp; Agentic AI
              </div>
              <div className="text-[#5f6368]">BITS School of Management (BITSoM) · 2025–2026</div>
            </div>
            <div>
              <div className="font-semibold text-[#202124]">
                B.Tech, Computer Science &amp; Engineering
              </div>
              <div className="text-[#5f6368]">Lovely Professional University · 2020–2024</div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-[#202124] mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#4285f4]" />
            Certifications &amp; Honors
          </h3>
          <ul className="space-y-1 text-[12px] text-[#3c4043]">
            <li>· Smart India Hackathon 2023 — Finalist</li>
            <li>· National Youth Parliament 2022 — Finalist</li>
            {CERTIFICATIONS.slice(0, 3).map((c) => (
              <li key={c.name}>
                · {c.name} ({c.provider})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-5 pt-4 border-t border-[#dadce0]">
        <h3 className="text-[13px] font-bold text-[#202124] mb-2">Technical &amp; Product Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
          {FULL_SKILLS_GROUPS.map((g) => (
            <div key={g.label}>
              <span className="font-semibold text-[#202124]">{g.label}: </span>
              <span className="text-[#5f6368]">{g.items}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

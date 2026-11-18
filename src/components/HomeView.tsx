import React from 'react';
import { Briefcase, MessageSquare } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolioData';
import { ChromeBookmarkBar, UtilityNav } from './ChromeTopBar';
import { ProjectShortcutIcon } from './ProjectVisuals';
import { SearchBar } from './SearchBar';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
  onToggleWaffle: () => void;
  onToggleProfile: () => void;
}

export function HomeView({
  onNavigate,
  onOpenPopup,
  onToggleWaffle,
  onToggleProfile,
}: HomeViewProps) {
  const featuredShortcuts = PROJECTS.filter((p) => p.featuredOnHome).slice(0, 4);

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* User-Provided Nature Wallpaper */}
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#1a5fb4]">
        <img
          src="/assets/aistudio/nature-background-nature-wallpaper-vast-green-grass-field-under-a-bright-blue-sky-with-scattered-white-clouds-free-photo_50c86cdb.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/35" />
      </div>

      {/* Top Chrome Bookmark Bar */}
      <div className="relative z-10">
        <ChromeBookmarkBar
          currentPath="/"
          onNavigate={onNavigate}
          onOpenPopup={(p) => onOpenPopup(p)}
        />
      </div>

      {/* Top-Right Utility Nav */}
      <div className="relative z-10 flex justify-end px-4 py-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
        <UtilityNav
          darkBackdrop
          showGallery
          onOpenContact={() => onOpenPopup('contact')}
          onOpenGallery={() => onOpenPopup('gallery')}
          onToggleWaffle={onToggleWaffle}
          onToggleProfile={onToggleProfile}
        />
      </div>

      {/* Centered Hero Stack */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-7 pb-[60px]">
        {/* Hero Name + concise positioning */}
        <div className="text-center pb-[26px]">
          <h1 className="text-[40px] sm:text-[48px] font-bold leading-none tracking-[-2px] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
            {PROFILE.name}
          </h1>
          {PROFILE.heroTagline && (
            <p className="mt-3 text-[14px] font-medium text-white max-w-[520px] mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              {PROFILE.heroTagline}
            </p>
          )}
        </div>

        {/* 580px Google Search Bar */}
        <div className="w-full flex justify-center pb-[20px]">
          <SearchBar onNavigate={onNavigate} onOpenPopup={onOpenPopup} />
        </div>

        {/* 2 Quick Action CTA Chips */}
        <div className="w-full max-w-[580px] flex flex-wrap items-center justify-center gap-2.5 pb-[36px]">
          <button
            type="button"
            onClick={() => onNavigate('/work')}
            className="flex items-center gap-2.5 min-w-[220px] max-w-[280px] flex-1 bg-white rounded-[16px] px-[18px] py-[10px] shadow-[0_1px_6px_0_rgba(32,33,36,0.28),0_1px_4px_0_rgba(32,33,36,0.16)] hover:shadow-[0_2px_10px_rgba(32,33,36,0.32)] hover:-translate-y-[1px] transition-all text-left cursor-pointer"
          >
            <span className="w-8 h-8 rounded-[10px] bg-[#e8f0fe] flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-[#4285f4]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-[#202124] truncate">
                Explore my work
              </span>
              <span className="block text-[11px] text-[#5f6368] truncate">
                AI products, PRDs &amp; case studies
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => onOpenPopup('contact')}
            className="flex items-center gap-2.5 min-w-[220px] max-w-[280px] flex-1 bg-white rounded-[16px] px-[18px] py-[10px] shadow-[0_1px_6px_0_rgba(32,33,36,0.28),0_1px_4px_0_rgba(32,33,36,0.16)] hover:shadow-[0_2px_10px_rgba(32,33,36,0.32)] hover:-translate-y-[1px] transition-all text-left cursor-pointer"
          >
            <span className="w-8 h-8 rounded-[10px] bg-[#fef3e2] flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#fbbc05]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-[#202124] truncate">
                Let’s work together
              </span>
              <span className="block text-[11px] text-[#5f6368] truncate">
                AI PM / Engineer roles &amp; chat
              </span>
            </span>
          </button>
        </div>

        {/* 4 Chrome-style Project Shortcuts */}
        <div className="w-full max-w-[580px] flex flex-wrap items-center justify-center gap-2.5">
          {featuredShortcuts.map((proj) => (
            <button
              key={proj.slug}
              type="button"
              onClick={() => onNavigate(`/work/${proj.slug}`)}
              className="w-[82px] h-[82px] px-2 py-2.5 rounded-[12px] flex flex-col items-center justify-center gap-1.5 bg-transparent hover:bg-white/12 transition-colors cursor-pointer"
            >
              <div className="w-11 h-11 rounded-[12px] bg-[#f8f9fa] flex items-center justify-center shadow-xs">
                <ProjectShortcutIcon slug={proj.slug} size={30} />
              </div>
              <span className="text-[11px] text-white/95 font-medium truncate w-full text-center drop-shadow-xs">
                {proj.shortName}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

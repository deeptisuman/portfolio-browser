import React from 'react';
import { DeeptiAvatar } from './ProjectVisuals';

interface BookmarkBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume') => void;
}

export function ChromeBookmarkBar({ currentPath, onNavigate, onOpenPopup }: BookmarkBarProps) {
  const bookmarks = [
    {
      letter: 'H',
      label: 'Home',
      badgeBg: '#4285f4',
      active: currentPath === '/',
      onClick: () => onNavigate('/'),
    },
    {
      letter: 'W',
      label: 'Work',
      badgeBg: '#ea4335',
      active: currentPath.startsWith('/work'),
      onClick: () => onNavigate('/work'),
    },
    {
      letter: 'A',
      label: 'About',
      badgeBg: '#fbbc05',
      active: false,
      onClick: () => onOpenPopup('about'),
    },
    {
      letter: 'R',
      label: 'Resume',
      badgeBg: '#34a853',
      active: false,
      onClick: () => onOpenPopup('resume'),
    },
  ];

  return (
    <div className="w-full min-h-[36px] bg-[#f8f9fa] border-y border-[#dadce0] px-4 flex items-center gap-0.5 overflow-x-auto hide-scrollbar">
      {bookmarks.map((bm) => (
        <button
          key={bm.label}
          type="button"
          onClick={bm.onClick}
          className={`flex items-center gap-[5px] px-2 py-1 rounded-[6px] text-[12px] tracking-[-0.02em] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            bm.active
              ? 'bg-[#e8f0fe] text-[#202124] font-medium'
              : 'text-[#3c4043] hover:bg-[#5f6368]/10'
          }`}
        >
          <span
            className="w-[14px] h-[14px] rounded-[3px] flex items-center justify-center text-[8px] font-bold text-white shrink-0"
            style={{ backgroundColor: bm.badgeBg }}
          >
            {bm.letter}
          </span>
          <span>{bm.label}</span>
        </button>
      ))}
    </div>
  );
}

interface UtilityNavProps {
  darkBackdrop?: boolean;
  showGallery?: boolean;
  onOpenContact: () => void;
  onOpenGallery?: () => void;
  onToggleWaffle: () => void;
  onToggleProfile: () => void;
}

export function UtilityNav({
  darkBackdrop = false,
  showGallery = true,
  onOpenContact,
  onOpenGallery,
  onToggleWaffle,
  onToggleProfile,
}: UtilityNavProps) {
  const linkColor = darkBackdrop
    ? 'text-white/95 hover:bg-white/15'
    : 'text-[#5f6368] hover:bg-[#5f6368]/10 hover:text-[#202124]';
  const dotColor = darkBackdrop ? 'bg-white' : 'bg-[#5f6368]';
  const waffleHover = darkBackdrop ? 'hover:bg-white/15' : 'hover:bg-[#5f6368]/10';

  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        type="button"
        onClick={onOpenContact}
        className={`px-2 py-1.5 rounded-[6px] text-[14px] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${linkColor}`}
      >
        Contact
      </button>

      {showGallery && onOpenGallery && (
        <button
          type="button"
          onClick={onOpenGallery}
          className={`px-2 py-1.5 rounded-[6px] text-[14px] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${linkColor}`}
        >
          Gallery
        </button>
      )}

      <div className="flex items-center gap-2.5 pl-1.5">
        <button
          type="button"
          onClick={onToggleWaffle}
          aria-label="Open quick links menu"
          className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors cursor-pointer ${waffleHover}`}
        >
          <span className="grid grid-cols-3 gap-[3px]">
            {Array.from({ length: 9 }).map((_, idx) => (
              <span key={idx} className={`w-[4px] h-[4px] rounded-full ${dotColor}`} />
            ))}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleProfile}
          aria-label="Open profile menu"
          className="w-[36px] h-[36px] rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#4285f4]/40 transition-all cursor-pointer shrink-0"
        >
          <DeeptiAvatar size={36} />
        </button>
      </div>
    </div>
  );
}

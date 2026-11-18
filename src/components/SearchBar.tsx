import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { SEARCH_INDEX, SearchIndexItem } from '../data/portfolioData';

interface SearchBarProps {
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
  maxWidthClass?: string;
  compact?: boolean;
  initialQuery?: string;
  onQueryChange?: (q: string) => void;
}

export function SearchBar({
  onNavigate,
  onOpenPopup,
  maxWidthClass = 'max-w-[580px]',
  compact = false,
  initialQuery = '',
  onQueryChange,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = SEARCH_INDEX.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function selectItem(item: SearchIndexItem) {
    setIsOpen(false);
    if (item.type === 'popup') {
      onOpenPopup(item.target as 'about' | 'resume' | 'gallery' | 'contact');
    } else {
      onNavigate(item.target);
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || filtered.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev + 1 >= filtered.length ? 0 : prev + 1;
        listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev - 1 < 0 ? filtered.length - 1 : prev - 1;
        listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
        return next;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filtered[activeIndex]) {
        selectItem(filtered[activeIndex]);
      } else if (filtered.length > 0) {
        selectItem(filtered[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  const showDropdown = isOpen;

  return (
    <div ref={containerRef} className={`relative w-full ${maxWidthClass}`}>
      <div
        className={`flex items-center gap-2.5 w-full bg-white border border-[#dadce0] transition-shadow duration-150 ${
          compact ? 'px-4 py-2.5' : 'px-5 py-3'
        } ${
          showDropdown
            ? 'rounded-t-[24px] rounded-b-none border-b-transparent shadow-[0_1px_3px_rgba(32,33,36,0.28),0_2px_6px_2px_rgba(32,33,36,0.15)]'
            : 'rounded-[28px] shadow-[0_1px_6px_0_rgba(32,33,36,0.28),0_1px_4px_0_rgba(32,33,36,0.16)] hover:shadow-[0_1px_8px_0_rgba(32,33,36,0.35)]'
        }`}
      >
        <Search className="w-[17px] h-[17px] text-[#9aa0a6] shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onQueryChange?.(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search projects, AI systems, about…"
          aria-label="Search portfolio"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] text-[#202124] placeholder:text-[#9aa0a6]"
        />
        <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-[#9aa0a6] border border-[#dadce0] rounded select-none shrink-0 whitespace-nowrap">
          Ctrl + K
        </kbd>
      </div>

      {showDropdown && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute left-0 top-full w-full bg-white border border-t border-[#dadce0] rounded-b-[24px] shadow-[0_4px_12px_rgba(32,33,36,0.2)] py-2 max-h-[320px] overflow-y-auto z-50"
        >
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <li
                key={item.id}
                role="option"
                aria-selected={idx === activeIndex}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(-1)}
                onClick={() => selectItem(item)}
                className={`flex items-center justify-between gap-3 px-[18px] py-2.5 cursor-pointer transition-colors duration-100 ${
                  idx === activeIndex ? 'bg-[#f8f9fa]' : 'hover:bg-[#f8f9fa]'
                }`}
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <Search className="w-3.5 h-3.5 text-[#9aa0a6] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#202124] truncate">
                      {item.name}
                    </div>
                    <div className="text-[12px] text-[#5f6368] truncate">{item.subtitle}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium capitalize text-[#5f6368] shrink-0">
                  {item.type}
                </span>
              </li>
            ))
          ) : (
            <li className="px-[18px] py-3 text-[13px] text-[#5f6368]">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PROFILE, ProjectCategory, PROJECTS } from '../data/portfolioData';
import { UtilityNav } from './ChromeTopBar';
import { ProjectShortcutIcon } from './ProjectVisuals';
import { SearchBar } from './SearchBar';

interface WorkViewProps {
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
  onToggleWaffle: () => void;
  onToggleProfile: () => void;
}

const FILTER_TABS: Array<'All' | ProjectCategory> = [
  'All',
  'AI Products',
  'Multi-Agent',
  'Fintech',
  'UI/UX',
];

export function WorkView({
  onNavigate,
  onOpenPopup,
  onToggleWaffle,
  onToggleProfile,
}: WorkViewProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
  const [inlineQuery, setInlineQuery] = useState('');

  const visibleProjects = PROJECTS.filter((proj) => {
    const matchesCat = activeFilter === 'All' || proj.category === activeFilter;
    const q = inlineQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      proj.title.toLowerCase().includes(q) ||
      proj.summary.toLowerCase().includes(q) ||
      proj.stack.some((s) => s.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  // Google-colored letters for "Deepti"
  const logoLetters = [
    { ch: 'D', color: '#4285f4' },
    { ch: 'e', color: '#ea4335' },
    { ch: 'e', color: '#fbbc05' },
    { ch: 'p', color: '#4285f4' },
    { ch: 't', color: '#34a853' },
    { ch: 'i', color: '#ea4335' },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-[#202124] flex flex-col">
      {/* Google Search Header */}
      <header className="w-full bg-white pt-5 px-4 sm:px-8 border-b border-[#dadce0]">
        <div className="max-w-[1160px] mx-auto flex flex-wrap items-center justify-between gap-4 pb-3">
          <div className="flex flex-1 flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-7 min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              aria-label="Back to Home"
              className="text-[24px] font-bold tracking-[-0.04em] whitespace-nowrap shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
            >
              {logoLetters.map((item, i) => (
                <span key={i} style={{ color: item.color }}>
                  {item.ch}
                </span>
              ))}
            </button>

            <div className="w-full sm:w-auto flex-1 max-w-[476px] min-w-[220px]">
              <SearchBar
                compact
                maxWidthClass="max-w-[476px]"
                initialQuery={inlineQuery}
                onQueryChange={setInlineQuery}
                onNavigate={onNavigate}
                onOpenPopup={onOpenPopup}
              />
            </div>
          </div>

          <UtilityNav
            darkBackdrop={false}
            showGallery={false}
            onOpenContact={() => onOpenPopup('contact')}
            onToggleWaffle={onToggleWaffle}
            onToggleProfile={onToggleProfile}
          />
        </div>

        {/* Filter Tabs Row */}
        <div className="max-w-[1160px] mx-auto flex items-center gap-1 overflow-x-auto hide-scrollbar sm:pl-[98px]">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#4285f4] border-[#4285f4]'
                    : 'text-[#5f6368] border-transparent hover:text-[#202124]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main 2-Column Google SERP + Knowledge Panel Body */}
      <main className="w-full max-w-[1160px] mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Left Column (SERP Results aligned with search bar) */}
        <div className="w-full lg:flex-1 lg:max-w-[680px] sm:pl-[98px] space-y-6">
          {/* Compact Portfolio Overview Card */}
          <section className="bg-white border border-[#dadce0] rounded-[12px] px-5 py-4">
            <div className="flex items-center gap-2 pb-2">
              <Sparkles className="w-4 h-4 text-[#4285f4]" aria-hidden="true" />
              <h2 className="text-[14px] font-semibold text-[#202124]">Portfolio Overview</h2>
            </div>

            <p className="text-[13px] leading-[1.6] text-[#3c4043]">
              <strong className="font-semibold text-[#202124]">{PROFILE.name}</strong> is an AI
              Product Engineer based in India with{' '}
              <strong className="font-semibold text-[#202124]">1.5+ years</strong> across
              technical operations, UI/UX design, and end-to-end AI product building. Completed{' '}
              <strong className="font-semibold text-[#202124]">
                BITSoM’s Generative &amp; Agentic AI PM
              </strong>{' '}
              program — open to AI Product Manager &amp; AI Product Engineer roles.
            </p>

            <div className="pt-3 mt-3 border-t border-[#dadce0]/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PROFILE.overviewStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[17px] font-bold text-[#202124] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#5f6368]">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Search-Result Project Cards (Clean Google SERP style matching reference) */}
          <div className="space-y-7">
            {visibleProjects.map((project) => (
              <article key={project.slug} className="group">
                {/* Favicon + Breadcrumb + Green URL */}
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-7 h-7 rounded-[6px] border border-[#dadce0] bg-[#f8f9fa] flex items-center justify-center overflow-hidden shrink-0">
                    <ProjectShortcutIcon slug={project.slug} size={22} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[12px] text-[#202124] truncate">
                      {project.urlBreadcrumb}
                    </div>
                    <div className="text-[11px] text-[#006621] truncate">{project.displayUrl}</div>
                  </div>
                </div>

                {/* Blue Clickable Title */}
                <button
                  type="button"
                  onClick={() => onNavigate(`/work/${project.slug}`)}
                  className="text-left text-[19px] font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug"
                >
                  {project.title}
                </button>

                {/* Description */}
                <p className="text-[13.5px] leading-[1.58] text-[#4d5156] mt-1">
                  {project.summary}
                </p>

                {/* Clean Reference-Style Tag Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] text-[11px] font-medium">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] text-[11px] font-medium">
                    {project.stack[0]}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f1f3f4] text-[#5f6368] text-[11px] font-medium tabular-nums">
                    {project.year}
                  </span>
                </div>
              </article>
            ))}

            {visibleProjects.length === 0 && (
              <div className="py-10 text-center border border-[#dadce0] rounded-[12px] bg-[#f8f9fa]">
                <p className="text-[14px] text-[#5f6368]">
                  No projects match your current filter or search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('All');
                    setInlineQuery('');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-[8px] bg-[#4285f4] text-white text-[13px] font-medium cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: 340px Google Knowledge Panel (matching reference) */}
        <aside className="w-full lg:w-[340px] shrink-0 bg-white border border-[#dadce0] rounded-[12px] overflow-hidden pb-5">
          {/* 100px Smooth Blue-to-White Gradient Banner */}
          <div
            className="h-[100px] w-full"
            style={{
              background:
                'linear-gradient(180deg, #4285f4 0%, #8ab4f8 48%, #e8f0fe 82%, #ffffff 100%)',
            }}
          />

          <div className="px-5">
            <div className="pt-1 pb-3">
              <h2 className="text-[18px] font-bold text-[#202124] leading-tight">
                {PROFILE.name}
              </h2>
              <p className="text-[12px] text-[#5f6368] mt-0.5">{PROFILE.subHeadline}</p>
            </div>

            <div className="w-full h-[1px] bg-[#dadce0]" />

            {/* Key-Value Rows */}
            <dl className="py-3.5 space-y-2 text-[12px]">
              <div className="flex items-center gap-2">
                <dt className="w-[68px] shrink-0 text-[#5f6368]">Based</dt>
                <dd className="text-[#202124] font-medium">{PROFILE.location}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="w-[68px] shrink-0 text-[#5f6368]">Status</dt>
                <dd className="inline-flex items-center gap-1.5 text-[#34a853] font-medium">
                  <span className="text-[10px]" aria-hidden="true">
                    ●
                  </span>
                  <span>{PROFILE.availability}</span>
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="w-[68px] shrink-0 text-[#5f6368]">Tools</dt>
                <dd className="text-[#202124]">{PROFILE.toolsShort}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="w-[68px] shrink-0 text-[#5f6368]">Email</dt>
                <dd className="min-w-0 truncate">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-[#3c4043] hover:text-[#1a0dab] hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </dd>
              </div>
            </dl>

            {/* Pill CTA Row matching reference */}
            <div className="pb-4 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onOpenPopup('contact')}
                className="flex-[2] py-2.5 px-5 rounded-full bg-[#4285f4] hover:bg-[#1a73e8] text-white text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Hire me
              </button>
              <button
                type="button"
                onClick={() => onOpenPopup('resume')}
                className="flex-1 py-2.5 px-4 rounded-full border border-[#dadce0] hover:bg-[#f8f9fa] text-[#1a73e8] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Resume
              </button>
            </div>

            <div className="w-full h-[1px] bg-[#dadce0]" />

            {/* More from Deepti */}
            <div className="pt-3.5">
              <div className="text-[12px] text-[#5f6368] pb-2">More from Deepti</div>
              <div className="flex flex-col items-start space-y-2 text-[13px]">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-[#1a0dab] hover:underline cursor-pointer text-left"
                >
                  Portfolio Home
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPopup('about')}
                  className="text-[#1a0dab] hover:underline cursor-pointer text-left"
                >
                  About &amp; Skills
                </button>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1a0dab] hover:underline"
                >
                  GitHub repos
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1a0dab] hover:underline"
                >
                  LinkedIn profile
                </a>
                <button
                  type="button"
                  onClick={() => onOpenPopup('gallery')}
                  className="text-[#1a0dab] hover:underline cursor-pointer text-left"
                >
                  Visual Gallery
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

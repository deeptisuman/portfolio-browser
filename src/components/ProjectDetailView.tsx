import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Maximize2,
  X,
} from 'lucide-react';
import {
  HEALTHSYNC_ARTBOARDS,
  HEALTHSYNC_LOGO_SRC,
  HealthSyncArtboard,
  PROJECTS,
  TRIPEZZA_SCREENS,
  TripezzaScreen,
  TripezzaScreenGroup,
} from '../data/portfolioData';
import { ChromeBookmarkBar } from './ChromeTopBar';
import { ProjectVisualCard } from './ProjectVisuals';

interface ProjectDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
}

type ScreenFilter = 'All' | TripezzaScreenGroup;

const SCREEN_FILTERS: ScreenFilter[] = [
  'All',
  'Core Agents',
  'Trip & Planning',
  'Onboarding & Auth',
];

function TripezzaScreensShowcase() {
  const [activeFilter, setActiveFilter] = useState<ScreenFilter>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleScreens: TripezzaScreen[] =
    activeFilter === 'All'
      ? TRIPEZZA_SCREENS
      : TRIPEZZA_SCREENS.filter((s) => s.group === activeFilter);

  const activeScreen =
    selectedIndex !== null && visibleScreens[selectedIndex]
      ? visibleScreens[selectedIndex]
      : null;

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeFilter]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleScreens.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleScreens.length) % visibleScreens.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, visibleScreens.length]);

  const countFor = (filter: ScreenFilter) =>
    filter === 'All'
      ? TRIPEZZA_SCREENS.length
      : TRIPEZZA_SCREENS.filter((s) => s.group === filter).length;

  return (
    <section className="space-y-6">
      {/* Architecture Header Card */}
      <div className="w-full h-[210px] sm:h-[230px] rounded-[15px] overflow-hidden border border-[#dadce0]">
        <ProjectVisualCard slug="tripezza" variant={0} />
      </div>

      {/* Screen Gallery Header + Filter Tabs */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-[17px] font-semibold text-[#202124]">
            Mobile Design System — 19 Shipped Screens
          </h2>
          <p className="text-[13px] text-[#5f6368]">
            Interactive screens across onboarding, multi-agent planning, live compliance, and post-trip journaling. Click any screen to inspect full length.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {SCREEN_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#202124] text-white'
                    : 'bg-[#f1f3f4] text-[#5f6368] hover:bg-[#e8eaed] hover:text-[#202124]'
                }`}
              >
                {filter} ({countFor(filter)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Mobile-Frame Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {visibleScreens.map((screen, idx) => (
          <button
            key={screen.id}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="group flex flex-col text-left rounded-[16px] border border-[#dadce0] bg-white hover:border-[#4285f4]/60 hover:shadow-[0_6px_20px_rgba(32,33,36,0.08)] transition-all overflow-hidden cursor-pointer"
          >
            <div className="relative w-full aspect-[9/16] bg-[#0b1220] overflow-hidden border-b border-[#dadce0]/70">
              <img
                src={screen.src}
                alt={`${screen.title} — ${screen.agentOrStage}`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white">
                  <Maximize2 className="w-3 h-3" />
                  Inspect
                </span>
              </div>
            </div>
            <div className="p-3 space-y-0.5">
              <div className="text-[12.5px] font-semibold text-[#202124] truncate group-hover:text-[#1a0dab] transition-colors">
                {screen.title}
              </div>
              <div className="text-[11px] font-mono text-[#5f6368] truncate">
                {screen.agentOrStage}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeScreen && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeScreen.title}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[880px] bg-[#111827] text-white rounded-[20px] border border-white/15 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close screen preview"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Scrollable Full-Width Mobile Screen Viewport */}
            <div className="relative bg-[#070b14] flex items-center justify-center p-4 sm:p-6 md:w-[440px] shrink-0 border-b md:border-b-0 md:border-r border-white/10">
              <div className="w-full max-w-[330px] max-h-[72vh] overflow-y-auto hide-scrollbar rounded-[18px] border border-white/15 bg-[#0b1220] shadow-xl">
                <img
                  src={activeScreen.src}
                  alt={activeScreen.title}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Right: Metadata, Context & Prev/Next Controls */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4 pr-8">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#67e8f9]">
                  <span>{activeScreen.group}</span>
                  <span>·</span>
                  <span>
                    {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                    {String(visibleScreens.length).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold tracking-[-0.01em] text-white">
                    {activeScreen.title}
                  </h3>
                  <div className="text-[13px] font-mono text-white/65 mt-1">
                    {activeScreen.agentOrStage}
                  </div>
                </div>

                <p className="text-[14px] leading-[1.65] text-white/80">
                  {activeScreen.caption}
                </p>

                <p className="text-[12px] text-white/50">
                  Scroll inside the phone frame on the left to inspect long-form mobile flows, or use arrow keys to step through screens.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + visibleScreens.length) %
                        visibleScreens.length
                    )
                  }
                  className="flex-1 py-2.5 px-4 rounded-[10px] border border-white/15 bg-white/5 hover:bg-white/10 text-[13px] font-medium text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % visibleScreens.length)
                  }
                  className="flex-1 py-2.5 px-4 rounded-[10px] border border-white/15 bg-white/5 hover:bg-white/10 text-[13px] font-medium text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function HealthSyncScreensShowcase() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const activeBoard: HealthSyncArtboard | null =
    selectedIndex !== null && HEALTHSYNC_ARTBOARDS[selectedIndex]
      ? HEALTHSYNC_ARTBOARDS[selectedIndex]
      : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % HEALTHSYNC_ARTBOARDS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + HEALTHSYNC_ARTBOARDS.length) %
              HEALTHSYNC_ARTBOARDS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  return (
    <section className="space-y-6">
      {/* Brand Identity + UX Research Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 rounded-[16px] bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] p-6 flex flex-col items-center justify-center text-center text-white border border-[#1565C0]/30 shadow-xs min-h-[190px]">
          <img
            src={HEALTHSYNC_LOGO_SRC}
            alt="HealthSync Brand Identity Logo"
            className="h-[108px] w-auto object-contain drop-shadow-sm"
          />
          <p className="mt-3 text-[12px] text-white/85 max-w-[260px] leading-relaxed">
            Warm human-heart emblem designed for instant trust and clarity across elderly and rural patients.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-[190px] rounded-[16px] overflow-hidden border border-[#dadce0]">
            <ProjectVisualCard slug="healthsync" variant={1} />
          </div>
          <div className="h-[190px] rounded-[16px] overflow-hidden border border-[#dadce0]">
            <ProjectVisualCard slug="healthsync" variant={2} />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="pt-2 space-y-1">
        <h2 className="text-[17px] font-semibold text-[#202124]">
          High-Fidelity iPhone 15 Pro UI Flows (17 Screens)
        </h2>
        <p className="text-[13px] text-[#5f6368]">
          End-to-end visual flows covering onboarding, 4-step medical profile intake, vitals dashboard, telehealth consultations, and medication tracking. Click any flow to inspect full screen detail.
        </p>
      </div>

      {/* Artboard Flow Cards */}
      <div className="space-y-5">
        {HEALTHSYNC_ARTBOARDS.map((board, idx) => (
          <button
            key={board.id}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="group w-full flex flex-col text-left rounded-[16px] border border-[#dadce0] bg-white hover:border-[#4285f4]/60 hover:shadow-[0_8px_24px_rgba(32,33,36,0.08)] transition-all overflow-hidden cursor-pointer"
          >
            <div
              className={`relative w-full ${board.aspectClass} bg-[#444444] overflow-hidden border-b border-[#dadce0]/80`}
            >
              <img
                src={board.src}
                alt={board.title}
                loading="lazy"
                className={`w-full h-full ${
                  board.cropTop
                    ? 'object-cover object-top'
                    : 'object-cover object-center'
                } transition-transform duration-300 group-hover:scale-[1.015]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-[12px] font-medium">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Inspect Full Screens
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="text-[14.5px] font-semibold text-[#202124] group-hover:text-[#1a0dab] transition-colors">
                  {board.title}
                </div>
                <p className="text-[12.5px] text-[#5f6368] leading-relaxed">
                  {board.caption}
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#1976D2] shrink-0 sm:pl-4">
                {board.stage}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeBoard && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeBoard.title}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/82 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1040px] bg-[#141923] text-white rounded-[20px] border border-white/15 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#60a5fa]">
                  HealthSync iOS UI ·{' '}
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(HEALTHSYNC_ARTBOARDS.length).padStart(2, '0')}
                </div>
                <h3 className="text-[16px] sm:text-[18px] font-bold text-white truncate">
                  {activeBoard.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close HealthSync preview"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Viewport */}
            <div className="bg-[#383838] p-4 sm:p-6 flex items-center justify-center max-h-[68vh] overflow-y-auto">
              <div
                className={`w-full ${
                  activeBoard.cropTop
                    ? `${activeBoard.aspectClass} overflow-hidden rounded-[12px]`
                    : 'rounded-[12px] overflow-hidden'
                }`}
              >
                <img
                  src={activeBoard.src}
                  alt={activeBoard.title}
                  className={
                    activeBoard.cropTop
                      ? 'w-full h-full object-cover object-top'
                      : 'w-full h-auto max-h-[60vh] object-contain mx-auto'
                  }
                />
              </div>
            </div>

            {/* Footer Caption & Controls */}
            <div className="px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5 max-w-[660px]">
                <div className="text-[11.5px] font-mono text-white/60">
                  {activeBoard.stage}
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed">
                  {activeBoard.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + HEALTHSYNC_ARTBOARDS.length) %
                        HEALTHSYNC_ARTBOARDS.length
                    )
                  }
                  className="py-2 px-3.5 rounded-[10px] border border-white/15 bg-white/5 hover:bg-white/10 text-[12.5px] font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex + 1) % HEALTHSYNC_ARTBOARDS.length
                    )
                  }
                  className="py-2 px-3.5 rounded-[10px] border border-white/15 bg-white/5 hover:bg-white/10 text-[12.5px] font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function ProjectDetailView({
  slug,
  onNavigate,
  onOpenPopup,
}: ProjectDetailViewProps) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? PROJECTS[index] : PROJECTS[0];
  const prevProject = index > 0 ? PROJECTS[index - 1] : null;
  const nextProject =
    index >= 0 && index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  return (
    <div className="min-h-screen w-full bg-white text-[#202124] flex flex-col">
      <ChromeBookmarkBar
        currentPath={`/work/${project.slug}`}
        onNavigate={onNavigate}
        onOpenPopup={(p) => onOpenPopup(p)}
      />

      <main className="w-full max-w-[920px] mx-auto px-6 sm:px-8 py-8 sm:py-16 space-y-14 sm:space-y-16">
        {/* Back button + Title + Overview & Metadata Split */}
        <header className="space-y-4">
          <button
            type="button"
            onClick={() => onNavigate('/work')}
            aria-label="Back to Work"
            className="w-8 h-8 rounded-full border border-[#dadce0] hover:bg-[#f8f9fa] flex items-center justify-center text-[#202124] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="space-y-2">
            <h1 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] text-[#202124]">
              {project.title}
            </h1>
            <div className="text-[12px] font-mono text-[#5f6368]">
              {project.urlBreadcrumb}
            </div>
          </div>

          {/* Overview + 4-Row Metadata Split */}
          <div className="pt-4 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">
            {/* Left: Overview */}
            <div className="w-full md:max-w-[360px] space-y-2">
              <div className="text-[13px] font-semibold text-[#202124]">
                Overview :
              </div>
              <p className="text-[14px] leading-[1.65] text-[#3c4043]">
                {project.overview}
              </p>
            </div>

            {/* Right: 4 Key-Value Metadata Rows with 1px #dadce0 dividers */}
            <div className="w-full md:max-w-[420px] flex-1">
              {[
                { label: 'Context', value: project.clientOrContext },
                { label: 'Deliverable', value: project.deliverable },
                { label: 'Focus', value: project.timelineOrScope },
                { label: 'Year', value: project.year },
              ].map((row, idx) => (
                <div key={row.label}>
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="min-w-[100px] text-[13px] font-medium text-[#5f6368]">
                      {row.label}
                    </span>
                    <span className="text-[13px] font-medium text-[#202124] text-right">
                      {row.value}
                    </span>
                  </div>
                  {idx < 3 && <div className="w-full h-[1px] bg-[#dadce0]" />}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Key Highlights & Artifacts */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2 border-t border-[#dadce0]">
          <div className="md:col-span-7 space-y-3 pt-6">
            <h2 className="text-[15px] font-semibold text-[#202124]">
              Product Architecture &amp; Highlights
            </h2>
            <ul className="space-y-2.5">
              {project.highlights.map((hl) => (
                <li
                  key={hl}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-[#3c4043]"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-1"
                    style={{ color: project.accentColor }}
                  />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 space-y-4 pt-6">
            <div>
              <h2 className="text-[15px] font-semibold text-[#202124] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#4285f4]" />
                <span>Shipped Artifacts</span>
              </h2>
              <ul className="mt-2.5 space-y-1.5 text-[13px] text-[#3c4043]">
                {project.artifacts.map((art) => (
                  <li
                    key={art}
                    className="py-1 border-b border-[#dadce0]/60 last:border-b-0"
                  >
                    {art}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[12px] font-semibold text-[#5f6368] mb-1.5">
                Stack &amp; Tools
              </h3>
              <p className="text-[12.5px] font-mono text-[#3c4043] leading-relaxed">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>
        </section>

        {/* Visual Showcase: Real UI Galleries for Tripezza & HealthSync, Bento Visual Cards for other projects */}
        {project.slug === 'tripezza' ? (
          <TripezzaScreensShowcase />
        ) : project.slug === 'healthsync' ? (
          <HealthSyncScreensShowcase />
        ) : (
          <section className="space-y-4">
            <div className="w-full h-[240px] sm:h-[300px] rounded-[15px] overflow-hidden border border-[#dadce0]">
              <ProjectVisualCard slug={project.slug} variant={0} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-[200px] rounded-[15px] overflow-hidden border border-[#dadce0]">
                <ProjectVisualCard slug={project.slug} variant={1} />
              </div>
              <div className="h-[200px] rounded-[15px] overflow-hidden border border-[#dadce0]">
                <ProjectVisualCard slug={project.slug} variant={2} />
              </div>
            </div>

            <div className="w-full h-[210px] rounded-[16px] overflow-hidden border border-[#dadce0]">
              <ProjectVisualCard slug={project.slug} variant={3} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-[180px] rounded-[16px] overflow-hidden border border-[#dadce0]">
                <ProjectVisualCard slug={project.slug} variant={4} />
              </div>
              <div className="h-[180px] rounded-[16px] overflow-hidden border border-[#dadce0]">
                <ProjectVisualCard slug={project.slug} variant={5} />
              </div>
            </div>
          </section>
        )}

        {/* Previous / Next Project Pagination Row */}
        <nav
          aria-label="Project navigation"
          className="pt-4 border-t border-[#dadce0] flex items-center gap-2"
        >
          {prevProject ? (
            <button
              type="button"
              onClick={() => onNavigate(`/work/${prevProject.slug}`)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[10px] border border-[#dadce0] hover:bg-[#f8f9fa] text-[13px] font-medium text-[#202124] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#5f6368]" />
              <span>Previous Project</span>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <button
              type="button"
              onClick={() => onNavigate(`/work/${nextProject.slug}`)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[10px] border border-[#dadce0] hover:bg-[#f8f9fa] text-[13px] font-medium text-[#202124] transition-colors cursor-pointer"
            >
              <span>Next Project</span>
              <ArrowRight className="w-4 h-4 text-[#5f6368]" />
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </main>
    </div>
  );
}

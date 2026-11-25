/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { HomeView } from './components/HomeView';
import {
  AboutPopup,
  ContactModal,
  GalleryPopup,
  ProfilePopup,
  ResumeModal,
  WafflePopup,
} from './components/Popups';
import { ProjectDetailView } from './components/ProjectDetailView';
import { TaraWidget } from './components/TaraWidget';
import { WorkView } from './components/WorkView';

type ActiveModal = 'about' | 'contact' | 'gallery' | 'resume' | null;
type ActiveDropdown = 'waffle' | 'profile' | null;

export default function App() {
  const [path, setPath] = useState<string>(() => {
    const p = window.location.pathname;
    if (p === '/work' || p.startsWith('/work/')) return p;
    return '/';
  });
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  useEffect(() => {
    function handlePopState() {
      const p = window.location.pathname;
      if (p === '/work' || p.startsWith('/work/')) {
        setPath(p);
      } else {
        setPath('/');
      }
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setActiveDropdown(null);
      }
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  function navigate(nextPath: string) {
    setActiveDropdown(null);
    setActiveModal(null);
    if (nextPath !== path) {
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }

  function openPopup(popup: 'about' | 'resume' | 'gallery' | 'contact') {
    setActiveDropdown(null);
    setActiveModal(popup);
  }

  const isProjectDetail = path.startsWith('/work/') && path.length > '/work/'.length;
  const projectSlug = isProjectDetail ? path.replace('/work/', '') : '';

  return (
    <div className="min-h-screen w-full relative">
      {/* Main Route Content */}
      {path === '/' && (
        <HomeView
          onNavigate={navigate}
          onOpenPopup={openPopup}
          onToggleWaffle={() => setActiveDropdown((d) => (d === 'waffle' ? null : 'waffle'))}
          onToggleProfile={() => setActiveDropdown((d) => (d === 'profile' ? null : 'profile'))}
        />
      )}

      {path === '/work' && (
        <WorkView
          onNavigate={navigate}
          onOpenPopup={openPopup}
          onToggleWaffle={() => setActiveDropdown((d) => (d === 'waffle' ? null : 'waffle'))}
          onToggleProfile={() => setActiveDropdown((d) => (d === 'profile' ? null : 'profile'))}
        />
      )}

      {isProjectDetail && (
        <ProjectDetailView
          slug={projectSlug}
          onNavigate={navigate}
          onOpenPopup={openPopup}
        />
      )}

      {/* Top-Right Anchored Dropdowns (Waffle & Profile) */}
      <AnimatePresence>
        {activeDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveDropdown(null)}
              aria-hidden="true"
            />
            {activeDropdown === 'waffle' && (
              <WafflePopup
                onClose={() => setActiveDropdown(null)}
                onNavigate={navigate}
                onOpenPopup={openPopup}
              />
            )}
            {activeDropdown === 'profile' && (
              <ProfilePopup
                onClose={() => setActiveDropdown(null)}
                onOpenResume={() => openPopup('resume')}
                onOpenContact={() => openPopup('contact')}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Centered Modals (About, Contact, Gallery, Resume) */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModal(null);
            }}
          >
            {activeModal === 'about' && (
              <AboutPopup
                onClose={() => setActiveModal(null)}
                onOpenResume={() => setActiveModal('resume')}
                onOpenContact={() => setActiveModal('contact')}
              />
            )}
            {activeModal === 'contact' && (
              <ContactModal onClose={() => setActiveModal(null)} />
            )}
            {activeModal === 'gallery' && (
              <GalleryPopup
                onClose={() => setActiveModal(null)}
                onOpenProject={(slug) => navigate(`/work/${slug}`)}
              />
            )}
            {activeModal === 'resume' && (
              <ResumeModal onClose={() => setActiveModal(null)} />
            )}
          </div>
        )}
      </AnimatePresence>
      {/* Floating Interactive AI Mascot Guide: Tara */}
      <TaraWidget
        currentPath={path}
        onNavigate={navigate}
        onOpenPopup={openPopup}
      />
    </div>
  );
}

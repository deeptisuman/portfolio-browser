import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  BellOff,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  RotateCcw,
  SendHorizontal,
  Sparkles,
  Square,
  Sun,
  X,
} from 'lucide-react';
import { TaraAction, TaraMessage, useTaraChat } from '../hooks/useTaraChat';

const TARA_IDLE_IMG = '/assets/tara-idle.png';
const TARA_HAPPY_IMG = '/assets/tara-happy.png';

const QUICK_STAR_CHIPS = [
  'Summarize your experience',
  'Show your best projects',
  'Which project should I explore first?',
  'What is your tech stack?',
  'What does Deepti enjoy doing outside of work?',
  'How can I contact you?',
];

const MUTE_STORAGE_KEY = 'tara_nudges_muted_v1';
const THEME_STORAGE_KEY = 'tara_chat_theme_v1';

interface TaraWidgetProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPopup: (popup: 'about' | 'resume' | 'gallery' | 'contact') => void;
}

interface ContextualNudge {
  id: string;
  text: string;
  prompt?: string;
}

function getContextualNudge(path: string, hasScrolled: boolean): ContextualNudge {
  if (path === '/work/tripezza') {
    return {
      id: 'nudge-tripezza',
      text: "Want a quick TL;DR of Tripezza's 9-agent tech stack?",
      prompt: "Give me a quick TL;DR of Tripezza's 9-agent architecture and tech stack.",
    };
  }
  if (path === '/work/uplyfox') {
    return {
      id: 'nudge-uplyfox',
      text: 'Curious how UplyFox handles Shadow DOM & AI safety?',
      prompt: 'How does UplyFox handle Shadow DOM job detection and AI safety guardrails?',
    };
  }
  if (path === '/work/healthsync') {
    return {
      id: 'nudge-healthsync',
      text: 'Want the UX research & persona highlights for HealthSync?',
      prompt: 'Summarize the UX research, personas, and key screens for HealthSync.',
    };
  }
  if (path === '/work/stipens') {
    return {
      id: 'nudge-stipens',
      text: "Want a quick TL;DR of Stipens' Account Aggregator flow?",
      prompt: "Explain how Stipens uses India's Account Aggregator framework.",
    };
  }
  if (path.startsWith('/work/')) {
    return {
      id: `nudge-${path}`,
      text: "Want a quick TL;DR of this project's tech stack?",
      prompt: 'Give me a quick TL;DR of this project and its tech stack.',
    };
  }
  if (path === '/work' && hasScrolled) {
    return {
      id: 'nudge-work-scroll',
      text: "Want a quick TL;DR of Deepti's strongest AI projects?",
      prompt: "Which of Deepti's projects best highlight her AI Product Engineering and PM skills?",
    };
  }
  return {
    id: 'nudge-greeting',
    text: "Namaste! I'm Tara ✨ Ask me anything about my work.",
  };
}

/** Renders crisp inline bold (**...**), italic (*...*), inline code (`...`), and URLs/emails */
function renderInlineTokens(text: string, darkMode: boolean): React.ReactNode[] {
  const tokenRegex =
    /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|https?:\/\/[^\s)]+|suman766deepti@gmail\.com)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={idx}
          className={darkMode ? 'font-semibold text-[#fef3c7]' : 'font-semibold text-[#1f2937]'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em
          key={idx}
          className={darkMode ? 'italic text-[#e5e0d0]' : 'italic text-[#4b5563]'}
        >
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className={
            darkMode
              ? 'px-1.5 py-0.5 rounded bg-white/10 text-[#fde68a] text-[11.5px] font-mono'
              : 'px-1.5 py-0.5 rounded bg-[#fef3c7]/80 text-[#78350f] text-[11.5px] font-mono'
          }
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part === 'suman766deepti@gmail.com') {
      return (
        <a
          key={idx}
          href={`mailto:${part}`}
          className={
            darkMode
              ? 'text-[#fde68a] underline underline-offset-2 hover:text-white'
              : 'text-[#b45309] underline underline-offset-2 hover:text-[#78350f]'
          }
        >
          {part}
        </a>
      );
    }
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noreferrer"
          className={
            darkMode
              ? 'text-[#93c5fd] underline underline-offset-2 hover:text-white break-all'
              : 'text-[#1a73e8] underline underline-offset-2 hover:text-[#1558b0] break-all'
          }
        >
          {part.replace(/^https?:\/\//, '')}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function TaraFormattedContent({
  content,
  darkMode,
}: {
  content: string;
  darkMode: boolean;
}) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = (keyPrefix: string) => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={keyPrefix} className="space-y-1.5 pl-4 list-disc marker:text-[#f59e0b]">
        {bulletBuffer.map((item, idx) => (
          <li key={idx} className="leading-[1.55]">
            {renderInlineTokens(item, darkMode)}
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const trimmed = rawLine.trim();
    if (/^[-*•]\s+/.test(trimmed)) {
      bulletBuffer.push(trimmed.replace(/^[-*•]\s+/, ''));
    } else if (trimmed === '') {
      flushBullets(`ul-${idx}`);
    } else {
      flushBullets(`ul-${idx}`);
      blocks.push(
        <p key={`p-${idx}`} className="leading-[1.58]">
          {renderInlineTokens(trimmed, darkMode)}
        </p>
      );
    }
  });
  flushBullets('ul-end');

  return <div className="space-y-2 text-[13px]">{blocks}</div>;
}

/** Animated golden star sparkles radiating around Tara */
function StarSparkles({ active, thinking }: { active: boolean; thinking: boolean }) {
  const sparkleCoords = [
    { x: -34, y: -24, size: 11, delay: 0 },
    { x: 34, y: -28, size: 13, delay: 0.12 },
    { x: 38, y: 12, size: 9, delay: 0.24 },
    { x: -36, y: 16, size: 10, delay: 0.18 },
  ];

  return (
    <AnimatePresence>
      {(active || thinking) &&
        sparkleCoords.map((sp, i) => (
          <motion.svg
            key={i}
            width={sp.size}
            height={sp.size}
            viewBox="0 0 24 24"
            fill="none"
            className="pointer-events-none absolute left-1/2 top-1/2 -ml-[6px] -mt-[6px] drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"
            initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
            animate={
              thinking
                ? {
                    opacity: [0.35, 1, 0.35],
                    scale: [0.75, 1.2, 0.75],
                    x: sp.x,
                    y: sp.y,
                    rotate: [0, 30, 0],
                  }
                : {
                    opacity: [0, 1, 0.85],
                    scale: [0.4, 1.15, 0.95],
                    x: sp.x,
                    y: sp.y,
                    rotate: [0, 20, -10],
                  }
            }
            exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
            transition={{
              duration: thinking ? 1.4 : 0.45,
              delay: sp.delay,
              repeat: thinking ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            <path
              d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
              fill="#FACC15"
              stroke="#FEF08A"
              strokeWidth="1.2"
            />
          </motion.svg>
        ))}
    </AnimatePresence>
  );
}

export function TaraWidget({ currentPath, onNavigate, onOpenPopup }: TaraWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [dismissedNudges, setDismissedNudges] = useState<Record<string, boolean>>({});
  const [nudgesMuted, setNudgesMuted] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  // Subtle head/gaze cursor tracking offset when idle
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const mascotBtnRef = useRef<HTMLButtonElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { messages, isStreaming, sendMessage, clearChat, stopStreaming } =
    useTaraChat(currentPath);

  // Track subtle cursor position for Tara's curious idle head/eye tracking
  useEffect(() => {
    if (isOpen) return;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const el = mascotBtnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const factor = Math.min(1, dist / 260);
        const nx = (dx / dist) * factor;
        const ny = (dy / dist) * factor;
        setLookOffset({
          x: Number((nx * 3.5).toFixed(2)),
          y: Number((ny * 2.5).toFixed(2)),
          rotate: Number((nx * 6).toFixed(2)),
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [isOpen]);

  // Track scroll depth for contextual nudges
  useEffect(() => {
    setHasScrolled(false);
    const onScroll = () => {
      if (window.scrollY > 180) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPath]);

  // Auto-scroll messages when streaming or new message arrives
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen, isStreaming]);

  // Focus input when opening chat drawer
  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  // Close drawer on Escape if open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const muteAllNudges = () => {
    setNudgesMuted(true);
    try {
      window.localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors
    }
  };

  const activeNudge = useMemo(
    () => getContextualNudge(currentPath, hasScrolled),
    [currentPath, hasScrolled]
  );

  // Show greeting bubble on hover, or show contextual nudge when not muted/dismissed
  const showSpeechBubble =
    !isOpen &&
    (isHovered ||
      (!nudgesMuted &&
        !dismissedNudges[activeNudge.id] &&
        (activeNudge.id === 'nudge-greeting' ||
          currentPath.startsWith('/work/') ||
          hasScrolled)));

  const bubbleText = isHovered
    ? "Namaste! I'm Tara ✨ Ask me anything about my work."
    : activeNudge.text;

  const isHappyPose = isHovered || isOpen;

  const handleActionClick = (action: TaraAction) => {
    if (action.type === 'open_work') {
      onNavigate('/work');
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (action.type === 'open_project' && action.target) {
      onNavigate(`/work/${action.target}`);
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
    } else if (action.type === 'open_popup') {
      if (
        action.target === 'about' ||
        action.target === 'resume' ||
        action.target === 'gallery' ||
        action.target === 'contact'
      ) {
        onOpenPopup(action.target);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    const text = inputValue;
    setInputValue('');
    void sendMessage(text);
  };

  const handleNudgeClick = () => {
    setIsOpen(true);
    setDismissedNudges((prev) => ({ ...prev, [activeNudge.id]: true }));
    if (activeNudge.prompt && !isHovered) {
      void sendMessage(activeNudge.prompt);
    }
  };

  return (
    <div className="no-print fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      {/* ====================================================================
          CHAT DRAWER PANEL
          ==================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-label="Tara Portfolio Guide Chat"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className={`pointer-events-auto rounded-[24px] overflow-hidden flex flex-col border shadow-[0_18px_48px_rgba(32,33,36,0.22)] backdrop-blur-xl transition-[width,height,background-color,border-color] duration-300 ease-out ${
              isExpanded
                ? 'w-[min(calc(100vw-40px),max(50vw,640px))] h-[min(calc(100dvh-124px),740px)]'
                : 'w-[min(calc(100vw-40px),408px)] h-[min(calc(100dvh-124px),560px)]'
            } ${
              darkMode
                ? 'bg-[#17161e]/95 border-[#3d3752] text-[#f5f3ea]'
                : 'bg-[#fffdf6]/95 border-[#f3dfa2] text-[#202124]'
            }`}
          >
            {/* Header */}
            <header
              className={`px-4 py-3.5 flex items-center justify-between gap-2 border-b shrink-0 ${
                darkMode
                  ? 'bg-gradient-to-r from-[#242033] via-[#1f1d2b] to-[#272235] border-[#353048]'
                  : 'bg-gradient-to-r from-[#fff8dc] via-[#fffbec] to-[#fef3c7] border-[#f3dfa2]/90'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <motion.div
                  animate={
                    isStreaming
                      ? { rotate: [-7, 7, -7], x: [-1.5, 1.5, -1.5] }
                      : { rotate: 0, x: 0 }
                  }
                  transition={
                    isStreaming
                      ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                  className="relative w-10 h-10 flex items-center justify-center shrink-0"
                >
                  <img
                    src={isStreaming ? TARA_IDLE_IMG : TARA_HAPPY_IMG}
                    alt="Tara mascot"
                    className="w-full h-full object-contain drop-shadow-[0_3px_6px_rgba(32,33,36,0.18)]"
                  />
                </motion.div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2
                      className={`text-[14px] font-bold tracking-[-0.01em] truncate ${
                        darkMode ? 'text-[#fef9c3]' : 'text-[#202124]'
                      }`}
                    >
                      Tara • Portfolio Guide
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11.5px]">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isStreaming
                          ? 'bg-[#f59e0b] animate-pulse'
                          : 'bg-[#22c55e]'
                      }`}
                    />
                    <span className={darkMode ? 'text-[#c4bfd6]' : 'text-[#6b5c3e]'}>
                      {isStreaming ? 'Tara is thinking...' : 'Online · Deepti’s AI guide'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsExpanded((v) => !v)}
                  aria-label={isExpanded ? 'Restore compact chat size' : 'Expand chat panel'}
                  title={isExpanded ? 'Compact size' : 'Expand chat'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#c4bfd6] hover:bg-white/10 hover:text-white'
                      : 'text-[#78591c] hover:bg-[#fde68a]/40'
                  }`}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                  title={darkMode ? 'Warm light mode' : 'Starry dark mode'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#fde68a] hover:bg-white/10'
                      : 'text-[#78591c] hover:bg-[#fde68a]/40'
                  }`}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat history"
                  title="Clear chat"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#c4bfd6] hover:bg-white/10 hover:text-white'
                      : 'text-[#78591c] hover:bg-[#fde68a]/40'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize Tara chat"
                  title="Minimize"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#c4bfd6] hover:bg-white/10 hover:text-white'
                      : 'text-[#78591c] hover:bg-[#fde68a]/40'
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 hide-scrollbar">
              {messages.map((msg: TaraMessage) => {
                const isUser = msg.role === 'user';
                const isEmptyStreaming = !isUser && !msg.content && isStreaming;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[18px] px-3.5 py-2.5 shadow-xs ${
                        isUser
                          ? darkMode
                            ? 'bg-[#facc15] text-[#1c1917] rounded-br-[6px] font-medium'
                            : 'bg-[#202124] text-white rounded-br-[6px]'
                          : msg.isError
                          ? darkMode
                            ? 'bg-[#3b1d24] border border-[#f87171]/40 text-[#fecaca] rounded-bl-[6px]'
                            : 'bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] rounded-bl-[6px]'
                          : darkMode
                          ? 'bg-[#232030] border border-[#3a344f] text-[#ede9fe] rounded-bl-[6px]'
                          : 'bg-white border border-[#f3dfa2]/90 text-[#2c2a24] rounded-bl-[6px]'
                      }`}
                    >
                      {isEmptyStreaming ? (
                        <div className="flex items-center gap-2 py-0.5 text-[12.5px]">
                          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] animate-spin" />
                          <span className={darkMode ? 'text-[#fde68a]' : 'text-[#854d0e]'}>
                            Tara is thinking...
                          </span>
                        </div>
                      ) : isUser ? (
                        <p className="text-[13px] leading-[1.5] whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      ) : (
                        <TaraFormattedContent content={msg.content} darkMode={darkMode} />
                      )}
                    </div>

                    {/* Portfolio Action Triggers attached to Tara's response */}
                    {!isUser && msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                        {msg.actions.map((act) => (
                          <button
                            key={act.id}
                            type="button"
                            onClick={() => handleActionClick(act)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11.5px] font-semibold border transition-all cursor-pointer ${
                              darkMode
                                ? 'bg-[#2c2640] border-[#facc15]/40 text-[#fef08a] hover:bg-[#3a3154]'
                                : 'bg-[#fef9c3] border-[#f3dfa2] text-[#713f12] hover:bg-[#fde68a]'
                            }`}
                          >
                            <span>{act.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Streaming Status Pill */}
              {isStreaming && messages[messages.length - 1]?.content && (
                <div className="flex items-center gap-1.5 pl-1 text-[11px]">
                  <Sparkles className="w-3 h-3 text-[#f59e0b] animate-pulse" />
                  <span className={darkMode ? 'text-[#c4bfd6]' : 'text-[#8c7344]'}>
                    Tara is writing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick-Reply Star Chips */}
            <div
              className={`px-3.5 pt-2 pb-2 border-t shrink-0 ${
                darkMode
                  ? 'border-[#332e46] bg-[#1a1824]/90'
                  : 'border-[#f3dfa2]/80 bg-[#fffaf0]/90'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10.5px] font-semibold uppercase tracking-wide ${
                    darkMode ? 'text-[#b5aec9]' : 'text-[#8c7344]'
                  }`}
                >
                  Suggested questions
                </span>
                <button
                  type="button"
                  onClick={() => setShowSuggestions((v) => !v)}
                  aria-label={showSuggestions ? 'Hide suggested questions' : 'Show suggested questions'}
                  className={`inline-flex items-center gap-0.5 text-[10.5px] font-medium cursor-pointer transition-colors ${
                    darkMode
                      ? 'text-[#c4bfd6] hover:text-[#fef08a]'
                      : 'text-[#8c7344] hover:text-[#5c481e]'
                  }`}
                >
                  <span>{showSuggestions ? 'Hide' : 'Show'}</span>
                  {showSuggestions ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronUp className="w-3 h-3" />
                  )}
                </button>
              </div>
              {showSuggestions && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {QUICK_STAR_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      disabled={isStreaming}
                      onClick={() => void sendMessage(chip)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] leading-[1.3] font-medium border transition-all cursor-pointer disabled:opacity-50 text-left ${
                        darkMode
                          ? 'bg-[#252136] border-[#423b59] text-[#fef3c7] hover:border-[#facc15]/60 hover:bg-[#302b45]'
                          : 'bg-white border-[#f3dfa2] text-[#5c481e] hover:bg-[#fef3c7] hover:border-[#eab308]/60'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#f59e0b] shrink-0" />
                      <span>{chip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className={`px-3.5 pb-3.5 pt-1.5 shrink-0 ${
                darkMode ? 'bg-[#1a1824]/90' : 'bg-[#fffaf0]/90'
              }`}
            >
              <div
                className={`flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5 border transition-colors ${
                  darkMode
                    ? 'bg-[#242033] border-[#423b59] focus-within:border-[#facc15]'
                    : 'bg-white border-[#e8d59e] focus-within:border-[#eab308]'
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Tara about Deepti's work..."
                  className={`flex-1 bg-transparent text-[13px] outline-none ${
                    darkMode
                      ? 'text-white placeholder:text-[#9c95b3]'
                      : 'text-[#202124] placeholder:text-[#8c7b58]'
                  }`}
                />

                {isStreaming ? (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    aria-label="Stop response"
                    className="w-8 h-8 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label="Send message"
                    className="w-8 h-8 rounded-full bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-45 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    <SendHorizontal className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ====================================================================
          DISMISSIBLE GREETING / CONTEXTUAL PROACTIVE NUDGE BUBBLE
          ==================================================================== */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            key={isHovered ? 'hover-bubble' : activeNudge.id}
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto relative max-w-[270px] rounded-[18px] rounded-br-[6px] pl-3.5 pr-2.5 py-2.5 border shadow-[0_8px_24px_rgba(32,33,36,0.14)] backdrop-blur-md flex items-start gap-2 ${
              darkMode
                ? 'bg-[#1f1d2b]/95 border-[#463e5e] text-[#fef9c3]'
                : 'bg-[#fffdf4]/95 border-[#f3dfa2] text-[#2c2516]'
            }`}
          >
            <button
              type="button"
              onClick={handleNudgeClick}
              className="text-left text-[12.5px] leading-[1.45] font-medium cursor-pointer flex-1 hover:underline decoration-[#f59e0b] underline-offset-2"
            >
              {bubbleText}
            </button>

            {!isHovered && (
              <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                <button
                  type="button"
                  onClick={muteAllNudges}
                  title="Mute Tara's proactive tips"
                  aria-label="Mute proactive tips"
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#a59ebf] hover:bg-white/10 hover:text-white'
                      : 'text-[#8c7344] hover:bg-[#fef3c7]'
                  }`}
                >
                  <BellOff className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDismissedNudges((prev) => ({ ...prev, [activeNudge.id]: true }))
                  }
                  title="Dismiss"
                  aria-label="Dismiss tip"
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    darkMode
                      ? 'text-[#a59ebf] hover:bg-white/10 hover:text-white'
                      : 'text-[#8c7344] hover:bg-[#fef3c7]'
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          FLOATING FREE-STANDING TARA MASCOT (NO CIRCLE FRAME)
          ==================================================================== */}
      <div className="pointer-events-auto relative flex flex-col items-center">
        <motion.div
          className="relative"
          animate={
            isStreaming
              ? { y: [0, -3, 0], rotate: [-6, 6, -6] }
              : isHappyPose
              ? { y: -6, rotate: 0 }
              : { y: [0, -7, 0], rotate: lookOffset.rotate }
          }
          transition={
            isStreaming
              ? { duration: 1.0, repeat: Infinity, ease: 'easeInOut' }
              : isHappyPose
              ? { type: 'spring', stiffness: 420, damping: 18 }
              : {
                  y: { duration: 3.0, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { type: 'spring', stiffness: 180, damping: 20 },
                }
          }
        >
          {/* Orbiting / Radiating Golden Star Sparkles */}
          <StarSparkles active={isHappyPose} thinking={isStreaming} />

          <motion.button
            ref={mascotBtnRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? 'Close Tara Portfolio Guide' : 'Chat with Tara, Portfolio Guide'}
            aria-expanded={isOpen}
            className="relative w-[76px] h-[76px] bg-transparent border-0 p-0 cursor-pointer focus:outline-none focus-visible:drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]"
          >
            {/* Idle / Resting Standing Pose with subtle cursor parallax */}
            <motion.img
              src={TARA_IDLE_IMG}
              alt="Tara resting pose"
              draggable={false}
              animate={{
                opacity: isHappyPose ? 0 : 1,
                scale: isHappyPose ? 0.92 : 1,
                x: isHappyPose ? 0 : lookOffset.x,
                y: isHappyPose ? 0 : lookOffset.y,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_8px_14px_rgba(32,33,36,0.22)]"
            />

            {/* Active / Happy Jumping Pose */}
            <motion.img
              src={TARA_HAPPY_IMG}
              alt="Tara happy pose"
              draggable={false}
              animate={{
                opacity: isHappyPose ? 1 : 0,
                scale: isHappyPose ? 1.08 : 0.9,
                y: isHappyPose ? -2 : 4,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_12px_18px_rgba(234,179,8,0.38)]"
            />
          </motion.button>
        </motion.div>

        {/* Soft floating floor shadow synced with Tara's bobbing */}
        <motion.div
          aria-hidden="true"
          animate={
            isHappyPose
              ? { scaleX: 0.72, opacity: 0.22 }
              : { scaleX: [1, 0.78, 1], opacity: [0.3, 0.16, 0.3] }
          }
          transition={
            isHappyPose
              ? { duration: 0.25 }
              : { duration: 3.0, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-10 h-2 -mt-1 rounded-full bg-[#202124]/45 blur-[3px] pointer-events-none"
        />
      </div>
    </div>
  );
}

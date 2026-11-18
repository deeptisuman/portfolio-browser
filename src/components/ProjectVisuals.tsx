import React from 'react';

export function DeeptiAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full shrink-0"
      aria-label="Deepti Suman Avatar"
    >
      <defs>
        <linearGradient id="dsAvatarBg" x1="8" y1="6" x2="80" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="55%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="44" fill="url(#dsAvatarBg)" />
      <circle cx="44" cy="44" r="39" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
      <text
        x="44"
        y="53"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="-1"
      >
        DS
      </text>
      <circle cx="67" cy="22" r="4" fill="#FBBC05" />
    </svg>
  );
}

export function ProjectShortcutIcon({ slug, size = 32 }: { slug: string; size?: number }) {
  switch (slug) {
    case 'uplyfox':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#E8F0FE" />
          <path d="M9 19L16 8L23 19H18.5V24H13.5V19H9Z" fill="#4285F4" />
          <circle cx="23.5" cy="9.5" r="2.5" fill="#FBBC05" />
        </svg>
      );
    case 'tripezza':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#FCE8E6" />
          <circle cx="16" cy="10" r="3" fill="#EA4335" />
          <circle cx="10" cy="21" r="3" fill="#4285F4" />
          <circle cx="22" cy="21" r="3" fill="#34A853" />
          <path d="M16 13L11.5 18.5M16 13L20.5 18.5M13 21H19" stroke="#3C4043" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'stipens':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#E6F4EA" />
          <path d="M10 11H21M10 15H19M13.5 11C16 11 17.5 12.2 17.5 14C17.5 15.8 16 17 13.5 17H11.5L18.5 23" stroke="#34A853" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'healthsync':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#FEF3E2" />
          <path d="M16 23.5C16 23.5 8.5 18.7 8.5 13.2C8.5 10.6 10.6 8.5 13.1 8.5C14.6 8.5 15.5 9.3 16 10.2C16.5 9.3 17.4 8.5 18.9 8.5C21.4 8.5 23.5 10.6 23.5 13.2C23.5 18.7 16 23.5 16 23.5Z" fill="#EA4335" />
          <path d="M12.5 15H14.5L15.6 13L16.9 17L18 15H19.8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'ats-resume-tailor':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#F3E8FF" />
          <rect x="9" y="7" width="14" height="18" rx="2.5" stroke="#8B5CF6" strokeWidth="1.8" />
          <path d="M12 12H20M12 16H20M12 20H16" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#E8F0FE" />
          <circle cx="13" cy="13" r="4.5" fill="#4285F4" />
          <rect x="14.5" y="14.5" width="9" height="9" rx="2" fill="#FBBC05" fillOpacity="0.9" />
        </svg>
      );
  }
}

interface VisualFrameProps {
  slug: string;
  variant: number; // 0..5
  className?: string;
}

export function ProjectVisualCard({ slug, variant, className = '' }: VisualFrameProps) {
  if (slug === 'uplyfox') {
    const frames = [
      // 0: Hero Chrome Extension + Candidate Graph
      <div key="u0" className="w-full h-full bg-gradient-to-br from-[#F8FAFF] via-[#EEF4FF] to-[#E8F0FE] p-3.5 sm:p-4 flex flex-col justify-between text-[#202124]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-[#4285F4] font-medium truncate">UplyFox Chrome MV3</span>
          <span className="text-[11px] font-medium text-[#34A853] shrink-0">94% Match</span>
        </div>
        <div className="my-1.5 grid grid-cols-12 gap-2 items-stretch">
          <div className="col-span-7 bg-white rounded-xl border border-[#DADCE0] p-2.5 shadow-xs">
            <div className="text-[10px] font-semibold text-[#202124] mb-1 truncate">Target Job Portal (SPA)</div>
            <div className="space-y-1">
              <div className="h-6 rounded-md border border-[#4285F4]/40 bg-[#E8F0FE]/50 px-2 flex items-center text-[10px] text-[#3C4043] truncate">
                RAG draft verified
              </div>
              <div className="h-6 rounded-md border border-[#DADCE0] bg-[#F8F9FA] px-2 flex items-center text-[10px] text-[#5F6368] truncate">
                0 hallucinations
              </div>
            </div>
          </div>
          <div className="col-span-5 bg-white rounded-xl border border-[#DADCE0] p-2.5 shadow-xs flex flex-col justify-between">
            <div className="text-[10px] font-semibold text-[#4285F4] truncate">HITL Gate</div>
            <div className="space-y-0.5 text-[9.5px] text-[#3C4043]">
              <div className="truncate">✓ Snapshot</div>
              <div className="truncate">✓ Guardrails</div>
            </div>
            <div className="rounded-md bg-[#4285F4] text-white text-[9.5px] font-medium py-0.5 text-center">
              Approve
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368] gap-2">
          <span className="truncate">Gemini + Mistral</span>
          <span className="truncate">Supabase RLS</span>
        </div>
      </div>,
      // 1: Fact Extraction
      <div key="u1" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between border border-[#DADCE0]/60">
        <div className="text-[11px] font-semibold text-[#202124]">Deterministic Candidate Graph</div>
        <div className="grid grid-cols-3 gap-2 my-2">
          {['Resume PDF', 'GitHub Repos', 'Portfolio URL'].map((src) => (
            <div key={src} className="bg-white border border-[#DADCE0] rounded-lg p-2 text-[10px] font-medium text-[#3C4043] text-center">
              {src}
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#DADCE0] rounded-lg p-2.5 text-[10px] font-mono text-[#5F6368]">
          {'{ verified_skills: ["LangGraph", "RAG"], projects: 6, rls: true }'}
        </div>
      </div>,
      // 2: Security & Trust
      <div key="u2" className="w-full h-full bg-[#EFF6FF] p-4 flex flex-col justify-between">
        <div className="text-[11px] font-semibold text-[#1A73E8]">Safety &amp; Anti-Hallucination Controls</div>
        <div className="space-y-1.5 text-[11px] text-[#3C4043]">
          <div className="bg-white/90 rounded-lg px-2.5 py-1.5 border border-[#DADCE0]">1. Retrieval-grounded answers only</div>
          <div className="bg-white/90 rounded-lg px-2.5 py-1.5 border border-[#DADCE0]">2. Unseen field → pause for user review</div>
          <div className="bg-white/90 rounded-lg px-2.5 py-1.5 border border-[#DADCE0]">3. Full submission audit log</div>
        </div>
      </div>,
      // 3: Shadow DOM
      <div key="u3" className="w-full h-full bg-white p-5 flex flex-col justify-between border border-[#DADCE0]">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-[#202124]">Cross-ATS Field Detector</span>
          <span className="text-[10px] font-mono text-[#5F6368]">Shadow DOM · Iframes</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          {['Greenhouse', 'Lever', 'Workday', 'Custom SPA'].map((ats) => (
            <div key={ats} className="rounded-lg bg-[#F8F9FA] border border-[#DADCE0] py-3 px-2 font-medium text-[#3C4043]">
              {ats}
            </div>
          ))}
        </div>
        <div className="text-[11px] text-[#5F6368]">Explainable match score breakdown across requirements, tools, and domain alignment.</div>
      </div>,
      // 4 & 5
      <div key="u4" className="w-full h-full bg-gradient-to-tr from-[#E8F0FE] to-white p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">Application Tracker</span>
        <div className="space-y-1.5 text-[10px] font-mono text-[#3C4043]">
          <div className="flex justify-between bg-white px-2.5 py-1.5 rounded border border-[#DADCE0]"><span>AI PM · Fintech</span><span className="text-[#34A853]">Submitted</span></div>
          <div className="flex justify-between bg-white px-2.5 py-1.5 rounded border border-[#DADCE0]"><span>AI Engineer · Labs</span><span className="text-[#4285F4]">Reviewed</span></div>
        </div>
      </div>,
      <div key="u5" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">Explainable Job Match</span>
        <div className="flex items-end gap-2 h-16 pt-2">
          <div className="flex-1 bg-[#4285F4] rounded-t h-[90%]" />
          <div className="flex-1 bg-[#34A853] rounded-t h-[75%]" />
          <div className="flex-1 bg-[#FBBC05] rounded-t h-[82%]" />
          <div className="flex-1 bg-[#8B5CF6] rounded-t h-[68%]" />
        </div>
        <span className="text-[10px] text-[#5F6368]">Skill · Domain · Seniority · Stack</span>
      </div>,
    ];
    return <div className={`w-full h-full overflow-hidden ${className}`}>{frames[variant % frames.length]}</div>;
  }

  if (slug === 'tripezza') {
    const frames = [
      <div key="t0" className="w-full h-full bg-gradient-to-br from-[#FFF8F6] via-[#FFFDF9] to-[#FEF3E2] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#EA4335] font-medium">Tripezza · 9-Agent LangGraph Orchestrator</span>
          <span className="text-[11px] text-[#5F6368]">India Travel AI</span>
        </div>
        <div className="grid grid-cols-5 gap-2 my-3">
          {[
            { name: 'Supervisor', model: 'Claude' },
            { name: 'Scout', model: 'RAG Flights' },
            { name: 'Auditor', model: 'Pydantic/FX' },
            { name: 'Concierge', model: 'Pinecone' },
            { name: 'Executor', model: 'GPT-5' },
          ].map((a) => (
            <div key={a.name} className="bg-white rounded-xl border border-[#DADCE0] p-2.5 text-center shadow-xs">
              <div className="text-[10px] font-semibold text-[#202124]">{a.name}</div>
              <div className="text-[9px] font-mono text-[#EA4335] mt-1">{a.model}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6368]">
          <span>Multi-LLM Cost Routing + Failover</span>
          <span>42-Screen System · PRD · 6 Sprints</span>
        </div>
      </div>,
      <div key="t1" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between">
        <div className="text-[11px] font-semibold text-[#202124]">Provider-Agnostic LLM Router</div>
        <div className="space-y-1.5 text-[10px] font-mono">
          <div className="bg-white p-2 rounded border border-[#DADCE0] flex justify-between"><span>Complex Reasoning</span><span className="text-[#4285F4]">Claude</span></div>
          <div className="bg-white p-2 rounded border border-[#DADCE0] flex justify-between"><span>Structured Tool Math</span><span className="text-[#34A853]">GPT-5</span></div>
          <div className="bg-white p-2 rounded border border-[#DADCE0] flex justify-between"><span>Fast Intent &amp; Failover</span><span className="text-[#FBBC05]">Gemini</span></div>
        </div>
      </div>,
      <div key="t2" className="w-full h-full bg-[#FFF5F5] p-4 flex flex-col justify-between">
        <div className="text-[11px] font-semibold text-[#EA4335]">PM Artifacts &amp; RICE Prioritization</div>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-[#3C4043]">
          <div className="bg-white rounded-lg p-2 border border-[#DADCE0]">42 Mobile Screens</div>
          <div className="bg-white rounded-lg p-2 border border-[#DADCE0]">29 React Wireframes</div>
          <div className="bg-white rounded-lg p-2 border border-[#DADCE0]">Academic PRD (.docx)</div>
          <div className="bg-white rounded-lg p-2 border border-[#DADCE0]">6-Sprint Roadmap</div>
        </div>
      </div>,
      <div key="t3" className="w-full h-full bg-white p-5 flex flex-col justify-between border border-[#DADCE0]">
        <div className="text-xs font-semibold text-[#202124]">RAG Flight &amp; Hotel Landed-Cost Engine</div>
        <div className="bg-[#F8F9FA] rounded-xl p-3 border border-[#DADCE0] text-[11px] text-[#3C4043]">
          “5-day Goa + Hampi trip under ₹45,000 from Bengaluru” → Deterministic FX + GST landed-cost tool check + JSON Schema validation.
        </div>
        <div className="text-[10px] font-mono text-[#5F6368]">Pinecone Cross-Trip Preference Memory</div>
      </div>,
      <div key="t4" className="w-full h-full bg-[#FEF3E2] p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">7Ms Marketing &amp; CX Strategy</span>
        <span className="text-[10px] text-[#5F6368]">Market · Mission · Message · Media · Money · Measurement · Management</span>
      </div>,
      <div key="t5" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">Validation Gates</span>
        <span className="text-[10px] font-mono text-[#34A853]">JSON Schema ✓ · Pydantic ✓ · Regex ✓</span>
      </div>,
    ];
    return <div className={`w-full h-full overflow-hidden ${className}`}>{frames[variant % frames.length]}</div>;
  }

  if (slug === 'stipens') {
    const frames = [
      <div key="s0" className="w-full h-full bg-gradient-to-br from-[#F2FBF5] via-[#FFFFFF] to-[#E6F4EA] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#006621] font-medium">Stipens · RBI Account Aggregator Flow</span>
          <span className="text-[11px] text-[#34A853] font-medium">Consent-First</span>
        </div>
        <div className="grid grid-cols-3 gap-3 my-3">
          <div className="bg-white rounded-xl border border-[#DADCE0] p-3">
            <div className="text-[10px] text-[#5F6368]">Step 1</div>
            <div className="text-xs font-semibold text-[#202124] mt-0.5">Mobile Discovery</div>
            <div className="text-[10px] text-[#5F6368] mt-1">Links FIP banks via AA handle</div>
          </div>
          <div className="bg-white rounded-xl border border-[#DADCE0] p-3">
            <div className="text-[10px] text-[#5F6368]">Step 2</div>
            <div className="text-xs font-semibold text-[#202124] mt-0.5">Salary Detection</div>
            <div className="text-[10px] text-[#5F6368] mt-1">Auto-splits Needs / Goals / Save</div>
          </div>
          <div className="bg-white rounded-xl border border-[#DADCE0] p-3">
            <div className="text-[10px] text-[#5F6368]">Step 3</div>
            <div className="text-xs font-semibold text-[#202124] mt-0.5">Expense Forecast</div>
            <div className="text-[10px] text-[#5F6368] mt-1">Predicts bills &amp; savings gaps</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-[#5F6368]">Encrypted FI Fetch · Smart Categorization · Zero Password Sharing</div>
      </div>,
      <div key="s1" className="w-full h-full bg-[#E6F4EA]/60 p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#006621]">Salary Auto-Allocator</span>
        <div className="space-y-1.5 text-[10px]">
          <div className="bg-white rounded px-2.5 py-1.5 border border-[#DADCE0] flex justify-between"><span>Fixed Essentials</span><span className="font-mono">50%</span></div>
          <div className="bg-white rounded px-2.5 py-1.5 border border-[#DADCE0] flex justify-between"><span>SIP &amp; Emergency</span><span className="font-mono text-[#34A853]">30%</span></div>
          <div className="bg-white rounded px-2.5 py-1.5 border border-[#DADCE0] flex justify-between"><span>Guilt-Free Spend</span><span className="font-mono">20%</span></div>
        </div>
      </div>,
      <div key="s2" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">AA Consent Artefact</span>
        <div className="bg-white rounded-lg p-3 border border-[#DADCE0] text-[10px] font-mono text-[#3C4043]">
          FIP: HDFC / SBI · Frequency: Daily · Purpose: Expense &amp; Savings AI
        </div>
      </div>,
      <div key="s3" className="w-full h-full bg-white p-5 border border-[#DADCE0] flex flex-col justify-between">
        <span className="text-xs font-semibold text-[#202124]">Transaction Categorization &amp; Savings Insights</span>
        <div className="text-[11px] text-[#5F6368]">Surfaces recurring subscriptions, UPI velocity spikes, and end-of-month runway.</div>
      </div>,
    ];
    return <div className={`w-full h-full overflow-hidden ${className}`}>{frames[variant % frames.length]}</div>;
  }

  if (slug === 'healthsync') {
    const frames = [
      <div key="h0" className="w-full h-full bg-gradient-to-br from-[#FFFDF7] via-[#FEF7E0] to-[#FEF3E2] p-3.5 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-[#B06000] font-medium truncate">HealthSync · iPhone 15 Pro</span>
          <span className="text-[10px] text-[#5F6368] shrink-0">5 Personas</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 my-1.5">
          {['Welcome', 'Profile', 'Doctors', 'Meds'].map((scr) => (
            <div key={scr} className="bg-white rounded-xl border border-[#DADCE0] p-2 flex flex-col justify-between h-16 shadow-xs">
              <div className="w-5 h-1 bg-[#DADCE0] rounded-full mx-auto" />
              <div className="text-[9.5px] font-semibold text-center text-[#202124] truncate">{scr}</div>
              <div className="h-1.5 rounded bg-[#E8F0FE]" />
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-[#5F6368] truncate">Elderly &amp; Rural Accessibility</div>
      </div>,
      <div key="h1" className="w-full h-full bg-[#F8F9FA] p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">5 Research Personas</span>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[#3C4043]">
          <div className="bg-white p-1.5 rounded border border-[#DADCE0]">Priya · Patient</div>
          <div className="bg-white p-1.5 rounded border border-[#DADCE0]">Dr. Mehta · Doctor</div>
          <div className="bg-white p-1.5 rounded border border-[#DADCE0]">Raju · Rural Elder</div>
          <div className="bg-white p-1.5 rounded border border-[#DADCE0]">Anita · Caregiver</div>
        </div>
      </div>,
      <div key="h2" className="w-full h-full bg-[#FEF3E2]/70 p-4 flex flex-col justify-between">
        <span className="text-[11px] font-semibold text-[#202124]">Competitive Benchmark</span>
        <div className="text-[10px] text-[#5F6368]">Practo · Apollo 24/7 · 1mg · Mfine — identified elderly onboarding &amp; med-adherence friction.</div>
      </div>,
      <div key="h3" className="w-full h-full bg-white p-5 border border-[#DADCE0] flex flex-col justify-between">
        <span className="text-xs font-semibold text-[#202124]">7-Stage End-to-End Care Journey</span>
        <span className="text-[11px] text-[#5F6368]">Awareness → Onboarding → Doctor Search → Booking → Telehealth → Health Reports → Retention</span>
      </div>,
    ];
    return <div className={`w-full h-full overflow-hidden ${className}`}>{frames[variant % frames.length]}</div>;
  }

  // ATS Tailor or Design Visuals
  const isAts = slug === 'ats-resume-tailor';
  return (
    <div
      className={`w-full h-full p-5 flex flex-col justify-between ${
        isAts
          ? 'bg-gradient-to-br from-[#F7F3FF] via-white to-[#EDE9FE]'
          : 'bg-gradient-to-br from-[#F4F8FF] via-white to-[#E8F0FE]'
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-medium text-[#4285F4]">
          {isAts ? 'Single-File Claude ATS Optimizer' : 'GDSC-LPU · TEDxLPU · Technocean’23'}
        </span>
        <span className="text-[11px] text-[#5F6368]">{isAts ? 'jsPDF Export' : 'Visual Collateral'}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="bg-white rounded-xl border border-[#DADCE0] p-3">
          <div className="text-[11px] font-semibold text-[#202124]">
            {isAts ? 'JD Keyword Gap Scan' : 'TEDxLPU "Reflection"'}
          </div>
          <div className="text-[10px] text-[#5F6368] mt-1">
            {isAts ? 'Extracts must-have skills & weights' : '6 Speakers · Stage & Social Visuals'}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#DADCE0] p-3">
          <div className="text-[11px] font-semibold text-[#202124]">
            {isAts ? 'Factual Bullet Rewrite' : 'GDSC-LPU Core Design'}
          </div>
          <div className="text-[10px] text-[#5F6368] mt-1">
            {isAts ? 'Claude-powered tailoring + PDF' : '10+ Tech Events · Posters & Decks'}
          </div>
        </div>
      </div>
      <div className="text-[10px] font-mono text-[#5F6368]">
        {isAts ? 'Zero Backend · Browser-Native' : 'Figma · Adobe Photoshop · Canva · ProtoPie'}
      </div>
    </div>
  );
}

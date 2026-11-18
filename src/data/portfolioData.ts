export type ProjectCategory = 'AI Products' | 'Multi-Agent' | 'Fintech' | 'UI/UX';

export interface ProjectCaseStudy {
  slug: string;
  shortName: string;
  title: string;
  category: ProjectCategory;
  year: string;
  clientOrContext: string;
  deliverable: string;
  timelineOrScope: string;
  stack: string[];
  summary: string;
  overview: string;
  highlights: string[];
  artifacts: string[];
  accentColor: string;
  accentBg: string;
  urlBreadcrumb: string;
  displayUrl: string;
  featuredOnHome?: boolean;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  tools: string;
  percent: number;
  color: string;
}

export interface ExperienceItem {
  role: string;
  orgAndDates: string;
  impact: string;
  type: 'Work' | 'Leadership' | 'Education';
}

export interface FunFactItem {
  title: string;
  subtitle: string;
  iconKey: 'coffee' | 'art' | 'mic' | 'sparkles' | 'award' | 'globe';
}

export interface SearchIndexItem {
  id: string;
  name: string;
  subtitle: string;
  type: 'page' | 'project' | 'popup';
  target: string;
}

export const PROFILE = {
  name: 'Deepti Suman',
  firstName: 'Deepti',
  handle: 'Deeeptisuman',
  headline: 'AI Product Engineer',
  subHeadline: 'AI Product Engineer · Aspiring AI Product Manager',
  heroTagline:
    "I think like a PM, build like an engineer, and don't stop until the AI product actually works.",
  location: 'India',
  timezoneAndReply: 'IST (GMT+5:30) · Replies in 24h',
  educationShort: 'BITSoM PM · LPU B.Tech CSE',
  quickStatsChip: '6+ AI products · 9-agent arch · 2× Finalist',
  availability: 'Available',
  email: 'suman766deepti@gmail.com',
  phone: '+91 8002766794',
  languages: 'English, Hindi',
  toolsShort: 'Next.js, LangGraph, Figma',
  linkedin: 'https://linkedin.com/in/deepti-suman',
  github: 'https://github.com/deeptisuman',
  shortBio:
    'AI Product Engineer & B.Tech CSE graduate (2024) moving into AI Product Management through BITSoM’s Gen & Agentic AI PM program. I build end-to-end LLM products across RAG, multi-agent systems, Chrome extensions, and accessible design systems.',
  overviewBio:
    'Deepti Suman is an AI Product Engineer and B.Tech CSE graduate based in India with 1.5+ years across technical operations, freelance UI/UX design, and end-to-end AI product building. Completed BITSoM’s Product Management with Generative & Agentic AI program — shipping PRDs, 42-screen design systems, Chrome MV3 agents, and multi-agent LangGraph platforms.',
  overviewStats: [
    { value: '6', label: 'AI & UX Products' },
    { value: '9', label: 'Agent LangGraph' },
    { value: '2×', label: 'National Finalist' },
    { value: '70–80+', label: 'Daily Ops Queries' },
  ],
  howIWork: [
    'Build complete, self-contained, polished deliverables rather than rough drafts.',
    'Iterate through debugging and extension cycles until outputs are production-ready.',
    'Prioritize clean design systems, validation, human-in-the-loop control, and AI safety.',
    'Bridge PM artifacts (PRDs, RICE, API contracts, sprint roadmaps) with full-stack code.',
  ],
};

export const PROJECTS: ProjectCaseStudy[] = [
  {
    slug: 'uplyfox',
    shortName: 'UplyFox',
    title: 'UplyFox — AI Job-Application Copilot',
    category: 'AI Products',
    year: '2026',
    clientOrContext: 'Self-Initiated Product',
    deliverable: 'Full-Stack Web + Chrome MV3',
    timelineOrScope: 'Next.js 15 · Gemini · Mistral',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Chrome MV3',
      'Supabase',
      'PostgreSQL',
      'Gemini',
      'Mistral',
    ],
    summary:
      'An AI copilot that extracts candidate data from resumes, GitHub, and portfolio links into structured profiles and reusable, retrieval-grounded application answers across dynamic SPAs and iframes.',
    overview:
      'UplyFox solves repetitive, error-prone job applications without sacrificing user trust. It parses candidate resumes, GitHub repos, and portfolio links into structured profiles, orchestrates Gemini and Mistral with deterministic fact retrieval, and runs a Chrome MV3 browser agent with human-in-the-loop approval snapshots.',
    highlights: [
      'Multi-model LLM orchestration across Gemini and Mistral using deterministic fact retrieval, RAG grounding, structured outputs, hallucination mitigation, and prompt-injection defenses.',
      'Chrome MV3 browser agent detecting jobs and application fields across dynamic SPAs, nested iframes, and Shadow DOM with explainable match scoring.',
      'Security & trust layer built on Supabase Auth, PostgreSQL Row-Level Security, review snapshots, approval controls, submission auditing, and CAPTCHA detection.',
    ],
    artifacts: [
      'Structured Profile Extraction Engine',
      'Chrome MV3 DOM & Shadow-DOM Agent',
      'Human-in-the-Loop Review & Audit Trail',
      'Explainable Job-Match Scoring UI',
    ],
    accentColor: '#4285f4',
    accentBg: '#e8f0fe',
    urlBreadcrumb: 'deeptisuman.dev › work › uplyfox',
    displayUrl: 'deeptisuman.dev/work/uplyfox',
    featuredOnHome: true,
    githubUrl: 'https://github.com/deeptisuman',
  },
  {
    slug: 'tripezza',
    shortName: 'Tripezza',
    title: 'Tripezza — Multi-Agent AI Travel Platform',
    category: 'Multi-Agent',
    year: '2026',
    clientOrContext: 'BITSoM Gen & Agentic AI Capstone',
    deliverable: '9-Agent System + PRD + 42 Screens',
    timelineOrScope: 'LangGraph · Claude · GPT-5 · Gemini',
    stack: [
      'Next.js 16',
      'TypeScript',
      'LangGraph',
      'PostgreSQL',
      'Pinecone',
      'Redis',
      'Claude',
      'GPT-5',
      'Gemini',
    ],
    summary:
      'A 9-agent AI travel platform for the Indian market turning natural-language prompts into end-to-end trip planning — backed by a 42-screen design system, PRD, RICE roadmap, and cost-aware LLM routing.',
    overview:
      'Built as my BITSoM Product Management with Generative & Agentic AI capstone, Tripezza pairs deep PM rigor with multi-agent systems engineering. Nine specialized agents coordinate via a LangGraph state machine, routing tasks across Claude, GPT-5, and Gemini based on complexity, cost, and provider failover.',
    highlights: [
      'Architected a 9-agent LangGraph state machine (including Scout, Auditor, Concierge, Supervisor, Executor) with deterministic tool-calling for landed-cost math and live FX.',
      'Built a provider-agnostic LLM router across Claude, GPT-5, and Gemini with automatic failover, plus RAG flight/hotel ranking and Pinecone cross-trip preference memory.',
      'Enforced AI safety via JSON Schema, Pydantic, and regex validation gates on critical booking and pricing outputs.',
      'Produced a 42-screen mobile-first design system, 29 React wireframes, academic PRD (.docx), API contracts, RICE prioritization, 7Ms marketing framework, and 6-sprint roadmap.',
    ],
    artifacts: [
      'Academic PRD & 6-Sprint Delivery Roadmap',
      '42-Screen Mobile-First Design System',
      '29 Interactive React Wireframes',
      'RICE MVP Prioritization & 7Ms Strategy PDF',
    ],
    accentColor: '#ea4335',
    accentBg: '#fce8e6',
    urlBreadcrumb: 'deeptisuman.dev › work › tripezza',
    displayUrl: 'deeptisuman.dev/work/tripezza',
    featuredOnHome: true,
    githubUrl: 'https://github.com/deeptisuman',
  },
  {
    slug: 'stipens',
    shortName: 'Stipens',
    title: 'Stipens — AI Money Management on Account Aggregator',
    category: 'Fintech',
    year: '2026',
    clientOrContext: 'India Fintech Product Concept',
    deliverable: 'AA Architecture & AI Allocation Flow',
    timelineOrScope: 'Account Aggregator · Expense Prediction',
    stack: ['India AA Framework', 'Financial Categorization', 'Cashflow ML', 'Product Architecture'],
    summary:
      'Connects securely to Indian bank accounts via RBI’s Account Aggregator (AA) framework to categorize transactions, detect salary credits, automate salary allocation, and predict upcoming expenses.',
    overview:
      'Stipens explores consent-first personal finance for young Indian earners. By leveraging India’s Account Aggregator (AA) ecosystem via registered mobile number discovery, Stipens fetches encrypted bank statements with explicit user consent and turns raw transactions into proactive salary buckets and savings nudges.',
    highlights: [
      'Mapped the end-to-end India Account Aggregator flow: registered mobile discovery, FIP bank linking, consent artefact approval, and encrypted FI data pull.',
      'Designed transaction normalization, merchant categorization, automatic salary-credit detection, and rule + AI bucket allocation (Needs, Goals, Investments).',
      'Defined expense forecasting and low-balance warning surfaces built for clarity and financial confidence without overwhelming jargon.',
    ],
    artifacts: [
      'Account Aggregator Consent & Data Flow Spec',
      'Salary Detection & Bucket Allocation Logic',
      'Expense Prediction & Savings Insight Model',
    ],
    accentColor: '#34a853',
    accentBg: '#e6f4ea',
    urlBreadcrumb: 'deeptisuman.dev › work › stipens',
    displayUrl: 'deeptisuman.dev/work/stipens',
    featuredOnHome: true,
  },
  {
    slug: 'healthsync',
    shortName: 'HealthSync',
    title: 'HealthSync — Accessible Healthcare App Concept',
    category: 'UI/UX',
    year: '2025',
    clientOrContext: 'End-to-End UI/UX Case Study',
    deliverable: 'Research · 5 Personas · iOS UI System',
    timelineOrScope: 'Figma · HTML/CSS · Usability Testing',
    stack: ['UX Research', '5 Personas', '7-Stage Journey', 'iPhone 15 Pro UI', 'Design System'],
    summary:
      'An accessible telehealth and medication-tracking mobile app designed around 5 personas (including elderly and rural users), 7 journey stages, competitive benchmarking, and high-fidelity iPhone 15 Pro screens.',
    overview:
      'Existing healthcare apps feel fragmented and intimidating for elderly and rural patients. HealthSync started with doctor and hospital admin interviews plus benchmarking against Practo, Apollo 24/7, 1mg, and Mfine — resulting in a calm, high-contrast iPhone 15 Pro design system and end-to-end care flow.',
    highlights: [
      'Conducted stakeholder interviews (doctors, hospital admins), surveys, contextual inquiry, and usability testing across 5 distinct personas (Priya, Dr. Mehta, Raju, Anita, Admin).',
      'Mapped a 7-stage patient journey from awareness and onboarding through doctor discovery, telehealth consultation, and long-term medication adherence.',
      'Crafted high-fidelity iPhone 15 Pro screens in HTML/CSS with a custom inline SVG brand mark: welcome, 3-step onboarding, 4-step profile setup, dashboard, appointments, search, and med tracker.',
    ],
    artifacts: [
      'Competitive Audit (Practo, Apollo 24/7, 1mg, Mfine)',
      '5 Personas & 7-Stage Service Journey Map',
      '12+ High-Fidelity iPhone 15 Pro Screens',
    ],
    accentColor: '#fbbc05',
    accentBg: '#fef3e2',
    urlBreadcrumb: 'deeptisuman.dev › work › healthsync',
    displayUrl: 'deeptisuman.dev/work/healthsync',
    featuredOnHome: true,
  },
  {
    slug: 'ats-resume-tailor',
    shortName: 'ATS Tailor',
    title: 'ATS Resume Tailoring Tool (Claude API)',
    category: 'AI Products',
    year: '2025',
    clientOrContext: 'Working Browser Utility',
    deliverable: 'Self-Contained Single-File AI App',
    timelineOrScope: 'Anthropic Claude API · jsPDF',
    stack: ['HTML/JS', 'Anthropic Claude API', 'Prompt Engineering', 'jsPDF'],
    summary:
      'A zero-backend, single-file browser tool using the Anthropic Claude API to parse resumes, score keyword gaps against job descriptions, tailor bullet points, and export submission-ready PDFs with jsPDF.',
    overview:
      'Built through rapid iterative debugging and user-workflow refinement, this self-contained browser utility lets job seekers paste any job description alongside their resume, inspect ATS alignment, refine tailored bullet points with Claude, and download a clean formatted PDF instantly via jsPDF.',
    highlights: [
      'Zero-install single-HTML architecture powered by structured prompts to the Anthropic Claude API for accurate section parsing and keyword alignment.',
      'Side-by-side comparison of original vs. JD-tailored bullets so users retain factual accuracy without fabricated claims.',
      'Client-side PDF generation via jsPDF ensuring deterministic, ATS-readable typography and margins.',
    ],
    artifacts: [
      'Single-File Web Application',
      'Structured Claude Parsing & Rewrite Prompts',
      'jsPDF Export Formatter',
    ],
    accentColor: '#8b5cf6',
    accentBg: '#f3e8ff',
    urlBreadcrumb: 'deeptisuman.dev › work › ats-resume-tailor',
    displayUrl: 'deeptisuman.dev/work/ats-resume-tailor',
    featuredOnHome: false,
  },
  {
    slug: 'design-visuals',
    shortName: 'Design',
    title: 'Design Systems, Posters & Community Visuals',
    category: 'UI/UX',
    year: '2024',
    clientOrContext: 'Freelance · GDSC-LPU · TEDxLPU',
    deliverable: 'Event Branding · Posters · UI Screens',
    timelineOrScope: 'Figma · Photoshop · Canva · ProtoPie',
    stack: ['Figma', 'Adobe Photoshop', 'Canva', 'InVision', 'ProtoPie', 'Miro'],
    summary:
      'Selected UI/UX freelance explorations and visual identity collateral created as Core Team Designer for GDSC-LPU (10+ events), TEDxLPU "Reflection" (6 speakers), and Technocean’23.',
    overview:
      'Before focusing on AI Product Engineering, I spent 2021–2026 designing posters, event identities, and mobile/web interfaces across campus tech communities and freelance engagements — honing visual hierarchy, typography, and cross-team execution.',
    highlights: [
      'Served as Technical Writer & Graphic Designer for Google Developer Students Club (GDSC-LPU), producing branding and hosting 10+ technical events.',
      'Coordinated and designed visual collateral for TEDxLPU "Reflection" featuring 6 live speakers.',
      'Led UI/UX design & technical coordination for Technocean’23, a three-day university tech festival.',
    ],
    artifacts: [
      'TEDxLPU "Reflection" Stage & Poster Suite',
      'GDSC-LPU Technical Event Identity System',
      'Technocean’23 UI/UX & Festival Collateral',
    ],
    accentColor: '#4285f4',
    accentBg: '#e8f0fe',
    urlBreadcrumb: 'deeptisuman.dev › work › design-visuals',
    displayUrl: 'deeptisuman.dev/work/design-visuals',
    featuredOnHome: false,
  },
];

export const SKILLS_TAB_DATA: SkillItem[] = [
  {
    name: 'AI Product Strategy & PRDs',
    tools: 'PRDs · RICE · Personas · User Journeys · 7Ms',
    percent: 94,
    color: '#4285f4',
  },
  {
    name: 'LLM Orchestration & RAG',
    tools: 'LangGraph · Gemini · Claude · GPT-5 · Pinecone',
    percent: 92,
    color: '#fbbc05',
  },
  {
    name: 'Frontend & Chrome MV3',
    tools: 'React 19 · Next.js 16 · TypeScript · Tailwind',
    percent: 90,
    color: '#34a853',
  },
  {
    name: 'UI/UX & Design Systems',
    tools: 'Figma · Wireframing · Prototyping · Usability',
    percent: 88,
    color: '#8b5cf6',
  },
  {
    name: 'Backend, SQL & Ops Analytics',
    tools: 'Python · FastAPI · PostgreSQL · Supabase · Looker',
    percent: 84,
    color: '#ea4335',
  },
];

export const EXPERIENCE_TAB_DATA: ExperienceItem[] = [
  {
    role: 'Product Management — Gen & Agentic AI',
    orgAndDates: 'BITSoM, Mumbai · Dec 2025 – Jun 2026',
    impact:
      'Built Tripezza capstone: 9-agent LangGraph travel platform, 42-screen design system, PRD, API contracts & 6-sprint roadmap.',
    type: 'Education',
  },
  {
    role: 'Freelance UI/UX Designer',
    orgAndDates: 'Self-Employed · 2024 – 2026',
    impact:
      'User research, 5-persona journey mapping, wireframes, and iPhone 15 Pro design systems using Figma, ProtoPie, and Miro.',
    type: 'Work',
  },
  {
    role: 'Associate, MIS & Technical Operations',
    orgAndDates: 'VDK Eduventures · Apr 2024 – Sep 2025',
    impact:
      'Managed end-to-end CRM tickets handling 70–80+ daily queries, SQL data validation, SLA monitoring, and automated Sheets dashboards.',
    type: 'Work',
  },
  {
    role: 'Core Team Member · Writer & Designer',
    orgAndDates: 'GDSC LPU & TEDxLPU · 2021 – 2024',
    impact:
      'Hosted 10+ technical events as Public Speaker, produced TEDxLPU (6 speakers), and coordinated UI/UX for Technocean’23.',
    type: 'Leadership',
  },
  {
    role: 'B.Tech, Computer Science & Engineering',
    orgAndDates: 'Lovely Professional University · 2020 – 2024',
    impact:
      'Smart India Hackathon 2023 Finalist & National Youth Parliament 2022 Finalist; foundation in CS, Flutter, and databases.',
    type: 'Education',
  },
];

export const FUN_FACTS_TAB_DATA: FunFactItem[] = [
  {
    title: 'Smart India Hackathon',
    subtitle: '2023 National Finalist',
    iconKey: 'award',
  },
  {
    title: 'Youth Parliament ’22',
    subtitle: 'National Finalist · Speaker',
    iconKey: 'mic',
  },
  {
    title: '10+ GDSC Events',
    subtitle: 'Speaker · Tech Writer',
    iconKey: 'sparkles',
  },
  {
    title: 'TEDxLPU Producer',
    subtitle: '6 Speakers · "Reflection"',
    iconKey: 'globe',
  },
  {
    title: 'Painting & Crafts',
    subtitle: 'Sketching & handmade art',
    iconKey: 'art',
  },
  {
    title: 'Cooking Enthusiast',
    subtitle: 'Experiments beyond code',
    iconKey: 'coffee',
  },
];

export const CERTIFICATIONS = [
  { name: 'Product Management with Generative & Agentic AI', provider: 'BITS School of Management', year: '2025–2026' },
  { name: 'App Development using Flutter', provider: 'Programming Pathshala', year: '2023' },
  { name: 'C, C++ Fundamentals Course', provider: 'Board Infinity', year: '2021' },
  { name: 'Figma for UX Design', provider: 'LinkedIn Learning', year: 'Completed' },
  { name: 'MongoDB Essential Training', provider: 'LinkedIn Learning', year: 'Completed' },
  { name: 'C++ Essential Training', provider: 'LinkedIn Learning', year: 'Completed' },
];

export const FULL_SKILLS_GROUPS = [
  {
    label: 'AI & LLM',
    items: 'Gemini · Mistral · Azure OpenAI · LangGraph · LangChain · RAG · Embeddings · pgvector · Structured Outputs · Tool Calling · Pydantic · Human-in-the-Loop',
  },
  {
    label: 'Frontend & Extension',
    items: 'TypeScript · JavaScript · React 19 · Next.js 16 · Tailwind CSS · Redux Toolkit · Zustand · Chrome MV3 · Browser Automation · WebRTC',
  },
  {
    label: 'Backend & Security',
    items: 'Python · FastAPI · Node.js · Express.js · REST APIs · SSE · WebSockets · PostgreSQL · Supabase · MongoDB · RLS · JWT · OAuth 2.0',
  },
  {
    label: 'Product & Design',
    items: 'PRDs · RICE · User Journeys · 7Ms Marketing · Figma · ProtoPie · Miro · Adobe Photoshop · Looker Studio · Google Sheets · SLA & CRM Ops',
  },
];

export const SEARCH_INDEX: SearchIndexItem[] = [
  { id: 'home', name: 'Home', subtitle: 'New Tab & Quick Launch', type: 'page', target: '/' },
  { id: 'work', name: 'Work — All Projects', subtitle: 'Search results & portfolio overview', type: 'page', target: '/work' },
  { id: 'about', name: 'About Deepti Suman', subtitle: 'Skills, Experience, BITSoM & Fun Facts', type: 'popup', target: 'about' },
  { id: 'resume', name: 'Resume — Deepti Suman', subtitle: 'AI Product Engineer · 2026 CV', type: 'popup', target: 'resume' },
  { id: 'gallery', name: 'Visual Gallery', subtitle: 'UI screens, architectures & posters', type: 'popup', target: 'gallery' },
  { id: 'contact', name: 'Contact / Hire Me', subtitle: 'suman766deepti@gmail.com', type: 'popup', target: 'contact' },
  ...PROJECTS.map((p) => ({
    id: p.slug,
    name: p.title,
    subtitle: `${p.category} · ${p.year}`,
    type: 'project' as const,
    target: `/work/${p.slug}`,
  })),
];

export type TripezzaScreenGroup = 'Core Agents' | 'Trip & Planning' | 'Onboarding & Auth';

export interface TripezzaScreen {
  id: string;
  src: string;
  title: string;
  agentOrStage: string;
  group: TripezzaScreenGroup;
  caption: string;
}

export const TRIPEZZA_SCREENS: TripezzaScreen[] = [
  {
    id: 'home-dashboard',
    src: '/assets/aistudio/home_dashboard_glassmorphism_04d8c11d.png',
    title: 'Home Dashboard',
    agentOrStage: 'Command Center',
    group: 'Trip & Planning',
    caption: 'Active expedition overview, Auditor travel fund tracking, and quick-launch cards across upcoming trips.',
  },
  {
    id: 'new-trip-intent',
    src: '/assets/aistudio/new_trip_intent_glassmorphism_429f23b3.png',
    title: 'New Trip Intent',
    agentOrStage: 'Planner Intake',
    group: 'Trip & Planning',
    caption: 'Natural-language and voice prompt intake capturing destination, dates, budget, and traveller preferences.',
  },
  {
    id: 'planning-in-progress',
    src: '/assets/aistudio/planning_in_progress_luminous_tropics_2fea4598.png',
    title: 'Multi-Agent Orchestration',
    agentOrStage: 'LangGraph Live State',
    group: 'Trip & Planning',
    caption: 'Real-time progress view as specialized agents curate flights, stays, compliance checks, and route plans.',
  },
  {
    id: 'flight-results',
    src: '/assets/aistudio/flight_results_glassmorphism_795416f1.png',
    title: 'Scout Flight Analysis',
    agentOrStage: 'Scout Agent',
    group: 'Core Agents',
    caption: 'Ranked flight comparisons highlighting best match score, value picks, layover tradeoffs, and live fare tags.',
  },
  {
    id: 'itinerary-review',
    src: '/assets/aistudio/itinerary_review_glassmorphism_490c9772.png',
    title: 'Day-by-Day Itinerary',
    agentOrStage: 'Curator & Timeline',
    group: 'Trip & Planning',
    caption: 'Structured arrival and sightseeing schedule with palace stays, heritage stops, and transit timing.',
  },
  {
    id: 'concierge-recommendations',
    src: '/assets/aistudio/concierge_recommendations_luminous_tropics_516882c3.png',
    title: 'Concierge Top Picks',
    agentOrStage: 'Concierge Agent',
    group: 'Core Agents',
    caption: 'Curated villas, boutique stays, and dining picks ranked by traveller vibe and preference memory.',
  },
  {
    id: 'budget-workspace',
    src: '/assets/aistudio/budget_workspace_luminous_tropics_b8363249.png',
    title: 'Auditor Budget Workspace',
    agentOrStage: 'Auditor Agent',
    group: 'Core Agents',
    caption: 'Allocated budget vs. ceiling, category breakdown donut, variance alerts, and flagged policy anomalies.',
  },
  {
    id: 'compliance-supervisor',
    src: '/assets/aistudio/compliance_supervisor_0a216418.png',
    title: 'Compliance Supervisor',
    agentOrStage: 'Supervisor Agent',
    group: 'Core Agents',
    caption: 'Live clearance metric with leg-by-leg visa, health certificate, and travel insurance verification gates.',
  },
  {
    id: 'executor-booking-hub',
    src: '/assets/aistudio/executor_booking_hub_luminous_tropics_d7bc764e.png',
    title: 'Executor Booking Hub',
    agentOrStage: 'Executor Agent',
    group: 'Core Agents',
    caption: 'Human-in-the-loop checkout confirmation summarizing itinerary locks, payment breakdown, and final approval.',
  },
  {
    id: 'navigator-walking-guide',
    src: '/assets/aistudio/navigator_walking_guide_34b70929.png',
    title: 'Navigator Walking Guide',
    agentOrStage: 'Navigator Agent',
    group: 'Core Agents',
    caption: 'Turn-by-turn on-trip city walking guidance with live route telemetry and contextual neighborhood cues.',
  },
  {
    id: 'sentinel-safety-watch',
    src: '/assets/aistudio/sentinel_safety_watch_0b0edeaf.png',
    title: 'Sentinel Safety Watch',
    agentOrStage: 'Sentinel Agent',
    group: 'Core Agents',
    caption: 'Real-time perimeter status, nearest embassy and hospital contacts, and live Sentinel AI safety briefs.',
  },
  {
    id: 'chronicler-trip-journal',
    src: '/assets/aistudio/chronicler_trip_journal_02d63720.png',
    title: 'Chronicler Trip Journal',
    agentOrStage: 'Chronicler Agent',
    group: 'Core Agents',
    caption: 'Post-trip visual timeline pairing captured locations, reflections, and Scout timing insights.',
  },
  {
    id: 'traveller-profile',
    src: '/assets/aistudio/traveller_profile_luminous_tropics_cdf19608.png',
    title: 'Tripezza Passport Profile',
    agentOrStage: 'Preference Memory',
    group: 'Trip & Planning',
    caption: 'Persistent traveller passport storing loyalty tier, travel vibe, home hub, and cross-trip preferences.',
  },
  {
    id: 'welcome-get-started',
    src: '/assets/aistudio/welcome_get_started_75287026.png',
    title: 'Welcome — Personal Travel Office',
    agentOrStage: 'Onboarding Entry',
    group: 'Onboarding & Auth',
    caption: 'Introductory welcome introducing Tripezza’s 9-agent personal travel office experience.',
  },
  {
    id: 'welcome-intelligent-curation',
    src: '/assets/aistudio/welcome_intelligent_curation_98f4a627.png',
    title: 'Intelligent Curation',
    agentOrStage: 'Onboarding Step 1',
    group: 'Onboarding & Auth',
    caption: 'Explains how Planner and Scout collaborate to research routes and personalize options.',
  },
  {
    id: 'welcome-human-connection',
    src: '/assets/aistudio/welcome_human_connection_variant_1_cd72e5cc.png',
    title: 'Planning That Feels Personal',
    agentOrStage: 'Onboarding Story',
    group: 'Onboarding & Auth',
    caption: 'Highlights Auditor and Supervisor transparency before any booking commitment is finalized.',
  },
  {
    id: 'welcome-always-accompanied',
    src: '/assets/aistudio/welcome_always_accompanied_71c108f6.png',
    title: 'Always Accompanied',
    agentOrStage: 'Onboarding Step 3',
    group: 'Onboarding & Auth',
    caption: 'Showcases Concierge and Sentinel support during live travel for safety and recommendations.',
  },
  {
    id: 'welcome-personal-assistant',
    src: '/assets/aistudio/welcome_personal_assistant_variant_2_3e76ec2d.png',
    title: 'Your Personal Travel Team',
    agentOrStage: 'Onboarding Variant',
    group: 'Onboarding & Auth',
    caption: 'Alternative onboarding exploration positioning the multi-agent suite as a dedicated travel team.',
  },
  {
    id: 'sign-in-sign-up',
    src: '/assets/aistudio/sign_in_sign_up_4b254bc4.png',
    title: 'Sign In & Authentication',
    agentOrStage: 'Auth Flow',
    group: 'Onboarding & Auth',
    caption: 'Clean glassmorphic authentication screen unlocking synced itineraries and traveller passport memory.',
  },
];

export interface HealthSyncArtboard {
  id: string;
  src: string;
  title: string;
  stage: string;
  caption: string;
  aspectClass: string;
  cropTop?: boolean;
}

export const HEALTHSYNC_LOGO_SRC = '/assets/aistudio/1_29_20f205ab.png';

export const HEALTHSYNC_ARTBOARDS: HealthSyncArtboard[] = [
  {
    id: 'core-care-suite',
    src: '/assets/aistudio/HealthSync_f05a9cc4.png',
    title: 'Core Care, Vitals & Telehealth Suite (7 Screens)',
    stage: 'Home · Appointments · Analytics · Meds · Profile · Insights · Find a Doctor',
    caption:
      'High-contrast iPhone 15 Pro care hub spanning daily Health Score (84/100), live vitals & step analytics, telehealth & in-person appointment booking, medication adherence with missed-dose alerts, patient records, AI daily health briefs, and verified specialist search.',
    aspectClass: 'aspect-[3049/1851]',
    cropTop: false,
  },
  {
    id: 'onboarding-auth',
    src: '/assets/aistudio/Onboarding_41724d2d.png',
    title: 'Onboarding & Authentication Flow (5 Screens)',
    stage: 'Welcome 1–3 · Sign In · Create Account',
    caption:
      'Accessible 3-step introduction ("Health clarity, every single day", "Find the right doctor, instantly", "Your data stays yours, always") paired with HIPAA-compliant Sign In and password-strength Create Account screens.',
    aspectClass: 'aspect-[2.3/1]',
    cropTop: true,
  },
  {
    id: 'profile-creation',
    src: '/assets/aistudio/Profile_Creation_1e4660bb.png',
    title: '4-Step Health Profile Creation & Safety Setup (5 Screens)',
    stage: 'Personal Details · Vitals & BMI · Goals & Emergency · Review · Success',
    caption:
      'Progressive medical intake flow collecting photo, blood group, real-time BMI status (22.1 Normal), chronic conditions, known allergies, lifestyle habits, emergency ICE contact, and consent verification.',
    aspectClass: 'aspect-[2.25/1]',
    cropTop: true,
  },
];

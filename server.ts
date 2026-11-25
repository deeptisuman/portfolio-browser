import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCliArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && idx + 1 < process.argv.length) {
    return process.argv[idx + 1];
  }
  const prefixed = process.argv.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : undefined;
}

const PORT = Number(getCliArg('--port') || process.env.PORT) || 3000;
const HOST = getCliArg('--host') || '0.0.0.0';
const IS_PROD = process.env.NODE_ENV === 'production';

const TARA_SYSTEM_INSTRUCTION = `You are Tara, the cheerful, intelligent AI portfolio assistant for Deepti Suman, an AI Product Engineer & Aspiring AI Product Manager. Your name means "star," matching your bright, helpful, and welcoming personality.

Your Purpose:
Help recruiters, hiring managers, clients, and visitors explore Deepti Suman's background, projects, skills, and contact details accurately and efficiently.

Personality & Tone:
- Warm, approachable, concise, and professional with subtle desi warmth (e.g., an occasional natural "Namaste!" on first greeting, without overdoing slang).
- Enthusiastic about Deepti's work, but grounded, honest, and easy to scan.
- Keep answers crisp (2–4 short paragraphs or bullet points max) unless the user asks for a deep dive into a case study.

Strict Grounding Rules:
- Answer questions ONLY using the provided Knowledge Context below.
- Never invent skills, companies, metrics, URLs, or experiences. If asked something outside your context (such as salary/CTC expectations, notice period, CGPA, work authorization/relocation specifics, or personal info not listed), politely say you don't have that detail and offer Deepti's email (suman766deepti@gmail.com) or LinkedIn (https://linkedin.com/in/deepti-suman) so they can ask her directly.
- Speak clearly about Deepti in third person ("Deepti built...", "She worked at...").

Formatting & Navigation Guidance:
- Use **bold text** for key technologies, project names, and measurable outcomes.
- Use short, scannable bullet points (- item) rather than long walls of text.
- When recommending or explaining a project, briefly summarize the **Problem**, **Solution**, and **Impact**, then offer to share the portfolio case study, GitHub link, or deeper tech stack details.
- End helpful answers with a brief, natural follow-up suggestion (e.g., "Would you like to see the case study for **Tripezza** or grab Deepti's resume?").

Knowledge Context:

1. BIO & IDENTITY
- Name: Deepti Suman (online handle: Deeeptisuman)
- Current Title / Positioning: AI Product Engineer & Aspiring AI Product Manager — an engineer-turned-PM who takes AI products end-to-end from research and PRD to design systems and working, production-style prototypes.
- Target Roles: AI Product Manager, AI Product Engineer (open to PM internships and full-time roles).
- Professional Summary: AI Product Engineer and B.Tech CSE graduate (2024) building AI-powered web products and browser applications with React, Next.js, TypeScript, Python, and LLMs. Experienced in LLM orchestration, RAG, structured outputs, and human-in-the-loop systems, combining hands-on engineering with technical operations, UI/UX design, and BITSoM's Generative & Agentic AI PM program.
- How She Works: Builds complete, self-contained, polished deliverables rather than rough drafts; iterates through debugging until outputs are submission-ready; prioritizes clean design systems, validation, explainability, and AI safety; bridges PM artifacts (PRDs, RICE, API contracts, sprint roadmaps) with full-stack code.
- Languages Spoken: English, Hindi.
- Beyond Work: Cooking, painting, and making art and crafts.
- Interests: Agentic AI, LLM safety & human-in-the-loop systems, India-focused fintech, healthcare accessibility, travel tech, and job-tech.

2. EXPERIENCE
- **Associate, MIS & Technical Operations — VDK Eduventures** (Apr 2024 – Present · India):
  - Managed end-to-end CRM ticket workflows (creation, assignment, tracking, escalation, resolution) handling **70–80+ customer and technical queries daily**.
  - Provided L1 technical support across calls, email, and chat, coordinating application, system, and process issues with technical teams for timely resolution.
  - Monitored ticket status, response times, and SLA adherence to spot delays, recurring issues, and workflow bottlenecks.
  - Performed **SQL**-based data validation and analysis to identify discrepancies and support operational decisions.
  - Designed operational dashboards tracking ticket volume, status, and team performance, and automated recurring reports with **Google Sheets** and formulas.
- **Freelance UI/UX Designer** (2024 – 2026 · Self-Employed):
  - Delivered user research, 5-persona journey mapping, wireframing, high-fidelity mobile and web screens, and design systems using **Figma**, **ProtoPie**, **Miro**, **Adobe Photoshop**, **Canva**, and **InVision**.

3. CORE SKILLS
- **AI & LLM**: Gemini, Mistral, Claude, GPT-5, Azure OpenAI, LangGraph, LangChain, RAG, Embeddings, pgvector, Pinecone, Prompt Engineering, LLM Orchestration, Structured Outputs, Tool Calling, Pydantic, Instructor, Human-in-the-Loop, AI Safety.
- **Frontend & Browser Extensions**: TypeScript, JavaScript, React 19, Next.js 15/16, HTML, CSS, Tailwind CSS, Redux Toolkit, Zustand, Chrome MV3, Browser Automation, WebRTC, Monaco.
- **Backend & APIs**: Python, FastAPI, Node.js, Express.js, REST APIs, API Design & Integration, Server-Sent Events (SSE), WebSockets, JSON.
- **Data & Security**: PostgreSQL, Supabase, MongoDB, SQL, Database Design, Row-Level Security (RLS), JWT, RBAC, OAuth 2.0, Multi-Tenant Architecture, Data Ingestion.
- **Cloud, DevOps & Testing**: Docker, Nginx, AWS (EC2/S3/CloudFront), Azure VM, Vercel, GitHub Actions, Jenkins, Git, CI/CD, Playwright, End-to-End Testing, Rate Limiting.
- **Product & Design**: PRDs, RICE Prioritization, Personas & User Journeys, Competitive Analysis, 7Ms Marketing Framework, Testing Strategy, Explainable AI, Figma, ProtoPie, Miro, Adobe Photoshop, Canva, InVision, Wireframing, Prototyping, Usability Testing, Information Architecture, Looker Studio, Google Sheets, CRM Workflows, SLA Monitoring.
- **Soft Skills**: Public speaking, technical writing, event management, team coordination, graphic design, stakeholder communication.

4. KEY PROJECTS (PROBLEM / SOLUTION / IMPACT / LINKS)
- **Tripezza — Multi-Agent AI Travel Platform** (2026 · BITSoM Gen & Agentic AI Capstone):
  - Problem: End-to-end trip planning for Indian travelers is fragmented across flight/hotel comparison, landed-cost math, FX conversion, budgeting, safety checks, and itinerary coordination.
  - Solution: Architected a **9-agent LangGraph** state machine (including Supervisor, Scout, Auditor, Concierge, Executor, Navigator, Sentinel, Chronicler, and Planner) backed by a provider-agnostic multi-LLM router across **Claude**, **GPT-5**, and **Gemini** (routing by task complexity and cost with failover), **RAG**-based flight/hotel ranking, deterministic tool-calling for landed-cost & live FX math, **Pinecone** cross-trip preference memory, and **JSON Schema / Pydantic / regex** AI safety validation gates.
  - Impact & Deliverables: Delivered a **42-screen mobile-first design system** (**19 high-fidelity screens** showcased in this portfolio), **29 interactive React wireframes**, academic PRD (.docx), API contracts, **RICE** MVP prioritization, **7Ms** marketing framework, layered testing strategy, and a **6-sprint delivery roadmap**.
  - Tech Stack: Next.js 16, React, TypeScript, LangGraph, PostgreSQL, Pinecone, Redis, Claude, GPT-5, Gemini.
  - Links: Portfolio Case Study (/work/tripezza) · GitHub (https://github.com/deeptisuman).

- **UplyFox — AI Job-Application Copilot** (2026 · Self-Initiated Full-Stack + Chrome Extension):
  - Problem: Job applications are repetitive and error-prone across dynamic job portals, while naive AI autofill tools risk hallucinations, prompt injection, and unapproved submissions.
  - Solution: Built an AI copilot that extracts candidate data from resumes, GitHub, and portfolio links into structured profiles, orchestrates **Gemini** and **Mistral** with deterministic fact retrieval, RAG grounding, structured outputs, and prompt-injection defenses, paired with a **Chrome MV3** browser agent that detects jobs and form fields across dynamic SPAs, nested iframes, and **Shadow DOM**.
  - Impact & Deliverables: Delivers explainable job-match scoring, application tracking, and strong security/trust via **Supabase Auth**, **PostgreSQL RLS**, human-in-the-loop review snapshots, approval controls, submission auditing, and CAPTCHA detection.
  - Tech Stack: Next.js 15, React 19, TypeScript, Chrome MV3, Supabase, PostgreSQL, Gemini, Mistral.
  - Links: Portfolio Case Study (/work/uplyfox) · GitHub (https://github.com/deeptisuman).

- **Stipens — AI Money Management on India's Account Aggregator** (2026 · India Fintech Product Concept):
  - Problem: Young Indian earners struggle to turn raw multi-bank transactions into clear salary allocation, expense forecasts, and savings habits without giving up insecure credentials.
  - Solution: Designed a consent-first fintech flow leveraging RBI's **Account Aggregator (AA)** framework (registered mobile discovery, FIP bank linking, consent artefact approval, encrypted FI fetch) to normalize transactions, auto-detect salary credits, automate **Needs / Goals / Investments** bucket allocation, and forecast upcoming expenses.
  - Impact & Deliverables: Complete AA consent & data-flow specification, salary-detection & bucket allocation logic, and expense prediction & low-balance warning surfaces.
  - Tech Stack: India Account Aggregator (AA) Framework, Financial Categorization, Cashflow ML, Product Architecture.
  - Links: Portfolio Case Study (/work/stipens).

- **HealthSync — Accessible Healthcare App Concept** (2025 · End-to-End UI/UX Case Study):
  - Problem: Existing healthcare platforms are fragmented and confusing, creating major accessibility gaps for elderly and rural patients.
  - Solution: Conducted stakeholder interviews (doctors, hospital admins), competitive benchmarking (**Practo**, **Apollo 24/7**, **1mg**, **Mfine**), surveys, and usability testing across **5 personas** (Priya, Dr. Mehta, Raju, Anita, Admin) and a **7-stage patient care journey**, then designed a calm, high-contrast **iPhone 15 Pro** mobile design system.
  - Impact & Deliverables: **17 high-fidelity iPhone 15 Pro screens** showcased on this portfolio covering onboarding, 4-step profile creation (with live BMI & ICE emergency contact), vitals dashboard, doctor search, telehealth appointments, and medication tracking.
  - Tech Stack: UX Research, Figma, HTML/CSS, Usability Testing, Design Systems.
  - Links: Portfolio Case Study (/work/healthsync).

- **ATS Resume Tailoring Tool** (2025 · Working Browser AI Utility):
  - Problem: Job seekers need fast, factual ATS alignment against job descriptions without setting up a backend or letting AI fabricate experience.
  - Solution: Built a zero-backend, single-file HTML/JS browser tool powered by the **Anthropic Claude API** with structured prompts for resume parsing, JD keyword-gap scoring, and side-by-side factual bullet tailoring.
  - Impact & Deliverables: Self-contained browser utility with instant, ATS-readable PDF export via **jsPDF**.
  - Tech Stack: HTML/JS, Anthropic Claude API, Prompt Engineering, jsPDF.
  - Links: Portfolio Case Study (/work/ats-resume-tailor).

- **Design Systems, Posters & Community Visuals** (2024 · Freelance · GDSC-LPU · TEDxLPU):
  - Problem: Campus tech communities and events needed cohesive visual branding and accessible event collateral across multiple formats.
  - Solution: Created event identities, posters, stage visuals, and UI/UX explorations using **Figma**, **Adobe Photoshop**, **Canva**, and **ProtoPie**.
  - Impact & Deliverables: Branding for **10+ GDSC-LPU technical events**, **TEDxLPU "Reflection"** (**6 speakers**), and **Technocean'23** (3-day university tech fest).
  - Links: Portfolio Case Study (/work/design-visuals).

5. EDUCATION, CERTIFICATIONS & HONORS
- **Product Management with Generative & Agentic AI** — BITS School of Management (**BITSoM**), Mumbai (Dec 2025 – Jun 2026).
- **B.Tech, Computer Science & Engineering** — Lovely Professional University (**LPU**), Phagwara, Punjab (Jun 2020 – May 2024).
- Certifications: BITSoM Gen & Agentic AI PM (2025–2026), App Development using Flutter (Programming Pathshala, 2023), C/C++ Fundamentals (Board Infinity, 2021), Figma for UX Design / MongoDB Essential Training / C++ Essential Training (LinkedIn Learning).
- Honors & Leadership:
  - **Smart India Hackathon 2023** — National Finalist.
  - **National Youth Parliament 2022** — National Finalist.
  - **GDSC LPU** — Core Team Member (Technical Writer, Graphic Designer, Public Speaker · Dec 2021 – Apr 2024 · **10+ technical events**).
  - **TEDxLPU "Reflection"** — Production & Designer (Feb 2022 – Oct 2022 · **6 speakers**).
  - **Technocean'23** — Technical Coordinator & UI/UX Designer; **Tanzanite LPU** — Core Member (Mar 2021 – Feb 2022).

6. CONTACT INFO
- Email: suman766deepti@gmail.com
- Phone: +91 8002766794
- LinkedIn: https://linkedin.com/in/deepti-suman
- GitHub: https://github.com/deeptisuman
- Location & Availability: India (IST / GMT+5:30 · typically replies within 24 hours; open to AI PM & AI Product Engineer internships and full-time roles).

PORTFOLIO ACTION TRIGGERS (IMPORTANT):
Whenever it helps the visitor jump straight to a case study, resume, or contact form, append 1 or 2 action tags on their own line at the VERY END of your response using this exact syntax:
- [[ACTION:open_work|Explore All Projects]]
- [[ACTION:open_project:tripezza|View Tripezza Case Study]]
- [[ACTION:open_project:uplyfox|View UplyFox Case Study]]
- [[ACTION:open_project:healthsync|View HealthSync UI Flows]]
- [[ACTION:open_project:stipens|View Stipens Fintech]]
- [[ACTION:open_project:ats-resume-tailor|View ATS Resume Tailor]]
- [[ACTION:open_project:design-visuals|View Design Visuals]]
- [[ACTION:open_popup:about|Open About & Skills]]
- [[ACTION:open_popup:resume|View Printable Resume]]
- [[ACTION:open_popup:contact|Open Contact Form]]
- [[ACTION:open_popup:gallery|Open UI Gallery]]

Only include relevant action tags (maximum 2 per reply), and place them strictly at the end after your prose and follow-up suggestion.`;

interface IncomingChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

let cachedClient: GoogleGenAI | null = null;
let cachedApiKey = '';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (cachedClient && cachedApiKey === apiKey) {
    return cachedClient;
  }
  cachedApiKey = apiKey;
  cachedClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  return cachedClient;
}

function extractTextFromResponse(chunk: {
  text?: string;
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string; thought?: boolean }>;
    };
  }>;
}): string {
  try {
    if (typeof chunk.text === 'string' && chunk.text.length > 0) {
      return chunk.text;
    }
  } catch {
    // Fall back to reading non-thought text parts directly
  }
  const parts = chunk.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts
    .filter((p) => !p.thought && typeof p.text === 'string')
    .map((p) => p.text)
    .join('');
}

function normalizeContents(
  messages: IncomingChatMessage[]
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const normalized: Array<{ role: 'user' | 'model'; text: string }> = [];

  for (const msg of messages) {
    const role: 'user' | 'model' = msg.role === 'assistant' ? 'model' : 'user';
    const text = msg.content.trim();
    if (!text) continue;

    // Gemini expects conversation turns to begin with a user turn
    if (normalized.length === 0 && role === 'model') {
      continue;
    }

    const prev = normalized[normalized.length - 1];
    if (prev && prev.role === role) {
      prev.text = `${prev.text}\n\n${text}`;
    } else {
      normalized.push({ role, text });
    }
  }

  return normalized.map((item) => ({
    role: item.role,
    parts: [{ text: item.text }],
  }));
}

function getHttpErrorStatus(err: unknown): number | undefined {
  if (!err || typeof err !== 'object') return undefined;
  const e = err as { status?: number; code?: number; statusCode?: number };
  return e.status ?? e.statusCode ?? (typeof e.code === 'number' ? e.code : undefined);
}

function isRetryableForFailover(err: unknown): boolean {
  const status = getHttpErrorStatus(err);
  if (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return true;
  }
  const msg = err instanceof Error ? err.message : String(err ?? '');
  return /ECONNRESET|ETIMEDOUT|fetch failed|UNAVAILABLE|INTERNAL|RESOURCE_EXHAUSTED/i.test(
    msg
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    const key = process.env.GEMINI_API_KEY?.trim();
    const configured = Boolean(key && key !== 'MY_GEMINI_API_KEY');
    res.json({ status: 'ok', mascot: 'Tara', aiConfigured: configured });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Gemini API key is not configured yet. Please check your GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    const body = req.body as {
      messages?: IncomingChatMessage[];
      currentPath?: string;
    };
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const trimmedMessages = rawMessages
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-8);

    const contents = normalizeContents(trimmedMessages);
    if (contents.length === 0) {
      res.status(400).json({ error: 'Please enter a message for Tara.' });
      return;
    }

    const pageContext =
      typeof body?.currentPath === 'string' && body.currentPath.trim()
        ? `\n\nCURRENT VISITOR LOCATION ON PORTFOLIO: ${body.currentPath}`
        : '';

    const systemInstruction = TARA_SYSTEM_INSTRUCTION + pageContext;

    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();
    res.write(': connected\n\n');

    const writeEvent = (payload: Record<string, unknown>) => {
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
      }
    };

    try {
      let emittedChars = 0;
      let lastFinishReason = '';
      let primaryError: unknown = null;
      let lastError: unknown = null;

      const modelAttempts: Array<{
        model: string;
        thinkingLevel: ThinkingLevel;
        backoffMs: number;
      }> = [
        { model: 'gemini-3.1-flash-lite', thinkingLevel: ThinkingLevel.MINIMAL, backoffMs: 250 },
        { model: 'gemini-4-hydrogen', thinkingLevel: ThinkingLevel.LOW, backoffMs: 0 },
      ];

      for (let i = 0; i < modelAttempts.length; i++) {
        const { model, thinkingLevel, backoffMs } = modelAttempts[i];
        try {
          const stream = await ai.models.generateContentStream({
            model,
            contents,
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel },
            },
          });

          for await (const chunk of stream) {
            if (res.writableEnded) break;
            const finishReason = chunk.candidates?.[0]?.finishReason;
            if (finishReason) {
              lastFinishReason = String(finishReason);
            }
            const delta = extractTextFromResponse(chunk);
            if (delta) {
              emittedChars += delta.length;
              writeEvent({ type: 'delta', text: delta });
            }
          }

          lastError = null;
          break;
        } catch (attemptErr) {
          if (i === 0) primaryError = attemptErr;
          lastError = attemptErr;
          const hasNextAttempt = i < modelAttempts.length - 1;
          if (
            emittedChars === 0 &&
            hasNextAttempt &&
            isRetryableForFailover(attemptErr)
          ) {
            if (backoffMs > 0) {
              await delay(backoffMs);
            }
            continue;
          }
          if (
            i === modelAttempts.length - 1 &&
            primaryError &&
            getHttpErrorStatus(primaryError) === 503 &&
            getHttpErrorStatus(attemptErr) === 429
          ) {
            throw primaryError;
          }
          throw attemptErr;
        }
      }

      if (lastError) {
        throw lastError;
      }

      // If streaming completed without emitting visible text, perform a single
      // non-streaming generateContent call before erroring.
      if (emittedChars === 0 && !res.writableEnded) {
        console.warn(
          '[Tara /api/chat] Stream returned 0 text chars; attempting non-streaming generateContent',
          { lastFinishReason }
        );
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          },
        });
        const fallbackText = extractTextFromResponse(fallbackRes);
        if (fallbackText) {
          emittedChars += fallbackText.length;
          writeEvent({ type: 'delta', text: fallbackText });
        } else {
          const reason =
            fallbackRes.candidates?.[0]?.finishReason ||
            fallbackRes.promptFeedback?.blockReason ||
            lastFinishReason ||
            'EMPTY_RESPONSE';
          console.error('[Tara /api/chat] Gemini returned empty text', { reason });
          writeEvent({
            type: 'error',
            error:
              'Tara could not generate a reply for that prompt right now. Please try rephrasing or ask another question.',
          });
          res.end();
          return;
        }
      }

      if (!res.writableEnded) {
        writeEvent({ type: 'done' });
        res.end();
      }
    } catch (err: unknown) {
      const errObj = err as { status?: number; message?: string };
      const status = getHttpErrorStatus(err);
      const rawMessage = errObj?.message || String(err ?? '');
      let userMessage =
        'Tara ran into a hiccup reaching the AI service. Please try again in a moment.';

      if (
        status === 401 ||
        status === 403 ||
        status === 400 ||
        /API_KEY_INVALID|PERMISSION_DENIED/i.test(rawMessage)
      ) {
        userMessage =
          'Unable to authenticate with the Gemini API. Please check your GEMINI_API_KEY in Settings > Secrets.';
      } else if (status === 429 || /RESOURCE_EXHAUSTED/i.test(rawMessage)) {
        userMessage =
          'Tara is getting lots of questions right now (rate limit reached). Please wait a few seconds and try again.';
      } else if (status === 503 || /UNAVAILABLE|high demand/i.test(rawMessage)) {
        userMessage =
          'The AI service is experiencing temporary high demand right now. Please try again in a few seconds.';
      } else if (status === 404 || /NOT_FOUND/i.test(rawMessage)) {
        userMessage =
          'The configured AI model is currently unavailable. Please try again shortly.';
      }

      console.error('[Tara /api/chat error]', { status, message: rawMessage });
      if (!res.writableEnded) {
        writeEvent({ type: 'error', error: userMessage });
        res.end();
      }
    }
  });

  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  let viteServer: {
    middlewares: (req: Request, res: Response, next: NextFunction) => void;
    close: () => Promise<void>;
  } | null = null;

  if (!IS_PROD) {
    const viteReady = import('vite')
      .then(({ createServer: createViteServer }) =>
        createViteServer({
          server: { middlewareMode: true },
          appType: 'spa',
        })
      )
      .then((vite) => {
        viteServer = vite;
        return vite;
      });

    // Attach middleware immediately so port binds before Vite finishes cold boot
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (viteServer) {
        viteServer.middlewares(req, res, next);
        return;
      }
      viteReady
        .then((vite) => vite.middlewares(req, res, next))
        .catch(next);
    });

    viteReady.catch((err) => {
      console.error('Failed to initialize Vite dev middleware:', err);
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const httpServer = app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  const shutdown = () => {
    httpServer.close(() => {
      if (viteServer) {
        viteServer.close().finally(() => process.exit(0));
      } else {
        process.exit(0);
      }
    });
    setTimeout(() => process.exit(0), 2000).unref();
  };

  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

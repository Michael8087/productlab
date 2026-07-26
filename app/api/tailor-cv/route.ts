import { NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";
import { CV_KNOWLEDGE_BASE } from "@/lib/cv-knowledge-base";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 6000;
const DAILY_LIMIT = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

// In-memory per-IP counter. Resets 24h after an IP's first run in the current
// window. Good enough for a low-traffic public demo; not durable across
// serverless cold starts or multiple regions.
const requestLog = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = requestLog.get(ip);

  if (!entry || now - entry.windowStart > DAY_MS) {
    requestLog.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

const SYSTEM_PROMPT = `You are drafting a CV for Michael Miňovský, based strictly on the
verified background information provided below. This is a public-facing demo —
be helpful and produce a genuinely well-tailored result, but follow these rules
without exception:

1. Never invent employers, job titles, dates, metrics, or achievements that are
   not present in the CANDIDATE BACKGROUND below. You may reorder, re-emphasize,
   select which facts to foreground, and rewrite the framing/summary language —
   but every factual claim must trace back to the source material.
2. If asked to emphasize skills or experience Michael doesn't have evidence for
   in the background below, acknowledge the gap in the output rather than
   fabricating experience to fit.
3. Output plain, clearly formatted text (not JSON, not markdown code fences)
   with clear section headers: Headline, About Me, Experience, Education,
   Skills, Languages, Certifications. Keep bullet points concise and results-oriented.
4. If a CURRENT DRAFT is provided, revise that draft according to the refinement
   instructions rather than starting over from scratch, unless the instructions
   say otherwise.

CANDIDATE BACKGROUND (source of truth — do not go beyond this):
${CV_KNOWLEDGE_BASE}`;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: `Daily limit reached (${DAILY_LIMIT} runs per day). Try again tomorrow.` },
      { status: 429 }
    );
  }

  let body: { jobDescription?: string; refinementPrompt?: string; currentCv?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const jobDescription = (body.jobDescription ?? "").slice(0, MAX_FIELD_LENGTH).trim();
  const refinementPrompt = (body.refinementPrompt ?? "").slice(0, MAX_FIELD_LENGTH).trim();
  const currentCv = (body.currentCv ?? "").slice(0, MAX_FIELD_LENGTH).trim();

  if (!jobDescription && !currentCv) {
    return NextResponse.json(
      { error: "Paste a job description to generate a CV from." },
      { status: 400 }
    );
  }

  const userMessage = [
    jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : null,
    currentCv ? `CURRENT DRAFT (revise this):\n${currentCv}` : null,
    refinementPrompt ? `ADDITIONAL INSTRUCTIONS:\n${refinementPrompt}` : null,
    !currentCv
      ? "Produce a complete tailored CV from the job description above."
      : "Revise the current draft per the additional instructions above, keeping it grounded in the same source facts."
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const cv = await callClaude({ system: SYSTEM_PROMPT, userMessage, maxTokens: 1800 });
    return NextResponse.json({ cv, remaining });
  } catch (err) {
    console.error("tailor-cv error:", err);
    return NextResponse.json(
      { error: "Something went wrong generating the CV. Try again in a moment." },
      { status: 500 }
    );
  }
}

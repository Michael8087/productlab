import { NextResponse } from "next/server";
import { callClaude } from "@/lib/anthropic";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 4000;
const MAX_TRANSCRIPT_LENGTH = 2000;

interface Suggestion {
  type: "strength" | "objection" | "info";
  title: string;
  text: string;
}

function buildSystemPrompt(kb: Record<string, string>, recent: string[]) {
  return `Jsi zkušený realitní makléř a diskrétní kouč prodávajícího. Prodávající má v uchu/na displeji tvoje rady během prohlídky domu se zájemci. Mluv česky, stručně a prakticky.

ZNALOSTNÍ BÁZE O DOMĚ:
Základní informace: ${kb.basics}
Silné stránky: ${kb.strengths}
Slabiny a protiargumenty: ${kb.weaknesses}
Časté otázky: ${kb.faq}
SOUKROMÁ strategie prodávajícího (NIKDY nenavrhuj tyto informace vyslovit nahlas, používej je jen pro taktiku): ${kb.strategy}

Odpověz POUZE validním JSON polem 1–3 návrhů, bez markdownu, bez komentářů, přesně v tomto tvaru:
[{"type":"strength"|"objection"|"info","title":"krátký titulek (max 6 slov)","text":"co konkrétně říct nebo udělat, 1-3 věty, přirozený mluvený jazyk"}]

Typy: "strength" = připomeň přednost relevantní k situaci, "objection" = reakce na námitku/pochybnost zájemce, "info" = odpověď na otázku či taktická rada.
Nenavrhuj nic z tohoto, co už bylo navrženo:
${recent.length ? recent.join("\n") : "(nic)"}`;
}

function buildUserMessage(convo: string, manual: boolean) {
  if (!convo) {
    return "Konverzace ještě nezačala nebo nebyl zachycen přepis. Navrhni 2-3 silné úvodní talking points pro začátek prohlídky.";
  }
  const ask = manual
    ? 'Prodávající právě stiskl tlačítko "Poraď mi teď" — dej nejrelevantnější radu k aktuální situaci.'
    : "Navrhni, co teď říct, jen pokud je to k situaci relevantní.";
  return `Přepis poslední části konverzace se zájemci (může obsahovat chyby rozpoznávání řeči):\n"""${convo}"""\n\n${ask}`;
}

function parseSuggestions(raw: string): Suggestion[] {
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((s): s is Suggestion => !!s && typeof s.text === "string" && typeof s.title === "string")
    .map((s) => ({
      type: (["strength", "objection", "info"] as const).includes(s.type) ? s.type : "info",
      title: s.title.slice(0, 120),
      text: s.text.slice(0, 600)
    }));
}

export async function POST(req: Request) {
  let body: {
    basics?: string;
    strengths?: string;
    weaknesses?: string;
    faq?: string;
    strategy?: string;
    transcript?: string;
    recentSuggestions?: string[];
    manual?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const kb = {
    basics: (body.basics ?? "").slice(0, MAX_FIELD_LENGTH).trim(),
    strengths: (body.strengths ?? "").slice(0, MAX_FIELD_LENGTH).trim(),
    weaknesses: (body.weaknesses ?? "").slice(0, MAX_FIELD_LENGTH).trim(),
    faq: (body.faq ?? "").slice(0, MAX_FIELD_LENGTH).trim(),
    strategy: (body.strategy ?? "").slice(0, MAX_FIELD_LENGTH).trim()
  };

  if ((kb.basics + kb.strengths + kb.weaknesses + kb.faq).trim().length < 20) {
    return NextResponse.json(
      { error: "Fill in the property details first (basics, strengths, weaknesses, FAQ)." },
      { status: 400 }
    );
  }

  const transcript = (body.transcript ?? "").slice(-MAX_TRANSCRIPT_LENGTH).trim();
  const recent = Array.isArray(body.recentSuggestions) ? body.recentSuggestions.slice(-6) : [];

  try {
    const raw = await callClaude({
      system: buildSystemPrompt(kb, recent),
      userMessage: buildUserMessage(transcript, !!body.manual),
      maxTokens: 1000
    });
    const suggestions = parseSuggestions(raw);
    if (!suggestions.length) {
      return NextResponse.json({ error: "Couldn't parse a suggestion, try again." }, { status: 502 });
    }
    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("makler-advice error:", err);
    return NextResponse.json(
      { error: "Something went wrong getting advice. Try again in a moment." },
      { status: 500 }
    );
  }
}

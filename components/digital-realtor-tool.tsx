"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square, Sparkles, Home } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "./container";
import { Reveal } from "./reveal";

const STORAGE_KEY = "digital-realtor-kb";
const AUTO_ADVICE_INTERVAL_MS = 12000;
const AUTO_ADVICE_MIN_NEW_CHARS = 120;
const MAX_CARDS = 12;

interface KnowledgeBase {
  basics: string;
  strengths: string;
  weaknesses: string;
  faq: string;
  strategy: string;
}

interface Suggestion {
  type: "strength" | "objection" | "info";
  title: string;
  text: string;
}

const EMPTY_KB: KnowledgeBase = { basics: "", strengths: "", weaknesses: "", faq: "", strategy: "" };

const TYPE_LABEL: Record<Suggestion["type"], string> = {
  strength: "Přednost",
  objection: "Reakce na námitku",
  info: "Tip"
};

const TYPE_BORDER: Record<Suggestion["type"], string> = {
  strength: "border-l-amber-500",
  objection: "border-l-red-400",
  info: "border-l-line-strong"
};

function kbFilled(kb: KnowledgeBase) {
  return (kb.basics + kb.strengths + kb.weaknesses + kb.faq).trim().length > 20;
}

export function DigitalRealtorTool() {
  const [tab, setTab] = useState<"live" | "setup">("setup");
  const [kb, setKb] = useState<KnowledgeBase>(EMPTY_KB);
  const [savedFlash, setSavedFlash] = useState(false);

  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [status, setStatus] = useState<{ text: string; error?: boolean } | null>(null);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [advising, setAdvising] = useState(false);

  const recognitionRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const transcriptRef = useRef("");
  const lastAdvisedLenRef = useRef(0);
  const shownRef = useRef<string[]>([]);
  const advisingRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setKb(JSON.parse(raw));
    } catch {
      // ignore
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported(!!SR);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  function saveKb() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(kb));
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }

  function initRecognition() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const rec = new SR();
    rec.lang = "cs-CZ";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let interimChunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          transcriptRef.current += t + " ";
          setTranscript(transcriptRef.current);
        } else {
          interimChunk += t;
        }
      }
      setInterim(interimChunk);
    };
    rec.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        setStatus({ text: "Přístup k mikrofonu byl zamítnut. Povolte ho v nastavení prohlížeče.", error: true });
        stopListening();
      }
    };
    rec.onend = () => {
      if (listeningRef.current) {
        try {
          rec.start();
        } catch {
          // ignore
        }
      }
    };
    return rec;
  }

  function toggleListening() {
    listeningRef.current ? stopListening() : startListening();
  }

  function startListening() {
    if (!kbFilled(kb)) {
      setStatus({ text: 'Nejdřív vyplňte a uložte informace v záložce "O domě".', error: true });
      setTab("setup");
      return;
    }
    if (!recognitionRef.current) recognitionRef.current = initRecognition();
    if (!recognitionRef.current) {
      setStatus({ text: "Tento prohlížeč nepodporuje rozpoznávání řeči. Použijte Chrome nebo Safari.", error: true });
      return;
    }
    try {
      recognitionRef.current.start();
    } catch {
      // ignore
    }
    listeningRef.current = true;
    setListening(true);
    setStatus({ text: "Poslouchám… návrhy se objeví automaticky." });
    autoTimerRef.current = setInterval(() => {
      if (transcriptRef.current.length - lastAdvisedLenRef.current > AUTO_ADVICE_MIN_NEW_CHARS) {
        requestAdvice(false);
      }
    }, AUTO_ADVICE_INTERVAL_MS);
  }

  function stopListening() {
    listeningRef.current = false;
    setListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    setStatus({ text: "Poslech ukončen." });
  }

  async function requestAdvice(manual: boolean) {
    if (advisingRef.current) return;
    if (!kbFilled(kb)) {
      setStatus({ text: 'Nejdřív vyplňte a uložte informace v záložce "O domě".', error: true });
      setTab("setup");
      return;
    }
    advisingRef.current = true;
    setAdvising(true);

    try {
      const res = await fetch("/api/makler-advice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...kb,
          transcript: transcriptRef.current.slice(-1800),
          recentSuggestions: shownRef.current,
          manual
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nepodařilo se získat radu.");

      const arr: Suggestion[] = data.suggestions || [];
      if (arr.length) {
        arr.forEach((s) => shownRef.current.push(s.title || s.text.slice(0, 60)));
        setSuggestions((prev) => [...arr, ...prev].slice(0, MAX_CARDS));
        lastAdvisedLenRef.current = transcriptRef.current.length;
        if (manual) setStatus(null);
      }
    } catch (err) {
      if (manual) {
        setStatus({
          text: err instanceof Error ? err.message : "Nepodařilo se získat radu. Zkuste to za chvíli znovu.",
          error: true
        });
      }
    } finally {
      advisingRef.current = false;
      setAdvising(false);
    }
  }

  return (
    <section className="border-t border-line bg-mist/50">
      <Container className="py-16 md:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wide text-amber-500">Try it live</p>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Run the Digital Realtor
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Fill in a property, then start listening — Claude suggests what to
            say next.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 overflow-hidden rounded-xl border border-line bg-paper">
          <div className="flex border-b border-line">
            <button
              onClick={() => setTab("setup")}
              className={clsx(
                "flex-1 px-4 py-3 font-mono text-xs uppercase tracking-wide transition-colors",
                tab === "setup" ? "border-b-2 border-amber-500 text-ink" : "text-muted hover:text-ink"
              )}
            >
              O domě
            </button>
            <button
              onClick={() => setTab("live")}
              className={clsx(
                "flex-1 px-4 py-3 font-mono text-xs uppercase tracking-wide transition-colors",
                tab === "live" ? "border-b-2 border-amber-500 text-ink" : "text-muted hover:text-ink"
              )}
            >
              Prohlídka
            </button>
          </div>

          {tab === "setup" ? (
            <div className="space-y-5 p-6">
              <Field
                label="Základní informace"
                value={kb.basics}
                onChange={(v) => setKb((k) => ({ ...k, basics: v }))}
                placeholder="Např.: Rodinný dům 5+1, 180 m², pozemek 900 m², Ostrava-Poruba, postaven 1998…"
              />
              <Field
                label="Silné stránky"
                value={kb.strengths}
                onChange={(v) => setKb((k) => ({ ...k, strengths: v }))}
                placeholder="Např.: klidná slepá ulice, škola 5 min pěšky, nová okna s trojskly…"
              />
              <Field
                label="Slabiny a jak na ně reagovat"
                value={kb.weaknesses}
                onChange={(v) => setKb((k) => ({ ...k, weaknesses: v }))}
                placeholder="Např.: Starší koupelna → cena to zohledňuje…"
                hint='Formát "slabina → protiargument" pomůže AI navrhovat pohotové reakce na námitky.'
              />
              <Field
                label="Časté otázky a odpovědi"
                value={kb.faq}
                onChange={(v) => setKb((k) => ({ ...k, faq: v }))}
                placeholder="Např.: Proč prodáváte? → Stěhujeme se za prací…"
              />
              <Field
                label="Vyjednávací strategie (soukromé)"
                value={kb.strategy}
                onChange={(v) => setKb((k) => ({ ...k, strategy: v }))}
                placeholder="Např.: minimální akceptovatelná cena 8,4 mil., preferuji rychlý prodej…"
                hint="Tyto informace AI použije jen pro vás — nikdy je nenavrhne říct nahlas."
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={saveKb}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
                >
                  Uložit
                </button>
                <span
                  className={clsx(
                    "font-mono text-xs uppercase tracking-wide text-amber-600 transition-opacity",
                    savedFlash ? "opacity-100" : "opacity-0"
                  )}
                >
                  Uloženo ✓
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {!supported ? (
                <p className="mb-4 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                  Tento prohlížeč nepodporuje rozpoznávání řeči. Zkuste Chrome nebo Safari.
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={toggleListening}
                  disabled={!supported}
                  className={clsx(
                    "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
                    listening ? "bg-red-500" : "bg-ink"
                  )}
                >
                  {listening ? <Square size={14} /> : <Mic size={14} />}
                  {listening ? "Ukončit poslech" : "Zahájit poslech"}
                </button>
                <button
                  onClick={() => requestAdvice(true)}
                  disabled={advising}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-line-strong hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {advising ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Poraď mi teď
                </button>
              </div>

              {status ? (
                <p className={clsx("mt-3 text-center text-xs", status.error ? "text-red-500" : "text-muted")}>
                  {status.text}
                </p>
              ) : null}

              <div className="mt-5 space-y-3">
                {suggestions.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-line py-10 text-center text-sm text-muted">
                    <Home size={22} />
                    <p className="max-w-xs">
                      Nejdřív vyplňte záložku &quot;O domě&quot;. Pak spusťte poslech — během
                      prohlídky vám sem budou přicházet návrhy, co říct.
                    </p>
                  </div>
                ) : (
                  suggestions.map((s, i) => (
                    <div
                      key={i}
                      className={clsx(
                        "rounded-lg border border-line border-l-4 bg-paper p-4 shadow-sm",
                        TYPE_BORDER[s.type]
                      )}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                        {TYPE_LABEL[s.type]}
                      </p>
                      <h3 className="mt-1 font-display text-sm font-medium text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                    </div>
                  ))
                )}
              </div>

              <details className="mt-5">
                <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wide text-muted">
                  Přepis konverzace
                </summary>
                <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink">
                  {transcript || interim ? (
                    <>
                      {transcript}
                      {interim ? <span className="italic text-muted"> {interim}</span> : null}
                    </>
                  ) : (
                    <span className="italic text-muted">Zatím žádný přepis…</span>
                  )}
                </div>
              </details>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wide text-muted">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={4000}
        className="mt-2 w-full resize-y rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink placeholder:text-muted focus:border-amber-500 focus:outline-none"
      />
      {hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Copy, Check, Sparkles, RotateCcw } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const COOLDOWN_MS = 12000;

export function CvTailoringTool() {
  const [jobDescription, setJobDescription] = useState("");
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [cv, setCv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const [, forceTick] = useState(0);

  const onCooldown = Date.now() < cooldownUntil;

  async function generate() {
    setError(null);

    if (!jobDescription.trim() && !cv.trim()) {
      setError("Paste a job description first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tailor-cv", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          refinementPrompt,
          currentCv: cv
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setCv(data.cv);
      setRefinementPrompt("");
      const until = Date.now() + COOLDOWN_MS;
      setCooldownUntil(until);
      setTimeout(() => forceTick((n) => n + 1), COOLDOWN_MS + 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setJobDescription("");
    setRefinementPrompt("");
    setCv("");
    setError(null);
  }

  async function copyCv() {
    await navigator.clipboard.writeText(cv);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const buttonDisabled = loading || onCooldown;

  return (
    <section className="border-t border-line bg-mist/50">
      <Container className="py-16 md:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wide text-amber-500">Try it live</p>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Run the CV Tailoring Agent
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            This calls the real Claude API, grounded only in my actual background —
            it won&apos;t invent experience I don&apos;t have. Paste a job posting, generate a
            draft, then use the third field to steer it (tone, what to emphasize,
            length) and regenerate as many times as you like.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wide text-muted">
                Job description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job posting here…"
                rows={10}
                maxLength={6000}
                className="mt-2 w-full resize-y rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink placeholder:text-muted focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wide text-muted">
                Steer it (optional)
              </label>
              <textarea
                value={refinementPrompt}
                onChange={(e) => setRefinementPrompt(e.target.value)}
                placeholder={
                  cv
                    ? "e.g. “Lead more with the analytics work, tighten the About Me”"
                    : "e.g. “Emphasize AI product experience over dashboards”"
                }
                rows={4}
                maxLength={6000}
                className="mt-2 w-full resize-y rounded-lg border border-line bg-paper p-3 text-sm leading-relaxed text-ink placeholder:text-muted focus:border-amber-500 focus:outline-none"
              />
              <p className="mt-2 text-xs text-muted">
                Used alongside the job description on the first draft; on later
                runs it steers the CV already in the output field.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={generate}
                disabled={buttonDisabled}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Sparkles size={14} />
                )}
                {cv ? "Regenerate" : "Generate CV"}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-ink transition-colors hover:border-line-strong hover:bg-mist"
              >
                <RotateCcw size={14} />
                Start over
              </button>
              {onCooldown && !loading ? (
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                  One moment before the next run…
                </span>
              ) : null}
            </div>

            {error ? (
              <p className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                {error}
              </p>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] uppercase tracking-wide text-muted">
                Generated CV
              </label>
              {cv ? (
                <button
                  onClick={copyCv}
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted hover:text-ink"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              ) : null}
            </div>
            <textarea
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              readOnly={loading}
              placeholder="Your tailored CV will appear here — feel free to hand-edit it, it feeds back into the next regeneration."
              rows={20}
              className="mt-2 w-full resize-y rounded-lg border border-line bg-paper p-3 font-mono text-[13px] leading-relaxed text-ink placeholder:text-muted focus:border-amber-500 focus:outline-none"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

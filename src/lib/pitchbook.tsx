import {
  createContext,
  useContext,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { Lock, Sparkles } from "lucide-react";

/**
 * Whether the current org has PitchBook access. Drives the two panel states:
 *  - true  → PitchBook-sourced sections render, each with a subtle source tag.
 *  - false → those sections are withheld; a single quiet promo takes their place.
 */
const PitchbookContext = createContext<boolean>(true);

export function PitchbookProvider({
  connected,
  children,
}: PropsWithChildren<{ connected: boolean }>) {
  return (
    <PitchbookContext.Provider value={connected}>
      {children}
    </PitchbookContext.Provider>
  );
}

export function usePitchbookConnected() {
  return useContext(PitchbookContext);
}

/** The PitchBook source mark — a small muted dot, kept quiet for restraint. */
export function PitchbookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <circle cx="5" cy="5" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Subtle "this came from PitchBook" signal. Sits under a field value or beside a
 * section heading. Muted by default; the tooltip carries the freshness detail.
 */
export function SourceTag({
  updated,
  className = "",
}: {
  updated?: string;
  className?: string;
}) {
  return (
    <span
      className={`group inline-flex items-center gap-1 text-[11px] leading-none text-slate-400 ${className}`}
      title={`Sourced from PitchBook${updated ? ` · Updated ${updated}` : ""}`}
    >
      <PitchbookGlyph className="h-1.5 w-1.5 text-slate-400 transition-colors group-hover:text-slate-500" />
      <span>via PitchBook</span>
    </span>
  );
}

/**
 * Wraps a PitchBook-only section. Renders children when connected; renders
 * nothing when not (the data is withheld rather than teased).
 */
export function PitchbookGate({ children }: { children: ReactNode }) {
  const connected = usePitchbookConnected();
  if (!connected) return null;
  return <>{children}</>;
}

/**
 * Single quiet promo shown once per tab when PitchBook is not connected, so the
 * absence reads as "available to unlock" rather than "missing".
 */
export function PitchbookPromo({ summary }: { summary: string }) {
  const connected = usePitchbookConnected();
  if (connected) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
        <Lock className="h-4 w-4 text-slate-400" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-slate-700">
          Enrich this company with PitchBook
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">
          {summary}
        </p>
        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-2.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-brand-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Connect PitchBook
        </button>
      </div>
    </div>
  );
}

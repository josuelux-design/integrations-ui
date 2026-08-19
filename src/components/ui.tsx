import type { ReactNode } from "react";
import { SourceTag } from "../lib/pitchbook";

/** Initials/avatar circle for people. */
export function Avatar({
  name,
  src,
  size = 40,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover ring-1 ring-slate-200"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-amber-200 font-medium text-amber-900"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </span>
  );
}

/** Small pill for tags, keywords, and competitors. */
export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "slate";
}) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    brand: "bg-brand-50 text-brand-700 ring-brand-100",
    slate: "bg-white text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium leading-none ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/**
 * Section heading with optional PitchBook source tag on the right. This is the
 * primary place the source signal lives for enriched sections.
 */
export function SectionHeading({
  title,
  source,
  updated,
  action,
}: {
  title: string;
  source?: boolean;
  updated?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-medium text-slate-900">{title}</h3>
        {source && <SourceTag updated={updated} />}
      </div>
      {action}
    </div>
  );
}

/** Labeled key/value used in the details grid. */
export function Field({
  label,
  value,
  source,
  updated,
}: {
  label: string;
  value: ReactNode;
  source?: boolean;
  updated?: string;
}) {
  return (
    <div>
      <p className="text-[13px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-[14px] text-slate-900">{value}</p>
      {source && <SourceTag updated={updated} className="mt-1" />}
    </div>
  );
}

/** Metric tile used in the snapshot row. */
export function StatCard({
  label,
  value,
  sub,
  source,
  updated,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  source?: boolean;
  updated?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3.5 py-3">
      <p className="text-[12px] text-slate-500">{label}</p>
      <p className="mt-1 text-[18px] font-medium leading-tight text-slate-900">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[12px] text-slate-400">{sub}</p>}
      {source && <SourceTag updated={updated} className="mt-1.5" />}
    </div>
  );
}

/** Divider between stacked sections. */
export function SectionDivider() {
  return <div className="my-6 h-px bg-slate-100" />;
}

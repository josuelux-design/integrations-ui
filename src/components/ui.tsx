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
        <h3 className="text-[16px] font-medium text-slate-900">{title}</h3>
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
      <p className="text-[12px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-[14px] text-slate-900">{value}</p>
      {source && <SourceTag updated={updated} className="mt-1" />}
    </div>
  );
}

/** Tiny inline trend line for a metric series (most-recent-last). */
export function Sparkline({
  data,
  width = 68,
  height = 20,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pad = 2;
  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = pad + (height - pad * 2) * (1 - (d - min) / span);
    return [x, y] as const;
  });
  const path = points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const rising = data[data.length - 1] >= data[0];
  const stroke = rising ? "#059669" : "#e0492f";
  const last = points[points.length - 1];
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={path}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r="1.8" fill={stroke} />
    </svg>
  );
}

/** Metric tile used in the snapshot row. */
export function StatCard({
  label,
  value,
  sub,
  source,
  updated,
  trend,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  source?: boolean;
  updated?: string;
  trend?: number[];
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3.5 py-3">
      <p className="text-[12px] text-slate-500">{label}</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="text-[16px] font-medium leading-tight text-slate-900">
          {value}
        </p>
        {trend && trend.length > 1 && <Sparkline data={trend} />}
      </div>
      {sub && <p className="mt-0.5 text-[12px] text-slate-400">{sub}</p>}
      {source && <SourceTag updated={updated} className="mt-1.5" />}
    </div>
  );
}

/** Divider between stacked sections. */
export function SectionDivider() {
  return <div className="my-6 h-px bg-slate-100" />;
}

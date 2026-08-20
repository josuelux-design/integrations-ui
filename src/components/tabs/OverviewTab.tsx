import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Company, Competitor } from "../../types";
import {
  PitchbookGate,
  PitchbookPromo,
  usePitchbookConnected,
} from "../../lib/pitchbook";
import {
  Chip,
  Field,
  SectionDivider,
  SectionHeading,
  StatCard,
} from "../ui";

function ipoLabel(iso?: string) {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function OverviewTab({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;
  const own = pb.ownership;

  return (
    <div>
      {/* Snapshot — no heading; native bands upgrade to precise figures */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Revenue"
          value={connected ? pb.revenue.value : company.revenueNative.value}
          sub={connected ? pb.revenue.year : company.revenueNative.year}
          source={connected}
          updated={pb.financing.updated}
        />
        <StatCard
          label="Headcount"
          value={connected ? pb.headcount.value : company.headcountNative.value}
          sub={connected ? pb.headcount.year : company.headcountNative.year}
          source={connected}
          updated={pb.financing.updated}
        />
        <StatCard label="Founded" value={company.founded} />
        <StatCard
          label="Ownership"
          value={
            connected ? (own.status === "public" ? "Public" : "Private") : "—"
          }
          sub={
            connected && own.status === "public"
              ? `${own.exchange}: ${own.ticker} · IPO ${ipoLabel(own.ipoDate)}`
              : undefined
          }
          source={connected}
          updated={pb.financing.updated}
        />
      </div>

      <SectionDivider />

      {/* Description — native */}
      <div>
        <SectionHeading title="Description" />
        <p className="text-[14px] leading-relaxed text-slate-600">
          {company.description}
        </p>
      </div>

      <SectionDivider />

      {/* Tags — two origins, kept visually distinct */}
      <div>
        <SectionHeading
          title="Tags"
          action={
            <button className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-600 hover:text-brand-700">
              <Plus className="h-3.5 w-3.5" /> Add tag
            </button>
          }
        />
        {company.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {company.tags.map((t) => (
              <Chip key={t} tone="brand">
                {t}
              </Chip>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-slate-400">No tags yet</p>
        )}

        <PitchbookGate>
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-2">
              <h4 className="text-[12px] font-medium text-slate-500">
                PitchBook tags
              </h4>
            </div>
            <div className="space-y-3">
              <TagGroup label="Sectors" items={pb.tags.sectors} />
              <TagGroup label="Verticals" items={pb.tags.verticals} />
              <TagGroup label="Keywords" items={pb.tags.keywords} />
            </div>
          </div>
        </PitchbookGate>
      </div>

      {/* Competitors — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <CompetitorsSection competitors={pb.competitors} />
      </PitchbookGate>

      {/* One quiet promo stands in for all withheld sections when disconnected */}
      {!connected && (
        <>
          <SectionDivider />
          <PitchbookPromo summary="PitchBook tags, ownership details, competitors, the leadership team, investors, and financing status become available when your workspace is connected to PitchBook." />
        </>
      )}

      <SectionDivider />

      {/* Additional details — native custom fields */}
      <div>
        <SectionHeading title="Additional details" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {company.additionalDetails.map((d) => (
            <Field key={d.label} label={d.label} value={d.value} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-[12px]">
        <a
          href={company.website}
          className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
        >
          Website <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={company.linkedin}
          className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
        >
          LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function TagGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-[12px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {items.map((t) => (
        <Chip key={t} tone="slate">
          {t}
        </Chip>
      ))}
    </div>
  );
}

function CompetitorsSection({ competitors }: { competitors: Competitor[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? competitors : competitors.slice(0, 4);
  return (
    <div>
      <SectionHeading title="Competitors" source />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {shown.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[12px] font-medium text-slate-500">
              {c.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-slate-900">
                {c.name}
              </p>
              {c.descriptor && (
                <p className="truncate text-[12px] text-slate-400">
                  {c.descriptor}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {competitors.length > 4 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2.5 text-[12px] font-medium text-brand-600 hover:text-brand-700"
        >
          {expanded ? "Show less" : `Show all ${competitors.length}`}
        </button>
      )}
    </div>
  );
}

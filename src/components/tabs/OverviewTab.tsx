import { useState } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import type { Company, Competitor } from "../../types";
import {
  PitchbookGate,
  PitchbookPromo,
  usePitchbookConnected,
} from "../../lib/pitchbook";
import {
  Avatar,
  Chip,
  Field,
  SectionDivider,
  SectionHeading,
  StatCard,
} from "../ui";

export function OverviewTab({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;

  return (
    <div>
      {/* Projects summary — unchanged from today */}
      <div className="grid grid-cols-3 gap-3 rounded-xl bg-brand-50/60 px-4 py-3.5 text-center">
        {[
          { n: company.projects.total, l: "Projects" },
          { n: company.projects.open, l: "Open" },
          { n: company.projects.closed, l: "Closed" },
        ].map((c) => (
          <div key={c.l}>
            <p className="text-[18px] font-medium text-brand-700">{c.n}</p>
            <p className="text-[13px] text-slate-500">{c.l}</p>
          </div>
        ))}
      </div>

      {/* Snapshot: native bands, upgraded to precise figures when connected */}
      <div className="mt-5">
        <SectionHeading title="Snapshot" />
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
            value={
              connected ? pb.headcount.value : company.headcountNative.value
            }
            sub={connected ? pb.headcount.year : company.headcountNative.year}
            source={connected}
            updated={pb.financing.updated}
          />
          <StatCard label="Founded" value={company.founded} />
          <StatCard
            label="Financing status"
            value={connected ? pb.financing.status : "—"}
            source={connected}
            updated={pb.financing.updated}
          />
        </div>
      </div>

      <SectionDivider />

      {/* Description — native */}
      <div>
        <SectionHeading title="Description" />
        <p className="text-[14px] leading-relaxed text-slate-600">
          {company.description}
        </p>
      </div>

      {/* Tags — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <div>
          <SectionHeading title="Tags" source updated={pb.financing.updated} />
          <div className="space-y-3">
            <TagGroup label="Sectors" items={pb.tags.sectors} tone="brand" />
            <TagGroup label="Verticals" items={pb.tags.verticals} tone="neutral" />
            <TagGroup label="Keywords" items={pb.tags.keywords} tone="slate" />
          </div>
        </div>
      </PitchbookGate>

      {/* Leadership team — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <div>
          <SectionHeading
            title="Leadership team"
            source
            updated={pb.financing.updated}
            action={
              <button className="text-[13px] font-medium text-brand-600 hover:text-brand-700">
                View all
              </button>
            }
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pb.leadership.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 transition-colors hover:border-slate-200 hover:bg-slate-50"
              >
                <Avatar name={m.name} src={m.avatarUrl} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-slate-900">
                    {m.name}
                  </p>
                  <p className="truncate text-[12.5px] text-slate-500">
                    {m.title}
                  </p>
                </div>
                {m.linkedin && (
                  <Linkedin className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PitchbookGate>

      {/* Competitors — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <CompetitorsSection competitors={pb.competitors} />
      </PitchbookGate>

      {/* One quiet promo stands in for all withheld sections when disconnected */}
      {!connected && (
        <>
          <SectionDivider />
          <PitchbookPromo summary="Tags, leadership team, competitors, investors, and financing status become available when your workspace is connected to PitchBook." />
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

      <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-[13px]">
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

function TagGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "neutral" | "brand" | "slate";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-[12px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {items.map((t) => (
        <Chip key={t} tone={tone}>
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
          className="mt-2.5 text-[13px] font-medium text-brand-600 hover:text-brand-700"
        >
          {expanded ? "Show less" : `Show all ${competitors.length}`}
        </button>
      )}
    </div>
  );
}

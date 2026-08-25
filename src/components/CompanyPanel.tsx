import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Link2,
  Pencil,
  MoreVertical,
  TrendingUp,
  Users,
  Network,
} from "lucide-react";
import type { Company } from "../types";
import { PitchbookProvider, usePitchbookConnected } from "../lib/pitchbook";
import { LinkedInLogo } from "../lib/icons";
import { Avatar } from "./ui";
import { OverviewTab } from "./tabs/OverviewTab";
import { FinancialsTab } from "./tabs/FinancialsTab";
import { PeopleTab } from "./tabs/PeopleTab";
import { ProjectsTab } from "./tabs/ProjectsTab";

const TABS = [
  "Overview",
  "Financials",
  "Notes",
  "Projects",
  "People",
  "Documents",
  "Off Limits",
] as const;
type Tab = (typeof TABS)[number];

export function CompanyPanel({
  company,
  connected,
  onClose,
}: {
  company: Company;
  connected: boolean;
  onClose?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <PitchbookProvider connected={connected}>
      <div className="flex h-[min(88vh,900px)] w-[min(760px,94vw)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Pager row */}
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="w-8" />
          <div className="flex items-center gap-2 text-[14px] text-slate-500">
            <button className="rounded-md p-1 hover:bg-slate-100">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span>
              <span className="font-medium text-slate-700">1</span> of 24
            </span>
            <button className="rounded-md p-1 hover:bg-slate-100">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Header company={company} />
        <Tabs tab={tab} setTab={setTab} />

        {/* Body */}
        <div className="panel-scroll flex-1 overflow-y-auto px-5 py-5">
          {tab === "Overview" && <OverviewTab company={company} />}
          {tab === "Financials" && <FinancialsTab company={company} />}
          {tab === "People" && <PeopleTab company={company} />}
          {tab === "Projects" && <ProjectsTab company={company} />}
          {tab !== "Overview" &&
            tab !== "Financials" &&
            tab !== "People" &&
            tab !== "Projects" && <Placeholder tab={tab} />}
        </div>
      </div>
    </PitchbookProvider>
  );
}

function Header({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;
  return (
    <div className="mx-5 mt-2 rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar name={company.name} src={company.logoUrl} size={52} />
          <div>
            <h2 className="text-[16px] font-medium text-brand-600">
              {company.name}
            </h2>
            <p className="text-[14px] text-slate-600">{company.location}</p>
            {company.tags.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {company.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[12px] font-medium text-brand-700 ring-1 ring-brand-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-[12px] text-slate-400">No tags</p>
            )}
            <div className="mt-2 flex items-center gap-5 text-[12px] text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                {connected ? pb.revenue.value : company.revenueNative.value}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-slate-400" />
                {connected
                  ? pb.headcount.value
                  : company.headcountNative.value}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Network className="h-4 w-4" />-
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <a href={company.website} className="text-slate-400 hover:text-brand-600">
                <Link2 className="h-4 w-4" />
              </a>
              <a href={company.linkedin}>
                <LinkedInLogo className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="rounded-md p-1.5 hover:bg-slate-100 hover:text-brand-600">
            <Pencil className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1.5 hover:bg-slate-100 hover:text-slate-600">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="mt-4 border-b border-slate-100 px-5">
      <div className="flex gap-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative whitespace-nowrap pb-3 text-[14px] transition-colors ${
              tab === t
                ? "font-medium text-brand-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ tab }: { tab: string }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center text-center">
      <p className="text-[16px] font-medium text-slate-500">{tab}</p>
      <p className="mt-1 text-[12px] text-slate-400">
        Not part of this prototype — focus is the Overview and Financials tabs.
      </p>
    </div>
  );
}

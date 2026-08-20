import { Plus } from "lucide-react";
import type { Company, FundingRound, Investor } from "../../types";
import {
  PitchbookGate,
  PitchbookGlyph,
  PitchbookPromo,
  usePitchbookConnected,
} from "../../lib/pitchbook";
import { SectionDivider, SectionHeading, StatCard } from "../ui";

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function FinancialsTab({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;
  const own = pb.ownership;
  const active = pb.investors.filter((i) => i.status === "active");
  const former = pb.investors.filter((i) => i.status === "former");

  return (
    <div>
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
        <StatCard
          label="Ownership"
          value={
            connected ? (own.status === "public" ? "Public" : "Private") : "—"
          }
          sub={
            connected && own.status === "public"
              ? `${own.exchange}: ${own.ticker} · IPO ${monthYear(own.ipoDate!)}`
              : undefined
          }
          source={connected}
          updated={pb.financing.updated}
        />
        <StatCard
          label="Investors"
          value={connected ? pb.investors.length : "—"}
          source={connected}
          updated={pb.financing.updated}
        />
      </div>

      {/* Investors — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <div>
          <SectionHeading title="Investors" source updated={pb.financing.updated} />
          <InvestorList label="Active" investors={active} />
          {former.length > 0 && (
            <div className="mt-4">
              <InvestorList label="Former" investors={former} muted />
            </div>
          )}
        </div>
      </PitchbookGate>

      {/* Funding rounds — native table kept from today, plus a PitchBook table */}
      <SectionDivider />
      <FundingRounds
        native={company.fundingRounds}
        pb={pb.fundingRounds}
        updated={pb.financing.updated}
      />

      {/* Financing status — de-emphasized to a quiet detail line */}
      <PitchbookGate>
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-[12px] uppercase tracking-wide text-slate-400">
            Financing status
          </p>
          <p className="mt-1 text-[12px] text-slate-600">
            {pb.financing.status}
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
            {pb.financing.note}
          </p>
        </div>
      </PitchbookGate>

      {!connected && (
        <>
          <SectionDivider />
          <PitchbookPromo summary="Active and former investors, dates of first investment, and ownership details become available when your workspace is connected to PitchBook." />
        </>
      )}
    </div>
  );
}

function FundingRounds({
  native,
  pb,
  updated,
}: {
  native: FundingRound[];
  pb: FundingRound[];
  updated: string;
}) {
  return (
    <div>
      <SectionHeading
        title="Funding rounds"
        action={
          <button
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:text-brand-600"
            aria-label="Add funding round"
          >
            <Plus className="h-4 w-4" />
          </button>
        }
      />

      {native.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center">
          <p className="text-[12px] text-slate-500">
            <button className="font-medium text-brand-600 hover:text-brand-700">
              Add funding round data
            </button>{" "}
            for this company
          </p>
        </div>
      ) : (
        <FundingTable rounds={native} />
      )}

      {/* From PitchBook */}
      <PitchbookGate>
        <div className="mt-5">
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-slate-500">
            <PitchbookGlyph className="h-1.5 w-1.5 text-slate-400" />
            <span title={`Sourced from PitchBook · Updated ${updated}`}>
              Via PitchBook
            </span>
          </div>
          {pb.length === 0 ? (
            <p className="text-[12px] text-slate-400">
              No funding rounds reported.
            </p>
          ) : (
            <FundingTable rounds={pb} />
          )}
        </div>
      </PitchbookGate>
    </div>
  );
}

function FundingTable({ rounds }: { rounds: FundingRound[] }) {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[12px] font-medium uppercase tracking-wide text-slate-400">
              <th className="px-3.5 py-2 font-medium">Date</th>
              <th className="px-3.5 py-2 font-medium">Round</th>
              <th className="px-3.5 py-2 font-medium">Investors</th>
              <th className="px-3.5 py-2 text-right font-medium">Raised</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[12px]">
            {rounds.map((r) => (
              <tr key={r.id} className="text-slate-700">
                <td className="px-3.5 py-2.5 text-slate-500">
                  {monthDayYear(r.date)}
                </td>
                <td className="px-3.5 py-2.5 font-medium text-slate-900">
                  {r.round}
                </td>
                <td className="truncate px-3.5 py-2.5 text-slate-500">
                  {r.investors || "—"}
                </td>
                <td className="px-3.5 py-2.5 text-right font-medium tabular-nums text-slate-900">
                  {r.amountRaised}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-right text-[12px] text-slate-400">
        Total rows: {rounds.length}
      </p>
    </>
  );
}

function monthDayYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function InvestorList({
  label,
  investors,
  muted = false,
}: {
  label: string;
  investors: Investor[];
  muted?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100">
        {investors.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between gap-3 px-3.5 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-medium ${
                  muted
                    ? "bg-slate-50 text-slate-400"
                    : "bg-brand-50 text-brand-700"
                }`}
              >
                {inv.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="text-[14px] font-medium text-slate-900">
                  {inv.name}
                </p>
                {inv.role && (
                  <p className="text-[12px] text-slate-400">{inv.role}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-slate-400">Investor since</p>
              <p className="text-[12px] font-medium text-slate-600">
                {monthYear(inv.since)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

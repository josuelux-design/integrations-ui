import type { Company, FinancialSignal, Investor } from "../../types";
import {
  PitchbookGate,
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
  const isPrivate = own.status === "private";
  // Lead / notable investors first — emphasized, especially for private cos.
  const active = pb.investors
    .filter((i) => i.status === "active")
    .sort((a, b) => Number(b.lead) - Number(a.lead));
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
          trend={connected ? pb.revenue.trend : undefined}
        />
        <StatCard
          label="Headcount"
          value={connected ? pb.headcount.value : company.headcountNative.value}
          sub={connected ? pb.headcount.year : company.headcountNative.year}
          source={connected}
          updated={pb.financing.updated}
          trend={connected ? pb.headcount.trend : undefined}
        />
        <StatCard
          label="Ownership"
          value={connected ? (isPrivate ? "Private" : "Public") : "—"}
          sub={
            connected && !isPrivate
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

      {/* Financial overview — variable signal chips */}
      <PitchbookGate>
        {pb.financialSignals.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pb.financialSignals.map((s) => (
              <SignalChip key={s.label} signal={s} />
            ))}
          </div>
        )}
      </PitchbookGate>

      {/* Investors — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <div>
          <SectionHeading title="Investors" source updated={pb.financing.updated} />
          <InvestorList
            label={isPrivate ? "Key investors" : "Active"}
            investors={active}
          />
          {former.length > 0 && (
            <div className="mt-4">
              <InvestorList label="Former" investors={former} muted />
            </div>
          )}
        </div>
      </PitchbookGate>

      {/* Financing status — de-emphasized to a quiet detail line */}
      <PitchbookGate>
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-[12px] uppercase tracking-wide text-slate-400">
            Financing status
          </p>
          <p className="mt-1 text-[12px] text-slate-600">{pb.financing.status}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
            {pb.financing.note}
          </p>
        </div>
      </PitchbookGate>

      {!connected && (
        <>
          <SectionDivider />
          <PitchbookPromo summary="Financial signals, active and former investors, and ownership details become available when your workspace is connected to PitchBook." />
        </>
      )}
    </div>
  );
}

function SignalChip({ signal }: { signal: FinancialSignal }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    positive: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    caution: "bg-amber-50 text-amber-700 ring-amber-100",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium leading-none ring-1 ${
        tones[signal.tone ?? "neutral"]
      }`}
    >
      {signal.label}
    </span>
  );
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
            className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${
              inv.lead ? "bg-brand-50/40" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-medium ${
                  muted
                    ? "bg-slate-50 text-slate-400"
                    : inv.lead
                      ? "bg-brand-100 text-brand-700"
                      : "bg-brand-50 text-brand-700"
                }`}
              >
                {inv.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-medium text-slate-900">
                    {inv.name}
                  </p>
                  {inv.lead && (
                    <span className="inline-flex items-center rounded-full bg-brand-600 px-1.5 py-0.5 text-[12px] font-medium leading-none text-white">
                      Lead
                    </span>
                  )}
                </div>
                {inv.role && (
                  <p className="text-[12px] text-slate-400">{inv.role}</p>
                )}
              </div>
            </div>
            {inv.since && (
              <div className="text-right">
                <p className="text-[12px] text-slate-400">Investor since</p>
                <p className="text-[12px] font-medium text-slate-600">
                  {monthYear(inv.since)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

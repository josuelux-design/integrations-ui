import type { Company, Investor } from "../../types";
import {
  PitchbookGate,
  PitchbookPromo,
  usePitchbookConnected,
} from "../../lib/pitchbook";
import { SectionDivider, SectionHeading, StatCard } from "../ui";

function sinceLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function FinancialsTab({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;
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
          label="Financing status"
          value={connected ? pb.financing.status : "—"}
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

      {/* Financing status note — PitchBook */}
      <PitchbookGate>
        <SectionDivider />
        <div>
          <SectionHeading
            title="Financing status"
            source
            updated={pb.financing.updated}
          />
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            {pb.financing.status}
          </span>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
            {pb.financing.note}
          </p>
        </div>
      </PitchbookGate>

      {!connected && (
        <>
          <SectionDivider />
          <PitchbookPromo summary="Active and former investors, dates of first investment, and financing status notes become available when your workspace is connected to PitchBook." />
        </>
      )}
    </div>
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
              <p className="text-[13px] font-medium text-slate-600">
                {sinceLabel(inv.since)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

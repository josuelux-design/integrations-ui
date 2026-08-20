import { Mail, Phone, Flag, Briefcase } from "lucide-react";
import type { Company, TeamMember } from "../../types";
import {
  PitchbookGate,
  PitchbookPromo,
  usePitchbookConnected,
} from "../../lib/pitchbook";
import { LinkedInLogo } from "../../lib/icons";
import { Avatar, SectionDivider, SectionHeading } from "../ui";

export function PeopleTab({ company }: { company: Company }) {
  const connected = usePitchbookConnected();
  const pb = company.pitchbook;

  return (
    <div>
      {/* Leadership team — PitchBook */}
      <PitchbookGate>
        <div>
          <SectionHeading
            title="Leadership team"
            source
            updated={pb.financing.updated}
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
                {m.linkedin && <LinkedInLogo className="h-4 w-4 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
        <SectionDivider />
      </PitchbookGate>

      {!connected && (
        <>
          <PitchbookPromo summary="The full leadership team is available when your workspace is connected to PitchBook." />
          <SectionDivider />
        </>
      )}

      {/* All people — native records tracked in the platform */}
      <div>
        <SectionHeading
          title="People"
          action={
            <span className="text-[13px] text-slate-400">
              {company.employees.length} tracked
            </span>
          }
        />
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-100 bg-slate-50/60 px-4 py-2 text-[12px] font-medium uppercase tracking-wide text-slate-400">
            <span>Name</span>
            <span>Location</span>
          </div>
          <div className="divide-y divide-slate-100">
            {company.employees.map((p) => (
              <PersonRow key={p.id} person={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonRow({ person }: { person: TeamMember }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3">
      <div className="flex items-start gap-3">
        <Avatar name={person.name} src={person.avatarUrl} size={40} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-[14px] font-medium text-brand-600">
              {person.name}
            </p>
            {person.offLimits === "flagged" && (
              <Flag className="h-3.5 w-3.5 text-red-500" aria-label="Off limits" />
            )}
            {person.offLimits && (
              <Briefcase
                className="h-3.5 w-3.5 text-amber-500"
                aria-label="On a project"
              />
            )}
          </div>
          <p className="truncate text-[13px] text-slate-600">
            {person.former && (
              <span className="italic text-slate-400">Former </span>
            )}
            {person.title}
          </p>
          <div className="mt-1.5 flex items-center gap-2.5 text-slate-300">
            {person.linkedin && <LinkedInLogo className="h-3.5 w-3.5" />}
            {person.email && <Mail className="h-3.5 w-3.5 hover:text-brand-600" />}
            {person.phone && (
              <Phone className="h-3.5 w-3.5 hover:text-brand-600" />
            )}
          </div>
        </div>
      </div>
      <div className="text-right text-[13px] text-slate-500">
        {person.location ? (
          person.location.split(", ").map((line, i) => (
            <p key={i} className={i === 0 ? "text-slate-700" : "text-slate-400"}>
              {line}
            </p>
          ))
        ) : (
          <span className="text-slate-300">—</span>
        )}
      </div>
    </div>
  );
}

import type { Company, Project } from "../../types";
import { SectionDivider, SectionHeading } from "../ui";

export function ProjectsTab({ company }: { company: Company }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 rounded-xl bg-brand-50/60 px-4 py-3.5 text-center">
        {[
          { n: company.projects.total, l: "Projects" },
          { n: company.projects.open, l: "Open" },
          { n: company.projects.closed, l: "Closed" },
        ].map((c) => (
          <div key={c.l}>
            <p className="text-[16px] font-medium text-brand-700">{c.n}</p>
            <p className="text-[12px] text-slate-500">{c.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <SectionHeading title="Projects" />
        <div className="space-y-2">
          {company.projectList.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Multi-source note — PitchBook is one driver among several */}
      <div>
        <SectionHeading title="Data sources" />
        <p className="mb-3 text-[12px] text-slate-500">
          Drivers feeding this profile.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "PitchBook", note: "Company + investor enrichment" },
            { name: "Search analytics", note: "Engagement + outreach signals" },
            { name: "Thrive records", note: "People, projects, notes" },
          ].map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-slate-100 px-3 py-2"
            >
              <p className="text-[14px] font-medium text-slate-900">{s.name}</p>
              <p className="text-[12px] text-slate-400">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const open = project.status === "open";
  return (
    <div className="rounded-xl border border-slate-100 px-3.5 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[14px] font-medium text-slate-900">{project.name}</p>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-medium leading-none ring-1 ${
            open
              ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
              : "bg-slate-100 text-slate-500 ring-slate-200"
          }`}
        >
          {open ? "Open" : "Closed"}
        </span>
      </div>
      {project.investors && project.investors.length > 0 && (
        <div className="mt-2">
          <p className="mb-1 text-[12px] uppercase tracking-wide text-slate-400">
            Investors
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.investors.map((inv) => (
              <span
                key={inv}
                className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[12px] text-slate-600 ring-1 ring-slate-200"
              >
                {inv}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

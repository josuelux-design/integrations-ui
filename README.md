# Company panel · PitchBook redesign prototype

A working concept for the company detail panel, redesigned to surface PitchBook
enrichment data alongside the existing Thrive record. Built to iterate on — not
production code.

## What it shows

The panel keeps its current shell (pager, header, tabs) and layers new
PitchBook-sourced content into the **Overview** and **Financials** tabs:

- **Leadership team** — decision-makers, distinct from the full employee list
- **Tags** — sectors, verticals, and keywords
- **Snapshot** — precise revenue and headcount (upgrades the native bands)
- **Competitors**
- **Investors** — active and former, with the date each first invested
- **Financing status** — status badge plus a freeform note

### Two states

A demo toggle (top of the screen) flips between them:

| State | Behavior |
| --- | --- |
| **Connected** | All PitchBook sections render, each carrying a subtle `via PitchBook` source tag (hover for the last-updated date). |
| **Not connected** | PitchBook sections are withheld. A single quiet "Connect PitchBook" promo stands in for them so the absence reads as unlockable, not broken. |

### The source signal

PitchBook data is signaled with a restrained diamond glyph + `via PitchBook`
caption, placed on the section heading (or under a value). It stays muted until
hover. See `src/lib/pitchbook.tsx` (`SourceTag`).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL.

```bash
npm run build   # type-check + production build
npm run preview # serve the build
```

## Structure

```
src/
  types.ts                 data model (native vs. pitchbook fields)
  data/company.ts          sample record (Tyson Foods; placeholder figures)
  lib/pitchbook.tsx        access context, source tag, gate, promo
  components/
    ui.tsx                 Avatar, Chip, StatCard, Field, headings
    CompanyPanel.tsx       shell: pager, header, tabs, content router
    tabs/OverviewTab.tsx   snapshot, description, tags, leadership, competitors
    tabs/FinancialsTab.tsx investors (active/former), financing status
  App.tsx                  demo toolbar + centered panel
```

## Extending

- **New PitchBook section:** add fields to `Company["pitchbook"]` in
  `types.ts`, populate `data/company.ts`, then render inside a `<PitchbookGate>`
  with a `<SectionHeading source />`.
- **Wire real access:** replace the `connected` prop in `App.tsx` with your
  entitlement check; everything below consumes it via `usePitchbookConnected()`.

> All PitchBook figures in `data/company.ts` are illustrative placeholders.

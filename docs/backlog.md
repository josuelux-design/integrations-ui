# Feedback backlog — company profile panel

Raw notes from review, with interpretation.

> Status: all seven items applied in the prototype (see commit history).
> Assumptions taken: funding rounds removed entirely (#3); a `lead` flag marks
> highlight investors, emphasized for private companies (#5).

## 1. Person not in the system → prompt to add to Thrive
When a PitchBook-sourced person (e.g. a leadership team member) has no matching
Thrive record, call it out and offer an "Add to Thrive" action inline.
- Affects: People tab (leadership block), any person surfaced from PitchBook.
- Open Q: matching logic (name + company? confidence threshold?) and what the
  add action creates.

## 2. Investor data shape may be different
Don't over-fit to the current `Investor` type (name / since / status / role).
The real shape from the source may differ.
- Action: treat the current investor model as provisional; confirm fields
  before hardening. Keep the component tolerant of missing fields.

## 3. Funding rounds is not data we will have
We likely will not have funding-round data.
- Implication: the funding rounds section (both the native and "Via PitchBook"
  tables) is probably cut or heavily reduced. Revisit before investing more in
  it.

## 4. Include a trending line to show data
Add a trend/sparkline visualization rather than only point-in-time values.
- Candidates: revenue over time, headcount over time.
- Affects: snapshot stat cards (inline sparkline) and/or a dedicated trend.

## 5. Highlight the notable investors for Private companies
For private companies, emphasize the key / lead / notable investors rather than
listing everyone flat.
- Affects: Investors section, private state specifically.
- Open Q: what defines "highlight" (lead investor, board seat, most recent,
  largest)?

## 6. Chips can change for financial overview
The chips/tags shown in the financial overview aren't fixed — they may vary or
be configurable.
- Action: don't hardcode a fixed chip set for financials; design for a variable
  set.

## 7. Projects context + other data drivers
- In projects: surface who the investors are.
- Explore search analytics and other drivers as data sources beyond PitchBook.
- Action: treat PitchBook as one source among several; leave room in the IA and
  source-tagging for additional providers.

---

### Rough impact on current prototype
- Keep: source-tagging pattern, two-state (connected / not), ownership card,
  tags split, People/leadership structure.
- Reconsider: funding rounds tables (#3), investor model (#2), financial chips
  (#6).
- New: add-to-Thrive affordance (#1), trend lines (#4), private-investor
  highlighting (#5), multi-source model (#7).

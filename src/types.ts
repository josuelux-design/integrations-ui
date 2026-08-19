/**
 * Data model for the company panel.
 *
 * Fields are grouped by their source so the UI can decide what to show and how
 * to attribute it:
 *  - "native" fields come from Thrive's own record and always render.
 *  - "pitchbook" fields only render when the org has PitchBook access, and are
 *    tagged in the UI with a subtle source signal.
 */

export type DataSource = "native" | "pitchbook";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  /** True for leadership/decision-makers surfaced above the full employee list. */
  leadership?: boolean;
  former?: boolean;
  location?: string;
  avatarUrl?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  /** Off-limits flag shown in the existing employees view. */
  offLimits?: "flagged" | "project" | null;
}

export interface Investor {
  id: string;
  name: string;
  /** ISO date the firm first became an investor. */
  since: string;
  status: "active" | "former";
  /** e.g. "Lead", "Institutional holder", "PE". */
  role?: string;
}

export interface Competitor {
  id: string;
  name: string;
  logoUrl?: string;
  /** Optional short descriptor, e.g. "Public · Meat processing". */
  descriptor?: string;
}

export interface CompanyTags {
  /** PitchBook primary/secondary sectors. */
  sectors: string[];
  /** Industry verticals. */
  verticals: string[];
  /** Freeform keywords. */
  keywords: string[];
}

export interface FinancingInfo {
  /** e.g. "Corporate Backed or Acquired", "Venture Backed", "Public". */
  status: string;
  /** Freeform financing status note from PitchBook. */
  note: string;
  /** Human date the enrichment was last refreshed. */
  updated: string;
}

export interface Ownership {
  status: "public" | "private";
  /** Ticker symbol, public only. */
  ticker?: string;
  /** Listing exchange, public only, e.g. "NYSE". */
  exchange?: string;
  /** ISO IPO date, public only. */
  ipoDate?: string;
}

export interface Company {
  // --- native fields ---
  name: string;
  location: string;
  website: string;
  linkedin: string;
  logoUrl?: string;
  description: string;
  founded: string;
  /** Local tags created inside the platform. */
  tags: string[];
  /** Revenue as stored on the native record (rounded band). */
  revenueNative: { value: string; year: string };
  /** Headcount band as stored on the native record. */
  headcountNative: { value: string; year: string };
  projects: { total: number; open: number; closed: number };
  additionalDetails: { label: string; value: string }[];
  employees: TeamMember[];

  // --- pitchbook-enriched fields ---
  pitchbook: {
    /** Precise headcount from PitchBook. */
    headcount: { value: string; year: string };
    /** Precise/estimated revenue from PitchBook. */
    revenue: { value: string; year: string };
    tags: CompanyTags;
    ownership: Ownership;
    competitors: Competitor[];
    investors: Investor[];
    financing: FinancingInfo;
    leadership: TeamMember[];
  };
}

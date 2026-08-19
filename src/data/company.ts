import type { Company } from "../types";

/**
 * Sample company record modeled on the Tyson Foods panel from the current UI.
 * All PitchBook-attributed values here are illustrative placeholder data for
 * the prototype, not real figures.
 */
export const tysonFoods: Company = {
  name: "Tyson Foods",
  location: "Springdale, AR, United States",
  website: "https://www.tysonfoods.com",
  linkedin: "https://www.linkedin.com/company/tyson-foods",
  logoUrl:
    "https://logo.clearbit.com/tysonfoods.com",
  description:
    "We are a company of people engaged in the production of food, seeking to pursue truth and integrity, and committed to creating value for our shareholders, our customers, our team members, and our communities. Tyson Foods is one of the world's largest food companies and a recognized leader in protein, bringing products to market under brands such as Tyson, Jimmy Dean, Hillshire Farm, and Ball Park.",
  founded: "Jan 1935",
  revenueNative: { value: "$52.88B", year: "2024" },
  headcountNative: { value: "10001+", year: "2024" },
  projects: { total: 3, open: 0, closed: 0 },
  additionalDetails: [
    { label: "Asset Class", value: "—" },
    { label: "GPTW Certificate", value: "No" },
    { label: "Company Representative", value: "—" },
    { label: "Security level", value: "—" },
  ],
  employees: [
    {
      id: "e1",
      name: "Hannah Osborne",
      title: "Director of IT",
      location: "Fayetteville, AR, United States",
      offLimits: "project",
      avatarUrl: "https://i.pravatar.cc/96?img=45",
      linkedin: "#",
      email: "#",
      phone: "#",
    },
    {
      id: "e2",
      name: "Prasad Ram",
      title: "Chief Executive Officer",
      location: "San Francisco, California, United States",
      offLimits: "flagged",
      avatarUrl: "https://i.pravatar.cc/96?img=12",
      linkedin: "#",
    },
    {
      id: "e3",
      name: "Troy Bonata",
      title: "General Manager of FSQA",
      former: true,
      location: "San Diego, California, United States",
      linkedin: "#",
    },
  ],
  pitchbook: {
    headcount: { value: "139,000", year: "2024" },
    revenue: { value: "$53.31B", year: "2024" },
    tags: {
      sectors: ["Consumer Products and Services (B2C)", "Food Products"],
      verticals: ["Manufacturing", "Food and Beverage", "Agtech"],
      keywords: [
        "Protein",
        "Meat processing",
        "Packaged foods",
        "Prepared foods",
        "Poultry",
        "Supply chain",
      ],
    },
    competitors: [
      { id: "c1", name: "JBS", descriptor: "Public · Meat processing" },
      { id: "c2", name: "Cargill", descriptor: "Private · Food and agriculture" },
      { id: "c3", name: "Pilgrim's Pride", descriptor: "Public · Poultry" },
      { id: "c4", name: "Hormel Foods", descriptor: "Public · Packaged foods" },
      { id: "c5", name: "Perdue Farms", descriptor: "Private · Poultry" },
      { id: "c6", name: "Smithfield Foods", descriptor: "Private · Pork" },
    ],
    investors: [
      {
        id: "i1",
        name: "The Vanguard Group",
        since: "2011-06-01",
        status: "active",
        role: "Institutional holder",
      },
      {
        id: "i2",
        name: "BlackRock",
        since: "2013-02-01",
        status: "active",
        role: "Institutional holder",
      },
      {
        id: "i3",
        name: "State Street Global Advisors",
        since: "2014-09-01",
        status: "active",
        role: "Institutional holder",
      },
      {
        id: "i4",
        name: "Fidelity Management & Research",
        since: "2016-04-01",
        status: "former",
        role: "Institutional holder",
      },
    ],
    financing: {
      status: "Corporate Backed or Acquired",
      note: "Tyson Foods is publicly traded (NYSE: TSN). Most recent recorded transaction is acquisition-related activity as of August 2026. Latest reported financing round: Acquisition.",
      updated: "Aug 19, 2026",
    },
    leadership: [
      {
        id: "l1",
        name: "Donnie King",
        title: "President & Chief Executive Officer",
        leadership: true,
        avatarUrl: "https://i.pravatar.cc/96?img=59",
        linkedin: "#",
      },
      {
        id: "l2",
        name: "John R. Tyson",
        title: "Chief Financial Officer",
        leadership: true,
        avatarUrl: "https://i.pravatar.cc/96?img=33",
        linkedin: "#",
      },
      {
        id: "l3",
        name: "Melanie Boulden",
        title: "EVP & Chief Growth Officer",
        leadership: true,
        avatarUrl: "https://i.pravatar.cc/96?img=47",
        linkedin: "#",
      },
      {
        id: "l4",
        name: "Prasad Ram",
        title: "Chief Executive Officer, Prepared Foods",
        leadership: true,
        avatarUrl: "https://i.pravatar.cc/96?img=12",
        linkedin: "#",
      },
      {
        id: "l5",
        name: "Curt Calaway",
        title: "SVP & Chief Accounting Officer",
        leadership: true,
        linkedin: "#",
      },
    ],
  },
};

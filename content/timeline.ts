import type { TimelineItem } from "@/lib/types";

// Dates are YYYY-MM-DD for sorting. Where the exact month/day isn't known,
// January 1st is used as a placeholder — update freely, it only affects ordering
// within the same year.
//
// NOTE: the three education entries below use estimated years — confirm and
// correct these before publishing.

export const timeline: TimelineItem[] = [
  {
    date: "2026-06-20",
    title: "Shipped the CV Tailoring Agent",
    description:
      "A Claude skill that drafts a tailored CV from a job posting and a maintained knowledge base.",
    type: "experiment",
    href: "/ai-experiments/cv-tailoring-agent"
  },
  {
    date: "2026-01-01",
    title: "Wrike — Senior Product Manager",
    description:
      "Owns the in-product analytics domain across 17,000+ accounts; dashboards reach 80k+ weekly active users.",
    type: "milestone"
  },
  {
    date: "2022-01-01",
    title: "Joined Wrike as Senior Product Manager",
    description: "Took ownership of the in-product analytics and dashboards domain.",
    type: "milestone",
    href: "/product-lab/rebuilding-inproduct-analytics"
  },
  {
    date: "2020-01-01",
    title: "Joined Emplifi as Product Manager",
    description: "Owned analytics and social listening products end to end.",
    type: "milestone",
    href: "/product-lab/social-listening-to-decision-support"
  },
  {
    date: "2019-06-01",
    title: "Wrapped up Spaceti — Product Innovation Manager",
    description:
      "Introduced agile processes across mobile, desktop and hardware simultaneously.",
    type: "milestone",
    href: "/product-lab/agile-for-hardware"
  },
  {
    date: "2018-01-01",
    title: "Joined Spaceti as Product Innovation Manager",
    description: "First product role spanning hardware and software together.",
    type: "milestone"
  },
  {
    date: "2016-01-01",
    title: "MA Economics & Policy — University College London",
    description: "Estimated year — confirm before publishing.",
    type: "milestone"
  },
  {
    date: "2014-01-01",
    title: "MSc Smart Building Control — CTU, Faculty of Electrical Engineering",
    description: "Estimated year — confirm before publishing.",
    type: "milestone"
  },
  {
    date: "2012-01-01",
    title: "BA Sociology & Economics — Charles University",
    description: "Estimated year — confirm before publishing.",
    type: "milestone"
  }
];

export function getTimeline(): TimelineItem[] {
  return [...timeline].sort((a, b) => (a.date < b.date ? 1 : -1));
}

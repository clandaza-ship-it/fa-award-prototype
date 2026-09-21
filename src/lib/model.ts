export type ApplicantType = "internal" | "external";
export type Band = "Strong Approve" | "Approve" | "Conditional / Review" | "Decline";
export type Decision = "" | Band;
export type Line =
  | "Funded"
  | "Below line"
  | "Awaiting merit"
  | "Flagged"
  | "Do Not Advance"
  | "Integrity follow-up";

export type Campus = {
  id: string;
  name: string;
  sticker: number;
  envelope: number;
};

export type Applicant = {
  id: string;
  campusId: string;
  family: string;
  student: string;
  type: ApplicantType;
  kids: number;
  householdIncome: number;
  irsTraced: number;
  suggestedTuition: number;
  requested: number;
  mfj: boolean;
  parentB: boolean;
  docs: boolean;
  irsTrace: boolean;
  legacy: boolean;
  legacyDocumented: boolean;
  integritySeed: 1 | 2 | 3 | 4;
  integrityWhy: string;
  aiAcademic: number;
  aiEffort: number;
  aiCreator: number;
};

export type Review = {
  academic: string;
  effort: string;
  creator: string;
  comments: string;
  decision: Decision;
  signed: boolean;
  integrityOverride: string;
};

export const CAMPUSES: Campus[] = [
  { id: "broward", name: "Alpha Broward", sticker: 40_000, envelope: 180_000 },
  { id: "austin", name: "Alpha Austin K–8", sticker: 65_000, envelope: 240_000 },
  { id: "miami", name: "Alpha Miami", sticker: 40_000, envelope: 90_000 },
];

export const APPLICANTS: Applicant[] = [
  {
    id: "br-reyes",
    campusId: "broward",
    family: "Reyes",
    student: "Mateo Reyes",
    type: "internal",
    kids: 2,
    householdIncome: 72_000,
    irsTraced: 71_400,
    suggestedTuition: 12_000,
    requested: 55_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched; docs complete.",
    aiAcademic: 4,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "br-okonkwo",
    campusId: "broward",
    family: "Okonkwo",
    student: "Ada Okonkwo",
    type: "external",
    kids: 1,
    householdIncome: 88_000,
    irsTraced: 86_000,
    suggestedTuition: 16_000,
    requested: 24_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched; docs complete.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 4,
  },
  {
    id: "br-nguyen",
    campusId: "broward",
    family: "Nguyen",
    student: "Linh Nguyen",
    type: "internal",
    kids: 3,
    householdIncome: 130_000,
    irsTraced: 128_000,
    suggestedTuition: 15_000,
    requested: 70_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched; three siblings at Alpha.",
    aiAcademic: 3,
    aiEffort: 4,
    aiCreator: 3,
  },
  {
    id: "br-alvarez",
    campusId: "broward",
    family: "Alvarez",
    student: "Sofia Alvarez",
    type: "external",
    kids: 1,
    householdIncome: 165_000,
    irsTraced: 160_000,
    suggestedTuition: 22_000,
    requested: 20_000,
    mfj: false,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "Single filer; docs complete.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "br-singh",
    campusId: "broward",
    family: "Singh",
    student: "Aria Singh",
    type: "internal",
    kids: 2,
    householdIncome: 100_000,
    irsTraced: 118_000,
    suggestedTuition: 18_000,
    requested: 40_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 2,
    integrityWhy: "Household income vs IRS-traced figure is 15% apart (over the 10% gate).",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 2,
  },
  {
    id: "br-cole",
    campusId: "broward",
    family: "Cole",
    student: "Evan Cole",
    type: "external",
    kids: 1,
    householdIncome: 54_000,
    irsTraced: 0,
    suggestedTuition: 8_000,
    requested: 32_000,
    mfj: true,
    parentB: false,
    docs: false,
    irsTrace: false,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 1,
    integrityWhy: "No IRS trace, missing W-2s, MFJ Parent B blank.",
    aiAcademic: 2,
    aiEffort: 2,
    aiCreator: 2,
  },
  {
    id: "au-park",
    campusId: "austin",
    family: "Park",
    student: "Jun Park",
    type: "internal",
    kids: 2,
    householdIncome: 95_000,
    irsTraced: 94_200,
    suggestedTuition: 20_000,
    requested: 90_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 4,
    aiEffort: 4,
    aiCreator: 3,
  },
  {
    id: "au-hassan",
    campusId: "austin",
    family: "Hassan",
    student: "Layla Hassan",
    type: "external",
    kids: 1,
    householdIncome: 110_000,
    irsTraced: 108_000,
    suggestedTuition: 28_000,
    requested: 40_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 3,
    aiEffort: 4,
    aiCreator: 3,
  },
  {
    id: "au-brooks",
    campusId: "austin",
    family: "Brooks",
    student: "Noah Brooks",
    type: "internal",
    kids: 1,
    householdIncome: 210_000,
    irsTraced: 208_000,
    suggestedTuition: 48_000,
    requested: 20_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 3,
    integrityWhy: "Minor gap on a K-1; explanation attached.",
    aiAcademic: 4,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "au-delgado",
    campusId: "austin",
    family: "Delgado",
    student: "Camila Delgado",
    type: "external",
    kids: 2,
    householdIncome: 150_000,
    irsTraced: 149_000,
    suggestedTuition: 30_000,
    requested: 70_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 2,
  },
  {
    id: "au-whit",
    campusId: "austin",
    family: "Whitaker",
    student: "Eli Whitaker",
    type: "external",
    kids: 1,
    householdIncome: 78_000,
    irsTraced: 77_500,
    suggestedTuition: 72_000,
    requested: 10_000,
    mfj: false,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "Clarity suggested household exceeds sticker — negative gap.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "mi-garcia",
    campusId: "miami",
    family: "Garcia",
    student: "Diego Garcia",
    type: "internal",
    kids: 2,
    householdIncome: 68_000,
    irsTraced: 67_200,
    suggestedTuition: 10_000,
    requested: 60_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 3,
    aiEffort: 4,
    aiCreator: 4,
  },
  {
    id: "mi-rossi",
    campusId: "miami",
    family: "Rossi",
    student: "Giulia Rossi",
    type: "external",
    kids: 1,
    householdIncome: 92_000,
    irsTraced: 90_000,
    suggestedTuition: 18_000,
    requested: 22_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "mi-kane",
    campusId: "miami",
    family: "Kane",
    student: "Maya Kane",
    type: "internal",
    kids: 1,
    householdIncome: 145_000,
    irsTraced: 144_000,
    suggestedTuition: 24_000,
    requested: 16_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 4,
    integrityWhy: "IRS trace matched.",
    aiAcademic: 4,
    aiEffort: 3,
    aiCreator: 3,
  },
  {
    id: "mi-ortiz",
    campusId: "miami",
    family: "Ortiz",
    student: "Leo Ortiz",
    type: "external",
    kids: 2,
    householdIncome: 80_000,
    irsTraced: 79_000,
    suggestedTuition: 14_000,
    requested: 50_000,
    mfj: true,
    parentB: true,
    docs: true,
    irsTrace: true,
    legacy: false,
    legacyDocumented: false,
    integritySeed: 3,
    integrityWhy: "One late upload; overall consistent.",
    aiAcademic: 3,
    aiEffort: 3,
    aiCreator: 3,
  },
];

function scored(academic: number, effort: number, creator: number, comments: string): Review {
  return {
    academic: String(academic),
    effort: String(effort),
    creator: String(creator),
    comments,
    decision: "",
    signed: false,
    integrityOverride: "",
  };
}

export function emptyReview(): Review {
  return {
    academic: "",
    effort: "",
    creator: "",
    comments: "",
    decision: "",
    signed: false,
    integrityOverride: "",
  };
}

export const SEED_REVIEWS: Record<string, Review> = {
  "br-reyes": scored(4, 3, 4, "DoP: strong XP year; life-skills consistent."),
  "br-okonkwo": scored(3, 3, 4, "Admissions: report cards on grade; shadow day energetic."),
  "br-nguyen": scored(3, 4, 3, "DoP: three siblings; effort is the standout."),
  "au-park": scored(4, 4, 3, "DoP: growth targets met two cycles running."),
  "au-hassan": scored(3, 4, 3, "Admissions: shadow day notes are strong on character."),
  "au-brooks": scored(4, 3, 3, "DoP: academics fine; limited need."),
  "au-delgado": scored(3, 3, 2, "Admissions: creator score is a 2 — Gate 2 watch."),
  "mi-garcia": scored(3, 4, 4, "DoP: life-skills lead for the level."),
  "mi-rossi": scored(3, 3, 3, "Admissions: solid external file."),
  "mi-kane": scored(4, 3, 3, "DoP: ready academically."),
  "mi-ortiz": scored(3, 3, 3, "Admissions: twins; both would attend."),
};

export function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export function aidNecessity(burden: number): 1 | 2 | 3 | 4 {
  if (burden >= 0.3) return 4;
  if (burden >= 0.2) return 3;
  if (burden >= 0.1) return 2;
  return 1;
}

export function bandFor(composite: number): Band {
  if (composite >= 85) return "Strong Approve";
  if (composite >= 70) return "Approve";
  if (composite >= 55) return "Conditional / Review";
  return "Decline";
}

export function gate1Label(score: number): "Proceed" | "Flag" | "Do Not Advance" {
  if (score >= 3) return "Proceed";
  if (score === 2) return "Flag";
  return "Do Not Advance";
}

export function campusOf(id: string): Campus {
  return CAMPUSES.find((c) => c.id === id) ?? CAMPUSES[0];
}

export function scoreApplicant(a: Applicant, review: Review) {
  const campus = campusOf(a.campusId);
  const totalSticker = campus.sticker * a.kids;
  const suggestedHousehold = a.suggestedTuition * a.kids;
  const burden = a.householdIncome > 0 ? totalSticker / a.householdIncome : 0;
  const necessity = aidNecessity(burden);
  const gap = totalSticker - suggestedHousehold;
  const negativeGap = gap < 0;
  const recommended = negativeGap ? 0 : Math.max(0, Math.min(gap, a.requested));

  const override = Number(review.integrityOverride);
  const integrity = override >= 1 && override <= 4 ? override : a.integritySeed;
  const g1 = gate1Label(integrity);

  const academic = Number(review.academic);
  const effort = Number(review.effort);
  const creator = Number(review.creator);
  const meritReady =
    academic >= 1 && academic <= 4 && effort >= 1 && effort <= 4 && creator >= 1 && creator <= 4;

  const section1 = necessity * 6;
  const section2 = meritReady ? (academic + effort + creator) * 2 : 0;
  const raw = section1 + section2;
  const composite = meritReady ? (raw / 48) * 100 : null;
  const band = composite == null ? null : bandFor(composite);

  const gate2Pass =
    meritReady && necessity >= 2 && academic >= 2 && effort >= 2 && creator >= 2;
  const gate2Fail = meritReady && !gate2Pass;

  const spread = meritReady
    ? Math.max(
        Math.abs(academic - a.aiAcademic),
        Math.abs(effort - a.aiEffort),
        Math.abs(creator - a.aiCreator),
      )
    : 0;

  const advances = g1 === "Proceed" && meritReady && gate2Pass && !negativeGap;

  return {
    totalSticker,
    suggestedHousehold,
    burden,
    necessity,
    gap,
    negativeGap,
    recommended,
    integrity,
    g1,
    academic,
    effort,
    creator,
    meritReady,
    section1,
    section2,
    raw,
    composite,
    band,
    gate2Pass,
    gate2Fail,
    spread,
    advances,
    reviewer: a.type === "internal" ? "Dean of Parents" : "Director of Admissions",
  };
}

export type QueueRow = {
  applicant: Applicant;
  scored: ReturnType<typeof scoreApplicant>;
  rank: number | null;
  funded: boolean;
  line: Line;
};

export function buildQueue(campusId: string, reviews: Record<string, Review>): QueueRow[] {
  const rows: QueueRow[] = APPLICANTS.filter((a) => a.campusId === campusId).map((applicant) => {
    const scored = scoreApplicant(applicant, reviews[applicant.id] ?? emptyReview());
    let line: Line = "Awaiting merit";
    if (scored.g1 === "Do Not Advance") line = "Do Not Advance";
    else if (scored.g1 === "Flag") line = "Flagged";
    else if (scored.negativeGap) line = "Integrity follow-up";
    else if (scored.gate2Fail) line = "Do Not Advance";
    else if (scored.advances) line = "Below line";
    return { applicant, scored, rank: null, funded: false, line };
  });

  const ranked = rows
    .filter((r) => r.scored.advances)
    .sort((a, b) => {
      const c = (b.scored.composite ?? 0) - (a.scored.composite ?? 0);
      if (c !== 0) return c;
      return b.scored.burden - a.scored.burden;
    });

  const campus = campusOf(campusId);
  let remaining = campus.envelope;
  ranked.forEach((r, i) => {
    r.rank = i + 1;
    if (remaining >= r.scored.recommended && r.scored.recommended > 0) {
      r.funded = true;
      r.line = "Funded";
      remaining -= r.scored.recommended;
    } else {
      r.funded = false;
      r.line = "Below line";
    }
  });

  return rows.sort((a, b) => {
    const ar = a.rank ?? 99;
    const br = b.rank ?? 99;
    if (ar !== br) return ar - br;
    return a.applicant.family.localeCompare(b.applicant.family);
  });
}

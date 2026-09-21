"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APPLICANTS,
  CAMPUSES,
  SEED_REVIEWS,
  type Decision,
  type Review,
  buildQueue,
  campusOf,
  emptyReview,
  gate1Label,
  money,
  pct,
  scoreApplicant,
} from "@/lib/model";

type Page =
  | { view: "home" }
  | { view: "campus"; campusId: string }
  | { view: "applicant"; campusId: string; applicantId: string };

const SCORE_OPTS = ["", "1", "2", "3", "4"];
const DECISIONS: Decision[] = [
  "",
  "Strong Approve",
  "Approve",
  "Conditional / Review",
  "Decline",
];

export default function Prototype() {
  const [page, setPage] = useState<Page>({ view: "home" });
  const [reviews, setReviews] = useState<Record<string, Review>>(SEED_REVIEWS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fa-prototype-reviews");
      if (raw) setReviews({ ...SEED_REVIEWS, ...JSON.parse(raw) });
    } catch {
      /* keep seed */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("fa-prototype-reviews", JSON.stringify(reviews));
  }, [reviews, ready]);

  function reviewOf(id: string): Review {
    return reviews[id] ?? emptyReview();
  }

  function patchReview(id: string, patch: Partial<Review>) {
    setReviews((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? emptyReview()), ...patch, signed: false },
    }));
  }

  function signOff(id: string, decision: Decision) {
    setReviews((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? emptyReview()), decision, signed: true },
    }));
  }

  function resetDemo() {
    localStorage.removeItem("fa-prototype-reviews");
    setReviews(SEED_REVIEWS);
    setPage({ view: "home" });
  }

  return (
    <div className="space-y-6">
      {page.view === "home" ? (
        <Home
          reviews={reviews}
          onOpen={(campusId) => setPage({ view: "campus", campusId })}
          onReset={resetDemo}
        />
      ) : null}
      {page.view === "campus" ? (
        <CampusQueue
          campusId={page.campusId}
          reviews={reviews}
          onBack={() => setPage({ view: "home" })}
          onOpen={(applicantId) =>
            setPage({ view: "applicant", campusId: page.campusId, applicantId })
          }
        />
      ) : null}
      {page.view === "applicant" ? (
        <ApplicantReview
          applicantId={page.applicantId}
          campusId={page.campusId}
          review={reviewOf(page.applicantId)}
          onPatch={(patch) => patchReview(page.applicantId, patch)}
          onSign={(decision) => signOff(page.applicantId, decision)}
          onBack={() => setPage({ view: "campus", campusId: page.campusId })}
        />
      ) : null}
    </div>
  );
}

function Home({
  reviews,
  onOpen,
  onReset,
}: {
  reviews: Record<string, Review>;
  onOpen: (campusId: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-5">
      <Callout tone="info" title="How to review this mock">
        Open a campus. The queue is ranked from mocked Clarity need scores plus
        sample human merit scores. Open a family to change Section 2, then sign
        off. Alvarez (Broward) is left unscored so you can try the human step.
        Singh is flagged. Cole does not advance. Whitaker (Austin) has a
        negative gap. Miami shows a large award eating the pot.
      </Callout>

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Campuses</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>
            Each campus has its own envelope. Broward money never pays a Miami
            family.
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={onReset}>
          Reset sample scores
        </button>
      </div>

      <div className="table-scroll rounded border" style={{ borderColor: "var(--grid)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)" }}>
              <th className="px-3 py-2 font-medium">Campus</th>
              <th className="px-3 py-2 font-medium text-right">Sticker</th>
              <th className="px-3 py-2 font-medium text-right">Envelope</th>
              <th className="px-3 py-2 font-medium text-right">Applicants</th>
              <th className="px-3 py-2 font-medium text-right">Funded</th>
              <th className="px-3 py-2 font-medium text-right">Recommended out</th>
              <th className="px-3 py-2 font-medium text-right">Remaining</th>
              <th className="px-3 py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {CAMPUSES.map((c) => {
              const queue = buildQueue(c.id, reviews);
              const funded = queue.filter((r) => r.funded);
              const spent = funded.reduce((s, r) => s + r.scored.recommended, 0);
              return (
                <tr key={c.id} className="border-t bg-white" style={{ borderColor: "var(--grid)" }}>
                  <td className="px-3 py-3 font-medium">{c.name}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{money(c.sticker)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{money(c.envelope)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{queue.length}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{funded.length}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{money(spent)}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{money(c.envelope - spent)}</td>
                  <td className="px-3 py-3 text-right">
                    <button type="button" className="btn-primary" onClick={() => onOpen(c.id)}>
                      Open queue
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CampusQueue({
  campusId,
  reviews,
  onBack,
  onOpen,
}: {
  campusId: string;
  reviews: Record<string, Review>;
  onBack: () => void;
  onOpen: (applicantId: string) => void;
}) {
  const campus = campusOf(campusId);
  const queue = useMemo(() => buildQueue(campusId, reviews), [campusId, reviews]);
  const funded = queue.filter((r) => r.funded);
  const spent = funded.reduce((s, r) => s + r.scored.recommended, 0);
  const awaiting = queue.filter((r) => r.line === "Awaiting merit").length;
  const remaining = campus.envelope - spent;

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-2)" }}>
        <button type="button" className="btn-ghost" onClick={onBack}>
          All campuses
        </button>
        <span>/</span>
        <span className="font-medium text-black">{campus.name}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-semibold">{campus.name} queue</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>
          Ranked by composite, then higher tuition burden. Full award or nothing
          — no proration.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Campus envelope" value={money(campus.envelope)} />
        <Stat label="Recommended to funded line" value={money(spent)} />
        <Stat label="Remaining" value={money(remaining)} warn={remaining < 20_000} />
        <Stat label="Awaiting human merit" value={String(awaiting)} />
      </div>

      <UsageBar
        total={campus.envelope}
        spent={spent}
        label={`${funded.length} families on the funded line · ${money(spent)} of ${money(campus.envelope)}`}
      />

      <div className="table-scroll rounded border bg-white" style={{ borderColor: "var(--grid)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)" }}>
              <th className="px-3 py-2 font-medium">Rank</th>
              <th className="px-3 py-2 font-medium">Family</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Gate 1</th>
              <th className="px-3 py-2 font-medium text-right">Burden</th>
              <th className="px-3 py-2 font-medium text-right">Need</th>
              <th className="px-3 py-2 font-medium text-right">Composite</th>
              <th className="px-3 py-2 font-medium">Band</th>
              <th className="px-3 py-2 font-medium text-right">Recommended</th>
              <th className="px-3 py-2 font-medium">Line</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((r) => (
              <tr key={r.applicant.id} className="border-t" style={{ borderColor: "var(--grid)" }}>
                <td className="px-3 py-2 tabular-nums">{r.rank ?? "—"}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="font-medium underline-offset-2 hover:underline"
                    onClick={() => onOpen(r.applicant.id)}
                  >
                    {r.applicant.family}
                  </button>
                </td>
                <td className="px-3 py-2">{r.applicant.type === "internal" ? "Renewal" : "New"}</td>
                <td className="px-3 py-2">
                  {r.scored.integrity} · {r.scored.g1}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{pct(r.scored.burden)}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {r.scored.necessity} × 6 = {r.scored.section1}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {r.scored.composite == null ? "—" : r.scored.composite.toFixed(1)}
                </td>
                <td className="px-3 py-2">{r.scored.band ?? "—"}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {r.scored.negativeGap ? "Follow-up" : money(r.scored.recommended)}
                </td>
                <td className="px-3 py-2">
                  <LinePill line={r.line} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApplicantReview({
  applicantId,
  campusId,
  review,
  onPatch,
  onSign,
  onBack,
}: {
  applicantId: string;
  campusId: string;
  review: Review;
  onPatch: (patch: Partial<Review>) => void;
  onSign: (decision: Decision) => void;
  onBack: () => void;
}) {
  const applicant = APPLICANTS.find((a) => a.id === applicantId);
  if (!applicant) {
    return (
      <Callout tone="danger" title="Missing sample row">
        That family is not in the prototype set.
      </Callout>
    );
  }

  const campus = campusOf(campusId);
  const s = scoreApplicant(applicant, review);
  const variance =
    applicant.irsTraced > 0
      ? Math.abs(applicant.householdIncome - applicant.irsTraced) / applicant.irsTraced
      : 1;

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-2)" }}>
        <button type="button" className="btn-ghost" onClick={onBack}>
          {campus.name} queue
        </button>
        <span>/</span>
        <span className="font-medium text-black">{applicant.family}</span>
        <span className="ml-auto">
          {review.signed ? (
            <span className="rounded bg-slate-900 px-2 py-1 text-xs text-white">{review.decision}</span>
          ) : (
            <span className="rounded border px-2 py-1 text-xs" style={{ borderColor: "var(--grid)" }}>
              Unsigned
            </span>
          )}
        </span>
      </nav>

      <div>
        <h1 className="text-2xl font-semibold">
          {applicant.student} · {applicant.family} household
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>
          {applicant.type === "internal" ? "Internal / renewal" : "External / new"} · {applicant.kids} at{" "}
          {campus.name} · reviewer: {s.reviewer}
        </p>
      </div>

      {s.g1 === "Do Not Advance" ? (
        <Callout tone="danger" title="Gate 1 — Do Not Advance">
          {applicant.integrityWhy} Integrity does not enter the composite.
        </Callout>
      ) : null}
      {s.g1 === "Flag" ? (
        <Callout tone="warning" title="Gate 1 — Flag">
          {applicant.integrityWhy} Override to 3 or 4 with a written reason to
          advance; otherwise this family stays out of the ranked pool.
        </Callout>
      ) : null}
      {s.negativeGap ? (
        <Callout tone="warning" title="Negative gap — Integrity follow-up">
          Sticker × kids ({money(s.totalSticker)}) is below Clarity Suggested
          Household ({money(s.suggestedHousehold)}). v12 sends this back to Gate
          1; it is not a silent $0 award.
        </Callout>
      ) : null}
      {s.spread >= 3 ? (
        <Callout tone="warning" title="Committee tiebreaker">
          Human and AI advisory scores differ by 3 or more on at least one
          Section 2 criterion.
        </Callout>
      ) : null}
      {s.gate2Fail ? (
        <Callout tone="danger" title="Gate 2 — Do Not Advance">
          Aid Necessity and all three merit scores must be ≥ 2.
        </Callout>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Gate 1 — Integrity (AI)</h2>
        <SimpleTable
          rows={[
            ["IRS AGI trace present and matched", applicant.irsTrace ? "Yes" : "No"],
            [
              "MFJ Parent B complete",
              applicant.mfj ? (applicant.parentB ? "Yes" : "No") : "n/a (not MFJ)",
            ],
            ["W-2 / tax docs uploaded", applicant.docs ? "Yes" : "No"],
            [
              "Household income vs IRS-traced (≤ 10%)",
              applicant.irsTraced ? pct(variance) : "No IRS figure",
            ],
            [
              "Legacy tag",
              applicant.legacy
                ? applicant.legacyDocumented
                  ? "Present, documented"
                  : "Present, undocumented"
                : "None",
            ],
            [
              "AI integrity score",
              `${applicant.integritySeed} · ${gate1Label(applicant.integritySeed)}`,
            ],
          ]}
        />
        {s.g1 === "Flag" || s.g1 === "Do Not Advance" ? (
          <label className="flex items-center gap-2 text-sm">
            Reviewer override
            <select
              className="select"
              value={review.integrityOverride}
              onChange={(e) => onPatch({ integrityOverride: e.target.value })}
            >
              <option value="">Keep AI score</option>
              <option value="3">Override to 3 — Proceed</option>
              <option value="4">Override to 4 — Proceed</option>
            </select>
          </label>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Section 1 — Need (AI, mechanical)</h2>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          Tuition Burden uses Clarity Household Income Figure, not Clarity
          Suggested Household. Suggested Household only sizes the award.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Sticker / student" value={money(campus.sticker)} />
          <Stat label="Kids at Alpha" value={String(applicant.kids)} />
          <Stat label="Total Alpha tuition" value={money(s.totalSticker)} />
          <Stat label="Clarity household income" value={money(applicant.householdIncome)} />
        </div>
        <SimpleTable
          headers={["Input", "Value", "Used for"]}
          rows={[
            ["Tuition Burden", `${pct(s.burden)} → need ${s.necessity}`, "Rank (Section 1)"],
            ["Section 1 points", `${s.necessity} × 6 = ${s.section1} / 24`, "Composite"],
            ["Clarity Suggested Tuition", money(applicant.suggestedTuition), "Award size (per student)"],
            ["Clarity Suggested Household", money(s.suggestedHousehold), "Award size"],
            ["Family requested", money(applicant.requested), "Award cap"],
            [
              "Recommended aid",
              s.negativeGap ? "Integrity follow-up" : money(s.recommended),
              "MAX(0, MIN(sticker×kids − suggested household, requested))",
            ],
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Section 2 — Merit (human)</h2>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          {s.reviewer} enters the 1–4. AI advisory is shown only to flag a
          3-point spread. XP / life-skills stay with the reviewer.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <MeritField
            label="Academic Readiness"
            hint={
              applicant.type === "internal"
                ? "Internals: XP + growth targets"
                : "Externals: last 6 months of report cards"
            }
            value={review.academic}
            ai={applicant.aiAcademic}
            onChange={(value) => onPatch({ academic: value })}
          />
          <MeritField
            label="Effort & Character"
            hint={
              applicant.type === "internal"
                ? "Internals: life-skills + DoP observation"
                : "Externals: shadow day + behavior notes"
            }
            value={review.effort}
            ai={applicant.aiEffort}
            onChange={(value) => onPatch({ effort: value })}
          />
          <MeritField
            label="Creator Mindset"
            hint="Calibrate by age. Weight 2× (max 8)."
            value={review.creator}
            ai={applicant.aiCreator}
            onChange={(value) => onPatch({ creator: value })}
          />
        </div>
        <textarea
          className="select min-h-[88px] w-full"
          value={review.comments}
          onChange={(e) => onPatch({ comments: e.target.value })}
          placeholder="Reviewer rationale (required on override or sign-off)"
        />
      </section>

      <section className="space-y-3 border-t pt-5" style={{ borderColor: "var(--grid)" }}>
        <h2 className="text-lg font-semibold">Composite and sign-off</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Raw / 48" value={s.meritReady ? String(s.raw) : "—"} />
          <Stat label="Composite / 100" value={s.composite == null ? "—" : s.composite.toFixed(1)} />
          <Stat label="v12 band" value={s.band ?? "Awaiting merit"} />
          <Stat label="Recommended award" value={s.negativeGap ? "—" : money(s.recommended)} />
        </div>
        <p className="text-sm" style={{ color: "var(--ink-2)" }}>
          Band is mechanical from the composite. Signing does not move money —
          Cycle 1 is a campus recommendation.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="select"
            value={review.decision}
            onChange={(e) => onPatch({ decision: e.target.value as Decision })}
          >
            {DECISIONS.map((d) => (
              <option key={d || "unsigned"} value={d}>
                {d || "Unsigned"}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn-primary"
            disabled={s.g1 === "Proceed" && !s.negativeGap && !s.meritReady}
            onClick={() => onSign(review.decision || s.band || "Conditional / Review")}
          >
            Sign recommendation
          </button>
          {review.signed ? (
            <span className="text-sm" style={{ color: "var(--ink-2)" }}>
              Signed as {review.decision}. Change a score to unlock and re-sign.
            </span>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function MeritField({
  label,
  hint,
  value,
  ai,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  ai: number;
  onChange: (value: string) => void;
}) {
  const human = Number(value);
  const spread = value ? Math.abs(human - ai) : 0;
  return (
    <div className="rounded border bg-white p-3" style={{ borderColor: "var(--grid)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs" style={{ color: "var(--ink-muted)" }}>
          AI advisory {ai}
        </div>
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--ink-2)" }}>
        {hint}
      </p>
      <select className="select mt-2 w-full" value={value} onChange={(e) => onChange(e.target.value)}>
        {SCORE_OPTS.map((opt) => (
          <option key={opt || "blank"} value={opt}>
            {opt || "Not scored"}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs" style={{ color: "var(--ink-muted)" }}>
        {value
          ? `${human} × 2 = ${human * 2} / 8${spread >= 3 ? " · spread ≥ 3" : ""}`
          : "Not scored"}
      </p>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded border bg-white px-3 py-2" style={{ borderColor: "var(--grid)" }}>
      <div className={`text-lg font-semibold tabular-nums ${warn ? "text-amber-700" : ""}`}>
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--ink-muted)" }}>
        {label}
      </div>
    </div>
  );
}

function UsageBar({ total, spent, label }: { total: number; spent: number; label: string }) {
  const pctUsed = total > 0 ? Math.min(100, (spent / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 text-xs" style={{ color: "var(--ink-2)" }}>
        {label}
      </div>
      <div className="h-2 overflow-hidden rounded bg-white" style={{ outline: "1px solid var(--grid)" }}>
        <div className="h-full bg-slate-800" style={{ width: `${pctUsed}%` }} />
      </div>
    </div>
  );
}

function SimpleTable({
  headers,
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  const cols = headers ?? rows[0]?.map((_, i) => (i === 0 ? "Check" : "Result")) ?? [];
  return (
    <div className="overflow-auto rounded border bg-white" style={{ borderColor: "var(--grid)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide" style={{ color: "var(--ink-muted)" }}>
            {cols.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--grid)" }}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinePill({ line }: { line: string }) {
  const tone =
    line === "Funded"
      ? "bg-green-50 text-green-800"
      : line === "Do Not Advance"
        ? "bg-red-50 text-red-800"
        : line === "Flagged" || line === "Integrity follow-up"
          ? "bg-amber-50 text-amber-900"
          : line === "Awaiting merit"
            ? "bg-sky-50 text-sky-900"
            : "bg-slate-100 text-slate-700";
  return <span className={`rounded px-2 py-0.5 text-xs ${tone}`}>{line}</span>;
}

function Callout({
  tone,
  title,
  children,
}: {
  tone: "info" | "warning" | "danger";
  title: string;
  children: React.ReactNode;
}) {
  const box =
    tone === "danger"
      ? "border-red-200 bg-red-50"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50"
        : "border-slate-200 bg-white";
  return (
    <div className={`rounded border px-3 py-3 text-sm ${box}`}>
      <div className="font-medium">{title}</div>
      <div className="mt-1" style={{ color: "var(--ink-2)" }}>
        {children}
      </div>
    </div>
  );
}

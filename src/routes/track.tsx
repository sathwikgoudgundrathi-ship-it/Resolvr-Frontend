import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, CheckCircle2, Circle, Siren, ShieldCheck, Star } from "lucide-react";
import { useComplaints, slaState, fmtDur, SUPERVISORS, rateComplaint } from "@/lib/complaints";
import { toast } from "sonner";
import { Pill, SlaBar } from "@/components/app-ui";

export const Route = createFileRoute("/track")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => ({
    meta: [
      { title: "Track a complaint — Resolvr" },
      { name: "description", content: "Follow every step of your complaint with a transparent timeline, SLA clock, and verified work proof." },
      { property: "og:title", content: "Track a complaint — Resolvr" },
      { property: "og:description", content: "Transparent complaint status, SLA tracking, and completed work evidence." },
    ],
  }),
  component: Track,
});

const STEPS = ["Submitted", "Assigned", "In Progress", "Resolved"];

function Track() {
  const { id } = Route.useSearch();
  const nav = useNavigate();
  const list = useComplaints();
  const [q, setQ] = useState(id ?? "");
  const c = list.find((x) => x.id.toLowerCase() === (id ?? "").toLowerCase());

  return (
    <main className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">Track your complaint</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your complaint ticket ID to view real-time SLA countdown, assigned technician, and uploaded proof of work.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/track", search: { id: q.trim().toUpperCase() } }); }} className="mt-6 flex gap-2">
        <input className="field font-mono" placeholder="e.g. CMP-4810" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn btn-primary"><Search className="size-4" /> Track</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">Try demo IDs:
        {list.slice(0, 5).map((x) => <button key={x.id} onClick={() => { setQ(x.id); nav({ to: "/track", search: { id: x.id } }); }} className="text-primary hover:underline">{x.id}</button>)}</div>

      {id && !c && <p className="mt-10 text-muted-foreground">No complaint found with ID {id}. Please verify the number.</p>}
      {c && <Detail c={c} />}
    </main>
  );
}

function Detail({ c }: { c: ReturnType<typeof useComplaints>[number] }) {
  const s = slaState(c);
  const stepIdx = c.status === "Escalated" ? 2 : STEPS.indexOf(c.status);
  const [rating, setRating] = useState(c.rating || 5);
  const [feedback, setFeedback] = useState(c.feedback || "");
  const [rated, setRated] = useState(!!c.rating);

  const handleRate = async () => {
    try {
      await rateComplaint(c.id, rating, feedback);
      setRated(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your feedback.");
    }
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Overview Card */}
      <div className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-primary">{c.id}</div>
            <h2 className="mt-1 text-2xl font-bold">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
          </div>
          <div className="flex gap-2">
            <Pill kind="p" value={c.priority} />
            <Pill kind="s" value={c.status} />
          </div>
        </div>
        {c.image && (
          <div className="mt-4">
            <div className="font-mono text-[10px] uppercase text-muted-foreground mb-1">Citizen Reported Photo:</div>
            <img src={c.image} alt="Attached evidence" className="h-48 rounded-lg border border-border object-cover" />
          </div>
        )}
        <dl className="mt-6 grid grid-cols-2 gap-3 font-mono text-sm md:grid-cols-4">
          {[["Category", c.category], ["Department", c.department], ["Location", c.location], ["Assignee", c.assignee]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-muted p-3"><dt className="text-[10px] uppercase text-muted-foreground">{k}</dt><dd className="mt-1 truncate font-semibold">{v}</dd></div>))}
        </dl>
      </div>

      {/* SLA & Progress Tracker */}
      <div className="panel p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">SLA · {c.slaHours}h target</span>
          <span className={`font-mono ${s.breached ? "text-destructive font-bold" : "text-primary"}`}>
            {c.status === "Resolved" ? "Closed & Verified" : s.breached ? `Overdue by ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} left`}
          </span>
        </div>
        <div className="mt-3"><SlaBar pct={s.pct} breached={s.breached} /></div>
        <div className="mt-6 grid grid-cols-4 gap-2">
          {STEPS.map((st, i) => (
            <div key={st} className="text-center">
              <div className={`mx-auto h-1 rounded-full ${i <= stepIdx ? "bg-primary" : "bg-muted"}`} />
              <div className={`mt-2 text-xs ${i <= stepIdx ? "text-foreground font-bold" : "text-muted-foreground"}`}>{st}</div>
            </div>))}
        </div>
        {c.escalationLevel > 0 && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <Siren className="size-4" /> Auto-escalated to <b>{SUPERVISORS[c.escalationLevel - 1]}</b> (level {c.escalationLevel}/3) due to SLA breach
          </div>
        )}
      </div>

      {/* WORK COMPLETION PROOF SECTION */}
      {c.completionProof && (
        <div className="panel border-success/40 bg-success/5 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-success text-base">
              <ShieldCheck className="size-5" /> Completed Work Evidence & Verification
            </div>
            {c.rating && (
              <div className="flex items-center gap-1 font-mono text-amber-400 text-xs">
                <Star className="size-3.5 fill-current" />
                Citizen Rating: {c.rating}/5
              </div>
            )}
          </div>

          <div className="mt-3 text-sm">
            <span className="font-semibold text-foreground">Technician Action Notes:</span>
            <p className="mt-1 text-muted-foreground bg-card/60 p-3 rounded-xl border border-border">
              {c.completionProof.notes}
            </p>
          </div>

          {c.completionProof.partsUsed && (
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              <b>Parts/Components Replaced:</b> {c.completionProof.partsUsed}
            </div>
          )}

          {/* Before & After comparison */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.image && (
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground mb-1">
                  Before (Original Issue)
                </div>
                <img src={c.image} alt="Before" className="h-40 w-full rounded-lg border object-cover" />
              </div>
            )}
            {c.completionProof.image && (
              <div>
                <div className="font-mono text-[10px] uppercase text-success mb-1">
                  After (Worker Completion Proof Photo)
                </div>
                <img src={c.completionProof.image} alt="After" className="h-40 w-full rounded-lg border border-success/40 object-cover" />
              </div>
            )}
          </div>

          <div className="mt-3 text-right font-mono text-[11px] text-muted-foreground">
            Executed by {c.completionProof.completedBy} at {new Date(c.completionProof.completedAt).toLocaleString()}
          </div>

          {/* Citizen Rating Widget */}
          <div className="mt-6 border-t border-success/20 pt-4">
            <h4 className="font-bold text-xs">Citizen Satisfaction Feedback:</h4>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={rated}
                  onClick={() => setRating(star)}
                  className={`p-1 transition ${star <= rating ? "text-amber-400" : "text-muted-foreground/30"}`}
                >
                  <Star className="size-5 fill-current" />
                </button>
              ))}
              <span className="ml-2 font-mono text-xs">{rating}/5 Stars</span>
            </div>

            {!rated ? (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Leave comment on repair quality..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="field text-xs"
                />
                <button onClick={handleRate} className="btn btn-primary px-4 py-1.5 text-xs">
                  Submit Feedback
                </button>
              </div>
            ) : (
              <p className="mt-2 font-mono text-xs text-success">
                ✓ Thank you! Your feedback has been verified and logged.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Timeline Audit */}
      <div className="panel p-6">
        <h3 className="font-bold">Transparent Audit Timeline</h3>
        <ol className="mt-4 space-y-4">
          {[...c.timeline].sort((a, b) => b.at - a.at).map((t, i) => (
            <li key={i} className="flex gap-3">
              {i === 0 ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
              <div>
                <div className={`text-sm ${t.label.includes("scalat") ? "text-destructive font-semibold" : ""}`}>{t.label}</div>
                <div className="font-mono text-xs text-muted-foreground">{new Date(t.at).toLocaleString()}{t.note ? ` · ${t.note}` : ""}</div>
              </div>
            </li>))}
        </ol>
      </div>
    </div>
  );
}

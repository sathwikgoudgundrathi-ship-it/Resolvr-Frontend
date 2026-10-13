import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, CheckCircle2, Clock, AlertOctagon, Camera, UploadCloud, 
  MapPin, CheckCheck, X, Sparkles, User, ShieldCheck, ArrowRight 
} from "lucide-react";
import { 
  useComplaints, updateStatus, resolveWithProof, slaState, 
  fmtDur, ago, type Complaint, type Status 
} from "@/lib/complaints";
import { useAuth } from "@/lib/auth";
import { Pill, SlaBar } from "@/components/app-ui";
import { toast } from "sonner";

const SAMPLE_PROOF_IMAGES = [
  {
    label: "Street Light Repaired",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Plumbing Pipe Replaced",
    url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Garbage Cleared & Sanitized",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Electrical Circuit Restored",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  },
];

export function WorkerDashboard() {
  const { user } = useAuth();
  const allComplaints = useComplaints();
  const [tab, setTab] = useState<"assigned" | "in_progress" | "resolved" | "all">("assigned");
  const [proofModalComplaint, setProofModalComplaint] = useState<Complaint | null>(null);

  // Match complaints assigned to this worker or their department
  const workerComplaints = useMemo(() => {
    if (!user) return allComplaints;
    const workerName = user.name.toLowerCase();
    const dept = user.department?.toLowerCase();

    // Check direct assignee match or department match
    const matches = allComplaints.filter((c) => {
      const matchAssignee = c.assignee.toLowerCase().includes(workerName) || workerName.includes(c.assignee.toLowerCase());
      const matchDept = dept && c.department.toLowerCase() === dept;
      return matchAssignee || matchDept;
    });

    return matches.length > 0 ? matches : allComplaints;
  }, [allComplaints, user]);

  const filtered = useMemo(() => {
    switch (tab) {
      case "assigned":
        return workerComplaints.filter((c) => c.status === "Assigned" || c.status === "Submitted");
      case "in_progress":
        return workerComplaints.filter((c) => c.status === "In Progress" || c.status === "Escalated");
      case "resolved":
        return workerComplaints.filter((c) => c.status === "Resolved");
      default:
        return workerComplaints;
    }
  }, [workerComplaints, tab]);

  const totalAssigned = workerComplaints.filter((c) => c.status !== "Resolved").length;
  const inProgCount = workerComplaints.filter((c) => c.status === "In Progress").length;
  const urgentCount = workerComplaints.filter((c) => (c.priority === "Critical" || c.priority === "High") && c.status !== "Resolved").length;
  const resolvedCount = workerComplaints.filter((c) => c.status === "Resolved").length;

  const handleStartWork = (id: string) => {
    void updateStatus(id, "In Progress").catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Could not update complaint status."));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Worker Header Banner */}
      <div className="panel glow relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 font-mono text-xs text-warning">
              <Wrench className="size-3.5" /> Field Technician & Crew Portal
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Technician Workspace: <span className="text-gradient">{user?.name || "Field Worker"}</span>
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Department: <b className="text-foreground">{user?.department || "Maintenance & Facilities"}</b> · Status: <span className="text-success font-semibold">Active On-Duty</span>
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 p-3 font-mono text-xs">
            <span className="size-2.5 rounded-full bg-success animate-pulse" />
            <span>Ready for field work & proof uploads</span>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="text-xs text-muted-foreground">Tasks to Execute</div>
            <div className="mt-2 font-mono text-3xl font-bold">{totalAssigned}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="text-xs text-muted-foreground">In Progress</div>
            <div className="mt-2 font-mono text-3xl font-bold text-warning">{inProgCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="text-xs text-muted-foreground">Critical Urgency</div>
            <div className="mt-2 font-mono text-3xl font-bold text-destructive">{urgentCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="text-xs text-muted-foreground">Completed Work</div>
            <div className="mt-2 font-mono text-3xl font-bold text-success">{resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Main Task List */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold">Assigned Work Orders</h2>
            <p className="text-xs text-muted-foreground">
              Execute field repairs, update job status, and upload photographic completion evidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted p-1 text-xs">
            <button
              onClick={() => setTab("assigned")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                tab === "assigned" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Assigned to Me ({totalAssigned})
            </button>
            <button
              onClick={() => setTab("in_progress")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                tab === "in_progress" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              In Progress ({inProgCount})
            </button>
            <button
              onClick={() => setTab("resolved")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                tab === "resolved" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed ({resolvedCount})
            </button>
            <button
              onClick={() => setTab("all")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                tab === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Dept Tickets ({workerComplaints.length})
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const s = slaState(c);
            return (
              <motion.article
                key={c.id}
                layout
                className={`panel flex flex-col justify-between p-5 transition ${
                  c.status === "Resolved"
                    ? "border-success/30 bg-success/5"
                    : c.priority === "Critical"
                    ? "border-destructive/40"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{c.id}</span>
                    <div className="flex gap-1.5">
                      <Pill kind="p" value={c.priority} />
                      <Pill kind="s" value={c.status} />
                    </div>
                  </div>

                  <h3 className="mt-3 font-semibold text-base">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{c.description}</p>

                  <div className="mt-3 space-y-1 rounded-xl bg-muted/40 p-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-primary" />
                      <span className="truncate">{c.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="size-3.5" />
                      <span>Reporter: {c.reporter}</span>
                    </div>
                  </div>

                  {/* Citizen's Reported Image */}
                  {c.image && (
                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">
                        Citizen Photo:
                      </div>
                      <img
                        src={c.image}
                        alt="Citizen reported issue"
                        className="mt-1 h-32 w-full rounded-lg border object-cover"
                      />
                    </div>
                  )}

                  {/* SLA Bar */}
                  {c.status !== "Resolved" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-muted-foreground">SLA Window: {c.slaHours}h</span>
                        <span className={s.breached ? "text-destructive font-bold" : "text-foreground"}>
                          {s.breached ? `Breached by ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} remaining`}
                        </span>
                      </div>
                      <div className="mt-1">
                        <SlaBar pct={s.pct} breached={s.breached} />
                      </div>
                    </div>
                  )}

                  {/* If Resolved: Show Worker's Uploaded Proof */}
                  {c.status === "Resolved" && c.completionProof && (
                    <div className="mt-4 rounded-xl border border-success/30 bg-success/10 p-3 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-success">
                        <CheckCircle2 className="size-3.5" /> Work Proof Uploaded
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        “{c.completionProof.notes}”
                      </p>
                      {c.completionProof.partsUsed && (
                        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                          Parts: {c.completionProof.partsUsed}
                        </div>
                      )}
                      {c.completionProof.image && (
                        <img
                          src={c.completionProof.image}
                          alt="Work completion proof"
                          className="mt-2 h-28 w-full rounded-lg border border-success/30 object-cover"
                        />
                      )}
                      <div className="mt-2 text-right font-mono text-[10px] text-muted-foreground">
                        Completed at {new Date(c.completionProof.completedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Worker Action Buttons */}
                <div className="mt-5 border-t border-border pt-4">
                  {c.status !== "Resolved" ? (
                    <div className="flex flex-col gap-2">
                      {c.status !== "In Progress" && (
                        <button
                          onClick={() => handleStartWork(c.id)}
                          className="btn btn-ghost w-full py-2 text-xs"
                        >
                          <Clock className="size-3.5 text-warning" /> Start Working on Ticket
                        </button>
                      )}
                      <button
                        onClick={() => setProofModalComplaint(c)}
                        className="btn btn-primary w-full py-2 text-xs"
                      >
                        <UploadCloud className="size-3.5" /> Mark Completed & Upload Proof
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-success font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCheck className="size-4" /> Work Complete
                      </span>
                      {c.rating && (
                        <span className="font-mono text-amber-400">
                          Citizen Rating: {c.rating}★
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="panel p-12 text-center">
            <CheckCheck className="mx-auto size-8 text-success" />
            <h3 className="mt-3 text-lg font-bold">All caught up!</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No tasks currently pending in this category.
            </p>
          </div>
        )}
      </div>

      {/* Modal: Upload Work Completion Proof */}
      <AnimatePresence>
        {proofModalComplaint && (
          <WorkProofUploadModal
            complaint={proofModalComplaint}
            onClose={() => setProofModalComplaint(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function WorkProofUploadModal({
  complaint,
  onClose,
}: {
  complaint: Complaint;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [proofImg, setProofImg] = useState<string | undefined>(
    SAMPLE_PROOF_IMAGES[0]?.url
  );
  const [notes, setNotes] = useState("");
  const [parts, setParts] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setProofImg(r.result as string);
    r.readAsDataURL(f);
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setSubmitting(true);
    try {
    await resolveWithProof(complaint.id, {
      completedBy: user?.name || "Field Worker",
      notes: notes.trim(),
      partsUsed: parts.trim() || undefined,
      image: proofImg,
    });

    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save completion proof.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="panel max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <div className="font-mono text-xs text-primary">{complaint.id}</div>
            <h3 className="text-xl font-bold">Upload Work Completion Proof</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        {success ? (
          <div className="py-12 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto size-14 rounded-full bg-success/20 grid place-items-center text-success">
              <CheckCircle2 className="size-8" />
            </motion.div>
            <h4 className="mt-4 text-xl font-bold">Work Proof Uploaded!</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Complaint {complaint.id} marked as Resolved and proof logged to the public timeline.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitProof} className="mt-5 space-y-5">
            <div className="rounded-xl bg-muted/40 p-3 text-xs">
              <span className="font-semibold text-foreground">Complaint Title: </span>
              <span className="text-muted-foreground">{complaint.title}</span>
              <div className="mt-1">
                <span className="font-semibold text-foreground">Location: </span>
                <span className="text-muted-foreground">{complaint.location}</span>
              </div>
            </div>

            {/* Photo of Completed Work */}
            <div>
              <label className="mb-2 block font-mono text-xs text-muted-foreground">
                Proof of Completed Work (Photo)
              </label>

              {proofImg ? (
                <div className="relative w-fit">
                  <img
                    src={proofImg}
                    alt="Proof Preview"
                    className="h-44 w-full rounded-xl border border-success/40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setProofImg(undefined)}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input py-8 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                  <Camera className="size-5" /> Attach or drop proof photo
                  <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
              )}

              {/* Quick sample photo selector for testing */}
              <div className="mt-3">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  Quick Sample Evidence Presets:
                </span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {SAMPLE_PROOF_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setProofImg(img.url)}
                      className={`rounded-lg border px-2 py-1 text-[11px] transition ${
                        proofImg === img.url
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action report notes */}
            <div>
              <label className="mb-1 block font-mono text-xs text-muted-foreground">
                Work Remarks / Action Taken <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Replaced faulty 100W halogen bulb with 50W LED array. Verified voltage and illuminated area properly."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="field min-h-20 resize-none text-sm"
              />
            </div>

            {/* Parts / Materials used */}
            <div>
              <label className="mb-1 block font-mono text-xs text-muted-foreground">
                Parts & Materials Used (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 50W LED Bulb, 2x Terminal Connectors, 3m Wire"
                value={parts}
                onChange={(e) => setParts(e.target.value)}
                className="field text-sm"
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="font-mono text-xs text-muted-foreground">
                Technician: <b className="text-foreground">{user?.name || "Field Worker"}</b>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="btn btn-ghost text-xs">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!notes.trim() || submitting}
                  className="btn btn-primary text-xs disabled:opacity-40"
                >
                  <ShieldCheck className="size-4" /> Submit Proof & Close Ticket
                </button>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

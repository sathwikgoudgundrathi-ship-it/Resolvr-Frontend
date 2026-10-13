import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, PlusCircle, CheckCircle2, Clock, AlertTriangle, 
  MapPin, Camera, Sparkles, X, Star, Eye, Send, ArrowRight, ShieldCheck
} from "lucide-react";
import { 
  useComplaints, addComplaint, rateComplaint, analyze, SLA, 
  type Complaint, type Category, type Priority, ago, fmtDur, slaState 
} from "@/lib/complaints";
import { useAuth } from "@/lib/auth";
import { Pill, SlaBar } from "@/components/app-ui";
import { toast } from "sonner";

const CATS: Category[] = ["Electrical", "Plumbing", "Sanitation", "Roads", "Security", "IT & Network", "Noise", "General"];
const PRIS: Priority[] = ["Critical", "High", "Medium", "Low"];
const DEPT: Record<Category, string> = { 
  Electrical: "Maintenance", 
  Plumbing: "Water Works", 
  Sanitation: "Sanitation", 
  Roads: "Public Works", 
  Security: "Security", 
  "IT & Network": "IT Services", 
  Noise: "Community Affairs", 
  General: "Help Desk" 
};

export function CitizenDashboard() {
  const { user } = useAuth();
  const allComplaints = useComplaints();
  const [filter, setFilter] = useState<"all" | "active" | "in_progress" | "resolved">("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // New Complaint Form state
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [img, setImg] = useState<string>();
  const [over, setOver] = useState<{ category?: Category; priority?: Priority }>({});
  const [submitting, setSubmitting] = useState(false);

  // Filter complaints reported by the user or relevant sample
  const myComplaints = useMemo(() => {
    if (!user) return allComplaints;
    // Show complaints matching reporter name, or if none, show the demo list so citizen has plenty to interact with
    const directMatches = allComplaints.filter(
      (c) => c.reporter.toLowerCase() === user.name.toLowerCase()
    );
    return directMatches.length > 0 ? directMatches : allComplaints;
  }, [allComplaints, user]);

  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return myComplaints.filter((c) => c.status === "Submitted" || c.status === "Assigned");
      case "in_progress":
        return myComplaints.filter((c) => c.status === "In Progress" || c.status === "Escalated");
      case "resolved":
        return myComplaints.filter((c) => c.status === "Resolved");
      default:
        return myComplaints;
    }
  }, [myComplaints, filter]);

  // AI analysis
  const ai = useMemo(() => analyze(desc), [desc]);
  const category = over.category ?? ai.category;
  const priority = over.priority ?? ai.priority;
  const location = loc || ai.location;
  const ready = desc.trim().length >= 10;

  const onFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(r.result as string);
    r.readAsDataURL(f);
  };

  const handleLodgeComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setSubmitting(true);
    try {
    const newComp = await addComplaint({
      description: desc,
      location: location || "Campus / Ward Central",
      reporter: user?.name || "Citizen Reporter",
      image: img,
      category,
      priority,
      department: DEPT[category],
      confidence: ai.confidence,
    });
    setSubmitting(false);
    setShowSubmitModal(false);
    setDesc("");
    setLoc("");
    setImg(undefined);
    setOver({});
    setSelectedComplaint(newComp);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  const total = myComplaints.length;
  const inProg = myComplaints.filter((c) => c.status === "In Progress" || c.status === "Assigned").length;
  const resolved = myComplaints.filter((c) => c.status === "Resolved").length;
  const escalated = myComplaints.filter((c) => c.status === "Escalated").length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Hero */}
      <div className="panel glow relative overflow-hidden p-6 sm:p-8">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-primary">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Citizen Public Portal
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Hello, <span className="text-gradient">{user?.name || "Citizen"}</span>
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Report public infrastructure issues, civic problems, or campus repairs. Our AI engine
              triages and routes your ticket to the right department crew in seconds.
            </p>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="btn btn-primary px-5 py-3 shadow-lg"
          >
            <PlusCircle className="size-4" /> Lodge New Complaint
          </button>
        </div>

        {/* Stats Strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="size-3.5 text-primary" /> Total Filed
            </div>
            <div className="mt-2 font-mono text-2xl font-bold">{total}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-warning" /> In Progress
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-warning">{inProg}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-success" /> Resolved Work
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-success">{resolved}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="size-3.5 text-destructive" /> Auto-Escalated
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-destructive">{escalated}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold">My Grievances & Complaints</h2>
            <p className="text-xs text-muted-foreground">
              Track real-time progress, technician assignments, and verify uploaded completion proofs.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({myComplaints.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                filter === "active" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("in_progress")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                filter === "in_progress" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                filter === "resolved" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Resolved ({resolved})
            </button>
          </div>
        </div>

        {/* Complaints List */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const s = slaState(c);
            return (
              <motion.article
                key={c.id}
                layout
                className={`panel flex flex-col justify-between p-5 transition hover:border-primary/40 ${
                  c.status === "Resolved" ? "border-success/30 bg-success/5" : ""
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

                  <h3 className="mt-3 font-semibold line-clamp-1">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
                    <span>🏢 {c.department}</span>
                    <span>📍 {c.location}</span>
                    <span>👷 Assignee: {c.assignee}</span>
                  </div>

                  {/* If Resolved, Highlight Completion Proof Preview */}
                  {c.status === "Resolved" && c.completionProof && (
                    <div className="mt-3 rounded-lg border border-success/30 bg-success/10 p-2.5 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-success">
                        <ShieldCheck className="size-3.5" /> Work Completed & Proof Uploaded
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                        “{c.completionProof.notes}”
                      </p>
                      {c.completionProof.image && (
                        <div className="mt-2 text-[10px] text-primary">
                          📸 Work proof photo verified
                        </div>
                      )}
                    </div>
                  )}

                  {/* SLA Bar */}
                  {c.status !== "Resolved" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                        <span>SLA: {c.slaHours}h target</span>
                        <span className={s.breached ? "text-destructive font-bold" : ""}>
                          {s.breached ? `Overdue ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} left`}
                        </span>
                      </div>
                      <div className="mt-1">
                        <SlaBar pct={s.pct} breached={s.breached} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {ago(c.createdAt)}
                  </span>
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View Details & Proof <ArrowRight className="size-3" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="panel p-12 text-center">
            <CheckCircle2 className="mx-auto size-8 text-muted-foreground" />
            <h3 className="mt-3 text-lg font-bold">No complaints found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You don't have any complaints in this category.
            </p>
            <button onClick={() => setShowSubmitModal(true)} className="btn btn-primary mt-4">
              Lodge a complaint
            </button>
          </div>
        )}
      </div>

      {/* Modal: Lodge Complaint with AI Triage */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="panel max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-primary/10 p-1.5 text-primary">
                    <Sparkles className="size-4" />
                  </span>
                  <h3 className="text-xl font-bold">Lodge a Grievance</h3>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleLodgeComplaint} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted-foreground">
                    Describe the issue in plain words
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. The water tap on 2nd floor hostel corridor is leaking heavily and flooding the floor..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="field min-h-24 resize-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-mono text-xs text-muted-foreground">
                      Location / Landmark
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={ai.location ? `Detected: ${ai.location}` : "e.g. Block B, Room 204"}
                        value={loc}
                        onChange={(e) => setLoc(e.target.value)}
                        className="field pr-8"
                      />
                      <MapPin className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-xs text-muted-foreground">
                      Complainant Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user?.name || "Citizen Reporter"}
                      className="field opacity-75"
                    />
                  </div>
                </div>

                {/* Photo attachment */}
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted-foreground">
                    Attach Initial Evidence / Photo (Optional)
                  </label>
                  {img ? (
                    <div className="relative w-fit">
                      <img src={img} alt="Evidence" className="h-32 rounded-lg border object-cover" />
                      <button
                        type="button"
                        onClick={() => setImg(undefined)}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input py-6 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                      <Camera className="size-4" /> Drop image or click to upload
                      <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
                    </label>
                  )}
                </div>

                {/* AI Triage Feedback */}
                {ready && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs">
                    <div className="flex items-center gap-2 font-mono text-primary font-bold">
                      <Sparkles className="size-3.5" /> AI Prediction Live
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 font-mono sm:grid-cols-4">
                      <div className="rounded-lg bg-card/80 p-2">
                        <div className="text-[10px] text-muted-foreground">Category</div>
                        <div className="font-semibold text-primary">{category}</div>
                      </div>
                      <div className="rounded-lg bg-card/80 p-2">
                        <div className="text-[10px] text-muted-foreground">Priority</div>
                        <div className="font-semibold text-accent">{priority}</div>
                      </div>
                      <div className="rounded-lg bg-card/80 p-2">
                        <div className="text-[10px] text-muted-foreground">Department</div>
                        <div className="font-semibold">{DEPT[category]}</div>
                      </div>
                      <div className="rounded-lg bg-card/80 p-2">
                        <div className="text-[10px] text-muted-foreground">Target SLA</div>
                        <div className="font-semibold">{SLA[priority]} hours</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!ready || submitting}
                    className="btn btn-primary disabled:opacity-40"
                  >
                    <Send className="size-4" /> Submit Complaint
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail & Work Proof Inspection Modal */}
      <AnimatePresence>
        {selectedComplaint && (
          <DetailModal
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function DetailModal({
  complaint,
  onClose,
}: {
  complaint: Complaint;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(complaint.rating || 5);
  const [feedback, setFeedback] = useState(complaint.feedback || "");
  const [rated, setRated] = useState(!!complaint.rating);
  const s = slaState(complaint);

  const handleRate = async () => {
    try {
      await rateComplaint(complaint.id, rating, feedback);
      setRated(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your feedback.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="panel max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <div className="font-mono text-xs text-primary">{complaint.id}</div>
            <h2 className="mt-1 text-2xl font-bold">{complaint.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Filed {ago(complaint.createdAt)} by {complaint.reporter}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Pill kind="p" value={complaint.priority} />
            <Pill kind="s" value={complaint.status} />
            <button
              onClick={onClose}
              className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase text-muted-foreground">Problem Description</h3>
            <p className="mt-1 text-sm text-foreground bg-muted/40 rounded-xl p-3">
              {complaint.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4">
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Department</span>
              <p className="mt-0.5 font-bold">{complaint.department}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Location</span>
              <p className="mt-0.5 font-bold truncate">{complaint.location}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Assigned Crew</span>
              <p className="mt-0.5 font-bold">{complaint.assignee}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">SLA Window</span>
              <p className="mt-0.5 font-bold">{complaint.slaHours} hours</p>
            </div>
          </div>

          {/* WORK PROOF SECTION (Crucial for User's Requirement) */}
          {complaint.completionProof && (
            <div className="rounded-2xl border border-success/40 bg-success/10 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-success">
                <CheckCircle2 className="size-5" />
                Work Completed & Verified by Field Worker
              </div>
              <div className="mt-3 text-xs text-foreground">
                <p className="font-semibold">Worker Action Report:</p>
                <p className="mt-1 text-muted-foreground bg-background/50 p-2.5 rounded-lg">
                  {complaint.completionProof.notes}
                </p>
              </div>

              {complaint.completionProof.partsUsed && (
                <div className="mt-3 text-xs">
                  <span className="font-mono text-muted-foreground">Parts / Resources Replaced: </span>
                  <span className="font-bold">{complaint.completionProof.partsUsed}</span>
                </div>
              )}

              {/* Before & After Photo Comparison */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {complaint.image && (
                  <div>
                    <div className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
                      Before (Citizen Reported Issue)
                    </div>
                    <img
                      src={complaint.image}
                      alt="Before repair"
                      className="h-40 w-full rounded-lg border object-cover"
                    />
                  </div>
                )}
                {complaint.completionProof.image && (
                  <div>
                    <div className="mb-1 font-mono text-[10px] uppercase text-success">
                      After (Worker Completed Proof Photo)
                    </div>
                    <img
                      src={complaint.completionProof.image}
                      alt="After repair proof"
                      className="h-40 w-full rounded-lg border border-success/40 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="mt-3 text-right font-mono text-[11px] text-muted-foreground">
                Verified by {complaint.completionProof.completedBy} at{" "}
                {new Date(complaint.completionProof.completedAt).toLocaleString()}
              </div>

              {/* Citizen Rating Widget */}
              <div className="mt-5 border-t border-success/20 pt-4">
                <h4 className="font-bold text-xs text-foreground">Rate this Resolution:</h4>
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={rated}
                      onClick={() => setRating(star)}
                      className={`p-1 transition ${
                        star <= rating ? "text-amber-400" : "text-muted-foreground/40"
                      }`}
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
                      placeholder="Add brief satisfaction feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="field text-xs"
                    />
                    <button onClick={handleRate} className="btn btn-primary px-4 py-1.5 text-xs">
                      Submit Rating
                    </button>
                  </div>
                ) : (
                  <p className="mt-2 font-mono text-xs text-success">
                    ✓ Feedback recorded. Thank you for helping improve civic services!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Timeline Audit */}
          <div>
            <h3 className="font-mono text-xs uppercase text-muted-foreground">Audit Timeline</h3>
            <ol className="mt-3 space-y-3">
              {[...complaint.timeline]
                .sort((a, b) => b.at - a.at)
                .map((t, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs">
                    <div className="mt-0.5 size-2 rounded-full bg-primary shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">{t.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {new Date(t.at).toLocaleString()} {t.note ? `· ${t.note}` : ""}
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

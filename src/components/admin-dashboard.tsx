import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Siren, Timer, Inbox, CheckCircle2, 
  UserCheck, AlertTriangle, ShieldCheck, ArrowRight, X, Star, Filter, Eye, Search 
} from "lucide-react";
import { 
  useComplaints, slaState, fmtDur, ago, updateStatus, 
  assignWorker, 
  type Complaint, type Status, type Priority, type Category 
} from "@/lib/complaints";
import { useAuth } from "@/lib/auth";
import { Pill, SlaBar } from "@/components/app-ui";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

const ALL_DEPTS = ["All", "Maintenance", "Water Works", "Sanitation", "Public Works", "Security", "IT Services", "Community Affairs", "Help Desk"];

export function AdminDashboard() {
  const { user } = useAuth();
  const list = useComplaints();
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectComplaint, setInspectComplaint] = useState<Complaint | null>(null);
  const [assignModalComplaint, setAssignModalComplaint] = useState<Complaint | null>(null);

  const [workersList, setWorkersList] = useState<{ name: string; department: string }[]>([]);
  useEffect(() => {
    void apiRequest<{ name: string; department: string }[]>("/users/workers").then(setWorkersList)
      .catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Could not load worker accounts."));
  }, []);

  // Filter complaints
  const filtered = useMemo(() => {
    return list.filter((c) => {
      const matchDept = selectedDept === "All" || c.department === selectedDept;
      const matchStatus = selectedStatus === "All" || (selectedStatus === "Open" ? c.status !== "Resolved" : c.status === selectedStatus);
      const matchPriority = selectedPriority === "All" || c.priority === selectedPriority;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.reporter.toLowerCase().includes(q) || c.assignee.toLowerCase().includes(q);
      return matchDept && matchStatus && matchPriority && matchSearch;
    });
  }, [list, selectedDept, selectedStatus, selectedPriority, searchQuery]);

  const openCount = list.filter((c) => c.status !== "Resolved").length;
  const inProgCount = list.filter((c) => c.status === "In Progress").length;
  const breachedCount = list.filter((c) => slaState(c).breached).length;
  const escalatedCount = list.filter((c) => c.status === "Escalated").length;
  const resolvedCount = list.filter((c) => c.status === "Resolved").length;
  const atRiskCount = list.filter((c) => {
    const s = slaState(c);
    return !s.breached && s.pct > 0.75 && c.status !== "Resolved";
  }).length;

  return (
    <main className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="panel glow relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Executive Command & Operations Center
            </div>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Administrator Master Console
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Oversee city & campus complaints, allocate field technician crews, enforce SLAs,
              and inspect photographic completion evidence. Logged in as: <b className="text-foreground">{user?.name || "Administrator"}</b>
            </p>
          </div>

        </div>

        {/* Global KPIs */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Inbox className="size-3.5" /> Active Open
            </div>
            <div className="mt-2 font-mono text-3xl font-bold">{openCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Timer className="size-3.5 text-accent" /> SLA At-Risk
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-accent">{atRiskCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Siren className="size-3.5 text-destructive" /> SLA Breached
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-destructive">{breachedCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="size-3.5 text-destructive" /> Auto-Escalated
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-destructive">{escalatedCount}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-success" /> Total Resolved
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-success">{resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 p-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by ID, title, crew, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field py-1.5 pl-8 text-xs"
            />
            <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          </div>

          {/* Department selector */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="field w-auto py-1.5 text-xs"
          >
            {ALL_DEPTS.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Departments" : `Dept: ${d}`}
              </option>
            ))}
          </select>

          {/* Status selector */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="field w-auto py-1.5 text-xs"
          >
            <option value="All">All Statuses</option>
            <option value="Open">All Open Tickets</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Priority selector */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="field w-auto py-1.5 text-xs"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          Showing <b>{filtered.length}</b> of {list.length} records
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const s = slaState(c);
          return (
            <motion.article
              key={c.id}
              layout
              className={`panel flex flex-col justify-between p-5 transition hover:border-primary/40 ${
                c.status === "Escalated"
                  ? "border-destructive/40 bg-destructive/5"
                  : c.status === "Resolved"
                  ? "border-success/30 bg-success/5"
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
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-muted-foreground">
                  <div className="rounded-lg bg-muted/60 p-2">
                    <div className="text-[10px] text-muted-foreground">Department</div>
                    <div className="font-semibold text-foreground truncate">{c.department}</div>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2">
                    <div className="text-[10px] text-muted-foreground">Technician</div>
                    <div className="font-semibold text-foreground truncate">{c.assignee}</div>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2">
                    <div className="text-[10px] text-muted-foreground">Location</div>
                    <div className="font-semibold text-foreground truncate">{c.location}</div>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2">
                    <div className="text-[10px] text-muted-foreground">Reporter</div>
                    <div className="font-semibold text-foreground truncate">{c.reporter}</div>
                  </div>
                </div>

                {/* SLA Monitor */}
                {c.status !== "Resolved" ? (
                  <div className="mt-3">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-muted-foreground">SLA: {c.slaHours}h Target</span>
                      <span className={s.breached ? "text-destructive font-bold" : "text-muted-foreground"}>
                        {s.breached ? `Overdue ${fmtDur(-s.remaining)} · L${c.escalationLevel}` : `${fmtDur(s.remaining)} left`}
                      </span>
                    </div>
                    <div className="mt-1">
                      <SlaBar pct={s.pct} breached={s.breached} />
                    </div>
                  </div>
                ) : (
                  c.completionProof && (
                    <div className="mt-3 rounded-lg border border-success/30 bg-success/10 p-2.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-success">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="size-3.5" /> Proof Submitted
                        </span>
                        {c.rating && <span className="font-mono text-amber-400">{c.rating}★</span>}
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                        “{c.completionProof.notes}”
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Admin Actions Bar */}
              <div className="mt-5 border-t border-border pt-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {/* Reassign Worker Button */}
                    <button
                      onClick={() => setAssignModalComplaint(c)}
                      className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[11px] font-medium hover:bg-muted"
                      title="Reassign to another technician"
                    >
                      <UserCheck className="size-3 text-primary" /> Reassign
                    </button>

                    {/* Escalate button */}
                    {c.status !== "Resolved" && (
                      <button
                        onClick={() => void updateStatus(c.id, "Escalated").catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Could not escalate complaint."))}
                        className="rounded-md bg-destructive/15 px-2 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/25"
                        title="Manually escalate to next authority level"
                      >
                        Escalate
                      </button>
                    )}

                  </div>

                  {/* Inspect Details / Proof */}
                  <button
                    onClick={() => setInspectComplaint(c)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <Eye className="size-3" /> Inspect <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="panel mt-6 p-12 text-center">
          <Filter className="mx-auto size-8 text-muted-foreground" />
          <h3 className="mt-3 text-lg font-bold">No complaints match your filters</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search query, department, or status filters.
          </p>
        </div>
      )}

      {/* Reassign Worker Modal */}
      <AnimatePresence>
        {assignModalComplaint && (
          <ReassignModal
            complaint={assignModalComplaint}
            workers={workersList}
            onClose={() => setAssignModalComplaint(null)}
          />
        )}
      </AnimatePresence>

      {/* Inspect Complaint / Work Proof Modal */}
      <AnimatePresence>
        {inspectComplaint && (
          <AdminDetailModal
            complaint={inspectComplaint}
            onClose={() => setInspectComplaint(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ReassignModal({
  complaint,
  workers,
  onClose,
}: {
  complaint: Complaint;
  workers: { name: string; department: string }[];
  onClose: () => void;
}) {
  const [selectedWorker, setSelectedWorker] = useState(workers.find((worker) => worker.name === complaint.assignee)?.name ?? "");
  const [targetDept, setTargetDept] = useState(complaint.department);
  useEffect(() => {
    if (!selectedWorker && workers.length > 0) setSelectedWorker(workers[0]?.name ?? "");
  }, [selectedWorker, workers]);

  const handleReassign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignWorker(complaint.id, selectedWorker, targetDept);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not assign complaint.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="panel w-full max-w-md border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-lg font-bold">Reassign Technician Crew</h3>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleReassign} className="mt-4 space-y-4">
          <div className="rounded-lg bg-muted/40 p-3 text-xs">
            <div className="font-mono text-primary font-bold">{complaint.id}</div>
            <div className="font-medium text-foreground">{complaint.title}</div>
            <div className="mt-1 text-muted-foreground">Current Assignee: {complaint.assignee} ({complaint.department})</div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-muted-foreground">
              Select Department
            </label>
            <select
              value={targetDept}
              onChange={(e) => {
                setTargetDept(e.target.value);
              }}
              className="field text-sm"
            >
              {ALL_DEPTS.filter((dept) => dept !== "All").map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-muted-foreground">
              Select Assigned Worker
            </label>
            <select
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
              className="field text-sm"
            >
              {workers.length === 0 && <option value="">No registered worker accounts</option>}
              {workers.map((worker) => (
                <option key={worker.name} value={worker.name}>
                  {worker.name} ({worker.department})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <button type="button" onClick={onClose} className="btn btn-ghost text-xs">
              Cancel
            </button>
            <button type="submit" disabled={!selectedWorker} className="btn btn-primary text-xs disabled:opacity-60">
              <UserCheck className="size-3.5" /> Confirm Assignment
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDetailModal({
  complaint,
  onClose,
}: {
  complaint: Complaint;
  onClose: () => void;
}) {
  const s = slaState(complaint);

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
              Reported by {complaint.reporter} · {ago(complaint.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Pill kind="p" value={complaint.priority} />
            <Pill kind="s" value={complaint.status} />
            <button onClick={onClose} className="ml-2 rounded-full p-1 text-muted-foreground hover:bg-muted">
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase text-muted-foreground">Citizen Complaint Description</h3>
            <p className="mt-1 text-sm bg-muted/40 rounded-xl p-3">
              {complaint.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4">
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Department</span>
              <p className="mt-0.5 font-bold">{complaint.department}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Assigned Technician</span>
              <p className="mt-0.5 font-bold">{complaint.assignee}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">Location</span>
              <p className="mt-0.5 font-bold truncate">{complaint.location}</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5">
              <span className="text-[10px] text-muted-foreground">SLA Target</span>
              <p className="mt-0.5 font-bold">{complaint.slaHours} hours</p>
            </div>
          </div>

          {/* Photographic Completion Proof Review */}
          {complaint.completionProof ? (
            <div className="rounded-2xl border border-success/40 bg-success/10 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-success text-sm">
                  <CheckCircle2 className="size-5" /> Worker Completion Evidence
                </div>
                {complaint.rating && (
                  <div className="flex items-center gap-1 font-mono text-amber-400 text-xs">
                    <Star className="size-3.5 fill-current" />
                    Citizen Rating: {complaint.rating}/5
                  </div>
                )}
              </div>

              <div className="mt-3 text-xs">
                <span className="font-semibold text-foreground">Action Summary / Notes:</span>
                <p className="mt-1 text-muted-foreground bg-background/50 p-3 rounded-lg">
                  {complaint.completionProof.notes}
                </p>
              </div>

              {complaint.completionProof.partsUsed && (
                <div className="mt-3 text-xs font-mono">
                  <span className="text-muted-foreground">Parts / Resources Replaced: </span>
                  <span className="font-semibold">{complaint.completionProof.partsUsed}</span>
                </div>
              )}

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {complaint.image && (
                  <div>
                    <div className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
                      Before (Citizen Reported Evidence)
                    </div>
                    <img src={complaint.image} alt="Before" className="h-44 w-full rounded-lg border object-cover" />
                  </div>
                )}
                {complaint.completionProof.image && (
                  <div>
                    <div className="mb-1 font-mono text-[10px] uppercase text-success">
                      After (Worker Completion Proof Photo)
                    </div>
                    <img src={complaint.completionProof.image} alt="After" className="h-44 w-full rounded-lg border border-success/40 object-cover" />
                  </div>
                )}
              </div>

              <div className="mt-3 text-right font-mono text-[10px] text-muted-foreground">
                Submitted by {complaint.completionProof.completedBy} at {new Date(complaint.completionProof.completedAt).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs text-muted-foreground">
              Work is currently in progress. The field technician hasn't uploaded completion proof yet.
            </div>
          )}

          {/* Audit Timeline */}
          <div>
            <h3 className="font-mono text-xs uppercase text-muted-foreground">Audit Timeline History</h3>
            <ol className="mt-3 space-y-3">
              {[...complaint.timeline].sort((a, b) => b.at - a.at).map((t, idx) => (
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

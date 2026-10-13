import { useSyncExternalStore } from "react";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

export type Category = "Electrical" | "Plumbing" | "Sanitation" | "Roads" | "Security" | "IT & Network" | "Noise" | "General";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Status = "Submitted" | "Assigned" | "In Progress" | "Escalated" | "Resolved";

export interface TimelineEvent { 
  at: number; 
  label: string; 
  note?: string | undefined;
}

export interface WorkProof {
  image?: string | undefined;
  notes: string;
  completedAt: number;
  completedBy: string;
  partsUsed?: string | undefined;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  category: Category;
  priority: Priority;
  department: string;
  confidence: number;
  status: Status;
  createdAt: number;
  slaHours: number;
  escalationLevel: number;
  assignee: string;
  image?: string | undefined;
  reporter: string;
  timeline: TimelineEvent[];
  completionProof?: WorkProof | undefined;
  rating?: number | undefined;
  feedback?: string | undefined;
}

const RULES: { cat: Category; dept: string; words: string[] }[] = [
  { cat: "Electrical", dept: "Maintenance", words: ["light", "power", "electric", "wire", "bulb", "outage", "socket", "transformer", "fan", "spark"] },
  { cat: "Plumbing", dept: "Water Works", words: ["water", "leak", "pipe", "tap", "drain", "flood", "sewage", "toilet", "overflow"] },
  { cat: "Sanitation", dept: "Sanitation", words: ["garbage", "trash", "waste", "dirty", "smell", "dump", "clean", "bin", "mosquito"] },
  { cat: "Roads", dept: "Public Works", words: ["road", "pothole", "street", "footpath", "traffic", "signal", "crack", "pavement"] },
  { cat: "Security", dept: "Security", words: ["theft", "unsafe", "cctv", "guard", "stolen", "fight", "harass", "gate", "intruder"] },
  { cat: "IT & Network", dept: "IT Services", words: ["wifi", "internet", "network", "computer", "printer", "portal", "login", "server"] },
  { cat: "Noise", dept: "Community Affairs", words: ["noise", "loud", "music", "construction", "barking"] },
];
const URGENT = ["fire", "spark", "flood", "danger", "injur", "unsafe", "accident", "emergency", "shock", "collapse"];
const HIGH = ["days", "week", "not working", "broken", "dark", "night", "children", "again", "still", "hasn't"];
const LOW = ["suggest", "minor", "sometime", "request", "would be nice"];
export const SLA: Record<Priority, number> = { Critical: 4, High: 24, Medium: 72, Low: 168 };
export const SUPERVISORS = ["Team Lead", "Department Head", "Commissioner"];

export function analyze(text: string) {
  const t = text.toLowerCase();
  let best = { cat: "General" as Category, dept: "Help Desk", score: 0 };
  for (const r of RULES) {
    const s = r.words.filter((w) => t.includes(w)).length;
    if (s > best.score) best = { cat: r.cat, dept: r.dept, score: s };
  }
  let priority: Priority = "Medium";
  if (URGENT.some((w) => t.includes(w))) priority = "Critical";
  else if (HIGH.some((w) => t.includes(w))) priority = "High";
  else if (LOW.some((w) => t.includes(w))) priority = "Low";
  const loc = text.match(/\b(?:near|at|in|behind|outside|opposite)\s+((?:block|hostel|gate|room|building|lab|sector|ward|lane|road|street|tower|floor|wing)\s*[\w-]+)/i)
    ?? text.match(/\b((?:block|hostel|gate|sector|ward|tower)\s*[\w-]+)/i);
  const confidence = Math.min(0.98, 0.55 + best.score * 0.15 + (text.length > 40 ? 0.08 : 0));
  return { category: best.cat, department: best.dept, priority, location: loc ? cap(loc[1] ?? "") : "", confidence };
}
const cap = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------- SLA / escalation engine ---------- */
export function slaState(c: Complaint, now = Date.now()) {
  const deadline = c.createdAt + c.slaHours * 3600e3;
  const elapsed = (now - c.createdAt) / (c.slaHours * 3600e3);
  return { deadline, remaining: deadline - now, pct: Math.min(1.5, elapsed), breached: now > deadline && c.status !== "Resolved" };
}
/* ---------- API-backed complaint store ---------- */
let state: Complaint[] = [];
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
let loaded = false;
async function refreshComplaints() {
  state = await apiRequest<Complaint[]>("/complaints");
  emit();
}
function ensure() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  void refreshComplaints().catch((error: unknown) => {
    toast.error(error instanceof Error ? error.message : "Could not load complaints from the server.");
  });
  window.setInterval(() => { void refreshComplaints().catch(() => undefined); }, 30000);
}

export function useComplaints() {
  return useSyncExternalStore(
    (cb) => { ensure(); subs.add(cb); return () => subs.delete(cb); },
    () => state,
    () => state,
  );
}

export async function addComplaint(input: { description: string; location: string; reporter: string; image?: string | undefined; category: Category; priority: Priority; department: string; confidence: number }) {
  const c = await apiRequest<Complaint>("/complaints", { method: "POST", body: JSON.stringify(input) });
  state = [c, ...state.filter((item) => item.id !== c.id)]; emit(); return c;
}

export async function updateStatus(id: string, status: Status) {
  const c = await apiRequest<Complaint>(`/complaints/${encodeURIComponent(id)}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  state = state.map((item) => item.id === id ? c : item); emit();
}

export async function resolveWithProof(id: string, proof: { image?: string | undefined; notes: string; completedBy: string; partsUsed?: string | undefined }) {
  const c = await apiRequest<Complaint>(`/complaints/${encodeURIComponent(id)}/proof`, { method: "POST", body: JSON.stringify(proof) });
  state = state.map((item) => item.id === id ? c : item); emit();
}

export async function assignWorker(id: string, workerName: string, dept?: string | undefined) {
  const c = await apiRequest<Complaint>(`/complaints/${encodeURIComponent(id)}/assign`, { method: "PATCH", body: JSON.stringify({ workerName, department: dept }) });
  state = state.map((item) => item.id === id ? c : item); emit();
}

export async function rateComplaint(id: string, rating: number, feedback?: string | undefined) {
  const c = await apiRequest<Complaint>(`/complaints/${encodeURIComponent(id)}/feedback`, { method: "PATCH", body: JSON.stringify({ rating, feedback }) });
  state = state.map((item) => item.id === id ? c : item); emit();
}

export function fmtDur(ms: number) {
  const neg = ms < 0; ms = Math.abs(ms);
  const h = Math.floor(ms / 3600e3), m = Math.floor((ms % 3600e3) / 60e3);
  const s = h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h ${m}m`;
  return neg ? `-${s}` : s;
}
export const ago = (t: number) => fmtDur(Date.now() - t) + " ago";

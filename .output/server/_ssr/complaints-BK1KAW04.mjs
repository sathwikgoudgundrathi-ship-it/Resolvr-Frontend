import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as apiRequest } from "./auth-_dFKPZha.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-BK1KAW04.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var RULES = [
	{
		cat: "Electrical",
		dept: "Maintenance",
		words: [
			"light",
			"power",
			"electric",
			"wire",
			"bulb",
			"outage",
			"socket",
			"transformer",
			"fan",
			"spark"
		]
	},
	{
		cat: "Plumbing",
		dept: "Water Works",
		words: [
			"water",
			"leak",
			"pipe",
			"tap",
			"drain",
			"flood",
			"sewage",
			"toilet",
			"overflow"
		]
	},
	{
		cat: "Sanitation",
		dept: "Sanitation",
		words: [
			"garbage",
			"trash",
			"waste",
			"dirty",
			"smell",
			"dump",
			"clean",
			"bin",
			"mosquito"
		]
	},
	{
		cat: "Roads",
		dept: "Public Works",
		words: [
			"road",
			"pothole",
			"street",
			"footpath",
			"traffic",
			"signal",
			"crack",
			"pavement"
		]
	},
	{
		cat: "Security",
		dept: "Security",
		words: [
			"theft",
			"unsafe",
			"cctv",
			"guard",
			"stolen",
			"fight",
			"harass",
			"gate",
			"intruder"
		]
	},
	{
		cat: "IT & Network",
		dept: "IT Services",
		words: [
			"wifi",
			"internet",
			"network",
			"computer",
			"printer",
			"portal",
			"login",
			"server"
		]
	},
	{
		cat: "Noise",
		dept: "Community Affairs",
		words: [
			"noise",
			"loud",
			"music",
			"construction",
			"barking"
		]
	}
];
var URGENT = [
	"fire",
	"spark",
	"flood",
	"danger",
	"injur",
	"unsafe",
	"accident",
	"emergency",
	"shock",
	"collapse"
];
var HIGH = [
	"days",
	"week",
	"not working",
	"broken",
	"dark",
	"night",
	"children",
	"again",
	"still",
	"hasn't"
];
var LOW = [
	"suggest",
	"minor",
	"sometime",
	"request",
	"would be nice"
];
var SLA = {
	Critical: 4,
	High: 24,
	Medium: 72,
	Low: 168
};
var SUPERVISORS = [
	"Team Lead",
	"Department Head",
	"Commissioner"
];
function analyze(text) {
	const t = text.toLowerCase();
	let best = {
		cat: "General",
		dept: "Help Desk",
		score: 0
	};
	for (const r of RULES) {
		const s = r.words.filter((w) => t.includes(w)).length;
		if (s > best.score) best = {
			cat: r.cat,
			dept: r.dept,
			score: s
		};
	}
	let priority = "Medium";
	if (URGENT.some((w) => t.includes(w))) priority = "Critical";
	else if (HIGH.some((w) => t.includes(w))) priority = "High";
	else if (LOW.some((w) => t.includes(w))) priority = "Low";
	const loc = text.match(/\b(?:near|at|in|behind|outside|opposite)\s+((?:block|hostel|gate|room|building|lab|sector|ward|lane|road|street|tower|floor|wing)\s*[\w-]+)/i) ?? text.match(/\b((?:block|hostel|gate|sector|ward|tower)\s*[\w-]+)/i);
	const confidence = Math.min(.98, .55 + best.score * .15 + (text.length > 40 ? .08 : 0));
	return {
		category: best.cat,
		department: best.dept,
		priority,
		location: loc ? cap(loc[1] ?? "") : "",
		confidence
	};
}
var cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
function slaState(c, now = Date.now()) {
	const deadline = c.createdAt + c.slaHours * 36e5;
	const elapsed = (now - c.createdAt) / (c.slaHours * 36e5);
	return {
		deadline,
		remaining: deadline - now,
		pct: Math.min(1.5, elapsed),
		breached: now > deadline && c.status !== "Resolved"
	};
}
var state = [];
var subs = /* @__PURE__ */ new Set();
var emit = () => subs.forEach((f) => f());
var loaded = false;
async function refreshComplaints() {
	state = await apiRequest("/complaints");
	emit();
}
function ensure() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	refreshComplaints().catch((error) => {
		toast.error(error instanceof Error ? error.message : "Could not load complaints from the server.");
	});
	window.setInterval(() => {
		refreshComplaints().catch(() => void 0);
	}, 3e4);
}
function useComplaints() {
	return (0, import_react.useSyncExternalStore)((cb) => {
		ensure();
		subs.add(cb);
		return () => subs.delete(cb);
	}, () => state, () => state);
}
async function addComplaint(input) {
	const c = await apiRequest("/complaints", {
		method: "POST",
		body: JSON.stringify(input)
	});
	state = [c, ...state.filter((item) => item.id !== c.id)];
	emit();
	return c;
}
async function updateStatus(id, status) {
	const c = await apiRequest(`/complaints/${encodeURIComponent(id)}/status`, {
		method: "PATCH",
		body: JSON.stringify({ status })
	});
	state = state.map((item) => item.id === id ? c : item);
	emit();
}
async function resolveWithProof(id, proof) {
	const c = await apiRequest(`/complaints/${encodeURIComponent(id)}/proof`, {
		method: "POST",
		body: JSON.stringify(proof)
	});
	state = state.map((item) => item.id === id ? c : item);
	emit();
}
async function assignWorker(id, workerName, dept) {
	const c = await apiRequest(`/complaints/${encodeURIComponent(id)}/assign`, {
		method: "PATCH",
		body: JSON.stringify({
			workerName,
			department: dept
		})
	});
	state = state.map((item) => item.id === id ? c : item);
	emit();
}
async function rateComplaint(id, rating, feedback) {
	const c = await apiRequest(`/complaints/${encodeURIComponent(id)}/feedback`, {
		method: "PATCH",
		body: JSON.stringify({
			rating,
			feedback
		})
	});
	state = state.map((item) => item.id === id ? c : item);
	emit();
}
function fmtDur(ms) {
	const neg = ms < 0;
	ms = Math.abs(ms);
	const h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4);
	const s = h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h ${m}m`;
	return neg ? `-${s}` : s;
}
var ago = (t) => fmtDur(Date.now() - t) + " ago";
//#endregion
export { analyze as a, rateComplaint as c, updateStatus as d, useComplaints as f, ago as i, resolveWithProof as l, SUPERVISORS as n, assignWorker as o, addComplaint as r, fmtDur as s, SLA as t, slaState as u };

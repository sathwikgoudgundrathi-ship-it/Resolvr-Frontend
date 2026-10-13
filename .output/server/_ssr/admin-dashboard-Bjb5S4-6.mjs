import { r as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth, t as apiRequest } from "./auth-_dFKPZha.mjs";
import { C as Eye, P as ArrowRight, a as UserCheck, b as Inbox, c as Star, d as ShieldCheck, k as CircleCheck, m as Search, o as TriangleAlert, s as Timer, t as X, u as Siren, x as Funnel } from "../_libs/lucide-react.mjs";
import { a as SlaBar, i as Pill } from "./app-ui-kHhiH690.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as updateStatus, f as useComplaints, i as ago, o as assignWorker, s as fmtDur, u as slaState } from "./complaints-BK1KAW04.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-dashboard-Bjb5S4-6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALL_DEPTS = [
	"All",
	"Maintenance",
	"Water Works",
	"Sanitation",
	"Public Works",
	"Security",
	"IT Services",
	"Community Affairs",
	"Help Desk"
];
function AdminDashboard() {
	const { user } = useAuth();
	const list = useComplaints();
	const [selectedDept, setSelectedDept] = (0, import_react.useState)("All");
	const [selectedStatus, setSelectedStatus] = (0, import_react.useState)("All");
	const [selectedPriority, setSelectedPriority] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [inspectComplaint, setInspectComplaint] = (0, import_react.useState)(null);
	const [assignModalComplaint, setAssignModalComplaint] = (0, import_react.useState)(null);
	const [workersList, setWorkersList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		apiRequest("/users/workers").then(setWorkersList).catch((error) => toast.error(error instanceof Error ? error.message : "Could not load worker accounts."));
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		return list.filter((c) => {
			const matchDept = selectedDept === "All" || c.department === selectedDept;
			const matchStatus = selectedStatus === "All" || (selectedStatus === "Open" ? c.status !== "Resolved" : c.status === selectedStatus);
			const matchPriority = selectedPriority === "All" || c.priority === selectedPriority;
			const q = searchQuery.toLowerCase().trim();
			const matchSearch = !q || c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.reporter.toLowerCase().includes(q) || c.assignee.toLowerCase().includes(q);
			return matchDept && matchStatus && matchPriority && matchSearch;
		});
	}, [
		list,
		selectedDept,
		selectedStatus,
		selectedPriority,
		searchQuery
	]);
	const openCount = list.filter((c) => c.status !== "Resolved").length;
	list.filter((c) => c.status === "In Progress").length;
	const breachedCount = list.filter((c) => slaState(c).breached).length;
	const escalatedCount = list.filter((c) => c.status === "Escalated").length;
	const resolvedCount = list.filter((c) => c.status === "Resolved").length;
	const atRiskCount = list.filter((c) => {
		const s = slaState(c);
		return !s.breached && s.pct > .75 && c.status !== "Resolved";
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel glow relative overflow-hidden p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center justify-between gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary animate-pulse" }), "Executive Command & Operations Center"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-extrabold sm:text-4xl",
							children: "Administrator Master Console"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 max-w-2xl text-sm text-muted-foreground",
							children: ["Oversee city & campus complaints, allocate field technician crews, enforce SLAs, and inspect photographic completion evidence. Logged in as: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: user?.name || "Administrator"
							})]
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-3.5" }), " Active Open"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold",
								children: openCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3.5 text-accent" }), " SLA At-Risk"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-accent",
								children: atRiskCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Siren, { className: "size-3.5 text-destructive" }), " SLA Breached"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-destructive",
								children: breachedCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-destructive" }), " Auto-Escalated"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-destructive",
								children: escalatedCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-success" }), " Total Resolved"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-success",
								children: resolvedCount
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[200px] flex-1 sm:max-w-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search by ID, title, crew, location...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "field py-1.5 pl-8 text-xs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedDept,
							onChange: (e) => setSelectedDept(e.target.value),
							className: "field w-auto py-1.5 text-xs",
							children: ALL_DEPTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d === "All" ? "All Departments" : `Dept: ${d}`
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedStatus,
							onChange: (e) => setSelectedStatus(e.target.value),
							className: "field w-auto py-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All Statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Open",
									children: "All Open Tickets"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Assigned",
									children: "Assigned"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "In Progress",
									children: "In Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Escalated",
									children: "Escalated"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Resolved",
									children: "Resolved"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedPriority,
							onChange: (e) => setSelectedPriority(e.target.value),
							className: "field w-auto py-1.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "All",
									children: "All Priorities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Critical",
									children: "Critical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "High",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Medium",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Low",
									children: "Low"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-xs text-muted-foreground",
					children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: filtered.length }),
						" of ",
						list.length,
						" records"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((c) => {
					const s = slaState(c);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						layout: true,
						className: `panel flex flex-col justify-between p-5 transition hover:border-primary/40 ${c.status === "Escalated" ? "border-destructive/40 bg-destructive/5" : c.status === "Resolved" ? "border-success/30 bg-success/5" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: c.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										kind: "p",
										value: c.priority
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										kind: "s",
										value: c.status
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-semibold text-base",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground line-clamp-2",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/60 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground truncate",
											children: c.department
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/60 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "Technician"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground truncate",
											children: c.assignee
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/60 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "Location"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground truncate",
											children: c.location
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg bg-muted/60 p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "Reporter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-foreground truncate",
											children: c.reporter
										})]
									})
								]
							}),
							c.status !== "Resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between font-mono text-[10px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"SLA: ",
											c.slaHours,
											"h Target"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: s.breached ? "text-destructive font-bold" : "text-muted-foreground",
										children: s.breached ? `Overdue ${fmtDur(-s.remaining)} · L${c.escalationLevel}` : `${fmtDur(s.remaining)} left`
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBar, {
										pct: s.pct,
										breached: s.breached
									})
								})]
							}) : c.completionProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg border border-success/30 bg-success/10 p-2.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between font-bold text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Proof Submitted"]
									}), c.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-amber-400",
										children: [c.rating, "★"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-muted-foreground line-clamp-1",
									children: [
										"“",
										c.completionProof.notes,
										"”"
									]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 border-t border-border pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setAssignModalComplaint(c),
										className: "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[11px] font-medium hover:bg-muted",
										title: "Reassign to another technician",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3 text-primary" }), " Reassign"]
									}), c.status !== "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void updateStatus(c.id, "Escalated").catch((error) => toast.error(error instanceof Error ? error.message : "Could not escalate complaint.")),
										className: "rounded-md bg-destructive/15 px-2 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/25",
										title: "Manually escalate to next authority level",
										children: "Escalate"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setInspectComplaint(c),
									className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3" }),
										" Inspect ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })
									]
								})]
							})
						})]
					}, c.id);
				})
			}),
			filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-6 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mx-auto size-8 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-lg font-bold",
						children: "No complaints match your filters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Try adjusting your search query, department, or status filters."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: assignModalComplaint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReassignModal, {
				complaint: assignModalComplaint,
				workers: workersList,
				onClose: () => setAssignModalComplaint(null)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: inspectComplaint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDetailModal, {
				complaint: inspectComplaint,
				onClose: () => setInspectComplaint(null)
			}) })
		]
	});
}
function ReassignModal({ complaint, workers, onClose }) {
	const [selectedWorker, setSelectedWorker] = (0, import_react.useState)(workers.find((worker) => worker.name === complaint.assignee)?.name ?? "");
	const [targetDept, setTargetDept] = (0, import_react.useState)(complaint.department);
	(0, import_react.useEffect)(() => {
		if (!selectedWorker && workers.length > 0) setSelectedWorker(workers[0]?.name ?? "");
	}, [selectedWorker, workers]);
	const handleReassign = async (e) => {
		e.preventDefault();
		try {
			await assignWorker(complaint.id, selectedWorker, targetDept);
			onClose();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not assign complaint.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "panel w-full max-w-md border border-border bg-card p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold",
					children: "Reassign Technician Crew"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleReassign,
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-muted/40 p-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-primary font-bold",
								children: complaint.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground",
								children: complaint.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-muted-foreground",
								children: [
									"Current Assignee: ",
									complaint.assignee,
									" (",
									complaint.department,
									")"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block font-mono text-xs text-muted-foreground",
						children: "Select Department"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: targetDept,
						onChange: (e) => {
							setTargetDept(e.target.value);
						},
						className: "field text-sm",
						children: ALL_DEPTS.filter((dept) => dept !== "All").map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: dept,
							children: dept
						}, dept))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block font-mono text-xs text-muted-foreground",
						children: "Select Assigned Worker"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: selectedWorker,
						onChange: (e) => setSelectedWorker(e.target.value),
						className: "field text-sm",
						children: [workers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "No registered worker accounts"
						}), workers.map((worker) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: worker.name,
							children: [
								worker.name,
								" (",
								worker.department,
								")"
							]
						}, worker.name))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-3 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "btn btn-ghost text-xs",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: !selectedWorker,
							className: "btn btn-primary text-xs disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5" }), " Confirm Assignment"]
						})]
					})
				]
			})]
		})
	});
}
function AdminDetailModal({ complaint, onClose }) {
	slaState(complaint);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "panel max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-card p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-primary",
						children: complaint.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-bold",
						children: complaint.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Reported by ",
							complaint.reporter,
							" · ",
							ago(complaint.createdAt)
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							kind: "p",
							value: complaint.priority
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							kind: "s",
							value: complaint.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "ml-2 rounded-full p-1 text-muted-foreground hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-xs uppercase text-muted-foreground",
						children: "Citizen Complaint Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm bg-muted/40 rounded-xl p-3",
						children: complaint.description
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 font-mono text-xs sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Department"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-bold",
									children: complaint.department
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Assigned Technician"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-bold",
									children: complaint.assignee
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-bold truncate",
									children: complaint.location
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "SLA Target"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 font-bold",
									children: [complaint.slaHours, " hours"]
								})]
							})
						]
					}),
					complaint.completionProof ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-success/40 bg-success/10 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-bold text-success text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), " Worker Completion Evidence"]
								}), complaint.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 font-mono text-amber-400 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-current" }),
										"Citizen Rating: ",
										complaint.rating,
										"/5"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Action Summary / Notes:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground bg-background/50 p-3 rounded-lg",
									children: complaint.completionProof.notes
								})]
							}),
							complaint.completionProof.partsUsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xs font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Parts / Resources Replaced: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: complaint.completionProof.partsUsed
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [complaint.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 font-mono text-[10px] uppercase text-muted-foreground",
									children: "Before (Citizen Reported Evidence)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: complaint.image,
									alt: "Before",
									className: "h-44 w-full rounded-lg border object-cover"
								})] }), complaint.completionProof.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 font-mono text-[10px] uppercase text-success",
									children: "After (Worker Completion Proof Photo)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: complaint.completionProof.image,
									alt: "After",
									className: "h-44 w-full rounded-lg border border-success/40 object-cover"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-right font-mono text-[10px] text-muted-foreground",
								children: [
									"Submitted by ",
									complaint.completionProof.completedBy,
									" at ",
									new Date(complaint.completionProof.completedAt).toLocaleString()
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-border bg-muted/20 p-4 text-xs text-muted-foreground",
						children: "Work is currently in progress. The field technician hasn't uploaded completion proof yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-xs uppercase text-muted-foreground",
						children: "Audit Timeline History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-3",
						children: [...complaint.timeline].sort((a, b) => b.at - a.at).map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 size-2 rounded-full bg-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground",
								children: t.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[10px] text-muted-foreground",
								children: [
									new Date(t.at).toLocaleString(),
									" ",
									t.note ? `· ${t.note}` : ""
								]
							})] })]
						}, idx))
					})] })
				]
			})]
		})
	});
}
//#endregion
export { AdminDashboard as t };

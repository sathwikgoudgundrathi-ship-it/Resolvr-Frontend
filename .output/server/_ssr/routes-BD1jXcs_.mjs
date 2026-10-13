import { r as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth } from "./auth-_dFKPZha.mjs";
import { A as CircleAlert, M as Camera, O as CirclePlus, P as ArrowRight, S as FileText, T as Clock, c as Star, d as ShieldCheck, g as MapPin, h as Radar, i as UserPlus, j as CheckCheck, k as CircleCheck, l as Sparkles, n as Wrench, o as TriangleAlert, p as Send, r as User, t as X, v as LogIn, w as CloudUpload } from "../_libs/lucide-react.mjs";
import { a as SlaBar, i as Pill, t as AuthDialog } from "./app-ui-kHhiH690.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as analyze, c as rateComplaint, d as updateStatus, f as useComplaints, i as ago, l as resolveWithProof, r as addComplaint, s as fmtDur, t as SLA, u as slaState } from "./complaints-BK1KAW04.mjs";
import { t as AdminDashboard } from "./admin-dashboard-Bjb5S4-6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BD1jXcs_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEPT = {
	Electrical: "Maintenance",
	Plumbing: "Water Works",
	Sanitation: "Sanitation",
	Roads: "Public Works",
	Security: "Security",
	"IT & Network": "IT Services",
	Noise: "Community Affairs",
	General: "Help Desk"
};
function CitizenDashboard() {
	const { user } = useAuth();
	const allComplaints = useComplaints();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [showSubmitModal, setShowSubmitModal] = (0, import_react.useState)(false);
	const [selectedComplaint, setSelectedComplaint] = (0, import_react.useState)(null);
	const [desc, setDesc] = (0, import_react.useState)("");
	const [loc, setLoc] = (0, import_react.useState)("");
	const [img, setImg] = (0, import_react.useState)();
	const [over, setOver] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const myComplaints = (0, import_react.useMemo)(() => {
		if (!user) return allComplaints;
		const directMatches = allComplaints.filter((c) => c.reporter.toLowerCase() === user.name.toLowerCase());
		return directMatches.length > 0 ? directMatches : allComplaints;
	}, [allComplaints, user]);
	const filtered = (0, import_react.useMemo)(() => {
		switch (filter) {
			case "active": return myComplaints.filter((c) => c.status === "Submitted" || c.status === "Assigned");
			case "in_progress": return myComplaints.filter((c) => c.status === "In Progress" || c.status === "Escalated");
			case "resolved": return myComplaints.filter((c) => c.status === "Resolved");
			default: return myComplaints;
		}
	}, [myComplaints, filter]);
	const ai = (0, import_react.useMemo)(() => analyze(desc), [desc]);
	const category = over.category ?? ai.category;
	const priority = over.priority ?? ai.priority;
	const location = loc || ai.location;
	const ready = desc.trim().length >= 10;
	const onFile = (f) => {
		if (!f) return;
		const r = new FileReader();
		r.onload = () => setImg(r.result);
		r.readAsDataURL(f);
	};
	const handleLodgeComplaint = async (e) => {
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
				confidence: ai.confidence
			});
			setSubmitting(false);
			setShowSubmitModal(false);
			setDesc("");
			setLoc("");
			setImg(void 0);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel glow relative overflow-hidden p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-wrap items-center justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-mono text-xs text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary animate-pulse" }), "Citizen Public Portal"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 text-3xl font-extrabold sm:text-4xl",
							children: ["Hello, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: user?.name || "Citizen"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-xl text-sm text-muted-foreground",
							children: "Report public infrastructure issues, civic problems, or campus repairs. Our AI engine triages and routes your ticket to the right department crew in seconds."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowSubmitModal(true),
						className: "btn btn-primary px-5 py-3 shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-4" }), " Lodge New Complaint"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-primary" }), " Total Filed"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-2xl font-bold",
								children: total
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-warning" }), " In Progress"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-2xl font-bold text-warning",
								children: inProg
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-success" }), " Resolved Work"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-2xl font-bold text-success",
								children: resolved
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-destructive" }), " Auto-Escalated"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-2xl font-bold text-destructive",
								children: escalated
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "My Grievances & Complaints"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Track real-time progress, technician assignments, and verify uploaded completion proofs."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5 rounded-xl bg-muted p-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setFilter("all"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"All (",
										myComplaints.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter("active"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${filter === "active" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter("in_progress"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${filter === "in_progress" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: "In Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setFilter("resolved"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${filter === "resolved" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Resolved (",
										resolved,
										")"
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
						children: filtered.map((c) => {
							const s = slaState(c);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								layout: true,
								className: `panel flex flex-col justify-between p-5 transition hover:border-primary/40 ${c.status === "Resolved" ? "border-success/30 bg-success/5" : ""}`,
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
										className: "mt-3 font-semibold line-clamp-1",
										children: c.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground line-clamp-2",
										children: c.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["🏢 ", c.department] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📍 ", c.location] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["👷 Assignee: ", c.assignee] })
										]
									}),
									c.status === "Resolved" && c.completionProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 rounded-lg border border-success/30 bg-success/10 p-2.5 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 font-bold text-success",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Work Completed & Proof Uploaded"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[11px] text-muted-foreground line-clamp-2",
												children: [
													"“",
													c.completionProof.notes,
													"”"
												]
											}),
											c.completionProof.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 text-[10px] text-primary",
												children: "📸 Work proof photo verified"
											})
										]
									}),
									c.status !== "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between font-mono text-[10px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"SLA: ",
												c.slaHours,
												"h target"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: s.breached ? "text-destructive font-bold" : "",
												children: s.breached ? `Overdue ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} left`
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBar, {
												pct: s.pct,
												breached: s.breached
											})
										})]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 border-t border-border pt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: ago(c.createdAt)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSelectedComplaint(c),
										className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
										children: ["View Details & Proof ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
									})]
								})]
							}, c.id);
						})
					}),
					filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-8 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-bold",
								children: "No complaints found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "You don't have any complaints in this category."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSubmitModal(true),
								className: "btn btn-primary mt-4",
								children: "Lodge a complaint"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showSubmitModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					className: "panel max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg bg-primary/10 p-1.5 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: "Lodge a Grievance"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSubmitModal(false),
							className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLodgeComplaint,
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Describe the issue in plain words"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 3,
								placeholder: "e.g. The water tap on 2nd floor hostel corridor is leaking heavily and flooding the floor...",
								value: desc,
								onChange: (e) => setDesc(e.target.value),
								className: "field min-h-24 resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1 block font-mono text-xs text-muted-foreground",
									children: "Location / Landmark"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: ai.location ? `Detected: ${ai.location}` : "e.g. Block B, Room 204",
										value: loc,
										onChange: (e) => setLoc(e.target.value),
										className: "field pr-8"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" })]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1 block font-mono text-xs text-muted-foreground",
									children: "Complainant Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									disabled: true,
									value: user?.name || "Citizen Reporter",
									className: "field opacity-75"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Attach Initial Evidence / Photo (Optional)"
							}), img ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-fit",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img,
									alt: "Evidence",
									className: "h-32 rounded-lg border object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setImg(void 0),
									className: "absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input py-6 text-xs text-muted-foreground hover:border-primary hover:text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }),
									" Drop image or click to upload",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										hidden: true,
										onChange: (e) => onFile(e.target.files?.[0])
									})
								]
							})] }),
							ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-mono text-primary font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " AI Prediction Live"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-2 gap-2 font-mono sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card/80 p-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Category"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-primary",
												children: category
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card/80 p-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Priority"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-accent",
												children: priority
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card/80 p-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Department"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold",
												children: DEPT[category]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card/80 p-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground",
												children: "Target SLA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold",
												children: [SLA[priority], " hours"]
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowSubmitModal(false),
									className: "btn btn-ghost",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: !ready || submitting,
									className: "btn btn-primary disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Submit Complaint"]
								})]
							})
						]
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedComplaint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailModal, {
				complaint: selectedComplaint,
				onClose: () => setSelectedComplaint(null)
			}) })
		]
	});
}
function DetailModal({ complaint, onClose }) {
	const [rating, setRating] = (0, import_react.useState)(complaint.rating || 5);
	const [feedback, setFeedback] = (0, import_react.useState)(complaint.feedback || "");
	const [rated, setRated] = (0, import_react.useState)(!!complaint.rating);
	slaState(complaint);
	const handleRate = async () => {
		try {
			await rateComplaint(complaint.id, rating, feedback);
			setRated(true);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save your feedback.");
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
							"Filed ",
							ago(complaint.createdAt),
							" by ",
							complaint.reporter
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
						children: "Problem Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-foreground bg-muted/40 rounded-xl p-3",
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
									children: "Assigned Crew"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-bold",
									children: complaint.assignee
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "SLA Window"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 font-bold",
									children: [complaint.slaHours, " hours"]
								})]
							})
						]
					}),
					complaint.completionProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-success/40 bg-success/10 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-bold text-success",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), "Work Completed & Verified by Field Worker"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xs text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Worker Action Report:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground bg-background/50 p-2.5 rounded-lg",
									children: complaint.completionProof.notes
								})]
							}),
							complaint.completionProof.partsUsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-muted-foreground",
									children: "Parts / Resources Replaced: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: complaint.completionProof.partsUsed
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [complaint.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 font-mono text-[10px] uppercase text-muted-foreground",
									children: "Before (Citizen Reported Issue)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: complaint.image,
									alt: "Before repair",
									className: "h-40 w-full rounded-lg border object-cover"
								})] }), complaint.completionProof.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 font-mono text-[10px] uppercase text-success",
									children: "After (Worker Completed Proof Photo)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: complaint.completionProof.image,
									alt: "After repair proof",
									className: "h-40 w-full rounded-lg border border-success/40 object-cover"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-right font-mono text-[11px] text-muted-foreground",
								children: [
									"Verified by ",
									complaint.completionProof.completedBy,
									" at",
									" ",
									new Date(complaint.completionProof.completedAt).toLocaleString()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-t border-success/20 pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-xs text-foreground",
										children: "Rate this Resolution:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-1",
										children: [[
											1,
											2,
											3,
											4,
											5
										].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: rated,
											onClick: () => setRating(star),
											className: `p-1 transition ${star <= rating ? "text-amber-400" : "text-muted-foreground/40"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-5 fill-current" })
										}, star)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 font-mono text-xs",
											children: [rating, "/5 Stars"]
										})]
									}),
									!rated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Add brief satisfaction feedback...",
											value: feedback,
											onChange: (e) => setFeedback(e.target.value),
											className: "field text-xs"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: handleRate,
											className: "btn btn-primary px-4 py-1.5 text-xs",
											children: "Submit Rating"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-mono text-xs text-success",
										children: "✓ Feedback recorded. Thank you for helping improve civic services!"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-mono text-xs uppercase text-muted-foreground",
						children: "Audit Timeline"
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
var SAMPLE_PROOF_IMAGES = [
	{
		label: "Street Light Repaired",
		url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
	},
	{
		label: "Plumbing Pipe Replaced",
		url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80"
	},
	{
		label: "Garbage Cleared & Sanitized",
		url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80"
	},
	{
		label: "Electrical Circuit Restored",
		url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
	}
];
function WorkerDashboard() {
	const { user } = useAuth();
	const allComplaints = useComplaints();
	const [tab, setTab] = (0, import_react.useState)("assigned");
	const [proofModalComplaint, setProofModalComplaint] = (0, import_react.useState)(null);
	const workerComplaints = (0, import_react.useMemo)(() => {
		if (!user) return allComplaints;
		const workerName = user.name.toLowerCase();
		const dept = user.department?.toLowerCase();
		const matches = allComplaints.filter((c) => {
			const matchAssignee = c.assignee.toLowerCase().includes(workerName) || workerName.includes(c.assignee.toLowerCase());
			const matchDept = dept && c.department.toLowerCase() === dept;
			return matchAssignee || matchDept;
		});
		return matches.length > 0 ? matches : allComplaints;
	}, [allComplaints, user]);
	const filtered = (0, import_react.useMemo)(() => {
		switch (tab) {
			case "assigned": return workerComplaints.filter((c) => c.status === "Assigned" || c.status === "Submitted");
			case "in_progress": return workerComplaints.filter((c) => c.status === "In Progress" || c.status === "Escalated");
			case "resolved": return workerComplaints.filter((c) => c.status === "Resolved");
			default: return workerComplaints;
		}
	}, [workerComplaints, tab]);
	const totalAssigned = workerComplaints.filter((c) => c.status !== "Resolved").length;
	const inProgCount = workerComplaints.filter((c) => c.status === "In Progress").length;
	const urgentCount = workerComplaints.filter((c) => (c.priority === "Critical" || c.priority === "High") && c.status !== "Resolved").length;
	const resolvedCount = workerComplaints.filter((c) => c.status === "Resolved").length;
	const handleStartWork = (id) => {
		updateStatus(id, "In Progress").catch((error) => toast.error(error instanceof Error ? error.message : "Could not update complaint status."));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel glow relative overflow-hidden p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 font-mono text-xs text-warning",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), " Field Technician & Crew Portal"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 text-3xl font-extrabold sm:text-4xl",
							children: ["Technician Workspace: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: user?.name || "Field Worker"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 max-w-xl text-sm text-muted-foreground",
							children: [
								"Department: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: user?.department || "Maintenance & Facilities"
								}),
								" · Status: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-success font-semibold",
									children: "Active On-Duty"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-2xl border border-border bg-card/70 p-3 font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-success animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ready for field work & proof uploads" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Tasks to Execute"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold",
								children: totalAssigned
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "In Progress"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-warning",
								children: inProgCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Critical Urgency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-destructive",
								children: urgentCount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Completed Work"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-3xl font-bold text-success",
								children: resolvedCount
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Assigned Work Orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Execute field repairs, update job status, and upload photographic completion evidence."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5 rounded-xl bg-muted p-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab("assigned"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${tab === "assigned" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Assigned to Me (",
										totalAssigned,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab("in_progress"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${tab === "in_progress" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"In Progress (",
										inProgCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab("resolved"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${tab === "resolved" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Completed (",
										resolvedCount,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab("all"),
									className: `rounded-lg px-3 py-1.5 font-medium transition ${tab === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"All Dept Tickets (",
										workerComplaints.length,
										")"
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
						children: filtered.map((c) => {
							const s = slaState(c);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
								layout: true,
								className: `panel flex flex-col justify-between p-5 transition ${c.status === "Resolved" ? "border-success/30 bg-success/5" : c.priority === "Critical" ? "border-destructive/40" : ""}`,
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
										className: "mt-1 text-xs text-muted-foreground line-clamp-3",
										children: c.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-1 rounded-xl bg-muted/40 p-3 font-mono text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: c.location
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reporter: ", c.reporter] })]
										})]
									}),
									c.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-mono text-muted-foreground uppercase",
											children: "Citizen Photo:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: c.image,
											alt: "Citizen reported issue",
											className: "mt-1 h-32 w-full rounded-lg border object-cover"
										})]
									}),
									c.status !== "Resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between font-mono text-[10px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													"SLA Window: ",
													c.slaHours,
													"h"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: s.breached ? "text-destructive font-bold" : "text-foreground",
												children: s.breached ? `Breached by ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} remaining`
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBar, {
												pct: s.pct,
												breached: s.breached
											})
										})]
									}),
									c.status === "Resolved" && c.completionProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-xl border border-success/30 bg-success/10 p-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 font-bold text-success",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Work Proof Uploaded"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: [
													"“",
													c.completionProof.notes,
													"”"
												]
											}),
											c.completionProof.partsUsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-mono text-[10px] text-muted-foreground",
												children: ["Parts: ", c.completionProof.partsUsed]
											}),
											c.completionProof.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: c.completionProof.image,
												alt: "Work completion proof",
												className: "mt-2 h-28 w-full rounded-lg border border-success/30 object-cover"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 text-right font-mono text-[10px] text-muted-foreground",
												children: ["Completed at ", new Date(c.completionProof.completedAt).toLocaleTimeString()]
											})
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 border-t border-border pt-4",
									children: c.status !== "Resolved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [c.status !== "In Progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleStartWork(c.id),
											className: "btn btn-ghost w-full py-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-warning" }), " Start Working on Ticket"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setProofModalComplaint(c),
											className: "btn btn-primary w-full py-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-3.5" }), " Mark Completed & Upload Proof"]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs text-success font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), " Work Complete"]
										}), c.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-amber-400",
											children: [
												"Citizen Rating: ",
												c.rating,
												"★"
											]
										})]
									})
								})]
							}, c.id);
						})
					}),
					filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "mx-auto size-8 text-success" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-bold",
								children: "All caught up!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "No tasks currently pending in this category."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: proofModalComplaint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkProofUploadModal, {
				complaint: proofModalComplaint,
				onClose: () => setProofModalComplaint(null)
			}) })
		]
	});
}
function WorkProofUploadModal({ complaint, onClose }) {
	const { user } = useAuth();
	const [proofImg, setProofImg] = (0, import_react.useState)(SAMPLE_PROOF_IMAGES[0]?.url);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [parts, setParts] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const onFile = (f) => {
		if (!f) return;
		const r = new FileReader();
		r.onload = () => setProofImg(r.result);
		r.readAsDataURL(f);
	};
	const handleSubmitProof = async (e) => {
		e.preventDefault();
		if (!notes.trim()) return;
		setSubmitting(true);
		try {
			await resolveWithProof(complaint.id, {
				completedBy: user?.name || "Field Worker",
				notes: notes.trim(),
				partsUsed: parts.trim() || void 0,
				image: proofImg
			});
			setSubmitting(false);
			setSuccess(true);
			setTimeout(() => {
				onClose();
			}, 1e3);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save completion proof.");
		} finally {
			setSubmitting(false);
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
			className: "panel max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs text-primary",
					children: complaint.id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xl font-bold",
					children: "Upload Work Completion Proof"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						className: "mx-auto size-14 rounded-full bg-success/20 grid place-items-center text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mt-4 text-xl font-bold",
						children: "Work Proof Uploaded!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Complaint ",
							complaint.id,
							" marked as Resolved and proof logged to the public timeline."
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmitProof,
				className: "mt-5 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-muted/40 p-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Complaint Title: "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: complaint.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Location: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: complaint.location
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block font-mono text-xs text-muted-foreground",
							children: "Proof of Completed Work (Photo)"
						}),
						proofImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: proofImg,
								alt: "Proof Preview",
								className: "h-44 w-full rounded-xl border border-success/40 object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setProofImg(void 0),
								className: "absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-input py-8 text-xs text-muted-foreground hover:border-primary hover:text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5" }),
								" Attach or drop proof photo",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									hidden: true,
									onChange: (e) => onFile(e.target.files?.[0])
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase text-muted-foreground",
								children: "Quick Sample Evidence Presets:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 flex flex-wrap gap-2",
								children: SAMPLE_PROOF_IMAGES.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setProofImg(img.url),
									className: `rounded-lg border px-2 py-1 text-[11px] transition ${proofImg === img.url ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`,
									children: img.label
								}, img.label))
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-1 block font-mono text-xs text-muted-foreground",
						children: ["Work Remarks / Action Taken ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-destructive",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 3,
						placeholder: "e.g. Replaced faulty 100W halogen bulb with 50W LED array. Verified voltage and illuminated area properly.",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						className: "field min-h-20 resize-none text-sm"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block font-mono text-xs text-muted-foreground",
						children: "Parts & Materials Used (Optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "e.g. 50W LED Bulb, 2x Terminal Connectors, 3m Wire",
						value: parts,
						onChange: (e) => setParts(e.target.value),
						className: "field text-sm"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs text-muted-foreground",
							children: ["Technician: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-foreground",
								children: user?.name || "Field Worker"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onClose,
								className: "btn btn-ghost text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: !notes.trim() || submitting,
								className: "btn btn-primary text-xs disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), " Submit Proof & Close Ticket"]
							})]
						})]
					})
				]
			})]
		})
	});
}
function Index() {
	const { user, isAuthenticated } = useAuth();
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [authModalTab, setAuthModalTab] = (0, import_react.useState)("login");
	if (!isAuthenticated || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-[85vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid-bg border-b border-border py-16 lg:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 15
					},
					animate: {
						opacity: 1,
						y: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-3.5" }), " Resolvr · Smart Civic & Campus Resolution Engine"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-4xl font-extrabold tracking-tight md:text-6xl",
							children: [
								"One Platform. Three Powerful ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: "Dashboards"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg",
							children: [
								"Complaints route themselves to field workers via AI. Dedicated portals for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Citizens"
								}),
								" to report,",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Workers"
								}),
								" to fix & upload completion proof, and",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Admins"
								}),
								" to manage operations."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .98
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { delay: .15 },
					className: "mx-auto mt-8 max-w-xl rounded-2xl border border-accent/40 bg-accent/10 p-4 text-left shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-5 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-accent text-sm",
								children: "First time visiting Resolvr? Please Register First!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "If you don't have an account registered yet, create one now to file grievances, receive maintenance tasks, or access the administrative command center."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setAuthModalTab("register");
										setAuthModalOpen(true);
									},
									className: "btn btn-primary px-4 py-1.5 text-xs font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5" }), " Register New Account"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setAuthModalTab("login");
										setAuthModalOpen(true);
									},
									className: "btn btn-ghost px-4 py-1.5 text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-3.5" }), " Already Registered? Sign In"]
								})]
							})
						] })]
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
			isOpen: authModalOpen,
			onClose: () => setAuthModalOpen(false),
			initialTab: authModalTab,
			forceRegisterNotice: true
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-card/40 px-4 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current Role:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground uppercase",
							children: user.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"(",
								user.name,
								")"
							]
						})
					]
				})
			})
		}),
		user.role === "public" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitizenDashboard, {}),
		user.role === "worker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerDashboard, {}),
		user.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {})
	] });
}
//#endregion
export { Index as component };

import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Circle, c as Star, d as ShieldCheck, k as CircleCheck, m as Search, u as Siren } from "../_libs/lucide-react.mjs";
import { a as SlaBar, i as Pill } from "./app-ui-kHhiH690.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as rateComplaint, f as useComplaints, n as SUPERVISORS, s as fmtDur, u as slaState } from "./complaints-BK1KAW04.mjs";
import { t as Route } from "./track-BUqnDX2T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-BM4FOw4n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Submitted",
	"Assigned",
	"In Progress",
	"Resolved"
];
function Track() {
	const { id } = Route.useSearch();
	const nav = useNavigate();
	const list = useComplaints();
	const [q, setQ] = (0, import_react.useState)(id ?? "");
	const c = list.find((x) => x.id.toLowerCase() === (id ?? "").toLowerCase());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-4xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold md:text-5xl",
				children: "Track your complaint"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Enter your complaint ticket ID to view real-time SLA countdown, assigned technician, and uploaded proof of work."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					nav({
						to: "/track",
						search: { id: q.trim().toUpperCase() }
					});
				},
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field font-mono",
					placeholder: "e.g. CMP-4810",
					value: q,
					onChange: (e) => setQ(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn btn-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), " Track"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground",
				children: ["Try demo IDs:", list.slice(0, 5).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setQ(x.id);
						nav({
							to: "/track",
							search: { id: x.id }
						});
					},
					className: "text-primary hover:underline",
					children: x.id
				}, x.id))]
			}),
			id && !c && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-muted-foreground",
				children: [
					"No complaint found with ID ",
					id,
					". Please verify the number."
				]
			}),
			c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, { c })
		]
	});
}
function Detail({ c }) {
	const s = slaState(c);
	const stepIdx = c.status === "Escalated" ? 2 : STEPS.indexOf(c.status);
	const [rating, setRating] = (0, import_react.useState)(c.rating || 5);
	const [feedback, setFeedback] = (0, import_react.useState)(c.feedback || "");
	const [rated, setRated] = (0, import_react.useState)(!!c.rating);
	const handleRate = async () => {
		try {
			await rateComplaint(c.id, rating, feedback);
			setRated(true);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save your feedback.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-primary",
								children: c.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl font-bold",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: c.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								kind: "p",
								value: c.priority
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								kind: "s",
								value: c.status
							})]
						})]
					}),
					c.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase text-muted-foreground mb-1",
							children: "Citizen Reported Photo:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: "Attached evidence",
							className: "h-48 rounded-lg border border-border object-cover"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-6 grid grid-cols-2 gap-3 font-mono text-sm md:grid-cols-4",
						children: [
							["Category", c.category],
							["Department", c.department],
							["Location", c.location],
							["Assignee", c.assignee]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[10px] uppercase text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 truncate font-semibold",
								children: v
							})]
						}, k))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [
								"SLA · ",
								c.slaHours,
								"h target"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono ${s.breached ? "text-destructive font-bold" : "text-primary"}`,
							children: c.status === "Resolved" ? "Closed & Verified" : s.breached ? `Overdue by ${fmtDur(-s.remaining)}` : `${fmtDur(s.remaining)} left`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaBar, {
							pct: s.pct,
							breached: s.breached
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-4 gap-2",
						children: STEPS.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mx-auto h-1 rounded-full ${i <= stepIdx ? "bg-primary" : "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-2 text-xs ${i <= stepIdx ? "text-foreground font-bold" : "text-muted-foreground"}`,
								children: st
							})]
						}, st))
					}),
					c.escalationLevel > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Siren, { className: "size-4" }),
							" Auto-escalated to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: SUPERVISORS[c.escalationLevel - 1] }),
							" (level ",
							c.escalationLevel,
							"/3) due to SLA breach"
						]
					})
				]
			}),
			c.completionProof && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel border-success/40 bg-success/5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-bold text-success text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }), " Completed Work Evidence & Verification"]
						}), c.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 font-mono text-amber-400 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-current" }),
								"Citizen Rating: ",
								c.rating,
								"/5"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: "Technician Action Notes:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground bg-card/60 p-3 rounded-xl border border-border",
							children: c.completionProof.notes
						})]
					}),
					c.completionProof.partsUsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 font-mono text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Parts/Components Replaced:" }),
							" ",
							c.completionProof.partsUsed
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [c.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase text-muted-foreground mb-1",
							children: "Before (Original Issue)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: "Before",
							className: "h-40 w-full rounded-lg border object-cover"
						})] }), c.completionProof.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase text-success mb-1",
							children: "After (Worker Completion Proof Photo)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.completionProof.image,
							alt: "After",
							className: "h-40 w-full rounded-lg border border-success/40 object-cover"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 text-right font-mono text-[11px] text-muted-foreground",
						children: [
							"Executed by ",
							c.completionProof.completedBy,
							" at ",
							new Date(c.completionProof.completedAt).toLocaleString()
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-success/20 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-xs",
								children: "Citizen Satisfaction Feedback:"
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
									className: `p-1 transition ${star <= rating ? "text-amber-400" : "text-muted-foreground/30"}`,
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
									placeholder: "Leave comment on repair quality...",
									value: feedback,
									onChange: (e) => setFeedback(e.target.value),
									className: "field text-xs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleRate,
									className: "btn btn-primary px-4 py-1.5 text-xs",
									children: "Submit Feedback"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs text-success",
								children: "✓ Thank you! Your feedback has been verified and logged."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold",
					children: "Transparent Audit Timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-4",
					children: [...c.timeline].sort((a, b) => b.at - a.at).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-sm ${t.label.includes("scalat") ? "text-destructive font-semibold" : ""}`,
							children: t.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs text-muted-foreground",
							children: [new Date(t.at).toLocaleString(), t.note ? ` · ${t.note}` : ""]
						})] })]
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { Track as component };

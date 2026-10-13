import { r as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth } from "./auth-_dFKPZha.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleAlert, M as Camera, l as Sparkles, t as X, y as LocateFixed } from "../_libs/lucide-react.mjs";
import { i as Pill, t as AuthDialog } from "./app-ui-kHhiH690.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as analyze, r as addComplaint, t as SLA } from "./complaints-BK1KAW04.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-DJWw22SM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATS = [
	"Electrical",
	"Plumbing",
	"Sanitation",
	"Roads",
	"Security",
	"IT & Network",
	"Noise",
	"General"
];
var PRIS = [
	"Critical",
	"High",
	"Medium",
	"Low"
];
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
function Submit() {
	const nav = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const [desc, setDesc] = (0, import_react.useState)("");
	const [loc, setLoc] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)(user?.name || "");
	const [img, setImg] = (0, import_react.useState)();
	const [over, setOver] = (0, import_react.useState)({});
	const [showAuthModal, setShowAuthModal] = (0, import_react.useState)(false);
	const [authTab, setAuthTab] = (0, import_react.useState)("register");
	(0, import_react.useEffect)(() => {
		if (user?.name && !name) setName(user.name);
	}, [user]);
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
	const geo = () => navigator.geolocation?.getCurrentPosition((p) => setLoc(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`));
	const submit = async () => {
		const reporterName = user?.name || name || "Anonymous Citizen";
		try {
			const c = await addComplaint({
				description: desc,
				location: location || "Campus / Ward Central",
				reporter: reporterName,
				image: img,
				category,
				priority,
				department: DEPT[category],
				confidence: ai.confidence
			});
			nav({
				to: "/track",
				search: { id: c.id }
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not submit complaint.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.2fr_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold md:text-5xl",
					children: "What's wrong?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Describe your complaint in plain words. AI triages and routes it instantly."
				}),
				!isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-accent",
								children: "Not registered yet?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-muted-foreground",
								children: "You can submit as a guest, but we recommend registering first to track real-time resolution and review worker proof."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setAuthTab("register");
											setShowAuthModal(true);
										},
										className: "font-bold text-primary underline",
										children: "Register first"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setAuthTab("login");
											setShowAuthModal(true);
										},
										className: "font-bold text-foreground underline",
										children: "Sign In"
									})
								]
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel mt-6 space-y-5 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "field min-h-36 resize-none text-base",
							placeholder: "e.g. Water pipe leaking near Hostel 4 since morning…",
							value: desc,
							onChange: (e) => setDesc(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field pr-10",
									placeholder: ai.location ? `Detected: ${ai.location}` : "Location",
									value: loc,
									onChange: (e) => setLoc(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: geo,
									title: "Use my location",
									className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "size-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								placeholder: "Your name",
								value: user?.name || name,
								onChange: (e) => setName(e.target.value),
								disabled: !!user
							})]
						}),
						img ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: img,
								alt: "Attachment",
								className: "h-40 rounded-lg border border-border object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setImg(void 0),
								className: "absolute -right-2 -top-2 rounded-full bg-secondary p-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							onDragOver: (e) => e.preventDefault(),
							onDrop: (e) => {
								e.preventDefault();
								onFile(e.dataTransfer.files[0]);
							},
							className: "flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input py-8 text-sm text-muted-foreground transition hover:border-primary hover:text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }),
								" Drop a photo or click to attach",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									hidden: true,
									onChange: (e) => onFile(e.target.files?.[0])
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !ready,
							onClick: submit,
							className: "btn btn-primary w-full disabled:opacity-40",
							children: "Submit complaint"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-24 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel glow p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " AI triage · live"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							className: "mt-6 text-sm text-muted-foreground",
							children: "Start typing — AI classification and routing appears instantly."
						}, "e") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "mt-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 text-xs text-muted-foreground",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setOver((o) => ({
											...o,
											category: c
										})),
										className: `rounded-full border px-2.5 py-1 text-xs transition ${c === category ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`,
										children: c
									}, c))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 text-xs text-muted-foreground",
									children: "Priority"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: PRIS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setOver((o) => ({
											...o,
											priority: p
										})),
										className: p === priority ? "" : "opacity-40 hover:opacity-80",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											kind: "p",
											value: p
										})
									}, p))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "grid grid-cols-2 gap-3 font-mono text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "Department"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-semibold",
												children: DEPT[category]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "Location"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-semibold",
												children: location || "—"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "SLA target"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 font-semibold",
												children: [SLA[priority], "h"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-[10px] uppercase text-muted-foreground",
												children: "Confidence"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
												className: "mt-1 font-semibold text-primary",
												children: [Math.round(ai.confidence * 100), "%"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Adjust category or priority if needed before submission."
								})
							]
						}, "r")
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
				isOpen: showAuthModal,
				onClose: () => setShowAuthModal(false),
				initialTab: authTab
			})
		]
	});
}
//#endregion
export { Submit as component };

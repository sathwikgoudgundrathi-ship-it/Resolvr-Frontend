import { r as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth, i as registerUser, n as loginUser, r as logoutUser } from "./auth-_dFKPZha.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleAlert, D as CircleUserRound, N as BuildingComplex, _ as LogOut, f as ShieldAlert, h as Radar, i as UserPlus, l as Sparkles, n as Wrench, v as LogIn } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-ui-kHhiH690.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function AuthDialog({ isOpen, onClose, initialTab = "login", forceRegisterNotice = false }) {
	const { user } = useAuth();
	const [tab, setTab] = (0, import_react.useState)(initialTab);
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPass, setLoginPass] = (0, import_react.useState)("");
	const [loginError, setLoginError] = (0, import_react.useState)(null);
	const [regName, setRegName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regDept, setRegDept] = (0, import_react.useState)("Maintenance");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regPass, setRegPass] = (0, import_react.useState)("");
	const [regError, setRegError] = (0, import_react.useState)(null);
	const [regSuccess, setRegSuccess] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	if (!isOpen && user) return null;
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginError(null);
		setSubmitting(true);
		try {
			const res = await loginUser(loginEmail, loginPass);
			if (!res.success) {
				setLoginError(res.error ?? "Login failed.");
				return;
			}
			onClose?.();
		} finally {
			setSubmitting(false);
		}
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		setRegError(null);
		setRegSuccess(null);
		setSubmitting(true);
		try {
			const res = await registerUser({
				name: regName,
				email: regEmail,
				password: regPass,
				department: regDept,
				phone: regPhone
			});
			if (!res.success) {
				setRegError(res.error ?? "Registration failed.");
				return;
			}
			setRegSuccess(`Account created as ${res.user?.role === "admin" ? "Administrator" : res.user?.role === "worker" ? "Field Worker" : "Citizen"}.`);
			setTimeout(() => onClose?.(), 600);
		} finally {
			setSubmitting(false);
		}
	};
	const switchToRegisterWithEmail = (email) => {
		setRegEmail(email);
		setRegError(null);
		setTab("register");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			className: "panel relative w-full max-w-lg border border-border bg-card/95 p-6 shadow-2xl sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Resolvr Role-Based Access"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-2xl font-bold sm:text-3xl",
							children: tab === "login" ? "Welcome Back to Resolvr" : "Create Your Resolvr Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: tab === "login" ? "Sign in to access your role-specific dashboard." : "Register first to lodge complaints, perform work, or administer the system."
						})
					]
				}),
				(forceRegisterNotice || tab === "login") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-accent",
							children: "Not registered yet?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-muted-foreground",
							children: [
								"If you haven't created an account, please",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setTab("register");
										setLoginError(null);
									},
									className: "font-semibold text-primary underline underline-offset-2 hover:text-primary/80",
									children: "Register first here"
								}),
								" ",
								"before attempting to sign in."
							]
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setTab("login");
							setLoginError(null);
						},
						className: `flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${tab === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign In"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setTab("register");
							setRegError(null);
						},
						className: `flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${tab === "register" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " Register First"]
					})]
				}),
				tab === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "mt-6 space-y-4",
					children: [
						loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: -6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: loginError
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1",
									children: [
										"Didn't register yet?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => switchToRegisterWithEmail(loginEmail),
											className: "font-bold underline",
											children: "Click here to Register now"
										})
									]
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block font-mono text-xs text-muted-foreground",
							children: "Email Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "e.g. yourname@domain.com",
							value: loginEmail,
							onChange: (e) => setLoginEmail(e.target.value),
							className: "field"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block font-mono text-xs text-muted-foreground",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							placeholder: "Enter your password",
							value: loginPass,
							onChange: (e) => setLoginPass(e.target.value),
							className: "field"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting,
							className: "btn btn-primary w-full py-2.5 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign In to Dashboard"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs text-muted-foreground",
							children: "Your account role is assigned automatically. Only the configured administrator and worker accounts receive elevated access."
						})
					]
				}),
				tab === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRegister,
					className: "mt-6 space-y-4",
					children: [
						regError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: -6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
							children: regError
						}),
						regSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: -6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "rounded-lg border border-success/40 bg-success/10 p-3 text-xs text-success",
							children: regSuccess
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground",
							children: "New accounts are citizens by default. Administrator and worker access is assigned by the backend to the configured email addresses."
						}),
						regEmail.trim().toLowerCase() === "bhairav@gmail.com" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 5
							},
							animate: {
								opacity: 1,
								y: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Assigned Department"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: regDept,
								onChange: (e) => setRegDept(e.target.value),
								className: "field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Maintenance",
										children: "Maintenance (Electrical & Facilities)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Water Works",
										children: "Water Works (Plumbing & Sanitation)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Sanitation",
										children: "Sanitation (Waste & Cleaning)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Public Works",
										children: "Public Works (Roads & Infrastructure)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Security",
										children: "Security & Patrol"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "IT Services",
										children: "IT & Network Services"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Community Affairs",
										children: "Community Affairs"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "e.g. Ramesh Kumar",
								value: regName,
								onChange: (e) => setRegName(e.target.value),
								className: "field"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "name@resolvr.org",
								value: regEmail,
								onChange: (e) => setRegEmail(e.target.value),
								className: "field"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Phone (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								placeholder: "+91 98765 00000",
								value: regPhone,
								onChange: (e) => setRegPhone(e.target.value),
								className: "field"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block font-mono text-xs text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Create password (at least 8 characters)",
								minLength: 8,
								required: true,
								value: regPass,
								onChange: (e) => setRegPass(e.target.value),
								className: "field"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting,
							className: "btn btn-primary w-full py-2.5 disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " Register & Access Dashboard"]
						})
					]
				})
			]
		})
	});
}
function Nav() {
	const { user, isAuthenticated } = useAuth();
	const [showAuthDialog, setShowAuthDialog] = (0, import_react.useState)(false);
	const [authDialogTab, setAuthDialogTab] = (0, import_react.useState)("login");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold tracking-tight",
						children: "Resolvr"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline-block ml-2 rounded-full border border-border px-2 py-0.2 font-mono text-[10px] text-muted-foreground",
						children: "v2.0"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1 text-xs sm:text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground font-semibold" },
							children: "Dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/submit",
							className: "rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground font-semibold" },
							children: "Report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/track",
							search: { id: void 0 },
							className: "rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground font-semibold" },
							children: "Track"
						}),
						user?.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							className: "rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground font-semibold" },
							children: "Admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analytics",
							className: "hidden sm:inline-flex rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground",
							activeProps: { className: "bg-secondary text-foreground font-semibold" },
							children: "Analytics"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: isAuthenticated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs",
							children: [
								user.role === "public" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, { className: "size-3.5 text-primary" }),
								user.role === "worker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5 text-warning" }),
								user.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingComplex, { className: "size-3.5 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground truncate max-w-[100px]",
									children: user.name.split(" ")[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] uppercase text-muted-foreground",
									children: [
										"(",
										user.role,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: logoutUser,
							title: "Sign Out",
							className: "rounded-full border border-border p-2 text-muted-foreground transition hover:border-destructive hover:bg-destructive/10 hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setAuthDialogTab("register");
								setShowAuthDialog(true);
							},
							className: "hidden sm:inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary",
							children: "Register"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setAuthDialogTab("login");
								setShowAuthDialog(true);
							},
							className: "btn btn-primary px-3.5 py-1.5 text-xs font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-3.5" }), " Sign In"]
						})]
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
		isOpen: showAuthDialog,
		onClose: () => setShowAuthDialog(false),
		initialTab: authDialogTab
	})] });
}
var PRI = {
	Critical: "bg-destructive/15 text-destructive border-destructive/30",
	High: "bg-accent/15 text-accent border-accent/30",
	Medium: "bg-info/15 text-info border-info/30",
	Low: "bg-muted text-muted-foreground border-border"
};
var STA = {
	Submitted: "bg-muted text-muted-foreground border-border",
	Assigned: "bg-info/15 text-info border-info/30",
	"In Progress": "bg-warning/15 text-warning border-warning/30",
	Escalated: "bg-destructive/15 text-destructive border-destructive/30",
	Resolved: "bg-success/15 text-success border-success/30"
};
function Pill({ kind, value }) {
	const cls = kind === "p" ? PRI[value] : STA[value];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide", cls),
		children: [value === "Escalated" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-destructive animate-pulse-ring" }), value]
	});
}
function SlaBar({ pct, breached }) {
	const w = Math.min(100, pct * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-all", breached ? "bg-destructive" : pct > .75 ? "bg-accent" : "bg-primary"),
			style: { width: `${w}%` }
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border py-8 text-center font-mono text-xs text-muted-foreground",
		children: "RESOLVR · Role-Based Smart Grievance Resolution & Auto-Escalation Engine · 3 Role Dashboards"
	});
}
//#endregion
export { SlaBar as a, Pill as i, Footer as n, Nav as r, AuthDialog as t };

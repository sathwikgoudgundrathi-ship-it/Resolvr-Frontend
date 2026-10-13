import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth } from "./auth-_dFKPZha.mjs";
import { f as useComplaints, u as slaState } from "./complaints-BK1KAW04.mjs";
import { a as XAxis, c as Pie, d as Tooltip, f as ResponsiveContainer, i as YAxis, l as PolarAngleAxis, n as PieChart, o as Bar, r as BarChart, s as RadialBar, t as RadialBarChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-8uZ4y05d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var C = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
	"var(--muted-foreground)",
	"var(--warning)",
	"var(--info)"
];
var tip = {
	contentStyle: {
		background: "var(--popover)",
		border: "1px solid var(--border)",
		borderRadius: 10,
		fontSize: 12
	},
	cursor: { fill: "var(--muted)" }
};
function count(arr, key) {
	const m = {};
	arr.forEach((x) => m[key(x)] = (m[key(x)] ?? 0) + 1);
	return Object.entries(m).map(([name, value]) => ({
		name,
		value
	})).sort((a, b) => b.value - a.value);
}
function Analytics() {
	const { user } = useAuth();
	const list = useComplaints();
	const d = (0, import_react.useMemo)(() => {
		const ok = list.length ? Math.round(list.filter((c) => !slaState(c).breached).length / list.length * 100) : 100;
		const deptPerf = count(list, (c) => c.department).map((x) => ({
			...x,
			breached: list.filter((c) => c.department === x.name && slaState(c).breached).length
		}));
		return {
			ok,
			cat: count(list, (c) => c.category),
			pri: count(list, (c) => c.priority),
			dept: deptPerf,
			loc: count(list, (c) => c.location).slice(0, 6),
			ai: Math.round(list.reduce((s, c) => s + c.confidence, 0) / Math.max(1, list.length) * 100)
		};
	}, [list]);
	return user?.role !== "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Administrator sign in required"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground",
			children: "Analytics are available to the administrator account."
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold",
				children: "Analytics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted-foreground",
				children: [list.length, " complaints tracked"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm text-muted-foreground",
							children: "SLA compliance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-48",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
								innerRadius: "75%",
								outerRadius: "100%",
								data: [{ v: d.ok }],
								startAngle: 220,
								endAngle: -40,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
									type: "number",
									domain: [0, 100],
									tick: false
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
									dataKey: "v",
									cornerRadius: 20,
									fill: "var(--chart-1)",
									background: { fill: "var(--muted)" }
								})]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 grid place-items-center font-mono text-4xl font-bold",
								children: [d.ok, "%"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm text-muted-foreground",
								children: "Category mix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-48",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: d.cat,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 45,
									outerRadius: 75,
									paddingAngle: 3,
									stroke: "none",
									children: d.cat.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: C[i % C.length] }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tip })] }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-x-3 gap-y-1 text-xs",
								children: d.cat.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 rounded-full",
										style: { background: C[i % C.length] }
									}), x.name]
								}, x.name))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm text-muted-foreground",
								children: "AI routing confidence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 font-mono text-6xl font-bold text-gradient",
								children: [d.ai, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 space-y-2",
								children: d.pri.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-16 text-muted-foreground",
											children: p.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2 flex-1 rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-accent",
												style: { width: `${p.value / list.length * 100}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: p.value
										})
									]
								}, p.name))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm text-muted-foreground",
						children: "Department load vs SLA breaches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: d.dept,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--muted-foreground)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									tick: {
										fill: "var(--muted-foreground)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tip }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									name: "Total",
									fill: "var(--chart-3)",
									radius: [
										6,
										6,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "breached",
									name: "Breached",
									fill: "var(--chart-4)",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						}) })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm text-muted-foreground",
						children: "Hotspots"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: d.loc.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: ["0", i + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm",
									children: l.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex gap-0.5",
									children: Array.from({ length: l.value }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-1.5 rounded-sm bg-primary" }, k))
								})
							]
						}, l.name))
					})]
				})]
			})
		]
	});
}
//#endregion
export { Analytics as component };

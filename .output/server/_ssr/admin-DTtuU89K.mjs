import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth } from "./auth-_dFKPZha.mjs";
import { t as AdminDashboard } from "./admin-dashboard-Bjb5S4-6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DTtuU89K.js
var import_jsx_runtime = require_jsx_runtime();
function AdminRouteComponent() {
	const { user } = useAuth();
	if (user?.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Administrator sign in required"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground",
			children: "Sign in with the configured administrator account to open the command center."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {});
}
//#endregion
export { AdminRouteComponent as component };

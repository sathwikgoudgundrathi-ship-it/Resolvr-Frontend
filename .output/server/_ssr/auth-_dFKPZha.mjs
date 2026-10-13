import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-_dFKPZha.js
var import_react = /* @__PURE__ */ __toESM(require_react());
async function apiRequest(path, init) {
	let response;
	try {
		const apiBase = `${typeof window === "undefined" ? "http://localhost" : window.location.origin.replace(/:\d+$/, "")}:8082/api`.replace(/\/$/, "");
		response = await fetch(`${apiBase}${path}`, {
			...init,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...init?.headers
			}
		});
	} catch {
		throw new Error("Cannot reach the Resolvr backend. Start the Spring Boot API and try again.");
	}
	const body = await response.json().catch(() => null);
	if (!response.ok) throw new Error(body?.message ?? body?.error ?? `Request failed (${response.status})`);
	return body;
}
var currentUser = null;
var subscribers = /* @__PURE__ */ new Set();
var cachedUser;
var cachedSnapshot;
function getAuthSnapshot() {
	if (cachedSnapshot && cachedUser === currentUser) return cachedSnapshot;
	cachedUser = currentUser;
	cachedSnapshot = {
		user: currentUser,
		isAuthenticated: !!currentUser
	};
	return cachedSnapshot;
}
var serverAuthSnapshot = {
	user: null,
	isAuthenticated: false
};
function notify() {
	subscribers.forEach((fn) => fn());
}
var initialized = false;
function initAuth() {
	if (initialized || typeof window === "undefined") return;
	initialized = true;
	apiRequest("/auth/session").then((result) => {
		currentUser = result.user ?? null;
	}).catch(() => {
		currentUser = null;
	}).finally(notify);
}
function useAuth() {
	return (0, import_react.useSyncExternalStore)((callback) => {
		initAuth();
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	}, () => {
		initAuth();
		return getAuthSnapshot();
	}, () => serverAuthSnapshot);
}
async function loginUser(email, password) {
	initAuth();
	try {
		const result = await apiRequest("/auth/login", {
			method: "POST",
			body: JSON.stringify({
				email: email.trim().toLowerCase(),
				password
			})
		});
		if (!result.success || !result.user) return {
			success: false,
			error: result.message ?? "Sign in failed."
		};
		currentUser = result.user;
		notify();
		return {
			success: true,
			user: result.user
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Sign in failed."
		};
	}
}
async function registerUser(input) {
	initAuth();
	try {
		const result = await apiRequest("/auth/register", {
			method: "POST",
			body: JSON.stringify({
				...input,
				role: "PUBLIC"
			})
		});
		if (!result.success || !result.user) return {
			success: false,
			error: result.message ?? "Registration failed."
		};
		currentUser = result.user;
		notify();
		return {
			success: true,
			user: result.user
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Registration failed."
		};
	}
}
async function logoutUser() {
	initAuth();
	try {
		await apiRequest("/auth/logout", { method: "POST" });
	} finally {
		currentUser = null;
		notify();
	}
}
//#endregion
export { useAuth as a, registerUser as i, loginUser as n, logoutUser as r, apiRequest as t };

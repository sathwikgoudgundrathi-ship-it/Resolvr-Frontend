globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-13T06:04:42.984Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-13T06:04:42.984Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AnimatePresence-BG7kHJzw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1108-5GihEaTuEnIoJWiEDb/Bh4oH4hs\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 4360,
		"path": "../public/assets/AnimatePresence-BG7kHJzw.js"
	},
	"/assets/admin-CFlVsnAH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-7sjFOQ8K1sbFKT/3ZZxD4w2lSu4\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 519,
		"path": "../public/assets/admin-CFlVsnAH.js"
	},
	"/assets/admin-dashboard-Bzy5z4L4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f18-l7c9Z0lxCnzW2RfmD8qrLh9wJOs\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 20248,
		"path": "../public/assets/admin-dashboard-Bzy5z4L4.js"
	},
	"/assets/camera-CTjE-q9y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-2pDA0mjLl9TSC4PDGO8sOSzpPJM\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 366,
		"path": "../public/assets/camera-CTjE-q9y.js"
	},
	"/assets/app-ui-B_nBFV0F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bcc9-jsvxgrNmcH1msL3se1W6OMX7iyY\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 179401,
		"path": "../public/assets/app-ui-B_nBFV0F.js"
	},
	"/assets/dist-DAsna33f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c252-gNsVOfG9rRg+3eUqOdkqS2pVrA0\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 49746,
		"path": "../public/assets/dist-DAsna33f.js"
	},
	"/assets/complaints-B8T-rMnN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1b-X4iMrCmATnjXkV7gx1bXxQOV2F4\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 3611,
		"path": "../public/assets/complaints-B8T-rMnN.js"
	},
	"/assets/routes-B25wEcaz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9be8-habdalCOpj9tT62bt2K2aT6YUjQ\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 39912,
		"path": "../public/assets/routes-B25wEcaz.js"
	},
	"/assets/submit-DXWA7kWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e48-dvh8sWIRAsJU6pd6KN91anEqG14\"",
		"mtime": "2026-10-13T06:04:42.821Z",
		"size": 7752,
		"path": "../public/assets/submit-DXWA7kWk.js"
	},
	"/assets/track-B9XcdTos.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2081-/+/sslxOuRpW1btKQPXEi8Llj3g\"",
		"mtime": "2026-10-13T06:04:42.821Z",
		"size": 8321,
		"path": "../public/assets/track-B9XcdTos.js"
	},
	"/assets/useNavigate-CsebUtvs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-4x7xykhRQ2MKIK4tNGy61DVqbP0\"",
		"mtime": "2026-10-13T06:04:42.821Z",
		"size": 218,
		"path": "../public/assets/useNavigate-CsebUtvs.js"
	},
	"/assets/track-CngCe8zP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1928-L6XJ06aj1K7iWpunbOqyrhVTvdo\"",
		"mtime": "2026-10-13T06:04:42.821Z",
		"size": 6440,
		"path": "../public/assets/track-CngCe8zP.js"
	},
	"/assets/star-B-Kj4pBq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62c-KqysBdimYzzVDhibQRt3cT9MIkw\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 1580,
		"path": "../public/assets/star-B-Kj4pBq.js"
	},
	"/assets/analytics-DLsSamBw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f3b8-KN2idwH3MC3LSBwZeDwRqT1foTc\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 390072,
		"path": "../public/assets/analytics-DLsSamBw.js"
	},
	"/assets/styles-DAzmxztv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14d6b-ckMVNrr/05uQ0uH++RYE67V0NWc\"",
		"mtime": "2026-10-13T06:04:42.821Z",
		"size": 85355,
		"path": "../public/assets/styles-DAzmxztv.css"
	},
	"/assets/index-DcYwmV5U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5361e-urmW4fJpwNIfWzxBWY/bxKDDY4Q\"",
		"mtime": "2026-10-13T06:04:42.820Z",
		"size": 341534,
		"path": "../public/assets/index-DcYwmV5U.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_4HZY2I = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_4HZY2I
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

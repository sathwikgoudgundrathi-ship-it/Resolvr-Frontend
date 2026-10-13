import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-BUqnDX2T.js
var $$splitComponentImporter = () => import("./track-BM4FOw4n.mjs");
var Route = createFileRoute("/track")({
	validateSearch: (s) => ({ id: typeof s["id"] === "string" ? s["id"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Track a complaint — Resolvr" },
		{
			name: "description",
			content: "Follow every step of your complaint with a transparent timeline, SLA clock, and verified work proof."
		},
		{
			property: "og:title",
			content: "Track a complaint — Resolvr"
		},
		{
			property: "og:description",
			content: "Transparent complaint status, SLA tracking, and completed work evidence."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

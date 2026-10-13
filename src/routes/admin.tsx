import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { AdminDashboard } from "@/components/admin-dashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Command Center — Resolvr" },
      { name: "description", content: "Admin dashboard to monitor SLAs, manage assignments and watch auto-escalations live." },
      { property: "og:title", content: "Command Center — Resolvr" },
      { property: "og:description", content: "Live SLA monitoring and escalation control." },
    ],
  }),
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const { user } = useAuth();
  if (user?.role !== "admin") return <main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-2xl font-bold">Administrator sign in required</h1><p className="mt-2 text-muted-foreground">Sign in with the configured administrator account to open the command center.</p></main>;
  return <AdminDashboard />;
}

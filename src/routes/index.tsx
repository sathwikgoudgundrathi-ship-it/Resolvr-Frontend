import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Radar, AlertCircle, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { CitizenDashboard } from "@/components/citizen-dashboard";
import { WorkerDashboard } from "@/components/worker-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AuthDialog } from "@/components/auth-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resolvr — Smart Complaint Resolution & Escalation" },
      { name: "description", content: "Role-based complaint platform with Citizen, Worker, and Admin Command Center dashboards." },
      { property: "og:title", content: "Resolvr — Smart Complaint Resolution" },
      { property: "og:description", content: "AI-routed complaints with SLA monitoring, worker proof uploads, and auto-escalation." },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  // If not logged in, render the Auth Welcome Gate
  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-[85vh]">
        <section className="grid-bg border-b border-border py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-5 text-center">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs text-primary">
                <Radar className="size-3.5" /> Resolvr · Smart Civic & Campus Resolution Engine
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                One Platform. Three Powerful <span className="text-gradient">Dashboards</span>.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Complaints route themselves to field workers via AI. Dedicated portals for{" "}
                <b className="text-foreground">Citizens</b> to report,{" "}
                <b className="text-foreground">Workers</b> to fix & upload completion proof, and{" "}
                <b className="text-foreground">Admins</b> to manage operations.
              </p>
            </motion.div>

            {/* DIRECTIVE FOR UNREGISTERED USERS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="mx-auto mt-8 max-w-xl rounded-2xl border border-accent/40 bg-accent/10 p-4 text-left shadow-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <h3 className="font-bold text-accent text-sm">
                    First time visiting Resolvr? Please Register First!
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    If you don't have an account registered yet, create one now to file grievances,
                    receive maintenance tasks, or access the administrative command center.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setAuthModalTab("register");
                        setAuthModalOpen(true);
                      }}
                      className="btn btn-primary px-4 py-1.5 text-xs font-bold"
                    >
                      <UserPlus className="size-3.5" /> Register New Account
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalTab("login");
                        setAuthModalOpen(true);
                      }}
                      className="btn btn-ghost px-4 py-1.5 text-xs font-semibold"
                    >
                      <LogIn className="size-3.5" /> Already Registered? Sign In
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Auth Dialog Modal */}
        <AuthDialog
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialTab={authModalTab}
          forceRegisterNotice={true}
        />
      </main>
    );
  }

  // When Authenticated: Render the user's specific dashboard!
  return (
    <div>
      {/* Authenticated role indicator */}
      <div className="border-b border-border bg-card/40 px-4 py-2">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-muted-foreground">
            <span>Current Role:</span>
            <span className="font-bold text-foreground uppercase">{user.role}</span>
            <span className="text-muted-foreground">({user.name})</span>
          </div>

        </div>
      </div>

      {/* Render the specific dashboard */}
      {user.role === "public" && <CitizenDashboard />}
      {user.role === "worker" && <WorkerDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Radar, LogIn, LogOut, User, Wrench, Building2, UserCircle2, Sparkles } from "lucide-react";
import type { Priority, Status } from "@/lib/complaints";
import { cn } from "@/lib/utils";
import { useAuth, logoutUser } from "@/lib/auth";
import { AuthDialog } from "@/components/auth-dialog";

export function Nav() {
  const { user, isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "register">("login");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Radar className="size-5" />
            </span>
            <div>
              <span className="font-display text-lg font-bold tracking-tight">Resolvr</span>
              <span className="hidden sm:inline-block ml-2 rounded-full border border-border px-2 py-0.2 font-mono text-[10px] text-muted-foreground">
                v2.0
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 text-xs sm:text-sm">
            <Link
              to="/"
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
            >
              Dashboard
            </Link>
            <Link
              to="/submit"
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
            >
              Report
            </Link>
            <Link
              to="/track"
              search={{ id: undefined }}
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
            >
              Track
            </Link>
            {user?.role === "admin" && <>
              <Link to="/admin" className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground font-semibold" }}>Admin</Link>
              <Link to="/analytics" className="hidden sm:inline-flex rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground font-semibold" }}>Analytics</Link>
            </>}
          </nav>

          {/* Auth Status & Controls */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                {/* User Pill */}
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
                  {user.role === "public" && <UserCircle2 className="size-3.5 text-primary" />}
                  {user.role === "worker" && <Wrench className="size-3.5 text-warning" />}
                  {user.role === "admin" && <Building2 className="size-3.5 text-accent" />}
                  <span className="font-semibold text-foreground truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    ({user.role})
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logoutUser}
                  title="Sign Out"
                  className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthDialogTab("register");
                    setShowAuthDialog(true);
                  }}
                  className="hidden sm:inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    setAuthDialogTab("login");
                    setShowAuthDialog(true);
                  }}
                  className="btn btn-primary px-3.5 py-1.5 text-xs font-bold"
                >
                  <LogIn className="size-3.5" /> Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Auth Dialog Modal */}
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        initialTab={authDialogTab}
      />
    </>
  );
}

const PRI: Record<Priority, string> = {
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
  High: "bg-accent/15 text-accent border-accent/30",
  Medium: "bg-info/15 text-info border-info/30",
  Low: "bg-muted text-muted-foreground border-border",
};
const STA: Record<Status, string> = {
  Submitted: "bg-muted text-muted-foreground border-border",
  Assigned: "bg-info/15 text-info border-info/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  Escalated: "bg-destructive/15 text-destructive border-destructive/30",
  Resolved: "bg-success/15 text-success border-success/30",
};

export function Pill({ kind, value }: { kind: "p" | "s"; value: string }) {
  const cls = kind === "p" ? PRI[value as Priority] : STA[value as Status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        cls
      )}
    >
      {value === "Escalated" && <span className="size-1.5 rounded-full bg-destructive animate-pulse-ring" />}
      {value}
    </span>
  );
}

export function SlaBar({ pct, breached }: { pct: number; breached: boolean }) {
  const w = Math.min(100, pct * 100);
  const color = breached ? "bg-destructive" : pct > 0.75 ? "bg-accent" : "bg-primary";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${w}%` }} />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
      RESOLVR · Role-Based Smart Grievance Resolution & Auto-Escalation Engine · 3 Role Dashboards
    </footer>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { useAuth, loginUser, registerUser } from "@/lib/auth";

export function AuthDialog({
  isOpen,
  onClose,
  initialTab = "login",
  forceRegisterNotice = false,
}: {
  isOpen: boolean;
  onClose?: () => void;
  initialTab?: "login" | "register";
  forceRegisterNotice?: boolean;
}) {
  const { user } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regDept, setRegDept] = useState("Maintenance");
  const [regPhone, setRegPhone] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen && user) return null;

  const handleLogin = async (e: React.FormEvent) => {
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

  const handleRegister = async (e: React.FormEvent) => {
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
        phone: regPhone,
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

  const switchToRegisterWithEmail = (email: string) => {
    setRegEmail(email);
    setRegError(null);
    setTab("register");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="panel relative w-full max-w-lg border border-border bg-card/95 p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <Sparkles className="size-3.5" /> Resolvr Role-Based Access
          </div>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {tab === "login" ? "Welcome Back to Resolvr" : "Create Your Resolvr Account"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "login"
              ? "Sign in to access your role-specific dashboard."
              : "Register first to lodge complaints, perform work, or administer the system."}
          </p>
        </div>

        {/* Prominent directive banner if someone is not registered */}
        {(forceRegisterNotice || tab === "login") && (
          <div className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs text-foreground">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <span className="font-semibold text-accent">Not registered yet?</span>
                <p className="mt-0.5 text-muted-foreground">
                  If you haven't created an account, please{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setTab("register");
                      setLoginError(null);
                    }}
                    className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Register first here
                  </button>{" "}
                  before attempting to sign in.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab switchers */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setLoginError(null);
            }}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
              tab === "login"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn className="size-4" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setRegError(null);
            }}
            className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
              tab === "register"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus className="size-4" /> Register First
          </button>
        </div>

        {/* Tab 1: Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
              >
                <div className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="font-semibold">{loginError}</p>
                    <p className="mt-1">
                      Didn't register yet?{" "}
                      <button
                        type="button"
                        onClick={() => switchToRegisterWithEmail(loginEmail)}
                        className="font-bold underline"
                      >
                        Click here to Register now
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="mb-1 block font-mono text-xs text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. yourname@domain.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="field"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full py-2.5 disabled:opacity-60">
              <LogIn className="size-4" /> Sign In to Dashboard
            </button>

            <p className="text-center text-xs text-muted-foreground">Your account role is assigned automatically. Only the configured administrator and worker accounts receive elevated access.</p>
          </form>
        )}

        {/* Tab 2: Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            {regError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
              >
                {regError}
              </motion.div>
            )}
            {regSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-success/40 bg-success/10 p-3 text-xs text-success"
              >
                {regSuccess}
              </motion.div>
            )}

            <p className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">New accounts are citizens by default. Administrator and worker access is assigned by the backend to the configured email addresses.</p>

            {regEmail.trim().toLowerCase() === "bhairav@gmail.com" && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <label className="mb-1 block font-mono text-xs text-muted-foreground">
                  Assigned Department
                </label>
                <select
                  value={regDept}
                  onChange={(e) => setRegDept(e.target.value)}
                  className="field"
                >
                  <option value="Maintenance">Maintenance (Electrical & Facilities)</option>
                  <option value="Water Works">Water Works (Plumbing & Sanitation)</option>
                  <option value="Sanitation">Sanitation (Waste & Cleaning)</option>
                  <option value="Public Works">Public Works (Roads & Infrastructure)</option>
                  <option value="Security">Security & Patrol</option>
                  <option value="IT Services">IT & Network Services</option>
                  <option value="Community Affairs">Community Affairs</option>
                </select>
              </motion.div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-xs text-muted-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-muted-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@resolvr.org"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="field"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-xs text-muted-foreground">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-muted-foreground">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create password (at least 8 characters)"
                  minLength={8}
                  required
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="field"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full py-2.5 disabled:opacity-60">
              <UserPlus className="size-4" /> Register & Access Dashboard
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

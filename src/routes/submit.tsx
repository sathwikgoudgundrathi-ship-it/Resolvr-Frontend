import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, LocateFixed, Sparkles, X, AlertCircle, LogIn, UserPlus } from "lucide-react";
import { addComplaint, analyze, SLA, type Category, type Priority } from "@/lib/complaints";
import { useAuth } from "@/lib/auth";
import { Pill } from "@/components/app-ui";
import { AuthDialog } from "@/components/auth-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Report an issue — Resolvr" },
      { name: "description", content: "Describe a problem in plain words. AI categorizes, prioritizes and routes it instantly." },
      { property: "og:title", content: "Report an issue — Resolvr" },
      { property: "og:description", content: "Submit a complaint with photo and location in seconds." },
    ],
  }),
  component: Submit,
});

const CATS: Category[] = ["Electrical", "Plumbing", "Sanitation", "Roads", "Security", "IT & Network", "Noise", "General"];
const PRIS: Priority[] = ["Critical", "High", "Medium", "Low"];
const DEPT: Record<Category, string> = { 
  Electrical: "Maintenance", 
  Plumbing: "Water Works", 
  Sanitation: "Sanitation", 
  Roads: "Public Works", 
  Security: "Security", 
  "IT & Network": "IT Services", 
  Noise: "Community Affairs", 
  General: "Help Desk" 
};

function Submit() {
  const nav = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [img, setImg] = useState<string>();
  const [over, setOver] = useState<{ category?: Category; priority?: Priority }>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("register");

  useEffect(() => {
    if (user?.name && !name) {
      setName(user.name);
    }
  }, [user]);

  const ai = useMemo(() => analyze(desc), [desc]);
  const category = over.category ?? ai.category;
  const priority = over.priority ?? ai.priority;
  const location = loc || ai.location;
  const ready = desc.trim().length >= 10;

  const onFile = (f?: File) => { 
    if (!f) return; 
    const r = new FileReader(); 
    r.onload = () => setImg(r.result as string); 
    r.readAsDataURL(f); 
  };

  const geo = () => navigator.geolocation?.getCurrentPosition((p) => setLoc(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`));
  
  const submit = async () => {
    const reporterName = user?.name || name || "Anonymous Citizen";
    try {
      const c = await addComplaint({ 
      description: desc, 
      location: location || "Campus / Ward Central", 
      reporter: reporterName, 
      image: img, 
      category, 
      priority, 
      department: DEPT[category], 
      confidence: ai.confidence 
      });
      nav({ to: "/track", search: { id: c.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit complaint.");
    }
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1.2fr_1fr]">
      <section>
        <h1 className="text-4xl font-bold md:text-5xl">What's wrong?</h1>
        <p className="mt-2 text-muted-foreground">Describe your complaint in plain words. AI triages and routes it instantly.</p>

        {/* Notice if not registered */}
        {!isAuthenticated && (
          <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <span className="font-bold text-accent">Not registered yet?</span>
                <p className="mt-0.5 text-muted-foreground">
                  You can submit as a guest, but we recommend registering first to track real-time resolution and review worker proof.
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("register");
                      setShowAuthModal(true);
                    }}
                    className="font-bold text-primary underline"
                  >
                    Register first
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("login");
                      setShowAuthModal(true);
                    }}
                    className="font-bold text-foreground underline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="panel mt-6 space-y-5 p-6">
          <textarea 
            className="field min-h-36 resize-none text-base" 
            placeholder="e.g. Water pipe leaking near Hostel 4 since morning…" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <input 
                className="field pr-10" 
                placeholder={ai.location ? `Detected: ${ai.location}` : "Location"} 
                value={loc} 
                onChange={(e) => setLoc(e.target.value)} 
              />
              <button onClick={geo} title="Use my location" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <LocateFixed className="size-4" />
              </button>
            </div>
            <input 
              className="field" 
              placeholder="Your name" 
              value={user?.name || name} 
              onChange={(e) => setName(e.target.value)} 
              disabled={!!user}
            />
          </div>
          {img ? (
            <div className="relative w-fit">
              <img src={img} alt="Attachment" className="h-40 rounded-lg border border-border object-cover" />
              <button onClick={() => setImg(undefined)} className="absolute -right-2 -top-2 rounded-full bg-secondary p-1">
                <X className="size-3" />
              </button>
            </div>
          ) : (
            <label 
              onDragOver={(e) => e.preventDefault()} 
              onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input py-8 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              <Camera className="size-4" /> Drop a photo or click to attach
              <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
            </label>
          )}
          <button disabled={!ready} onClick={submit} className="btn btn-primary w-full disabled:opacity-40">
            Submit complaint
          </button>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="panel glow p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <Sparkles className="size-3.5" /> AI triage · live
          </div>
          <AnimatePresence mode="wait">
            {!ready ? (
              <motion.p key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-sm text-muted-foreground">
                Start typing — AI classification and routing appears instantly.
              </motion.p>
            ) : (
              <motion.div key="r" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 text-xs text-muted-foreground">Category</div>
                  <div className="flex flex-wrap gap-1.5">
                    {CATS.map((c) => (
                      <button 
                        key={c} 
                        onClick={() => setOver((o) => ({ ...o, category: c }))}
                        className={`rounded-full border px-2.5 py-1 text-xs transition ${
                          c === category ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-xs text-muted-foreground">Priority</div>
                  <div className="flex gap-1.5">
                    {PRIS.map((p) => (
                      <button 
                        key={p} 
                        onClick={() => setOver((o) => ({ ...o, priority: p }))} 
                        className={p === priority ? "" : "opacity-40 hover:opacity-80"}
                      >
                        <Pill kind="p" value={p} />
                      </button>
                    ))}
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-3 font-mono text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Department</dt>
                    <dd className="mt-1 font-semibold">{DEPT[category]}</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Location</dt>
                    <dd className="mt-1 font-semibold">{location || "—"}</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">SLA target</dt>
                    <dd className="mt-1 font-semibold">{SLA[priority]}h</dd>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <dt className="text-[10px] uppercase text-muted-foreground">Confidence</dt>
                    <dd className="mt-1 font-semibold text-primary">{Math.round(ai.confidence * 100)}%</dd>
                  </div>
                </dl>
                <p className="text-xs text-muted-foreground">Adjust category or priority if needed before submission.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authTab}
      />
    </main>
  );
}

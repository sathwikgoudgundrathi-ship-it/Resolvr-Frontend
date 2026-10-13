import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { useComplaints, slaState } from "@/lib/complaints";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Resolvr" },
      { name: "description", content: "SLA compliance, category mix, department load and complaint hotspots." },
      { property: "og:title", content: "Analytics — Resolvr" },
      { property: "og:description", content: "Insights into complaint volume and resolution performance." },
    ],
  }),
  component: Analytics,
});

const C = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)", "var(--warning)", "var(--info)"];
const tip = { contentStyle: { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }, cursor: { fill: "var(--muted)" } };

function count<T>(arr: T[], key: (x: T) => string) {
  const m: Record<string, number> = {};
  arr.forEach((x) => (m[key(x)] = (m[key(x)] ?? 0) + 1));
  return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

function Analytics() {
  const { user } = useAuth();
  const list = useComplaints();
  const d = useMemo(() => {
    const ok = list.length ? Math.round((list.filter((c) => !slaState(c).breached).length / list.length) * 100) : 100;
    const deptPerf = count(list, (c) => c.department).map((x) => ({
      ...x, breached: list.filter((c) => c.department === x.name && slaState(c).breached).length,
    }));
    return { ok, cat: count(list, (c) => c.category), pri: count(list, (c) => c.priority), dept: deptPerf, loc: count(list, (c) => c.location).slice(0, 6),
      ai: Math.round((list.reduce((s, c) => s + c.confidence, 0) / Math.max(1, list.length)) * 100) };
  }, [list]);

  return (
    user?.role !== "admin" ? <main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="text-2xl font-bold">Administrator sign in required</h1><p className="mt-2 text-muted-foreground">Analytics are available to the administrator account.</p></main> :
    <main className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-4xl font-bold">Analytics</h1>
      <p className="mt-1 text-muted-foreground">{list.length} complaints tracked</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-6">
          <h3 className="text-sm text-muted-foreground">SLA compliance</h3>
          <div className="relative h-48">
            <ResponsiveContainer><RadialBarChart innerRadius="75%" outerRadius="100%" data={[{ v: d.ok }]} startAngle={220} endAngle={-40}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} /><RadialBar dataKey="v" cornerRadius={20} fill="var(--chart-1)" background={{ fill: "var(--muted)" }} />
            </RadialBarChart></ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center font-mono text-4xl font-bold">{d.ok}%</div>
          </div>
        </div>
        <div className="panel p-6">
          <h3 className="text-sm text-muted-foreground">Category mix</h3>
          <div className="h-48"><ResponsiveContainer><PieChart>
            <Pie data={d.cat} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3} stroke="none">{d.cat.map((_, i) => <Cell key={i} fill={C[i % C.length]!} />)}</Pie>
            <Tooltip {...tip} /></PieChart></ResponsiveContainer></div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">{d.cat.map((x, i) => <span key={x.name} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: C[i % C.length] }} />{x.name}</span>)}</div>
        </div>
        <div className="panel p-6">
          <h3 className="text-sm text-muted-foreground">AI routing confidence</h3>
          <div className="mt-6 font-mono text-6xl font-bold text-gradient">{d.ai}%</div>
          <div className="mt-6 space-y-2">{d.pri.map((p) => (
            <div key={p.name} className="flex items-center gap-3 text-xs"><span className="w-16 text-muted-foreground">{p.name}</span>
              <div className="h-2 flex-1 rounded-full bg-muted"><div className="h-full rounded-full bg-accent" style={{ width: `${(p.value / list.length) * 100}%` }} /></div><span className="font-mono">{p.value}</span></div>))}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel p-6">
          <h3 className="text-sm text-muted-foreground">Department load vs SLA breaches</h3>
          <div className="mt-4 h-72"><ResponsiveContainer><BarChart data={d.dept}>
            <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip {...tip} />
            <Bar dataKey="value" name="Total" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="breached" name="Breached" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </div>
        <div className="panel p-6">
          <h3 className="text-sm text-muted-foreground">Hotspots</h3>
          <ul className="mt-4 space-y-3">{d.loc.map((l, i) => (
            <li key={l.name} className="flex items-center gap-3"><span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <span className="flex-1 text-sm">{l.name}</span>
              <span className="flex gap-0.5">{Array.from({ length: l.value }).map((_, k) => <span key={k} className="h-4 w-1.5 rounded-sm bg-primary" />)}</span></li>))}</ul>
        </div>
      </div>
    </main>
  );
}

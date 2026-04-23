import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, ChevronDown, ChevronRight, Users, Eye, MousePointerClick, Globe2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PageView {
  id: string;
  session_id: string;
  user_id: string | null;
  user_email: string | null;
  page_path: string;
  country: string | null;
  country_code: string | null;
  city: string | null;
  device: string | null;
  visited_at: string;
}

interface SessionRow {
  session_id: string;
  email: string | null;
  country: string | null;
  country_code: string | null;
  city: string | null;
  device: string | null;
  pages: PageView[];
  firstVisit: string;
  lastVisit: string;
}

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7 jours", days: 7 },
  { label: "30 jours", days: 30 },
  { label: "90 jours", days: 90 },
];

function flagEmoji(code: string | null): string {
  if (!code || code.length !== 2) return "🏳️";
  const A = 0x1f1e6;
  const a = "A".charCodeAt(0);
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - a,
    A + code.toUpperCase().charCodeAt(1) - a,
  );
}

const AdminAnalytics = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [views, setViews] = useState<PageView[]>([]);
  const [fetching, setFetching] = useState(true);
  const [days, setDays] = useState(7);
  const [search, setSearch] = useState("");
  const [openSession, setOpenSession] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/");
  }, [loading, isAdmin, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setFetching(true);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .gte("visited_at", since)
        .order("visited_at", { ascending: true })
        .limit(10000);
      if (!error && data) setViews(data as PageView[]);
      setFetching(false);
    })();
  }, [isAdmin, days]);

  // Aggregations
  const stats = useMemo(() => {
    const sessions = new Set(views.map((v) => v.session_id));
    return {
      visitors: sessions.size,
      pageviews: views.length,
      perVisit: sessions.size ? (views.length / sessions.size).toFixed(2) : "0",
      countries: new Set(views.map((v) => v.country).filter(Boolean)).size,
    };
  }, [views]);

  const timeSeries = useMemo(() => {
    const map = new Map<string, { date: string; visitors: Set<string>; pageviews: number }>();
    for (const v of views) {
      const d = new Date(v.visited_at).toISOString().slice(0, 10);
      if (!map.has(d)) map.set(d, { date: d, visitors: new Set(), pageviews: 0 });
      const e = map.get(d)!;
      e.visitors.add(v.session_id);
      e.pageviews += 1;
    }
    return Array.from(map.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((e) => ({ date: e.date.slice(5), visitors: e.visitors.size, pageviews: e.pageviews }));
  }, [views]);

  const topList = (key: keyof PageView) => {
    const m = new Map<string, number>();
    for (const v of views) {
      const k = (v[key] as string) || "Unknown";
      m.set(k, (m.get(k) || 0) + 1);
    }
    return Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  };

  const countries = useMemo(() => {
    const m = new Map<string, { count: number; code: string | null }>();
    for (const v of views) {
      const k = v.country || "Unknown";
      const cur = m.get(k) || { count: 0, code: v.country_code };
      cur.count += 1;
      m.set(k, cur);
    }
    return Array.from(m.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 8);
  }, [views]);

  const devices = useMemo(() => topList("device"), [views]);
  const pages = useMemo(() => topList("page_path"), [views]);

  // Sessions grouping
  const sessions = useMemo<SessionRow[]>(() => {
    const grouped = new Map<string, PageView[]>();
    for (const v of views) {
      if (!grouped.has(v.session_id)) grouped.set(v.session_id, []);
      grouped.get(v.session_id)!.push(v);
    }
    const rows: SessionRow[] = [];
    for (const [sid, arr] of grouped) {
      arr.sort((a, b) => a.visited_at.localeCompare(b.visited_at));
      const last = arr[arr.length - 1];
      rows.push({
        session_id: sid,
        email: arr.find((p) => p.user_email)?.user_email ?? null,
        country: last.country,
        country_code: last.country_code,
        city: last.city,
        device: last.device,
        pages: arr,
        firstVisit: arr[0].visited_at,
        lastVisit: last.visited_at,
      });
    }
    return rows.sort((a, b) => b.lastVisit.localeCompare(a.lastVisit));
  }, [views]);

  const filteredSessions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(
      (s) =>
        (s.country || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        s.pages.some((p) => p.page_path.toLowerCase().includes(q)),
    );
  }, [sessions, search]);

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground text-sm">Suivi des visiteurs Nzo Mikanda</p>
          </div>
          <div className="flex gap-2">
            {RANGES.map((r) => (
              <Button
                key={r.days}
                size="sm"
                variant={days === r.days ? "default" : "outline"}
                onClick={() => setDays(r.days)}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Users className="h-4 w-4" />} label="Visiteurs" value={stats.visitors} />
          <StatCard icon={<Eye className="h-4 w-4" />} label="Pages vues" value={stats.pageviews} />
          <StatCard
            icon={<MousePointerClick className="h-4 w-4" />}
            label="Pages / visite"
            value={stats.perVisit}
          />
          <StatCard icon={<Globe2 className="h-4 w-4" />} label="Pays" value={stats.countries} />
        </div>

        {/* Microsoft Clarity quick access */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="py-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium text-sm">🎬 Voir ce que voient les visiteurs</p>
              <p className="text-xs text-muted-foreground">
                Replays de session, heatmaps de clics et de scroll via Microsoft Clarity
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a
                href="https://clarity.microsoft.com/projects/view/wgdu8yeaw5/recordings"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="default">▶ Replays</Button>
              </a>
              <a
                href="https://clarity.microsoft.com/projects/view/wgdu8yeaw5/heatmaps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline">🔥 Heatmaps</Button>
              </a>
              <a
                href="https://clarity.microsoft.com/projects/view/wgdu8yeaw5/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline">📊 Dashboard</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Trafic par jour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="Visiteurs"
                  />
                  <Line
                    type="monotone"
                    dataKey="pageviews"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                    name="Pages vues"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ListCard title="Pays">
            {countries.map(([name, { count, code }]) => (
              <ListRow key={name} label={`${flagEmoji(code)} ${name}`} value={count} />
            ))}
          </ListCard>
          <ListCard title="Appareil">
            {devices.map(([name, count]) => (
              <ListRow key={name} label={name} value={count} />
            ))}
          </ListCard>
          <ListCard title="Pages">
            {pages.map(([name, count]) => (
              <ListRow key={name} label={name} value={count} />
            ))}
          </ListCard>
        </div>

        {/* Visitor detail table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Détail par visiteur</CardTitle>
            <div className="relative w-72 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtrer par pays, page, email…"
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            {fetching ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Chargement…</p>
            ) : filteredSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Aucune session.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Visiteur</TableHead>
                    <TableHead>Pays</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Appareil</TableHead>
                    <TableHead>Parcours</TableHead>
                    <TableHead>Première</TableHead>
                    <TableHead>Dernière</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.slice(0, 200).map((s) => {
                    const isOpen = openSession === s.session_id;
                    return (
                      <>
                        <TableRow
                          key={s.session_id}
                          className="cursor-pointer"
                          onClick={() => setOpenSession(isOpen ? null : s.session_id)}
                        >
                          <TableCell>
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {s.email || (
                              <span className="text-muted-foreground italic">Anonyme</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {flagEmoji(s.country_code)} {s.country || "—"}
                          </TableCell>
                          <TableCell>{s.city || "—"}</TableCell>
                          <TableCell>{s.device || "—"}</TableCell>
                          <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                            {s.pages.map((p) => p.page_path).join(" → ")}
                          </TableCell>
                          <TableCell className="text-xs">
                            {new Date(s.firstVisit).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs">
                            {new Date(s.lastVisit).toLocaleString()}
                          </TableCell>
                        </TableRow>
                        {isOpen && (
                          <TableRow key={s.session_id + "-detail"} className="bg-muted/30">
                            <TableCell></TableCell>
                            <TableCell colSpan={7}>
                              <div className="py-2 space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground mb-2">
                                  Parcours détaillé ({s.pages.length} pages)
                                </p>
                                {s.pages.map((p, i) => (
                                  <div
                                    key={p.id}
                                    className="flex items-center gap-3 text-sm py-1 border-b border-border/40 last:border-0"
                                  >
                                    <span className="text-xs text-muted-foreground w-6">
                                      #{i + 1}
                                    </span>
                                    <span className="font-mono text-xs flex-1 text-primary">
                                      {p.page_path}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(p.visited_at).toLocaleTimeString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between text-muted-foreground text-xs mb-2">
        <span>{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const ListCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">{children}</CardContent>
  </Card>
);

const ListRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="truncate mr-2">{label}</span>
    <span className="text-muted-foreground font-mono text-xs">{value}</span>
  </div>
);

export default AdminAnalytics;

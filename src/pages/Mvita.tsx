import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swords, Clock, Zap, Bot, Trophy, Users, Lock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MvitaAIBattle from "@/components/mvita/MvitaAIBattle";
import { AI_DIFFICULTY, type AIDifficulty } from "@/lib/mvita-questions";

type BattleProfile = {
  battle_name: string | null;
  elo: number;
  league: string;
  wins: number;
  losses: number;
  draws: number;
  games_played: number;
};

const LEAGUE_TIERS = [
  { name: "Nlongoki", min: 0, max: 1099, color: "bg-muted text-muted-foreground" },
  { name: "Nlongi", min: 1100, max: 1299, color: "bg-secondary text-secondary-foreground" },
  { name: "Kinuani", min: 1300, max: 1499, color: "bg-accent text-accent-foreground" },
  { name: "Mbuta", min: 1500, max: 1799, color: "bg-primary text-primary-foreground" },
  { name: "Nganga", min: 1800, max: 9999, color: "bg-gradient-to-r from-primary to-accent text-primary-foreground" },
];

const getLeagueTier = (elo: number) =>
  LEAGUE_TIERS.find((t) => elo >= t.min && elo <= t.max) ?? LEAGUE_TIERS[0];

const getNextTier = (elo: number) => LEAGUE_TIERS.find((t) => t.min > elo) ?? null;

const Mvita = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<BattleProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [aiSelect, setAiSelect] = useState(false);
  const [activeBattle, setActiveBattle] = useState<AIDifficulty | null>(null);

  useEffect(() => {
    document.title = "Mvita za Ndinga — Batailles de mots Lari | Nzo Mikanda";
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setLoadingProfile(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("battle_profiles")
        .select("battle_name, elo, league, wins, losses, draws, games_played")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error(error);
      } else if (!data) {
        // safety net : create profile if trigger missed (existing users)
        const { data: created } = await supabase
          .from("battle_profiles")
          .insert({ user_id: user.id, battle_name: user.email?.split("@")[0] ?? "Nlongoki" })
          .select("battle_name, elo, league, wins, losses, draws, games_played")
          .single();
        setProfile(created ?? null);
      } else {
        setProfile(data);
      }
      setLoadingProfile(false);
    })();
  }, [user, loading]);

  const tier = profile ? getLeagueTier(profile.elo) : LEAGUE_TIERS[0];
  const nextTier = profile ? getNextTier(profile.elo) : LEAGUE_TIERS[1];
  const progressInTier = profile && nextTier
    ? Math.min(100, ((profile.elo - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;

  const handleMode = (mode: "async" | "live" | "ai") => {
    if (mode === "ai") {
      setAiSelect(true);
      return;
    }
    if (!user) {
      toast.error("Crée un compte pour affronter d'autres joueurs.");
      navigate("/auth");
      return;
    }
    toast.info(`Mode ${mode === "async" ? "asynchrone" : "live"} bientôt disponible.`);
  };

  const startAIBattle = (difficulty: AIDifficulty) => {
    setAiSelect(false);
    setActiveBattle(difficulty);
  };

  const closeBattle = (newElo?: number) => {
    setActiveBattle(null);
    if (newElo && profile) setProfile({ ...profile, elo: newElo });
  };

  // Active battle view
  if (activeBattle) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
          <Button variant="ghost" size="sm" onClick={() => closeBattle()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Abandonner
          </Button>
          <MvitaAIBattle
            difficulty={activeBattle}
            playerElo={profile?.elo ?? 1000}
            userId={user?.id ?? null}
            battleName={profile?.battle_name ?? "Nlongoki"}
            onClose={closeBattle}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-4 md:pt-6 pb-10 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <Swords className="w-4 h-4" />
            Mvita za Ndinga
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Batailles de mots</h1>
          <p
            className="font-mandombe text-3xl md:text-4xl leading-[1.7] mb-3"
            lang="kg"
            aria-label="Mvita za Ndinga en Mandombe"
          >
            Mvita za Ndinga
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Affronte d'autres apprenants sur le vocabulaire Kikongo Lari et l'écriture Mandombe.
          </p>
        </div>

        {/* Profile / Elo card */}
        <Card className="p-6 mb-10 border-2">
          {loadingProfile ? (
            <div className="h-32 animate-pulse bg-muted rounded" />
          ) : !user ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Mode invité</h2>
                  <p className="text-sm text-muted-foreground">
                    Connecte-toi pour avoir un Elo, monter en ligue et défier d'autres joueurs.
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate("/auth")}>Créer un compte</Button>
            </div>
          ) : profile ? (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Ton profil de combat</p>
                  <h2 className="text-2xl font-bold">{profile.battle_name ?? "Nlongoki"}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${tier.color} text-base px-3 py-1`}>
                    <Trophy className="w-4 h-4 mr-1.5" />
                    {tier.name}
                  </Badge>
                  <div className="text-right">
                    <p className="text-3xl font-bold tabular-nums">{profile.elo}</p>
                    <p className="text-xs text-muted-foreground">Elo</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{tier.name}</span>
                  {nextTier ? (
                    <span>
                      {nextTier.min - profile.elo} pts → {nextTier.name}
                    </span>
                  ) : (
                    <span>Ligue maximale atteinte</span>
                  )}
                </div>
                <Progress value={progressInTier} className="h-2" />
              </div>

              <div className="grid grid-cols-4 gap-3 pt-2">
                <Stat label="Parties" value={profile.games_played} />
                <Stat label="Victoires" value={profile.wins} accent="text-primary" />
                <Stat label="Défaites" value={profile.losses} />
                <Stat label="Nuls" value={profile.draws} />
              </div>
            </div>
          ) : null}
        </Card>

        {/* AI difficulty selector */}
        {aiSelect && (
          <Card className="p-6 mb-10 border-2 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Choisis ton adversaire IA</h3>
              <Button variant="ghost" size="sm" onClick={() => setAiSelect(false)}>
                Annuler
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {(Object.keys(AI_DIFFICULTY) as AIDifficulty[]).map((key) => {
                const cfg = AI_DIFFICULTY[key];
                return (
                  <button
                    key={key}
                    onClick={() => startAIBattle(key)}
                    className="p-5 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-5 h-5 text-primary" />
                      <span className="font-bold">{cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Précision ~{Math.round(cfg.accuracy * 100)}% · Elo {cfg.elo}
                    </p>
                  </button>
                );
              })}
            </div>
          </Card>
        )}

        {/* Mode selection */}
        <h2 className="text-2xl font-bold mb-6">Choisis ton mode</h2>
        <div className="grid md:grid-cols-3 gap-5">
          <ModeCard
            icon={Clock}
            title="Asynchrone"
            subtitle="24h pour répondre"
            description="Défie un joueur et répondez chacun à votre rythme. Idéal au quotidien."
            badge="Multijoueur"
            onClick={() => handleMode("async")}
            requiresAuth={!user}
          />
          <ModeCard
            icon={Zap}
            title="Live"
            subtitle="10 questions chronométrées"
            description="Matchmaking en temps réel. 15 secondes par question, le plus rapide marque plus de points."
            badge="Temps réel"
            highlight
            onClick={() => handleMode("live")}
            requiresAuth={!user}
          />
          <ModeCard
            icon={Bot}
            title="vs IA"
            subtitle="3 niveaux de difficulté"
            description="Joue sans compte contre Nlongoki, Kinuani ou Nganga. Parfait pour s'entraîner."
            badge="Solo"
            onClick={() => handleMode("ai")}
          />
        </div>

        {/* League ladder */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Échelle des ligues
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {LEAGUE_TIERS.map((t) => {
              const active = profile && profile.elo >= t.min && profile.elo <= t.max;
              return (
                <Card
                  key={t.name}
                  className={`p-4 text-center transition-all ${
                    active ? "border-primary border-2 shadow-md" : "opacity-70"
                  }`}
                >
                  <Badge className={`${t.color} mb-2`}>{t.name}</Badge>
                  <p
                    className="font-mandombe text-2xl leading-[1.8] mt-1 mb-1"
                    lang="kg"
                    aria-label={`${t.name} en Mandombe`}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {t.min}{t.max < 9999 ? `–${t.max}` : "+"} Elo
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Stat = ({ label, value, accent }: { label: string; value: number; accent?: string }) => (
  <div className="text-center p-3 rounded-lg bg-muted/40">
    <p className={`text-2xl font-bold tabular-nums ${accent ?? ""}`}>{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const ModeCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badge,
  highlight,
  onClick,
  requiresAuth,
}: {
  icon: typeof Clock;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  highlight?: boolean;
  onClick: () => void;
  requiresAuth?: boolean;
}) => (
  <Card
    className={`p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
      highlight ? "border-primary border-2 bg-primary/5" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <Badge variant="outline" className="text-xs">
        {badge}
      </Badge>
    </div>
    <h3 className="text-lg font-bold mb-1">{title}</h3>
    <p className="text-sm text-primary font-medium mb-2">{subtitle}</p>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <Button variant={highlight ? "default" : "outline"} className="w-full">
      {requiresAuth ? "Connexion requise" : "Lancer"}
    </Button>
  </Card>
);

export default Mvita;

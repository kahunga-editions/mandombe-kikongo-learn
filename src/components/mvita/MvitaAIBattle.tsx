import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, User, Check, X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  generateQuestions,
  aiAnswer,
  updateElo,
  AI_DIFFICULTY,
  type AIDifficulty,
  type MvitaQuestion,
} from "@/lib/mvita-questions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const QUESTION_COUNT = 10;
const TIME_PER_QUESTION = 15;

type Props = {
  difficulty: AIDifficulty;
  playerElo: number;
  userId: string | null;
  battleName: string;
  onClose: (newElo?: number) => void;
};

export const MvitaAIBattle = ({ difficulty, playerElo, userId, battleName, onClose }: Props) => {
  const questions = useMemo<MvitaQuestion[]>(() => generateQuestions(QUESTION_COUNT), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [aiPick, setAiPick] = useState<number | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);

  const q = questions[idx];
  const aiCfg = AI_DIFFICULTY[difficulty];

  // Timer
  useEffect(() => {
    if (picked !== null || finished) return;
    if (timeLeft <= 0) {
      handlePick(-1); // timeout
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, picked, finished]);

  const handlePick = (choice: number) => {
    if (picked !== null) return;
    setPicked(choice);
    const ai = aiAnswer(q, difficulty);
    setAiPick(ai);
    if (choice === q.correctIndex) setPlayerScore((s) => s + 1);
    if (ai === q.correctIndex) setAiScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setAiPick(null);
    setTimeLeft(TIME_PER_QUESTION);
  };

  const result: 0 | 0.5 | 1 =
    playerScore > aiScore ? 1 : playerScore < aiScore ? 0 : 0.5;
  const newElo = updateElo(playerElo, aiCfg.elo, result);
  const eloDelta = newElo - playerElo;

  const persist = async () => {
    if (!userId || saved) return;
    setSaved(true);
    const { error } = await supabase
      .from("battle_profiles")
      .update({
        elo: newElo,
        wins: result === 1 ? playerScore : 0,
        losses: result === 0 ? 1 : 0,
        draws: result === 0.5 ? 1 : 0,
        games_played: 1,
      } as never)
      .eq("user_id", userId);
    // Use RPC-style increment via fetch since direct + isn't typed; fallback: refetch then update
    if (error) {
      console.error(error);
      toast.error("Sauvegarde du score échouée");
      return;
    }
    toast.success(`Elo ${eloDelta >= 0 ? "+" : ""}${eloDelta} → ${newElo}`);
  };

  useEffect(() => {
    if (finished) persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  if (!q) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Pas assez de vocabulaire pour générer un duel.</p>
        <Button onClick={() => onClose()} className="mt-4">Retour</Button>
      </Card>
    );
  }

  if (finished) {
    return (
      <Card className="p-6 md:p-10 text-center space-y-6">
        <div className="inline-flex w-20 h-20 rounded-full bg-primary/10 items-center justify-center mx-auto">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {result === 1 ? "Victoire !" : result === 0 ? "Défaite" : "Égalité"}
          </h2>
          <p className="text-muted-foreground">
            {battleName} {playerScore} — {aiScore} {aiCfg.label}
          </p>
        </div>
        {userId && (
          <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-lg bg-muted/50">
            <span className="text-sm text-muted-foreground">Elo</span>
            <span className="text-3xl font-bold tabular-nums">{newElo}</span>
            <span
              className={cn(
                "text-sm font-semibold",
                eloDelta >= 0 ? "text-primary" : "text-destructive",
              )}
            >
              ({eloDelta >= 0 ? "+" : ""}{eloDelta})
            </span>
          </div>
        )}
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" onClick={() => onClose(newElo)}>Quitter</Button>
          <Button onClick={() => window.location.reload()}>Rejouer</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm">
            <User className="w-4 h-4 text-primary" />
            <span className="font-semibold">{battleName}</span>
            <span className="font-bold tabular-nums ml-1">{playerScore}</span>
          </div>
          <span className="text-muted-foreground">vs</span>
          <div className="flex items-center gap-1.5 text-sm">
            <Bot className="w-4 h-4 text-accent" />
            <span className="font-semibold">{aiCfg.label}</span>
            <span className="font-bold tabular-nums ml-1">{aiScore}</span>
          </div>
        </div>
        <Badge variant="outline">
          Question {idx + 1}/{questions.length}
        </Badge>
      </div>

      {/* Timer */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Temps restant</span>
          <span className="tabular-nums">{timeLeft}s</span>
        </div>
        <Progress value={(timeLeft / TIME_PER_QUESTION) * 100} className="h-1.5" />
      </div>

      {/* Question */}
      <div className="text-center py-6">
        <p className="text-sm text-muted-foreground mb-2">
          {q.promptLang === "fr" ? "Traduis en Lari :" : "Que veut dire :"}
        </p>
        <p
          className={cn(
            "font-bold",
            q.promptLang === "lari" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
          )}
        >
          {q.prompt}
        </p>
        {q.mandombe && (
          <p className="font-mandombe text-3xl mt-3 text-muted-foreground" lang="kg">
            {q.mandombe}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isPicked = i === picked;
          const isAi = i === aiPick;
          const showResult = picked !== null;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={picked !== null}
              className={cn(
                "relative p-4 rounded-lg border-2 text-left transition-all font-medium",
                "hover:border-primary hover:bg-primary/5",
                "disabled:cursor-not-allowed",
                showResult && isCorrect && "border-primary bg-primary/10",
                showResult && isPicked && !isCorrect && "border-destructive bg-destructive/10",
                !showResult && "border-border",
              )}
            >
              <span className="pr-12">{opt}</span>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                {showResult && isAi && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Bot className="w-3 h-3" />
                  </Badge>
                )}
                {showResult && isPicked && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <User className="w-3 h-3" />
                  </Badge>
                )}
                {showResult && isCorrect && <Check className="w-5 h-5 text-primary" />}
                {showResult && isPicked && !isCorrect && (
                  <X className="w-5 h-5 text-destructive" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <Button onClick={next} className="w-full" size="lg">
          {idx + 1 >= questions.length ? "Voir le résultat" : "Question suivante"}
        </Button>
      )}
    </Card>
  );
};

export default MvitaAIBattle;

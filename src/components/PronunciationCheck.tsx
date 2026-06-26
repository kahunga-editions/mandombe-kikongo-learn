import { useCallback, useRef, useState } from "react";
import { Mic, Square, Loader2, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stt-lari`;

type Verdict = "excellent" | "good" | "retry";
type Result = { text: string; score: number; verdict: Verdict } | null;

interface Props {
  expected: string;        // The Lari phrase to evaluate against
  className?: string;
}

/**
 * Inline microphone widget: record the learner's voice, transcribe via stt-lari,
 * compare to `expected`, and show a colored verdict.
 *
 * Hardened: no ElevenLabs credit consumption (uses Lovable AI Gateway).
 */
const PronunciationCheck = ({ expected, className }: Props) => {
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = useCallback(async () => {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (blob.size < 1000) { setError("Trop court"); return; }
        setBusy(true);
        try {
          const fd = new FormData();
          fd.append("audio", blob, "rec.webm");
          fd.append("expected", expected);
          const resp = await fetch(STT_URL, {
            method: "POST",
            headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
            body: fd,
          });
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const data = await resp.json();
          setResult({ text: data.text || "", score: data.score ?? 0, verdict: data.verdict });
        } catch (e) {
          setError(e instanceof Error ? e.message : "Échec");
        } finally {
          setBusy(false);
        }
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setError("Micro refusé");
    }
  }, [expected]);

  const stop = useCallback(() => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    setRecording(false);
  }, []);

  const verdictBadge = result && (() => {
    const map: Record<Verdict, { Icon: typeof CheckCircle2; color: string; label: string }> = {
      excellent: { Icon: CheckCircle2, color: "text-emerald-500", label: "Excellent" },
      good:      { Icon: AlertCircle,  color: "text-amber-500",   label: "Presque" },
      retry:     { Icon: XCircle,      color: "text-rose-500",    label: "Réessaye" },
    };
    const { Icon, color, label } = map[result.verdict];
    return (
      <div className={cn("flex items-center gap-1.5 text-[11px]", color)}>
        <Icon className="w-3.5 h-3.5" />
        <span className="font-semibold">{label}</span>
        <span className="opacity-70">— {Math.round(result.score * 100)}%</span>
      </div>
    );
  })();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={recording ? stop : start}
          disabled={busy}
          title={recording ? "Arrêter" : "Évaluer ma prononciation"}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors",
            recording
              ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
              : "bg-gold/10 text-gold/80 hover:bg-gold/20",
            busy && "opacity-50 cursor-not-allowed"
          )}
        >
          {busy ? <Loader2 className="w-3 h-3 animate-spin" />
            : recording ? <Square className="w-3 h-3" />
            : <Mic className="w-3 h-3" />}
          {busy ? "..." : recording ? "Stop" : "Répéter"}
        </button>
        {verdictBadge}
      </div>
      {result?.text && (
        <div className="text-[10px] text-cream/50 italic">
          Entendu : « {result.text} »
        </div>
      )}
      {error && <div className="text-[10px] text-rose-400">{error}</div>}
    </div>
  );
};

export default PronunciationCheck;

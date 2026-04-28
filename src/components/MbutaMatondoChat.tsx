import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Send, Loader2, GraduationCap, Volume2, Mic, MicOff, VolumeX, Pencil } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };
type Choices = { options: string[]; correctIndex: number };
type Block = { lari: string; fr: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mbuta-matondo`;
const TTS_LARI_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts-lari`;
const STT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-stt`;

// ---------- Parsing helpers ----------

/** Pair successive <lari> blocks with their following <fr> sub-titles */
function parseBlocks(content: string): Block[] {
  const re = /<(lari|fr)>([\s\S]*?)<\/\1>/g;
  const blocks: Block[] = [];
  let current: Block | null = null;
  let m;
  while ((m = re.exec(content)) !== null) {
    const tag = m[1] as "lari" | "fr";
    const text = m[2].trim();
    if (!text) continue;
    if (tag === "lari") {
      if (current) blocks.push(current);
      current = { lari: text, fr: "" };
    } else if (tag === "fr" && current) {
      current.fr = current.fr ? `${current.fr} ${text}` : text;
    }
  }
  if (current) blocks.push(current);
  return blocks;
}

function stripForTTS(text: string): string {
  return text
    .replace(/<choices[^>]*>[\s\S]*?<\/choices>/g, "")
    .replace(/\[mandombe\](.*?)\[\/mandombe\]/g, "$1")
    .replace(/[`*_#>]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function parseChoices(content: string): Choices | null {
  const m = content.match(/<choices\s+correct=["'](\d+)["']\s*>([\s\S]*?)<\/choices>/);
  if (!m) return null;
  const correctIndex = parseInt(m[1], 10);
  const options = m[2].split("|").map((s) => s.trim()).filter(Boolean);
  if (options.length < 1 || isNaN(correctIndex) || correctIndex < 0 || correctIndex >= options.length) return null;
  return { options, correctIndex };
}

// ---------- Stream chat ----------

async function streamChat({
  messages, onDelta, onDone, onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (status: number, msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({ error: "Unknown error" }));
    onError(resp.status, data.error || "Error");
    return;
  }
  if (!resp.body) { onError(500, "No response body"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;
  while (!done) {
    const { done: rd, value } = await reader.read();
    if (rd) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const j = line.slice(6).trim();
      if (j === "[DONE]") { done = true; break; }
      try {
        const p = JSON.parse(j);
        const c = p.choices?.[0]?.delta?.content as string | undefined;
        if (c) onDelta(c);
      } catch { buf = line + "\n" + buf; break; }
    }
  }
  onDone();
}

// ---------- TTS ----------

const audioCache = new Map<string, HTMLAudioElement>();

async function fetchTTSAudio(text: string): Promise<HTMLAudioElement | null> {
  const plain = stripForTTS(text);
  if (!plain) return null;
  const key = plain.slice(0, 200);
  const cached = audioCache.get(key);
  if (cached) return cached;

  const resp = await fetch(TTS_LARI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ text: plain }),
  });
  if (!resp.ok) throw new Error("TTS failed");
  const data = await resp.json();
  const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
  audioCache.set(key, audio);
  return audio;
}

async function transcribeAudio(blob: Blob): Promise<string> {
  const fd = new FormData();
  fd.append("audio", blob, "rec.webm");
  const resp = await fetch(STT_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    body: fd,
  });
  if (!resp.ok) throw new Error("STT failed");
  const data = await resp.json();
  return data.text || "";
}

// ---------- Mandombe typewriter bubble ----------

interface BubbleProps {
  block: Block;
  isPlaying: boolean;
  audioDurationMs: number | null;
  onAdminCorrect?: (b: Block) => void;
  isAdmin: boolean;
}

function MandombeBubble({ block, isPlaying, audioDurationMs, onAdminCorrect, isAdmin }: BubbleProps) {
  const [typed, setTyped] = useState(0);
  const [showLari, setShowLari] = useState(false);
  const [showFr, setShowFr] = useState(false);
  const total = block.lari.length;

  useEffect(() => {
    setTyped(0);
    setShowLari(false);
    setShowFr(false);
    if (total === 0) return;
    // Duration: synced to audio if known, else 35ms/char
    const duration = audioDurationMs ?? Math.max(1500, total * 45);
    const stepMs = duration / total;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(i);
      if (i >= total) {
        window.clearInterval(id);
        // Reveal Lari sub then FR after fades
        window.setTimeout(() => setShowLari(true), 100);
        window.setTimeout(() => setShowFr(true), 600);
      }
    }, stepMs);
    return () => window.clearInterval(id);
  }, [block.lari, audioDurationMs, total]);

  return (
    <div className="bg-gold/10 border border-gold/30 rounded-xl px-3 py-3 space-y-2">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">Mbuta Matondo</span>
          {isPlaying && <span className="text-[10px] text-gold/60 animate-pulse">●</span>}
        </div>
        {isAdmin && onAdminCorrect && (
          <button
            onClick={() => onAdminCorrect(block)}
            title="Corriger ce Kikongo Lari"
            className="text-cream/40 hover:text-gold transition-colors"
          >
            <Pencil className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Layer 1 — Mandombe typewriter */}
      <div
        className="font-mandombe text-3xl text-gold leading-loose"
        style={{ minHeight: "1.5em" }}
      >
        {block.lari.slice(0, typed)}
      </div>

      {/* Layer 2 — Kikongo Lari (latin) */}
      <div
        className="text-sm text-cream/90 transition-opacity duration-500"
        style={{ opacity: showLari ? 1 : 0 }}
      >
        {block.lari}
      </div>

      {/* Layer 3 — French sub-title */}
      {block.fr && (
        <div
          className="text-xs italic text-cream/50 transition-opacity duration-500"
          style={{ opacity: showFr ? 1 : 0 }}
        >
          {block.fr}
        </div>
      )}
    </div>
  );
}

// ---------- Component ----------

const MbutaMatondoChat = () => {
  const { t } = useLanguage();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [mcqMode, setMcqMode] = useState(true);
  const [answeredIdx, setAnsweredIdx] = useState<Map<number, "correct" | "wrong">>(new Map());
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [audioDurations, setAudioDurations] = useState<Map<number, number>>(new Map());
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Admin correction dialog
  const [editing, setEditing] = useState<{ block: Block } | null>(null);
  const [editLari, setEditLari] = useState("");
  const [editFr, setEditFr] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [savingCorrection, setSavingCorrection] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const isPlayingRef = useRef(false);
  const autoSpeakRef = useRef(autoSpeak);

  useEffect(() => { autoSpeakRef.current = autoSpeak; }, [autoSpeak]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---- TTS sequential playback for one assistant message ----
  const handleSpeak = useCallback(async (content: string, idx: number) => {
    if (speakingIdx === idx) {
      isPlayingRef.current = false;
      setSpeakingIdx(null);
      return;
    }
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setSpeakingIdx(idx);
    try {
      const blocks = parseBlocks(content);
      // Pre-fetch all audios then play sequentially, saving durations
      for (const b of blocks) {
        if (!isPlayingRef.current) break;
        const audio = await fetchTTSAudio(b.lari);
        if (!audio || !isPlayingRef.current) continue;
        await new Promise<void>((resolve, reject) => {
          audio.onloadedmetadata = () => {
            if (isFinite(audio.duration)) {
              setAudioDurations((prev) => {
                const next = new Map(prev);
                next.set(idx, Math.round(audio.duration * 1000));
                return next;
              });
            }
          };
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error("audio failed"));
          audio.currentTime = 0;
          audio.play().catch(reject);
        });
      }
    } catch {
      toast({ title: t("mbuta.error"), description: "TTS failed", variant: "destructive" });
    } finally {
      isPlayingRef.current = false;
      setSpeakingIdx(null);
    }
  }, [speakingIdx, t, toast]);

  // ---- Recording ----
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (blob.size < 1000) return;
        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(blob);
          if (text) setInput((p) => p + (p ? " " : "") + text);
        } catch {
          toast({ title: t("mbuta.error"), description: "STT failed", variant: "destructive" });
        } finally { setIsTranscribing(false); }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      toast({ title: t("mbuta.error"), description: "Microphone access denied", variant: "destructive" });
    }
  }, [t, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
    setIsRecording(false);
  }, []);

  // ---- Send message ----
  const send = async (overrideText?: string, meta?: { afterWrong?: boolean }) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    // If user is replying to a wrong-answer prompt, prefix a hidden context
    const userPayload = meta?.afterWrong
      ? `[L'élève corrige sa précédente erreur en cliquant la bonne réponse]: ${text}`
      : text;

    const userMsg: Msg = { role: "user", content: userPayload };
    if (!overrideText) setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let so_far = "";
    const upsert = (chunk: string) => {
      so_far += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: so_far } : m));
        }
        return [...prev, { role: "assistant", content: so_far }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => {
          setIsLoading(false);
          if (autoSpeakRef.current && so_far) {
            setMessages((prev) => {
              const lastIdx = prev.length - 1;
              if (prev[lastIdx]?.role === "assistant") handleSpeak(prev[lastIdx].content, lastIdx);
              return prev;
            });
          }
        },
        onError: (status, msg) => {
          setIsLoading(false);
          if (status === 429) toast({ title: t("mbuta.rateLimited"), description: msg, variant: "destructive" });
          else if (status === 402) toast({ title: t("mbuta.creditsExhausted"), description: msg, variant: "destructive" });
          else toast({ title: t("mbuta.error"), description: msg, variant: "destructive" });
        },
      });
    } catch (e) {
      setIsLoading(false);
      toast({ title: t("mbuta.error"), description: String(e), variant: "destructive" });
    }
  };

  // ---- MCQ pick ----
  const pickChoice = (msgIdx: number, optIdx: number, opt: string, correctIdx: number, options: string[]) => {
    if (isLoading || answeredIdx.get(msgIdx) === "correct") return;
    const isCorrect = optIdx === correctIdx;
    setAnsweredIdx((prev) => {
      const next = new Map(prev);
      next.set(msgIdx, isCorrect ? "correct" : "wrong");
      return next;
    });
    if (isCorrect) {
      send(opt);
    } else {
      // On wrong, ask Mbuta for the correction with single-button MCQ.
      // We send a synthetic user message that nudges Mbuta to repeat the right answer alone.
      const correctOpt = options[correctIdx];
      send(`(mauvaise réponse: "${opt}" — propose "${correctOpt}" en bouton unique pour répétition)`, { afterWrong: true });
    }
  };

  // ---- Admin correction ----
  const openCorrection = (block: Block) => {
    setEditing({ block });
    setEditLari(block.lari);
    setEditFr(block.fr);
    setEditNotes("");
  };

  const saveCorrection = async () => {
    if (!editing) return;
    setSavingCorrection(true);
    try {
      const { error } = await supabase.from("translation_corrections").insert({
        source_text: editing.block.fr || editing.block.lari,
        source_lang: editing.block.fr ? "fr" : "lari",
        target_lang: "lari",
        corrected_translation: editLari,
        notes: editNotes ? `Mbuta Matondo: ${editNotes}` : "Correction depuis chat Mbuta Matondo",
      });
      if (error) throw error;
      toast({ title: "Correction enregistrée", description: "Mbuta s'en souviendra à la prochaine session." });
      setEditing(null);
    } catch (e: any) {
      toast({ title: "Erreur", description: e?.message || String(e), variant: "destructive" });
    } finally {
      setSavingCorrection(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      {/* Toggles */}
      <div className="flex items-center justify-end gap-4 px-4 py-2 border-b border-gold/10">
        <div className="flex items-center gap-2">
          <label htmlFor="mcq-mode" className="text-xs text-cream/50">QCM</label>
          <Switch id="mcq-mode" checked={mcqMode} onCheckedChange={setMcqMode} />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="auto-speak" className="text-xs text-cream/50">{t("mbuta.autoSpeak")}</label>
          <Switch id="auto-speak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-70">
            <video
              src="/videos/mbuta-matondo-intro.mp4"
              autoPlay loop muted playsInline controls
              className="w-[280px] max-w-full rounded-2xl border-2 border-gold/30 shadow-lg"
            />
            <p className="text-cream/60 text-lg font-display">{t("mbuta.welcome")}</p>
            <p className="text-cream/40 text-sm max-w-md">{t("mbuta.welcomeHint")}</p>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === "user") {
            // Hide internal hint markers from display
            const display = msg.content
              .replace(/^\[L'élève corrige.*?\]:\s*/, "")
              .replace(/^\(mauvaise réponse.*?\)$/, "");
            if (!display.trim()) return null;
            return (
              <div key={i} className="flex gap-3 justify-end">
                <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3">
                  <p className="text-sm whitespace-pre-wrap">{display}</p>
                </div>
              </div>
            );
          }

          const blocks = parseBlocks(msg.content);
          const choices = parseChoices(msg.content);
          const status = answeredIdx.get(i);
          const audioDur = audioDurations.get(i) ?? null;

          // On wrong answer, the QCM should reduce to a single button — the correct one.
          let displayChoices = choices;
          if (choices && status === "wrong") {
            displayChoices = {
              options: [choices.options[choices.correctIndex]],
              correctIndex: 0,
            };
          }

          return (
            <div key={i} className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap className="w-4 h-4 text-gold" />
              </div>
              <div className="flex flex-col gap-2 max-w-[85%]">
                {blocks.length === 0 ? (
                  <div className="bg-muted/30 border border-gold/10 rounded-2xl rounded-bl-md px-4 py-3">
                    <p className="text-sm text-cream/80 whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ) : (
                  blocks.map((b, bi) => (
                    <MandombeBubble
                      key={bi}
                      block={b}
                      isPlaying={speakingIdx === i}
                      audioDurationMs={audioDur}
                      onAdminCorrect={openCorrection}
                      isAdmin={isAdmin}
                    />
                  ))
                )}

                {/* MCQ buttons */}
                {mcqMode && displayChoices && !isLoading && (
                  <div className="flex flex-wrap gap-2">
                    {displayChoices.options.map((opt, oi) => {
                      const answered = status === "correct";
                      return (
                        <button
                          key={oi}
                          onClick={() => {
                            if (status === "wrong") {
                              // Single-button mode: clicking validates the correct answer
                              setAnsweredIdx((prev) => {
                                const next = new Map(prev);
                                next.set(i, "correct");
                                return next;
                              });
                              send(opt);
                            } else {
                              pickChoice(i, oi, opt, choices!.correctIndex, choices!.options);
                            }
                          }}
                          disabled={answered || isLoading}
                          className="px-3 py-1.5 rounded-full bg-gold/15 hover:bg-gold/30 border border-gold/30 text-cream text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* TTS */}
                {!isLoading && blocks.length > 0 && (
                  <button
                    onClick={() => handleSpeak(msg.content, i)}
                    className="self-start flex items-center gap-1 text-xs text-cream/40 hover:text-gold transition-colors px-1"
                    title={t("mbuta.speak")}
                  >
                    {speakingIdx === i ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{speakingIdx === i ? "Stop" : t("mbuta.speak")}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-gold" />
            </div>
            <div className="bg-muted/30 border border-gold/10 rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-gold" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gold/20 p-4">
        <div className="flex gap-2 items-end">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isTranscribing}
            className={`p-3 rounded-xl transition-all ${
              isRecording
                ? "bg-red-500 text-white animate-pulse"
                : "bg-muted/20 border border-gold/20 text-cream/60 hover:text-gold hover:border-gold/40"
            } disabled:opacity-40`}
            title={isRecording ? t("mbuta.listening") : t("mbuta.recordHint")}
          >
            {isTranscribing ? <Loader2 className="w-5 h-5 animate-spin" /> :
              isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("mbuta.placeholder")}
            rows={1}
            className="flex-1 bg-muted/20 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 resize-none focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || isLoading}
            className="bg-gold hover:bg-gold/90 text-earth-deep p-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin correction dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="bg-earth-deep border-gold/30 text-cream">
          <DialogHeader>
            <DialogTitle className="text-gold">Corriger le Kikongo Lari</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-cream/60 mb-1 block">Français (source de la traduction)</label>
              <Input value={editFr} onChange={(e) => setEditFr(e.target.value)} className="bg-muted/20 border-gold/20" />
            </div>
            <div>
              <label className="text-xs text-cream/60 mb-1 block">Kikongo Lari corrigé</label>
              <Textarea value={editLari} onChange={(e) => setEditLari(e.target.value)} rows={3} className="bg-muted/20 border-gold/20" />
            </div>
            <div>
              <label className="text-xs text-cream/60 mb-1 block">Note (optionnel)</label>
              <Input value={editNotes} onChange={(e) => setEditNotes(e.target.value)} placeholder="Ex: 'Ngiele = je vais, pas je suis'" className="bg-muted/20 border-gold/20" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditing(null)}>Annuler</Button>
            <Button onClick={saveCorrection} disabled={savingCorrection || !editLari.trim() || !editFr.trim()}>
              {savingCorrection ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MbutaMatondoChat;

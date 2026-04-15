import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, GraduationCap, Volume2, Mic, MicOff, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mbuta-matondo`;
const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts-lari`;
const STT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-stt`;

// Strip markdown and mandombe tags for TTS
function stripMarkdown(md: string): string {
  return md
    .replace(/\[mandombe\](.*?)\[\/mandombe\]/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/[-*]\s/g, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .trim();
}

// Process mandombe tags in content
function renderMandombeContent(content: string): React.ReactNode[] {
  const parts = content.split(/(\[mandombe\].*?\[\/mandombe\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[mandombe\](.*?)\[\/mandombe\]/);
    if (match) {
      return (
        <span key={i} className="font-mandombe text-2xl text-gold leading-relaxed inline-block mx-1">
          {match[1]}
        </span>
      );
    }
    return <ReactMarkdown key={i}>{part}</ReactMarkdown>;
  });
}

// ---- Stream Chat ----
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
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { streamDone = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

// ---- TTS helpers ----
const audioCache = new Map<string, string>();

async function speakText(text: string): Promise<HTMLAudioElement | null> {
  const plain = stripMarkdown(text);
  if (!plain) return null;

  const cacheKey = plain.slice(0, 200);
  let audioUrl = audioCache.get(cacheKey);

  if (!audioUrl) {
    const resp = await fetch(TTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ text: plain }),
    });
    if (!resp.ok) throw new Error("TTS failed");
    const data = await resp.json();
    audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
    audioCache.set(cacheKey, audioUrl);
  }

  const audio = new Audio(audioUrl);
  await audio.play();
  return audio;
}

// ---- STT helper ----
async function transcribeAudio(blob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audio", blob, "recording.webm");

  const resp = await fetch(STT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: formData,
  });
  if (!resp.ok) throw new Error("STT failed");
  const data = await resp.json();
  return data.text || "";
}

const MbutaMatondoChat = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const autoSpeakRef = useRef(autoSpeak);

  useEffect(() => { autoSpeakRef.current = autoSpeak; }, [autoSpeak]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---- TTS for a message ----
  const handleSpeak = useCallback(async (content: string, idx: number) => {
    // Stop current audio if playing same index
    if (speakingIdx === idx && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setSpeakingIdx(null);
      return;
    }
    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    setSpeakingIdx(idx);
    try {
      const audio = await speakText(content);
      if (audio) {
        currentAudioRef.current = audio;
        audio.onended = () => {
          setSpeakingIdx(null);
          currentAudioRef.current = null;
        };
      }
    } catch {
      toast({ title: t("mbuta.error"), description: "TTS failed", variant: "destructive" });
      setSpeakingIdx(null);
    }
  }, [speakingIdx, t, toast]);

  // ---- Mic recording ----
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        if (blob.size < 1000) return; // too short

        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(blob);
          if (text) setInput(prev => prev + (prev ? " " : "") + text);
        } catch {
          toast({ title: t("mbuta.error"), description: "STT failed", variant: "destructive" });
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      toast({ title: t("mbuta.error"), description: "Microphone access denied", variant: "destructive" });
    }
  }, [t, toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  // ---- Send message ----
  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsLoading(false);
          // Auto-speak if enabled
          if (autoSpeakRef.current && assistantSoFar) {
            setMessages(prev => {
              const lastIdx = prev.length - 1;
              if (prev[lastIdx]?.role === "assistant") {
                handleSpeak(prev[lastIdx].content, lastIdx);
              }
              return prev;
            });
          }
        },
        onError: (status, msg) => {
          setIsLoading(false);
          if (status === 429) {
            toast({ title: t("mbuta.rateLimited"), description: msg, variant: "destructive" });
          } else if (status === 402) {
            toast({ title: t("mbuta.creditsExhausted"), description: msg, variant: "destructive" });
          } else {
            toast({ title: t("mbuta.error"), description: msg, variant: "destructive" });
          }
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast({ title: t("mbuta.error"), description: String(e), variant: "destructive" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      {/* Auto-speak toggle */}
      <div className="flex items-center justify-end gap-2 px-4 py-2 border-b border-gold/10">
        <label htmlFor="auto-speak" className="text-xs text-cream/50">
          {t("mbuta.autoSpeak")}
        </label>
        <Switch
          id="auto-speak"
          checked={autoSpeak}
          onCheckedChange={setAutoSpeak}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-70">
            <video
              src="/videos/mbuta-matondo-intro.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-[280px] max-w-full rounded-2xl border-2 border-gold/30 shadow-lg"
            />
            <p className="text-cream/60 text-lg font-display">{t("mbuta.welcome")}</p>
            <p className="text-cream/40 text-sm max-w-md">{t("mbuta.welcomeHint")}</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap className="w-4 h-4 text-gold" />
              </div>
            )}
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted/30 text-cream border border-gold/10 rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
              {/* TTS button for assistant messages */}
              {msg.role === "assistant" && !isLoading && (
                <button
                  onClick={() => handleSpeak(msg.content, i)}
                  className="self-start flex items-center gap-1 text-xs text-cream/40 hover:text-gold transition-colors px-1"
                  title={t("mbuta.speak")}
                >
                  {speakingIdx === i ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>{speakingIdx === i ? "Stop" : t("mbuta.speak")}</span>
                </button>
              )}
            </div>
          </div>
        ))}

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
          {/* Mic button */}
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
            {isTranscribing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("mbuta.placeholder")}
            rows={1}
            className="flex-1 bg-muted/20 border border-gold/20 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 resize-none focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isLoading}
            className="bg-gold hover:bg-gold/90 text-earth-deep p-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MbutaMatondoChat;

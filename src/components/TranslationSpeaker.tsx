import { useState, useRef, useCallback } from "react";
import { Volume2, Loader2 } from "lucide-react";

// In-memory audio cache keyed by text+lang
const audioCache = new Map<string, string>();

interface TranslationSpeakerProps {
  text: string;
  lang: string;
  className?: string;
}

const TranslationSpeaker = ({ text, lang, className = "" }: TranslationSpeakerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(async () => {
    if (isLoading || isPlaying || !text.trim()) return;

    const cacheKey = `${lang}:${text.toLowerCase().trim()}`;

    if (audioCache.has(cacheKey)) {
      const audio = new Audio(audioCache.get(cacheKey)!);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts-general`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, lang }),
        }
      );

      if (!response.ok) throw new Error(`TTS failed: ${response.status}`);

      const data = await response.json();
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;

      audioCache.set(cacheKey, audioUrl);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [text, lang, isLoading, isPlaying]);

  if (!text.trim()) return null;

  return (
    <button
      onClick={playAudio}
      disabled={isLoading}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-primary/10 disabled:opacity-50 ${
        isPlaying ? "text-primary animate-pulse" : "text-muted-foreground hover:text-primary"
      } ${className}`}
      aria-label={`Écouter "${text.substring(0, 30)}"`}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

export default TranslationSpeaker;

import { useState, useCallback, useRef } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const DYNAMIC_LANGS: Language[] = ["es", "it", "ln", "el", "ko", "de"];
const CACHE_PREFIX = "content_translations_";
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
const BATCH_SIZE = 40;

interface CacheEntry {
  data: Record<string, string>;
  ts: number;
}

const loadCache = (lang: Language): Record<string, string> => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + lang);
    if (!raw) return {};
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + lang);
      return {};
    }
    return entry.data;
  } catch {
    return {};
  }
};

const saveCache = (lang: Language, data: Record<string, string>) => {
  try {
    const entry: CacheEntry = { data, ts: Date.now() };
    localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(entry));
  } catch { /* quota exceeded */ }
};

/**
 * Hook for translating pedagogical content dynamically.
 * For fr/en/pt, returns the native field directly.
 * For it/ln/el/ko, uses translate-batch with localStorage caching.
 */
export const useTranslatedContent = (options?: { alwaysDynamic?: boolean }) => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingRef = useRef<Set<string>>(new Set());
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const batchQueueRef = useRef<string[]>([]);

  const isDynamic = options?.alwaysDynamic
    ? language !== "fr"
    : DYNAMIC_LANGS.includes(language);

  // Get a cached translation
  const getCached = useCallback((text: string, lang: Language): string | null => {
    // Check in-memory first
    const mem = translations[lang]?.[text];
    if (mem) return mem;
    // Check localStorage
    const cache = loadCache(lang);
    return cache[text] || null;
  }, [translations]);

  // Flush batch queue
  const flushBatch = useCallback(async (lang: Language) => {
    const queue = [...batchQueueRef.current];
    batchQueueRef.current = [];
    if (queue.length === 0) return;

    const cache = loadCache(lang);
    const toTranslate = queue.filter(t => !cache[t] && !pendingRef.current.has(t));
    if (toTranslate.length === 0) return;

    toTranslate.forEach(t => pendingRef.current.add(t));
    setIsTranslating(true);

    try {
      for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
        const batch = toTranslate.slice(i, i + BATCH_SIZE);
        const { data, error } = await supabase.functions.invoke("translate-batch", {
          body: { texts: batch, targetLang: lang },
        });
        if (error) {
          console.error("Translation batch error:", error);
          break;
        }
        const results: string[] = data?.translations || [];
        const newEntries: Record<string, string> = {};
        batch.forEach((text, idx) => {
          if (results[idx]) {
            newEntries[text] = results[idx];
            cache[text] = results[idx];
          }
        });

        setTranslations(prev => ({
          ...prev,
          [lang]: { ...(prev[lang] || {}), ...newEntries },
        }));
      }
      saveCache(lang, cache);
    } finally {
      toTranslate.forEach(t => pendingRef.current.delete(t));
      setIsTranslating(false);
    }
  }, []);

  // Queue a text for translation
  const queueTranslation = useCallback((text: string) => {
    if (!isDynamic || !text?.trim()) return;
    batchQueueRef.current.push(text);
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    batchTimerRef.current = setTimeout(() => flushBatch(language), 100);
  }, [isDynamic, language, flushBatch]);

  /**
   * Get the translation for a text.
   * For native languages (fr/en/pt), pass the appropriate field directly.
   * For dynamic languages, pass the French text as fallback.
   */
  const getTranslation = useCallback((
    frenchText: string,
    nativeText?: string,
  ): string => {
    if (!isDynamic) return nativeText || frenchText;

    const cached = getCached(frenchText, language);
    if (cached) return cached;

    // Queue for translation, return French as fallback
    queueTranslation(frenchText);
    return frenchText;
  }, [isDynamic, language, getCached, queueTranslation]);

  return {
    getTranslation,
    isDynamic,
    isTranslating,
    language,
  };
};

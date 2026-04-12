import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, BookOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MandombeSpeaker from "@/components/MandombeSpeaker";
import { lessons, VocabItem } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DictionaryEntry {
  lari: string;
  mandombe: string;
  french: string;
  english: string;
  portuguese: string;
  category: string;
  categoryFr: string;
  categoryPt: string;
  note?: string;
}

const buildDictionary = (): DictionaryEntry[] => {
  const seen = new Set<string>();
  const entries: DictionaryEntry[] = [];

  for (const lesson of lessons) {
    if (!lesson) continue;
    const cat = lesson.title;
    const catFr = lesson.titleFr || lesson.title;
    const catPt = lesson.titlePt || lesson.title;

    const addItems = (items: VocabItem[]) => {
      for (const item of items) {
        const key = item.lari.toLowerCase().trim();
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push({
          lari: item.lari,
          mandombe: item.mandombe,
          french: item.french,
          english: item.english,
          portuguese: item.portuguese || "",
          category: cat,
          categoryFr: catFr,
          categoryPt: catPt,
          note: item.note,
        });
      }
    };

    if (lesson.vocabulary) addItems(lesson.vocabulary);

    if (lesson.phrases) {
      for (const p of lesson.phrases) {
        const key = p.lari.toLowerCase().trim();
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push({
          lari: p.lari,
          mandombe: p.mandombe,
          french: p.french,
          english: p.english,
          portuguese: p.portuguese || "",
          category: cat,
          categoryFr: catFr,
          categoryPt: catPt,
          note: p.note,
        });
      }
    }
  }

  return entries.sort((a, b) => a.lari.localeCompare(b.lari));
};

const dictionary = buildDictionary();
const alphabet = Array.from(new Set(dictionary.map((e) => e.lari[0].toUpperCase()))).sort();

// Cache key for localStorage
const PT_CACHE_KEY = "dict_pt_translations";

const loadCachedTranslations = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem(PT_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveCachedTranslations = (cache: Record<string, string>) => {
  try {
    localStorage.setItem(PT_CACHE_KEY, JSON.stringify(cache));
  } catch { /* ignore */ }
};

const Dictionary = () => {
  const { language, t } = useLanguage();
  const { getTranslation, isDynamic } = useTranslatedContent();
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [ptTranslations, setPtTranslations] = useState<Record<string, string>>(loadCachedTranslations);
  const [isTranslating, setIsTranslating] = useState(false);

  // Auto-translate missing PT entries when language switches to PT
  const translateMissing = useCallback(async () => {
    const missing = dictionary.filter((e) => !e.portuguese && !ptTranslations[e.french]);
    if (missing.length === 0) return;

    setIsTranslating(true);
    const BATCH_SIZE = 40;
    const newTranslations: Record<string, string> = { ...ptTranslations };

    try {
      for (let i = 0; i < missing.length; i += BATCH_SIZE) {
        const batch = missing.slice(i, i + BATCH_SIZE);
        const texts = batch.map((e) => e.french);

        const { data, error } = await supabase.functions.invoke("translate-batch", {
          body: { texts, targetLang: "pt" },
        });

        if (error) {
          console.error("Translation error:", error);
          toast.error("Erreur de traduction. Certaines entrées restent en français.");
          break;
        }

        const translations: string[] = data?.translations || [];
        batch.forEach((entry, idx) => {
          if (translations[idx]) {
            newTranslations[entry.french] = translations[idx];
          }
        });

        // Update state progressively
        setPtTranslations({ ...newTranslations });
      }

      saveCachedTranslations(newTranslations);
    } catch (err) {
      console.error("Translation failed:", err);
      toast.error("Erreur de traduction");
    } finally {
      setIsTranslating(false);
    }
  }, [ptTranslations]);

  useEffect(() => {
    if (language === "pt") {
      translateMissing();
    }
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTranslationForEntry = (entry: DictionaryEntry) => {
    if (isDynamic) return getTranslation(entry.french, entry.english);
    switch (language) {
      case "fr":
        return entry.french;
      case "pt":
        return entry.portuguese || ptTranslations[entry.french] || entry.french;
      default:
        return entry.english;
    }
  };

  const getCategory = (entry: DictionaryEntry) => {
    if (isDynamic) return getTranslation(entry.categoryFr, entry.category);
    switch (language) {
      case "fr":
        return entry.categoryFr;
      case "pt":
        return entry.categoryPt;
      default:
        return entry.category;
    }
  };

  const filtered = useMemo(() => {
    let results = dictionary;

    if (activeLetter) {
      results = results.filter((e) => e.lari[0].toUpperCase() === activeLetter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (e) =>
          e.lari.toLowerCase().includes(q) ||
          e.french.toLowerCase().includes(q) ||
          e.english.toLowerCase().includes(q) ||
          (e.portuguese && e.portuguese.toLowerCase().includes(q))
      );
    }

    return results;
  }, [search, activeLetter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">
              {t("dict.eyebrow")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("dict.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("dict.subtitle")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {filtered.length} {t("dict.entries")} · {dictionary.length} {t("dict.total")}
            </p>
            {isTranslating && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-primary">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Tradução automática em andamento…</span>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveLetter(null);
              }}
              placeholder={t("dict.searchPlaceholder")}
              className="pl-12 h-14 text-lg rounded-xl border-border bg-card shadow-sm focus-visible:ring-primary"
            />
          </div>

          {/* Alphabet nav */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-10 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveLetter(null)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                !activeLetter
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {t("dict.all")}
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setActiveLetter(letter);
                  setSearch("");
                }}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  activeLetter === letter
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{t("dict.noResults")}</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto grid gap-3">
              {filtered.map((entry, i) => (
                <div
                  key={`${entry.lari}-${i}`}
                  className="group bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">{entry.lari}</h3>
                        <span className="inline-flex items-center gap-1">
                          <span className="font-mandombe text-2xl text-primary/70 leading-none">
                            {entry.mandombe}
                          </span>
                          <MandombeSpeaker lariText={entry.lari} />
                        </span>
                      </div>
                      <p className="mt-1 text-base text-muted-foreground">
                        {getTranslationForEntry(entry)}
                      </p>
                      {entry.note && (
                        <p className="mt-1 text-sm text-muted-foreground italic">{entry.note}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground whitespace-nowrap">
                      {getCategory(entry)}
                    </span>
                  </div>

                  {/* All translations row */}
                  <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    <span>🇫🇷 {entry.french}</span>
                    <span>🇬🇧 {entry.english}</span>
                    <span>
                      🇵🇹 {entry.portuguese || ptTranslations[entry.french] || "…"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dictionary;

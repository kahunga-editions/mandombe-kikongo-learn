import { lessons, type VocabItem } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";

export type MvitaQuestion = {
  prompt: string;
  promptLang: "fr" | "lari";
  options: string[];
  correctIndex: number;
  mandombe?: string;
  // Pour le signalement admin :
  sourceLari: string;
  sourceFrench: string;
};

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Nettoie les valeurs du corpus (Lari peut contenir "x | y" pour sg/pl).
const normalize = (s: string) => s.split("|")[0].trim();

const baseVocab = (): VocabItem[] => {
  const items: VocabItem[] = [];
  for (const lesson of lessons) {
    if (lesson.vocabulary) items.push(...lesson.vocabulary);
  }
  // Dédup par paire normalisée (lari, fr).
  const seen = new Set<string>();
  return items.filter((v) => {
    if (!v.lari || !v.french) return false;
    const key = `${normalize(v.lari).toLowerCase()}|${normalize(v.french).toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// Cache (corpus statique + corrections Supabase fusionnées).
let cache: VocabItem[] | null = null;

/**
 * Charge les corrections admin (translation_corrections) qui surchargent
 * le corpus statique. Les paires fr↔lari validées par les admins remplacent
 * toute entrée erronée du corpus statique.
 */
export const loadCorpus = async (): Promise<VocabItem[]> => {
  if (cache) return cache;
  const base = baseVocab();
  try {
    const { data } = await supabase
      .from("translation_corrections")
      .select("source_text, source_lang, target_lang, corrected_translation, corrected_mandombe")
      .or("source_lang.eq.lari,target_lang.eq.lari")
      .limit(500);

    if (data) {
      const overrides = new Map<string, VocabItem>();
      for (const c of data) {
        let lari = "";
        let french = "";
        if (c.target_lang === "lari" && c.source_lang === "fr") {
          french = c.source_text;
          lari = c.corrected_translation;
        } else if (c.source_lang === "lari" && c.target_lang === "fr") {
          lari = c.source_text;
          french = c.corrected_translation;
        } else continue;
        if (!lari || !french) continue;
        const key = normalize(lari).toLowerCase();
        overrides.set(key, {
          lari: normalize(lari),
          french: normalize(french),
          english: "",
          mandombe: c.corrected_mandombe || normalize(lari),
        });
      }
      // Surcharge : si une entrée du corpus statique partage un mot Lari avec une correction,
      // on remplace par la correction (qui fait foi).
      const filtered = base.filter((v) => !overrides.has(normalize(v.lari).toLowerCase()));
      cache = [...filtered, ...overrides.values()];
      return cache;
    }
  } catch (e) {
    console.warn("Mvita: fallback to static corpus", e);
  }
  cache = base;
  return cache;
};

export const invalidateCorpus = () => {
  cache = null;
};

export const generateQuestions = async (count: number): Promise<MvitaQuestion[]> => {
  const vocab = await loadCorpus();
  if (vocab.length < 4) return [];
  const picked = shuffle(vocab).slice(0, count);
  return picked.map((item) => {
    const frToLari = Math.random() > 0.5;
    // Distracteurs : exclusivement issus du corpus, jamais inventés.
    // On exclut les entrées dont la valeur d'option serait un doublon de la bonne réponse.
    const correct = frToLari ? normalize(item.lari) : normalize(item.french);
    const pool = vocab.filter((v) => {
      const candidate = frToLari ? normalize(v.lari) : normalize(v.french);
      return candidate.toLowerCase() !== correct.toLowerCase();
    });
    const distractors = shuffle(pool).slice(0, 3);
    const wrongs = distractors.map((d) => (frToLari ? normalize(d.lari) : normalize(d.french)));
    const options = shuffle([correct, ...wrongs]);
    return {
      prompt: frToLari ? normalize(item.french) : normalize(item.lari),
      promptLang: frToLari ? "fr" : "lari",
      options,
      correctIndex: options.indexOf(correct),
      mandombe: frToLari ? undefined : item.mandombe,
      sourceLari: normalize(item.lari),
      sourceFrench: normalize(item.french),
    };
  });
};

// AI plays: probability of picking the correct answer
export const AI_DIFFICULTY = {
  easy: { label: "Nlongoki (facile)", accuracy: 0.6, elo: 1000 },
  medium: { label: "Kinuani (moyen)", accuracy: 0.8, elo: 1400 },
  hard: { label: "Nganga (difficile)", accuracy: 0.95, elo: 1750 },
} as const;

export type AIDifficulty = keyof typeof AI_DIFFICULTY;

export const aiAnswer = (q: MvitaQuestion, difficulty: AIDifficulty): number => {
  const { accuracy } = AI_DIFFICULTY[difficulty];
  if (Math.random() < accuracy) return q.correctIndex;
  const wrongs = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
  return wrongs[Math.floor(Math.random() * wrongs.length)];
};

// Elo update K=32
export const updateElo = (playerElo: number, opponentElo: number, score: 0 | 0.5 | 1) => {
  const expected = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  return Math.round(playerElo + 32 * (score - expected));
};

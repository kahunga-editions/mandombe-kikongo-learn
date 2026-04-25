import { lessons, type VocabItem } from "@/data/lessons";

export type MvitaQuestion = {
  prompt: string;
  promptLang: "fr" | "lari";
  options: string[];
  correctIndex: number;
  mandombe?: string;
};

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const allVocab = (): VocabItem[] => {
  const items: VocabItem[] = [];
  for (const lesson of lessons) {
    if (lesson.vocabulary) items.push(...lesson.vocabulary);
  }
  // dedupe by lari + french
  const seen = new Set<string>();
  return items.filter((v) => {
    const key = `${v.lari}|${v.french}`;
    if (seen.has(key) || !v.lari || !v.french) return false;
    seen.add(key);
    return true;
  });
};

let cache: VocabItem[] | null = null;
const getVocab = () => (cache ??= allVocab());

export const generateQuestions = (count: number): MvitaQuestion[] => {
  const vocab = getVocab();
  if (vocab.length < 4) return [];
  const picked = shuffle(vocab).slice(0, count);
  return picked.map((item) => {
    // direction: 50/50 fr→lari or lari→fr
    const frToLari = Math.random() > 0.5;
    const distractors = shuffle(vocab.filter((v) => v.lari !== item.lari)).slice(0, 3);
    const correct = frToLari ? item.lari : item.french;
    const wrongs = distractors.map((d) => (frToLari ? d.lari : d.french));
    const options = shuffle([correct, ...wrongs]);
    return {
      prompt: frToLari ? item.french : item.lari,
      promptLang: frToLari ? "fr" : "lari",
      options,
      correctIndex: options.indexOf(correct),
      mandombe: frToLari ? undefined : item.mandombe,
    };
  });
};

// AI plays: probability of picking the correct answer
export const AI_DIFFICULTY = {
  easy: { label: "Mwana (facile)", accuracy: 0.6, elo: 1000 },
  medium: { label: "Mbuta (moyen)", accuracy: 0.8, elo: 1400 },
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

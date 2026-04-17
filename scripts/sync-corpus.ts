/**
 * Régénère supabase/functions/_shared/lessons-corpus.ts depuis src/data/lessons.ts.
 *
 * Usage :
 *   bun run scripts/sync-corpus.ts
 *   # ou
 *   npx tsx scripts/sync-corpus.ts
 *
 * Le fichier généré est consommé par l'edge function `mbuta-matondo` (tools
 * `get_lessons` / `get_exercises`) et par l'endpoint public `lessons-data`.
 *
 * À lancer après toute modification de src/data/lessons.ts.
 */

// @ts-ignore — résolu au runtime via bun/tsx
import { lessons } from "../src/data/lessons.ts";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../supabase/functions/_shared/lessons-corpus.ts");

interface VocabLine { lari: string; french: string }
interface ExLine { type: string; question: string; answer?: string }
interface LessonOut {
  id: string;
  title: string;
  level: string;
  topic: string;
  vocab: VocabLine[];
  exercises: ExLine[];
}

const out: LessonOut[] = (lessons as any[]).map((l) => {
  const vocab: VocabLine[] = (l.vocabulary ?? [])
    .filter((v: any) => v && v.lari && (v.french || v.english))
    .slice(0, 25)
    .map((v: any) => ({ lari: String(v.lari), french: String(v.french ?? v.english ?? "") }));

  if (Array.isArray(l.phrases)) {
    for (const p of l.phrases.slice(0, 8)) {
      if (p?.lari && (p.french || p.english)) {
        vocab.push({ lari: String(p.lari), french: String(p.french ?? p.english) });
      }
    }
  }

  const exercises: ExLine[] = [];
  for (const ex of (l.exercises ?? []).slice(0, 8)) {
    if (!ex || !ex.type) continue;
    const t = String(ex.type);
    if (t === "multiple-choice") {
      const ans = (Array.isArray(ex.options) && typeof ex.correctIndex === "number")
        ? ex.options[ex.correctIndex] : undefined;
      exercises.push({
        type: t,
        question: String(ex.questionFr ?? ex.question ?? "").slice(0, 200),
        answer: ans ? String(ans).slice(0, 100) : undefined,
      });
    } else if (t === "fill-in-blank") {
      exercises.push({
        type: t,
        question: String(ex.sentenceFr ?? ex.sentence ?? "").slice(0, 200),
        answer: ex.blank ? String(ex.blank).slice(0, 80) : undefined,
      });
    } else if (t === "matching") {
      const pairs = (ex.pairs ?? []).slice(0, 4)
        .map((p: any) => `${p.left}=${p.right}`).join(", ");
      exercises.push({
        type: t,
        question: String(ex.instructionFr ?? ex.instruction ?? "").slice(0, 160),
        answer: pairs.slice(0, 200),
      });
    } else {
      exercises.push({
        type: t,
        question: String(ex.title ?? ex.titleFr ?? ex.question ?? ex.instruction ?? t).slice(0, 160),
      });
    }
  }

  const id = String(l.id);
  let topic = id.split("-")[0];
  if (id.includes("conjug")) topic = "conjugaison";
  if (id.includes("dict")) topic = "vocabulaire";
  if (id.includes("verb")) topic = "verbes";
  if (id.includes("number") || id.includes("count")) topic = "nombres";
  if (id.includes("greet")) topic = "salutations";
  if (id.includes("famil")) topic = "famille";
  if (id.includes("negat")) topic = "négation";

  return {
    id,
    title: String(l.titleFr ?? l.title ?? id).slice(0, 120),
    level: String(l.level ?? "beginner"),
    topic,
    vocab,
    exercises,
  };
});

const header = `// AUTO-GÉNÉRÉ par scripts/sync-corpus.ts depuis src/data/lessons.ts.
// NE PAS ÉDITER À LA MAIN — relancer \`bun run scripts/sync-corpus.ts\`.
// Source de vérité côté serveur pour les tools de Mbuta Matondo.

export interface LessonSummary {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  topic: string;
  vocab: { lari: string; french: string }[];
  exercises: { type: string; question: string; answer?: string }[];
}

export const LESSONS_CORPUS: LessonSummary[] = `;

const footer = `;

export function filterLessons(level?: string, topic?: string): LessonSummary[] {
  return LESSONS_CORPUS.filter((l) => {
    if (level && l.level !== level) return false;
    if (topic && !l.topic.toLowerCase().includes(topic.toLowerCase())) return false;
    return true;
  });
}

export function getExercisesByLesson(lessonId?: string, type?: string) {
  const lessons = lessonId ? LESSONS_CORPUS.filter((l) => l.id === lessonId) : LESSONS_CORPUS;
  const result: { lesson_id: string; exercises: any[] }[] = [];
  for (const l of lessons) {
    const ex = type ? l.exercises.filter((e) => e.type === type) : l.exercises;
    if (ex.length) result.push({ lesson_id: l.id, exercises: ex });
  }
  return result;
}
`;

const totalVocab = out.reduce((s, l) => s + l.vocab.length, 0);
const totalEx = out.reduce((s, l) => s + l.exercises.length, 0);
const body = JSON.stringify(out, null, 2);

writeFileSync(OUT_PATH, header + body + footer, "utf-8");
console.log(`✓ Corpus régénéré : ${out.length} leçons, ${totalVocab} entrées de vocab, ${totalEx} exercices`);
console.log(`  → ${OUT_PATH}`);

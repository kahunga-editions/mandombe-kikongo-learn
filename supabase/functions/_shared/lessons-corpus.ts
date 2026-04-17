// Corpus condensé des leçons disponibles côté serveur (sous-ensemble extrait de src/data/lessons.ts).
// Utilisé par mbuta-matondo pour les tools get_lessons / get_exercises.

export interface LessonSummary {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  topic: string;
  vocab: { lari: string; french: string }[];
  exercises: { type: string; question: string; answer?: string }[];
}

export const LESSONS_CORPUS: LessonSummary[] = [
  {
    id: "salutations",
    title: "Salutations (Mbote)",
    level: "beginner",
    topic: "salutations",
    vocab: [
      { lari: "Mbote", french: "Bonjour" },
      { lari: "Kolele?", french: "Ça va ?" },
      { lari: "Nkolele", french: "Je vais bien" },
      { lari: "Mbaji kua", french: "À demain" },
      { lari: "Nkokela kua", french: "À ce soir" },
    ],
    exercises: [
      { type: "multiple-choice", question: "Comment dit-on 'Bonjour' en Lari ?", answer: "Mbote" },
      { type: "fill-in-blank", question: "___? = Ça va ?", answer: "Kolele" },
    ],
  },
  {
    id: "famille",
    title: "Famille (Dikanda)",
    level: "beginner",
    topic: "famille",
    vocab: [
      { lari: "tata", french: "père" },
      { lari: "mama", french: "mère" },
      { lari: "yaya", french: "aîné(e)" },
      { lari: "mpangi", french: "cadet(te)" },
      { lari: "ndiku", french: "ami(e)" },
    ],
    exercises: [
      { type: "matching", question: "Associe les termes de famille", answer: "tata=père, mama=mère" },
    ],
  },
  {
    id: "nombres",
    title: "Nombres (Ntalu)",
    level: "beginner",
    topic: "nombres",
    vocab: [
      { lari: "mosi", french: "1" },
      { lari: "zole", french: "2" },
      { lari: "tatu", french: "3" },
      { lari: "ya", french: "4" },
      { lari: "tanu", french: "5" },
      { lari: "kumi", french: "10" },
    ],
    exercises: [
      { type: "multiple-choice", question: "Quel est le chiffre 'tatu' ?", answer: "3" },
    ],
  },
  {
    id: "verbes-essentiels",
    title: "Verbes essentiels",
    level: "intermediate",
    topic: "verbes",
    vocab: [
      { lari: "dia", french: "manger" },
      { lari: "nua", french: "boire" },
      { lari: "zonza", french: "parler" },
      { lari: "kwenda", french: "aller" },
      { lari: "kuiza", french: "venir" },
    ],
    exercises: [
      { type: "fill-in-blank", question: "Ni ta ___ (je mange) → ?", answer: "dia" },
    ],
  },
  {
    id: "negation",
    title: "Négation (Ka...ko)",
    level: "intermediate",
    topic: "grammaire",
    vocab: [
      { lari: "Ka tuena ba wasa ko", french: "Nous ne sommes pas en bonne santé" },
      { lari: "Ka bena mu kiese ko", french: "Ils ne sont pas contents" },
    ],
    exercises: [
      { type: "multiple-choice", question: "Structure de la négation Lari ?", answer: "Ka + verbe + ko" },
    ],
  },
];

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
